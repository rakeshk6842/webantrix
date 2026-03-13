import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import { fetchIndustryBySlug } from '../services/content'

export default function IndustryDetails() {
  const { industrySlug } = useParams()
  const [industry, setIndustry] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    fetchIndustryBySlug(industrySlug).then((data) => {
      if (!mounted) return
      setIndustry(data)
      setLoading(false)
    })

    return () => {
      mounted = false
    }
  }, [industrySlug])

  if (loading) return <div style={{ textAlign: 'center', padding: '40px', color: '#4a4a68' }}>Loading...</div>

  if (!industry) {
    return (
      <section className="industry-details-page">
        <h1>Industry Not Found</h1>
        <p>The requested industry page is not available.</p>
        <Link className="button" to="/industries-we-serve">
          Back to Industries
        </Link>
      </section>
    )
  }

  return (
    <section className="industry-details-page">
      <Seo
        title={`${industry.name} Solutions`}
        description={industry.description}
        path={`/industries-we-serve/${industry.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${industry.name} Local SEO`,
          description: industry.description,
          provider: {
            '@type': 'Organization',
            name: 'Webantrix',
            url: 'https://www.webantrix.com'
          },
          areaServed: 'Worldwide'
        }}
      />

      <p className="industry-details-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/industries-we-serve">Industries</Link> / <span>{industry.name}</span>
      </p>

      <div className="industry-details-card">
        <h1>{industry.name}</h1>
        <h2 className="industry-details-heading">{industry.detailHeading || industry.name}</h2>
        <p className="industry-details-content">{industry.detailContent || industry.description}</p>

        <div className="industry-details-actions">
          <Link className="button" to="/contact">
            Talk to Us
          </Link>
        </div>
      </div>
    </section>
  )
}
