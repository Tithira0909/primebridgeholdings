import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page animate-fade-in">
      <header className="page-header text-center" style={{ background: "linear-gradient(135deg, rgba(5, 15, 40, 0.8) 0%, rgba(0, 30, 80, 0.7) 100%), url('/images/contact-bg.jpg') center/cover no-repeat" }}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help. Reach out to discuss how we can partner for your success.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid grid-2 contact-grid">
            
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p className="mb-3">
                Have a question about our services or want to explore a potential partnership? 
                Our team is ready to provide you with the answers and support you need.
              </p>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-icon-wrapper">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>Headquarters</h4>
                    <p>123 Business Avenue, Colombo 03, Sri Lanka</p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="contact-icon-wrapper">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>+94 11 234 5678</p>
                  </div>
                </div>
                
                <div className="contact-detail-item">
                  <div className="contact-icon-wrapper">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>info@primebridgeholdings.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card contact-form-card">
              <h3>Send Us a Message</h3>
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" placeholder="John Doe" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="john@example.com" required />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company (Optional)</label>
                  <input type="text" id="company" placeholder="Your Company Ltd" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Interested Service</label>
                  <select id="service">
                    <option value="">Select a Service</option>
                    <option value="corporate">PrimeBridge Corporate Services</option>
                    <option value="solutions">PrimeBridge Solutions</option>
                    <option value="talent">PrimeBridge Talent Management</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="4" placeholder="How can we help you?" required></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
