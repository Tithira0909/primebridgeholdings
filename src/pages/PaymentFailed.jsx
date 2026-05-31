import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentFailed = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-alt)', padding: '2rem' }}>
    <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', maxWidth: '480px', width: '100%', textAlign: 'center', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255, 107, 107, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <XCircle size={40} color="#ff6b6b" />
      </div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>Payment Failed</h1>
      <p style={{ color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '2rem' }}>
        Your payment could not be completed. No charges have been made. Please try again or contact us directly.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-outline">Return to Home</Link>
        <Link to="/contact" className="btn btn-primary">Contact Us</Link>
      </div>
    </div>
  </div>
);

export default PaymentFailed;