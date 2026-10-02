// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faProjectDiagram, faHome, faBook, faPlayCircle, faPenFancy, faTasks, 
  faBars, faTimes, faUser, faSignOutAlt, faSignInAlt, faUserShield 
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; 
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Tutup menu saat berpindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Cegah scroll saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset'; 
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { path: '/', icon: faHome, label: 'Beranda' },
    { path: '/materi', icon: faBook, label: 'Materi' },
    { path: '/contoh', icon: faPlayCircle, label: 'Contoh' },
    { path: '/coba', icon: faPenFancy, label: 'Try Sendiri' },
    { path: '/latihan', icon: faTasks, label: 'Latihan' }
  ];

  const getLinkClassName = ({ isActive }) => 
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  const getMobileLinkClassName = ({ isActive }) =>
    isActive ? `${styles.mobileLink} ${styles.mobileLinkActive}` : styles.mobileLink;

  return (
    <>
      <nav className={styles.navbar}>
        <NavLink className={styles.navBrand} to="/">
          <FontAwesomeIcon icon={faProjectDiagram} className={styles.brandIcon} />
          <span className={styles.brandText}>GraphTheory</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className={styles.navMenu}>
          {menuItems.map(item => (
            <NavLink key={item.path} to={item.path} className={getLinkClassName}>
              <FontAwesomeIcon icon={item.icon} size="sm" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          {/* Area Akun Pengguna */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '12px', borderLeft: '1px solid #e2e8f0', paddingLeft: '14px' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {user.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    title="Buka Dashboard Admin"
                    style={{
                      background: '#1e3a8a',
                      color: '#93c5fd',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <FontAwesomeIcon icon={faUserShield} />
                    <span>Admin</span>
                  </NavLink>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: '#1e293b',
                    background: '#f1f5f9',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <FontAwesomeIcon icon={faUser} style={{ color: '#1e40af', fontSize: '0.8rem' }} />
                  <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                </div>

                <button
                  onClick={logout}
                  title="Keluar dari Akun"
                  style={{
                    background: 'transparent',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: '5px 10px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#64748b'; }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Keluar</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                style={{
                  background: '#1e40af',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 1px 3px rgba(30, 64, 175, 0.2)',
                  transition: 'background 0.15s ease'
                }}
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <span>Masuk / Daftar</span>
              </button>
            )}
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileMenuItems}>
          {menuItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={getMobileLinkClassName}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <FontAwesomeIcon icon={item.icon} fixedWidth />
              <span>{item.label}</span>
            </NavLink>
          ))}

          {/* Mobile Auth Button */}
          <div style={{ marginTop: '16px', padding: '0 16px' }}>
            {isAuthenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ color: '#1e293b', fontSize: '0.95rem', fontWeight: 600 }}>
                  👤 Masuk sebagai: {user.name} ({user.role})
                </div>
                {user.role === 'admin' && (
                  <NavLink to="/admin" style={{ padding: '8px', background: '#1e3a8a', color: '#fff', borderRadius: '6px', textAlign: 'center', textDecoration: 'none', fontWeight: 600 }}>
                    🛡️ Buka Panel Admin
                  </NavLink>
                )}
                <button
                  onClick={logout}
                  style={{ width: '100%', padding: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Keluar Akun
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}
                style={{ width: '100%', padding: '12px', background: '#1e40af', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
              >
                Masuk / Daftar Akun
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal Global */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        message="Masuk atau buat akun baru untuk menyimpan kemajuan dan hasil latihan Anda."
      />
    </>
  );
};

export default Navbar;
