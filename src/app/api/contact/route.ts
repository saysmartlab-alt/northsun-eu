import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { redis } from '@/lib/redis'
import { contactSchema } from '@/lib/schemas/contact'

const LEAD_INDEX_KEY = 'contact:leads:index'
const LEAD_KEY_PREFIX = 'contact:lead:'
const NOTIFY_TO = 'info@northsun-eu.com'
// Resend's onboarding sender works without verifying a custom domain.
// Replace with `notifications@northsun-eu.com` once the domain is verified.
const NOTIFY_FROM = 'NorthSun web <onboarding@resend.dev>'

function randomId(): string {
  // 8 hex chars is plenty for collision avoidance within the same millisecond.
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const arr = new Uint8Array(4)
    crypto.getRandomValues(arr)
    return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('')
  }
  return Math.random().toString(16).slice(2, 10)
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]?.trim() ?? ''
  return req.headers.get('x-real-ip') ?? ''
}

export async function POST(req: NextRequest) {
  let parsed
  try {
    parsed = contactSchema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
  }

  // Honeypot: bots fill hidden fields. Reply OK so the bot thinks it succeeded.
  if (parsed.hp) {
    return NextResponse.json({ ok: true })
  }

  const now = Date.now()
  const id = `${now}-${randomId()}`
  const key = `${LEAD_KEY_PREFIX}${id}`

  const lead = {
    id,
    name: parsed.name,
    email: parsed.email.toLowerCase(),
    phone: parsed.phone ?? '',
    projectType: parsed.projectType,
    message: parsed.message,
    locale: parsed.locale ?? 'cs',
    ts: now,
    ip: clientIp(req).slice(0, 64),
    ua: req.headers.get('user-agent')?.slice(0, 200) ?? '',
  }

  // 1) Store lead. If Redis fails we still want to try email so the lead
  //    isn't lost completely. We return 500 only when both legs fail.
  let storedOk = false
  try {
    await redis.hset(key, lead)
    await redis.zadd(LEAD_INDEX_KEY, { score: now, member: id })
    storedOk = true
  } catch (err) {
    console.error('contact_redis_error', err)
  }

  // 2) Email notification (only if RESEND_API_KEY is configured).
  let mailedOk = false
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const resend = new Resend(resendKey)
      const subject = `Nová poptávka z webu - ${lead.name}`
      const text =
        `Email: ${lead.email}\n` +
        `Telefon: ${lead.phone || '-'}\n` +
        `Typ projektu: ${lead.projectType}\n\n` +
        `Zpráva:\n${lead.message}\n\n` +
        `Locale: ${lead.locale}\n` +
        `Čas: ${new Date(now).toISOString()}\n` +
        `IP: ${lead.ip || '-'}\n`
      const { error } = await resend.emails.send({
        from: NOTIFY_FROM,
        to: NOTIFY_TO,
        replyTo: lead.email,
        subject,
        text,
      })
      if (error) {
        console.error('contact_resend_error', error)
      } else {
        mailedOk = true
      }
    } catch (err) {
      console.error('contact_resend_exception', err)
    }
  } else {
    console.info('contact_lead_received', {
      id,
      email: lead.email,
      projectType: lead.projectType,
    })
  }

  if (!storedOk && !mailedOk) {
    return NextResponse.json({ error: 'persist_failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// Read-only dump for quick listing in the browser (?key=<SECRET>).
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key || key !== process.env.SUBSCRIBE_ADMIN_KEY) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  try {
    const ids = await redis.zrange<string[]>(LEAD_INDEX_KEY, 0, -1, {
      rev: true,
    })
    const leads = await Promise.all(
      ids.map(async (leadId) => {
        const data = await redis.hgetall<Record<string, string>>(
          `${LEAD_KEY_PREFIX}${leadId}`
        )
        return data ?? { id: leadId }
      })
    )
    return NextResponse.json({ count: leads.length, leads })
  } catch (err) {
    console.error('contact_list_error', err)
    return NextResponse.json({ error: 'list_failed' }, { status: 500 })
  }
}
