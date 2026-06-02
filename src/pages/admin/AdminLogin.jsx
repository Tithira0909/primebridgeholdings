import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [step, setStep] = useState('LOGIN'); // LOGIN | SETUP_2FA | VERIFY_2FA
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [totpToken, setTotpToken] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, setup2FA, verify2FA } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const { success, data } = await login(username, password);
    setLoading(false);
    
    if (success) {
      if (data.require2FA) {
        setStep('VERIFY_2FA');
      } else if (data.requireSetup2FA) {
        // Init setup 2FA
        setLoading(true);
        const setupRes = await setup2FA(username);
        setLoading(false);
        if (setupRes.success) {
          setQrCodeUrl(setupRes.data.qrCodeUrl);
          setStep('SETUP_2FA');
        } else {
          setError('Failed to initialize 2FA setup.');
        }
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      setError(data.error || 'Invalid credentials');
    }
  };

  const handleVerify2FASubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const { success, data } = await login(username, password, totpToken);
    setLoading(false);
    
    if (success && !data.require2FA) {
      navigate('/admin/dashboard');
    } else {
      setError(data.error || 'Invalid 2FA code');
    }
  };

  const handleSetup2FASubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const { success, data } = await verify2FA(username, totpToken);
    setLoading(false);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError(data.error || 'Invalid verification code. Try again.');
    }
  };

  return (
    <div className="admin-login-container animate-fade-in">
      <div className="admin-login-card">
        
        {step === 'LOGIN' && (
          <>
            <h2>Admin Login</h2>
            <p>Enter your credentials to access the CMS.</p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLoginSubmit} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Authenticating...' : 'Login'}
              </button>
            </form>
          </>
        )}

        {step === 'VERIFY_2FA' && (
          <>
            <h2>Two-Factor Auth</h2>
            <p>Enter the 6-digit code from your Authenticator app.</p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleVerify2FASubmit} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="totpToken">Authenticator Code</label>
                <input
                  type="text"
                  id="totpToken"
                  value={totpToken}
                  onChange={(e) => setTotpToken(e.target.value)}
                  placeholder="000000"
                  maxLength="6"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
              <button type="button" className="btn w-100 mt-2" onClick={() => setStep('LOGIN')} style={{ background: 'transparent', color: '#ccc', marginTop: '1rem', border: 'none' }}>
                Back to Login
              </button>
            </form>
          </>
        )}

        {step === 'SETUP_2FA' && (
          <>
            <h2>Setup Authenticator</h2>
            <p>Scan this QR code with Google Authenticator or Authy to secure your account.</p>
            {error && <div className="error-message">{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', background: '#fff', padding: '1rem', borderRadius: '8px' }}>
              <img src={qrCodeUrl} alt="2FA QR Code" style={{ width: '200px', height: '200px' }} />
            </div>
            <form onSubmit={handleSetup2FASubmit} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="setupToken">Enter Code to Verify</label>
                <input
                  type="text"
                  id="setupToken"
                  value={totpToken}
                  onChange={(e) => setTotpToken(e.target.value)}
                  placeholder="000000"
                  maxLength="6"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Enabling...' : 'Verify & Enable 2FA'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default AdminLogin;