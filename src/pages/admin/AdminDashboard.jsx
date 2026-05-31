import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Image, CreditCard } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-home animate-fade-in" data-lenis-prevent>
      <div className="dashboard-hero-card">
        <div className="dashboard-hero-bg"></div>
        <div className="dashboard-hero-content">
          <img src="/images/prime.jpg" alt="PrimeBridge Logo" className="dashboard-large-logo" />
          <h1>Welcome to PrimeBridge Portal</h1>
          <p>Manage your group's content, services, blog, and brand assets from one central hub.</p>
        </div>
      </div>

      <div className="dashboard-grid mt-3">
        <Link to="/admin/blog" className="dashboard-menu-card">
          <div className="card-icon"><FileText size={32} /></div>
          <h3>Blog CMS</h3>
          <p>Create, edit, and publish news, articles, and insights for the group.</p>
        </Link>

        <Link to="/admin/services" className="dashboard-menu-card">
          <div className="card-icon"><Briefcase size={32} /></div>
          <h3>Services CMS</h3>
          <p>Update packages, tier rates, and service inclusions across all divisions.</p>
        </Link>

        <Link to="/admin/hero" className="dashboard-menu-card">
          <div className="card-icon"><Image size={32} /></div>
          <h3>Hero Media CMS</h3>
          <p>Manage home page sliding images and brand presentation media.</p>
        </Link>

        <Link to="/admin/transactions" className="dashboard-menu-card">
            <div className="card-icon"><CreditCard size={32} /></div>
            <h3>Transactions</h3>
            <p>View payment history, revenue summary, and transaction statuses.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
