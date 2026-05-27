import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useServices } from '../context/ServicesContext';
import { ArrowLeft, CheckCircle, MessageCircle, Info } from 'lucide-react';
import './Services.css';

// ─── Doodle imports ───────────────────────────────────────────────────────────
import corporateDoodle from '../assets/corporate-doodle.jpeg';
import solutionsDoodle from '../assets/solutions-doodle.jpeg';
import talentDoodle    from '../assets/talent-doodle.jpeg';

const DOODLE_MAP = {
  'corporate-services': corporateDoodle,
  'solutions':          solutionsDoodle,
  'talent-management':  talentDoodle,
};

// ─── Pricing Block Components ────────────────────────────────────────────────

const StartingFromBlock = ({ service }) => (
  <div className="pricing-block pricing-starting">
    <p className="pricing-label">Starting From</p>
    <div className="pricing-amount">
      <span className="pricing-value">{service.startingFrom}</span>
      {service.pricingNote && (
        <span className="pricing-period"> / {service.pricingNote}</span>
      )}
    </div>
    {service.pricingDetails && (
      <p className="pricing-note">{service.pricingDetails}</p>
    )}
  </div>
);

const TieredBlock = ({ service }) => (
  <div className="pricing-block pricing-tiered">
    <p className="pricing-label">Pricing Options</p>
    <div className="pricing-tiers-simple">
      {service.pricingTiers.map((tier, i) => (
        <div key={i} className={`pricing-tier-simple ${tier.isDM ? 'is-dm' : ''}`}>
          <span className="tier-simple-label">{tier.label}</span>
          <div className="tier-simple-right">
            <span className="tier-simple-price">{tier.price}</span>
            {tier.period && <span className="tier-simple-period"> / {tier.period}</span>}
          </div>
          {tier.note && <p className="tier-simple-note">{tier.note}</p>}
        </div>
      ))}
    </div>
  </div>
);

const CategoriesBlock = ({ service }) => (
  <div className="pricing-block pricing-categories">
    <p className="pricing-label">Pricing by Category</p>
    <div className="pricing-categories-list">
      {service.categories.map((cat, i) => (
        <div key={i} className="pricing-category-row">
          <span className="category-label">{cat.label}</span>
          <div className="category-price-wrap">
            <span className="category-price">{cat.price}</span>
            {cat.period && <span className="category-period"> / {cat.period}</span>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PackagesBlock = ({ service }) => (
  <div className="pricing-block pricing-packages">
    <p className="pricing-label">Choose a Package</p>
    <div className="packages-grid">
      {service.packages.map((pkg, i) => (
        <div key={i} className={`package-card ${pkg.highlight ? 'package-highlight' : ''}`}>
          {pkg.badge && <span className="package-badge">{pkg.badge}</span>}
          <h4 className="package-name">{pkg.name}</h4>
          <div className="package-price">
            <span className="package-amount">{pkg.price}</span>
            {pkg.period && <span className="package-period"> / {pkg.period}</span>}
          </div>
          <ul className="package-features">
            {pkg.features.map((f, j) => (
              <li key={j}>
                <CheckCircle size={15} className="pkg-check" />
                {f}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-sm-pkg">Get Started</Link>
        </div>
      ))}
    </div>

    {service.addons && (
      <div className="addons-section">
        <h4 className="addons-title">Add-On Rates</h4>
        <div className="addons-grid">
          {service.addons.map((addon, i) => (
            <div key={i} className={`addon-row ${addon.isNote ? 'addon-note' : ''}`}>
              <span className="addon-label">{addon.label}</span>
              <span className="addon-price">{addon.price}</span>
            </div>
          ))}
        </div>
        <p className="addons-disclaimer">
          * Photography charges, special promotions, and other related tasks will be quoted separately when required.
        </p>
      </div>
    )}
  </div>
);

const RecruitmentTiersBlock = ({ service }) => (
  <div className="pricing-block pricing-recruitment">
    <p className="pricing-label">Fee Structure — Per Successfully Placed Candidate</p>
    <div className="recruitment-tiers-grid">
      {service.recruitmentTiers.map((tier, i) => (
        <div key={i} className={`recruitment-tier-card ${tier.highlight ? 'recruitment-highlight' : ''}`}>
          {tier.badge && <span className="package-badge">{tier.badge}</span>}
          <span className="rec-tier-label">{tier.tier}</span>
          <h4 className="rec-tier-title">{tier.label}</h4>
          <p className="rec-tier-desc">{tier.description}</p>
          <div className="rec-tier-fee">
            <span className="rec-fee-amount">{tier.fee}</span>
            <span className="rec-fee-type">{tier.feeType}</span>
          </div>
          <div className="rec-guarantee">
            <CheckCircle size={14} className="rec-check" />
            {tier.guarantee}
          </div>
        </div>
      ))}
    </div>
    <div className="recruitment-notes">
      {service.paymentNote && (
        <div className="rec-note-row">
          <Info size={15} className="rec-note-icon" />
          <p>{service.paymentNote}</p>
        </div>
      )}
      {service.cancellationNote && (
        <div className="rec-note-row">
          <Info size={15} className="rec-note-icon" />
          <p>{service.cancellationNote}</p>
        </div>
      )}
      {service.guaranteeDisclaimer && (
        <div className="rec-note-row rec-note-disclaimer">
          <Info size={15} className="rec-note-icon" />
          <p>{service.guaranteeDisclaimer}</p>
        </div>
      )}
    </div>
  </div>
);

const DMBlock = ({ service }) => (
  <div className="pricing-block pricing-dm">
    <MessageCircle size={28} className="dm-icon" />
    <p className="dm-text">{service.dmText}</p>
    <Link to="/contact" className="btn btn-primary dm-btn">Request a Quote</Link>
  </div>
);

// ─── Pricing Router ───────────────────────────────────────────────────────────

const PricingSection = ({ service }) => {
  switch (service.pricingType) {
    case 'starting':          return <StartingFromBlock service={service} />;
    case 'tiered':            return <TieredBlock service={service} />;
    case 'categories':        return <CategoriesBlock service={service} />;
    case 'packages':          return <PackagesBlock service={service} />;
    case 'recruitment-tiers': return <RecruitmentTiersBlock service={service} />;
    case 'dm':
    default:                  return <DMBlock service={service} />;
  }
};

// ─── What's Included ─────────────────────────────────────────────────────────

const IncludedBlock = ({ service }) => {
  if (!service.included || service.included.length === 0) return null;
  return (
    <div className="service-features card">
      <h3>What's Included</h3>
      <ul className="feature-list">
        {service.included.map((item, i) => (
          <li key={i}>
            <CheckCircle size={20} className="feature-icon" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const ServiceDetail = () => {
  const { companyId, serviceId } = useParams();
  const navigate = useNavigate();
  const { servicesData } = useServices();
  const [service, setService] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const foundCompany = servicesData.find(c => c.id === companyId);
    if (foundCompany) {
      setCompany(foundCompany);
      const foundService = foundCompany.services.find(s => s.id === serviceId);
      if (foundService) {
        setService(foundService);
      } else {
        navigate('/services');
      }
    } else {
      navigate('/services');
    }
  }, [companyId, serviceId, navigate, servicesData]);

  if (!service || !company) return null;

  const isWideLayout =
    service.pricingType === 'packages' ||
    service.pricingType === 'recruitment-tiers';

  const hasIncluded = service.included && service.included.length > 0;
  const doodle = DOODLE_MAP[companyId];

  return (
    <div className="service-detail-page animate-fade-in">
      <header
        className="page-header service-header"
        style={{
          background:
            "linear-gradient(135deg, rgba(5, 15, 40, 0.8) 0%, rgba(0, 30, 80, 0.7) 100%), url('/images/services-bg.jpg') center/cover no-repeat",
        }}
      >
        <div className="container">
          <Link to={`/services#${company.id}`} className="back-link">
            <ArrowLeft size={16} /> Back to {company.name}
          </Link>
          <h1>{service.name}</h1>
        </div>
      </header>

      {/* ── Content section with doodle background ── */}
      <section className="section service-detail-section">
        {doodle && (
          <div
            className="service-doodle-bg"
            style={{ backgroundImage: `url(${doodle})` }}
            aria-hidden="true"
          />
        )}

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {isWideLayout ? (
            <div className="service-detail-wide">
              <p className="service-lead">{service.desc}</p>
              <PricingSection service={service} />
              {hasIncluded && (
                <div className="service-detail-bottom">
                  <IncludedBlock service={service} />
                  <div className="card contact-card">
                    <h3>Interested in this service?</h3>
                    <p>Let's discuss how we can help your business grow.</p>
                    <Link to="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                      Contact Us Now
                    </Link>
                  </div>
                </div>
              )}
              {!hasIncluded && (
                <div className="card contact-card" style={{ maxWidth: 400, marginTop: '2rem' }}>
                  <h3>Interested in this service?</h3>
                  <p>Let's discuss how we can help your business grow.</p>
                  <Link to="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Contact Us Now
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-2 service-detail-content">
              <div className="service-text">
                <h2>About This Service</h2>
                <p className="service-lead">{service.desc}</p>
                <PricingSection service={service} />
                <IncludedBlock service={service} />
              </div>

              <div className="service-sidebar">
                <div className="card contact-card">
                  <h3>Interested in this service?</h3>
                  <p>Let's discuss how we can help your business grow.</p>
                  <Link to="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Contact Us Now
                  </Link>
                </div>
                <div className="card other-services-card">
                  <h3>Other Services from {company.name}</h3>
                  <ul className="other-services-list">
                    {company.services
                      .filter(s => s.id !== serviceId)
                      .slice(0, 4)
                      .map(s => (
                        <li key={s.id}>
                          <Link to={`/services/${company.id}/${s.id}`}>{s.name}</Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;