import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Globe, FileText, Briefcase, Image, CreditCard } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {isAuthenticated && (
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h2>Admin Portal</h2>
          </div>
          <nav className="admin-sidebar-nav">
            <Link to="/admin/dashboard" className="admin-nav-link">
              <LayoutDashboard size={20} /> Dashboard Home
            </Link>
            <Link to="/admin/blog" className="admin-nav-link">
              <FileText size={20} /> Blog CMS
            </Link>
            <Link to="/admin/services" className="admin-nav-link">
              <Briefcase size={20} /> Services CMS
            </Link>
            <Link to="/admin/hero" className="admin-nav-link">
              <Image size={20} /> Hero Media CMS
            </Link>
            <Link to="/admin/transactions" className="admin-nav-link">
              <CreditCard size={20} /> Transactions
            </Link>
            <Link to="/" className="admin-nav-link">
              <Globe size={20} /> View Site
            </Link>
            <button onClick={handleLogout} className="admin-nav-link logout-btn">
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </aside>
      )}
      <main className="admin-main-content" data-lenis-prevent>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
