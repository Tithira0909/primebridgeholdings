import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { servicesData } from '../data';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
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
      hasDropdown: true 
    },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <span className="logo-text">PrimeBridge<span className="logo-accent">Holdings</span></span>
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
                      onMouseEnter={() => handleSubDropdownEnter(company.id)}
                      onMouseLeave={handleSubDropdownLeave}
                    >
                      <Link 
                        to={`/services#${company.id}`} 
                        className="dropdown-link has-sub-dropdown"
                        onClick={() => setIsOpen(false)}
                      >
                        {company.name}
                        <ChevronRight size={16} />
                      </Link>
                      
                      {activeSubDropdown === company.id && (
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
            <Link to="/contact" className="btn btn-primary nav-btn" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
