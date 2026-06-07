import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { ArrowRight, Check, ExternalLink, Menu, Play, Quote, X } from 'lucide-react'
import { events, interventions, media, news, pillars, press, projects } from './data/content'
import './App.css'

type EditorialItem = {
  slug?: string; title: string; category?: string; source?: string; location?: string;
  date?: string; year?: string; day?: string; month?: string; status?: string;
  summary?: string; excerpt?: string; description?: string; url?: string;
  body?: string; body2?: string; territories?: string;
}

const nav = [
  ['Chi è Marina', '/chi-e-marina'], ['Impegno', '/impegno'], ['Progetti', '/progetti'],
  ['Agenda', '/agenda'], ['Rassegna stampa', '/rassegna-stampa'], ['Media', '/media'],
  ['Interventi', '/interventi'], ['Contatti', '/contatti'],
]

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="header">
    <div className="shell nav-shell">
      <Link className="brand" to="/" onClick={() => setOpen(false)}>
        <span>Marina</span> Chiarelli
      </Link>
      <button className="menu-button" aria-label={open ? 'Chiudi menu' : 'Apri menu'} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Navigazione principale">
        {nav.map(([label, href]) => <NavLink key={href} to={href} onClick={() => setOpen(false)}>{label}</NavLink>)}
      </nav>
    </div>
  </header>
}

function Footer() {
  return <footer className="footer">
    <div className="shell footer-grid">
      <div><div className="brand light"><span>Marina</span> Chiarelli</div><p>Cultura, comunità e futuro del Piemonte.</p></div>
      <div><h3>Esplora</h3><Link to="/chi-e-marina">Chi è Marina</Link><Link to="/impegno">Il suo impegno</Link><Link to="/agenda">Agenda</Link><Link to="/contatti">Contatti</Link></div>
      <div><h3>Temi</h3><Link to="/impegno/cultura">Cultura</Link><Link to="/impegno/pari-opportunita">Pari opportunità</Link><Link to="/impegno/politiche-giovanili">Politiche giovanili</Link></div>
      <div><h3>Informazioni</h3><Link to="/privacy">Privacy policy</Link><Link to="/cookie">Cookie policy</Link><Link to="/admin">Area amministrazione</Link></div>
    </div>
    <div className="shell footer-bottom"><span>© 2026 Marina Chiarelli</span><span>Sito personale-istituzionale</span></div>
  </footer>
}

function Layout({ children }: { children: React.ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>
}

function ArrowLink({ to, children }: { to: string, children: React.ReactNode }) {
  return <Link className="arrow-link" to={to}>{children}<ArrowRight size={17} /></Link>
}

function SectionHead({ title, intro, link, label }: { title: string, intro?: string, link?: string, label?: string }) {
  return <div className="section-head"><div><h2>{title}</h2>{intro && <p>{intro}</p>}</div>{link && <ArrowLink to={link}>{label || 'Scopri di più'}</ArrowLink>}</div>
}

function Newsletter() {
  const [sent, setSent] = useState(false)
  return <section className="newsletter"><div className="shell newsletter-grid">
    <div><h2>Resta aggiornato</h2><p>Notizie, interventi e appuntamenti dal Piemonte, con misura e regolarità.</p></div>
    {sent ? <div className="success"><Check /> Iscrizione registrata. Controlla la tua casella email.</div> :
      <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
        <label className="sr-only" htmlFor="newsletter-name">Nome</label><input id="newsletter-name" placeholder="Nome" />
        <label className="sr-only" htmlFor="newsletter-email">Email</label><input id="newsletter-email" required type="email" placeholder="Email" />
        <button type="submit">Iscriviti <ArrowRight size={17} /></button>
        <label className="consent"><input required type="checkbox" /> Ho letto l'informativa privacy e acconsento all'iscrizione.</label>
      </form>}
  </div></section>
}

function Home() {
  return <Layout>
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <h1>Marina<br />Chiarelli</h1>
          <h2>Cultura, comunità e futuro del Piemonte</h2>
          <p>Un impegno istituzionale al servizio della cultura, delle pari opportunità, dei giovani e dei territori piemontesi.</p>
          <div className="button-row"><Link className="button primary" to="/impegno">Scopri il suo impegno</Link><Link className="button text" to="/news">Leggi le ultime notizie <ArrowRight size={17} /></Link></div>
        </div>
        <div className="hero-media">
          <img src="/images/marina-chiarelli.jpg" alt="Marina Chiarelli" />
          <div className="role"><strong>Assessore della Regione Piemonte</strong><span>Cultura, Pari opportunità e Politiche giovanili</span></div>
        </div>
      </div>
    </section>

    <section className="manifesto"><div className="shell manifesto-grid">
      <span className="manifesto-index">01</span>
      <div><Quote className="quote-icon" /><h2>La cultura come<br />infrastruttura del futuro</h2></div>
      <p>La cultura non è solo memoria, ma sviluppo, identità e coesione. Valorizzare il Piemonte significa costruire reti, sostenere i territori, dare spazio ai giovani e trasformare il patrimonio culturale in energia civile, sociale ed economica.</p>
    </div></section>

    <section className="section shell">
      <SectionHead title="Tre responsabilità, una visione" intro="Politiche che si incontrano nella vita concreta delle persone e dei territori." link="/impegno" />
      <div className="pillar-list">{pillars.map((p, i) => <Link to={p.href} className="pillar" key={p.title}><span>0{i + 1}</span><div><h3>{p.title}</h3><p>{p.description}</p></div><ArrowRight /></Link>)}</div>
    </section>

    <section className="section projects-band"><div className="shell">
      <SectionHead title="Progetti per il Piemonte" intro="Percorsi di lavoro che uniscono istituzioni, comunità e competenze." link="/progetti" label="Tutti i progetti" />
      <div className="project-grid">{projects.slice(0, 3).map((p, i) => <article className={i === 0 ? 'project-card featured' : 'project-card'} key={p.slug}><div className={`project-art art-${i + 1}`}><span>{p.category}</span></div><div><span className="meta">{p.status} · {p.territories}</span><h3>{p.title}</h3><p>{p.summary}</p><ArrowLink to={`/progetti/${p.slug}`}>Approfondisci</ArrowLink></div></article>)}</div>
    </div></section>

    <section className="section shell">
      <SectionHead title="Notizie" link="/news" label="Tutte le notizie" />
      <div className="news-layout">
        <article className="lead-story"><span className="meta">{news[0].category} · {news[0].date}</span><h3>{news[0].title}</h3><p>{news[0].summary}</p><ArrowLink to="/news">Leggi la notizia</ArrowLink></article>
        <div className="story-list">{news.slice(1, 4).map(n => <article key={n.title}><span className="meta">{n.category} · {n.date}</span><h3>{n.title}</h3><ArrowRight size={18} /></article>)}</div>
      </div>
    </section>

    <section className="section dark"><div className="shell">
      <SectionHead title="Parole pubbliche" intro="Interventi, riflessioni e contributi sui temi dell'impegno istituzionale." link="/interventi" label="Tutti gli interventi" />
      <div className="intervention-grid">{interventions.slice(0, 3).map((item, i) => <article key={item.slug}><span className="num">0{i + 1}</span><span className="meta">{item.category} · {item.date}</span><h3>{item.title}</h3><p>{item.excerpt}</p><ArrowLink to={`/interventi/${item.slug}`}>Leggi</ArrowLink></article>)}</div>
    </div></section>

    <section className="section shell split-section">
      <div><SectionHead title="Rassegna stampa" link="/rassegna-stampa" label="Archivio stampa" />{press.slice(0, 3).map(p => <article className="press-row" key={p.title}><div><span className="meta">{p.source} · {p.date}</span><h3>{p.title}</h3></div><ExternalLink size={18} /></article>)}</div>
      <div><SectionHead title="In agenda" link="/agenda" label="Tutti gli appuntamenti" />{events.slice(0, 3).map(e => <article className="event-row" key={e.title}><div className="date-box"><strong>{e.day}</strong><span>{e.month}</span></div><div><span className="meta">{e.location}</span><h3>{e.title}</h3></div></article>)}</div>
    </section>

    <section className="media-feature"><div className="shell media-grid"><div className="media-visual"><button aria-label="Riproduci video"><Play fill="currentColor" /></button></div><div><span className="meta">Media · In evidenza</span><h2>Luoghi, incontri, comunità</h2><p>Immagini e video dall'attività istituzionale, dai progetti culturali e dal dialogo con i territori piemontesi.</p><ArrowLink to="/media">Esplora la sezione media</ArrowLink></div></div></section>
    <Newsletter />
  </Layout>
}

function PageHero({ title, intro }: { title: string, intro?: string }) {
  return <section className="page-hero"><div className="shell"><h1>{title}</h1><p>{intro}</p></div></section>
}

function Biography() {
  const timeline = [
    ['2006', 'Inizia il percorso professionale forense, maturando esperienza nel diritto civile e amministrativo.'],
    ['2016', 'L’impegno pubblico si consolida nel territorio novarese e nel dialogo con le comunità locali.'],
    ['2018', 'Entra in Consiglio regionale e partecipa ai lavori delle commissioni istituzionali.'],
    ['2021', 'Assume incarichi di responsabilità nell’Ufficio di Presidenza del Consiglio regionale.'],
    ['2024', 'È nominata Assessore regionale a Cultura, Pari opportunità e Politiche giovanili.'],
  ]
  return <Layout><PageHero title="Chi è Marina" intro="Un percorso nelle istituzioni, con radici nel territorio e uno sguardo rivolto al futuro del Piemonte." />
    <section className="section shell bio-grid"><img src="/images/marina-chiarelli.jpg" alt="Ritratto istituzionale di Marina Chiarelli" /><div className="prose"><h2>Responsabilità pubblica e ascolto</h2><p>Marina Chiarelli è avvocata e Assessore della Regione Piemonte. Il suo percorso intreccia competenze giuridiche, esperienza amministrativa e una presenza costante nei territori.</p><p>Nata a Briga Novarese, ha costruito la propria esperienza tra professione, istituzioni e comunità locali. Oggi segue le deleghe alla Cultura, alle Pari opportunità e alle Politiche giovanili, ambiti che considera strettamente connessi alla qualità dello sviluppo regionale.</p><p>Il lavoro istituzionale parte dall’ascolto: enti locali, associazioni, fondazioni, operatori culturali, scuole e nuove generazioni. L’obiettivo è dare continuità alle reti esistenti e creare opportunità accessibili in tutto il Piemonte.</p><blockquote>«Un territorio cresce quando riconosce il proprio patrimonio e offre alle persone gli strumenti per immaginare ciò che verrà.»</blockquote></div></section>
    <section className="timeline-section"><div className="shell"><SectionHead title="Il percorso" intro="Le tappe essenziali di un impegno costruito nel tempo." /><div className="timeline">{timeline.map(([year, text]) => <div key={year}><strong>{year}</strong><p>{text}</p></div>)}</div></div></section>
    <Newsletter /></Layout>
}

function Commitment() {
  return <Layout><PageHero title="Il suo impegno" intro="Cultura, pari opportunità e politiche giovanili: tre ambiti connessi da una visione comune di sviluppo e partecipazione." />
    <section className="section shell commitment-list">{pillars.map((p, i) => <article key={p.title}><span>0{i + 1}</span><div><h2>{p.title}</h2><p>{p.long}</p><h3>Priorità</h3><ul>{p.goals.map(g => <li key={g}>{g}</li>)}</ul><ArrowLink to={p.href}>Esplora il tema</ArrowLink></div></article>)}</section><Newsletter /></Layout>
}

function ThemePage({ type }: { type: 'cultura' | 'pari' | 'giovani' }) {
  const p = pillars.find(x => x.key === type)!
  return <Layout><PageHero title={p.title} intro={p.long} />
    <section className="section shell theme-grid"><div><h2>Una politica vicina ai territori</h2><p>{p.editorial}</p><p>{p.editorial2}</p></div><aside><h3>Ambiti di lavoro</h3>{p.goals.map(g => <div key={g}>{g}</div>)}</aside></section>
    <section className="section projects-band"><div className="shell"><SectionHead title="Progetti e percorsi collegati" /><div className="project-grid compact">{projects.filter(x => x.theme === type || x.theme === 'all').slice(0, 3).map((x, i) => <article className="project-card" key={x.slug}><div className={`project-art art-${i + 1}`} /><div><span className="meta">{x.status}</span><h3>{x.title}</h3><p>{x.summary}</p></div></article>)}</div></div></section><Newsletter /></Layout>
}

function Listing({ kind }: { kind: string }) {
  const configs: Record<string, { title: string, intro: string }> = {
    projects: { title: 'Progetti', intro: 'Iniziative e percorsi di lavoro per valorizzare cultura, territori, persone e nuove generazioni.' },
    news: { title: 'Notizie', intro: 'Attività istituzionale, incontri, progetti e aggiornamenti dal territorio.' },
    agenda: { title: 'Agenda', intro: 'Gli appuntamenti pubblici e le occasioni di incontro sul territorio piemontese.' },
    press: { title: 'Rassegna stampa', intro: 'Una selezione approvata di articoli e contributi, con sintesi originale e collegamento alla fonte.' },
    media: { title: 'Media', intro: 'Foto, video, interviste e materiali ufficiali dall’attività istituzionale.' },
    interventions: { title: 'Interventi', intro: 'Discorsi, dichiarazioni e riflessioni sui temi al centro dell’impegno pubblico.' },
  }
  const data = kind === 'projects' ? projects : kind === 'news' ? news : kind === 'agenda' ? events : kind === 'press' ? press : kind === 'media' ? media : interventions
  return <Layout><PageHero {...configs[kind]} /><section className="section shell archive-grid">
    {(data as EditorialItem[]).map((item, i) => <article key={item.slug || item.title} className={kind === 'agenda' ? 'archive-item agenda-item' : 'archive-item'}>
      {kind === 'agenda' && <div className="date-box"><strong>{item.day}</strong><span>{item.month}</span></div>}
      {kind === 'media' && <div className={`project-art media-art art-${(i % 3) + 1}`}><Play /></div>}
      <div><span className="meta">{item.category || item.source || item.location} · {item.date || item.year}</span><h2>{item.title}</h2><p>{item.summary || item.excerpt || item.description}</p>
      {kind === 'press' ? <a className="arrow-link" href={item.url} target="_blank" rel="noreferrer">Vai alla fonte <ExternalLink size={16} /></a> : <ArrowLink to={item.slug ? `/${kind === 'projects' ? 'progetti' : kind === 'interventions' ? 'interventi' : kind}/${item.slug}` : '#'}>Approfondisci</ArrowLink>}</div>
    </article>)}
  </section><Newsletter /></Layout>
}

function Detail({ type }: { type: 'project' | 'intervention' }) {
  const { slug } = useParams()
  const item = (type === 'project' ? projects : interventions).find(x => x.slug === slug) as EditorialItem | undefined
  if (!item) return <Layout><PageHero title="Contenuto non trovato" intro="Il contenuto richiesto non è disponibile." /></Layout>
  return <Layout><PageHero title={item.title} intro={item.summary || item.excerpt} /><article className="section shell article-prose"><span className="meta">{item.category} · {item.date}</span><h2>{type === 'project' ? 'Un percorso aperto e condiviso' : 'Il contributo'}</h2><p>{item.body}</p><p>{item.body2}</p>{type === 'project' && <><h3>Territori coinvolti</h3><p>{item.territories}</p><h3>Stato del progetto</h3><p>{item.status}</p></>}</article><Newsletter /></Layout>
}

function Contacts() {
  const [sent, setSent] = useState(false)
  return <Layout><PageHero title="Contatti" intro="Per richieste istituzionali, inviti, segnalazioni e proposte relative ai temi dell’impegno pubblico." />
    <section className="section shell contact-grid"><div><h2>Scrivi a Marina Chiarelli</h2><p>Il messaggio sarà trattato nel rispetto della privacy e indirizzato all’area competente.</p><div className="contact-note"><strong>Ufficio istituzionale</strong><span>Regione Piemonte · Torino</span><span>Risposta compatibilmente con i tempi dell’attività istituzionale.</span></div></div>
      {sent ? <div className="success large"><Check /> <div><strong>Messaggio ricevuto</strong><p>Grazie. La richiesta è stata registrata correttamente.</p></div></div> :
      <form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true) }}>
        <div className="two"><label>Nome<input required name="name" /></label><label>Cognome<input required name="surname" /></label></div>
        <div className="two"><label>Email<input required type="email" name="email" /></label><label>Telefono <small>opzionale</small><input type="tel" name="phone" /></label></div>
        <label>Messaggio<textarea required rows={7} name="message" /></label>
        <label className="consent"><input required type="checkbox" /> Acconsento al trattamento dei dati secondo la Privacy Policy.</label>
        <label className="consent"><input type="checkbox" /> Desidero ricevere aggiornamenti via email.</label>
        <button className="button primary" type="submit">Invia il messaggio</button>
      </form>}
    </section></Layout>
}

function Legal({ cookie = false }: { cookie?: boolean }) {
  return <Layout><PageHero title={cookie ? 'Cookie Policy' : 'Privacy Policy'} intro="Informazioni sul trattamento dei dati personali e sull’utilizzo del sito." /><article className="section shell article-prose"><h2>{cookie ? 'Uso dei cookie' : 'Titolare e finalità del trattamento'}</h2><p>Questa versione dimostrativa utilizza esclusivamente funzionalità tecniche necessarie alla navigazione. Prima della pubblicazione, i dati del titolare, i recapiti e i servizi effettivamente attivati dovranno essere verificati dal responsabile del progetto e dal consulente privacy.</p><h2>Dati raccolti</h2><p>I moduli raccolgono soltanto i dati conferiti volontariamente dall’utente. Il consenso newsletter è distinto e facoltativo. I dati non sono ceduti a terzi, salvo obblighi di legge o fornitori nominati responsabili del trattamento.</p><h2>Diritti dell’interessato</h2><p>È possibile richiedere accesso, rettifica, cancellazione, limitazione e opposizione secondo il Regolamento UE 2016/679.</p></article></Layout>
}

function Admin() {
  const [status, setStatus] = useState('Tutti')
  const [logged, setLogged] = useState(false)
  const filtered = useMemo(() => status === 'Tutti' ? press : press.filter(p => p.status === status.toLowerCase()), [status])
  if (!logged) return <div className="admin-login"><form onSubmit={e => { e.preventDefault(); setLogged(true) }}><div className="brand"><span>Marina</span> Chiarelli</div><h1>Area amministrazione</h1><p>Accesso dimostrativo. In produzione la password è letta dalla variabile <code>ADMIN_PASSWORD</code>.</p><label>Password<input required type="password" defaultValue="demo" /></label><button className="button primary">Accedi</button><Link to="/">Torna al sito</Link></form></div>
  return <div className="admin-shell"><aside><div className="brand light"><span>Marina</span> Chiarelli</div>{['Dashboard','News','Progetti','Agenda','Media','Interventi','Rassegna stampa','Contatti','Newsletter','Impostazioni'].map(x => <button className={x === 'Rassegna stampa' ? 'active' : ''} key={x}>{x}</button>)}</aside><main className="admin-main"><header><div><span>Area amministrazione</span><h1>Rassegna stampa</h1></div><button onClick={() => setLogged(false)}>Esci</button></header><div className="admin-tabs">{['Tutti','Pubblicati','Bozze','In revisione','Scartati'].map(x => <button className={status === x ? 'active' : ''} onClick={() => setStatus(x)} key={x}>{x}</button>)}</div><div className="admin-filters"><select aria-label="Sentiment"><option>Tutti i sentiment</option><option>Positive</option><option>Neutral</option><option>Ambiguous</option><option>Negative</option></select><select aria-label="Fonte"><option>Tutte le fonti</option><option>Whitelist</option><option>Non whitelist</option></select></div><div className="table-wrap"><table><thead><tr><th>Titolo e fonte</th><th>Data</th><th>Sentiment</th><th>Confidence</th><th>Stato</th><th>Azioni</th></tr></thead><tbody>{filtered.map(p => <tr key={p.title}><td><strong>{p.title}</strong><span>{p.source}</span></td><td>{p.date}</td><td><span className={`badge ${p.sentiment}`}>{p.sentiment}</span></td><td>{Math.round(p.confidence * 100)}%</td><td><span className="status">{p.status}</span></td><td><button>Apri</button><button>•••</button></td></tr>)}</tbody></table></div></main></div>
}

function App() {
  return <BrowserRouter><ScrollTop /><Routes>
    <Route path="/" element={<Home />} /><Route path="/chi-e-marina" element={<Biography />} /><Route path="/impegno" element={<Commitment />} />
    <Route path="/impegno/cultura" element={<ThemePage type="cultura" />} /><Route path="/impegno/pari-opportunita" element={<ThemePage type="pari" />} /><Route path="/impegno/politiche-giovanili" element={<ThemePage type="giovani" />} />
    <Route path="/progetti" element={<Listing kind="projects" />} /><Route path="/progetti/:slug" element={<Detail type="project" />} />
    <Route path="/news" element={<Listing kind="news" />} /><Route path="/agenda" element={<Listing kind="agenda" />} /><Route path="/rassegna-stampa" element={<Listing kind="press" />} />
    <Route path="/media" element={<Listing kind="media" />} /><Route path="/interventi" element={<Listing kind="interventions" />} /><Route path="/interventi/:slug" element={<Detail type="intervention" />} />
    <Route path="/contatti" element={<Contacts />} /><Route path="/privacy" element={<Legal />} /><Route path="/cookie" element={<Legal cookie />} /><Route path="/admin" element={<Admin />} />
    <Route path="*" element={<Layout><PageHero title="Pagina non trovata" intro="La pagina richiesta non è disponibile." /></Layout>} />
  </Routes></BrowserRouter>
}

export default App
