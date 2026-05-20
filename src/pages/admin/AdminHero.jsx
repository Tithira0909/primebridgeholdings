import React, { useRef, useState } from 'react';
import { useHero } from '../../context/HeroContext';
import { Upload, Trash2, CheckCircle, Image as ImageIcon } from 'lucide-react';
import './AdminHero.css';

const AdminHero = () => {
  const { heroImages, activeImageId, addImage, deleteImage, setActiveImageId } = useHero();
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit for local storage warning
      setError('File size too large. Please select an image under 2MB for the prototype.');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      // Create a compressed version via canvas if we wanted to get fancy, 
      // but for now just use the raw base64.
      addImage(reader.result, file.name);
    };
    reader.readAsDataURL(file);
    
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="admin-hero animate-fade-in">
      <div className="dashboard-header">
        <h1>Hero Media Management</h1>
        <div>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            style={{ display: 'none' }} 
          />
          <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
            <Upload size={18} /> Upload Image
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-card">
        <h2>Image Gallery</h2>
        <p className="hero-desc">Select an image to set it as the active background on the public homepage.</p>
        
        {heroImages.length === 0 ? (
          <div className="empty-state">
            <ImageIcon size={48} className="empty-icon" />
            <p>No custom hero images uploaded yet.</p>
            <p className="small-text">The default theme background is currently in use.</p>
          </div>
        ) : (
          <div className="hero-gallery">
            {heroImages.map(img => (
              <div className={`hero-card ${activeImageId === img.id ? 'active-card' : ''}`} key={img.id}>
                <div className="hero-img-preview" style={{ backgroundImage: `url(${img.data})` }}>
                  {activeImageId === img.id && (
                    <div className="active-badge">
                      <CheckCircle size={16} /> Active
                    </div>
                  )}
                </div>
                <div className="hero-card-details">
                  <span className="hero-filename" title={img.name}>{img.name}</span>
                  <div className="hero-card-actions">
                    {activeImageId !== img.id && (
                      <button className="btn btn-outline small-btn" onClick={() => setActiveImageId(img.id)}>
                        Set Active
                      </button>
                    )}
                    <button className="btn-icon delete" onClick={() => deleteImage(img.id)} title="Delete Image">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHero;
