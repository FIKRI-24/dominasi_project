// src/components/Navbar.jsx (Final & Refactored)
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faHome, faBook, faPlayCircle, faPenFancy, faTasks, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './navbar.module.css'; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
        </div>
      </div>
    </>
  );
};

export default Navbar;