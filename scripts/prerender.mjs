import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const template = await readFile(join(root, 'dist', 'index.html'), 'utf8')
const server = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)
const origin = 'https://marina-chiarelli.dloddi86.workers.dev'

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function buildDocument(route) {
  const seo = server.getSeo(route)
  const canonical = `${origin}${route === '/' ? '/' : route}`
  const image = `${origin}${seo.image || '/images/marina-chiarelli.jpg'}`
  const content = server.render(route)
  let html = template.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`)
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(seo.description)}" />`)
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`)
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`)
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}" />`)
  html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${image}" />`)
  html = html.replace(/<meta property="og:locale" content="[^"]*"\s*\/?>/i, '<meta property="og:locale" content="it_IT" />')
  html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?>/i, `<meta name="robots" content="${seo.noindex ? 'noindex,nofollow' : 'index,follow'}" />`)
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`)
  html = html.replace('</head>', `    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />\n    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />\n    <meta name="twitter:image" content="${image}" />\n    <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': route === '/' || route === '/chi-e-marina' ? 'Person' : 'WebPage',
    name: route === '/' || route === '/chi-e-marina' ? 'Marina Chiarelli' : seo.title,
    url: canonical,
    description: seo.description,
    image,
    jobTitle: route === '/' || route === '/chi-e-marina' ? 'Assessore della Regione Piemonte' : undefined,
  })}</script>\n  </head>`)
  return html
}

for (const route of server.publicRoutes) {
  const output = route === '/' ? join(root, 'dist', 'index.html') : join(root, 'dist', route.slice(1), 'index.html')
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, buildDocument(route))
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${server.publicRoutes.map(route => `  <url><loc>${origin}${route === '/' ? '/' : route}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile(join(root, 'dist', 'sitemap.xml'), sitemap)
await rm(join(root, 'dist-ssr'), { recursive: true, force: true })
