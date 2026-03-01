import React, { useEffect, useState } from 'react'
import { fetchSiteContent } from '../services/content'

export default function About() {
  const [content, setContent] = useState(null)
  useEffect(() => {
    fetchSiteContent().then(data => setContent(data.about))
  }, [])
  if (!content) return <div style={{textAlign: 'center', padding: '40px', color: '#4a4a68'}}>Loading...</div>
  return (
    <div style={{maxWidth: '800px', margin: '60px auto', padding: '0 24px'}}>
      <div className="card">
        <div style={{display: 'flex', gap: '16px', marginBottom: '32px', alignItems: 'center'}}>
          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #e63946, #ff6b35)', flexShrink: 0}}></div>
          <p style={{margin: 0, color: '#e63946', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>About Us</p>
        </div>
        <h1 style={{fontWeight: 800, fontSize: '2.5rem', color: '#1a1a2e', marginBottom: '24px', lineHeight: 1.2}}>{content.title}</h1>
        <p style={{fontSize: '1.05rem', color: '#4a4a68', marginBottom: 0, lineHeight: 1.8, whiteSpace:'pre-line'}}>{content.content}</p>
      </div>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '60px'}}>
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
      </div>
    </div>
  )
}
