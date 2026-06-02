import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('isAdmin');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password, totpToken = null) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, totpToken })
      });
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('isAdmin', 'true');
        if (data.token) sessionStorage.setItem('token', data.token);
      }
      return { success: response.ok, data };
    } catch (err) {
      return { success: false, data: { error: 'Network error' } };
    }
  };

  const setup2FA = async (username) => {
    try {
      const response = await fetch('/api/auth/setup-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      return { success: response.ok, data: await response.json() };
    } catch (err) {
      return { success: false, data: { error: 'Network error' } };
    }
  };

  const verify2FA = async (username, totpToken) => {
    try {
      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, totpToken })
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('isAdmin', 'true');
        if (data.token) sessionStorage.setItem('token', data.token);
      }
      return { success: response.ok, data };
    } catch (err) {
      return { success: false, data: { error: 'Network error' } };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, setup2FA, verify2FA, logout }}>
      {children}
    </AuthContext.Provider>
  );
};