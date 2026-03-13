import React, { useEffect, useState } from 'react'
import { fetchSiteContent } from '../services/content'
import Seo from '../components/Seo'

const SECTION_HEADINGS = new Set(['Our Story', 'Our Mission', 'What We Believe', 'Our Approach'])
const VALUE_ITEMS = new Set(['Elevate brands', 'Engage audiences', 'Deliver measurable business results'])

function formatAboutBlocks(rawContent) {
  const blocks = rawContent
    .split('\n\n')
    .map((block) => block.trim())
    .filter(Boolean)

  const elements = []
  const listBuffer = []

  const flushList = (key) => {
    if (listBuffer.length === 0) return
    elements.push(
      <ul key={`list-${key}`} className="about-values-list">
        {listBuffer.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
    listBuffer.length = 0
  }

  blocks.forEach((block, idx) => {
    if (SECTION_HEADINGS.has(block)) {
      flushList(idx)
      elements.push(
        <h2 key={`h-${idx}`} className="about-section-title">
          {block}
        </h2>
      )
      return
    }

    if (VALUE_ITEMS.has(block)) {
      listBuffer.push(block)
      return
    }

    if (block.startsWith('Our journey began in 2007')) {
      flushList(idx)
      elements.push(
        <div key={`timeline-${idx}`} className="about-timeline">
          <div className="about-timeline-dot" aria-hidden="true" />
          <div className="about-timeline-content">
            <span className="about-timeline-year">2007</span>
            <p className="about-paragraph">{block}</p>
          </div>
        </div>
      )
      return
    }

    flushList(idx)
    const emphasis = block === 'Our mission is simple:' || block === 'We create digital experiences that:'
    elements.push(
      <p key={`p-${idx}`} className={emphasis ? 'about-lead-line' : 'about-paragraph'}>
        {block}
      </p>
    )
  })

  flushList('final')
  return elements
}

export default function About() {
  const [content, setContent] = useState(null)
  useEffect(() => {
    fetchSiteContent().then(data => setContent(data.about))
  }, [])
  if (!content) return <div style={{textAlign: 'center', padding: '40px', color: '#4a4a68'}}>Loading...</div>

  const formattedBlocks = formatAboutBlocks(content.content)

  return (
    <div className="about-page">
      <Seo
        title="About Us"
        description="Learn about Webantrix, our mission, and how we build innovative digital products that help businesses grow."
        path="/about"
      />

      <div className="card about-card">
        <div style={{display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center'}}>
          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #e63946, #ff6b35)', flexShrink: 0}}></div>
          <p style={{margin: 0, color: '#e63946', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>About Us</p>
        </div>
        <h1 className="about-title">{content.title}</h1>
        <div className="about-content">{formattedBlocks}</div>
      </div>
      
      {/* <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '60px'}}>
        {[
          { label: 'Team Members', value: '25+' },
          { label: 'Years Experience', value: '8+' },
          { label: 'Happy Clients', value: '150+' },
          { label: 'Projects Delivered', value: '300+' }
        ].map((stat, i) => (
          <div key={i} style={{background: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e2e4e8', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s'}}>
            <p style={{fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #e63946, #ff6b35, #9d4edd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 8px 0'}}>{stat.value}</p>
            <p style={{fontSize: '0.95rem', color: '#6b6b8a', margin: 0, fontWeight: 500}}>{stat.label}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}
