import React, { createContext, useContext, useState, useEffect } from 'react';

const SocialContext = createContext();

export const useSocial = () => useContext(SocialContext);

export const SocialProvider = ({ children }) => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://facebook.com/primebridge',
    instagram: 'https://instagram.com/primebridge',
    linkedin: 'https://linkedin.com/company/primebridge',
    address: '123 Business Avenue, Colombo 03, Sri Lanka',
    phone: '+94 11 234 5678',
    email: 'info@primebridgegroup.com'
  });
  const [loading, setLoading] = useState(true);

  const fetchSocials = async () => {
    try {
      const response = await fetch('/api/socials');
      if (response.ok) {
        const data = await response.json();
        // Fallback to seeded defaults if database value is empty
        setSocialLinks(prev => ({
          facebook: data.facebook !== undefined ? data.facebook : prev.facebook,
          instagram: data.instagram !== undefined ? data.instagram : prev.instagram,
          linkedin: data.linkedin !== undefined ? data.linkedin : prev.linkedin,
          address: data.address !== undefined ? data.address : prev.address,
          phone: data.phone !== undefined ? data.phone : prev.phone,
          email: data.email !== undefined ? data.email : prev.email
        }));
      }
    } catch (error) {
      console.error('Error fetching social links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const updateSocialLinks = async (newLinks) => {
    try {
      const response = await fetch('/api/socials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLinks)
      });
      if (response.ok) {
        setSocialLinks(newLinks);
        return { success: true };
      } else {
        const errData = await response.json();
        return { success: false, error: errData.error };
      }
    } catch (error) {
      console.error('Error updating social links:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  return (
    <SocialContext.Provider value={{ socialLinks, updateSocialLinks, loading, refreshSocials: fetchSocials }}>
      {children}
    </SocialContext.Provider>
  );
};
