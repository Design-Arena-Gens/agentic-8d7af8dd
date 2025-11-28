export const dynamic = 'force-dynamic'

const WEBHOOK_URL = 'https://intelliwaveai.app.n8n.cloud/webhook/c99b5d4e-0dec-4616-b0c0-274f8febddf6/chat'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message: string = body?.message ?? ''
    const forward = { message, source: 'intelliwave-website', timestamp: Date.now() }

    const upstream = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forward),
      // Keep timeout reasonable via Next runtime defaults
      cache: 'no-store',
    })

    const contentType = upstream.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = await upstream.json()
      // Normalize probable keys
      const reply = data.reply ?? data.response ?? data.message ?? JSON.stringify(data)
      return new Response(JSON.stringify({ reply }), { status: upstream.status, headers: { 'Content-Type': 'application/json' } })
    } else {
      const text = await upstream.text()
      return new Response(JSON.stringify({ reply: text }), { status: upstream.status, headers: { 'Content-Type': 'application/json' } })
    }
  } catch (e: any) {
    return new Response(JSON.stringify({ reply: "Erreur lors de la communication avec le webhook." }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
