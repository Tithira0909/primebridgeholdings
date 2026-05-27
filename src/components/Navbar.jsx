import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useServices } from '../context/ServicesContext';
import './Navbar.css';

const Navbar = () => {
  const { servicesData } = useServices();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [showPayPopup, setShowPayPopup] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDropdownEnter = (menu) => setActiveDropdown(menu);
  const handleDropdownLeave = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const handleSubDropdownEnter = (submenu) => setActiveSubDropdown(submenu);
  const handleSubDropdownLeave = () => setActiveSubDropdown(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    {
      name: 'Services',
      path: '/services',
      hasDropdown: true,
    },
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
            <button className="btn btn-primary popup-btn" onClick={() => setShowPayPopup(false)}>
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

          <div className="menu-icon" onClick={toggleMenu}>
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
                  onClick={() => !link.hasDropdown && setIsOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={16} className="dropdown-icon" />}
                </Link>

                {link.hasDropdown && activeDropdown === 'services' && (
                  <div className="dropdown-menu animate-fade-in">
                    {servicesData.map((company, cIndex) => (
                      <div
                        key={cIndex}
                        className="dropdown-item-wrapper"
                        onMouseEnter={() => company.services.length > 0 && handleSubDropdownEnter(company.id)}
                        onMouseLeave={handleSubDropdownLeave}
                      >
                        <Link
                          to={`/services#${company.id}`}
                          className={`dropdown-link ${company.services.length > 0 ? 'has-sub-dropdown' : ''}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {company.name}
                          {company.services.length > 0 && <ChevronRight size={16} />}
                        </Link>

                        {activeSubDropdown === company.id && company.services.length > 0 && (
                          <div className="sub-dropdown-menu animate-fade-in">
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
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;