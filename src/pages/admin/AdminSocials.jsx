import React, { useState, useEffect } from 'react';
import { useSocial } from '../../context/SocialContext';
import { Save, CheckCircle2, AlertCircle, MapPin, Phone as PhoneIcon, Mail } from 'lucide-react';
import './AdminSocials.css';

const Facebook = ({ size = 20, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 20, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = ({ size = 20, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const AdminSocials = () => {
  const { socialLinks, updateSocialLinks, loading } = useSocial();
  const [links, setLinks] = useState({ 
    facebook: '', 
    instagram: '', 
    linkedin: '',
    address: '',
    phone: '',
    email: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    if (socialLinks) {
      setLinks({
        facebook: socialLinks.facebook || '',
        instagram: socialLinks.instagram || '',
        linkedin: socialLinks.linkedin || '',
        address: socialLinks.address || '',
        phone: socialLinks.phone || '',
        email: socialLinks.email || ''
      });
    }
  }, [socialLinks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    const result = await updateSocialLinks(links);

    setIsSaving(false);
    if (result.success) {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 4000);
    } else {
      setSaveStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="admin-socials animate-fade-in">
        <div className="dashboard-header">
          <h1>Socials & Contacts CMS</h1>
        </div>
        <div className="dashboard-card text-center" style={{ padding: '3rem' }}>
          <p className="loading-text">Loading configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-socials animate-fade-in">
      <div className="dashboard-header">
        <h1>Socials & Contacts CMS</h1>
      </div>

      <div className="dashboard-card socials-card">
        <form onSubmit={handleSubmit} className="socials-form">
          <div className="cms-section-wrapper">
            <h2 className="cms-section-heading">Footer Social Links</h2>
            <p className="socials-desc">
              Configure the social media platform links displayed in your public website footer. Enter full URLs.
            </p>

            <div className="form-group-social">
              <label>
                <Facebook size={20} className="icon facebook-color" />
                <span>Facebook URL</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="url"
                  value={links.facebook}
                  onChange={e => setLinks({ ...links, facebook: e.target.value })}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
            </div>

            <div className="form-group-social">
              <label>
                <Instagram size={20} className="icon instagram-color" />
                <span>Instagram URL</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="url"
                  value={links.instagram}
                  onChange={e => setLinks({ ...links, instagram: e.target.value })}
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
            </div>

            <div className="form-group-social">
              <label>
                <Linkedin size={20} className="icon linkedin-color" />
                <span>LinkedIn URL</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="url"
                  value={links.linkedin}
                  onChange={e => setLinks({ ...links, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </div>
          </div>

          <div className="cms-section-wrapper" style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h2 className="cms-section-heading">Footer & Contact Details</h2>
            <p className="socials-desc">
              Configure the physical address, phone number, and support email displayed in your public website footer and contact page.
            </p>

            <div className="form-group-social">
              <label>
                <MapPin size={20} className="icon secondary-color" />
                <span>Corporate Address</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={links.address}
                  onChange={e => setLinks({ ...links, address: e.target.value })}
                  placeholder="123 Business Avenue, Colombo 03, Sri Lanka"
                  required
                />
              </div>
            </div>

            <div className="form-group-social">
              <label>
                <PhoneIcon size={20} className="icon secondary-color" />
                <span>Phone / Mobile No</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={links.phone}
                  onChange={e => setLinks({ ...links, phone: e.target.value })}
                  placeholder="+94 11 234 5678"
                  required
                />
              </div>
            </div>

            <div className="form-group-social">
              <label>
                <Mail size={20} className="icon secondary-color" />
                <span>Support Email</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  value={links.email}
                  onChange={e => setLinks({ ...links, email: e.target.value })}
                  placeholder="info@primebridgegroup.com"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions-social" style={{ marginTop: '2.5rem' }}>
            <button
              type="submit"
              disabled={isSaving}
              className={`btn btn-primary btn-save ${saveStatus === 'success' ? 'saved-success' : ''}`}
            >
              {isSaving ? (
                <span>Saving...</span>
              ) : saveStatus === 'success' ? (
                <>
                  <CheckCircle2 size={18} /> <span>Saved Successfully</span>
                </>
              ) : (
                <>
                  <Save size={18} /> <span>Save Socials & Contacts</span>
                </>
              )}
            </button>
          </div>
        </form>

        {saveStatus === 'error' && (
          <div className="status-banner error animate-fade-in">
            <AlertCircle size={18} />
            <span>Failed to save details. Please verify backend connection.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSocials;
