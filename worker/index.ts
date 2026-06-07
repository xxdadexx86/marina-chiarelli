interface Env {
  DB?: D1Database
  ASSETS: Fetcher
  ALLOWED_ORIGIN: string
  ADMIN_PASSWORD: string
  PRESS_PROVIDER?: string
  PRESS_FEEDS?: string
}

const queries = [
  '"Marina Chiarelli"', '"Assessore Marina Chiarelli"', '"Marina Chiarelli cultura"',
  '"Marina Chiarelli Regione Piemonte"', '"Marina Chiarelli pari opportunità"',
  '"Marina Chiarelli politiche giovanili"', '"Marina Chiarelli giovani"', '"Marina Chiarelli Piemonte"',
]

const riskWords = ['polemica','bufera','attacco','accusa','indagine','scontro','critica','contestazione','caos','caso','scandalo','tensione','partito','dimissioni']

function json(data: unknown, status = 200, origin = '*') {
  return new Response(JSON.stringify(data), { status, headers: { 'content-type':'application/json', 'access-control-allow-origin':origin } })
}

function clean(value: unknown, max = 3000) {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, max)
}

async function createContact(request: Request, env: Env) {
  if (!env.DB) return json({ error:'Database non ancora configurato' }, 503, env.ALLOWED_ORIGIN)
  const body = await request.json<Record<string, unknown>>()
  const email = clean(body.email, 254)
  if (!email.includes('@') || !body.privacyConsent || clean(body.message, 5000).length < 10) return json({ error:'Dati non validi' }, 400, env.ALLOWED_ORIGIN)
  await env.DB.prepare('INSERT INTO contacts (name,surname,email,phone,message,privacy_consent,newsletter_consent,created_at) VALUES (?,?,?,?,?,?,?,datetime("now"))')
    .bind(clean(body.name,100),clean(body.surname,100),email,clean(body.phone,40),clean(body.message,5000),1,body.newsletterConsent ? 1 : 0).run()
  return json({ ok:true }, 201, env.ALLOWED_ORIGIN)
}

async function subscribe(request: Request, env: Env) {
  if (!env.DB) return json({ error:'Database non ancora configurato' }, 503, env.ALLOWED_ORIGIN)
  const body = await request.json<Record<string, unknown>>()
  const email = clean(body.email, 254)
  if (!email.includes('@') || !body.consent) return json({ error:'Consenso ed email validi sono obbligatori' }, 400, env.ALLOWED_ORIGIN)
  await env.DB.prepare('INSERT INTO newsletter_subscribers (email,name,consent_at,source,status) VALUES (?,?,datetime("now"),?,"active") ON CONFLICT(email) DO UPDATE SET status="active", consent_at=datetime("now")')
    .bind(email,clean(body.name,100),clean(body.source,60) || 'website').run()
  return json({ ok:true }, 201, env.ALLOWED_ORIGIN)
}

async function runPressCron(env: Env) {
  if (!env.DB) return
  const started = Date.now()
  let errors: string[] = []
  const found = 0
  // Provider adapters are intentionally isolated here. The first production adapter can
  // consume configured RSS feeds without changing classification or persistence.
  if (!env.PRESS_FEEDS) errors = ['Nessun feed configurato: esecuzione registrata senza importazioni']
  await env.DB.prepare('INSERT INTO cron_logs (executed_at,queries,found_count,duplicate_count,imported_count,classified_count,errors,duration_ms) VALUES (datetime("now"),?,?,?,?,?,?,?)')
    .bind(JSON.stringify(queries),found,0,0,0,JSON.stringify(errors),Date.now()-started).run()
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url)
    if (request.method === 'OPTIONS') return new Response(null, { headers:{ 'access-control-allow-origin':env.ALLOWED_ORIGIN,'access-control-allow-methods':'POST,OPTIONS','access-control-allow-headers':'content-type,authorization' } })
    if (request.method === 'POST' && url.pathname === '/api/contact') return createContact(request, env)
    if (request.method === 'POST' && url.pathname === '/api/newsletter') return subscribe(request, env)
    if (url.pathname.startsWith('/api/admin') && request.headers.get('authorization') !== `Bearer ${env.ADMIN_PASSWORD}`) return json({ error:'Non autorizzato' }, 401, env.ALLOWED_ORIGIN)
    if (url.pathname === '/api/config/press') return json({ queries, riskWords }, 200, env.ALLOWED_ORIGIN)
    return json({ service:'marina-chiarelli-api', status:'ok' }, 200, env.ALLOWED_ORIGIN)
  },
  async scheduled(_controller: ScheduledController, env: Env) { await runPressCron(env) },
}
