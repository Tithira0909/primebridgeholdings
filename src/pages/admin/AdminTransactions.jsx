import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import './AdminTransactions.css';

const statusConfig = {
  success: { label: 'Success', icon: <CheckCircle size={14} />, className: 'status-success' },
  failed:  { label: 'Failed',  icon: <XCircle size={14} />,    className: 'status-failed'  },
  pending: { label: 'Pending', icon: <Clock size={14} />,      className: 'status-pending' },
};

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTransactions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/payment/transactions');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const totalSuccess = transactions.filter(t => t.status === 'success').length;
  const totalRevenue = transactions
    .filter(t => t.status === 'success')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <div className="admin-transactions animate-fade-in">
      <div className="dashboard-header">
        <h1>Transaction History</h1>
        <button className="btn btn-outline" onClick={fetchTransactions} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'spinning' : ''} /> Refresh
        </button>
      </div>

      <div className="txn-summary-grid">
        <div className="txn-summary-card">
          <span className="txn-summary-label">Total Transactions</span>
          <span className="txn-summary-value">{transactions.length}</span>
        </div>
        <div className="txn-summary-card">
          <span className="txn-summary-label">Successful</span>
          <span className="txn-summary-value success-color">{totalSuccess}</span>
        </div>
        <div className="txn-summary-card">
          <span className="txn-summary-label">Total Revenue</span>
          <span className="txn-summary-value">LKR {totalRevenue.toLocaleString('en-LK', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="txn-summary-card">
          <span className="txn-summary-label">Pending</span>
          <span className="txn-summary-value pending-color">{transactions.filter(t => t.status === 'pending').length}</span>
        </div>
      </div>

      <div className="dashboard-card">
        <h2>All Payments</h2>
        {error && <p className="txn-error">{error}</p>}
        {loading ? (
          <p className="txn-loading">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <div className="txn-empty">
            <Clock size={40} />
            <p>No transactions yet.</p>
            <span>Payments will appear here after the first transaction.</span>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Amount (LKR)</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(txn => {
                  const s = statusConfig[txn.status] || statusConfig.pending;
                  return (
                    <tr key={txn.id}>
                      <td><code className="txn-order-id">{txn.order_id}</code></td>
                      <td>{txn.customer_name || '—'}</td>
                      <td>{txn.customer_email || '—'}</td>
                      <td>{txn.customer_phone || '—'}</td>
                      <td className="txn-amount">
                        {Number(txn.amount).toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                      </td>
                      <td>
                        <span className={`txn-status-badge ${s.className}`}>
                          {s.icon} {s.label}
                        </span>
                      </td>
                      <td className="txn-date">{txn.created_at ? txn.created_at.split('T')[0] : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTransactions;