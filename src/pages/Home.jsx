import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSiteContent } from '../services/content'
import WebantrixLogo from '../components/WebantrixLogo'
import Seo from '../components/Seo'

export default function Home() {
  const [content, setContent] = useState(null)
  useEffect(() => {
    fetchSiteContent().then((data) => {
      setContent({
        ...data.home,
        services: data.services
      })
    })
  }, [])
  
  if (!content) return <div style={{textAlign: 'center', padding: '40px', color: '#4a4a68'}}>Loading...</div>
  return (
    <div>
      <Seo
        title="Digital Solutions & Web Development"
        description="Webantrix crafts innovative web solutions, UI/UX, cloud products, and scalable digital experiences for growing businesses."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Webantrix',
          url: 'https://www.webantrix.com',
          logo: 'https://www.webantrix.com/webantrix_logo.png',
          description: 'Webantrix crafts innovative web solutions and digital experiences.',
          sameAs: [
            'https://www.linkedin.com/company/webantrix',
            'https://twitter.com/webantrix',
            'https://github.com/webantrix'
          ]
        }}
      />

      <section className="main-hero">
        <div className="hero-visual">
          <div style={{borderRadius: '16px', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(230, 57, 70, 0.15)', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #fff0f1 0%, rgba(255, 107, 53, 0.1) 50%, rgba(157, 78, 221, 0.1) 100%)'}}>
            <WebantrixLogo width={200} height={200} />
          </div>
        </div>
        <div className="hero-content">
          <h1>{content.heroTitle}</h1>
          <p>{content.heroText}</p>
          <Link className="button" to="/contact">
            <span>Start Your Project</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </section>

      <section id="services" style={{marginTop: '80px'}}>
        <h2>Our Services</h2>
        <p style={{fontSize: '1rem', color: '#4a4a68', marginBottom: '32px', maxWidth: '600px'}}>We deliver comprehensive digital solutions tailored to your business needs</p>
        <div className="services-grid">
          {(content.services || []).map((s, i) => (
            <article key={s.slug || i} className="service-card">
              <h3>{s.title}</h3>
              <p>{s.shortDesc || s.desc}</p>
              <Link to={`/services/${s.slug}`} className="cta-link service-link">
                View details
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'stretch', marginBottom: '60px'}}>
        <div className="why-section">
          <h2>Why Webantrix?</h2>
          <ul>
            {content.why.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
        <div className="card" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <h3 style={{color: '#e63946', marginBottom: '16px', fontSize: '1.3rem', fontWeight: 700}}>Our Mission</h3>
          <p style={{color: '#4a4a68', lineHeight: 1.8, margin: 0}}>
            Transform businesses through innovative digital experiences. We believe in creating solutions that not only meet today's needs but anticipate tomorrow's challenges, helping our clients stay ahead in an ever-evolving digital landscape.
          </p>
          <Link to="/about" className="cta-link" style={{marginTop: '20px'}}>
            Learn more about us
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
