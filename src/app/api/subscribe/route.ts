import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { redis, SUBSCRIBERS_KEY } from '@/lib/redis'

const schema = z.object({
  email: z.string().email().max(254),
  locale: z.string().max(5).optional(),
  hp: z.string().optional(),
})

export async function POST(req: NextRequest) {
  let parsed
  try {
    parsed = schema.parse(await req.json())
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
  }

  // Honeypot: bots fill hidden fields; reply OK silently.
  if (parsed.hp) {
    return NextResponse.json({ ok: true })
  }

  const email = parsed.email.toLowerCase().trim()
  const now = Date.now()

  try {
    // ZADD with NX so duplicate emails keep their original signup time.
    await redis.zadd(SUBSCRIBERS_KEY, { nx: true }, { score: now, member: email })
    // Store metadata (locale, user-agent, IP) per email in a hash.
    await redis.hset(`${SUBSCRIBERS_KEY}:meta:${email}`, {
      locale: parsed.locale ?? 'cs',
      ua: req.headers.get('user-agent')?.slice(0, 200) ?? '',
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '',
      ts: now,
    })
  } catch (err) {
    console.error('redis_error', err)
    return NextResponse.json({ error: 'store_failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

// GET — read-only dump (use ?key=<SECRET>) for quick listing in browser.
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (!key || key !== process.env.SUBSCRIBE_ADMIN_KEY) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  try {
    const entries = await redis.zrange<string[]>(SUBSCRIBERS_KEY, 0, -1, {
      withScores: true,
    })
    const result: Array<{ email: string; signedUpAt: string }> = []
    for (let i = 0; i < entries.length; i += 2) {
      result.push({
        email: String(entries[i]),
        signedUpAt: new Date(Number(entries[i + 1])).toISOString(),
      })
    }
    return NextResponse.json({ count: result.length, subscribers: result })
  } catch (err) {
    console.error('redis_error', err)
    return NextResponse.json({ error: 'list_failed' }, { status: 500 })
  }
}
