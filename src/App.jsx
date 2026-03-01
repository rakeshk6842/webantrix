import React, { useRef, useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Jobs from './pages/Jobs'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import WebantrixLogo from './components/WebantrixLogo'

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [atServices, setAtServices] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    if (location.pathname !== '/') {
      setAtServices(false);
      return;
    }
    const section = document.getElementById('services');
    if (!section) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new window.IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
        const rect = entry.target.getBoundingClientRect();
        const fallback = rect.top >= 0 && rect.top < window.innerHeight * 0.5;
        setAtServices(inView || fallback);
      },
      { root: null, threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 1] }
    );
    observerRef.current.observe(section);
    return () => observerRef.current && observerRef.current.disconnect();
  }, [location.pathname]);

  const handleServicesClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" onClick={closeMobileMenu}>
            <div className="logo-container">
              <WebantrixLogo width={44} height={44} />
            </div>
            <div className="brand-text">
              <div className="company-name">
                <span className="company-brand">Webantrix</span>
              </div>
              <p className="company-tagline">Weaving digital excellence into every pixel</p>
            </div>
          </Link>
          <button className="hamburger-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'active' : ''}`}></span>
          </button>
          <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" onClick={closeMobileMenu} className={location.pathname === '/' && !atServices ? 'active' : ''}>Home</Link>
            <a href="#services" onClick={(e) => { handleServicesClick(e); closeMobileMenu(); }} className={atServices ? 'active' : ''} tabIndex={0}>Services</a>
            <Link to="/jobs" onClick={closeMobileMenu} className={location.pathname.startsWith('/jobs') ? 'active' : ''}>Careers</Link>
            <Link to="/about" onClick={closeMobileMenu} className={location.pathname === '/about' ? 'active' : ''}>About</Link>
            <Link to="/contact" onClick={closeMobileMenu} className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/*" element={<Jobs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About Webantrix</h4>
              <p style={{margin: 0, color: '#cbd5e0', fontSize: '0.9rem', lineHeight: 1.6}}>Crafting innovative web solutions and digital experiences that transform businesses and delight users.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/" style={{color: '#cbd5e0', textDecoration: 'none', transition: 'var(--transition)', display: 'block', marginBottom: '8px'}}>Home</Link>
              <Link to="/jobs" style={{color: '#cbd5e0', textDecoration: 'none', transition: 'var(--transition)', display: 'block', marginBottom: '8px'}}>Careers</Link>
              <Link to="/about" style={{color: '#cbd5e0', textDecoration: 'none', transition: 'var(--transition)', display: 'block', marginBottom: '8px'}}>About Us</Link>
              <Link to="/contact" style={{color: '#cbd5e0', textDecoration: 'none', transition: 'var(--transition)', display: 'block', marginBottom: '8px'}}>Contact</Link>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <a href="#" style={{color: '#cbd5e0', textDecoration: 'none', display: 'block', marginBottom: '8px'}}>LinkedIn</a>
              <a href="#" style={{color: '#cbd5e0', textDecoration: 'none', display: 'block', marginBottom: '8px'}}>Twitter</a>
              <a href="#" style={{color: '#cbd5e0', textDecoration: 'none', display: 'block', marginBottom: '8px'}}>GitHub</a>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} Webantrix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
