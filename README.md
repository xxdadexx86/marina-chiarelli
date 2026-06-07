# Marina Chiarelli

Piattaforma personale-istituzionale di Marina Chiarelli. Il progetto presenta attività, temi, progetti, agenda, news, media e rassegna stampa con un tono editoriale sobrio e non partitico.

## Stack

- React 19, TypeScript, Vite
- React Router
- Cloudflare Pages per il frontend
- Cloudflare Worker per API e cron
- Cloudflare D1 per dati editoriali, contatti e log
- Lucide per le icone
- prerender SSG per contenuti HTML indicizzabili

## Avvio locale

```bash
npm install
npm run dev
```

Build di produzione:

```bash
npm run lint
npm run build
npm run preview
```

Il frontend è disponibile normalmente su `http://localhost:5173`. La cartella di output è `dist`.

## Struttura

```text
src/
  data/content.ts       contenuti e impostazioni strutturate
  data/seo.ts           metadati e rotte prerender
  App.tsx               routing, pagine e componenti editoriali
  entry-server.tsx      renderer HTML di build
  App.css               design system responsive
scripts/
  prerender.mjs         genera un HTML completo per ogni URL
public/
  images/               immagini pubbliche
  robots.txt
  sitemap.xml
worker/
  index.ts              API Cloudflare e cron
migrations/
  0001_initial.sql      schema D1
design/                 concept visuali di riferimento
```

## Cloudflare Workers Static Assets

Il repository è configurato per il deploy collegato di Cloudflare Workers. Il Worker serve la build React come Static Assets e gestisce separatamente le route `/api/*`.

1. Collegare il repository GitHub a Cloudflare Workers Builds.
2. Impostare build command `npm run build`.
3. Impostare output directory `dist`.
4. Usare come deploy command `npx wrangler deploy`.
5. Configurare il dominio e aggiornare canonical, sitemap e `ALLOWED_ORIGIN`.

Il routing degli asset è definito in `wrangler.toml`. La build genera un documento HTML completo per ogni pagina e Cloudflare usa `drop-trailing-slash` per mantenere URL puliti. Le richieste `/api/*` passano dal Worker.

## D1 e Worker

Creare il database:

```bash
npx wrangler d1 create marina-chiarelli
```

Inserire il binding D1 nel pannello Cloudflare oppure aggiungere a `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "marina-chiarelli"
database_id = "ID_REALE_DEL_DATABASE"
```

Quindi applicare la migrazione:

```bash
npx wrangler d1 migrations apply marina-chiarelli --remote
```

Configurare il segreto admin:

```bash
npx wrangler secret put ADMIN_PASSWORD
```

Avvio Worker locale e deploy:

```bash
npx wrangler dev
npx wrangler deploy
```

Il cron è configurato ogni giorno alle 05:00 UTC. Ogni esecuzione salva query, conteggi, errori e durata in `cron_logs`.

## Variabili ambiente

Consultare `.env.example`. Le credenziali SMTP e la password admin non devono essere committate. Per Cloudflare usare Secrets; per Pages usare Environment Variables.

Variabili previste:

- `ADMIN_PASSWORD`
- `ALLOWED_ORIGIN`
- `PRESS_PROVIDER`
- `PRESS_FEEDS`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

I campi social sono in `src/data/content.ts`. Pubblicare soltanto profili verificati.

## Area amministrazione

La route `/admin` mostra una prima interfaccia editoriale per la rassegna stampa. Prima di abilitarla per l'uso redazionale, l'autenticazione frontend deve essere sostituita con Cloudflare Access o un provider OIDC e tutte le operazioni CRUD devono passare dal Worker.

## Rassegna stampa

Lo schema D1 include URL canonico, hash duplicato, sintesi originale, sentiment, confidence, motivazione, azione raccomandata, whitelist e stato editoriale. Il Worker mantiene provider, classificazione e persistenza separati. Nessuna fonte giornalistica generica deve essere pubblicata automaticamente.

Le parole di rischio portano il contenuto in revisione. Articoli ambigui o negativi restano non pubblici. L'adapter RSS è predisposto ma non esegue importazioni finché `PRESS_FEEDS` non è configurato.

## Contatti e newsletter

Gli endpoint `/api/contact` e `/api/newsletter` validano, sanitizzano e salvano i dati in D1. I form della prima versione mostrano il flusso completo lato interfaccia; il collegamento HTTP al Worker va attivato impostando `VITE_API_URL` in fase di deploy. Prima del lancio vanno aggiunti Turnstile e un rate limit basato su Cloudflare.

## Contenuti e fonti

Biografia, incarichi, progetti, news, rassegna e media derivano dal dossier editoriale verificato e dalle fonti istituzionali o giornalistiche collegate in ogni scheda. La rassegna usa esclusivamente sintesi originali, titolo, fonte, data e link esterno. Le attività mostrate in agenda sono elementi documentati, non appuntamenti futuri inventati.

## SEO

Ogni URL pubblico viene prerenderizzato con:

- title e meta description specifici
- canonical coerente
- Open Graph e Twitter Card
- un solo H1
- contenuto principale già presente nell'HTML
- JSON-LD `Person` o `WebPage`
- sitemap completa e robots.txt

Quando viene collegato un dominio personalizzato, aggiornare `site.origin` in `src/data/content.ts`, `ALLOWED_ORIGIN` in `wrangler.toml` e gli URL in `public/robots.txt`.

La rassegna stampa non riproduce articoli: usa sintesi originali e link alla fonte. Privacy e Cookie Policy devono essere sottoposte a verifica legale prima dell'attivazione definitiva dei moduli e della newsletter.
