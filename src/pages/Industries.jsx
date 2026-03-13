import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { fetchSiteContent } from '../services/content'

const industryImages = {
  'wellness-centers': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&q=80',
  'restaurants-cafes-and-bakeries': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&q=80',
  'beauty': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&q=80',
  'dentists': 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&q=80',
  'doctors': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&q=80',
  'lawyers': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&q=80',
  'industry-agnostic-solutions': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&q=80',
}

const CARD_WIDTH = 300
const GAP = 20

export default function Industries() {
  const [industries, setIndustries] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef(null)

  useEffect(() => {
    fetchSiteContent().then((data) => setIndustries(data.industries))
  }, [])

  const scrollToIndex = (idx) => {
    if (!carouselRef.current) return
    carouselRef.current.scrollTo({ left: idx * (CARD_WIDTH + GAP), behavior: 'smooth' })
    setActiveIndex(idx)
  }

  const scrollPrev = () => scrollToIndex(Math.max(activeIndex - 1, 0))
  const scrollNext = () => scrollToIndex(Math.min(activeIndex + 1, (industries?.items?.length ?? 1) - 1))

  const handleScroll = () => {
    if (!carouselRef.current) return
    const idx = Math.round(carouselRef.current.scrollLeft / (CARD_WIDTH + GAP))
    setActiveIndex(idx)
  }

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
        <div style={{display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center'}}>
          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #e63946, #ff6b35)', flexShrink: 0}}></div>
          <p style={{margin: 0, color: '#e63946', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Industries</p>
        </div>
        <h1>{industries.title}</h1>
        <p>{industries.subtitle}</p>
      </section>

      <section className="industries-carousel-wrapper">
        <div className="carousel-controls-row">
          <button
            className="carousel-btn"
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            aria-label="Previous industry"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="industries-carousel" ref={carouselRef} onScroll={handleScroll}>
            {industries.items.map((item) => (
              <article key={item.slug} className="industry-card">
                <div className="industry-card-img">
                  <img
                    src={industryImages[item.slug]}
                    alt={item.name}
                    loading="lazy"
                  />
                </div>
                <div className="industry-card-body">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <Link className="cta-link" to={`/industries-we-serve/${item.slug}`}>
                    Learn More
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            className="carousel-btn"
            onClick={scrollNext}
            disabled={activeIndex === industries.items.length - 1}
            aria-label="Next industry"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="carousel-dots">
          {industries.items.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${activeIndex === i ? ' active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
