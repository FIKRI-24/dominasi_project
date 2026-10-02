import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('dominasi_auth_token'));
  const [loading, setLoading] = useState(true);

  // Verifikasi token saat inisialisasi aplikasi
  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.data);
        } else {
          // Token tidak valid/kedaluwarsa
          logout();
        }
      } catch (err) {
        console.warn('Gagal memverifikasi token:', err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  // Login
  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || 'Login gagal.');
    }

    localStorage.setItem('dominasi_auth_token', data.data.token);
    setToken(data.data.token);
    setUser(data.data.user);
    return data.data.user;
  };

  // Register
  const register = async (name, email, password) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || 'Registrasi gagal.');
    }

    localStorage.setItem('dominasi_auth_token', data.data.token);
    setToken(data.data.token);
    setUser(data.data.user);
    return data.data.user;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('dominasi_auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
