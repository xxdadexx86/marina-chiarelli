import { news, projects, site } from './content'

export type SeoData = { title: string; description: string; path: string; image?: string; noindex?: boolean }

const pages: Record<string, Omit<SeoData, 'path'>> = {
  '/': { title: 'Marina Chiarelli | Cultura, comunità e futuro del Piemonte', description: 'Il sito personale-istituzionale di Marina Chiarelli: impegno, progetti, agenda, news e attività per la cultura e i territori piemontesi.' },
  '/chi-e-marina': { title: 'Chi è Marina Chiarelli | Biografia e percorso istituzionale', description: 'Il percorso personale, professionale e istituzionale di Marina Chiarelli, Assessore della Regione Piemonte.' },
  '/impegno': { title: 'Impegno | Marina Chiarelli', description: 'Cultura, pari opportunità e politiche giovanili: le tre aree dell’impegno istituzionale di Marina Chiarelli.' },
  '/impegno/cultura': { title: 'Cultura | Marina Chiarelli', description: 'Patrimonio, musei, biblioteche, eventi e reti culturali come leve di sviluppo per il Piemonte.' },
  '/impegno/pari-opportunita': { title: 'Pari opportunità | Marina Chiarelli', description: 'Politiche per accesso, autonomia, inclusione e piena partecipazione nei territori piemontesi.' },
  '/impegno/politiche-giovanili': { title: 'Politiche giovanili | Marina Chiarelli', description: 'Formazione, partecipazione e opportunità per le nuove generazioni del Piemonte.' },
  '/progetti': { title: 'Progetti | Marina Chiarelli', description: 'Progetti e percorsi che uniscono cultura, comunità, giovani e territori del Piemonte.' },
  '/agenda': { title: 'Agenda | Marina Chiarelli', description: 'Gli appuntamenti, gli incontri e le iniziative di Marina Chiarelli sul territorio.' },
  '/news': { title: 'News | Marina Chiarelli', description: 'Notizie e aggiornamenti dall’attività istituzionale di Marina Chiarelli.' },
  '/rassegna-stampa': { title: 'Rassegna stampa | Marina Chiarelli', description: 'Articoli approvati, fonti e sintesi originali sull’attività istituzionale di Marina Chiarelli.' },
  '/media': { title: 'Media | Marina Chiarelli', description: 'Foto, video, interviste e gallery dall’attività istituzionale di Marina Chiarelli.' },
  '/contatti': { title: 'Contatti | Marina Chiarelli', description: 'Contatta l’ufficio di Marina Chiarelli per richieste istituzionali, inviti e proposte.' },
  '/privacy': { title: 'Privacy Policy | Marina Chiarelli', description: 'Informativa sul trattamento dei dati personali.' },
  '/cookie': { title: 'Cookie Policy | Marina Chiarelli', description: 'Informazioni sui cookie utilizzati dal sito.' },
  '/admin': { title: 'Area amministrazione | Marina Chiarelli', description: 'Area riservata.', noindex: true },
}

export function getSeo(pathname: string): SeoData {
  const path = pathname.replace(/\/$/, '') || '/'
  const direct = pages[path]
  if (direct) return { ...direct, path, image: '/images/marina-chiarelli.jpg' }
  const project = projects.find(item => path === `/progetti/${item.slug}`)
  if (project) return { title: `${project.title} | Progetti Marina Chiarelli`, description: project.summary, path, image: project.image }
  const article = news.find(item => path === `/news/${item.slug}`)
  if (article) return { title: `${article.title} | Marina Chiarelli`, description: article.summary, path, image: article.image }
  return { title: `Pagina non trovata | ${site.name}`, description: 'La pagina richiesta non è disponibile.', path, noindex: true }
}

export const publicRoutes = [
  '/', '/chi-e-marina', '/impegno', '/impegno/cultura', '/impegno/pari-opportunita',
  '/impegno/politiche-giovanili', '/progetti', ...projects.map(item => `/progetti/${item.slug}`),
  '/agenda', '/news', ...news.map(item => `/news/${item.slug}`), '/rassegna-stampa',
  '/media', '/contatti', '/privacy', '/cookie',
]
