import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { servicesData } from '../data';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import './Services.css';

const ServiceDetail = () => {
  const { companyId, serviceId } = useParams();
  const navigate = useNavigate();
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
        navigate('/services'); // redirect if not found
      }
    } else {
      navigate('/services');
    }
  }, [companyId, serviceId, navigate]);

  if (!service || !company) return null;

  return (
    <div className="service-detail-page animate-fade-in">
      <header className="page-header service-header">
        <div className="container">
          <Link to={`/services#${company.id}`} className="back-link">
            <ArrowLeft size={16} /> Back to {company.name}
          </Link>
          <h1>{service.name}</h1>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid grid-2 service-detail-content">
            <div className="service-text">
              <h2>About This Service</h2>
              <p className="service-lead">{service.desc}</p>
              
              <div className="service-features card">
                <h3>What's Included</h3>
                <ul className="feature-list">
                  <li><CheckCircle size={20} className="feature-icon" /> Professional Consultation</li>
                  <li><CheckCircle size={20} className="feature-icon" /> Dedicated Account Manager</li>
                  <li><CheckCircle size={20} className="feature-icon" /> Regular Progress Reports</li>
                  <li><CheckCircle size={20} className="feature-icon" /> Strategic Planning & Execution</li>
                </ul>
              </div>
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
                    .slice(0, 4) // Show up to 4 other services
                    .map(s => (
                      <li key={s.id}>
                        <Link to={`/services/${company.id}/${s.id}`}>{s.name}</Link>
                      </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
