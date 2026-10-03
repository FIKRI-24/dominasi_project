import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faProjectDiagram,
  faHome,
  faBook,
  faPlayCircle,
  faPenFancy,
  faTasks,
  faBars,
  faTimes,
  faSignOutAlt,
  faSignInAlt,
  faUserShield
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Tutup menu saat rute berpindah
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Cegah scroll bodi saat menu mobile drawer terbuka
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
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

  const getDrawerLinkClassName = ({ isActive }) =>
    isActive ? `${styles.drawerNavLink} ${styles.drawerNavLinkActive}` : styles.drawerNavLink;

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <>
      <header className={styles.navbarContainer}>
        <div className={styles.navbarInner}>
          {/* Brand Identity */}
          <NavLink className={styles.navBrand} to="/" title="Halaman Utama GraphTheory">
            <div className={styles.brandLogo} aria-hidden="true">
              <FontAwesomeIcon icon={faProjectDiagram} />
            </div>
            <div className={styles.brandInfo}>
              <span className={styles.brandText}>GraphTheory</span>
              <span className={styles.brandTag}>Dominasi Lab</span>
            </div>
          </NavLink>

          {/* Desktop Navigation Menu (Segmented Control) */}
          <nav className={styles.navMenu} aria-label="Navigasi Utama">
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={getLinkClassName}>
                <FontAwesomeIcon icon={item.icon} className={styles.navIcon} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Side / User Auth */}
          <div className={styles.navActions}>
            {isAuthenticated ? (
              <>
                {user.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    title="Buka Dashboard Panel Admin"
                    className={styles.adminBadge}
                  >
                    <FontAwesomeIcon icon={faUserShield} />
                    <span>Admin</span>
                  </NavLink>
                )}

                <div className={styles.userPill} title={`Masuk sebagai: ${user.name}`}>
                  <div className={styles.userAvatar}>{userInitial}</div>
                  <span className={styles.userName}>{user.name.split(' ')[0]}</span>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className={styles.logoutBtn}
                  title="Keluar dari Akun"
                  aria-label="Keluar dari Akun"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Keluar</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className={styles.loginBtn}
                title="Buka dialog Masuk / Daftar Akun"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <span>Masuk / Daftar</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Tutup navigasi mobile' : 'Buka navigasi mobile'}
            aria-expanded={isMobileMenuOpen}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`${styles.mobileBackdrop} ${isMobileMenuOpen ? styles.active : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Slide-in Drawer */}
      <aside
        className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.active : ''}`}
        aria-label="Menu navigasi mobile"
      >
        <div className={styles.drawerHeader}>
          <div className={styles.navBrand}>
            <div className={styles.brandLogo}>
              <FontAwesomeIcon icon={faProjectDiagram} />
            </div>
            <div className={styles.brandInfo}>
              <span className={styles.brandText}>GraphTheory</span>
              <span className={styles.brandTag}>Dominasi Lab</span>
            </div>
          </div>
          <button
            type="button"
            className={styles.drawerCloseBtn}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Tutup menu"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <nav className={styles.drawerNavList}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={getDrawerLinkClassName}
            >
              <FontAwesomeIcon icon={item.icon} fixedWidth />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Drawer Auth Footer */}
        <div className={styles.drawerAuthSection}>
          {isAuthenticated ? (
            <>
              <div className={styles.drawerUserCard}>
                <div className={styles.drawerUserAvatar}>{userInitial}</div>
                <div className={styles.drawerUserInfo}>
                  <span className={styles.drawerUserName}>{user.name}</span>
                  <span className={styles.drawerUserRole}>Peran: {user.role}</span>
                </div>
              </div>

              {user.role === 'admin' && (
                <NavLink
                  to="/admin"
                  className={styles.drawerAdminLink}
                >
                  <FontAwesomeIcon icon={faUserShield} />
                  <span>Buka Panel Admin</span>
                </NavLink>
              )}

              <button
                type="button"
                onClick={logout}
                className={styles.drawerLogoutBtn}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Keluar dari Akun</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className={styles.drawerLoginBtn}
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              <span>Masuk / Daftar Akun</span>
            </button>
          )}
        </div>
      </aside>

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        message="Masuk atau buat akun baru untuk menyimpan kemajuan dan hasil latihan Anda."
      />
    </>
  );
};

export default Navbar;
