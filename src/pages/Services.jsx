import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { servicesData } from '../data';
import { ArrowRight, Briefcase, MonitorPlay, Users } from 'lucide-react';
import './Services.css';

const Services = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="services-page animate-fade-in">
      {/* Page Header */}
      <header className="page-header" style={{ background: "linear-gradient(135deg, rgba(5, 15, 40, 0.8) 0%, rgba(0, 30, 80, 0.7) 100%), url('/images/services-bg.jpg') center/cover no-repeat" }}>
        <div className="container text-center">
          <h1>Our Services</h1>
          <p>Comprehensive solutions designed to support every dimension of your business journey.</p>
        </div>
      </header>

      <div className="container" style={{ padding: '4rem 2rem' }}>
        {servicesData.map((company, index) => {
          const Icon = company.id === 'corporate-services' ? Briefcase : 
                       company.id === 'solutions' ? MonitorPlay : Users;
                       
          return (
            <section 
              id={company.id} 
              key={company.id} 
              className={`company-section ${index !== servicesData.length - 1 ? 'has-divider' : ''}`}
            >
              <div className="company-header">
                <div className="company-icon-large">
                  <Icon size={40} />
                </div>
                <div>
                  <h2>{company.name}</h2>
                  <p className="company-desc">{company.description}</p>
                </div>
              </div>

              <div className="grid grid-3 services-grid">
                {company.services.map((service) => (
                  <Link 
                    to={`/services/${company.id}/${service.id}`} 
                    key={service.id}
                    className="service-card"
                  >
                    <h4>{service.name}</h4>
                    <p>{service.desc}</p>
                    <span className="learn-more">
                      Learn More <ArrowRight size={16} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
