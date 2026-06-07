import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, Check, Clock3, ExternalLink, Landmark, Mail, MapPin, Menu, Quote, ShieldCheck, Sparkles, X } from 'lucide-react'
import { biography, events, media, news, pillars, press, projects, site, timeline } from './data/content'
import { getSeo } from './data/seo'
import './App.css'

type EditorialItem = {
  slug?: string; title: string; category?: string; source?: string; location?: string;
  date?: string; year?: string; day?: string; month?: string; status?: string;
  summary?: string; excerpt?: string; description?: string; url?: string;
  body?: string; body2?: string; territories?: string; time?: string; tags?: string[];
  sourceUrl?: string; sourceLabel?: string;
  image?: string; theme?: string;
}

const nav = [
  ['Home', '/'], ['Chi è Marina', '/chi-e-marina'], ['Impegno', '/impegno'], ['Progetti', '/progetti'],
  ['Agenda', '/agenda'], ['News', '/news'], ['Rassegna stampa', '/rassegna-stampa'], ['Media', '/media'], ['Contatti', '/contatti'],
]
const socialLabels = { instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn', youtube: 'YouTube' }
const adminStatusMap: Record<string, string> = { Pubblicati: 'published', Bozze: 'draft', 'In revisione': 'review', Scartati: 'discarded' }
const footerNav = nav

function themeKey(value?: string) {
  const text = (value || '').toLowerCase()
  if (text.includes('pari') || text === 'pari') return 'pari'
  if (text.includes('giovani') || text.includes('giovanili') || text === 'giovani') return 'giovani'
  if (text.includes('territ') || text.includes('novara')) return 'territorio'
  return 'cultura'
}

function ThemeIcon({ theme }: { theme?: string }) {
  const key = themeKey(theme)
  if (key === 'pari') return <ShieldCheck aria-hidden="true" />
  if (key === 'giovani') return <Sparkles aria-hidden="true" />
  if (key === 'territorio') return <Landmark aria-hidden="true" />
  return <BookOpen aria-hidden="true" />
}

function SocialIcon({ network }: { network: string }) {
  if (network === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.2" /><circle cx="17" cy="7" r="1" /></svg>
  if (network === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 8.2h2.1V4.7c-.4-.1-1.7-.2-3.2-.2-3.1 0-5.2 1.9-5.2 5.5v3.1H4.5V17h3.4v7h4.1v-7h3.4l.5-3.9H12v-2.7c0-1.1.3-2.2 2.2-2.2Z" /></svg>
  if (network === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.8h3.6V20H5.2V8.8Zm1.8-5A2.1 2.1 0 1 1 7 8a2.1 2.1 0 0 1 0-4.2ZM11 8.8h3.4v1.5h.1a3.7 3.7 0 0 1 3.3-1.8c3.6 0 4.2 2.3 4.2 5.4V20h-3.6v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H11V8.8Z" /></svg>
  if (network === 'youtube') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.4 7.3a3 3 0 0 0-2.1-2.1C17.4 4.7 12 4.7 12 4.7s-5.4 0-7.3.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2.1 12c0 1.6.1 3.2.5 4.7a3 3 0 0 0 2.1 2.1c1.9.5 7.3.5 7.3.5s5.4 0 7.3-.5a3 3 0 0 0 2.1-2.1c.4-1.5.5-3.1.5-4.7 0-1.6-.1-3.2-.5-4.7ZM10 15.4V8.6l5.8 3.4-5.8 3.4Z" /></svg>
  return <Mail size={19} />
}

function SocialLinks({ variant = 'header' }: { variant?: 'header' | 'section' | 'footer' | 'contact' }) {
  return <div className={`social-links ${variant}`} aria-label="Canali social ufficiali">
    {Object.entries(site.socials).filter(([, url]) => url).map(([network, url]) => <a href={url} target="_blank" rel="noreferrer" key={network} aria-label={`${socialLabels[network as keyof typeof socialLabels]} di Marina Chiarelli`}><SocialIcon network={network} /><span>{socialLabels[network as keyof typeof socialLabels]}</span></a>)}
    <Link to="/contatti" aria-label="Scrivi all’ufficio di Marina Chiarelli"><SocialIcon network="email" /><span>Email</span></Link>
  </div>
}

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function SeoHead() {
  const { pathname } = useLocation()
  useEffect(() => {
    const seo = getSeo(pathname)
    const canonical = `${site.origin}${seo.path === '/' ? '/' : seo.path}`
    document.title = seo.title
    const setMeta = (selector: string, attr: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) { element = document.createElement('meta'); document.head.appendChild(element) }
      element.setAttribute(attr, value)
    }
    setMeta('meta[name="description"]', 'content', seo.description)
    setMeta('meta[property="og:title"]', 'content', seo.title)
    setMeta('meta[property="og:description"]', 'content', seo.description)
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[property="og:image"]', 'content', `${site.origin}${seo.image || '/images/marina-chiarelli.jpg'}`)
    setMeta('meta[name="twitter:title"]', 'content', seo.title)
    setMeta('meta[name="twitter:description"]', 'content', seo.description)
    setMeta('meta[name="twitter:image"]', 'content', `${site.origin}${seo.image || '/images/marina-chiarelli.jpg'}`)
    setMeta('meta[name="robots"]', 'content', seo.noindex ? 'noindex,nofollow' : 'index,follow')
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = canonical
  }, [pathname])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="header">
    <div className="shell nav-shell">
      <Link className="brand" to="/" onClick={() => setOpen(false)}>
        <strong><span>Marina</span> Chiarelli</strong>
        <small>Assessore Regione Piemonte</small>
      </Link>
      <button className="menu-button" aria-label={open ? 'Chiudi menu' : 'Apri menu'} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Navigazione principale">
        <div className="nav-main">{nav.map(([label, href]) => <NavLink key={href} to={href} onClick={() => setOpen(false)}>{label}</NavLink>)}</div>
        <SocialLinks />
        <Link className="header-cta" to="/contatti" onClick={() => setOpen(false)}>Contatti</Link>
      </nav>
    </div>
  </header>
}

function Footer() {
  return <footer className="footer">
    <div className="shell footer-grid">
      <div className="footer-identity">
        <div className="footer-brand">Marina Chiarelli</div>
        <strong>Assessore Regione Piemonte</strong>
        <span>Cultura · Pari opportunità · Politiche giovanili</span>
        <p>Un impegno istituzionale per valorizzare cultura, comunità, giovani e territori del Piemonte.</p>
      </div>
      <div>
        <h3>Navigazione</h3>
        <div className="footer-links">{footerNav.map(([label, href]) => <Link key={href} to={href}>{label}</Link>)}</div>
      </div>
      <div>
        <h3>Contatti</h3>
        <div className="footer-contact">
          <span>{site.email}</span>
          <span>{site.office}</span>
          <Link to="/contatti"><Mail size={16} /> Vai alla pagina Contatti</Link>
        </div>
      </div>
      <div>
        <h3>Social</h3>
        <SocialLinks variant="footer" />
      </div>
    </div>
    <div className="shell footer-bottom"><span>Copyright © 2026 Marina Chiarelli</span><span>Sito personale istituzionale</span><Link to="/privacy">Privacy Policy</Link><Link to="/cookie">Cookie Policy</Link></div>
  </footer>
}

function Layout({ children }: { children: React.ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>
}

function PillarCard({ pillar }: { pillar: typeof pillars[number] }) {
  return <Link to={pillar.href} className="pillar"><div className="pillar-icon"><ThemeIcon theme={pillar.key} /></div><div><h3>{pillar.title}</h3><p>{pillar.description}</p><span>Approfondisci</span></div><ArrowRight /></Link>
}

function FallbackVisual({ label, theme }: { label: string, theme?: string }) {
  return <div className={`visual-fallback visual-${themeKey(theme || label)}`}><ThemeIcon theme={theme || label} /><span>{label}</span></div>
}

function ProjectVisual({ item }: { item: EditorialItem }) {
  if (item.image) return <div className="project-image"><img src={item.image} alt={`${item.title} - ${item.category || 'progetto istituzionale'}`} loading="lazy" /></div>
  return <FallbackVisual label={item.category || 'Progetto'} theme={item.theme || item.category} />
}

function ProjectCard({ project, featured = false }: { project: typeof projects[number], featured?: boolean }) {
  return <article className={featured ? 'project-card featured' : 'project-card'}><ProjectVisual item={project} /><div><span className="meta">{project.status} · {project.territories}</span><h3>{project.title}</h3><p>{project.summary}</p><ArrowLink to={`/progetti/${project.slug}`}>Approfondisci</ArrowLink></div></article>
}

function EventCard({ event }: { event: typeof events[number] }) {
  return <article className="event-card"><div className="date-box"><strong>{event.day}</strong><span>{event.month}</span></div><div><span className="meta">{event.category} · {event.status}</span><h3>{event.title}</h3><p><Clock3 size={15} /> {event.time} <MapPin size={15} /> {event.location}</p><span>{event.description}</span></div></article>
}

function NewsCard({ item }: { item: typeof news[number] }) {
  return <article className="news-card"><span className="meta">{item.category} · {item.date}</span><h3>{item.title}</h3><p>{item.summary}</p><ArrowLink to={`/news/${item.slug}`}>Leggi la notizia</ArrowLink></article>
}

function PressCard({ item }: { item: typeof press[number] }) {
  return <article className="press-row"><div><span className="meta">{item.source} · {item.date}</span><h3>{item.title}</h3><p>{item.summary}</p><div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><a href={item.url} target="_blank" rel="noreferrer" aria-label={`Apri la fonte: ${item.title}`}><ExternalLink size={18} /></a></article>
}

function ArrowLink({ to, children }: { to: string, children: React.ReactNode }) {
  return <Link className="arrow-link" to={to}>{children}<ArrowRight size={17} /></Link>
}

function SectionTitle({ title, intro, link, label }: { title: string, intro?: string, link?: string, label?: string }) {
  return <div className="section-head"><div><h2>{title}</h2>{intro && <p>{intro}</p>}</div>{link && <ArrowLink to={link}>{label || 'Scopri di più'}</ArrowLink>}</div>
}

function YouTubeEmbed({ videoId, title }: { videoId: string, title: string }) {
  return <div className="video-embed"><iframe src={`https://www.youtube-nocookie.com/embed/${videoId}`} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
}

function NewsletterForm() {
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

function Hero() {
  return <section className="hero"><div className="shell hero-grid"><div className="hero-copy"><span className="eyebrow">Assessore Regione Piemonte</span><h1>Marina<br />Chiarelli</h1><h2>Cultura, comunità e futuro del Piemonte</h2><p>Un impegno istituzionale per valorizzare il patrimonio culturale, sostenere le pari opportunità, dare spazio ai giovani e rafforzare il legame tra territori e futuro.</p><div className="button-row"><Link className="button primary" to="/impegno">Scopri il suo impegno</Link><Link className="button secondary" to="/agenda">Segui l’agenda <ArrowRight size={18} /></Link></div><div className="hero-tags"><span>Cultura</span><span>Pari opportunità</span><span>Politiche giovanili</span></div></div><div className="hero-media"><div className="photo-frame"><img src="/images/marina-chiarelli.jpg" alt="Marina Chiarelli, Assessore della Regione Piemonte" /></div><div className="role"><strong>Assessore della Regione Piemonte</strong><span>Cultura · Pari opportunità · Politiche giovanili</span></div></div></div></section>
}

function ManifestoSection() {
  return <section className="manifesto"><div className="shell manifesto-grid"><div><Quote className="quote-icon" /><h2>La cultura come infrastruttura del futuro</h2></div><p>La cultura non è solo memoria: è sviluppo, identità, partecipazione e coesione. Valorizzare il Piemonte significa costruire reti, sostenere i territori, dare spazio ai giovani e trasformare il patrimonio culturale in energia civile, sociale ed economica.</p></div></section>
}

function JourneySection() {
  return <section className="journey-section"><div className="shell"><SectionTitle title="Da Novara al Piemonte" intro="Il percorso istituzionale di Marina Chiarelli nasce nel territorio e si consolida attraverso incarichi amministrativi concreti: dall’esperienza nel Comune di Novara, dove ha ricoperto il ruolo di Vicesindaco e Assessore, fino all’impegno in Regione Piemonte nei settori della cultura, delle pari opportunità e delle politiche giovanili." /><div className="journey-timeline">{timeline.map(item => <article key={item.year}><span>{item.year}</span><h3>{item.short}</h3><p>{item.text}</p></article>)}</div></div></section>
}

function Home() {
  return <Layout>
    <Hero />
    <ManifestoSection />

    <section className="section shell">
      <SectionTitle title="Tre pilastri dell’impegno" intro="Cultura, pari opportunità e politiche giovanili come responsabilità pubbliche concrete per il Piemonte." link="/impegno" />
      <div className="pillar-list">{pillars.map(p => <PillarCard pillar={p} key={p.title} />)}</div>
    </section>

    <JourneySection />

    <section className="section projects-band"><div className="shell">
      <SectionTitle title="Progetti per il Piemonte" intro="Percorsi di lavoro che uniscono istituzioni, comunità e competenze." link="/progetti" label="Tutti i progetti" />
      <div className="project-grid">{projects.slice(0, 3).map((p, i) => <ProjectCard project={p} featured={i === 0} key={p.slug} />)}</div>
    </div></section>

    <section className="section shell">
      <SectionTitle title="Attività documentate" intro="Appuntamenti e iniziative pubbliche collegati ai principali dossier istituzionali." link="/agenda" label="Archivio attività" />
      <div className="event-grid">{events.slice(0, 3).map(event => <EventCard event={event} key={event.title} />)}</div>
    </section>

    <section className="section dark"><div className="shell">
      <SectionTitle title="Ultime news" intro="Attività istituzionale, incontri e aggiornamenti dai territori piemontesi." link="/news" label="Tutte le news" />
      <div className="intervention-grid">{news.slice(0, 3).map(item => <NewsCard item={item} key={item.slug} />)}</div>
    </div></section>

    <section className="section shell"><SectionTitle title="Rassegna stampa" intro="Una selezione verificata di contenuti pubblicati da fonti istituzionali e territoriali." link="/rassegna-stampa" label="Archivio stampa" /><div className="press-grid">{press.filter(item => item.status === 'published').slice(0, 3).map(item => <PressCard item={item} key={item.title} />)}</div></section>

    <section className="media-feature"><div className="shell media-grid"><YouTubeEmbed videoId="SwvRO7lXD50" title="Intervista a Marina Chiarelli sulle politiche culturali piemontesi" /><div><span className="meta">Media · Intervista</span><h2>Cultura, giovani e territori</h2><p>Un’intervista dedicata alle politiche culturali piemontesi, alle pari opportunità e al lavoro rivolto alle nuove generazioni.</p><ArrowLink to="/media">Guarda tutti i video</ArrowLink></div></div></section>
    <section className="social-section"><div className="shell social-section-grid"><div><span className="eyebrow">Canali ufficiali</span><h2>Segui Marina</h2><p>Aggiornamenti, incontri, iniziative e momenti istituzionali dal Piemonte e dai suoi territori.</p><Link className="button social-cta" to="/news">Segui gli aggiornamenti <ArrowRight size={18} /></Link></div><SocialLinks variant="section" /></div></section>
    <NewsletterForm />
  </Layout>
}

function PageHero({ title, intro }: { title: string, intro?: string }) {
  return <section className="page-hero"><div className="shell"><h1>{title}</h1><p>{intro}</p></div></section>
}

function Biography() {
  return <Layout><PageHero title="Chi è Marina" intro="Una storia istituzionale nata a Novara e oggi al servizio del Piemonte." />
    <section className="section shell bio-intro"><img src="/images/marina-chiarelli.jpg" alt="Ritratto istituzionale di Marina Chiarelli" /><div><span className="eyebrow">Marina Chiarelli</span><h2>Competenza, responsabilità e attenzione ai territori</h2><p>{biography.birth}. Dopo la laurea in Giurisprudenza presso l’Università degli Studi di Milano-Bicocca, avvia nel 2006 il proprio studio legale a Novara, costruendo un percorso professionale fondato sulla competenza e sull’attenzione alle persone.</p></div></section>
    <section className="shell biography-story">
      <article><span>Novara</span><div><h2>Radici novaresi</h2><p>Il legame con Novara attraversa la sua esperienza professionale e istituzionale. È nel territorio novarese che matura le prime responsabilità pubbliche e il confronto quotidiano con enti, servizi, attività economiche e comunità locali.</p></div></article>
      <article><span>Professione</span><div><h2>Formazione giuridica e professione</h2><p>La formazione giuridica e l’attività forense sviluppano un metodo fondato sull’analisi, sull’ascolto e sulla responsabilità delle decisioni. Dal 2006 è titolare di uno studio legale nella sua città.</p></div></article>
      <article><span>Comune</span><div><h2>L’impegno amministrativo</h2><p>Tra ottobre 2016 e maggio 2018 presiede il Consorzio Bacino Basso Novarese e l’ATO Rifiuti Novarese. Nel 2018 entra nella Giunta comunale seguendo Ambiente e Sport; dal 2019 assume anche le deleghe a impiantistica sportiva, Pari opportunità e sponsorizzazioni.</p></div></article>
      <article><span>Città</span><div><h2>L’esperienza da Vicesindaco</h2><p>Eletta alle amministrative comunali del 2021, dal 16 ottobre 2022 ricopre il ruolo di Vicesindaco e Assessore con competenze su Commercio, Artigianato, Industria e Agricoltura, mercati cittadini, valorizzazione del centro storico e tutela dei consumatori.</p></div></article>
      <article><span>Regione</span><div><h2>Il ruolo in Regione Piemonte</h2><p>Il 1° luglio 2024 entra nella Giunta regionale. Dal 25 giugno 2025 il mandato si concentra su Cultura, Pari opportunità e Politiche giovanili, tre ambiti legati alla qualità della vita, alla coesione e alle opportunità dei territori.</p></div></article>
      <article><span>Visione</span><div><h2>Una visione per il Piemonte</h2><p>La cultura come infrastruttura civile ed economica, le pari opportunità come politica concreta e i giovani come protagonisti: una linea di lavoro che unisce identità locale, reti regionali e capacità progettuale.</p><blockquote>«La cultura oggi è una leva economica, sociale e identitaria.»</blockquote><a className="arrow-link" href="https://www.regione.piemonte.it/web/amministrazione/organi/chiarelli-marina" target="_blank" rel="noreferrer">Profilo ufficiale Regione Piemonte <ExternalLink size={16} /></a></div></article>
    </section>
    <section className="bio-values shell">{[['Professione','Avvocata e titolare dal 2006 di uno studio legale a Novara.'],['Novara','Un’esperienza amministrativa iniziata in Giunta nel 2018 e proseguita come Vicesindaco.'],['Regione','Assessore della Regione Piemonte dal 1° luglio 2024.'],['Deleghe','Cultura, Pari opportunità e Politiche giovanili dal 25 giugno 2025.']].map(([title,text]) => <article key={title}><h2>{title}</h2><p>{text}</p></article>)}</section>
    <section className="timeline-section"><div className="shell"><SectionTitle title="Il percorso" intro="Le tappe essenziali di un impegno costruito nel tempo." /><div className="timeline">{timeline.map(item => <div key={item.year}><strong>{item.year}</strong><p>{item.text}</p></div>)}</div></div></section>
    <NewsletterForm /></Layout>
}

function Commitment() {
  return <Layout><PageHero title="Il suo impegno" intro="Tre ambiti per costruire comunità più forti, inclusive e consapevoli." />
    <section className="section shell commitment-list">{pillars.map(p => <article key={p.title}><div className="commitment-icon"><ThemeIcon theme={p.key} /></div><div><h2>{p.title}</h2><p>{p.long}</p><h3>Obiettivi e temi principali</h3><ul>{p.goals.map(g => <li key={g}>{g}</li>)}</ul><div className="related-line"><strong>Contenuti collegati</strong><span>{projects.filter(project => project.theme === p.key || project.theme === 'all').length} progetti</span><span>{news.filter(item => item.category.toLowerCase().includes(p.title.split(' ')[0].toLowerCase())).length} news</span><span>{media.filter(item => item.description.toLowerCase().includes(p.title.split(' ')[0].toLowerCase())).length} media</span></div><ArrowLink to={p.href}>Esplora il tema</ArrowLink></div></article>)}</section><NewsletterForm /></Layout>
}

function ThemePage({ type }: { type: 'cultura' | 'pari' | 'giovani' }) {
  const p = pillars.find(x => x.key === type)!
  return <Layout><PageHero title={p.title} intro={p.long} />
    <section className="section shell theme-grid"><div><h2>Una politica vicina ai territori</h2><p>{p.editorial}</p><p>{p.editorial2}</p></div><aside><h3>Ambiti di lavoro</h3>{p.goals.map(g => <div key={g}>{g}</div>)}</aside></section>
    <section className="section projects-band"><div className="shell"><SectionTitle title="Progetti e percorsi collegati" /><div className="project-grid compact">{projects.filter(x => x.theme === type || x.theme === 'all').slice(0, 3).map(x => <article className="project-card" key={x.slug}><ProjectVisual item={x} /><div><span className="meta">{x.status}</span><h3>{x.title}</h3><p>{x.summary}</p></div></article>)}</div></div></section><NewsletterForm /></Layout>
}

function Listing({ kind }: { kind: string }) {
  const configs: Record<string, { title: string, intro: string }> = {
    projects: { title: 'Progetti', intro: 'Iniziative e percorsi di lavoro per valorizzare cultura, territori, persone e nuove generazioni.' },
    news: { title: 'Notizie', intro: 'Attività istituzionale, incontri, progetti e aggiornamenti dal territorio.' },
    agenda: { title: 'Agenda', intro: 'Incontri, appuntamenti istituzionali e iniziative sul territorio. Gli elementi pubblicati sono documentati dalle fonti disponibili.' },
    press: { title: 'Rassegna stampa', intro: 'Una selezione approvata di articoli e contributi, con sintesi originale e collegamento alla fonte.' },
    media: { title: 'Media', intro: 'Foto, video, interviste e materiali ufficiali dall’attività istituzionale.' },
  }
  const data = kind === 'projects' ? projects : kind === 'news' ? news : kind === 'agenda' ? events : kind === 'press' ? press.filter(item => item.status === 'published') : media
  return <Layout><PageHero {...configs[kind]} /><section className="section shell archive-grid">
    {(data as EditorialItem[]).map(item => <article key={item.slug || item.title} className={kind === 'agenda' ? 'archive-item agenda-item' : 'archive-item'}>
      {kind === 'agenda' && <div className="date-box"><strong>{item.day}</strong><span>{item.month}</span></div>}
      {kind === 'media' && <FallbackVisual label={item.category || 'Media'} theme={item.category} />}
      <div><span className="meta">{item.category || item.source || item.location} · {item.date || item.year}</span><h2>{item.title}</h2><p>{item.summary || item.excerpt || item.description}</p>
      {kind === 'agenda' && <p className="event-details"><Clock3 size={15} /> {item.time} <MapPin size={15} /> {item.location} · {item.status}</p>}
      {kind === 'press' || kind === 'media' || kind === 'agenda' ? <a className="arrow-link" href={item.url} target="_blank" rel="noreferrer">Vai alla fonte <ExternalLink size={16} /></a> : <ArrowLink to={item.slug ? `/${kind === 'projects' ? 'progetti' : kind}/${item.slug}` : '#'}>Approfondisci</ArrowLink>}</div>
    </article>)}
  </section><NewsletterForm /></Layout>
}

function MediaPage() {
  const youtubeVideos = [
    { ...media[0], videoId: 'SwvRO7lXD50' },
    { ...media[1], videoId: 'C824hstnRF0' },
  ]
  const socialMedia = media.slice(2)
  return <Layout><PageHero title="Media" intro="Video, interviste e contenuti ufficiali dall’attività istituzionale." />
    <section className="section shell">
      <SectionTitle title="Video e interviste" intro="Guarda gli interventi direttamente dal sito attraverso il player ufficiale YouTube." />
      <div className="video-grid">{youtubeVideos.map(item => <article className="video-card" key={item.slug}>
        <YouTubeEmbed videoId={item.videoId} title={item.title} />
        <span className="meta">{item.category} · {item.year}</span><h2>{item.title}</h2><p>{item.description}</p>
      </article>)}</div>
    </section>
    <section className="section projects-band"><div className="shell">
      <SectionTitle title="Dai canali social" intro="Campagne, appuntamenti e aggiornamenti pubblicati sui profili ufficiali." />
      <div className="social-media-grid">{socialMedia.map(item => <article className="social-media-card" key={item.slug}><div><span className="meta">{item.category} · {item.year}</span><h2>{item.title}</h2><p>{item.description}</p></div><a className="arrow-link" href={item.url} target="_blank" rel="noreferrer">Apri il contenuto <ExternalLink size={16} /></a></article>)}</div>
    </div></section><NewsletterForm />
  </Layout>
}

function Detail({ type }: { type: 'project' | 'news' }) {
  const { slug } = useParams()
  const item = (type === 'project' ? projects : news).find(x => x.slug === slug) as EditorialItem | undefined
  if (!item) return <Layout><PageHero title="Contenuto non trovato" intro="Il contenuto richiesto non è disponibile." /></Layout>
  return <Layout><PageHero title={item.title} intro={item.summary || item.excerpt} /><article className="section shell article-prose"><span className="meta">{item.category} · {item.date}</span><h2>{type === 'project' ? 'Obiettivi e azioni' : 'La notizia'}</h2><p>{item.body}</p><p>{item.body2}</p>{item.tags && <div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}{type === 'project' && <><h3>Territori coinvolti</h3><p>{item.territories}</p><h3>Stato del progetto</h3><p>{item.status}</p></>}{item.sourceUrl && <p><a className="arrow-link" href={item.sourceUrl} target="_blank" rel="noreferrer">Fonte: {item.sourceLabel || 'approfondimento ufficiale'} <ExternalLink size={16} /></a></p>}</article><NewsletterForm /></Layout>
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  return sent ? <div className="success large"><Check /> <div><strong>Messaggio ricevuto</strong><p>Grazie. La richiesta è stata registrata correttamente.</p></div></div> :
      <form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true) }}>
        <div className="two"><label>Nome<input required name="name" /></label><label>Cognome<input required name="surname" /></label></div>
        <div className="two"><label>Email<input required type="email" name="email" /></label><label>Telefono <small>opzionale</small><input type="tel" name="phone" /></label></div>
        <label>Messaggio<textarea required rows={7} name="message" /></label>
        <label className="consent"><input required type="checkbox" /> Acconsento al trattamento dei dati secondo la Privacy Policy.</label>
        <label className="consent"><input type="checkbox" /> Desidero ricevere aggiornamenti via email.</label>
        <button className="button primary" type="submit">Invia il messaggio</button>
      </form>
}

function Contacts() {
  return <Layout><PageHero title="Contatti" intro="Per richieste istituzionali, inviti, segnalazioni e proposte relative ai temi dell’impegno pubblico." />
    <section className="section shell contact-grid"><div><h2>Scrivi a Marina Chiarelli</h2><p>Il messaggio sarà trattato nel rispetto della privacy e indirizzato all’area competente.</p><div className="contact-note"><strong>Ufficio istituzionale</strong><span>{site.office}</span><span>{site.email}</span><span>Risposta compatibilmente con i tempi dell’attività istituzionale.</span></div><SocialLinks variant="contact" /></div><ContactForm />
    </section></Layout>
}

function Legal({ cookie = false }: { cookie?: boolean }) {
  return <Layout><PageHero title={cookie ? 'Cookie Policy' : 'Privacy Policy'} intro="Informazioni sul trattamento dei dati personali e sull’utilizzo del sito." /><article className="section shell article-prose"><h2>{cookie ? 'Uso dei cookie' : 'Titolare e finalità del trattamento'}</h2><p>Il sito utilizza esclusivamente funzionalità tecniche necessarie alla navigazione. I dati conferiti attraverso i moduli sono trattati per gestire richieste, comunicazioni e servizi scelti dall’utente.</p><h2>Dati raccolti</h2><p>I moduli raccolgono soltanto i dati conferiti volontariamente dall’utente. Il consenso newsletter è distinto e facoltativo. I dati non sono ceduti a terzi, salvo obblighi di legge o fornitori nominati responsabili del trattamento.</p><h2>Diritti dell’interessato</h2><p>È possibile richiedere accesso, rettifica, cancellazione, limitazione e opposizione secondo il Regolamento UE 2016/679.</p></article></Layout>
}

function Admin() {
  const [status, setStatus] = useState('Tutti')
  const [logged, setLogged] = useState(false)
  const filtered = useMemo(() => status === 'Tutti' ? press : press.filter(p => p.status === adminStatusMap[status]), [status])
  if (!logged) return <div className="admin-login"><form onSubmit={e => { e.preventDefault(); setLogged(true) }}><div className="brand"><span>Marina</span> Chiarelli</div><h1>Area amministrazione</h1><p>Accesso dimostrativo. In produzione la password è letta dalla variabile <code>ADMIN_PASSWORD</code>.</p><label>Password<input required type="password" defaultValue="demo" /></label><button className="button primary">Accedi</button><Link to="/">Torna al sito</Link></form></div>
  return <div className="admin-shell"><aside><div className="brand light"><span>Marina</span> Chiarelli</div>{['Dashboard','News','Progetti','Agenda','Media','Interventi','Rassegna stampa','Contatti','Newsletter','Impostazioni'].map(x => <button className={x === 'Rassegna stampa' ? 'active' : ''} key={x}>{x}</button>)}</aside><main className="admin-main"><header><div><span>Area amministrazione</span><h1>Rassegna stampa</h1></div><button onClick={() => setLogged(false)}>Esci</button></header><div className="admin-tabs">{['Tutti','Pubblicati','Bozze','In revisione','Scartati'].map(x => <button className={status === x ? 'active' : ''} onClick={() => setStatus(x)} key={x}>{x}</button>)}</div><div className="admin-filters"><select aria-label="Categoria"><option>Tutte le categorie</option><option>Cultura</option><option>Pari opportunità</option><option>Politiche giovanili</option></select><select aria-label="Fonte"><option>Tutte le fonti</option><option>Fonti istituzionali</option><option>Testate giornalistiche</option></select></div><div className="table-wrap"><table><thead><tr><th>Titolo e fonte</th><th>Data</th><th>Categoria</th><th>Stato</th><th>Azioni</th></tr></thead><tbody>{filtered.map(p => <tr key={p.title}><td><strong>{p.title}</strong><span>{p.source}</span></td><td>{p.date}</td><td>{p.category}</td><td><span className="status">{p.status}</span></td><td><button>Apri</button><button>•••</button></td></tr>)}</tbody></table></div></main></div>
}

export function AppRoutes() {
  return <><SeoHead /><ScrollTop /><Routes>
    <Route path="/" element={<Home />} /><Route path="/chi-e-marina" element={<Biography />} /><Route path="/impegno" element={<Commitment />} />
    <Route path="/impegno/cultura" element={<ThemePage type="cultura" />} /><Route path="/impegno/pari-opportunita" element={<ThemePage type="pari" />} /><Route path="/impegno/politiche-giovanili" element={<ThemePage type="giovani" />} />
    <Route path="/progetti" element={<Listing kind="projects" />} /><Route path="/progetti/:slug" element={<Detail type="project" />} />
    <Route path="/news" element={<Listing kind="news" />} /><Route path="/news/:slug" element={<Detail type="news" />} /><Route path="/agenda" element={<Listing kind="agenda" />} /><Route path="/rassegna-stampa" element={<Listing kind="press" />} />
    <Route path="/media" element={<MediaPage />} />
    <Route path="/contatti" element={<Contacts />} /><Route path="/privacy" element={<Legal />} /><Route path="/cookie" element={<Legal cookie />} /><Route path="/admin" element={<Admin />} />
    <Route path="*" element={<Layout><PageHero title="Pagina non trovata" intro="La pagina richiesta non è disponibile." /></Layout>} />
  </Routes></>
}
