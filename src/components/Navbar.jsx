import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useServices } from '../context/ServicesContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { servicesData } = useServices();
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [showPayPopup, setShowPayPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 960;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
        setActiveDropdown(null);
        setActiveSubDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }
  };

  const handleDropdownEnter = (menu) => {
    if (!isMobile) setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }
  };

  const handleSubDropdownEnter = (submenu) => {
    if (!isMobile) setActiveSubDropdown(submenu);
  };

  const handleSubDropdownLeave = () => {
    if (!isMobile) setActiveSubDropdown(null);
  };

  const handleNavClick = (link, e) => {
    if (isMobile && link.hasDropdown) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === 'services' ? null : 'services');
    } else {
      setIsOpen(false);
    }
  };

  const handleCompanyClick = (company, e) => {
    if (isMobile && company.services.length > 0) {
      e.preventDefault();
      setActiveSubDropdown(activeSubDropdown === company.id ? null : company.id);
    } else {
      setIsOpen(false);
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
      {/* ── Coming Soon Popup ── */}
      {showPayPopup && (
        <div className="popup-overlay" onClick={() => setShowPayPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPayPopup(false)}>
              <X size={20} />
            </button>
            <h3 className="popup-title">Coming Soon</h3>
            <p className="popup-message">
              Our online payment portal is currently under development. Please reach out to us directly to make a payment.
            </p>
            <button
              className="btn btn-primary popup-btn"
              onClick={() => setShowPayPopup(false)}
            >
              Got It
            </button>
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
                    <ChevronDown
                      size={16}
                      className={`dropdown-icon ${activeDropdown === 'services' ? 'rotated' : ''}`}
                    />
                  )}
                </Link>

                {link.hasDropdown && activeDropdown === 'services' && (
                  <div className="dropdown-menu animate-fade-in">
                    {isMobile && (
                      <div className="dropdown-item-wrapper">
                        <Link
                          to="/services"
                          className="dropdown-link overview-link"
                          onClick={() => setIsOpen(false)}
                        >
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
                            <ChevronRight
                              size={16}
                              className={`sub-dropdown-icon ${activeSubDropdown === company.id ? 'rotated' : ''}`}
                            />
                          )}
                        </Link>

                        {activeSubDropdown === company.id && company.services.length > 0 && (
                          <div className="sub-dropdown-menu animate-fade-in">
                            {isMobile && (
                              <Link
                                to={`/services#${company.id}`}
                                className="sub-dropdown-link overview-link"
                                onClick={() => setIsOpen(false)}
                              >
                                {company.name.split(' (')[0]} Overview
                              </Link>
                            )}
                            {company.services.map((service, sIndex) => (
                              <Link
                                key={sIndex}
                                to={`/services/${company.id}/${service.id}`}
                                className="sub-dropdown-link"
                                onClick={() => setIsOpen(false)}
                              >
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
              <button
                className="btn btn-primary nav-btn"
                onClick={() => {
                  setIsOpen(false);
                  setShowPayPopup(true);
                }}
              >
                Pay Here
              </button>
            </li>

            {isAuthenticated && (
              <li className="nav-item nav-btn-item">
                <Link
                  to="/admin/dashboard"
                  className="btn btn-secondary nav-btn"
                  onClick={() => setIsOpen(false)}
                >
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