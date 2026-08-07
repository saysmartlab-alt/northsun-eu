import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { redis } from '@/lib/redis'
import { contactSchema } from '@/lib/schemas/contact'
import { CONTACT_EMAIL } from '@/lib/constants'

const LEAD_INDEX_KEY = 'contact:leads:index'
const LEAD_KEY_PREFIX = 'contact:lead:'
const NOTIFY_TO = CONTACT_EMAIL

// Nodemailer needs the Node runtime (net + tls). Edge would reject the SMTP transport.
export const runtime = 'nodejs'

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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
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

  // 1) Store lead in KV — independent leg. If Redis is down we still try the
  //    email so Lukáš gets the notification, and vice versa. Logged but no
  //    early return.
  try {
    await redis.hset(key, lead)
    await redis.zadd(LEAD_INDEX_KEY, { score: now, member: id })
  } catch (err) {
    console.error('contact_redis_error', err)
  }

  // 2) Email via Gmail SMTP (nodemailer). Failure here means Lukáš won't be
  //    notified, so this is the surface-visible error path — return 500.
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD
  if (!gmailUser || !gmailPass) {
    console.error('contact_smtp_config_missing', {
      hasUser: Boolean(gmailUser),
      hasPass: Boolean(gmailPass),
    })
    return NextResponse.json({ error: 'email_not_sent' }, { status: 500 })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })

    const subject = `Nová poptávka: ${lead.projectType} — ${lead.name}`
    const html = `
      <h2 style="font-family: Arial, sans-serif; color: #030057;">Nová poptávka z webu</h2>
      <table style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6;">
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Jméno:</strong></td><td>${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Email:</strong></td><td><a href="mailto:${escapeHtml(lead.email)}" style="color: #030057;">${escapeHtml(lead.email)}</a></td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Telefon:</strong></td><td>${escapeHtml(lead.phone || 'neuvedeno')}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0;"><strong>Typ projektu:</strong></td><td>${escapeHtml(lead.projectType)}</td></tr>
      </table>
      <h3 style="font-family: Arial, sans-serif; color: #030057; margin-top: 24px;">Zpráva</h3>
      <p style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(lead.message)}</p>
      <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;">
      <p style="font-family: Arial, sans-serif; font-size: 12px; color: #6B7280;">
        Locale: ${escapeHtml(lead.locale)} · Čas: ${new Date(now).toISOString()} · IP: ${escapeHtml(lead.ip || '-')}
      </p>
    `.trim()

    await transporter.sendMail({
      from: gmailUser,
      to: NOTIFY_TO,
      replyTo: lead.email,
      subject,
      html,
    })
  } catch (err) {
    console.error('contact_smtp_error', err)
    return NextResponse.json({ error: 'email_not_sent' }, { status: 500 })
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
