import React, { useEffect, useState } from 'react'
import { Link, Routes, Route, useParams } from 'react-router-dom'
import { fetchJobsFromGitHub } from '../services/content'

function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJobsFromGitHub()
      .then(setJobs)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // Add JobPosting schema markup
  useEffect(() => {
    if (jobs.length > 0) {
      const jobPostings = jobs.map(job => ({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.body,
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": job.location.includes("USA") ? "US" : "US"
          }
        },
        "baseSalary": job.pay ? {
          "@type": "PriceSpecification",
          "priceCurrency": "USD",
          "price": job.pay
        } : undefined,
        "employmentType": job.type,
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Webantrix",
          "sameAs": "https://www.webantrix.com",
          "logo": "https://www.webantrix.com/favicon.png"
        },
        "datePosted": new Date().toISOString().split('T')[0]
      }));
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(jobPostings);
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [jobs]);

  return (
    <div>
      <div style={{marginBottom: '60px', maxWidth: '700px'}}>
        <div style={{display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'center'}}>
          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #e63946, #ff6b35)', flexShrink: 0}}></div>
          <p style={{margin: 0, color: '#e63946', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Career Opportunities</p>
        </div>
        <h1 style={{fontWeight: 800, fontSize: '2.5rem', marginBottom: '12px', color: '#1a1a2e', margin: '0 0 12px 0'}}>Open Positions</h1>
        <p style={{color: '#4a4a68', marginBottom: 0, fontSize: '1.05rem', lineHeight: 1.7}}>Join our creative team and help build amazing digital experiences. We're always looking for talented individuals who share our passion.</p>
      </div>

      {loading && (
        <div style={{textAlign: 'center', padding: '60px 24px'}}>
          <div style={{display: 'inline-block', padding: '24px'}}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{animation: 'spin 1s linear infinite'}}><circle cx="12" cy="12" r="10" stroke="#e63946" strokeWidth="2" strokeDasharray="15.7 47.1"/></svg>
          </div>
          <p style={{color: '#4a4a68', marginTop: '16px'}}>Loading job listings...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      
      {error && (
        <div style={{background: '#fed7d7', border: '1px solid #fc8181', padding: '20px', borderRadius: '8px', color: '#c53030'}}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="job-list">
            {jobs.map(job => (
              <div className="job" key={job.id}>
                <h3>
                  <Link to={`/jobs/${job.id}`} style={{color: '#e63946', textDecoration: 'none', transition: 'var(--transition)'}}>
                    {job.title}
                  </Link>
                </h3>
                <div className="meta">
                  {job.location && (
                    <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                      {job.location}
                    </span>
                  )}
                  {job.type && (
                    <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.597-9-1.697m0 0a23.97 23.97 0 003.714 5.145m0 0a3 3 0 106 0m0 0a3 3 0 106 0m0 0a3 3 0 106 0" /></svg>
                      {job.type}
                    </span>
                  )}
                </div>
                <p style={{margin: '0 0 20px 0', color: '#4a4a68', lineHeight: 1.6}}>{job.body.slice(0, 120)}...</p>
                <Link className="button" to={`/jobs/${job.id}`} style={{fontSize: '0.9rem'}}>
                  <span>View Details</span>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            ))}
          </div>
          {jobs.length === 0 && (
            <div style={{textAlign: 'center', padding: '60px 24px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e4e8'}}>
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#cbd5e0" style={{marginBottom: '16px'}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p style={{color: '#6b6b8a', fontSize: '1rem'}}>No job postings available at the moment. Check back soon!</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function JobDetail() {
  const { jobId } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJobsFromGitHub()
      .then(jobs => {
        const found = jobs.find(j => String(j.id) === String(jobId))
        setJob(found)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [jobId])

  if (loading) return <div style={{textAlign: 'center', padding: '60px 24px', color: '#4a4a68'}}>Loading job details...</div>
  if (error) return <div style={{background: '#fed7d7', border: '1px solid #fc8181', padding: '20px', borderRadius: '8px', color: '#c53030'}}>Error: {error}</div>
  if (!job) return <div style={{textAlign: 'center', padding: '60px 24px', color: '#4a4a68'}}>Job not found.</div>

  return (
    <div style={{maxWidth: '800px', margin: '60px auto'}}>
      <Link to="/jobs" className="cta-link" style={{marginBottom: '40px', display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#e63946', textDecoration: 'none', fontWeight: 600, transition: 'var(--transition)'}}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to all jobs
      </Link>

      <div className="card">
        <div style={{display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center'}}>
          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #e63946, #ff6b35)', flexShrink: 0}}></div>
          <p style={{margin: 0, color: '#e63946', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px'}}>{job.type || 'Position'}</p>
        </div>

        <h1 style={{fontWeight: 800, fontSize: '2.2rem', color: '#1a1a2e', marginBottom: '16px', margin: '0 0 16px 0'}}>{job.title}</h1>
        
        <div className="meta" style={{fontSize: '0.95rem', color: '#6b6b8a', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #e2e4e8', display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
          {job.location && (
            <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              {job.location}
            </span>
          )}
          {job.type && (
            <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.597-9-1.697m0 0a23.97 23.97 0 003.714 5.145m0 0a3 3 0 106 0m0 0a3 3 0 106 0m0 0a3 3 0 106 0" /></svg>
              {job.type}
            </span>
          )}
        </div>

        <div style={{whiteSpace: 'pre-line', color: '#4a4a68', fontSize: '1rem', marginBottom: '32px', lineHeight: 1.8}}>{job.body}</div>

        {job.roles && (
          <div style={{marginBottom: '28px'}}>
            <h3 style={{color: '#e63946', fontWeight: 700, fontSize: '1.2rem', marginBottom: '16px'}}>Key Roles & Responsibilities</h3>
            <ul style={{margin: 0, paddingLeft: '24px', color: '#4a4a68'}}>
              {job.roles.map((r, i) => (
                <li key={i} style={{marginBottom: '8px', lineHeight: 1.6}}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {job.responsibilities && (
          <div style={{marginBottom: '28px'}}>
            <h3 style={{color: '#e63946', fontWeight: 700, fontSize: '1.2rem', marginBottom: '16px'}}>What You'll Do</h3>
            <ul style={{margin: 0, paddingLeft: '24px', color: '#4a4a68'}}>
              {job.responsibilities.map((r, i) => (
                <li key={i} style={{marginBottom: '8px', lineHeight: 1.6}}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', padding: '28px', background: 'linear-gradient(135deg, #fff0f1 0%, rgba(255, 107, 53, 0.05) 100%)', borderRadius: '12px', marginBottom: '32px'}}>
          {job.pay && (
            <div>
              <p style={{margin: '0 0 8px 0', color: '#6b6b8a', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Compensation</p>
              <p style={{margin: 0, color: '#1a1a2e', fontWeight: 700, fontSize: '1.2rem'}}>{job.pay}</p>
            </div>
          )}
          {job.bonuses && (
            <div>
              <p style={{margin: '0 0 8px 0', color: '#6b6b8a', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px'}}>Bonuses & Benefits</p>
              <p style={{margin: 0, color: '#1a1a2e', fontWeight: 700, fontSize: '1.2rem'}}>{job.bonuses}</p>
            </div>
          )}
        </div>

        <a 
          className="button" 
          href={job.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{marginTop: 0, fontSize: '1rem', padding: '14px 32px', width: '100%', textAlign: 'center', justifyContent: 'center'}}
        >
          <span>Apply Now</span>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
    </div>
  )
}

export default function Jobs() {
  return (
    <Routes>
      <Route path="/" element={<JobList />} />
      <Route path=":jobId" element={<JobDetail />} />
    </Routes>
  )
}
