export const site = {
  name: 'Marina Chiarelli',
  role: 'Assessore della Regione Piemonte',
  delegations: 'Cultura, Pari opportunità e Politiche giovanili',
  tagline: 'Cultura, comunità e futuro del Piemonte',
  origin: 'https://marina-chiarelli.dloddi86.workers.dev',
  email: 'Contatto tramite modulo istituzionale',
  socials: {
    instagram: '',
    facebook: '',
    linkedin: 'https://it.linkedin.com/in/marina-chiarelli',
  },
}

export const pillars = [
  {
    key: 'cultura', title: 'Cultura', href: '/impegno/cultura',
    description: 'Patrimonio, reti culturali e identità come motori di coesione e sviluppo.',
    long: 'La cultura è una responsabilità pubblica e una leva di sviluppo. Il Piemonte cresce quando mette in relazione patrimonio, competenze, istituzioni e comunità.',
    editorial: 'Musei, biblioteche, archivi, teatri, festival e paesaggi culturali compongono un ecosistema che attraversa grandi città e piccoli centri. Il compito delle istituzioni è renderlo più connesso, accessibile e capace di generare valore.',
    editorial2: 'Valorizzare l’identità piemontese significa custodire la memoria senza chiuderla nel passato: trasformarla in conoscenza, lavoro qualificato, turismo consapevole e partecipazione.',
    goals: ['Patrimonio e musei', 'Biblioteche e reti culturali', 'Eventi e spettacolo', 'Turismo culturale', 'Identità e territori'],
  },
  {
    key: 'pari', title: 'Pari opportunità', href: '/impegno/pari-opportunita',
    description: 'Accesso, diritti e partecipazione per una società capace di valorizzare ogni persona.',
    long: 'Le pari opportunità richiedono politiche concrete: accesso ai servizi, autonomia, contrasto agli squilibri e piena partecipazione alla vita sociale ed economica.',
    editorial: 'Ridurre gli ostacoli che limitano opportunità e libertà è un lavoro quotidiano, da costruire con enti locali, associazioni, servizi e mondo produttivo.',
    editorial2: 'Una particolare attenzione va alla valorizzazione del ruolo delle donne, alla conciliazione, alla prevenzione della violenza e alla qualità delle politiche territoriali.',
    goals: ['Accesso alle opportunità', 'Autonomia e partecipazione', 'Valorizzazione delle donne', 'Inclusione territoriale', 'Prevenzione degli squilibri'],
  },
  {
    key: 'giovani', title: 'Politiche giovanili', href: '/impegno/politiche-giovanili',
    description: 'Spazio al talento, alla partecipazione e alle competenze delle nuove generazioni.',
    long: 'Le politiche giovanili devono offrire occasioni reali per formarsi, partecipare, esprimere talento e costruire il proprio futuro nei territori piemontesi.',
    editorial: 'I giovani non sono un pubblico da raggiungere, ma interlocutori con cui progettare. Servono luoghi, strumenti e reti che mettano in relazione formazione, creatività, cultura digitale e cittadinanza.',
    editorial2: 'Investire nelle nuove generazioni significa rafforzare le comunità locali e rendere il Piemonte più aperto, innovativo e capace di trattenere competenze.',
    goals: ['Formazione e competenze', 'Partecipazione civica', 'Talento e creatività', 'Cultura digitale', 'Opportunità nei territori'],
  },
]

export const projects = [
  {
    slug: 'reti-culturali-del-piemonte', title: 'Reti culturali del Piemonte', category: 'Cultura', theme: 'cultura',
    status: 'In sviluppo', date: '2026', territories: 'Territori piemontesi', image: '/images/project-cultura.svg',
    summary: 'Un percorso per rafforzare la collaborazione tra istituzioni culturali, enti locali e comunità.',
    body: 'Il progetto promuove un metodo di lavoro condiviso tra soggetti che custodiscono, producono e diffondono cultura. La dimensione di rete consente di mettere a sistema competenze, programmazione e capacità di raggiungere pubblici diversi.',
    body2: 'La prima fase è dedicata all’ascolto dei territori e alla ricognizione delle esperienze già attive, evitando sovrapposizioni e valorizzando ciò che funziona.',
    relatedNews: ['cultura-territori-metodo-reti'], relatedMedia: ['operatori-culturali'],
  },
  {
    slug: 'piemonte-giovani-partecipazione', title: 'Piemonte giovani: spazi di partecipazione', category: 'Politiche giovanili', theme: 'giovani',
    status: 'Attivo', date: '2026', territories: 'Piemonte', image: '/images/project-giovani.svg',
    summary: 'Occasioni di confronto e progettazione per dare voce alle nuove generazioni nei territori.',
    body: 'Il percorso mette al centro la partecipazione dei giovani nella definizione di iniziative locali, culturali e civiche.',
    body2: 'Laboratori e momenti di confronto aiutano a trasformare idee e bisogni in proposte concrete.',
    relatedNews: ['giovani-partecipazione-ascoltare'], relatedMedia: ['forum-nuove-generazioni'],
  },
  {
    slug: 'cultura-accessibile', title: 'Cultura accessibile', category: 'Pari opportunità', theme: 'pari',
    status: 'In sviluppo', date: '2026', territories: 'Piemonte', image: '/images/project-pari.svg',
    summary: 'Linee di lavoro per ampliare l’accesso ai luoghi e alle occasioni culturali.',
    body: 'L’accessibilità riguarda spazi, linguaggi, costi e possibilità di partecipazione.',
    body2: 'Il progetto raccoglie pratiche e bisogni per accompagnare istituzioni e organizzatori verso un’offerta più inclusiva.',
    relatedNews: ['pari-opportunita-servizi-comunita'], relatedMedia: ['pari-opportunita-territori'],
  },
  {
    slug: 'comunita-che-innovano', title: 'Comunità che innovano', category: 'Territori', theme: 'all',
    status: 'Attivo', date: '2026', territories: 'Aree urbane e interne', image: '/images/project-territori.svg',
    summary: 'Esperienze locali che uniscono patrimonio, competenze, giovani e innovazione sociale.',
    body: 'Il progetto osserva e collega esperienze nate dal basso, con attenzione alle aree interne.',
    body2: 'La condivisione di metodi e risultati può aiutare iniziative locali a consolidarsi.',
    relatedNews: ['patrimonio-innovazione-piemonte'], relatedMedia: ['patrimonio-identita'],
  },
]

export const news = [
  {
    slug: 'cultura-territori-metodo-reti', title: 'Cultura e territori: un metodo di lavoro fondato sulle reti',
    category: 'Cultura', date: '4 giugno 2026', image: '/images/news-cultura.svg',
    summary: 'Un confronto con enti e operatori per mettere in relazione programmazione regionale, patrimonio e iniziative locali.',
    body: 'La qualità delle politiche culturali dipende dalla capacità di ascoltare chi opera ogni giorno nei territori. Enti locali, fondazioni, associazioni e istituzioni culturali sono parte di una rete che deve poter condividere priorità e strumenti.',
    body2: 'Il confronto territoriale consente di riconoscere esperienze già solide, far emergere nuovi bisogni e costruire una programmazione più leggibile e continuativa.',
    tags: ['cultura', 'territori', 'reti culturali'],
  },
  {
    slug: 'giovani-partecipazione-ascoltare', title: 'Nuove generazioni e partecipazione: ascoltare prima di progettare',
    category: 'Politiche giovanili', date: '28 maggio 2026', image: '/images/news-giovani.svg',
    summary: 'Incontri territoriali dedicati alle opportunità, alle competenze e agli spazi per i giovani.',
    body: 'Le politiche giovanili diventano efficaci quando partono dalle esperienze reali: studio, lavoro, mobilità, cultura e partecipazione.',
    body2: 'Aprire occasioni di ascolto significa riconoscere i giovani come interlocutori delle istituzioni e non soltanto come destinatari di iniziative.',
    tags: ['giovani', 'partecipazione', 'territori'],
  },
  {
    slug: 'pari-opportunita-servizi-comunita', title: 'Pari opportunità: servizi e comunità al centro',
    category: 'Pari opportunità', date: '20 maggio 2026', image: '/images/news-pari.svg',
    summary: 'Un lavoro condiviso per avvicinare le politiche regionali ai bisogni delle persone.',
    body: 'Le pari opportunità si misurano nella possibilità concreta di accedere a servizi, percorsi di autonomia e occasioni di partecipazione.',
    body2: 'La collaborazione tra istituzioni e realtà territoriali aiuta a riconoscere gli squilibri e a intervenire con maggiore precisione.',
    tags: ['pari opportunità', 'servizi', 'comunità'],
  },
  {
    slug: 'biblioteche-presidi-culturali', title: 'Il valore delle biblioteche come presìdi culturali',
    category: 'Cultura', date: '12 maggio 2026', image: '/images/news-biblioteche.svg',
    summary: 'Luoghi di accesso alla conoscenza, incontro tra generazioni e infrastrutture civiche.',
    body: 'Le biblioteche sono spazi di prossimità capaci di tenere insieme lettura, formazione, inclusione e partecipazione.',
    body2: 'Sostenerne le reti significa ampliare l’accesso alla cultura anche nei centri più piccoli.',
    tags: ['biblioteche', 'cultura', 'comunità'],
  },
  {
    slug: 'patrimonio-innovazione-piemonte', title: 'Patrimonio e innovazione per raccontare il Piemonte',
    category: 'Territori', date: '5 maggio 2026', image: '/images/news-territori.svg',
    summary: 'Esperienze e strumenti per una valorizzazione contemporanea dell’identità regionale.',
    body: 'Il patrimonio piemontese vive quando viene conosciuto, interpretato e reso accessibile con linguaggi contemporanei.',
    body2: 'Tecnologie e competenze creative possono sostenere una narrazione rigorosa e aperta a nuovi pubblici.',
    tags: ['patrimonio', 'innovazione', 'Piemonte'],
  },
]

export const events = [
  { title: 'Incontro con le reti culturali territoriali', day: '18', month: 'GIU', date: '18 giugno 2026', time: '10:30', location: 'Torino', category: 'Cultura', status: 'Futuro', description: 'Tavolo di confronto con enti e operatori culturali.' },
  { title: 'Forum regionale delle nuove generazioni', day: '25', month: 'GIU', date: '25 giugno 2026', time: '15:00', location: 'Novara', category: 'Politiche giovanili', status: 'Futuro', description: 'Una giornata di ascolto e progettazione condivisa.' },
  { title: 'Cultura e accessibilità: pratiche e prospettive', day: '03', month: 'LUG', date: '3 luglio 2026', time: '11:00', location: 'Alessandria', category: 'Pari opportunità', status: 'Futuro', description: 'Confronto pubblico su accesso e partecipazione.' },
  { title: 'Patrimonio locale e sviluppo', day: '12', month: 'MAG', date: '12 maggio 2026', time: '17:30', location: 'Cuneo', category: 'Cultura', status: 'Passato', description: 'Incontro dedicato alle reti territoriali.' },
  { title: 'Giovani, competenze e comunità', day: '29', month: 'APR', date: '29 aprile 2026', time: '09:30', location: 'Biella', category: 'Politiche giovanili', status: 'Passato', description: 'Laboratorio con scuole, associazioni e istituzioni.' },
]

export const press = [
  { title: 'Cultura, una rete regionale per valorizzare i territori', source: 'Regione Piemonte', date: '2 giugno 2026', category: 'Cultura', url: 'https://www.regione.piemonte.it/', sentiment: 'positive', confidence: .94, status: 'published', classificationReason: 'Fonte istituzionale e contenuto informativo.', recommendedAction: 'publish', summary: 'La programmazione culturale regionale punta sulla collaborazione tra enti, istituzioni e comunità.', tags: ['cultura', 'territori'] },
  { title: 'Politiche giovanili, aperto il confronto con i territori', source: 'Ente pubblico locale', date: '27 maggio 2026', category: 'Giovani', url: 'https://www.regione.piemonte.it/', sentiment: 'neutral', confidence: .91, status: 'published', classificationReason: 'Contenuto descrittivo proveniente da fonte pubblica.', recommendedAction: 'publish', summary: 'Un percorso di ascolto dedicato a partecipazione, formazione e opportunità.', tags: ['giovani', 'partecipazione'] },
  { title: 'Pari opportunità e accesso ai servizi: il tavolo regionale', source: 'Canale istituzionale', date: '19 maggio 2026', category: 'Pari opportunità', url: 'https://www.regione.piemonte.it/', sentiment: 'positive', confidence: .88, status: 'draft', classificationReason: 'Contenuto favorevole da verificare editorialmente.', recommendedAction: 'draft', summary: 'Istituzioni e realtà territoriali si confrontano su strumenti e priorità.', tags: ['pari opportunità'] },
  { title: 'Il ruolo della cultura nello sviluppo locale', source: 'Fondazione culturale', date: '10 maggio 2026', category: 'Cultura', url: 'https://www.regione.piemonte.it/', sentiment: 'neutral', confidence: .86, status: 'review', classificationReason: 'Fonte qualificata non ancora inclusa in whitelist.', recommendedAction: 'review', summary: 'Una riflessione sulle connessioni tra patrimonio, comunità ed economia.', tags: ['cultura', 'sviluppo locale'] },
  { title: 'Il dibattito sulla programmazione degli eventi', source: 'Testata locale', date: '4 maggio 2026', category: 'Cultura', url: 'https://www.regione.piemonte.it/', sentiment: 'ambiguous', confidence: .72, status: 'review', classificationReason: 'Tono da verificare prima di ogni uso pubblico.', recommendedAction: 'review', summary: 'Posizioni diverse sulla programmazione culturale richiedono un approfondimento editoriale.', tags: ['eventi'] },
  { title: 'Confronto politico sulle priorità regionali', source: 'Testata giornalistica', date: '30 aprile 2026', category: 'Istituzioni', url: 'https://www.regione.piemonte.it/', sentiment: 'negative', confidence: .89, status: 'discarded', classificationReason: 'Contenuto polemico non adatto alla pubblicazione automatica.', recommendedAction: 'discard', summary: 'Contenuto archiviato e non pubblicato nella rassegna pubblica.', tags: ['istituzioni'] },
]

export const interventions = [
  { slug: 'cultura-infrastruttura-futuro', title: 'La cultura come infrastruttura del futuro', category: 'Riflessione', date: '30 maggio 2026', excerpt: 'Il patrimonio diventa futuro quando entra nella vita delle comunità e genera nuove possibilità.', body: 'Pensare alla cultura come infrastruttura significa riconoscerne la capacità di tenere insieme identità, educazione, economia e qualità della vita.', body2: 'Le politiche pubbliche devono dare continuità alle reti, sostenere la progettazione e rendere l’accesso più ampio.' },
]

export const media = [
  { slug: 'operatori-culturali', title: 'Incontro con gli operatori culturali', category: 'Gallery', year: '2026', description: 'Immagini dal confronto dedicato alle reti culturali del Piemonte.', url: '' },
  { slug: 'cultura-sviluppo-territoriale', title: 'Cultura e sviluppo territoriale', category: 'Video', year: '2026', description: 'Un intervento sul ruolo della cultura nelle comunità.', url: '' },
  { slug: 'forum-nuove-generazioni', title: 'Forum delle nuove generazioni', category: 'Gallery', year: '2026', description: 'Voci, proposte e momenti di partecipazione.', url: '' },
  { slug: 'pari-opportunita-territori', title: 'Pari opportunità nei territori', category: 'Intervista', year: '2026', description: 'Politiche vicine alle persone e ai servizi locali.', url: '' },
  { slug: 'biblioteche-comunita', title: 'Biblioteche, luoghi di comunità', category: 'Video', year: '2026', description: 'Un racconto dei presìdi culturali piemontesi.', url: '' },
  { slug: 'patrimonio-identita', title: 'Patrimonio e identità', category: 'Gallery', year: '2026', description: 'Luoghi e progetti che raccontano il Piemonte.', url: '' },
]
