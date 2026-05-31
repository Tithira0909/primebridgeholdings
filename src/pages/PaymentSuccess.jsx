import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-alt)', padding: '2rem' }}>
    <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', maxWidth: '480px', width: '100%', textAlign: 'center', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <CheckCircle size={40} color="#10b981" />
      </div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>Payment Successful</h1>
      <p style={{ color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '2rem' }}>
        Thank you for your payment. We have received your transaction and will follow up with a confirmation shortly.
      </p>
      <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>Return to Home</Link>
    </div>
  </div>
);

export default PaymentSuccess;