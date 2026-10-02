import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faSignInAlt,
  faUserPlus,
  faEnvelope,
  faLock,
  faUser,
  faCheckCircle,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose, onSuccess, initialMode = 'login', message }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          throw new Error('Konfirmasi kata sandi tidak cocok.');
        }
        if (password.length < 6) {
          throw new Error('Kata sandi minimal 6 karakter.');
        }
        const loggedUser = await register(name, email, password);
        if (onSuccess) onSuccess(loggedUser);
        onClose();
      } else {
        const loggedUser = await login(email, password);
        if (onSuccess) onSuccess(loggedUser);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px 10px 38px',
    borderRadius: '8px',
    border: '1.5px solid #cbd5e1',
    background: '#ffffff',
    color: '#0f172a',
    fontSize: '0.92rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '6px'
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#fafbfc'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#eff6ff',
                color: '#1e40af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14
              }}
            >
              <FontAwesomeIcon icon={faShieldAlt} />
            </div>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
              Autentikasi Akun Belajar
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '1.1rem',
              padding: '4px'
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {message && (
            <div
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '18px',
                fontSize: '0.85rem',
                color: '#1e40af',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                lineHeight: 1.45
              }}
            >
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginTop: 2, flexShrink: 0 }} />
              <span>{message}</span>
            </div>
          )}

          {/* Toggle Tabs */}
          <div
            style={{
              display: 'flex',
              background: '#f1f5f9',
              borderRadius: '8px',
              padding: '4px',
              marginBottom: '20px'
            }}
          >
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: '6px',
                background: mode === 'login' ? '#ffffff' : 'transparent',
                color: mode === 'login' ? '#1e40af' : '#64748b',
                fontWeight: mode === 'login' ? 700 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: mode === 'login' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: 6 }} />
              Masuk
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); }}
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                borderRadius: '6px',
                background: mode === 'register' ? '#ffffff' : 'transparent',
                color: mode === 'register' ? '#1e40af' : '#64748b',
                fontWeight: mode === 'register' ? 700 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: mode === 'register' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 6 }} />
              Daftar Baru
            </button>
          </div>

          {error && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '10px 14px',
                marginBottom: '16px',
                fontSize: '0.85rem',
                color: '#b91c1c'
              }}
            >
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div style={{ marginBottom: '14px', position: 'relative' }}>
                <label style={labelStyle}>Nama Lengkap / Panggilan *</label>
                <div style={{ position: 'relative' }}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8', fontSize: 14 }}
                  />
                  <input
                    type="text"
                    required
                    style={inputStyle}
                    placeholder="Contoh: Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div style={{ marginBottom: '14px', position: 'relative' }}>
              <label style={labelStyle}>Alamat Email *</label>
              <div style={{ position: 'relative' }}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8', fontSize: 14 }}
                />
                <input
                  type="email"
                  required
                  style={inputStyle}
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginBottom: mode === 'register' ? '14px' : '20px', position: 'relative' }}>
              <label style={labelStyle}>Kata Sandi *</label>
              <div style={{ position: 'relative' }}>
                <FontAwesomeIcon
                  icon={faLock}
                  style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8', fontSize: 14 }}
                />
                <input
                  type="password"
                  required
                  style={inputStyle}
                  placeholder={mode === 'register' ? 'Minimal 6 karakter' : 'Masukkan kata sandi'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {mode === 'register' && (
              <div style={{ marginBottom: '20px', position: 'relative' }}>
                <label style={labelStyle}>Konfirmasi Kata Sandi *</label>
                <div style={{ position: 'relative' }}>
                  <FontAwesomeIcon
                    icon={faLock}
                    style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8', fontSize: 14 }}
                  />
                  <input
                    type="password"
                    required
                    style={inputStyle}
                    placeholder="Ulangi kata sandi"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '8px',
                border: 'none',
                background: '#1e40af',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 4px rgba(30, 64, 175, 0.25)',
                transition: 'background 0.15s ease'
              }}
            >
              {loading
                ? '⏳ Memproses...'
                : mode === 'register'
                ? 'Daftar & Mulai Belajar'
                : 'Masuk Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
