import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, MonitorPlay, Users, CheckCircle, Building2 } from 'lucide-react';
import './Home.css';
import { useServices } from '../context/ServicesContext';
import { useHero } from '../context/HeroContext';

const Home = () => {
  const { servicesData } = useServices();
  const { activeImageData } = useHero();

  const heroStyle = activeImageData ? {
    backgroundImage: `linear-gradient(135deg, rgba(5, 15, 40, 0.7) 0%, rgba(0, 30, 80, 0.5) 100%), url(${activeImageData})`
  } : {};

  return (
    <div className="home-page animate-fade-in">

      {/* ── Hero ── */}
      <section className="hero" style={heroStyle}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Empowering Businesses for Sustainable Growth</h1>
          <p className="hero-subtitle">
            Delivering integrated professional services across finance, technology, and human capital management.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn btn-primary">Explore Our Services</Link>
            <Link to="/contact" className="btn btn-outline hero-outline-btn">Partner With Us</Link>
          </div>
        </div>
      </section>

      {/* ── About Overview ── */}
      <section className="section about-overview">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div className="about-text">
              <h2>Building Long-Term Partnerships</h2>
              <p>
                Primebridge Group is a dynamic business solutions group based in Colombo, Sri Lanka.
                Through our specialized subsidiaries, we provide end-to-end solutions tailored to
                startups, SMEs, and growing enterprises — combining financial expertise, digital
                innovation, and human capital management under one trusted group.
              </p>
              <ul className="feature-list">
                <li><CheckCircle size={20} className="feature-icon" /> Technical Expertise</li>
                <li><CheckCircle size={20} className="feature-icon" /> Practical Business Insight</li>
                <li><CheckCircle size={20} className="feature-icon" /> Client-First Mindset</li>
              </ul>
              <Link to="/about" className="link-with-icon mt-2">
                Discover our Vision &amp; Mission <ArrowRight size={16} />
              </Link>
            </div>
            <div className="about-image-placeholder">
              <div className="glass-card">
                <h3>Your Trusted Growth Partner</h3>
                <p>We don't just offer services — we build partnerships focused on efficiency and success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Companies Overview ── */}
      <section className="section section-bg-alt companies-section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Our Specialized Subsidiaries</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>
              We provide the building blocks that power sustainable growth through our expert domains.
            </p>
          </div>

          <div className="grid grid-3">
            {servicesData.map((company, index) => {
              const Icon = company.id === 'corporate-services' ? Briefcase :
                           company.id === 'solutions'          ? MonitorPlay :
                           company.id === 'holdings'           ? Building2 : Users;

              return (
                <div className="card company-card" key={index}>
                  <div className="company-icon-wrapper">
                    <img
                      src={company.logo || "/images/prime.jpg"}
                      alt={`${company.name} logo`}
                      className="company-logo-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="company-icon-fallback" style={{ display: 'none' }}>
                      <Icon size={32} />
                    </div>
                  </div>
                  <h3>{company.name}</h3>
                  <p>{company.description}</p>
                  <Link
                    to={company.id === 'holdings' ? '/holdings' : `/services#${company.id}`}
                    className="link-with-icon"
                  >
                    {company.id === 'holdings' ? 'Explore Group' : 'View Services'} <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2 style={{ color: 'white' }}>Ready to Scale Your Business?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Whether you are a startup finding your footing, or an established enterprise seeking
            specialised expertise, we have the right solution for you.
          </p>
          <Link to="/contact" className="btn btn-secondary">Get in Touch Today</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;