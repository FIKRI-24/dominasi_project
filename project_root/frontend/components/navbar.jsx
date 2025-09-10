// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faProjectDiagram, faHome, faBook, faPlayCircle,
  faPenFancy, faTasks, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'is-active' : '';

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.navbar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { path: '/', icon: faHome, label: 'Beranda' },
    { path: '/materi', icon: faBook, label: 'Materi' },
    { path: '/contoh', icon: faPlayCircle, label: 'Contoh' },
    { path: '/coba', icon: faPenFancy, label: 'Try Sendiri' },
    { path: '/latihan', icon: faTasks, label: 'Latihan' }
  ];

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <Link className="navbar-item has-text-weight-bold is-size-4 brand-link" to="/">
              <FontAwesomeIcon icon={faProjectDiagram} className="mr-2 brand-icon" />
              <span className="brand-text">Graph Theory</span>
            </Link>
            
            {/* Hamburger Button */}
            <button
              className={`navbar-burger burger ${isOpen ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <FontAwesomeIcon 
                icon={isOpen ? faTimes : faBars} 
                className="hamburger-icon"
              />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-menu">
            <div className="navbar-end">
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  className={`navbar-item desktop-item ${isActive(item.path)}`} 
                  to={item.path}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-1 fa-sm" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'is-active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-brand">
              <FontAwesomeIcon icon={faProjectDiagram} className="mobile-brand-icon" />
              <span className="mobile-brand-text">Graph Theory</span>
            </div>
          </div>
          
          <div className="mobile-menu-items">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                className={`mobile-menu-item ${isActive(item.path)}`}
                to={item.path}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mobile-item-content">
                  <FontAwesomeIcon icon={item.icon} className="mobile-item-icon" />
                  <span className="mobile-item-text">{item.label}</span>
                </div>
                <div className="mobile-item-arrow">→</div>
              </Link>
            ))}
          </div>

          <div className="mobile-menu-footer">
            <div className="mobile-menu-decoration"></div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Hamburger Button Styles */
        .navbar-burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          width: 3.25rem;
          height: 3.25rem;
          position: relative;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .navbar-burger:hover {
          background: rgba(0, 123, 255, 0.1);
          transform: scale(1.05);
        }

        .hamburger-icon {
          font-size: 1.5rem;
          color: #007bff;
          transition: all 0.3s ease;
        }

        .navbar-burger.is-active .hamburger-icon {
          color: #fff;
        }

        /* Brand Enhancements */
        .brand-link {
          transition: all 0.3s ease;
          border-radius: 8px;
          padding: 0.5rem 1rem;
        }

        .brand-link:hover {
          background: rgba(0, 123, 255, 0.1);
          transform: translateY(-1px);
        }

        .brand-icon {
          color: #007bff;
          transition: transform 0.3s ease;
        }

        .brand-link:hover .brand-icon {
          transform: rotate(15deg) scale(1.1);
        }

        .brand-text {
          background: linear-gradient(135deg, #007bff, #0056b3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Desktop Menu Enhancements */
        .desktop-item {
          border-radius: 8px;
          margin: 0 0.25rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .desktop-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 86, 179, 0.1));
          transform: translateY(100%);
          transition: transform 0.3s ease;
          z-index: -1;
        }

        .desktop-item:hover::before {
          transform: translateY(0);
        }

        .desktop-item:hover {
          color: #007bff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
        }

        .desktop-item.is-active {
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
        }

        .desktop-item.is-active:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
        }

        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-menu-overlay.is-active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          position: relative;
          background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 86, 179, 0.05));
        }

        /* Mobile Menu Header */
        .mobile-menu-header {
          margin-bottom: 3rem;
          text-align: center;
          padding-bottom: 2rem;
          border-bottom: 2px solid rgba(0, 123, 255, 0.3);
        }

        .mobile-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .mobile-brand-icon {
          font-size: 2.5rem;
          color: #007bff;
          animation: pulse 2s infinite;
        }

        .mobile-brand-text {
          font-size: 1.8rem;
          font-weight: bold;
          background: linear-gradient(135deg, #007bff, #0056b3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Mobile Menu Items */
        .mobile-menu-items {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 2rem 0;
        }

        .mobile-menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid transparent;
          border-radius: 16px;
          color: white;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-100px);
          opacity: 0;
          animation: slideInLeft 0.6s ease forwards;
          position: relative;
          overflow: hidden;
        }

        .mobile-menu-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 123, 255, 0.3), rgba(0, 86, 179, 0.2));
          transition: left 0.4s ease;
          z-index: -1;
        }

        .mobile-menu-item:hover::before,
        .mobile-menu-item.is-active::before {
          left: 0;
        }

        .mobile-menu-item:hover {
          transform: translateX(10px) scale(1.02);
          border-color: rgba(0, 123, 255, 0.5);
          box-shadow: 0 8px 24px rgba(0, 123, 255, 0.2);
        }

        .mobile-menu-item.is-active {
          background: linear-gradient(135deg, rgba(0, 123, 255, 0.3), rgba(0, 86, 179, 0.2));
          border-color: #007bff;
          box-shadow: 0 4px 16px rgba(0, 123, 255, 0.3);
        }

        .mobile-item-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mobile-item-icon {
          font-size: 1.5rem;
          color: #007bff;
          transition: transform 0.3s ease;
        }

        .mobile-menu-item:hover .mobile-item-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .mobile-item-text {
          font-size: 1.1rem;
          font-weight: 500;
        }

        .mobile-item-arrow {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }

        .mobile-menu-item:hover .mobile-item-arrow {
          transform: translateX(5px);
          color: #007bff;
        }

        /* Mobile Menu Footer */
        .mobile-menu-footer {
          text-align: center;
          padding-top: 2rem;
          border-top: 2px solid rgba(0, 123, 255, 0.3);
        }

        .mobile-menu-decoration {
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, #007bff, #0056b3);
          margin: 0 auto;
          border-radius: 2px;
          animation: pulse 2s infinite;
        }

        /* Animations */
        @keyframes slideInLeft {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        /* Responsive Design */
        @media screen and (max-width: 1023px) {
          .navbar-burger {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .desktop-menu {
            display: none;
          }

          .brand-text {
            display: none;
          }
        }

        @media screen and (min-width: 1024px) {
          .mobile-menu-overlay {
            display: none;
          }
        }

        @media screen and (max-width: 480px) {
          .mobile-menu-content {
            padding: 1.5rem;
          }

          .mobile-brand-icon {
            font-size: 2rem;
          }

          .mobile-brand-text {
            font-size: 1.5rem;
          }

          .mobile-menu-item {
            padding: 1.2rem 0.8rem;
          }

          .mobile-item-text {
            font-size: 1rem;
          }
        }

        /* Dark theme enhancements for mobile */
        @media (prefers-color-scheme: dark) {
          .mobile-menu-overlay {
            background: rgba(0, 0, 0, 0.98);
          }

          .mobile-menu-item {
            background: rgba(255, 255, 255, 0.03);
          }

          .mobile-menu-item:hover {
            background: rgba(255, 255, 255, 0.08);
          }
        }

        /* Smooth transitions for all interactive elements */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-menu-item:active {
          transform: translateX(5px) scale(0.98);
        }

        /* Enhanced focus states for accessibility */
        .navbar-burger:focus,
        .mobile-menu-item:focus,
        .desktop-item:focus {
          outline: 2px solid #007bff;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};

export default Navbar;