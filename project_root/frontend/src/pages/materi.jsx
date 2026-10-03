import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBrain, faNetworkWired, faRoute, faShieldAlt,
  faLightbulb, faProjectDiagram, faSitemap,
  faCopy, faCalculator, faTree, faCircle, faSquare,
  faChartLine, faCogs,
  faSearch, faRandom, faUserShield, faGlobe,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import './assets/materi.css';

const SECTIONS = [
  { id: 'pendahuluan', title: '1. Pengantar Jaringan dan Jarak', shortTitle: 'Jaringan & Jarak', icon: faBrain },
  { id: 'himpunan_dominasi', title: '2. Himpunan Penjaga (Dominasi)', shortTitle: 'Himpunan Penjaga', icon: faShieldAlt },
  { id: 'himpunan_pembeda', title: '3. Landmark Navigasi (Pembeda)', shortTitle: 'Landmark Navigasi', icon: faSearch },
  { id: 'bilangan_dominasi_lokasi', title: '4. Sensor Super (Dominasi-Lokasi)', shortTitle: 'Sensor Super', icon: faProjectDiagram },
  { id: 'karakterisasi_n_minus_2', title: '5. Sensor Hampir Penuh (n−2)', shortTitle: 'Sensor Hampir Penuh', icon: faSitemap },
  { id: 'pohon', title: '6. Pemantauan Jaringan Pohon', shortTitle: 'Jaringan Pohon', icon: faTree },
  { id: 'operasi_korona', title: '7. Operasi Tempel (Korona)', shortTitle: 'Operasi Tempel', icon: faRandom },
  { id: 'graf_k_lintasan', title: '8. Jalan Pintas (k-Lintasan)', shortTitle: 'Jalan Pintas', icon: faRoute },
  { id: 'karakterisasi_2', title: '9. Cukup Dua Sensor Super', shortTitle: 'Cukup Dua Sensor', icon: faSquare },
  { id: 'karakterisasi_3_pohon', title: '10. Cukup Tiga Sensor (Pohon)', shortTitle: 'Tiga Sensor (Pohon)', icon: faTree },
  { id: 'karakterisasi_3_unisiklik', title: '11. Satu Putaran dengan Tiga Sensor', shortTitle: 'Tiga Sensor (Unisiklik)', icon: faCircle },
  { id: 'setengah_orde', title: '12. Sensor Setengah dari Jumlah Titik', shortTitle: 'Sensor Setengah Titik', icon: faCalculator },
  { id: 'kompleksitas', title: '13. Tantangan Pencarian Sensor', shortTitle: 'Tantangan Komputasi', icon: faCogs },
  { id: 'aplikasi_nyata', title: '14. Aplikasi dalam Kehidupan Nyata', shortTitle: 'Aplikasi Nyata', icon: faGlobe }
];

// Diagram Vektor SVG Beresolusi Tinggi untuk Himpunan Dominasi (Penjaga)
const DominasiDiagram = () => (
  <div className="graph-visual-wrapper">
    <svg 
      className="graph-visual-svg" 
      viewBox="0 0 760 215" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="guardianGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Zona Cakupan Dominasi (Jangkauan Radius ≤ 1) */}
      <rect 
        x="80" 
        y="25" 
        width="600" 
        height="135" 
        rx="8" 
        fill="#f0f7ff" 
        stroke="#93c5fd" 
        strokeWidth="1.5" 
        strokeDasharray="6 4" 
      />
      
      {/* Label Zona Pengawasan */}
      <text x="380" y="46" textAnchor="middle" fill="#1d4ed8" fontSize="12" fontWeight="700" letterSpacing="0.06em">
        ZONA PENGAWASAN PENJAGA (RADIUS JARAK d ≤ 1)
      </text>

      {/* Garis Penghubung (Sisi Graf) */}
      <line x1="180" y1="102" x2="380" y2="102" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="380" y1="102" x2="580" y2="102" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

      {/* Indikator Aliran Sinyal Pemantauan */}
      <circle cx="280" cy="102" r="5" fill="#3b82f6" />
      <circle cx="480" cy="102" r="5" fill="#3b82f6" />

      {/* --- SIMPUL A (Terpantau) --- */}
      <g transform="translate(180, 102)">
        <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="#10b981" strokeWidth="3" filter="url(#softShadow)" />
        <text x="0" y="7" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800" fontFamily="Outfit, sans-serif">A</text>
        {/* Badge Label */}
        <rect x="-48" y="38" width="96" height="24" rx="4" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
        <text x="0" y="54" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="700">✓ Terpantau</text>
        {/* Keterangan Jarak */}
        <text x="0" y="76" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">d(A, B) = 1</text>
      </g>

      {/* --- SIMPUL B (Pos Penjaga) --- */}
      <g transform="translate(380, 102)">
        {/* Glow Radar Halo */}
        <circle cx="0" cy="0" r="48" fill="url(#guardianGlow)" />
        <circle cx="0" cy="0" r="32" fill="#1e40af" stroke="#ffffff" strokeWidth="3.5" filter="url(#softShadow)" />
        <text x="0" y="8" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="Outfit, sans-serif">B</text>
        {/* Badge Pos Penjaga */}
        <rect x="-62" y="38" width="124" height="26" rx="4" fill="#1e40af" filter="url(#softShadow)" />
        <text x="0" y="55" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800" letterSpacing="0.02em">🛡️ Pos Penjaga</text>
        {/* Keterangan Titik Pusat */}
        <text x="0" y="77" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="700">Pusat S = {"{B}"}</text>
      </g>

      {/* --- SIMPUL C (Terpantau) --- */}
      <g transform="translate(580, 102)">
        <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="#10b981" strokeWidth="3" filter="url(#softShadow)" />
        <text x="0" y="7" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800" fontFamily="Outfit, sans-serif">C</text>
        {/* Badge Label */}
        <rect x="-48" y="38" width="96" height="24" rx="4" fill="#d1fae5" stroke="#10b981" strokeWidth="1" />
        <text x="0" y="54" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="700">✓ Terpantau</text>
        {/* Keterangan Jarak */}
        <text x="0" y="76" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">d(C, B) = 1</text>
      </g>
    </svg>

    <div className="graph-visual-footer">
      <div className="graph-legend-item">
        <span className="graph-legend-badge" style={{ backgroundColor: '#1e40af' }}></span>
        <span><strong>Pos Penjaga (S = {"{B}"})</strong>: Mengawasi dirinya sendiri dan seluruh tetangga langsung</span>
      </div>
      <div className="graph-legend-item">
        <span className="graph-legend-badge" style={{ backgroundColor: '#10b981' }}></span>
        <span><strong>Titik Terpantau (A, C)</strong>: Berada dalam jangkauan d ≤ 1 dari penjaga B</span>
      </div>
    </div>
  </div>
);

// Diagram Vektor SVG Beresolusi Tinggi untuk Himpunan Pembeda (Landmark)
const LandmarkDiagram = () => (
  <div className="graph-visual-wrapper">
    <svg 
      className="graph-visual-svg" 
      viewBox="0 0 760 215" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="landmarkGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
        <filter id="softShadowLandmark" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Frame Batas Navigasi Metrik */}
      <rect 
        x="40" 
        y="25" 
        width="680" 
        height="135" 
        rx="8" 
        fill="#f0f9ff" 
        stroke="#bae6fd" 
        strokeWidth="1.5" 
      />
      
      {/* Label Judul Sistem Navigasi */}
      <text x="380" y="46" textAnchor="middle" fill="#0284c7" fontSize="12" fontWeight="700" letterSpacing="0.06em">
        SISTEM KOORDINAT VEKTOR METRIK TERHADAP PATOKAN W = {"{A, D}"}
      </text>

      {/* Garis Penghubung (Sisi Graf) */}
      <line x1="120" y1="102" x2="290" y2="102" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="290" y1="102" x2="470" y2="102" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="470" y1="102" x2="640" y2="102" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

      {/* --- SIMPUL A (Patokan 1) --- */}
      <g transform="translate(120, 102)">
        <circle cx="0" cy="0" r="44" fill="url(#landmarkGlow)" />
        <circle cx="0" cy="0" r="30" fill="#0284c7" stroke="#ffffff" strokeWidth="3.5" filter="url(#softShadowLandmark)" />
        <text x="0" y="8" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800" fontFamily="Outfit, sans-serif">A</text>
        <rect x="-52" y="38" width="104" height="24" rx="4" fill="#0284c7" />
        <text x="0" y="54" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">🎯 Patokan 1</text>
        <text x="0" y="76" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="700">r(A|W) = (0, 3)</text>
      </g>

      {/* --- SIMPUL B (Titik Dalam) --- */}
      <g transform="translate(290, 102)">
        <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="#64748b" strokeWidth="3" filter="url(#softShadowLandmark)" />
        <text x="0" y="7" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800" fontFamily="Outfit, sans-serif">B</text>
        <rect x="-48" y="38" width="96" height="24" rx="4" fill="#e2e8f0" />
        <text x="0" y="54" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="600">Titik Ruang</text>
        <text x="0" y="76" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="700">r(B|W) = (1, 2)</text>
      </g>

      {/* --- SIMPUL C (Titik Dalam) --- */}
      <g transform="translate(470, 102)">
        <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="#64748b" strokeWidth="3" filter="url(#softShadowLandmark)" />
        <text x="0" y="7" textAnchor="middle" fill="#0f172a" fontSize="20" fontWeight="800" fontFamily="Outfit, sans-serif">C</text>
        <rect x="-48" y="38" width="96" height="24" rx="4" fill="#e2e8f0" />
        <text x="0" y="54" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="600">Titik Ruang</text>
        <text x="0" y="76" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="700">r(C|W) = (2, 1)</text>
      </g>

      {/* --- SIMPUL D (Patokan 2) --- */}
      <g transform="translate(640, 102)">
        <circle cx="0" cy="0" r="44" fill="url(#landmarkGlow)" />
        <circle cx="0" cy="0" r="30" fill="#0284c7" stroke="#ffffff" strokeWidth="3.5" filter="url(#softShadowLandmark)" />
        <text x="0" y="8" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800" fontFamily="Outfit, sans-serif">D</text>
        <rect x="-52" y="38" width="104" height="24" rx="4" fill="#0284c7" />
        <text x="0" y="54" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">🎯 Patokan 2</text>
        <text x="0" y="76" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="700">r(D|W) = (3, 0)</text>
      </g>
    </svg>

    <div className="graph-visual-footer">
      <div className="graph-legend-item">
        <span className="graph-legend-badge" style={{ backgroundColor: '#0284c7' }}></span>
        <span><strong>Titik Patokan (W = {"{A, D}"})</strong>: Acuan penghitungan vektor koordinat jarak</span>
      </div>
      <div className="graph-legend-item">
        <span className="graph-legend-badge" style={{ backgroundColor: '#64748b' }}></span>
        <span><strong>Koordinat Unik</strong>: Setiap simpul memiliki vektor jarak unik (0,3), (1,2), (2,1), (3,0)</span>
      </div>
    </div>
  </div>
);

const Materi = () => {
  const [copied, setCopied] = useState('');
  const [activeSection, setActiveSection] = useState('pendahuluan');
  const [searchQuery, setSearchQuery] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200; // offset for navbar

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveSection(el.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredSections = SECTIONS.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.shortTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CopyButton = ({ text }) => {
    const isCopied = copied === text;
    return (
      <button className="copy-btn" onClick={() => copyToClipboard(text)}>
        <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} />
        <span>{isCopied ? 'Disalin!' : 'Salin Rumus / Konsep'}</span>
      </button>
    );
  };

  const SectionWrapper = ({ id, title, icon, children }) => {
    return (
      <section id={id} className="materi-section">
        <div className="section-header-bar">
          <div className="section-icon-box">
            <FontAwesomeIcon icon={icon} />
          </div>
          <h2 className="section-header-title">{title}</h2>
        </div>
        <div className="section-content-body">
          {children}
        </div>
      </section>
    );
  };

  return (
    <div className="materi-container">
      <Navbar />

      {/* Hero Section */}
      <section className="materi-hero">
        <div className="container">
          <div className="materi-hero-eyebrow">
            <FontAwesomeIcon icon={faBrain} />
            <span>Kurikulum Teori Graf & Teorema Sensor</span>
          </div>
          <h1 className="materi-title">
            Karakterisasi Penempatan <span className="materi-title-highlight">Sensor Super</span>
          </h1>
          <p className="materi-subtitle">
            Panduan belajar interaktif dan terstruktur mengenai Dominating Sets, Resolving Sets, dan Metric Locating-Dominating Sets pada jaringan graf
          </p>
        </div>
      </section>

      {/* Main Documentation Layout */}
      <div className="materi-layout">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="materi-sidebar">
          <div className="search-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Cari topik materi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h3 className="sidebar-title">Daftar Isi</h3>
          <nav className="sidebar-nav">
            {filteredSections.map((sec) => (
              <button
                key={sec.id}
                className={`nav-item-btn ${activeSection === sec.id ? 'active' : ''}`}
                onClick={() => scrollToSection(sec.id)}
              >
                <FontAwesomeIcon icon={sec.icon} className="nav-icon" />
                <span>{sec.shortTitle}</span>
              </button>
            ))}
            {filteredSections.length === 0 && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', padding: '0.5rem' }}>
                Tidak ditemukan materi yang cocok.
              </p>
            )}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="materi-content-area">
          
          {/* SECTION 1: Pengantar Jaringan dan Jarak */}
          <SectionWrapper id="pendahuluan" title="1. Pengantar Jaringan dan Jarak" icon={faBrain}>
            <div className="analogy-box">
              <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
              <div>
                <h3>Tujuan Pembelajaran</h3>
                <p>
                  Bagian ini menjelaskan dasar-dasar pemodelan jaringan (Graf) dan bagaimana cara kita mengukur jarak antar objek di dalamnya. Konsep ini menjadi fondasi sebelum kita belajar cara memasang sensor pemantau secara efisien.
                </p>
              </div>
            </div>

            <h3 className="sub-section-title">A. Apa itu Jaringan (Graf)?</h3>
            <p>
              Dalam matematika, jaringan dimodelkan sebagai <strong>Graf</strong> <InlineMath math="G = (V, E)" />. Graf adalah pasangan himpunan berhingga objek yang saling terhubung:
            </p>
            <div className="definition-box">
              <p><strong>1. Titik (Node / Vertex):</strong> Himpunan <InlineMath math="V(G)" /> mewakili objek tunggal dalam jaringan. Banyaknya titik disebut orde graf, dinotasikan <InlineMath math="|V(G)| = n" />. Contoh: komputer server, persimpangan jalan, atau pengguna media sosial.</p>
              <p><strong>2. Sisi (Edge / Link):</strong> Himpunan <InlineMath math="E(G)" /> mewakili jalur yang menghubungkan pasangan titik <InlineMath math="uv \in E(G)" />. Banyaknya sisi disebut ukuran graf, dinotasikan <InlineMath math="|E(G)| = m" />. Contoh: kabel jaringan atau jalan penghubung.</p>
            </div>

            <h3 className="sub-section-title">B. Contoh Simulasi Jaringan Sederhana</h3>
            <p>
              Bayangkan sebuah jaringan kecil yang terdiri dari 4 komputer kantor yang diberi label <strong>A, B, C, dan D</strong>. Komputer-komputer tersebut dihubungkan membentuk persegi siklus <InlineMath math="C_4" />: <strong>A terhubung ke B, B ke C, C ke D, dan D ke A</strong>.
            </p>
            <div className="tree-terminology">
              <div className="tree-term-item">
                <span className="tree-term-label">Orde Jaringan:</span>
                <span>Jumlah keseluruhan titik: <InlineMath math="|V(G)| = 4" /> (titik A, B, C, D).</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Ukuran Jaringan:</span>
                <span>Jumlah kabel penghubung: <InlineMath math="|E(G)| = 4" /> sisi (A-B, B-C, C-D, D-A).</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Derajat Titik:</span>
                <span>Banyaknya sambungan langsung pada titik <InlineMath math="v" />, dinotasikan <InlineMath math="\deg(v)" />. Setiap komputer terhubung ke 2 kabel, maka <InlineMath math="\deg(v) = 2" /> untuk setiap titik.</span>
              </div>
            </div>

            <h3 className="sub-section-title">C. Cara Mengukur Jarak Jaringan</h3>
            <p>
              Jarak di dalam jaringan tidak diukur dengan satuan meter, melainkan dengan jumlah langkah jalur terpendek (geodesik):
            </p>
            <div className="formula-box">
              <BlockMath math="d(u, v) = \min \{ \text{panjang lintasan dari } u \text{ ke } v \}" />
              <p>Jarak antara dua titik adalah panjang lintasan terpendek yang menghubungkannya</p>
            </div>

            <div className="variations-grid">
              {[
                { 
                  title: 'Jarak Terpendek d(u, v)', 
                  desc: 'Langkah terkecil dari titik u ke v. Pada persegi A-B-C-D: d(A, B) = 1, sedangkan d(A, C) = 2 (melewati B atau D).' 
                },
                { 
                  title: 'Diameter diam(G)', 
                  desc: 'Rentang jarak terjauh di antara seluruh pasangan titik: diam(G) = max { d(u, v) : u, v ∈ V }. Pada persegi C₄, Diameter = 2.' 
                },
                { 
                  title: 'Radius rad(G)', 
                  desc: 'Eksentrisitas minimum dari seluruh titik: rad(G) = min_u max_v d(u, v). Pada persegi simetris C₄, Radius = 2.' 
                },
              ].map((term, idx) => (
                <div className="variation" key={idx}>
                  <h3>{term.title}</h3>
                  <p>{term.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* SECTION 2: Himpunan Penjaga (Himpunan Dominasi) */}
          <SectionWrapper id="himpunan_dominasi" title="2. Himpunan Penjaga (Himpunan Dominasi)" icon={faShieldAlt}>
            <div className="analogy-box">
              <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
              <div>
                <h3>Analogi Keamanan Museum</h3>
                <p>
                  Sebuah museum memiliki beberapa ruangan. Kita ingin menempatkan pos penjaga di beberapa ruangan pilihan agar seluruh ruangan dapat diawasi. Seorang penjaga di suatu ruangan bisa mengawasi ruangan tempat dia berdiri sekaligus ruangan lain yang terhubung langsung dengannya. Berapa jumlah penjaga paling sedikit yang dibutuhkan?
                </p>
              </div>
            </div>

            <DominasiDiagram />
            <p className="caption">Ilustrasi Vektor: Titik B bertindak sebagai pos penjaga (himpunan dominasi S = {"{B}"}) yang memantau dirinya sendiri serta seluruh tetangga langsung A dan C (radius jangkauan d ≤ 1).</p>

            <h3 className="sub-section-title">A. Konsep Himpunan Penjaga (Dominating Set)</h3>
            <div className="definition-box">
              <p><strong>Himpunan Dominasi (Dominating Set):</strong> Subhimpunan <InlineMath math="S \subseteq V(G)" /> sedemikian sehingga setiap titik di luar <InlineMath math="S" /> bertetangga dengan minimal satu titik di dalam <InlineMath math="S" />. Dengan kata lain, gabungan lingkungan tertutupnya mencakup seluruh graf:</p>
              <BlockMath math="N[S] = \bigcup_{v \in S} N[v] = V(G)" />
              <p><strong>Bilangan Dominasi:</strong> Ukuran minimum dari himpunan dominasi pada graf <InlineMath math="G" />, dinotasikan dengan simbol <InlineMath math="\gamma(G)" />:</p>
              <BlockMath math="\gamma(G) = \min \{ |S| : S \subseteq V(G) \text{ dan } N[S] = V(G) \}" />
              <CopyButton text="γ(G) = min { |S| : N[S] = V(G) }" />
            </div>

            <h3 className="sub-section-title">B. Simulasi Langkah Penempatan Penjaga</h3>
            <p>
              Mari simulasikan penempatan penjaga pada lintasan 5 titik <InlineMath math="P_5" />: <strong>A - B - C - D - E</strong>.
            </p>
            <div className="tree-terminology">
              <div className="tree-term-item">
                <span className="tree-term-label">Langkah 1 (Coba 1 Penjaga):</span>
                <span>Jika kita letakkan penjaga di titik tengah C, ia hanya mengawasi B, C, D. Ruangan A dan E berjarak 2 langkah dan tidak terawasi. Jadi <InlineMath math="\gamma(P_5) > 1" />.</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Langkah 2 (Coba 2 Penjaga):</span>
                <span>Letakkan penjaga di titik B dan D:
                <br />- Penjaga di B mengawasi A, B, dan C.
                <br />- Penjaga di D mengawasi C, D, dan E.
                <br />Semua titik <InlineMath math="\{A, B, C, D, E\}" /> terawasi!</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Langkah 3 (Kesimpulan):</span>
                <span>Dua penjaga adalah batas paling sedikit yang cukup, sehingga <InlineMath math="\gamma(P_5) = 2 = \lceil 5/3 \rceil" />.</span>
              </div>
            </div>

            <h3 className="sub-section-title">C. Kebutuhan Penjaga pada Struktur Graf Standar</h3>
            <div className="variations-grid">
              {[
                { 
                  title: 'Graf Lengkap Kₙ', 
                  math: '\\gamma(K_n) = 1',
                  desc: 'Semua titik saling terhubung langsung. Cukup tempatkan tepat 1 penjaga di titik mana saja karena dapat mengawasi seluruh jaringan seketika.' 
                },
                { 
                  title: 'Graf Bintang Sₙ', 
                  math: '\\gamma(S_n) = 1',
                  desc: 'Satu titik pusat terhubung ke semua daun. Cukup tempatkan 1 penjaga di titik pusat untuk mengawasi seluruh daun.' 
                },
                { 
                  title: 'Graf Lintasan Pₙ', 
                  math: '\\gamma(P_n) = \\lceil n/3 \\rceil',
                  desc: 'Satu penjaga dapat mencakup maksimal 3 titik berturut-turut. Formula jumlah penjaga minimumnya adalah pembulatan ke atas dari n/3.' 
                },
                { 
                  title: 'Graf Lingkaran Cₙ', 
                  math: '\\gamma(C_n) = \\lceil n/3 \\rceil',
                  desc: 'Jalur melingkar simetris tanpa ujung. Sama seperti lintasan, efisiensi optimalnya membutuhkan satu penjaga untuk setiap 3 titik.' 
                },
              ].map((g, idx) => (
                <div className="variation" key={idx}>
                  <h3>{g.title}</h3>
                  <div style={{ margin: '0.5rem 0' }}>
                    <InlineMath math={g.math} />
                  </div>
                  <p>{g.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* SECTION 3: Landmark Navigasi (Himpunan Pembeda) */}
          <SectionWrapper id="himpunan_pembeda" title="3. Landmark Navigasi (Himpunan Pembeda)" icon={faSearch}>
            <div className="analogy-box">
              <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
              <div>
                <h3>Analogi GPS dan Landmark Kota</h3>
                <p>
                  Bagaimana kita bisa membedakan posisi satu rumah dengan rumah lainnya di kota besar? Kita bisa mengukur jarak rumah tersebut ke beberapa bangunan patokan (landmark) terkenal. Jika setiap rumah memiliki kombinasi vektor jarak yang unik ke patokan-patokan tersebut, maka lokasi setiap rumah dapat dipastikan secara akurat.
                </p>
              </div>
            </div>

            <LandmarkDiagram />
            <p className="caption">Ilustrasi Vektor: Titik A dan D dipilih sebagai himpunan pembeda (landmark) W = {"{A, D}"} sehingga setiap simpul di lintasan memiliki vektor koordinat jarak r(v|W) yang unik.</p>

            <h3 className="sub-section-title">A. Konsep Himpunan Pembeda (Resolving Set)</h3>
            <div className="definition-box">
              <p><strong>Representasi Koordinat Jarak:</strong> Misalkan <InlineMath math="W = \{w_1, w_2, \dots, w_k\}" /> adalah himpunan bagian terurut dari <InlineMath math="V(G)" />. Representasi jarak dari suatu titik <InlineMath math="v \in V(G)" /> terhadap <InlineMath math="W" /> didefinisikan sebagai vektor:</p>
              <BlockMath math="r(v|W) = (d(v, w_1), d(v, w_2), \dots, d(v, w_k))" />
              <p><strong>Himpunan Pembeda (Resolving Set):</strong> Himpunan <InlineMath math="W" /> disebut himpunan pembeda jika setiap dua titik berbeda di <InlineMath math="G" /> memiliki representasi jarak yang berbeda:</p>
              <BlockMath math="\forall u, v \in V(G), \quad u \neq v \implies r(u|W) \neq r(v|W)" />
              <p><strong>Dimensi Metrik:</strong> Kardinalitas minimum dari himpunan pembeda pada graf <InlineMath math="G" />, dinotasikan dengan <InlineMath math="\beta(G)" /> atau <InlineMath math="\dim(G)" />:</p>
              <BlockMath math="\beta(G) = \min \{ |W| : W \text{ adalah himpunan pembeda dari } G \}" />
              <CopyButton text="β(G) = min { |W| : r(u|W) ≠ r(v|W) untuk setiap u ≠ v }" />
            </div>

            <h3 className="sub-section-title">B. Simulasi Langkah Menentukan Landmark Navigasi</h3>
            <p>
              Mari simulasikan cara menentukan patokan navigasi pada lintasan 4 titik <InlineMath math="P_4" />: <strong>A - B - C - D</strong>.
            </p>
            <div className="tree-terminology">
              <div className="tree-term-item">
                <span className="tree-term-label">Coba 1 Patokan di Ujung A (W = {"{A}"}):</span>
                <span>Hitung koordinat jarak setiap titik terhadap A:
                <br />- <InlineMath math="r(A|W) = (0)" />
                <br />- <InlineMath math="r(B|W) = (1)" />
                <br />- <InlineMath math="r(C|W) = (2)" />
                <br />- <InlineMath math="r(D|W) = (3)" />
                <br />Karena semua koordinat berbeda, maka <strong>cukup 1 patokan saja</strong> di ujung: <InlineMath math="\beta(P_4) = 1" />.</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Coba 1 Patokan di Titik Dalam B (W = {"{B}"}):</span>
                <span>Hitung koordinat jarak terhadap B:
                <br />- <InlineMath math="r(A|W) = (1)" />
                <br />- <InlineMath math="r(C|W) = (1)" />
                <br />Karena <InlineMath math="r(A|W) = r(C|W) = (1)" />, posisi A dan C tidak dapat dibedakan. Maka patokan tidak boleh hanya di titik dalam B.</span>
              </div>
            </div>

            <h3 className="sub-section-title">C. Sifat Titik Kembar (Twin Nodes)</h3>
            <p>
              Dua titik <InlineMath math="u, v" /> disebut titik kembar (twin nodes) jika mereka memiliki himpunan tetangga terbuka yang sama (<InlineMath math="N(u) = N(v)" />) atau lingkungan tertutup yang sama (<InlineMath math="N[u] = N[v]" />).
            </p>
            <div className="definition-box">
              <p><strong>Teorema Titik Kembar:</strong> Jika graf <InlineMath math="G" /> memiliki sekumpulan titik kembar beranggotakan <InlineMath math="p" /> titik <InlineMath math="\{v_1, v_2, \dots, v_p\}" />, maka setiap himpunan pembeda <InlineMath math="W" /> wajib memuat sedikitnya <InlineMath math="p - 1" /> dari titik-titik tersebut:</p>
              <BlockMath math="|W \cap \{v_1, v_2, \dots, v_p\}| \ge p - 1" />
              <p>Sebagai akibatnya, untuk graf lengkap <InlineMath math="K_n" /> yang semua titiknya merupakan titik kembar, kita memperoleh:</p>
              <BlockMath math="\beta(K_n) = n - 1" />
            </div>
          </SectionWrapper>

          {/* SECTION 4: Sensor Super (Dominasi-Lokasi-Metrik) */}
          <SectionWrapper id="bilangan_dominasi_lokasi" title="4. Sensor Super (Himpunan Dominasi-Lokasi-Metrik)" icon={faProjectDiagram}>
            <div className="analogy-box">
              <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
              <div>
                <h3>Kenapa Harus Menggabungkan Penjaga & Landmark?</h3>
                <p>
                  - Jika hanya memasang <strong>Penjaga (Himpunan Dominasi)</strong>: Kita tahu ada penyusupan di area sekitar penjaga, tapi tidak tahu di titik mana persisnya penyusup itu berada.
                  <br />- Jika hanya memasang <strong>Landmark (Himpunan Pembeda)</strong>: Kita tahu koordinat posisi, tapi tidak ada jaminan titik tersebut terpantau langsung dalam jarak 1 langkah.
                  <br />- <strong>Sensor Super (MLD Set)</strong> menyelesaikan keduanya: Mengawasi keamanan area sekitarnya sekaligus membedakan koordinat lokasi setiap titik secara unik!
                </p>
              </div>
            </div>

            <h3 className="sub-section-title">A. Definisi Formal Metric Locating-Dominating Set</h3>
            <div className="definition-box">
              <p><strong>Himpunan Dominasi-Lokasi-Metrik (MLD Set):</strong> Suatu himpunan bagian <InlineMath math="S \subseteq V(G)" /> disebut himpunan dominasi-lokasi-metrik jika memenuhi dua syarat sekaligus:</p>
              <p>1. <InlineMath math="S" /> adalah himpunan dominasi dari <InlineMath math="G" /> (<InlineMath math="N[S] = V(G)" />).</p>
              <p>2. Untuk setiap pasangan titik berbeda di luar <InlineMath math="S" />, representasi jaraknya terhadap <InlineMath math="S" /> adalah unik:</p>
              <BlockMath math="\forall u, v \in V(G) \setminus S, \quad u \neq v \implies r(u|S) \neq r(v|S)" />
              <p><strong>Bilangan Dominasi-Lokasi-Metrik:</strong> Kardinalitas terkecil dari himpunan MLD pada graf <InlineMath math="G" />, dinotasikan dengan <InlineMath math="\gamma_M(G)" />:</p>
              <BlockMath math="\gamma_M(G) = \min \{ |S| : S \text{ adalah himpunan MLD dari } G \}" />
              <p>Hubungan batas hierarkis bilangan parameter ini:</p>
              <BlockMath math="\max\{\gamma(G), \beta(G)\} \le \gamma_M(G) \le n - 1" />
              <CopyButton text="γ_M(G) = min { |S| : S mendominasi G dan membedakan V(G) \ S }" />
            </div>

            <h3 className="sub-section-title">B. Simulasi Langkah Menemukan Kebutuhan Sensor Super</h3>
            <p>
              Mari simulasikan penempatan sensor super pada graf lingkaran 4 titik <InlineMath math="C_4" />: <strong>A - B - C - D - A</strong>.
            </p>
            <div className="tree-terminology">
              <div className="tree-term-item">
                <span className="tree-term-label">Coba 1 Sensor di A (S = {"{A}"}):</span>
                <span>- Pengawasan: A hanya mengawasi A, B, dan D. Titik C tidak terawasi (<InlineMath math="d(C, A) = 2" />). Syarat dominasi gagal!
                <br />- Navigasi: <InlineMath math="r(B|S) = (1)" /> dan <InlineMath math="r(D|S) = (1)" />. Koordinatnya sama, navigasi juga gagal. Jadi <InlineMath math="\gamma_M(C_4) > 1" />.</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Coba 2 Sensor di A dan B (S = {"{A, B}"}):</span>
                <span>- Pengawasan: <InlineMath math="N[A] = \{A, B, D\}" />, <InlineMath math="N[B] = \{A, B, C\}" />. Maka <InlineMath math="N[S] = \{A, B, C, D\} = V(C_4)" />. Dominasi sukses!
                <br />- Navigasi titik luar <InlineMath math="V \setminus S = \{C, D\}" />:
                <br />&nbsp;&nbsp;* <InlineMath math="r(C|S) = (d(C, A), d(C, B)) = (2, 1)" />
                <br />&nbsp;&nbsp;* <InlineMath math="r(D|S) = (d(D, A), d(D, B)) = (1, 2)" />
                <br />Karena <InlineMath math="(2, 1) \neq (1, 2)" />, koordinat unik! Maka <InlineMath math="\gamma_M(C_4) = 2" />.</span>
              </div>
            </div>
          </SectionWrapper>

          {/* SECTION 5: Sensor Hampir Penuh (n - 2) */}
          <SectionWrapper id="karakterisasi_n_minus_2" title="5. Sensor Hampir Penuh (n−2)" icon={faSitemap}>
            <div className="definition-box">
              <h3>Kondisi Ekstrem: Ketika Pemantauan Menjadi Sangat Mahal</h3>
              <p>
                Dalam beberapa struktur graf yang memiliki tingkat kesimetrisan sangat tinggi dan kaya akan titik kembar, kita terpaksa memasang sensor di hampir seluruh titik jaringan, menyisakan hanya 1 atau 2 titik saja yang kosong tanpa sensor.
              </p>
              <BlockMath math="\gamma_M(G) = n - 2 \quad \text{atau} \quad \gamma_M(G) = n - 1" />
            </div>

            <h3 className="sub-section-title">Mengapa Graf Lengkap Butuh Sensor Hampir Penuh?</h3>
            <p>
              Pada Graf Lengkap <InlineMath math="K_n" />, seluruh titik berjarak 1 langkah satu sama lain. Karena semua pasangan titik adalah titik kembar sejati, tidak ada satupun titik luar yang dapat dibedakan jika tidak dipasangi sensor. Akibatnya:
            </p>
            <div className="formula-box">
              <BlockMath math="\gamma_M(K_n) = n - 1" />
              <p>Hanya boleh menyisakan tepat 1 titik yang tidak dipasangi sensor pada graf lengkap Kₙ</p>
            </div>

            <h3 className="sub-section-title">Keluarga Graf dengan Karakteristik γ_M(G) = n − 2</h3>
            <div className="variations-grid">
              {[
                { 
                  title: 'Graf Bintang Ganda B(r, s)', 
                  math: '\\gamma_M(B_{r, s}) = n - 2',
                  desc: 'Dua titik pusat yang masing-masing mengikat r dan s daun anak. Kita wajib memasang sensor di r-1 daun pada pusat pertama dan s-1 daun pada pusat kedua.' 
                },
                { 
                  title: 'Graf Lengkap Minus Sisi Kₙ − e', 
                  math: '\\gamma_M(K_n - e) = n - 2',
                  desc: 'Graf lengkap Kₙ yang salah satu sisinya dihapus. Dua titik ujung sisi yang hilang tersebut dapat dibedakan tanpa perlu memasang sensor pada keduanya.' 
                },
                { 
                  title: 'Graf Bipartit Lengkap K(r, s)', 
                  math: '\\gamma_M(K_{r, s}) = r + s - 2 = n - 2',
                  desc: 'Untuk r, s ≥ 2, semua titik dalam kubu yang sama adalah titik kembar, sehingga kita wajib memilih r-1 titik di kubu pertama dan s-1 titik di kubu kedua.' 
                }
              ].map((f, idx) => (
                <div className="variation" key={idx}>
                  <h3>{f.title}</h3>
                  <div style={{ margin: '0.5rem 0' }}>
                    <InlineMath math={f.math} />
                  </div>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* SECTION 6: Pemantauan Jaringan Pohon */}
          <SectionWrapper id="pohon" title="6. Pemantauan Jaringan Pohon" icon={faTree}>
            <div className="analogy-box">
              <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
              <div>
                <h3>Mengenal Jaringan Pohon (Tree)</h3>
                <p>
                  Pohon adalah graf terhubung yang tidak memuat siklus (acyclic connected graph). Karakteristik pohon yang tanpa putaran membuat penentuan sensor super memiliki rumus eksak yang sangat elegan.
                </p>
              </div>
            </div>

            <div className="tree-terminology">
              <h3 style={{ margin: '0 0 1rem', fontFamily: 'Outfit, sans-serif', color: 'var(--text-dark)' }}>Istilah Struktur Pohon</h3>
              <div className="tree-term-item">
                <span className="tree-term-label">Titik Daun (Pendant Vertex):</span>
                <span>Titik di ujung terluar dengan derajat <InlineMath math="\deg(v) = 1" />. Himpunan seluruh daun dinotasikan <InlineMath math="L(T)" />.</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Titik Dahan (Support Vertex):</span>
                <span>Titik persimpangan yang bertetangga dengan minimal satu titik daun.</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Dahan Kuat (Strong Support Vertex):</span>
                <span>Titik dahan yang mengikat <InlineMath math="\ge 2" /> titik daun sekaligus. Himpunan dahan kuat dinotasikan <InlineMath math="S(T)" />.</span>
              </div>
            </div>

            <h3 className="sub-section-title">Teorema Bilangan Dominasi-Lokasi pada Pohon</h3>
            <p>
              Untuk sebarang pohon <InlineMath math="T" />, kebutuhan sensor super dapat dihitung secara langsung menggunakan rumus:
            </p>
            <div className="formula-box">
              <BlockMath math="\gamma_M(T) = \gamma(T) + \sum_{v \in S(T)} \big( l(v) - 1 \big)" />
              <p>di mana l(v) adalah banyaknya daun anak yang bertetangga langsung dengan dahan kuat v</p>
              <CopyButton text="γ_M(T) = γ(T) + ∑ (l(v) - 1)" />
            </div>

            <div className="definition-box">
              <p><strong>Langkah Penempatan Optimal pada Pohon:</strong></p>
              <p>1. Identifikasi semua dahan kuat <InlineMath math="v \in S(T)" /> yang memegang lebih dari satu daun.</p>
              <p>2. Pasang sensor pada <InlineMath math="l(v) - 1" /> daun di dahan tersebut, menyisakan tepat 1 daun kosong.</p>
              <p>3. Gabungkan dengan himpunan dominasi minimum pada sisa bagian dalam pohon.</p>
            </div>
          </SectionWrapper>

          {/* SECTION 7: Operasi Tempel (Korona) */}
          <SectionWrapper id="operasi_korona" title="7. Operasi Tempel Jaringan (Korona)" icon={faRandom}>
            <div className="definition-box">
              <h3>Definisi Operasi Korona (Corona Product)</h3>
              <p>
                <strong>Operasi Korona</strong> antara dua graf <InlineMath math="G" /> dan <InlineMath math="H" />, dinotasikan <InlineMath math="G \odot H" />, adalah graf yang diperoleh dari satu salinan graf utama <InlineMath math="G" /> dan <InlineMath math="|V(G)|" /> salinan graf pembantu <InlineMath math="H" />, di mana titik ke-<InlineMath math="i" /> dari <InlineMath math="G" /> dihubungkan ke seluruh titik pada salinan ke-<InlineMath math="i" /> dari <InlineMath math="H" />.
              </p>
              <BlockMath math="|V(G \odot H)| = |V(G)| \cdot \big( 1 + |V(H)| \big)" />
            </div>

            <h3 className="sub-section-title">Kebutuhan Sensor pada Hasil Operasi Tempel</h3>
            <p>
              Jika jaringan pembantu yang ditempelkan adalah graf titik tunggal <InlineMath math="H = K_1" /> (setiap simpul <InlineMath math="G" /> diberi satu daun tambahan):
            </p>
            <div className="formula-box">
              <BlockMath math="\gamma_M(G \odot K_1) = |V(G)| = n = \frac{1}{2}|V(G \odot K_1)|" />
              <p>Jumlah sensor super pada G ⊙ K₁ tepat sama dengan banyaknya titik graf utama n</p>
              <CopyButton text="γ_M(G ⊙ K₁) = |V(G)| = n = (1/2) |V(G ⊙ K₁)|" />
            </div>

            <div className="variations-grid">
              {[
                { 
                  title: 'Penempelan Hemat (H = K₁)', 
                  math: '\\gamma_M(G \\odot K_1) = n',
                  desc: 'Cukup tempatkan sensor pada daun luar atau simpul utama. Tidak diperlukan sensor ganda pada satu dahan.' 
                },
                { 
                  title: 'Penempelan Graf Lebih Besar (H = K_m)', 
                  math: '\\gamma_M(G \\odot K_m) = n \\cdot (m - 1)',
                  desc: 'Jika graf pembantu yang ditempelkan adalah graf lengkap K_m (m ≥ 2), kita wajib menempatkan m - 1 sensor di setiap salinan K_m.' 
                }
              ].map((cond, idx) => (
                <div className="variation" key={idx}>
                  <h3>{cond.title}</h3>
                  <div style={{ margin: '0.5rem 0' }}>
                    <InlineMath math={cond.math} />
                  </div>
                  <p>{cond.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* SECTION 8: Jalan Pintas (k-Lintasan) */}
          <SectionWrapper id="graf_k_lintasan" title="8. Jalan Pintas pada Jaringan (k-Lintasan)" icon={faRoute}>
            <div className="definition-box">
              <h3>Definisi Pangkat Graf Lintasan Pₙᵏ</h3>
              <p>
                Graf <InlineMath math="k" />-Lintasan (pangkat graf dari lintasan, dinotasikan <InlineMath math="P_n^k" />) adalah graf dengan titik <InlineMath math="V(P_n^k) = \{v_1, v_2, \dots, v_n\}" /> di mana dua titik dihubungkan oleh sisi jika dan hanya jika jarak aslinya di lintasan paling banyak <InlineMath math="k" /> langkah:
              </p>
              <BlockMath math="E(P_n^k) = \{ v_i v_j : 1 \le |i - j| \le k \}" />
            </div>

            <h3 className="sub-section-title">Formula Sensor Super pada k-Lintasan</h3>
            <p>
              Keberadaan jalan pintas sejauh <InlineMath math="k" /> langkah meningkatkan daya jangkau dominasi sensor super secara simetris ke kiri dan ke kanan sebanyak <InlineMath math="k" /> langkah:
            </p>
            <div className="formula-box">
              <BlockMath math="\gamma_M(P_n^k) = \left\lceil \frac{n}{2k + 1} \right\rceil" />
              <p>Satu sensor super mampu mengawasi dirinya sendiri dan k titik di kiri serta k titik di kanan (total 2k + 1 titik)</p>
              <CopyButton text="γ_M(P_n^k) = ⌈ n / (2k + 1) ⌉" />
            </div>

            <div className="tree-terminology">
              <div className="tree-term-item">
                <span className="tree-term-label">Cakupan Maksimal:</span>
                <span>Setiap sensor super mencakup rentang <InlineMath math="2k + 1" /> titik berturut-turut tanpa kehilangan kemampuan pembeda koordinat.</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Efisiensi Ekstrem:</span>
                <span>Untuk <InlineMath math="k \ge \lfloor n/2 \rfloor" />, graf menjadi sangat padat sehingga <InlineMath math="\gamma_M(P_n^k) = 1" /> jika memiliki simpul universal.</span>
              </div>
            </div>
          </SectionWrapper>

          {/* SECTION 9: Cukup Dua Sensor Super */}
          <SectionWrapper id="karakterisasi_2" title="9. Cukup Dua Sensor Super" icon={faSquare}>
            <div className="definition-box">
              <h3>Teorema Karakterisasi γ_M(G) = 2</h3>
              <p>
                Kondisi paling hemat dicapai ketika sebuah jaringan hanya membutuhkan tepat <strong>2 sensor super</strong> untuk mengamankan dan membedakan posisi seluruh titiknya:
              </p>
              <BlockMath math="\gamma_M(G) = 2" />
            </div>

            <h3 className="sub-section-title">Keluarga Graf Lengkap dengan γ_M(G) = 2</h3>
            <div className="variations-grid">
              {[
                { 
                  title: 'Lintasan Pendek P₃ hingga P₆', 
                  math: '\\gamma_M(P_n) = 2 \\quad (3 \\le n \\le 6)',
                  desc: 'Untuk lintasan P₃, P₄, P₅, dan P₆, menempatkan 2 sensor di posisi yang tepat selalu mampu memantau seluruh simpul secara unik.' 
                },
                { 
                  title: 'Siklus Kecil C₄ dan C₅', 
                  math: '\\gamma_M(C_4) = \\gamma_M(C_5) = 2',
                  desc: 'Dua sensor ditempatkan bersebelahan pada C₄ atau C₅ sudah cukup mendominasi dan membedakan seluruh titik sisa.' 
                },
                { 
                  title: 'Graf K₁ + H Khusus', 
                  math: '\\gamma_M(K_1 + H) = 2',
                  desc: 'Graf yang dibentuk dari satu titik pusat yang terhubung penuh ke graf pembantu H yang memenuhi kriteria keterpisahan simetri.' 
                }
              ].map((g, idx) => (
                <div className="variation" key={idx}>
                  <h3>{g.title}</h3>
                  <div style={{ margin: '0.5rem 0' }}>
                    <InlineMath math={g.math} />
                  </div>
                  <p>{g.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* SECTION 10: Cukup Tiga Sensor (Pohon) */}
          <SectionWrapper id="karakterisasi_3_pohon" title="10. Cukup Tiga Sensor (Pohon)" icon={faTree}>
            <div className="definition-box">
              <h3>Karakterisasi Pohon dengan γ_M(T) = 3</h3>
              <p>
                Sebuah jaringan pohon membutuhkan tepat <strong>3 sensor super</strong> jika dan hanya jika pohon tersebut berbentuk "tripod" (bercabang 3) dengan tepat satu titik dahan utama yang seimbang:
              </p>
              <BlockMath math="\gamma_M(T) = 3 \iff T \in \mathcal{T}_3" />
            </div>

            <h3 className="sub-section-title">Syarat Pohon dengan Kebutuhan Tepat 3 Sensor</h3>
            <div className="tree-terminology">
              <div className="tree-term-item">
                <span className="tree-term-label">1. Satu Titik Mayor Utama:</span>
                <span>Pohon hanya boleh memiliki maksimal satu titik percabangan yang berderajat <InlineMath math="\deg(v) \ge 3" />.</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">2. Bebas Dahan Kuat Ganda:</span>
                <span>Tidak boleh ada dahan yang memegang 2 daun atau lebih secara bersamaan (<InlineMath math="|S(T)| = 0" /> atau <InlineMath math="l(v) \le 1" />).</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">3. Panjang Cabang Memenuhi Batas Dominasi:</span>
                <span>Panjang ketiga cabang lintasan <InlineMath math="a, b, c" /> dari titik pusat memenuhi:
                <br /><InlineMath math="\lceil a/3 \rceil + \lceil b/3 \rceil + \lceil c/3 \rceil \le 3" />.</span>
              </div>
            </div>
          </SectionWrapper>

          {/* SECTION 11: Satu Putaran dengan Tiga Sensor (Unisiklik) */}
          <SectionWrapper id="karakterisasi_3_unisiklik" title="11. Satu Putaran dengan Tiga Sensor" icon={faCircle}>
            <div className="definition-box">
              <h3>Klasifikasi 134 Graf Unisiklik dengan γ_M(G) = 3</h3>
              <p>
                <strong>Graf Unisiklik</strong> adalah graf terhubung yang memuat tepat satu siklus memutar <InlineMath math="C_k" />. Para peneliti matematika telah membuktikan bahwa terdapat tepat <strong>134 variasi bentuk graf unisiklik</strong> yang memiliki nilai:
              </p>
              <BlockMath math="\gamma_M(G) = 3" />
            </div>

            <h3 className="sub-section-title">Rincian Pembagian Berdasarkan Ukuran Siklus Inti</h3>
            <div className="variations-grid">
              {[
                { 
                  title: 'Siklus Inti C₃ (Segitiga)', 
                  count: '58 Graf', 
                  desc: 'Siklus C₃ memberikan fleksibilitas percabangan paling luas karena diameter siklus hanya 1 langkah.' 
                },
                { 
                  title: 'Siklus Inti C₄ (Persegi)', 
                  count: '45 Graf', 
                  desc: 'Konfigurasi percabangan moderat dengan kombinasi cabang di sudut-sudut yang berdekatan atau berhadapan.' 
                },
                { 
                  title: 'Siklus Inti C₅ (Segilima)', 
                  count: '19 Graf', 
                  desc: 'Sebagian besar sensor super dialokasikan untuk mengamankan keliling lingkaran siklus itu sendiri.' 
                },
                { 
                  title: 'Siklus Inti C₆ (Segienam)', 
                  count: '8 Graf', 
                  desc: 'Cabang luar sangat terbatas dan pendek agar tidak melebihi kapasitas koordinasi 3 sensor.' 
                },
                { 
                  title: 'Siklus Inti C₇ (Segitujuh)', 
                  count: '4 Graf', 
                  desc: 'Ukuran siklus maksimum yang masih dapat dipantau oleh 3 sensor super (siklus murni C₇ dan 3 variasi cabangnya).' 
                }
              ].map((cycle, idx) => (
                <div className="variation" key={idx}>
                  <h3>{cycle.title}</h3>
                  <div style={{ color: 'var(--primary)', fontWeight: 'bold', margin: '0.25rem 0' }}>
                    {cycle.count}
                  </div>
                  <p>{cycle.desc}</p>
                </div>
              ))}
            </div>
            <p className="caption">Total keseluruhan: <InlineMath math="58 + 45 + 19 + 8 + 4 = 134" /> graf unisiklik terkarakterisasi secara lengkap.</p>
          </SectionWrapper>

          {/* SECTION 12: Sensor Setengah Titik (n/2) */}
          <SectionWrapper id="setengah_orde" title="12. Sensor Setengah dari Jumlah Titik (n/2)" icon={faCalculator}>
            <div className="analogy-box">
              <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
              <div>
                <h3>Kondisi Keseimbangan Setengah Orde</h3>
                <p>
                  Kondisi ini terjadi ketika struktur jaringan terbagi secara sangat seimbang dan berpasang-pasangan secara ketat. Kita harus memasang sensor super pada tepat setengah dari total seluruh lokasi titik yang ada di jaringan:
                </p>
                <BlockMath math="\gamma_M(G) = \frac{n}{2} = \frac{|V(G)|}{2}" />
              </div>
            </div>

            <h3 className="sub-section-title">Contoh Kasus Graf dengan Karakteristik γ_M(G) = n/2</h3>
            <div className="tree-terminology">
              <div className="tree-term-item">
                <span className="tree-term-label">Pohon Daun Berpasangan:</span>
                <span>Setiap titik dahan memegang tepat 1 titik daun. Maka tepat <InlineMath math="n/2" /> titik adalah daun luar dan <InlineMath math="n/2" /> titik adalah dahan dalam.</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Graf Hasil Korona G ⊙ K₁:</span>
                <span>Graf utama dengan <InlineMath math="n_0" /> titik yang masing-masing ditempeli 1 daun, menghasilkan graf berorde <InlineMath math="n = 2n_0" /> dengan:
                <br /><InlineMath math="\gamma_M(G \odot K_1) = n_0 = \frac{n}{2}" />.</span>
              </div>
              <div className="tree-term-item">
                <span className="tree-term-label">Graf Ulat Seimbang:</span>
                <span>Graf ulat (caterpillar) di mana tulang punggungnya mengikat daun-daun tunggal yang simetris di setiap ruasnya.</span>
              </div>
            </div>
          </SectionWrapper>

          {/* SECTION 13: Tantangan Pencarian Sensor (Kompleksitas) */}
          <SectionWrapper id="kompleksitas" title="13. Tantangan Pencarian Lokasi Sensor" icon={faCogs}>
            <div className="definition-box">
              <h3>Kompleksitas Komputasi: Masalah NP-Lengkap</h3>
              <p>
                Menemukan himpunan sensor super minimum pada graf acak sembarang terbukti merupakan masalah komputasi yang termasuk ke dalam kelas <strong>NP-Complete</strong>:
              </p>
              <BlockMath math="\text{MLD-DECISION} = \{ \langle G, k \rangle : \gamma_M(G) \le k \} \in \text{NP-Complete}" />
              <p>
                Artinya, tidak ada algoritma polinomial efisien yang diketahui dapat menyelesaikan masalah ini secara optimal pada graf umum ketika ukuran titik <InlineMath math="n" /> sangat besar.
              </p>
            </div>

            <h3 className="sub-section-title">Tingkat Kesulitan Berdasarkan Struktur Graf</h3>
            <div className="variations-grid">
              {[
                { 
                  title: 'Graf Umum Acak', 
                  math: '\\mathcal{O}(2^n \\cdot n^2)',
                  desc: 'Tingkat kesulitan tertinggi (NP-Lengkap). Komputer terpaksa memeriksa kombinasi eksponensial untuk mencari solusi optimal.' 
                },
                { 
                  title: 'Graf Pohon (Tree)', 
                  math: '\\mathcal{O}(|V| + |E|)',
                  desc: 'Tingkat kesulitan rendah. Berkat ketiadaan siklus, dapat diselesaikan dalam waktu linier menggunakan pendekatan traversal dinamis.' 
                },
                { 
                  title: 'Graf Teratur (Pₙ, Cₙ, Kₙ)', 
                  math: '\\mathcal{O}(1)',
                  desc: 'Trivial. Nilai parameter dapat langsung dihitung seketika menggunakan rumus analitis tertutup tanpa simulasi pencarian.' 
                }
              ].map((c, idx) => (
                <div className="variation" key={idx}>
                  <h3>{c.title}</h3>
                  <div style={{ margin: '0.5rem 0' }}>
                    <InlineMath math={c.math} />
                  </div>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>

          {/* SECTION 14: Aplikasi dalam Kehidupan Nyata */}
          <SectionWrapper id="aplikasi_nyata" title="14. Aplikasi dalam Kehidupan Nyata" icon={faGlobe}>
            <h3 className="sub-section-title">A. Penempatan Pos Layanan Darurat Kota</h3>
            <p>
              Pemerintah kota modern menggunakan model matematis ini untuk mengoptimalkan penempatan kantor pemadam kebakaran, armada ambulans, dan pos polisi:
            </p>
            <div className="definition-box">
              <p>- <strong>Aspek Dominasi:</strong> Setiap zona pemukiman dijamin berada dalam jangkauan respons cepat (<InlineMath math="d \le 1" /> zona waktu) dari pos terdekat.</p>
              <p>- <strong>Aspek Metrik Navigasi:</strong> Vektor koordinat waktu tempuh dari setiap distrik ke armada yang siaga bernilai unik, mencegah disorientasi navigasi petugas lapangan saat kondisi darurat.</p>
            </div>

            <h3 className="sub-section-title">B. Pendeteksian Kebakaran Hutan Menggunakan WSN</h3>
            <p>
              Dalam melacak sumber asap di cagar alam yang luas, penempatan titik Wireless Sensor Network (WSN) dirancang dengan prinsip Dominasi-Lokasi:
            </p>
            <div className="variations-grid">
              {[
                { 
                  title: '1. Efisiensi Biaya Perangkat', 
                  desc: 'Mengurangi jumlah perangkat sensor fisik yang harus dipasang di hutan belantara dengan tetap menjamin seluruh area tercakup.' 
                },
                { 
                  title: '2. Presisi Koordinat Geografis', 
                  desc: 'Kombinasi kekuatan sinyal dan waktu tiba (Time of Arrival) menghasilkan koordinat jarak unik yang langsung memetakan lokasi tepat kebakaran.' 
                },
                { 
                  title: '3. Deteksi Kerusakan Sensor Mandiri', 
                  desc: 'Jika salah satu sensor super mati atau baterainya habis, anomali koordinat sinyal segera terdeteksi oleh sistem pengawas sentral.' 
                }
              ].map((item, idx) => (
                <div className="variation" key={idx}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="sub-section-title">C. Keamanan Siber & Pemantauan Lalu Lintas Jaringan</h3>
            <p>
              Pada infrastruktur server komputasi awan (cloud), sensor super diterapkan pada router gerbang utama untuk mendeteksi intrusi (IDS):
            </p>
            <div className="applications-grid">
              {[
                { icon: faUserShield, title: 'Filter Firewall', desc: 'Menentukan router kunci yang wajib memfilter paket data agar serangan DDoS atau worm tidak menyebar.' },
                { icon: faNetworkWired, title: 'Isolasi Otomatis', desc: 'Mengidentifikasi secara presisi simpul komputer yang terinfeksi berdasarkan anomali jarak paket data.' },
                { icon: faChartLine, title: 'Optimasi Routing', desc: 'Menjamin alur rute transfer data tidak mengalami kemacetan dengan jalur navigasi berdimensi metrik optimal.' }
              ].map((app, idx) => (
                <div className="application-item" key={idx}>
                  <FontAwesomeIcon icon={app.icon} className="app-icon" />
                  <h4>{app.title}</h4>
                  <p>{app.desc}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
          
        </main>
      </div>

      {/* Official Academic Footer */}
      <Footer />
    </div>
  );
};

export default Materi;