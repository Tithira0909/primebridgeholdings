import React, { useState } from 'react';
import { useServices } from '../../context/ServicesContext';
import { Trash2, Plus, X, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import './AdminServices.css';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PRICING_TYPE_LABELS = {
  starting: 'Starting From',
  tiered: 'Tiered (e.g. Retainer / Scenario)',
  categories: 'Categories (e.g. Individual / Corporate)',
  packages: 'Packages (e.g. Social Media)',
  'recruitment-tiers': 'Recruitment Tiers',
  dm: 'DM / Contact for Quote',
};

const pricingBadgeText = (service) => {
  switch (service.pricingType) {
    case 'starting':        return `From ${service.startingFrom}`;
    case 'packages':        return `${service.packages?.length || 0} packages`;
    case 'recruitment-tiers': return `${service.recruitmentTiers?.length || 0} tiers`;
    case 'categories':      return `${service.categories?.length || 0} categories`;
    case 'tiered':          return `${service.pricingTiers?.length || 0} options`;
    case 'dm':              return 'Quote on request';
    default:                return '—';
  }
};

// ─── Pricing sub-editors ──────────────────────────────────────────────────────

/** Starting From editor */
const StartingEditor = ({ service, onChange }) => (
  <div className="pricing-editor-section">
    <div className="form-row-2">
      <div className="form-group">
        <label>Starting Price</label>
        <input
          type="text"
          value={service.startingFrom || ''}
          onChange={e => onChange({ startingFrom: e.target.value })}
          placeholder="e.g. LKR 20,000"
        />
      </div>
      <div className="form-group">
        <label>Period</label>
        <input
          type="text"
          value={service.pricingNote || ''}
          onChange={e => onChange({ pricingNote: e.target.value })}
          placeholder="e.g. per month"
        />
      </div>
    </div>
    <div className="form-group">
      <label>Additional Note <span className="label-optional">(optional)</span></label>
      <input
        type="text"
        value={service.pricingDetails || ''}
        onChange={e => onChange({ pricingDetails: e.target.value })}
        placeholder="e.g. Terms & Conditions apply"
      />
    </div>
  </div>
);

/** DM editor */
const DMEditor = ({ service, onChange }) => (
  <div className="pricing-editor-section">
    <div className="form-group">
      <label>DM / Quote Message</label>
      <input
        type="text"
        value={service.dmText || ''}
        onChange={e => onChange({ dmText: e.target.value })}
        placeholder="e.g. DM us with your requirements for a custom quote."
      />
    </div>
  </div>
);

/** Categories editor (Individual/Corporate Tax) */
const CategoriesEditor = ({ service, onChange }) => {
  const cats = service.categories || [];
  const update = (index, field, value) => {
    const updated = cats.map((c, i) => i === index ? { ...c, [field]: value } : c);
    onChange({ categories: updated });
  };
  const add = () => onChange({ categories: [...cats, { label: '', price: '', period: 'per annum' }] });
  const remove = (index) => onChange({ categories: cats.filter((_, i) => i !== index) });

  return (
    <div className="pricing-editor-section">
      <div className="editor-list-header">
        <span className="editor-list-title">Categories</span>
        <button type="button" className="btn-add-row" onClick={add}><Plus size={14} /> Add Category</button>
      </div>
      {cats.map((cat, i) => (
        <div key={i} className="editor-row">
          <div className="form-row-3">
            <div className="form-group">
              <label>Label</label>
              <input type="text" value={cat.label} onChange={e => update(i, 'label', e.target.value)} placeholder="e.g. Corporate Employees" />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" value={cat.price} onChange={e => update(i, 'price', e.target.value)} placeholder="e.g. LKR 10,000" />
            </div>
            <div className="form-group">
              <label>Period</label>
              <input type="text" value={cat.period} onChange={e => update(i, 'period', e.target.value)} placeholder="e.g. per annum" />
            </div>
          </div>
          <button type="button" className="btn-remove-row" onClick={() => remove(i)}><X size={14} /></button>
        </div>
      ))}
    </div>
  );
};

/** Tiered simple editor (Advisory) */
const TieredEditor = ({ service, onChange }) => {
  const tiers = service.pricingTiers || [];
  const update = (index, field, value) => {
    const updated = tiers.map((t, i) => i === index ? { ...t, [field]: value } : t);
    onChange({ pricingTiers: updated });
  };
  const add = () => onChange({ pricingTiers: [...tiers, { label: '', price: '', period: '', note: '', isDM: false }] });
  const remove = (index) => onChange({ pricingTiers: tiers.filter((_, i) => i !== index) });

  return (
    <div className="pricing-editor-section">
      <div className="editor-list-header">
        <span className="editor-list-title">Pricing Options</span>
        <button type="button" className="btn-add-row" onClick={add}><Plus size={14} /> Add Option</button>
      </div>
      {tiers.map((tier, i) => (
        <div key={i} className="editor-row">
          <div className="form-row-2">
            <div className="form-group">
              <label>Label</label>
              <input type="text" value={tier.label} onChange={e => update(i, 'label', e.target.value)} placeholder="e.g. Retainer Basis" />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" value={tier.price} onChange={e => update(i, 'price', e.target.value)} placeholder="e.g. LKR 8,000" />
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Period</label>
              <input type="text" value={tier.period || ''} onChange={e => update(i, 'period', e.target.value)} placeholder="e.g. per month" />
            </div>
            <div className="form-group">
              <label>Note</label>
              <input type="text" value={tier.note || ''} onChange={e => update(i, 'note', e.target.value)} placeholder="e.g. Ongoing monthly retainer" />
            </div>
          </div>
          <label className="checkbox-label">
            <input type="checkbox" checked={tier.isDM || false} onChange={e => update(i, 'isDM', e.target.checked)} />
            Mark as "quote on request"
          </label>
          <button type="button" className="btn-remove-row" onClick={() => remove(i)}><X size={14} /></button>
        </div>
      ))}
    </div>
  );
};

/** Packages editor (Social Media) */
const PackagesEditor = ({ service, onChange }) => {
  const pkgs = service.packages || [];
  const [expanded, setExpanded] = useState(0);

  const updatePkg = (index, field, value) => {
    const updated = pkgs.map((p, i) => i === index ? { ...p, [field]: value } : p);
    onChange({ packages: updated });
  };
  const updateFeature = (pkgIndex, featIndex, value) => {
    const updated = pkgs.map((p, i) => {
      if (i !== pkgIndex) return p;
      const features = p.features.map((f, j) => j === featIndex ? value : f);
      return { ...p, features };
    });
    onChange({ packages: updated });
  };
  const addFeature = (pkgIndex) => {
    const updated = pkgs.map((p, i) => i === pkgIndex ? { ...p, features: [...p.features, ''] } : p);
    onChange({ packages: updated });
  };
  const removeFeature = (pkgIndex, featIndex) => {
    const updated = pkgs.map((p, i) => {
      if (i !== pkgIndex) return p;
      return { ...p, features: p.features.filter((_, j) => j !== featIndex) };
    });
    onChange({ packages: updated });
  };
  const addPkg = () => onChange({ packages: [...pkgs, { name: '', price: '', period: 'per month', highlight: false, features: [''] }] });
  const removePkg = (index) => onChange({ packages: pkgs.filter((_, i) => i !== index) });

  // Addons
  const addons = service.addons || [];
  const updateAddon = (index, field, value) => {
    const updated = addons.map((a, i) => i === index ? { ...a, [field]: value } : a);
    onChange({ addons: updated });
  };
  const addAddon = () => onChange({ addons: [...addons, { label: '', price: '' }] });
  const removeAddon = (index) => onChange({ addons: addons.filter((_, i) => i !== index) });

  return (
    <div className="pricing-editor-section">
      <div className="editor-list-header">
        <span className="editor-list-title">Packages</span>
        <button type="button" className="btn-add-row" onClick={addPkg}><Plus size={14} /> Add Package</button>
      </div>
      {pkgs.map((pkg, i) => (
        <div key={i} className="editor-accordion">
          <div className="accordion-header" onClick={() => setExpanded(expanded === i ? -1 : i)}>
            <span>{pkg.name || `Package ${i + 1}`} — {pkg.price || 'No price set'}</span>
            <div className="accordion-actions">
              {expanded === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              <button type="button" className="btn-remove-row inline" onClick={(e) => { e.stopPropagation(); removePkg(i); }}><X size={14} /></button>
            </div>
          </div>
          {expanded === i && (
            <div className="accordion-body">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Package Name</label>
                  <input type="text" value={pkg.name} onChange={e => updatePkg(i, 'name', e.target.value)} placeholder="e.g. Starter" />
                </div>
                <div className="form-group">
                  <label>Badge <span className="label-optional">(optional)</span></label>
                  <input type="text" value={pkg.badge || ''} onChange={e => updatePkg(i, 'badge', e.target.value)} placeholder="e.g. Most Popular" />
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" value={pkg.price} onChange={e => updatePkg(i, 'price', e.target.value)} placeholder="e.g. LKR 30,000" />
                </div>
                <div className="form-group">
                  <label>Period</label>
                  <input type="text" value={pkg.period || ''} onChange={e => updatePkg(i, 'period', e.target.value)} placeholder="e.g. per month" />
                </div>
              </div>
              <label className="checkbox-label">
                <input type="checkbox" checked={pkg.highlight || false} onChange={e => updatePkg(i, 'highlight', e.target.checked)} />
                Highlight this package (featured style)
              </label>
              <div className="editor-list-header" style={{ marginTop: '1rem' }}>
                <span className="editor-list-title">Features</span>
                <button type="button" className="btn-add-row" onClick={() => addFeature(i)}><Plus size={14} /> Add Feature</button>
              </div>
              {pkg.features?.map((feat, j) => (
                <div key={j} className="feature-row">
                  <input type="text" value={feat} onChange={e => updateFeature(i, j, e.target.value)} placeholder="e.g. 6 Posts per month" />
                  <button type="button" className="btn-remove-row inline" onClick={() => removeFeature(i, j)}><X size={14} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="editor-list-header" style={{ marginTop: '1.5rem' }}>
        <span className="editor-list-title">Add-On Rates</span>
        <button type="button" className="btn-add-row" onClick={addAddon}><Plus size={14} /> Add Add-On</button>
      </div>
      {addons.map((addon, i) => (
        <div key={i} className="editor-row">
          <div className="form-row-2">
            <div className="form-group">
              <label>Label</label>
              <input type="text" value={addon.label} onChange={e => updateAddon(i, 'label', e.target.value)} placeholder="e.g. Additional Static Post" />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" value={addon.price} onChange={e => updateAddon(i, 'price', e.target.value)} placeholder="e.g. LKR 3,500" />
            </div>
          </div>
          <button type="button" className="btn-remove-row" onClick={() => removeAddon(i)}><X size={14} /></button>
        </div>
      ))}
    </div>
  );
};

/** Recruitment Tiers editor */
const RecruitmentEditor = ({ service, onChange }) => {
  const tiers = service.recruitmentTiers || [];
  const [expanded, setExpanded] = useState(0);

  const update = (index, field, value) => {
    const updated = tiers.map((t, i) => i === index ? { ...t, [field]: value } : t);
    onChange({ recruitmentTiers: updated });
  };
  const add = () => onChange({
    recruitmentTiers: [...tiers, { tier: `Tier ${tiers.length + 1}`, label: '', description: '', fee: '', feeType: '', guarantee: '', highlight: false }]
  });
  const remove = (index) => onChange({ recruitmentTiers: tiers.filter((_, i) => i !== index) });

  return (
    <div className="pricing-editor-section">
      <div className="editor-list-header">
        <span className="editor-list-title">Recruitment Tiers</span>
        <button type="button" className="btn-add-row" onClick={add}><Plus size={14} /> Add Tier</button>
      </div>
      {tiers.map((tier, i) => (
        <div key={i} className="editor-accordion">
          <div className="accordion-header" onClick={() => setExpanded(expanded === i ? -1 : i)}>
            <span>{tier.tier} — {tier.label || 'Unnamed'}</span>
            <div className="accordion-actions">
              {expanded === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              <button type="button" className="btn-remove-row inline" onClick={(e) => { e.stopPropagation(); remove(i); }}><X size={14} /></button>
            </div>
          </div>
          {expanded === i && (
            <div className="accordion-body">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Tier Label</label>
                  <input type="text" value={tier.tier} onChange={e => update(i, 'tier', e.target.value)} placeholder="e.g. Tier 1" />
                </div>
                <div className="form-group">
                  <label>Role Category</label>
                  <input type="text" value={tier.label} onChange={e => update(i, 'label', e.target.value)} placeholder="e.g. Operational & Non-Executive" />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" value={tier.description} onChange={e => update(i, 'description', e.target.value)} placeholder="e.g. Administrative, clerical, junior roles" />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Fee</label>
                  <input type="text" value={tier.fee} onChange={e => update(i, 'fee', e.target.value)} placeholder="e.g. LKR 30,000 or 5%" />
                </div>
                <div className="form-group">
                  <label>Fee Type</label>
                  <input type="text" value={tier.feeType} onChange={e => update(i, 'feeType', e.target.value)} placeholder="e.g. Fixed fee per placement" />
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Guarantee</label>
                  <input type="text" value={tier.guarantee} onChange={e => update(i, 'guarantee', e.target.value)} placeholder="e.g. 30-day replacement guarantee" />
                </div>
                <div className="form-group">
                  <label>Badge <span className="label-optional">(optional)</span></label>
                  <input type="text" value={tier.badge || ''} onChange={e => update(i, 'badge', e.target.value)} placeholder="e.g. Most Requested" />
                </div>
              </div>
              <label className="checkbox-label">
                <input type="checkbox" checked={tier.highlight || false} onChange={e => update(i, 'highlight', e.target.checked)} />
                Highlight this tier (featured style)
              </label>
            </div>
          )}
        </div>
      ))}

      <div className="form-group" style={{ marginTop: '1.5rem' }}>
        <label>Payment Note</label>
        <textarea rows="2" value={service.paymentNote || ''} onChange={e => onChange({ paymentNote: e.target.value })} placeholder="e.g. Fees are earned upon candidate's written acceptance..." />
      </div>
      <div className="form-group">
        <label>Cancellation Note</label>
        <textarea rows="2" value={service.cancellationNote || ''} onChange={e => onChange({ cancellationNote: e.target.value })} placeholder="e.g. Role cancellation fee applies if..." />
      </div>
      <div className="form-group">
        <label>Guarantee Disclaimer</label>
        <textarea rows="3" value={service.guaranteeDisclaimer || ''} onChange={e => onChange({ guaranteeDisclaimer: e.target.value })} placeholder="e.g. The replacement guarantee shall not apply where..." />
      </div>
    </div>
  );
};

// ─── Pricing type router ──────────────────────────────────────────────────────

const PricingEditor = ({ service, onChange }) => {
  switch (service.pricingType) {
    case 'starting':          return <StartingEditor service={service} onChange={onChange} />;
    case 'dm':                return <DMEditor service={service} onChange={onChange} />;
    case 'categories':        return <CategoriesEditor service={service} onChange={onChange} />;
    case 'tiered':            return <TieredEditor service={service} onChange={onChange} />;
    case 'packages':          return <PackagesEditor service={service} onChange={onChange} />;
    case 'recruitment-tiers': return <RecruitmentEditor service={service} onChange={onChange} />;
    default:                  return null;
  }
};

// ─── Main Component ───────────────────────────────────────────────────────────

const AdminServices = () => {
  const { servicesData, addService, deleteService, updateService } = useServices();
  const [activeCompany, setActiveCompany] = useState(servicesData[0]?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentService, setCurrentService] = useState({ id: '', name: '', desc: '', pricingType: 'dm', dmText: '' });

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentService({ id: '', name: '', desc: '', pricingType: 'dm', dmText: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setModalMode('edit');
    setCurrentService({ ...service });
    setIsModalOpen(true);
  };

  const handlePricingChange = (updates) => {
    setCurrentService(prev => ({ ...prev, ...updates }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentService.name && currentService.desc) {
      if (modalMode === 'add') {
        const newId = currentService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        addService(activeCompany, { ...currentService, id: newId });
      } else {
        updateService(activeCompany, currentService.id, currentService);
      }
      setIsModalOpen(false);
    }
  };

  const currentCompanyData = servicesData.find(c => c.id === activeCompany);

  return (
    <div className="admin-services animate-fade-in">
      <div className="dashboard-header">
        <h1>Services Management</h1>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} /> Add Sub-Service
        </button>
      </div>

      <div className="company-tabs">
        {servicesData.map(company => (
          <button
            key={company.id}
            className={`tab-btn ${activeCompany === company.id ? 'active' : ''}`}
            onClick={() => setActiveCompany(company.id)}
          >
            {company.name}
          </button>
        ))}
      </div>

      <div className="dashboard-card">
        <h2>{currentCompanyData?.name} — Services</h2>
        {currentCompanyData?.services.length === 0 ? (
          <p className="no-posts">No services found in this division.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Pricing</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCompanyData?.services.map((service) => (
                  <tr key={service.id}>
                    <td><strong>{service.name}</strong></td>
                    <td>{service.desc}</td>
                    <td>
                      <span className="badge pricing-type-badge">
                        {PRICING_TYPE_LABELS[service.pricingType] || '—'}
                      </span>
                      <span className="pricing-summary">{pricingBadgeText(service)}</span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-icon edit" onClick={() => handleOpenEdit(service)} title="Edit Service">
                          <Edit2 size={18} />
                        </button>
                        <button className="btn-icon delete" onClick={() => deleteService(activeCompany, service.id)} title="Delete Service">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in modal-wide">
            <div className="modal-header">
              <h2>{modalMode === 'add' ? 'Add New Service' : `Edit — ${currentService.name}`}</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              {/* ── Core fields ── */}
              <div className="modal-section">
                <h3 className="modal-section-title">Service Details</h3>
                <div className="form-group">
                  <label>Service Name</label>
                  <input
                    type="text"
                    value={currentService.name}
                    onChange={e => setCurrentService({ ...currentService, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    rows="3"
                    value={currentService.desc}
                    onChange={e => setCurrentService({ ...currentService, desc: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* ── Pricing type selector ── */}
              <div className="modal-section">
                <h3 className="modal-section-title">Pricing</h3>
                <div className="form-group">
                  <label>Pricing Type</label>
                  <select
                    value={currentService.pricingType || 'dm'}
                    onChange={e => setCurrentService({ ...currentService, pricingType: e.target.value })}
                  >
                    {Object.entries(PRICING_TYPE_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <PricingEditor service={currentService} onChange={handlePricingChange} />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {modalMode === 'add' ? 'Add Service' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;