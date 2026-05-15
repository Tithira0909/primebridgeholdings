import React from 'react';
import './About.css';
import { Target, Compass, Award, Shield, Lightbulb, Users, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page animate-fade-in">
      {/* Page Header */}
      <header className="page-header" style={{ background: "linear-gradient(135deg, rgba(5, 15, 40, 0.8) 0%, rgba(0, 30, 80, 0.7) 100%), url('/images/about-bg.jpg') center/cover no-repeat" }}>
        <div className="container text-center">
          <h1>About Us</h1>
          <p>Discover who we are, our vision, and the values that drive us.</p>
        </div>
      </header>

      {/* Who We Are */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 about-content-grid">
            <div className="about-text-content">
              <h2>Who We Are</h2>
              <p>
                PrimeBridge Holdings is a diversified holding company headquartered in Sri Lanka, bringing together a portfolio of specialized subsidiaries united by a single purpose: to deliver exceptional, integrated services that help individuals and businesses thrive. 
              </p>
              <p>
                From financial management and digital transformation to talent acquisition and HR solutions, we provide the building blocks that power sustainable growth.
              </p>
              <p>
                At PrimeBridge Holdings, we believe that the right support — at the right time — can change the trajectory of a business. That is why we have built a family of companies, each expert in their domain, yet seamlessly connected through shared values of integrity, professionalism, and a genuine commitment to our clients' success.
              </p>
            </div>
            <div className="about-visual">
              <div className="visual-card visual-card-1">
                <Target size={40} className="visual-icon" />
                <h4>Integrated Services</h4>
              </div>
              <div className="visual-card visual-card-2">
                <Users size={40} className="visual-icon" />
                <h4>Expert Teams</h4>
              </div>
              <div className="visual-card visual-card-3">
                <Award size={40} className="visual-icon" />
                <h4>Proven Success</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section section-bg-alt">
        <div className="container">
          <div className="grid grid-2">
            <div className="card vision-card">
              <div className="card-icon">
                <Compass size={32} />
              </div>
              <h2>Our Vision</h2>
              <p>
                To be Sri Lanka's most trusted and sought-after group of companies — recognised for excellence, innovation, and the measurable impact we create for every client we serve. To become a leading regional business solutions group globally.
              </p>
            </div>
            <div className="card mission-card">
              <div className="card-icon">
                <Target size={32} />
              </div>
              <h2>Our Mission</h2>
              <p>
                To provide high-quality, cost-effective, and professional services across corporate finance, digital innovation, and human capital management, enabling our clients to focus on their core business while we handle the rest. We are committed to building long-term partnerships grounded in trust, transparency, and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Our Core Values</h2>
            <p>The principles that guide our every action and decision.</p>
          </div>
          <div className="grid grid-3 values-grid">
            <div className="value-item">
              <Shield className="value-icon" size={28} />
              <h4>Integrity</h4>
              <p>We do what we say. Honesty and ethical conduct are non-negotiable in everything we do.</p>
            </div>
            <div className="value-item">
              <Users className="value-icon" size={28} />
              <h4>Client-First Mindset</h4>
              <p>Every decision we make is guided by what is best for the people we serve.</p>
            </div>
            <div className="value-item">
              <Award className="value-icon" size={28} />
              <h4>Excellence</h4>
              <p>We hold ourselves to the highest professional standards, continuously raising the bar.</p>
            </div>
            <div className="value-item">
              <Lightbulb className="value-icon" size={28} />
              <h4>Innovation</h4>
              <p>We embrace change and leverage new thinking to deliver smarter solutions.</p>
            </div>
            <div className="value-item">
              <Users className="value-icon" size={28} />
              <h4>Collaboration</h4>
              <p>We work as one — across our companies and with our clients — to achieve shared success.</p>
            </div>
            <div className="value-item">
              <CheckCircle className="value-icon" size={28} />
              <h4>Accountability</h4>
              <p>We take ownership of our commitments and stand behind our work.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
