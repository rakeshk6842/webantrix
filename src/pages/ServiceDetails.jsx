import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchServiceBySlug } from '../services/content'
import Seo from '../components/Seo'

export default function ServiceDetails() {
  const { serviceSlug } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    fetchServiceBySlug(serviceSlug).then((data) => {
      if (!mounted) return
      setService(data)
      setLoading(false)
    })

    return () => {
      mounted = false
    }
  }, [serviceSlug])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#4a4a68' }}>Loading service details...</div>
  }

  if (!service) {
    return (
      <section className="service-details">
        <h1>Service Not Found</h1>
        <p>The service you are looking for is not available.</p>
        <Link className="button" to="/">
          Back to Home
        </Link>
      </section>
    )
  }

  return (
    <section className="service-details">
      <Seo
        title={`${service.title} Services`}
        description={service.shortDesc}
        path={`/services/${service.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.shortDesc,
          provider: {
            '@type': 'Organization',
            name: 'Webantrix',
            url: 'https://www.webantrix.com'
          },
          serviceType: service.title,
          areaServed: 'Worldwide'
        }}
      />

      <p className="service-breadcrumb">
        <Link to="/">Home</Link> / <span>Services</span>
      </p>

      <header className="service-hero-card">
        <h1>{service.title}</h1>
        <p className="service-short">{service.shortDesc}</p>
        <p className="service-overview">{service.overview}</p>
        <div className="service-meta-grid">
          <div className="service-meta-item">
            <span>Typical Timeline</span>
            <strong>{service.timeline}</strong>
          </div>
          <div className="service-meta-item">
            <span>Best For</span>
            <strong>{service.idealFor}</strong>
          </div>
        </div>
      </header>

      <div className="service-content-grid">
        <div className="service-highlights-card">
          <h2>Key Highlights</h2>
          <ul>
            {service.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="service-deliverables-card">
          <h2>Deliverables</h2>
          <ul>
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="service-process-card">
        <h2>Our Process</h2>
        <ol>
          {service.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="service-actions">
        <Link className="button" to="/contact">
          Talk to Us
        </Link>
        <Link className="button button-secondary" to="/">
          Explore More Services
        </Link>
      </div>
    </section>
  )
}
