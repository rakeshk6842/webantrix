import { useEffect } from 'react'

const SITE_URL = 'https://www.webantrix.com'
const DEFAULT_IMAGE = `${SITE_URL}/webantrix_logo.png`

function upsertMeta({ name, property, content }) {
  if (!content) return

  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
  let tag = document.head.querySelector(selector)

  if (!tag) {
    tag = document.createElement('meta')
    if (name) tag.setAttribute('name', name)
    if (property) tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function upsertCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function upsertJsonLd(jsonLd) {
  const existing = document.getElementById('seo-json-ld')
  if (!jsonLd) {
    if (existing) existing.remove()
    return
  }

  const script = existing || document.createElement('script')
  script.id = 'seo-json-ld'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(jsonLd)

  if (!existing) {
    document.head.appendChild(script)
  }
}

export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  robots = 'index, follow',
  type = 'website',
  jsonLd
}) {
  useEffect(() => {
    const pageTitle = title ? `${title} | Webantrix` : 'Webantrix - Digital Solutions & Web Development'
    const canonical = `${SITE_URL}${path}`

    document.title = pageTitle
    upsertCanonical(canonical)

    upsertMeta({ name: 'description', content: description })
    upsertMeta({ name: 'robots', content: robots })

    upsertMeta({ property: 'og:title', content: pageTitle })
    upsertMeta({ property: 'og:description', content: description })
    upsertMeta({ property: 'og:type', content: type })
    upsertMeta({ property: 'og:url', content: canonical })
    upsertMeta({ property: 'og:image', content: image })
    upsertMeta({ property: 'og:site_name', content: 'Webantrix' })

    upsertMeta({ name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta({ name: 'twitter:title', content: pageTitle })
    upsertMeta({ name: 'twitter:description', content: description })
    upsertMeta({ name: 'twitter:image', content: image })

    upsertJsonLd(jsonLd)

    return () => {
      // The next page updates tags again. JSON-LD is reset to avoid stale schema.
      upsertJsonLd(null)
    }
  }, [title, description, path, image, robots, type, jsonLd])

  return null
}
