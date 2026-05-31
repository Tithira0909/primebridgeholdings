import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, CreditCard, User, Mail, Phone, DollarSign, FileText, Loader } from 'lucide-react';
import { useServices } from '../context/ServicesContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { servicesData } = useServices();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  const location = useLocation();

  // Pay Here form state
  const [showPayModal, setShowPayModal] = useState(false);
  const [payStep, setPayStep] = useState('form'); // 'form' | 'loading' | 'error'
  const [payError, setPayError] = useState('');
  const [payForm, setPayForm] = useState({
    name: '', email: '', phone: '', amount: '', reference: ''
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 960;
      setIsMobile(mobile);
      if (!mobile) { setIsOpen(false); setActiveDropdown(null); setActiveSubDropdown(null); }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false); setActiveDropdown(null); setActiveSubDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (showPayModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showPayModal]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) { setActiveDropdown(null); setActiveSubDropdown(null); }
  };

  const handleDropdownEnter = (menu) => { if (!isMobile) setActiveDropdown(menu); };
  const handleDropdownLeave = () => { if (!isMobile) { setActiveDropdown(null); setActiveSubDropdown(null); } };
  const handleSubDropdownEnter = (submenu) => { if (!isMobile) setActiveSubDropdown(submenu); };
  const handleSubDropdownLeave = () => { if (!isMobile) setActiveSubDropdown(null); };

  const handleNavClick = (link, e) => {
    if (isMobile && link.hasDropdown) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === 'services' ? null : 'services');
    } else { setIsOpen(false); }
  };

  const handleCompanyClick = (company, e) => {
    if (isMobile && company.services.length > 0) {
      e.preventDefault();
      setActiveSubDropdown(activeSubDropdown === company.id ? null : company.id);
    } else { setIsOpen(false); }
  };

  const openPayModal = () => {
    setIsOpen(false);
    setPayStep('form');
    setPayError('');
    setPayForm({ name: '', email: '', phone: '', amount: '', reference: '' });
    setShowPayModal(true);
  };

  const closePayModal = () => {
    setShowPayModal(false);
    setPayStep('form');
    setPayError('');
  };

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    setPayStep('loading');
    setPayError('');

    try {
      const res = await fetch('http://localhost:5000/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setPayError(data.error || 'Payment initiation failed. Please try again.');
        setPayStep('error');
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setPayError('No checkout URL returned. Please try again.');
        setPayStep('error');
      }
    } catch (err) {
      setPayError('Could not connect to payment server. Please try again.');
      setPayStep('error');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* ── Pay Here Modal ── */}
      {showPayModal && (
        <div className="popup-overlay" onClick={closePayModal}>
          <div className="pay-modal-box" onClick={e => e.stopPropagation()}>
            <div className="pay-modal-header">
              <div className="pay-modal-title-row">
                <div className="pay-modal-icon"><CreditCard size={22} /></div>
                <div>
                  <h3 className="pay-modal-title">Make a Payment</h3>
                  <p className="pay-modal-subtitle">Secure payment powered by Dialog Genie</p>
                </div>
              </div>
              <button className="popup-close" onClick={closePayModal}><X size={20} /></button>
            </div>

            {payStep === 'loading' && (
              <div className="pay-loading-state">
                <Loader size={40} className="pay-spinner" />
                <p>Connecting to payment gateway...</p>
                <span>You will be redirected to complete your payment securely.</span>
              </div>
            )}

            {payStep === 'error' && (
              <div className="pay-error-state">
                <p className="pay-error-msg">{payError}</p>
                <button className="btn btn-primary" onClick={() => setPayStep('form')}>Try Again</button>
              </div>
            )}

            {payStep === 'form' && (
              <form onSubmit={handlePaySubmit} className="pay-form">
                <div className="pay-form-section-label">Personal Details</div>

                <div className="pay-field">
                  <label><User size={14} /> Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Amal Perera"
                    value={payForm.name}
                    onChange={e => setPayForm({ ...payForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="pay-field-row">
                  <div className="pay-field">
                    <label><Mail size={14} /> Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={payForm.email}
                      onChange={e => setPayForm({ ...payForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="pay-field">
                    <label><Phone size={14} /> Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={payForm.phone}
                      onChange={e => setPayForm({ ...payForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="pay-form-section-label" style={{ marginTop: '1.25rem' }}>Payment Details</div>

                <div className="pay-field-row">
                  <div className="pay-field">
                    <label><DollarSign size={14} /> Amount (LKR)</label>
                    <input
                      type="number"
                      placeholder="e.g. 25000"
                      min="1"
                      step="0.01"
                      value={payForm.amount}
                      onChange={e => setPayForm({ ...payForm, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="pay-field">
                    <label><FileText size={14} /> Reference / Invoice No. <span className="pay-optional">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="e.g. INV-2026-001"
                      value={payForm.reference}
                      onChange={e => setPayForm({ ...payForm, reference: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pay-secure-note">
                  Your payment is processed securely via Dialog Genie. Card details are never stored on our servers.
                </div>

                <div className="pay-form-actions">
                  <button type="button" className="btn btn-outline" onClick={closePayModal}>Cancel</button>
                  <button type="submit" className="btn btn-primary pay-submit-btn">
                    <CreditCard size={16} /> Proceed to Pay
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
            <img src="/images/prime.jpg" alt="PrimeBridge Holdings Logo" className="logo-image" />
          </Link>

          <div className="menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

          <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
            {navLinks.map((link, index) => (
              <li
                key={index}
                className={`nav-item ${link.hasDropdown ? 'has-dropdown' : ''}`}
                onMouseEnter={() => link.hasDropdown && handleDropdownEnter('services')}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to={link.path}
                  className={`nav-links ${location.pathname === link.path ? 'active-link' : ''}`}
                  onClick={(e) => handleNavClick(link, e)}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown size={16} className={`dropdown-icon ${activeDropdown === 'services' ? 'rotated' : ''}`} />
                  )}
                </Link>

                {link.hasDropdown && activeDropdown === 'services' && (
                  <div className="dropdown-menu animate-fade-in">
                    {isMobile && (
                      <div className="dropdown-item-wrapper">
                        <Link to="/services" className="dropdown-link overview-link" onClick={() => setIsOpen(false)}>
                          All Services Overview
                        </Link>
                      </div>
                    )}
                    {servicesData.map((company, cIndex) => (
                      <div
                        key={cIndex}
                        className="dropdown-item-wrapper"
                        onMouseEnter={() => !isMobile && company.services.length > 0 && handleSubDropdownEnter(company.id)}
                        onMouseLeave={!isMobile ? handleSubDropdownLeave : undefined}
                      >
                        <Link
                          to={company.id === 'holdings' ? '/holdings' : `/services#${company.id}`}
                          className={`dropdown-link ${company.services.length > 0 ? 'has-sub-dropdown' : ''} ${activeSubDropdown === company.id ? 'active-sub' : ''}`}
                          onClick={(e) => handleCompanyClick(company, e)}
                        >
                          {company.name}
                          {company.services.length > 0 && (
                            <ChevronRight size={16} className={`sub-dropdown-icon ${activeSubDropdown === company.id ? 'rotated' : ''}`} />
                          )}
                        </Link>
                        {activeSubDropdown === company.id && company.services.length > 0 && (
                          <div className="sub-dropdown-menu animate-fade-in">
                            {isMobile && (
                              <Link to={`/services#${company.id}`} className="sub-dropdown-link overview-link" onClick={() => setIsOpen(false)}>
                                {company.name.split(' (')[0]} Overview
                              </Link>
                            )}
                            {company.services.map((service, sIndex) => (
                              <Link key={sIndex} to={`/services/${company.id}/${service.id}`} className="sub-dropdown-link" onClick={() => setIsOpen(false)}>
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}

            <li className="nav-item nav-btn-item">
              <button className="btn btn-primary nav-btn" onClick={openPayModal}>
                Pay Here
              </button>
            </li>

            {isAuthenticated && (
              <li className="nav-item nav-btn-item">
                <Link to="/admin/dashboard" className="btn btn-secondary nav-btn" onClick={() => setIsOpen(false)}>
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;