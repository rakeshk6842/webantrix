import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { fetchSiteContent } from '../services/content'

export default function Industries() {
  const [industries, setIndustries] = useState(null)

  useEffect(() => {
    fetchSiteContent().then((data) => setIndustries(data.industries))
  }, [])

  if (!industries) return <div style={{ textAlign: 'center', padding: '40px', color: '#4a4a68' }}>Loading...</div>

  return (
    <div className="industries-page">
      <Seo
        title="Industries We Serve"
        description="Explore the industries Webantrix supports with Local SEO services, including wellness, food businesses, beauty services, and legal practices."
        path="/industries-we-serve"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Industries We Serve',
          itemListElement: industries.items.map((item, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: item.name,
            url: `https://www.webantrix.com/industries-we-serve/${item.slug}`
          }))
        }}
      />

      <section className="industries-hero">
        {/* <p className="industries-kicker">Industries</p> */}
        <div style={{display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center'}}>
          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #e63946, #ff6b35)', flexShrink: 0}}></div>
          <p style={{margin: 0, color: '#e63946', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Industries</p>
        </div>
        <h1>{industries.title}</h1>
        <p>{industries.subtitle}</p>
      </section>

      <section className="industries-grid">
        {industries.items.map((item) => (
          <article key={item.slug} className="industry-card">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <Link className="cta-link" to={`/industries-we-serve/${item.slug}`}>
              Learn More
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
