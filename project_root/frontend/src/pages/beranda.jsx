import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPlay,
  faBookOpen,
  faGamepad,
  faPencilRuler,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
// import '../pages/assets/beranda.css';
import '../../src/App.css'
import Navbar from '../../components/navbar';

const Beranda = () => {
  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered animate__animated animate__fadeInDown">
            <h1 className="title is-size-2 has-text-white has-text-weight-bold">
              Selamat Datang di Graph Theory Learning
            </h1>
            <h2 className="subtitle has-text-white mb-4">
              Pelajari teori graf dengan cara interaktif dan menyenangkan
            </h2>
            <div className="buttons is-centered mt-4">
              <Link to="/materi" className="button is-white is-large glow">
                <span>Mulai Belajar</span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
              <Link to="/coba" className="button is-light is-large">
                <span>Coba Sekarang</span>
                <FontAwesomeIcon icon={faPlay} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="columns is-variable is-8">
            {/* Feature 1 */}
            <div className="column is-one-third">
              <div className="feature-box has-text-centered">
                <FontAwesomeIcon icon={faBookOpen} size="2x" className="mb-4 has-text-primary" />
                <h3 className="title is-4">Materi Lengkap</h3>
                <p>
                  Pelajari konsep dasar hingga lanjutan teori graf dengan pendekatan visual dan interaktif.
                </p>
                <Link to="/materi" className="button is-text mt-4">
                  Jelajahi <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="column is-one-third">
              <div className="feature-box has-text-centered">
                <FontAwesomeIcon icon={faGamepad} size="2x" className="mb-4 has-text-primary" />
                <h3 className="title is-4">Contoh Interaktif</h3>
                <p>
                  10 bentuk graf siap dieksplorasi dengan fitur manipulasi langsung di browser.
                </p>
                <Link to="/contoh" className="button is-text mt-4">
                  Coba Sekarang <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="column is-one-third">
              <div className="feature-box has-text-centered">
                <FontAwesomeIcon icon={faPencilRuler} size="2x" className="mb-4 has-text-primary" />
                <h3 className="title is-4">Try Sendiri</h3>
                <p>
                  Buat graf custom dan analisis propertinya dengan alat visualisasi canggih.
                </p>
                <Link to="/coba" className="button is-text mt-4">
                  Mulai Membuat <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Beranda;
