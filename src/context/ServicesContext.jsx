import React, { createContext, useState, useContext, useEffect } from 'react';
import { servicesData as initialData } from '../data';

const ServicesContext = createContext();

export const useServices = () => useContext(ServicesContext);

const DATA_VERSION = '2.4.0';
const STORAGE_KEY = 'primebridge_services_data';
const VERSION_KEY = 'primebridge_services_version';

export const ServicesProvider = ({ children }) => {
  const [servicesData, setServicesData] = useState(() => {
    const savedVersion = localStorage.getItem(VERSION_KEY);

    // If the saved version doesn't match, discard cached data and use fresh initialData
    if (savedVersion !== DATA_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, DATA_VERSION);
      return initialData;
    }

    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error('Failed to parse saved services data — falling back to defaults');
      }
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(servicesData));
    localStorage.setItem(VERSION_KEY, DATA_VERSION);
  }, [servicesData]);

  // Add a new sub-service to a company division
  const addService = (companyId, newService) => {
    setServicesData(prevData =>
      prevData.map(company => {
        if (company.id === companyId) {
          return {
            ...company,
            services: [
              ...company.services,
              { ...newService, id: Date.now().toString() },
            ],
          };
        }
        return company;
      })
    );
  };

  // Delete a sub-service from a company division
  const deleteService = (companyId, serviceId) => {
    setServicesData(prevData =>
      prevData.map(company => {
        if (company.id === companyId) {
          return {
            ...company,
            services: company.services.filter(s => s.id !== serviceId),
          };
        }
        return company;
      })
    );
  };

  // Update a sub-service (merges updatedFields into existing service)
  const updateService = (companyId, serviceId, updatedFields) => {
    setServicesData(prevData =>
      prevData.map(company => {
        if (company.id === companyId) {
          return {
            ...company,
            services: company.services.map(service =>
              service.id === serviceId
                ? { ...service, ...updatedFields }
                : service
            ),
          };
        }
        return company;
      })
    );
  };

  return (
    <ServicesContext.Provider
      value={{ servicesData, addService, deleteService, updateService }}
    >
      {children}
    </ServicesContext.Provider>
  );
};