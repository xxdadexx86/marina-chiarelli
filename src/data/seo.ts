import { news, projects, site } from './content'

export type SeoData = { title: string; description: string; path: string; image?: string; noindex?: boolean }

const pages: Record<string, Omit<SeoData, 'path'>> = {
  '/': { title: 'Marina Chiarelli | Cultura, comunità e futuro del Piemonte', description: 'Sito personale-istituzionale di Marina Chiarelli, Assessore della Regione Piemonte. Cultura, pari opportunità, politiche giovanili e progetti sui territori.' },
  '/chi-e-marina': { title: 'Chi è Marina Chiarelli | Dal Comune di Novara alla Regione Piemonte', description: 'Biografia e percorso istituzionale di Marina Chiarelli: dalla professione legale e dalla Giunta comunale di Novara al ruolo in Regione Piemonte.' },
  '/impegno': { title: 'L’impegno di Marina Chiarelli | Cultura, giovani e pari opportunità', description: 'Cultura, pari opportunità e politiche giovanili: le tre aree dell’impegno istituzionale di Marina Chiarelli.' },
  '/impegno/cultura': { title: 'Cultura in Piemonte | Il lavoro istituzionale di Marina Chiarelli', description: 'Bandi, reti territoriali, patrimonio, spettacolo dal vivo e grandi eventi: i dossier culturali seguiti nell’attività istituzionale in Piemonte.' },
  '/impegno/pari-opportunita': { title: 'Pari opportunità | Marina Chiarelli', description: 'Politiche per accesso, autonomia, inclusione e piena partecipazione nei territori piemontesi.' },
  '/impegno/politiche-giovanili': { title: 'Politiche giovanili | Marina Chiarelli', description: 'Formazione, partecipazione e opportunità per le nuove generazioni del Piemonte.' },
  '/progetti': { title: 'Progetti in evidenza | Cultura, giovani e pari opportunità in Piemonte', description: 'Progetti istituzionali su cultura, politiche giovanili e pari opportunità: obiettivi, territori coinvolti e fonti.' },
  '/agenda': { title: 'Agenda | Marina Chiarelli', description: 'Incontri, appuntamenti istituzionali e iniziative sul territorio legate al lavoro di Marina Chiarelli.' },
  '/news': { title: 'News | Marina Chiarelli', description: 'Notizie e aggiornamenti dall’attività istituzionale di Marina Chiarelli.' },
  '/rassegna-stampa': { title: 'Rassegna stampa | Marina Chiarelli tra cultura, giovani e territori', description: 'Articoli selezionati e contenuti istituzionali su iniziative, eventi, bandi e attività pubbliche legate al lavoro di Marina Chiarelli.' },
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
