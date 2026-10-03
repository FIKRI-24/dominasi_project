import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import upgrisbaLogo from '../assets/logo-upgrisba.jpg';
import styles from './Footer.module.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTopGrid}>
          {/* Kolom 1: Institusi & Laboratorium */}
          <div className={styles.footerBrandCol}>
            <div className={styles.footerLogoHeader}>
              <img
                src={upgrisbaLogo}
                alt="Logo Universitas PGRI Sumatera Barat (UPGRISBA)"
                className={styles.footerLogoImg}
              />
              <div className={styles.footerTitleGroup}>
                <span className={styles.footerInstitutionName}>UNIVERSITAS PGRI SUMATERA BARAT</span>
                <span className={styles.footerLabName}>GraphTheory • Dominasi Lab</span>
              </div>
            </div>

            <p className={styles.footerBrandDesc}>
              Platform riset dan media pembelajaran interaktif matematika diskrit untuk eksplorasi
              karakterisasi bilangan dominasi lokasi, dimensi metrik, dan penempatan sensor jaringan komputer.
            </p>

            <div className={styles.footerBadgesGroup}>
              <span className={styles.footerPillBadge}>Riset Matematika Diskrit</span>
              <span className={styles.footerPillBadge}>Teori Graf Modern</span>
              <span className={styles.footerPillBadge}>UPGRISBA</span>
            </div>
          </div>

          {/* Kolom 2: Modul Pembelajaran */}
          <div className={styles.footerNavCol}>
            <h4 className={styles.footerColTitle}>Modul Belajar</h4>
            <ul className={styles.footerNavList}>
              <li>
                <Link to="/materi" className={styles.footerNavLink}>
                  Materi Terstruktur (14 Bab)
                </Link>
              </li>
              <li>
                <Link to="/contoh" className={styles.footerNavLink}>
                  Galeri Contoh Graf
                </Link>
              </li>
              <li>
                <Link to="/coba" className={styles.footerNavLink}>
                  Lab Eksperimen Graf
                </Link>
              </li>
              <li>
                <Link to="/latihan" className={styles.footerNavLink}>
                  Latihan Soal & Kuis
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Akses Platform & Navigasi */}
          <div className={styles.footerNavCol}>
            <h4 className={styles.footerColTitle}>Akses & Bantuan</h4>
            <ul className={styles.footerNavList}>
              <li>
                <Link to="/" className={styles.footerNavLink}>
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link to="/login" className={styles.footerNavLink}>
                  Masuk ke Akun
                </Link>
              </li>
              <li>
                <Link to="/admin" className={styles.footerNavLink}>
                  Panel Dashboard Admin
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className={styles.backToTopBtn}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                  <span>Kembali ke Atas</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Atribusi & Hak Cipta */}
        <div className={styles.footerBottomBar}>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} <strong>Universitas PGRI Sumatera Barat (UPGRISBA)</strong>. Hak Cipta Dilindungi.
          </p>
          <p className={styles.footerAcademicTag}>
            Laboratorium Pembelajaran Teori Graf & Penempatan Sensor Jaringan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
