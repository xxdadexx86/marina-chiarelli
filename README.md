# Marina Chiarelli

Prima versione della piattaforma personale-istituzionale di Marina Chiarelli. Il progetto presenta attività, temi, progetti, agenda, interventi, media e rassegna stampa con un tono editoriale sobrio e non partitico.

## Stack

- React 19, TypeScript, Vite
- React Router
- Cloudflare Pages per il frontend
- Cloudflare Worker per API e cron
- Cloudflare D1 per dati editoriali, contatti e log
- Lucide per le icone

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
  data/content.ts       contenuti demo strutturati
  App.tsx               routing, pagine e componenti
  App.css               design system responsive
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

Il fallback SPA e il routing degli asset sono già definiti in `wrangler.toml`. Le richieste `/api/*` passano dal Worker; tutte le altre route servono il frontend React.

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

Variabili previste: `ADMIN_PASSWORD`, `ALLOWED_ORIGIN`, `PRESS_PROVIDER`, `PRESS_FEEDS`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

## Area amministrazione

La route `/admin` mostra la prima interfaccia editoriale, inclusa la coda della rassegna stampa con filtri per stato e sentiment. L'accesso nel frontend è dimostrativo; in produzione tutte le operazioni CRUD devono passare dal Worker, che verifica `ADMIN_PASSWORD`. La struttura è pronta per sostituire questo meccanismo con Cloudflare Access o un provider OIDC.

## Rassegna stampa

Lo schema D1 include URL canonico, hash duplicato, sintesi originale, sentiment, confidence, motivazione, azione raccomandata, whitelist e stato editoriale. Il Worker mantiene provider, classificazione e persistenza separati. Nessuna fonte giornalistica generica deve essere pubblicata automaticamente.

Le parole di rischio portano il contenuto in revisione. Articoli ambigui o negativi restano non pubblici. L'adapter RSS è predisposto ma non esegue importazioni finché `PRESS_FEEDS` non è configurato.

## Contatti e newsletter

Gli endpoint `/api/contact` e `/api/newsletter` validano, sanitizzano e salvano i dati in D1. I form della prima versione mostrano il flusso completo lato interfaccia; il collegamento HTTP al Worker va attivato impostando `VITE_API_URL` in fase di deploy. Prima del lancio vanno aggiunti Turnstile e un rate limit basato su Cloudflare.

## Contenuti e fonti

I contenuti editoriali datati 2026 sono dimostrativi e non rappresentano eventi o dichiarazioni reali. Ruolo e profilo biografico essenziale sono basati sulla pagina ufficiale della Regione Piemonte. La fotografia è quella pubblicata nella scheda istituzionale regionale.

La rassegna stampa demo non riproduce articoli: usa sintesi originali e link alla fonte. Prima della pubblicazione ogni voce va verificata, approvata e collegata all'articolo effettivo. Privacy e Cookie Policy sono bozze tecniche da sottoporre a verifica legale.
