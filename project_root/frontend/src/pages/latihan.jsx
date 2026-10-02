import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faRedo,
  faCheck,
  faTimes,
  faLayerGroup,
  faChevronRight,
  faCompass,
  faLightbulb,
  faTerminal,
  faKeyboard,
  faCheckCircle,
  faTimesCircle,
  faAward,
  faUserGraduate,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import styles from './assets/latihan.module.css';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { API_BASE } from '../config/api';

// ── Komponen Kanvas Blueprint Graf Dinamis ──
const BlueprintGraphCanvas = ({ graphData, fallbackPkgId, fallbackQIdx, questionText }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Parse data graf jika tersedia
  const parsedData = useMemo(() => {
    if (!graphData) return null;
    try {
      if (typeof graphData === 'string') return JSON.parse(graphData);
      if (typeof graphData === 'object') return graphData;
    } catch (e) {
      return null;
    }
    return null;
  }, [graphData]);

  // Fallback graf kurikulum bawaan jika soal belum memiliki JSON graf eksplisit
  const fallbackGraph = useMemo(() => {
    if (parsedData) return null;

    if (fallbackPkgId === 1 && fallbackQIdx === 0) {
      return {
        viewBox: '0 0 240 100',
        nodes: [
          { id: 'v1', x: 40, y: 50, label: 'v1' },
          { id: 'v2', x: 120, y: 25, label: 'v2' },
          { id: 'v3', x: 200, y: 50, label: 'v3' }
        ],
        edges: [['v1', 'v2'], ['v2', 'v3']],
        highlights: []
      };
    }
    if (fallbackPkgId === 1 && fallbackQIdx === 1) {
      return {
        viewBox: '0 0 240 110',
        nodes: [
          { id: 'v1', x: 60, y: 30, label: 'v1' },
          { id: 'v2', x: 180, y: 30, label: 'v2' },
          { id: 'v3', x: 120, y: 85, label: 'v3' }
        ],
        edges: [['v1', 'v2'], ['v2', 'v3'], ['v1', 'v3']],
        highlights: []
      };
    }
    if (fallbackPkgId === 3 && fallbackQIdx === 2) {
      return {
        viewBox: '0 0 300 80',
        nodes: [
          { id: 'v1', x: 30, y: 40, label: 'v1' },
          { id: 'v2', x: 90, y: 40, label: 'v2' },
          { id: 'v3', x: 150, y: 40, label: 'v3' },
          { id: 'v4', x: 210, y: 40, label: 'v4' },
          { id: 'v5', x: 270, y: 40, label: 'v5' }
        ],
        edges: [['v1', 'v2'], ['v2', 'v3'], ['v3', 'v4'], ['v4', 'v5']],
        highlights: ['v2', 'v5']
      };
    }
    if (fallbackPkgId === 3 && fallbackQIdx === 3) {
      return {
        viewBox: '0 0 220 150',
        nodes: [
          { id: 'v1', x: 110, y: 20, label: 'v1' },
          { id: 'v2', x: 40, y: 65, label: 'v2' },
          { id: 'v3', x: 65, y: 130, label: 'v3' },
          { id: 'v4', x: 155, y: 130, label: 'v4' },
          { id: 'v5', x: 180, y: 65, label: 'v5' }
        ],
        edges: [
          ['v1', 'v2'], ['v2', 'v3'], ['v3', 'v4'], ['v4', 'v5'], ['v5', 'v1'],
          ['v1', 'v3'], ['v1', 'v4'], ['v2', 'v4'], ['v2', 'v5'], ['v3', 'v5']
        ],
        highlights: ['v1']
      };
    }
    if (fallbackPkgId === 3 && fallbackQIdx === 7) {
      return {
        viewBox: '0 0 220 160',
        nodes: [
          { id: 'c', x: 110, y: 80, label: 'c' },
          { id: 'v1', x: 110, y: 22, label: 'v1' },
          { id: 'v2', x: 165, y: 50, label: 'v2' },
          { id: 'v3', x: 165, y: 110, label: 'v3' },
          { id: 'v4', x: 110, y: 138, label: 'v4' },
          { id: 'v5', x: 55, y: 110, label: 'v5' },
          { id: 'v6', x: 55, y: 50, label: 'v6' }
        ],
        edges: [
          ['c', 'v1'], ['c', 'v2'], ['c', 'v3'], ['c', 'v4'], ['c', 'v5'], ['c', 'v6'],
          ['v1', 'v2'], ['v2', 'v3'], ['v3', 'v4'], ['v4', 'v5'], ['v5', 'v6'], ['v6', 'v1']
        ],
        highlights: ['c']
      };
    }
    return null;
  }, [parsedData, fallbackPkgId, fallbackQIdx]);

  const activeGraph = parsedData || fallbackGraph;

  if (!activeGraph || !activeGraph.nodes || activeGraph.nodes.length === 0) {
    return (
      <div className={styles.blueprintCanvasWrapper} style={{ minHeight: 120, justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FontAwesomeIcon icon={faCompass} />
          <span>Analisis Logika / Teorema Murni (Tanpa Diagram Graf)</span>
        </div>
      </div>
    );
  }

  const { nodes, edges = [], highlights = [] } = activeGraph;
  const viewBox = activeGraph.viewBox || '0 0 320 160';

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  const isEdgeConnectedToHover = (edge) => {
    if (!hoveredNode) return false;
    const u = edge.source || edge[0];
    const v = edge.target || edge[1];
    return u === hoveredNode || v === hoveredNode;
  };

  return (
    <div className={styles.blueprintCanvasWrapper}>
      <svg 
        viewBox={typeof viewBox === 'string' ? viewBox : `${viewBox.x || 0} ${viewBox.y || 0} ${viewBox.width || 320} ${viewBox.height || 160}`} 
        className={styles.blueprintSvg}
        style={{ width: '100%', maxHeight: 220 }}
      >
        {/* Render Sisi / Edges */}
        <g stroke="#334155" strokeWidth="2.5" strokeLinecap="round">
          {edges.map((e, idx) => {
            const uId = e.source || e[0];
            const vId = e.target || e[1];
            const u = nodeMap[uId];
            const v = nodeMap[vId];
            if (!u || !v) return null;

            const isHovered = isEdgeConnectedToHover(e);
            return (
              <line
                key={`edge-${idx}`}
                x1={u.x}
                y1={u.y}
                x2={v.x}
                y2={v.y}
                stroke={isHovered ? '#1e40af' : '#94a3b8'}
                strokeWidth={isHovered ? 3.5 : 2.5}
                style={{ transition: 'all 0.15s ease' }}
              />
            );
          })}
        </g>

        {/* Render Simpul / Nodes */}
        {nodes.map((node) => {
          const isHighlight = highlights.includes(node.id);
          const isHovered = hoveredNode === node.id;
          
          let circleFill = '#ffffff';
          let circleStroke = '#1e40af';
          let textFill = '#1e40af';

          if (isHighlight) {
            circleFill = '#ecfdf5';
            circleStroke = '#059669';
            textFill = '#047857';
          }
          if (isHovered) {
            circleStroke = '#2563eb';
            circleFill = isHighlight ? '#d1fae5' : '#eff6ff';
          }

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <circle
                r={isHovered ? 16 : 14}
                fill={circleFill}
                stroke={circleStroke}
                strokeWidth={isHighlight || isHovered ? 3 : 2.5}
                style={{ transition: 'all 0.15s ease' }}
              />
              <text
                textAnchor="middle"
                dy="0.32em"
                fontSize={node.label && node.label.length > 2 ? 9 : 11}
                fontFamily="var(--font-mono)"
                fontWeight="700"
                fill={textFill}
                pointerEvents="none"
              >
                {node.label || node.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Metadata Bar Topologi */}
      <div className={styles.canvasFooterMetrics}>
        <div className={styles.metricBadge}>
          <span style={{ color: 'var(--cyan-accent)' }}>|V| = {nodes.length} Simpul</span>
          <span>·</span>
          <span style={{ color: 'var(--cyan-accent)' }}>|E| = {edges.length} Sisi</span>
        </div>
        <div>
          {highlights.length > 0 && (
            <span style={{ color: 'var(--emerald-accent)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald-accent)' }}></span>
              Himpunan Sensor/Dominan S = {'{'}{highlights.join(', ')}{'}'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Komponen Utama Halaman Latihan ──
const Latihan = () => {
  const { user, token, isAuthenticated } = useAuth();

  // Data state
  const [packages, setPackages] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Workspace state
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Quiz evaluation state per question
  const [userAnswers, setUserAnswers] = useState({}); // { [qIdx]: { selected, correct_index, explanation, is_correct, is_checked } }
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [attemptSaved, setAttemptSaved] = useState(false);

  // Auth gate modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingPackage, setPendingPackage] = useState(null);

  // Filters & Tabs
  const [categoryFilter, setCategoryFilter] = useState('');
  const [reportTab, setReportTab] = useState('all'); // 'all' | 'correct' | 'wrong'

  // Fetch semua paket latihan saat dimuat
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setApiLoading(true);
        const res = await fetch(`${API_BASE}/packages`);
        if (!res.ok) throw new Error('Gagal mengambil daftar paket dari server.');
        const data = await res.json();
        setPackages(data.data || []);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setApiLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Fetch butir soal saat paket dipilih
  const fetchQuestions = useCallback(async (pkgId) => {
    try {
      setQuestionsLoading(true);
      const res = await fetch(`${API_BASE}/packages/${pkgId}/questions`);
      if (!res.ok) throw new Error('Gagal memuat butir soal.');
      const data = await res.json();
      setActiveQuestions(data.data.questions || []);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setQuestionsLoading(false);
    }
  }, []);

  // Mulai pengerjaan paket latihan
  const startPractice = (pkg) => {
    setSelectedPackage(pkg);
    fetchQuestions(pkg.id);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers({});
    setShowResults(false);
    setAttemptSaved(false);
  };

  // Pilih paket latihan (Auth Gate Interceptor)
  const handleSelectPackage = (pkg) => {
    if (!isAuthenticated) {
      setPendingPackage(pkg);
      setShowAuthModal(true);
      return;
    }
    startPractice(pkg);
  };

  // Callback setelah login sukses dari Auth Modal
  const handleAuthSuccess = () => {
    if (pendingPackage) {
      startPractice(pendingPackage);
      setPendingPackage(null);
    }
  };

  // Navigasi ke nomor soal tertentu dalam matriks
  const handleJumpToQuestion = (idx) => {
    setCurrentIndex(idx);
    const existing = userAnswers[idx];
    if (existing) {
      setSelectedOption(existing.selected);
    } else {
      setSelectedOption(null);
    }
  };

  // Pilih opsi jawaban
  const handleSelectOption = (optIndex) => {
    const isAlreadyChecked = userAnswers[currentIndex]?.is_checked;
    if (isAlreadyChecked) return; // Kunci opsi jika sudah diperiksa
    setSelectedOption(optIndex);
  };

  // Periksa jawaban via endpoint /submit (grading server anti-cheat)
  const handleCheckAnswer = async () => {
    if (selectedOption === null || isSubmitting) return;
    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;

    try {
      setIsSubmitting(true);
      const payload = {
        answers: {
          [currentQ.id]: selectedOption,
          [currentIndex]: selectedOption
        }
      };

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/packages/${selectedPackage.id}/submit`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // Ambil hasil verifikasi untuk soal yang sedang aktif berdasarkan ID unik
      const result = (data.data.results && data.data.results.find(r => r.question_id === currentQ.id))
        || data.data.results[currentIndex]
        || data.data.results[0];
      const isCorrect = result.is_correct;

      setUserAnswers((prev) => ({
        ...prev,
        [currentIndex]: {
          selected: selectedOption,
          correct_index: result.correct_index,
          explanation: result.explanation,
          is_correct: isCorrect,
          is_checked: true
        }
      }));
    } catch (err) {
      console.error('Error submitting answer:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simpan seluruh pengerjaan secara permanen ke database saat selesai
  const finishQuizAndSaveAttempt = async () => {
    try {
      const allAnswers = {};
      const currentQ = activeQuestions[currentIndex];

      activeQuestions.forEach((q, idx) => {
        const a = userAnswers[idx];
        if (a && a.selected !== undefined && a.selected !== null) {
          allAnswers[q.id] = a.selected;
          allAnswers[idx] = a.selected;
        }
      });
      if (currentQ && selectedOption !== null) {
        allAnswers[currentQ.id] = selectedOption;
        allAnswers[currentIndex] = selectedOption;
      }

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}/packages/${selectedPackage.id}/submit`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ answers: allAnswers, is_final: true })
      });
      const data = await res.json();
      if (data.success && data.data.is_saved) {
        setAttemptSaved(true);
      }
    } catch (err) {
      console.warn('Gagal merekam sesi attempt akhir:', err);
    } finally {
      setShowResults(true);
    }
  };

  // Pindah ke soal berikutnya atau selesaikan kuis
  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      handleJumpToQuestion(currentIndex + 1);
    } else {
      finishQuizAndSaveAttempt();
    }
  };

  // Reset & kembali ke katalog paket
  const handleBackToCatalog = () => {
    setSelectedPackage(null);
    setActiveQuestions([]);
    setUserAnswers({});
    setShowResults(false);
    setCurrentIndex(0);
    setAttemptSaved(false);
  };

  // Dukungan Keyboard Shortcut (Tactile & Cepat)
  useEffect(() => {
    if (!selectedPackage || showResults || activeQuestions.length === 0) return;

    const handleKeyDown = (e) => {
      // Abaikan jika sedang mengetik di input form lain
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      const isCurrentChecked = userAnswers[currentIndex]?.is_checked;

      if (!isCurrentChecked) {
        if (key === 'A' || key === '1') handleSelectOption(0);
        else if (key === 'B' || key === '2') handleSelectOption(1);
        else if (key === 'C' || key === '3') handleSelectOption(2);
        else if (key === 'D' || key === '4') handleSelectOption(3);
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (!isCurrentChecked && selectedOption !== null) {
          handleCheckAnswer();
        } else if (isCurrentChecked) {
          handleNextQuestion();
        }
      }

      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleJumpToQuestion(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < activeQuestions.length - 1) {
        handleJumpToQuestion(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPackage, showResults, activeQuestions, currentIndex, selectedOption, userAnswers]);

  // Kalkulasi statistik skor
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.values(userAnswers).filter((a) => a.is_correct).length;
  const accuracyPercentage = activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;

  // Daftar kategori unik untuk filter
  const categories = useMemo(() => {
    return Array.from(new Set(packages.map((p) => p.category).filter(Boolean)));
  }, [packages]);

  const filteredPackages = useMemo(() => {
    if (!categoryFilter) return packages;
    return packages.filter((p) => p.category === categoryFilter);
  }, [packages, categoryFilter]);

  // Current active question
  const currentQuestion = activeQuestions[currentIndex];
  const currentAnswerState = userAnswers[currentIndex];
  const isCurrentChecked = !!currentAnswerState?.is_checked;

  // ── RENDER 1: KATALOG PAKET LATIHAN ──
  const renderCatalog = () => (
    <div>
      <header className={styles.catalogHeader}>
        <div className={styles.catalogEyebrow}>
          <FontAwesomeIcon icon={faTerminal} />
          <span>Laboratorium Teori Graf · Modul Latihan Terstruktur</span>
        </div>
        <h1 className={styles.catalogTitle}>Pilih Modul Uji Analitis</h1>
        <p className={styles.catalogSubtitle}>
          Uji pemahaman komprehensif struktur graf, representasi matriks ketetanggaan, dan bilangan dominasi melalui bank soal terverifikasi.
        </p>
      </header>

      {/* Filter Klasifikasi Topik */}
      <div className={styles.topicFilterBar}>
        <span className={styles.filterLabel}>Klasifikasi:</span>
        <button
          className={`${styles.filterChip} ${!categoryFilter ? styles.filterChipActive : ''}`}
          onClick={() => setCategoryFilter('')}
        >
          Semua Modul ({packages.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterChip} ${categoryFilter === cat ? styles.filterChipActive : ''}`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {apiLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          ⏳ Menghubungkan ke basis data paket...
        </div>
      ) : apiError ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--ruby-accent)', background: 'var(--bg-surface)', borderRadius: 8, border: '1px solid #7f1d1d' }}>
          ❌ {apiError} — Pastikan backend Express berjalan di port 5000.
        </div>
      ) : filteredPackages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Belum ada paket latihan pada topik ini.
        </div>
      ) : (
        <div className={styles.catalogGrid}>
          {filteredPackages.map((pkg) => {
            const count = pkg.question_count || 0;
            const target = pkg.target_questions || 10;
            const diffClass =
              pkg.difficulty === 'Intermediate'
                ? styles.difficultyIntermediate
                : pkg.difficulty === 'Advanced'
                ? styles.difficultyAdvanced
                : styles.difficultyBeginner;

            return (
              <div key={pkg.id} className={styles.packageCard} onClick={() => handleSelectPackage(pkg)}>
                <div className={styles.packageCardHeader}>
                  <div className={styles.packageIdentity}>
                    <div className={styles.packageIconBadge}>{pkg.icon || '📊'}</div>
                    <div>
                      <span className={styles.packageCategoryBadge}>{pkg.category || 'Teori Graf'}</span>
                      <h2 className={styles.packageCardTitle}>{pkg.title}</h2>
                    </div>
                  </div>
                  <span className={`${styles.packageDifficultyBadge} ${diffClass}`}>{pkg.difficulty}</span>
                </div>

                <p className={styles.packageDescription}>{pkg.description || 'Tidak ada deskripsi rinci untuk modul ini.'}</p>

                <div className={styles.packageTelemetry}>
                  <span className={styles.telemetryMetric}>
                    {count} dari {target} Soal Tersedia
                  </span>
                  <span className={styles.telemetryAction}>
                    Buka Studio <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ── RENDER 2: WORKBENCH PENGERJAAN SOAL (SPLIT-SCREEN STUDIO) ──
  const renderWorkbench = () => {
    if (questionsLoading) {
      return (
        <div style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          ⏳ Menyiapkan kanvas analitis graf dan instrumen evaluasi...
        </div>
      );
    }

    if (!currentQuestion) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          Paket latihan ini belum memiliki butir soal aktif.
          <div style={{ marginTop: '1rem' }}>
            <button className={styles.backBtn} onClick={handleBackToCatalog}>
              ← Kembali ke Katalog
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* Top Navigation Console */}
        <div className={styles.topConsole}>
          <div className={styles.consoleLeft}>
            <button className={styles.backBtn} onClick={handleBackToCatalog} title="Kembali ke Daftar Paket">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Katalog</span>
            </button>
            <div className={styles.moduleBreadcrumb}>
              <span className={styles.breadcrumbCategory}>{selectedPackage?.category || 'Teori Graf'}</span>
              <h2 className={styles.breadcrumbTitle}>{selectedPackage?.title}</h2>
            </div>
          </div>

          {/* Navigasi Matriks Nomor Soal */}
          <div className={styles.matrixNav}>
            {activeQuestions.map((_, idx) => {
              const state = userAnswers[idx];
              const isActive = idx === currentIndex;
              let slotClass = styles.matrixSlot;
              if (isActive) slotClass += ` ${styles.matrixSlotActive}`;
              else if (state?.is_checked) {
                slotClass += state.is_correct ? ` ${styles.matrixSlotCorrect}` : ` ${styles.matrixSlotIncorrect}`;
              }

              return (
                <button
                  key={idx}
                  className={slotClass}
                  onClick={() => handleJumpToQuestion(idx)}
                  title={`Soal nomor ${idx + 1}`}
                >
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  {state?.is_checked && (
                    <span className={`${styles.matrixStatusDot} ${state.is_correct ? styles.dotCorrect : styles.dotIncorrect}`} />
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.consoleRight}>
            <div className={styles.accuracyGauge}>
              <span>Terjawab:</span>
              <span className={styles.accuracyVal}>
                {answeredCount}/{activeQuestions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Dual Column Workspace Grid */}
        <div className={styles.splitWorkbench}>
          {/* Kolom Kiri: Dokumen Soal & Kanvas Blueprint Graf */}
          <section className={styles.documentPane}>
            <div className={styles.problemMetaHeader}>
              <span className={styles.problemNumberBadge}>
                MASALAH #{String(currentIndex + 1).padStart(2, '0')} DARI {String(activeQuestions.length).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                Bobot: 1 Poin Analitis
              </span>
            </div>

            <p className={styles.problemStatementText}>{currentQuestion.question_text}</p>

            {/* Kanvas Graf Interaktif */}
            <BlueprintGraphCanvas
              graphData={currentQuestion.graph_data}
              fallbackPkgId={selectedPackage?.id}
              fallbackQIdx={currentIndex}
              questionText={currentQuestion.question_text}
            />
          </section>

          {/* Kolom Kanan: Deck Deduksi & Pilihan Proposisi */}
          <section className={styles.deductionPane}>
            <div className={styles.deductionHeader}>
              <h3 className={styles.deductionTitle}>Pilih Proposisi Logika</h3>
              <span className={styles.hotkeyHint}>
                <FontAwesomeIcon icon={faKeyboard} style={{ marginRight: 4 }} />
                [A/B/C/D] Pilih · [Enter] Cek
              </span>
            </div>

            {/* Daftar Opsi Jawaban */}
            <div className={styles.propositionList}>
              {currentQuestion.options.map((opt, oIndex) => {
                const isSelected = selectedOption === oIndex;
                let cardClass = styles.propositionCard;

                if (isCurrentChecked) {
                  cardClass += ` ${styles.cardDisabled}`;
                  if (oIndex === currentAnswerState.correct_index) {
                    cardClass += ` ${styles.cardCorrect}`;
                  } else if (isSelected && !currentAnswerState.is_correct) {
                    cardClass += ` ${styles.cardIncorrect}`;
                  }
                } else if (isSelected) {
                  cardClass += ` ${styles.cardSelected}`;
                }

                return (
                  <div
                    key={`opt-${currentIndex}-${oIndex}`}
                    className={cardClass}
                    onClick={() => handleSelectOption(oIndex)}
                  >
                    <div className={styles.propositionKey}>{String.fromCharCode(65 + oIndex)}</div>
                    <div className={styles.propositionText}>{opt}</div>
                    {isCurrentChecked && oIndex === currentAnswerState.correct_index && (
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--emerald-accent)', marginLeft: 'auto' }} />
                    )}
                    {isCurrentChecked && isSelected && !currentAnswerState.is_correct && (
                      <FontAwesomeIcon icon={faTimes} style={{ color: 'var(--ruby-accent)', marginLeft: 'auto' }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tombol Aksi Kontrol */}
            <div className={styles.actionControlDeck}>
              {!isCurrentChecked ? (
                <button
                  className={styles.submitActionBtn}
                  disabled={selectedOption === null || isSubmitting}
                  onClick={handleCheckAnswer}
                >
                  <FontAwesomeIcon icon={faCheck} />
                  <span>{isSubmitting ? 'Memverifikasi...' : 'Periksa Solusi (Enter)'}</span>
                </button>
              ) : (
                <button className={styles.nextActionBtn} onClick={handleNextQuestion}>
                  <span>{currentIndex === activeQuestions.length - 1 ? 'Buka Laporan Hasil Akhir' : 'Lanjut ke Soal Berikutnya'}</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )}
            </div>

            {/* Panel Pembahasan & Bukti Formal (Unfolding saat selesai diperiksa) */}
            {isCurrentChecked && currentAnswerState && (
              <div className={styles.formalProofDrawer}>
                <div className={styles.drawerStatusHeader}>
                  {currentAnswerState.is_correct ? (
                    <span className={styles.statusCorrect}>
                      <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 6 }} />
                      Deduksi Tepat (Valid)
                    </span>
                  ) : (
                    <span className={styles.statusIncorrect}>
                      <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: 6 }} />
                      Kurang Tepat — Solusi Kunci: [{String.fromCharCode(65 + currentAnswerState.correct_index)}]
                    </span>
                  )}
                </div>
                <p className={styles.proofExplanationText}>
                  {currentAnswerState.explanation || 'Pembahasan analitis belum tersedia untuk butir soal ini.'}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    );
  };

  // ── RENDER 3: LAPORAN REKAPITULASI EVALUASI (ACADEMIC DEBRIEFING) ──
  const renderEvaluationReport = () => {
    const wrongCount = activeQuestions.length - correctCount;

    const filteredReviews = activeQuestions.filter((_, idx) => {
      const ans = userAnswers[idx];
      if (reportTab === 'correct') return ans?.is_correct;
      if (reportTab === 'wrong') return !ans?.is_correct;
      return true;
    });

    return (
      <div className={styles.evaluationReportContainer}>
        {/* 1. Hero Scorecard Terpadu (Anti-Monoton & Anti-Slop) */}
        <div className={styles.reportHeroCard}>
          <div className={styles.reportHeroTop}>
            <div className={styles.reportHeroInfo}>
              <div className={styles.catalogEyebrow}>
                <FontAwesomeIcon icon={faAward} />
                <span>Lembar Evaluasi & Akreditasi Logika</span>
              </div>
              <h1 className={styles.reportTitle}>
                Hasil Evaluasi: {selectedPackage?.title}
              </h1>
              <p className={styles.reportSubtitle}>
                Tinjauan komprehensif tingkat akurasi penalaran formal dan catatan bedah solusi graf per butir persoalan.
              </p>
              <div className={styles.reportMetaTags}>
                <span className={styles.metaBadge}>
                  <FontAwesomeIcon icon={faUserGraduate} style={{ marginRight: 6, color: 'var(--blue-accent)' }} />
                  Pelajar: <strong>{user?.name || 'Tamu'}</strong>
                </span>
                <span className={styles.metaBadge}>
                  <FontAwesomeIcon icon={faTerminal} style={{ marginRight: 6, color: 'var(--cyan-accent)' }} />
                  Topik: <strong>{selectedPackage?.category || 'Teori Graf'}</strong>
                </span>
                {attemptSaved && (
                  <span className={`${styles.metaBadge} ${styles.metaBadgeSuccess}`}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 6 }} />
                    Tersimpan Permanen di Database
                  </span>
                )}
              </div>
            </div>

            {/* Score Showcase Widget */}
            <div className={styles.reportScoreBox}>
              <div className={styles.scoreNumberWrapper}>
                <span
                  className={styles.scoreNumber}
                  style={{
                    color: accuracyPercentage >= 70 ? 'var(--emerald-accent)' : accuracyPercentage >= 50 ? 'var(--amber-accent)' : 'var(--ruby-accent)'
                  }}
                >
                  {accuracyPercentage}
                </span>
                <span className={styles.scoreUnit}>%</span>
              </div>
              <div
                className={styles.scorePredicateBadge}
                style={{
                  background: accuracyPercentage >= 80 ? '#ecfdf5' : accuracyPercentage >= 60 ? '#eff6ff' : '#fef2f2',
                  color: accuracyPercentage >= 80 ? '#065f46' : accuracyPercentage >= 60 ? '#1e40af' : '#991b1b',
                  borderColor: accuracyPercentage >= 80 ? '#a7f3d0' : accuracyPercentage >= 60 ? '#bfdbfe' : '#fecaca'
                }}
              >
                {accuracyPercentage >= 80
                  ? 'Deduksi Sangat Baik'
                  : accuracyPercentage >= 60
                  ? 'Pemahaman Baik'
                  : 'Perlu Pendalaman Konsep'}
              </div>
              <span className={styles.scoreRatioText}>
                {correctCount} dari {activeQuestions.length} Soal Dijawab Tepat
              </span>
            </div>
          </div>

          {/* Section Progress Bar & Metrik Terpadu */}
          <div className={styles.performanceSection}>
            <div className={styles.segmentedProgressBar} title={`Akurasi ${accuracyPercentage}%`}>
              <div
                className={styles.progressSegmentCorrect}
                style={{ width: `${accuracyPercentage}%` }}
              />
              <div
                className={styles.progressSegmentWrong}
                style={{ width: `${100 - accuracyPercentage}%` }}
              />
            </div>

            <div className={styles.metricsSummaryRow}>
              <div className={styles.summaryPill}>
                <span className={styles.summaryPillLabel}>Total Persoalan</span>
                <span className={styles.summaryPillValue}>{activeQuestions.length} Soal</span>
              </div>
              <div className={`${styles.summaryPill} ${styles.summaryPillCorrect}`}>
                <span className={styles.summaryPillLabel}>
                  <span className={styles.statusDotGreen}></span> Jawaban Tepat
                </span>
                <span className={styles.summaryPillValue}>{correctCount} Butir ({accuracyPercentage}%)</span>
              </div>
              <div className={`${styles.summaryPill} ${styles.summaryPillWrong}`}>
                <span className={styles.summaryPillLabel}>
                  <span className={styles.statusDotRed}></span> Perlu Evaluasi
                </span>
                <span className={styles.summaryPillValue}>{wrongCount} Butir ({100 - accuracyPercentage}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Filter Navigasi Segmented Control */}
        <div className={styles.filterSection}>
          <div className={styles.reviewFilterPills}>
            <button
              className={`${styles.filterPillBtn} ${reportTab === 'all' ? styles.filterPillActive : ''}`}
              onClick={() => setReportTab('all')}
            >
              <span>Semua Butir Soal</span>
              <span className={styles.filterPillCount}>{activeQuestions.length}</span>
            </button>
            <button
              className={`${styles.filterPillBtn} ${reportTab === 'correct' ? styles.filterPillActive : ''}`}
              onClick={() => setReportTab('correct')}
            >
              <FontAwesomeIcon icon={faCheck} style={{ color: '#059669', marginRight: 4 }} />
              <span>Jawaban Tepat</span>
              <span className={`${styles.filterPillCount} ${styles.countSuccess}`}>{correctCount}</span>
            </button>
            <button
              className={`${styles.filterPillBtn} ${reportTab === 'wrong' ? styles.filterPillActive : ''}`}
              onClick={() => setReportTab('wrong')}
            >
              <FontAwesomeIcon icon={faTimes} style={{ color: '#dc2626', marginRight: 4 }} />
              <span>Perlu Evaluasi</span>
              <span className={`${styles.filterPillCount} ${styles.countDanger}`}>{wrongCount}</span>
            </button>
          </div>
        </div>

        {/* 3. Daftar Tinjauan Soal (No Colored Side Border) */}
        <div className={styles.reviewList}>
          {filteredReviews.length === 0 ? (
            <div className={styles.emptyReviewState}>
              <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: '1.8rem', color: 'var(--text-muted)' }} />
              <p style={{ margin: 0 }}>Tidak ada butir soal pada kategori filter ini.</p>
            </div>
          ) : (
            filteredReviews.map((q) => {
              const originalIndex = activeQuestions.indexOf(q);
              const ans = userAnswers[originalIndex];
              const isCorrect = ans?.is_correct;

              return (
                <div
                  key={originalIndex}
                  className={styles.reviewItemCard}
                >
                  <div className={styles.reviewItemHeader}>
                    <div className={styles.questionTitleGroup}>
                      <span className={styles.questionNumBadge}>
                        #{String(originalIndex + 1).padStart(2, '0')}
                      </span>
                      <h3 className={styles.reviewQuestionTitle}>
                        {q.question_text}
                      </h3>
                    </div>

                    <div className={styles.statusBadgeWrapper}>
                      {isCorrect ? (
                        <span className={styles.badgeCorrect}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                          <span>Jawaban Tepat</span>
                        </span>
                      ) : (
                        <span className={styles.badgeIncorrect}>
                          <FontAwesomeIcon icon={faTimesCircle} />
                          <span>Perlu Evaluasi</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.comparisonCardsContainer}>
                    {/* Card Pilihan User */}
                    <div className={`${styles.comparisonCard} ${isCorrect ? styles.userCardCorrect : styles.userCardIncorrect}`}>
                      <div className={styles.comparisonCardHeader}>
                        <span className={styles.comparisonRoleLabel}>
                          Pilihan Jawaban Anda:
                        </span>
                        <span className={styles.comparisonStatusNote}>
                          {isCorrect ? '✓ Sesuai Solusi' : '✕ Belum Sesuai'}
                        </span>
                      </div>
                      <div className={styles.comparisonOptionBody}>
                        {ans?.selected !== undefined ? (
                          <>
                            <span className={styles.optionLetterBadge}>
                              {String.fromCharCode(65 + ans.selected)}
                            </span>
                            <span className={styles.optionContentText}>
                              {q.options[ans.selected]}
                            </span>
                          </>
                        ) : (
                          <span className={styles.unansweredText}>Tidak dijawab</span>
                        )}
                      </div>
                    </div>

                    {/* Card Kunci Solusi Formal */}
                    <div className={`${styles.comparisonCard} ${styles.officialKeyCard}`}>
                      <div className={styles.comparisonCardHeader}>
                        <span className={styles.comparisonRoleLabel}>
                          Kunci Solusi Formal:
                        </span>
                        <span className={styles.officialKeyNote}>
                          Referensi Sistem
                        </span>
                      </div>
                      <div className={styles.comparisonOptionBody}>
                        {ans?.correct_index !== undefined ? (
                          <>
                            <span className={`${styles.optionLetterBadge} ${styles.keyLetterBadge}`}>
                              {String.fromCharCode(65 + ans.correct_index)}
                            </span>
                            <span className={styles.optionContentText}>
                              {q.options[ans.correct_index]}
                            </span>
                          </>
                        ) : (
                          <span className={styles.unansweredText}>-</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bedah Logika & Analisis Formal */}
                  {ans?.explanation && (
                    <div className={styles.explanationBox}>
                      <div className={styles.explanationHeader}>
                        <FontAwesomeIcon icon={faLightbulb} style={{ color: 'var(--amber-accent)' }} />
                        <span>Bedah Logika & Analisis Formal</span>
                      </div>
                      <p className={styles.explanationBodyText}>
                        {ans.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 4. Tombol Aksi Footer */}
        <div className={styles.reviewReportFooter}>
          <button className={styles.backBtn} onClick={handleBackToCatalog}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Pilih Modul Lain</span>
          </button>
          <button
            className={styles.submitActionBtn}
            style={{ maxWidth: 220 }}
            onClick={() => handleSelectPackage(selectedPackage)}
          >
            <FontAwesomeIcon icon={faRedo} />
            <span>Ulangi Modul Ini</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.workbenchRoot}>
      <Navbar />
      <main className={styles.workbenchContent}>
        {!selectedPackage ? renderCatalog() : showResults ? renderEvaluationReport() : renderWorkbench()}
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        message="Untuk memulai pengerjaan modul latihan dan mencatat perkembangan nilai Anda, silakan masuk atau buat akun baru."
      />
    </div>
  );
};

export default Latihan;