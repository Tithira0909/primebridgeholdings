import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Shield, TrendingUp, Award } from 'lucide-react';
import './Holdings.css';

const Holdings = () => {
  return (
    <div className="holdings-page animate-fade-in">
      <header
        className="page-header"
        style={{
          background:
            "linear-gradient(135deg, rgba(5, 15, 40, 0.85) 0%, rgba(0, 30, 80, 0.75) 100%), url('/images/services-bg.jpg') center/cover no-repeat",
        }}
      >
        <div className="container text-center">
          <h1>PrimeBridge Holdings</h1>
          <p>Strategic governance, capital stewardship, and long-term value creation.</p>
        </div>
      </header>

      <section className="section holdings-content">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div className="holdings-text">
              <h2>Parent Entity & Strategic Anchor</h2>
              <p className="lead">
                Primebridge Holdings (Pvt) Ltd is a diversified holding company committed to building long-term value across a portfolio of dynamic subsidiaries.
              </p>
              <p>
                As the parent entity of the group, Primebridge Holdings provides strategic direction, governance, and capital stewardship to each of its operating companies, enabling them to grow with purpose and stability.
              </p>
              <p>
                With interests spanning multiple sectors, the group is positioned to leverage synergies across its businesses while adapting to the evolving demands of the markets in which it operates.
              </p>
              <p>
                Primebridge Holdings upholds the highest standards of corporate integrity and responsibility, fostering a culture of excellence that runs through every level of the group. Guided by a clear vision for sustainable growth, the company continues to identify and nurture opportunities that create enduring value for its stakeholders.
              </p>
            </div>
            
            <div className="holdings-pillars">
              <div className="pillar-card">
                <div className="pillar-icon">
                  <Shield size={24} />
                </div>
                <div>
                  <h4>Strategic Direction & Governance</h4>
                  <p>Guiding each operating company with rigorous standards and forward-looking leadership.</p>
                </div>
              </div>
              
              <div className="pillar-card">
                <div className="pillar-icon">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4>Capital Stewardship</h4>
                  <p>Allocating capital to drive sustainable expansion, stability, and enduring value.</p>
                </div>
              </div>
              
              <div className="pillar-card">
                <div className="pillar-icon">
                  <Award size={24} />
                </div>
                <div>
                  <h4>Culture of Excellence</h4>
                  <p>Fostering integrity, accountability, and high-performance standards group-wide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Subsidiaries Section */}
      <section className="section section-bg-alt group-subsidiaries">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Our Operating Subsidiaries</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>
              PrimeBridge Holdings powers three distinct professional subsidiaries, each a specialist in its domain.
            </p>
          </div>
          
          <div className="grid grid-3">
            <div className="card sub-card">
              <div className="sub-icon-wrapper blue" style={{ overflow: 'hidden', padding: 0, border: 'none' }}>
                <img src="/images/Corporate.jpg" alt="PrimeBridge Corporate Services logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3>PrimeBridge Corporate Services</h3>
              <p>Financial accounting, tax advisory, business registration, and secretarial compliance services for SMEs and enterprises.</p>
              <Link to="/services#corporate-services" className="link-with-icon">
                Explore Services <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card sub-card">
              <div className="sub-icon-wrapper cyan" style={{ overflow: 'hidden', padding: 0, border: 'none' }}>
                <img src="/images/Solutions.jpg" alt="PrimeBridge Solutions logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3>PrimeBridge Solutions</h3>
              <p>Modern digital and IT solutions, from web development and business email setups to social media marketing and branding.</p>
              <Link to="/services#solutions" className="link-with-icon">
                Explore Services <ArrowRight size={16} />
              </Link>
            </div>

            <div className="card sub-card">
              <div className="sub-icon-wrapper green" style={{ overflow: 'hidden', padding: 0, border: 'none' }}>
                <img src="/images/Talent.jpg" alt="PrimeBridge Talent Management logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3>PrimeBridge Talent Management</h3>
              <p>End-to-end recruitment, payroll management, human resources outsourcing, and professional staff placements.</p>
              <Link to="/services#talent-management" className="link-with-icon">
                Explore Services <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Holdings;
