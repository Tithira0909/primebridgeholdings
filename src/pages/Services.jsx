import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Briefcase, MonitorPlay, Users, Building2 } from 'lucide-react';
import { useServices } from '../context/ServicesContext';
import './Services.css';

/** Returns a short pricing label for a service card */
const getPriceBadge = (service) => {
  switch (service.pricingType) {
    case 'starting': {
      const period = service.pricingNote
        ? service.pricingNote.replace(/^per\s+/i, '')
        : null;
      return { text: `From ${service.startingFrom}${period ? ` / ${period}` : ''}`, isQuote: false };
    }
    case 'packages': {
      const prices = service.packages
        .map(p => parseInt(p.price.replace(/[^0-9]/g, ''), 10))
        .filter(Boolean);
      const min = Math.min(...prices);
      return { text: `From LKR ${min.toLocaleString()} / month`, isQuote: false };
    }
    case 'categories': {
      const prices = service.categories
        .map(c => parseInt(c.price.replace(/[^0-9]/g, ''), 10))
        .filter(Boolean);
      const min = Math.min(...prices);
      return { text: `From LKR ${min.toLocaleString()} / annum`, isQuote: false };
    }
    case 'tiered': {
      const fixed = service.pricingTiers.find(t => !t.isDM);
      if (fixed) {
        const period = fixed.period ? fixed.period.replace(/^per\s+/i, '') : null;
        return { text: `From ${fixed.price}${period ? ` / ${period}` : ''}`, isQuote: false };
      }
      return { text: 'Get a Quote', isQuote: true };
    }
    case 'recruitment-tiers':
      return { text: 'From LKR 30,000 / placement', isQuote: false };
    case 'dm':
    default:
      return { text: 'Get a Quote', isQuote: true };
  }
};

const iconMap = {
  'holdings': Building2,
  'corporate-services': Briefcase,
  'solutions': MonitorPlay,
  'talent-management': Users,
};

const serviceCardStyles = [
  'aqua-lines',
  'sunny-dots',
  'coral-waves',
  'mint-grid',
  'violet-rings',
  'amber-sparks',
  'sky-circuits',
  'rose-crosshatch',
];

const Services = () => {
  const { hash } = useLocation();
  const { servicesData } = useServices();

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

  // Filter out companies with no services (e.g. Holdings) — nothing to render in the grid
  const visibleCompanies = servicesData.filter(company => company.services.length > 0);

  return (
    <div className="services-page animate-fade-in">
      {/* Page Header */}
      <header
        className="page-header"
        style={{
          background:
            "linear-gradient(135deg, rgba(5, 15, 40, 0.8) 0%, rgba(0, 30, 80, 0.7) 100%), url('/images/services-bg.jpg') center/cover no-repeat",
        }}
      >
        <div className="container text-center">
          <h1>Our Services</h1>
          <p>Comprehensive solutions designed to support every dimension of your business journey.</p>
        </div>
      </header>

      <div className="container" style={{ padding: '4rem 2rem' }}>
        {visibleCompanies.map((company, index) => {
          const Icon = iconMap[company.id] || Briefcase;

          return (
            <section
              id={company.id}
              key={company.id}
              className={`company-section company-section--${company.id} ${
                index !== visibleCompanies.length - 1 ? 'has-divider' : ''
              }`}
            >
              <div className="company-section-doodles" aria-hidden="true">
                <span className="company-doodle company-doodle--one" />
                <span className="company-doodle company-doodle--two" />
                <span className="company-doodle company-doodle--three" />
              </div>
              <div className="company-header">
                <div className="company-icon-large">
                  {company.logo ? (
                    <img src={company.logo} alt={`${company.name} logo`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                  ) : (
                    <Icon size={40} />
                  )}
                </div>
                <div>
                  <h2>{company.name}</h2>
                  <p className="company-desc">{company.description}</p>
                </div>
              </div>

              <div className="grid grid-3 services-grid">
                {company.services.map((service, serviceIndex) => {
                  const badge = getPriceBadge(service);
                  const styleIndex = (index * 3 + serviceIndex) % serviceCardStyles.length;
                  return (
                    <Link
                      to={`/services/${company.id}/${service.id}`}
                      key={service.id}
                      className={`service-card service-card--${serviceCardStyles[styleIndex]}`}
                    >
                      <h4>{service.name}</h4>
                      <p>{service.desc}</p>
                      <div className="service-card-spacer" />
                      <span className={`service-price-badge${badge.isQuote ? ' service-price-badge--quote' : ''}`}>
                        {badge.text}
                      </span>
                      <span className="learn-more">
                        Learn More <ArrowRight size={16} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
