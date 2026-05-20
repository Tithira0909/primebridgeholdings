import React, { createContext, useState, useContext, useEffect } from 'react';
import { servicesData as initialData } from '../data';

const ServicesContext = createContext();

export const useServices = () => useContext(ServicesContext);

export const ServicesProvider = ({ children }) => {
  const [servicesData, setServicesData] = useState(() => {
    const savedData = localStorage.getItem('primebridge_services_data');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse saved services data");
      }
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem('primebridge_services_data', JSON.stringify(servicesData));
  }, [servicesData]);

  // Add a new sub-service to a company division
  const addService = (companyId, newService) => {
    setServicesData(prevData => prevData.map(company => {
      if (company.id === companyId) {
        return {
          ...company,
          services: [...company.services, { ...newService, id: Date.now().toString() }]
        };
      }
      return company;
    }));
  };

  // Delete a sub-service from a company division
  const deleteService = (companyId, serviceId) => {
    setServicesData(prevData => prevData.map(company => {
      if (company.id === companyId) {
        return {
          ...company,
          services: company.services.filter(service => service.id !== serviceId)
        };
      }
      return company;
    }));
  };

  // Update a sub-service
  const updateService = (companyId, serviceId, updatedFields) => {
    setServicesData(prevData => prevData.map(company => {
      if (company.id === companyId) {
        return {
          ...company,
          services: company.services.map(service => 
            service.id === serviceId ? { ...service, ...updatedFields } : service
          )
        };
      }
      return company;
    }));
  };

  return (
    <ServicesContext.Provider value={{ servicesData, addService, deleteService, updateService }}>
      {children}
    </ServicesContext.Provider>
  );
};
