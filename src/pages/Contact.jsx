import React, { useState, useEffect } from 'react'
import { fetchSiteContent } from '../services/content'
import Seo from '../components/Seo'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [contact, setContact] = useState(null)

  useEffect(() => {
    fetchSiteContent().then(data => setContact(data.contact))
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (!contact) return <div style={{textAlign: 'center', padding: '40px', color: '#4a4a68'}}>Loading...</div>

  const locations = contact.locations && contact.locations.length > 0
    ? contact.locations
    : [contact.address]
  
  if (submitted) {
    return (
      <div style={{maxWidth: '500px', margin: '80px auto', padding: '0 24px'}}>
        <div className="card" style={{textAlign: 'center', padding: '48px 32px'}}>
          <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #e63946, #ff6b35, #9d4edd)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 10px 30px rgba(230, 57, 70, 0.25)'}}>
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 style={{color: '#1a1a2e', fontWeight: 800, fontSize: '2rem', margin: '0 0 12px 0'}}>Message Sent!</h2>
          <p style={{fontSize: '1.05rem', color: '#4a4a68', margin: 0, lineHeight: 1.7}}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <Seo
        title="Contact"
        description="Contact Webantrix to discuss your web development, design, cloud, and digital transformation projects."
        path="/contact"
        jsonLd={contact ? {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Webantrix',
          url: 'https://www.webantrix.com',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: contact.phone,
            email: contact.email,
            contactType: 'customer support'
          },
          address: locations.map((location) => ({
            '@type': 'PostalAddress',
            streetAddress: location
          }))
        } : null}
      />

      {/* Hero Section */}
      <div className="contact-hero">
        <div style={{display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px', padding: '8px 16px', background: 'var(--primary-light)', borderRadius: '20px'}}>
          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #e63946, #ff6b35)'}}></div>
          <span style={{color: '#e63946', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Get in Touch</span>
        </div>
        <h1>Let's Start a Conversation</h1>
        <p>Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      {/* Contact Cards Row */}
      <div className="contact-cards-grid">
        <div className="contact-info-card" style={{background: 'linear-gradient(135deg, #fff 0%, var(--primary-light) 100%)', border: '1px solid rgba(230, 57, 70, 0.1)'}}>
          <div style={{width: '56px', height: '56px', background: 'linear-gradient(135deg, #e63946, #ff6b35)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 20px rgba(230, 57, 70, 0.25)'}}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </div>
          <h3 style={{margin: '0 0 8px 0', color: '#1a1a2e', fontWeight: 700, fontSize: '1.1rem'}}>Phone</h3>
          <a href={`tel:${contact.phone}`} style={{color: '#e63946', textDecoration: 'none', fontWeight: 600, fontSize: '1rem'}}>{contact.phone}</a>
        </div>

        <div className="contact-info-card" style={{background: 'linear-gradient(135deg, #fff 0%, rgba(255, 107, 53, 0.08) 100%)', border: '1px solid rgba(255, 107, 53, 0.1)'}}>
          <div style={{width: '56px', height: '56px', background: 'linear-gradient(135deg, #ff6b35, #f4a261)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 20px rgba(255, 107, 53, 0.25)'}}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h3 style={{margin: '0 0 8px 0', color: '#1a1a2e', fontWeight: 700, fontSize: '1.1rem'}}>Email</h3>
          <a href={`mailto:${contact.email}`} style={{color: '#ff6b35', textDecoration: 'none', fontWeight: 600, fontSize: '1rem'}}>{contact.email}</a>
        </div>

        <div className="contact-info-card" style={{background: 'linear-gradient(135deg, #fff 0%, rgba(157, 78, 221, 0.08) 100%)', border: '1px solid rgba(157, 78, 221, 0.1)'}}>
          <div style={{width: '56px', height: '56px', background: 'linear-gradient(135deg, #9d4edd, #7b2d8e)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 20px rgba(157, 78, 221, 0.25)'}}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h3 style={{margin: '0 0 8px 0', color: '#1a1a2e', fontWeight: 700, fontSize: '1.1rem'}}>Locations</h3>
          {locations.map((location) => (
            <p key={location} style={{color: '#9d4edd', margin: '0 0 4px 0', fontWeight: 600, fontSize: '1rem'}}>{location}</p>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      {/* <div style={{background: '#fff', borderRadius: '24px', padding: '48px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.08)', border: '1px solid var(--border)'}}>
        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <h2 style={{fontSize: '1.75rem', fontWeight: 800, color: '#1a1a2e', margin: '0 0 8px 0', textAlign: 'center'}}>Send Us a Message</h2>
          <p style={{color: '#4a4a68', textAlign: 'center', margin: '0 0 32px 0'}}>Fill out the form below and we'll get back to you shortly.</p>
          
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              <input 
                name="name" 
                placeholder="Your Name" 
                value={form.name} 
                onChange={handleChange} 
                required 
                style={{fontSize: '1rem', padding: '14px 18px', borderRadius: '10px'}} 
              />
              <input 
                name="email" 
                type="email" 
                placeholder="Your Email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                style={{fontSize: '1rem', padding: '14px 18px', borderRadius: '10px'}} 
              />
            </div>
            <textarea 
              name="message" 
              placeholder="Tell us about your project..." 
              value={form.message} 
              onChange={handleChange} 
              required 
              rows={5} 
              style={{fontSize: '1rem', padding: '14px 18px', borderRadius: '10px', marginBottom: '24px', resize: 'vertical', width: '100%'}} 
            />
            <div style={{textAlign: 'center'}}>
              <button className="button" type="submit" style={{fontSize: '1rem', padding: '14px 40px'}}>
                <span>Send Message</span>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  )
}
