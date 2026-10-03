import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faProjectDiagram,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faCheckCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import './assets/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pesan, setPesan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPesan('');

    try {
      const user = await login(email, password);
      setPesan(`Login berhasil! Selamat datang, ${user.name}.`);
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/latihan');
        }
      }, 700);
    } catch (err) {
      setPesan(err.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = pesan.toLowerCase().includes('berhasil') || pesan.toLowerCase().includes('success');

  return (
    <div className="loginPage">
      <div className="loginCard">
        {/* Navigasi Kembali ke Beranda */}
        <div className="loginBackNav">
          <Link to="/" className="backLink" title="Kembali ke halaman utama">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Header Kartu */}
        <div className="loginHeader">
          <div className="brandBadge" aria-hidden="true">
            <FontAwesomeIcon icon={faProjectDiagram} />
          </div>
          <h1 className="loginTitle">Masuk ke Akun</h1>
          <p className="loginSubtitle">
            Masuk untuk mengakses materi dan melacak kemajuan latihan Anda.
          </p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="loginForm">
          <div className="formGroup">
            <label htmlFor="login-email" className="formLabel">
              Alamat Email
            </label>
            <div className="inputWrapper">
              <FontAwesomeIcon icon={faEnvelope} className="inputIcon" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                disabled={isLoading}
                className="formInput"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="login-password" className="formLabel">
              Kata Sandi
            </label>
            <div className="inputWrapper">
              <FontAwesomeIcon icon={faLock} className="inputIcon" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                required
                disabled={isLoading}
                className="formInput"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="togglePasswordBtn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                tabIndex={0}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Banner Feedback / Error / Sukses */}
          {pesan && (
            <div
              className={`alertBanner ${isSuccess ? 'alertSuccess' : 'alertError'}`}
              role="alert"
              aria-live="polite"
            >
              <FontAwesomeIcon
                icon={isSuccess ? faCheckCircle : faExclamationCircle}
                className="alertIcon"
              />
              <span>{pesan}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="submitBtn"
          >
            {isLoading ? (
              <>
                <div className="btnSpinner" aria-hidden="true" />
                <span>Sedang Masuk...</span>
              </>
            ) : (
              <span>Masuk Sekarang</span>
            )}
          </button>
        </form>

        {/* Catatan Kaki */}
        <div className="loginFooter">
          <p className="footerNote">
            Belum memiliki akun?{' '}
            <button
              type="button"
              className="registerLinkBtn"
              onClick={() => setShowRegisterModal(true)}
            >
              Daftar Akun Baru
            </button>
          </p>
        </div>
      </div>

      <AuthModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        initialMode="register"
        onSuccess={(newUser) => {
          if (newUser.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/latihan');
          }
        }}
      />
    </div>
  );
};

export default Login;