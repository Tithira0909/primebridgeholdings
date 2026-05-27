import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, MessageCircle, Hash, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { useServices } from '../context/ServicesContext';
import './Footer.css';

const Footer = () => {
  const { servicesData } = useServices();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col about-col">
            <h3 className="footer-logo">PrimeBridge<span className="logo-accent">Holdings</span></h3>
            <p className="footer-desc">
              Delivering integrated professional services across finance, technology, and human capital management. We build long-term partnerships focused on growth, efficiency, and sustainable success.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><Globe size={20} /></a>
              <a href="#" className="social-link"><MessageCircle size={20} /></a>
              <a href="#" className="social-link"><Hash size={20} /></a>
              <a href="#" className="social-link"><Share2 size={20} /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Companies</h4>
            <ul className="footer-links">
              {servicesData.map((company, idx) => (
                <li key={idx}>
                  <Link to={company.id === 'holdings' ? '/holdings' : `/services#${company.id}`}>{company.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>Headquarters, Colombo, Sri Lanka</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span>+94 11 234 5678</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <span>info@primebridgeholdings.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} PrimeBridge Holdings (Pvt) Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
