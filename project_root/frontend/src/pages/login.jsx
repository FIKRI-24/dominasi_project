// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './assets/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pesan, setPesan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPesan('');

    try {
      const res = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      }, {
        withCredentials: true 
      });

      setPesan(res.data.message || 'Login berhasil');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      if (!err.response) {
        // Server backend tidak aktif (mode offline/demo)
        setPesan('Fitur Demo: Server akun belum dihubungkan. Anda tetap dapat menjelajahi seluruh materi, contoh, dan lab graf secara bebas.');
      } else {
        setPesan(err.response?.data?.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />

      <div style={{
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '36px 40px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: `
          0 32px 64px rgba(30, 64, 175, 0.3),
          0 16px 32px rgba(55, 48, 163, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.8)
        `,
        border: '1px solid rgba(255, 255, 255, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Card shine effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          transform: 'skewX(-25deg)',
          animation: 'shine 3s ease-in-out infinite'
        }} />

        {/* Back Link */}
        <div style={{ marginBottom: '16px' }}>
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#1e40af',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}>
            ← Kembali ke Beranda
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            borderRadius: '16px',
            margin: '0 auto 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(30, 64, 175, 0.35)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" fill="white"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" fill="white"/>
            </svg>
          </div>
          <h2 style={{
            margin: 0,
            fontSize: '26px',
            fontWeight: '700',
            color: '#0f172a',
            letterSpacing: '-0.5px'
          }}>
            Masuk ke Akun
          </h2>
          <p style={{
            margin: '6px 0 0',
            color: '#64748b',
            fontSize: '14px'
          }}>
            Masuk untuk mengakses materi dan melacak kemajuan latihan Anda
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#334155'
            }}>
              Alamat Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                fontSize: '15px',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1e40af';
                e.target.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#334155'
            }}>
              Kata Sandi
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1.5px solid #cbd5e1',
                borderRadius: '10px',
                fontSize: '15px',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1e40af';
                e.target.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '13px',
              background: isLoading 
                ? 'linear-gradient(135deg, #94a3b8, #64748b)' 
                : 'linear-gradient(135deg, #1e40af, #2563eb)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isLoading 
                ? 'none' 
                : '0 6px 20px rgba(30, 64, 175, 0.35)',
              transform: isLoading ? 'none' : 'translateY(0)',
              marginTop: '4px'
            }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Sedang Masuk...
              </span>
            ) : (
              'Masuk Sekarang'
            )}
          </button>

          {pesan && (
            <div style={{
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              lineHeight: '1.5',
              textAlign: 'center',
              backgroundColor: pesan.includes('berhasil') || pesan.includes('success') 
                ? 'rgba(16, 185, 129, 0.1)' 
                : 'rgba(59, 130, 246, 0.08)',
              color: pesan.includes('berhasil') || pesan.includes('success') 
                ? '#047857' 
                : '#1e40af',
              border: `1px solid ${pesan.includes('berhasil') || pesan.includes('success') 
                ? 'rgba(16, 185, 129, 0.3)' 
                : 'rgba(59, 130, 246, 0.25)'}`,
              animation: 'slideIn 0.3s ease-out'
            }}>
              {pesan}
            </div>
          )}
        </form>

        <div style={{
          marginTop: '22px',
          textAlign: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #f1f5f9'
        }}>
          <p style={{
            margin: 0,
            fontSize: '13px',
            color: '#64748b'
          }}>
            Belum memiliki akun? Akses gratis ke semua modul tetap tersedia tanpa login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;