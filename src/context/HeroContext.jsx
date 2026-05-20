import React, { createContext, useState, useContext, useEffect } from 'react';

const HeroContext = createContext();

export const useHero = () => useContext(HeroContext);

export const HeroProvider = ({ children }) => {
  const [heroImages, setHeroImages] = useState(() => {
    const saved = localStorage.getItem('primebridge_hero_images');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeImageId, setActiveImageId] = useState(() => {
    const saved = localStorage.getItem('primebridge_active_hero');
    return saved ? saved : null;
  });

  useEffect(() => {
    localStorage.setItem('primebridge_hero_images', JSON.stringify(heroImages));
  }, [heroImages]);

  useEffect(() => {
    if (activeImageId) {
      localStorage.setItem('primebridge_active_hero', activeImageId);
    } else {
      localStorage.removeItem('primebridge_active_hero');
    }
  }, [activeImageId]);

  const addImage = (base64Data, fileName) => {
    const newImage = {
      id: Date.now().toString(),
      data: base64Data,
      name: fileName,
      dateAdded: new Date().toLocaleDateString()
    };
    setHeroImages(prev => [newImage, ...prev]);
    // Automatically set as active if it's the first one
    if (heroImages.length === 0) {
      setActiveImageId(newImage.id);
    }
  };

  const deleteImage = (id) => {
    setHeroImages(prev => prev.filter(img => img.id !== id));
    if (activeImageId === id) {
      setActiveImageId(null);
    }
  };

  const activeImageData = heroImages.find(img => img.id === activeImageId)?.data || null;

  return (
    <HeroContext.Provider value={{ heroImages, activeImageId, activeImageData, addImage, deleteImage, setActiveImageId }}>
      {children}
    </HeroContext.Provider>
  );
};
