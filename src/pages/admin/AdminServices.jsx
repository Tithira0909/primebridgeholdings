import React, { useState } from 'react';
import { useServices } from '../../context/ServicesContext';
import { Trash2, Plus, X, Edit2 } from 'lucide-react';
import './AdminServices.css';

const AdminServices = () => {
  const { servicesData, addService, deleteService, updateService } = useServices();
  const [activeCompany, setActiveCompany] = useState(servicesData[0]?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentService, setCurrentService] = useState({ id: '', name: '', desc: '' });

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentService({ id: '', name: '', desc: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setModalMode('edit');
    setCurrentService(service);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentService.name && currentService.desc) {
      if (modalMode === 'add') {
        // Simple slugify for id
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
        <h2>{currentCompanyData?.name} - Services</h2>
        {currentCompanyData?.services.length === 0 ? (
          <p className="no-posts">No services found in this division.</p>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCompanyData?.services.map((service) => (
                  <tr key={service.id}>
                    <td><strong>{service.name}</strong></td>
                    <td>{service.desc}</td>
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
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h2>{modalMode === 'add' ? 'Add New Service' : 'Edit Service'}</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Service Name</label>
                <input 
                  type="text" 
                  value={currentService.name} 
                  onChange={e => setCurrentService({...currentService, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="4"
                  value={currentService.desc} 
                  onChange={e => setCurrentService({...currentService, desc: e.target.value})}
                  required 
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{modalMode === 'add' ? 'Add Service' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
