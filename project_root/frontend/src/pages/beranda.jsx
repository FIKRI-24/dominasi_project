import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faProjectDiagram,
  faFlask,
  faTasks,
  faShieldAlt,
  faCompass,
  faArrowRight,
  faCheckCircle,
  faExclamationTriangle,
  faRedo,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import './assets/beranda.css';

// Data graf demonstrasi interaktif untuk Hero Section
const DEMO_GRAPH = {
  nodes: [
    { id: 'v1', x: 190, y: 50, label: 'v1' },
    { id: 'v2', x: 80, y: 120, label: 'v2' },
    { id: 'v3', x: 120, y: 200, label: 'v3' },
    { id: 'v4', x: 260, y: 200, label: 'v4' },
    { id: 'v5', x: 300, y: 120, label: 'v5' }
  ],
  edges: [
    ['v1', 'v2'], ['v2', 'v3'], ['v3', 'v4'], ['v4', 'v5'], ['v5', 'v1'],
    ['v1', 'v3'], ['v1', 'v4']
  ],
  adjacency: {
    v1: ['v1', 'v2', 'v3', 'v4', 'v5'],
    v2: ['v2', 'v1', 'v3'],
    v3: ['v3', 'v2', 'v4', 'v1'],
    v4: ['v4', 'v3', 'v5', 'v1'],
    v5: ['v5', 'v4', 'v1']
  }
};

const Beranda = () => {
  // State himpunan sensor yang dipilih di simulasi hero
  const [selectedSensors, setSelectedSensors] = useState(['v1']);

  // Toggle simpul sebagai sensor
  const toggleSensor = (nodeId) => {
    setSelectedSensors((prev) =>
      prev.includes(nodeId)
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const resetSensors = () => {
    setSelectedSensors(['v1']);
  };

  // Hitung simpul yang terawasi/terdominasi
  const monitoredNodes = useMemo(() => {
    const set = new Set();
    selectedSensors.forEach((sId) => {
      const neighbors = DEMO_GRAPH.adjacency[sId] || [];
      neighbors.forEach((nId) => set.add(nId));
    });
    return set;
  }, [selectedSensors]);

  const isFullyDominated = monitoredNodes.size === DEMO_GRAPH.nodes.length;

  return (
    <div className="berandaContainer">
      <Navbar />

      {/* ==================================================================
          1. HERO SECTION (Consistent Royal-Blue Theme matching Materi, Contoh, Coba)
          ================================================================== */}
      <div className="heroWrapper">
        <section className="heroSection">
          <div className="heroGrid">
            {/* Kolom Kiri: Headline & Value Proposition */}
            <div className="heroContent">
              <div className="heroEyebrow">
                <FontAwesomeIcon icon={faProjectDiagram} />
                <span>Laboratorium Interaktif Riset Graf & Jaringan</span>
              </div>

              <h1 className="heroTitle">
                Eksplorasi Simpul, Sisi, dan{' '}
                <span className="heroTitleHighlight">Sensor Dominasi-Lokasi</span>
              </h1>

              <p className="heroSubtitle">
                Media pembelajaran interaktif berbasis web untuk memahami konsep teori graf, himpunan pembeda metrik,
                bilangan dominasi, serta optimalisasi penempatan sensor navigasi jaringan secara presisi.
              </p>

              <div className="heroActions">
                <Link to="/materi" className="primaryCta" title="Buka kurikulum materi teori graf">
                  <span>Mulai Belajar Materi</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <Link to="/coba" className="secondaryCta" title="Buka laboratorium uji coba graf">
                  <FontAwesomeIcon icon={faFlask} />
                  <span>Buka Lab Graf</span>
                </Link>
              </div>

              <div className="heroHighlights">
                <div className="highlightItem">
                  <FontAwesomeIcon icon={faCheckCircle} className="highlightIcon" />
                  <span>14 Bab Teori Komprehensif</span>
                </div>
                <div className="highlightItem">
                  <FontAwesomeIcon icon={faCheckCircle} className="highlightIcon" />
                  <span>Evaluasi Matriks Graf Otomatis</span>
                </div>
                <div className="highlightItem">
                  <FontAwesomeIcon icon={faCheckCircle} className="highlightIcon" />
                  <span>Kuis & Uji Skor Interaktif</span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Frosted White Interactive Graph Card */}
            <div className="heroWidgetWrapper">
              <div className="interactiveGraphCard">
                <div className="widgetHeader">
                  <div className="widgetTitleGroup">
                    <h3 className="widgetTitle">Simulasi Interaktif Sensor Graf G</h3>
                    <p className="widgetSubtitle">Klik pada simpul untuk memasang atau mencabut sensor</p>
                  </div>
                  <span className="widgetBadge">Klik & Uji</span>
                </div>

                {/* Area SVG Graf */}
                <div className="graphCanvasContainer">
                  <svg viewBox="0 0 380 250" className="interactiveSvg">
                    {/* Garis Sisi Graf */}
                    {DEMO_GRAPH.edges.map(([uId, vId], idx) => {
                      const u = DEMO_GRAPH.nodes.find((n) => n.id === uId);
                      const v = DEMO_GRAPH.nodes.find((n) => n.id === vId);
                      const isMonitoredEdge =
                        selectedSensors.includes(uId) || selectedSensors.includes(vId);

                      return (
                        <line
                          key={`edge-${idx}`}
                          x1={u.x}
                          y1={u.y}
                          x2={v.x}
                          y2={v.y}
                          className={isMonitoredEdge ? 'graphEdgeMonitored' : 'graphEdge'}
                        />
                      );
                    })}

                    {/* Simpul Graf Interaktif */}
                    {DEMO_GRAPH.nodes.map((node) => {
                      const isSensor = selectedSensors.includes(node.id);
                      const isMonitored = monitoredNodes.has(node.id);

                      // Skema warna simpul pada kartu graf putih
                      let fillColor = '#ffffff';
                      let strokeColor = '#94a3b8';
                      let strokeWidth = 2.5;
                      let textColor = '#475569';

                      if (isSensor) {
                        fillColor = '#1e40af';
                        strokeColor = '#3b82f6';
                        strokeWidth = 3.5;
                        textColor = '#ffffff';
                      } else if (isMonitored) {
                        fillColor = '#eff6ff';
                        strokeColor = '#2563eb';
                        strokeWidth = 2.5;
                        textColor = '#1e40af';
                      }

                      return (
                        <g
                          key={node.id}
                          className="interactiveNode"
                          onClick={() => toggleSensor(node.id)}
                        >
                          {/* Aura glow untuk sensor aktif */}
                          {isSensor && (
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={26}
                              fill="#3b82f6"
                              opacity={0.18}
                            />
                          )}
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={18}
                            fill={fillColor}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            className="nodeCircle"
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fill={textColor}
                            className="nodeLabel"
                          >
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Status & Kontrol Widget */}
                <div className="widgetFooter">
                  <div className="statusRow">
                    <div className={`statusIndicator ${isFullyDominated ? 'success' : 'warning'}`}>
                      <FontAwesomeIcon
                        icon={isFullyDominated ? faCheckCircle : faExclamationTriangle}
                      />
                      <span>
                        {isFullyDominated
                          ? 'Seluruh Graf Terdominasi (Aman)'
                          : `${DEMO_GRAPH.nodes.length - monitoredNodes.size} Simpul Belum Terawasi`}
                      </span>
                    </div>

                    <span className="sensorSetPill">
                      S = &#123;{selectedSensors.length > 0 ? selectedSensors.join(', ') : '∅'}&#125;
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={resetSensors}
                    className="resetBtn"
                    title="Kembalikan ke konfigurasi dominasi optimal"
                  >
                    <FontAwesomeIcon icon={faRedo} style={{ marginRight: '4px' }} />
                    Kembalikan ke S = &#123;v1&#125; (Optimal γ=1)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ==================================================================
          2. CONCEPTS SECTION (Fondasi Teori Graf)
          ================================================================== */}
      <section className="conceptsSection">
        <div className="sectionHeader">
          <span className="sectionEyebrow">Prinsip Keilmuan</span>
          <h2 className="sectionHeading">Fondasi Teori Graf yang Dipelajari</h2>
          <p className="sectionDescription">
            Memahami bagaimana matematika diskrit diaplikasikan untuk menyelesaikan masalah nyata dalam
            keamanan sistem dan penempatan sensor jaringan komputer.
          </p>
        </div>

        <div className="conceptsGrid">
          <div className="conceptCard">
            <div className="conceptIconWrapper">
              <FontAwesomeIcon icon={faShieldAlt} />
            </div>
            <h3 className="conceptTitle">1. Himpunan Penjaga (Dominasi)</h3>
            <p className="conceptDescription">
              Menjamin setiap simpul yang tidak ditempati sensor tetap berada tepat di dekat (radius jarak d ≤ 1)
              dari minimal satu sensor pengawas.
            </p>
          </div>

          <div className="conceptCard">
            <div className="conceptIconWrapper">
              <FontAwesomeIcon icon={faCompass} />
            </div>
            <h3 className="conceptTitle">2. Landmark Navigasi (Pembeda)</h3>
            <p className="conceptDescription">
              Memberikan koordinat vektor jarak unik bagi setiap simpul di graf, sehingga posisi setiap titik dapat
              dikenali secara akurat melalui pembacaan sensor.
            </p>
          </div>

          <div className="conceptCard">
            <div className="conceptIconWrapper">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <h3 className="conceptTitle">3. Sensor Super (Dominasi-Lokasi)</h3>
            <p className="conceptDescription">
              Kombinasi efisien antara daya proteksi dominasi dan identifikasi posisi metrik untuk deteksi gangguan
              titik jaringan secara instan dan hemat sumber daya.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. FEATURES SECTION (4 Core Modules)
          ================================================================== */}
      <section className="featuresSection">
        <div className="sectionHeader">
          <span className="sectionEyebrow">Eksplorasi Modul</span>
          <h2 className="sectionHeading">Akses Modul Pembelajaran Interaktif</h2>
          <p className="sectionDescription">
            Jelajahi materi, telusuri galeri graf, jalankan lab eksperimen, dan uji kemampuan pemahaman Anda.
          </p>
        </div>

        <div className="featuresGrid">
          <Link to="/materi" className="featureCard">
            <div className="featureCardHeader">
              <span className="featureBadge">Modul 01</span>
              <div className="featureIconWrapper">
                <FontAwesomeIcon icon={faBook} />
              </div>
            </div>
            <h3 className="featureTitle">Materi Terstruktur</h3>
            <p className="featureDescription">
              14 bab pembelajaran komprehensif mulai dari definisi dasar graf hingga teorema karakterisasi
              pohon dan graf unisiklik.
            </p>
            <div className="featureLinkAction">
              <span>Buka Materi</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>

          <Link to="/contoh" className="featureCard">
            <div className="featureCardHeader">
              <span className="featureBadge">Modul 02</span>
              <div className="featureIconWrapper">
                <FontAwesomeIcon icon={faProjectDiagram} />
              </div>
            </div>
            <h3 className="featureTitle">Galeri Contoh Graf</h3>
            <p className="featureDescription">
              Visualisasi siap pakai aneka famili graf: lintasan, siklus, bintang, pohon, bipartit lengkap,
              hingga operasi korona.
            </p>
            <div className="featureLinkAction">
              <span>Lihat Galeri</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>

          <Link to="/coba" className="featureCard">
            <div className="featureCardHeader">
              <span className="featureBadge">Modul 03</span>
              <div className="featureIconWrapper">
                <FontAwesomeIcon icon={faFlask} />
              </div>
            </div>
            <h3 className="featureTitle">Lab Eksperimen Graf</h3>
            <p className="featureDescription">
              Uji coba mandiri penempatan sensor pada graf interaktif dan dapatkan evaluasi bilangan dominasi
              serta pembeda secara instan.
            </p>
            <div className="featureLinkAction">
              <span>Buka Laboratorium</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>

          <Link to="/latihan" className="featureCard">
            <div className="featureCardHeader">
              <span className="featureBadge">Modul 04</span>
              <div className="featureIconWrapper">
                <FontAwesomeIcon icon={faTasks} />
              </div>
            </div>
            <h3 className="featureTitle">Latihan Soal & Kuis</h3>
            <p className="featureDescription">
              Paket latihan bertingkat lengkap dengan blueprint graf dinamis, pembahasan bertahap, dan kalkulasi
              skor evaluasi.
            </p>
            <div className="featureLinkAction">
              <span>Mulai Latihan</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>
        </div>
      </section>

      {/* ==================================================================
          4. ACADEMIC FOOTER DENGAN LOGO RESMI UPGRISBA
          ================================================================== */}
      <Footer />
    </div>
  );
};

export default Beranda;
