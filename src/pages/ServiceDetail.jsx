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

const DoodleArtwork = ({ companyId, variant = 'detail' }) => {
  const title = `${companyId}-${variant}-doodles`;

  if (companyId === 'solutions') {
    return (
      <div className={`service-doodle-art service-doodle-art--${variant} service-doodle-art--solutions`} aria-hidden="true">
        <svg viewBox="0 0 360 360" role="img" aria-labelledby={title}>
          <title id={title}>Decorative technology doodles</title>
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="54" y="70" width="132" height="88" rx="12" stroke="#0f4c81" strokeWidth="7" />
            <path d="M92 184h56M118 158v26" stroke="#00b4d8" strokeWidth="7" />
            <path d="M76 100h42M76 124h78" stroke="#ffc107" strokeWidth="6" />
            <rect x="214" y="112" width="76" height="132" rx="16" stroke="#00b4d8" strokeWidth="7" />
            <path d="M236 136h30M238 216h28" stroke="#0f4c81" strokeWidth="6" />
            <path d="M82 246c34-32 74-32 120 0s82 30 108-8" stroke="#ff6b6b" strokeWidth="7" />
            <path d="M245 68l15 15 25-30M50 220l22-16 20 22" stroke="#2ec4b6" strokeWidth="7" />
            <circle cx="308" cy="88" r="11" fill="#ffc107" stroke="none" />
            <circle cx="70" cy="286" r="9" fill="#00b4d8" stroke="none" />
          </g>
        </svg>
      </div>
    );
  }

  if (companyId === 'talent-management') {
    return (
      <div className={`service-doodle-art service-doodle-art--${variant} service-doodle-art--talent`} aria-hidden="true">
        <svg viewBox="0 0 360 360" role="img" aria-labelledby={title}>
          <title id={title}>Decorative people and hiring doodles</title>
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="106" cy="100" r="28" stroke="#0f4c81" strokeWidth="7" />
            <path d="M62 182c9-36 77-36 88 0" stroke="#00b4d8" strokeWidth="7" />
            <circle cx="234" cy="92" r="24" stroke="#ff6b6b" strokeWidth="7" />
            <path d="M196 166c8-30 68-30 76 0" stroke="#ffc107" strokeWidth="7" />
            <rect x="82" y="220" width="196" height="66" rx="14" stroke="#0f4c81" strokeWidth="7" />
            <path d="M126 220v-22h108v22M126 254h46M204 254h34" stroke="#2ec4b6" strokeWidth="7" />
            <path d="M284 92c26 16 35 45 18 70M64 96c-24 18-32 48-12 72" stroke="#00b4d8" strokeWidth="6" />
            <circle cx="306" cy="220" r="10" fill="#ffc107" stroke="none" />
            <circle cx="56" cy="244" r="9" fill="#ff6b6b" stroke="none" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`service-doodle-art service-doodle-art--${variant} service-doodle-art--corporate`} aria-hidden="true">
      <svg viewBox="0 0 360 360" role="img" aria-labelledby={title}>
        <title id={title}>Decorative finance doodles</title>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="58" y="70" width="112" height="150" rx="14" stroke="#0f4c81" strokeWidth="7" />
          <path d="M84 104h58M84 136h58M84 168h26M126 168h16" stroke="#00b4d8" strokeWidth="6" />
          <path d="M214 230V126M258 230V92M302 230v-70" stroke="#0f4c81" strokeWidth="8" />
          <path d="M202 230h112" stroke="#ffc107" strokeWidth="7" />
          <path d="M204 152l52-54 48 42" stroke="#2ec4b6" strokeWidth="7" />
          <path d="M246 64l20 20 34-42" stroke="#ff6b6b" strokeWidth="7" />
          <circle cx="104" cy="266" r="24" stroke="#ffc107" strokeWidth="7" />
          <path d="M104 250v32M90 266h28" stroke="#0f4c81" strokeWidth="6" />
          <circle cx="310" cy="282" r="9" fill="#00b4d8" stroke="none" />
        </g>
      </svg>
    </div>
  );
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
          <div className="service-header-title-row">
            <div className="service-company-logo-wrap">
              <img
                src={company.logo || "/images/prime.jpg"}
                alt={`${company.name} logo`}
                className="service-company-logo"
              />
            </div>
            <div>
              <p className="service-company-label">{company.name}</p>
              <h1>{service.name}</h1>
            </div>
          </div>
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
        <DoodleArtwork companyId={companyId} variant="detail-left" />
        <DoodleArtwork companyId={companyId} variant="detail-right" />
        <DoodleArtwork companyId={companyId} variant="detail-bottom" />

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
