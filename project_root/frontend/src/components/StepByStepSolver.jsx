import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faRedo,
  faTimes,
  faShieldAlt,
  faSearch,
  faCheckCircle,
  faExclamationTriangle,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import './StepByStepSolver.css';

/**
 * StepByStepSolver - Simulator Interaktif Langkah-demi-Langkah
 * Mendemonstrasikan pembentukan Himpunan Dominasi Minimum γ(G) dan Dimensi Metrik β(G)
 */
const StepByStepSolver = ({
  graph,
  mode, // 'metric' | 'domination'
  bfs,
  onStepChange,
  onClose
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoPlayRef = useRef(null);

  // Buat adjacency map untuk perhitungan lokal tetangga
  const adjMap = useMemo(() => {
    const map = new Map();
    graph.nodes.forEach(n => map.set(n.id, []));
    graph.edges.forEach(([u, v]) => {
      if (map.has(u)) map.get(u).push(v);
      if (map.has(v)) map.get(v).push(u);
    });
    return map;
  }, [graph]);

  // Bangun urutan langkah penyelesaian (Steps Data Structure)
  const steps = useMemo(() => {
    const isDom = mode === 'domination';
    const rawSolution = isDom
      ? (graph.possibleDominationSolutions?.[0] || [])
      : (graph.possibleSolutions?.[0] || []);

    const stepsList = [];

    // Langkah 0: Inisialisasi awal
    if (isDom) {
      stepsList.push({
        title: 'Inisialisasi Graf: Belum Ada Penjaga',
        selectedNodes: [],
        highlightedNodes: [],
        newlyAffectedNodes: [],
        explanation: `Target: Menempatkan pos penjaga seminimal mungkin sehingga seluruh ${graph.nodes.length} simpul terawasi.\nSaat ini belum ada simpul yang ditugaskan sebagai penjaga.`,
        tip: `Nilai teoritis Bilangan Dominasi γ(G) untuk graf ini adalah ${graph.dominationNumber}.`,
        coveredCount: 0,
        totalNodes: graph.nodes.length,
        statusTable: graph.nodes.map(n => ({
          node: n.id,
          status: 'Belum Terawasi',
          isCovered: false
        }))
      });

      // Langkah 1..k: Tambahkan penjaga satu per satu
      const activeGuards = [];
      const coveredSet = new Set();

      rawSolution.forEach((guardId, idx) => {
        activeGuards.push(guardId);
        const guardNeighbors = adjMap.get(guardId) || [];
        const newlyCovered = [];

        // Guard mendominasi diri sendiri
        if (!coveredSet.has(guardId)) {
          coveredSet.add(guardId);
          newlyCovered.push(guardId);
        }

        // Guard mendominasi tetangganya
        guardNeighbors.forEach(nb => {
          if (!coveredSet.has(nb)) {
            coveredSet.add(nb);
            newlyCovered.push(nb);
          }
        });

        const isLast = idx === rawSolution.length - 1;
        const remaining = graph.nodes.length - coveredSet.size;

        stepsList.push({
          title: `Langkah ${idx + 1}: Menugaskan Simpul ${guardId} Sebagai Penjaga`,
          selectedNodes: [...activeGuards],
          highlightedNodes: [...newlyCovered],
          newlyAffectedNodes: [...newlyCovered],
          explanation: `Simpul ${guardId} (derajat d = ${guardNeighbors.length}) ditempatkan sebagai penjaga.\nEfek Dominasi: Mengawasi dirinya sendiri dan tetangga langsung {${guardNeighbors.join(', ')}}.\nSimpul baru yang terjangkau pada langkah ini: {${newlyCovered.join(', ') || '-'}}.`,
          tip: isLast
            ? `🎉 SEMPURNA! Seluruh ${graph.nodes.length} simpul telah terawasi sempurna dengan ${activeGuards.length} penjaga minimum.`
            : `Progres: ${coveredSet.size}/${graph.nodes.length} simpul terawasi. Masih tersisa ${remaining} simpul belum terjangkau.`,
          coveredCount: coveredSet.size,
          totalNodes: graph.nodes.length,
          statusTable: graph.nodes.map(n => {
            const isGuard = activeGuards.includes(n.id);
            const isNeighbor = (adjMap.get(n.id) || []).some(nb => activeGuards.includes(nb));
            return {
              node: n.id,
              status: isGuard ? 'Pos Penjaga' : (isNeighbor ? 'Terawasi' : 'Belum Terawasi'),
              isCovered: isGuard || isNeighbor
            };
          })
        });
      });
    } else {
      // ── METRIC DIMENSION RESOLVING SET STEPS ──
      stepsList.push({
        title: 'Inisialisasi Graf: Belum Ada Patokan Navigasi',
        selectedNodes: [],
        highlightedNodes: [],
        explanation: `Target: Memilih subset simpul patokan W = {w₁, w₂, ...} berukuran minimum sehingga seluruh simpul memiliki vektor jarak koordinat yang unik.\nSaat ini belum ada patokan yang dipilih.`,
        tip: `Nilai teoritis Dimensi Metrik β(G) untuk graf ini adalah ${graph.metricDimension}.`,
        tableHeaders: ['Simpul', 'Vektor Koordinat', 'Status'],
        tableRows: graph.nodes.map(n => ({
          node: n.id,
          coords: '-',
          isUnique: false,
          isCollision: false
        }))
      });

      const activeLandmarks = [];
      const allDistances = new Map();

      rawSolution.forEach((landmarkId, idx) => {
        activeLandmarks.push(landmarkId);
        allDistances.set(landmarkId, bfs(landmarkId));

        // Hitung vektor jarak untuk semua simpul terhadap activeLandmarks saat ini
        const repMap = new Map();
        const nodeRepresentations = [];

        graph.nodes.forEach(n => {
          const distances = activeLandmarks.map(lid => allDistances.get(lid)?.get(n.id) ?? '∞');
          const repString = `(${distances.join(', ')})`;
          if (!repMap.has(repString)) repMap.set(repString, []);
          repMap.get(repString).push(n.id);
          nodeRepresentations.push({
            node: n.id,
            distances,
            repString
          });
        });

        // Temukan kelompok simpul yang masih bertabrakan (collision)
        const collisions = [];
        const collisionNodeSet = new Set();
        repMap.forEach((nodeList, rep) => {
          if (nodeList.length > 1) {
            collisions.push({ rep, nodes: nodeList });
            nodeList.forEach(id => collisionNodeSet.add(id));
          }
        });

        const isLast = idx === rawSolution.length - 1;

        stepsList.push({
          title: `Langkah ${idx + 1}: Menetapkan Simpul ${landmarkId} Sebagai Patokan ke-${idx + 1}`,
          selectedNodes: [...activeLandmarks],
          highlightedNodes: Array.from(collisionNodeSet),
          explanation: `Simpul ${landmarkId} ditetapkan ke dalam himpunan pembeda W.\nSetiap simpul kini memiliki ${activeLandmarks.length} dimensi koordinat jarak ke {${activeLandmarks.join(', ')}}.` +
            (collisionNodeSet.size > 0
              ? `\n⚠️ Terdapat ${collisions.length} kelompok simpul yang masih memiliki koordinat kembar (bentrok/belum terbedakan): ${collisions.map(c => `{${c.nodes.join(', ')}}`).join('; ')}.`
              : `\n✅ Luar biasa! Seluruh ${graph.nodes.length} simpul telah memiliki koordinat yang unik tanpa bentrok!`),
          tip: isLast
            ? `🎉 KESIMPULAN: Himpunan W = {${activeLandmarks.join(', ')}} adalah Resolving Set Minimum. Nilai Dimensi Metrik β(G) = ${activeLandmarks.length}.`
            : `Masih ada simpul dengan koordinat identik. Lanjutkan ke langkah berikutnya untuk membedakannya.`,
          tableHeaders: ['Simpul', ...activeLandmarks.map(id => `d(v, ${id})`), 'Koordinat', 'Status'],
          tableRows: nodeRepresentations.map(nr => {
            const isCollision = collisionNodeSet.has(nr.node);
            return {
              node: nr.node,
              distances: nr.distances,
              coords: nr.repString,
              isUnique: !isCollision,
              isCollision
            };
          })
        });
      });
    }

    return stepsList;
  }, [graph, mode, adjMap, bfs]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Informasikan perubahan langkah ke parent component (kanvas coba.jsx)
  useEffect(() => {
    if (onStepChange && currentStep) {
      onStepChange({
        selectedNodes: currentStep.selectedNodes,
        highlightedNodes: currentStep.highlightedNodes,
        stepIndex: currentStepIndex,
        totalSteps: steps.length,
        isFinished: currentStepIndex === steps.length - 1,
        stepData: currentStep
      });
    }
  }, [currentStepIndex, currentStep, onStepChange, steps.length]);

  // Handler Navigasi Langkah
  const handleNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentStepIndex, steps.length]);

  const handlePrev = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  const handleReset = useCallback(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  // Auto-play effect (2.5 detik per langkah)
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 2500);
    } else {
      clearInterval(autoPlayRef.current);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isPlaying, steps.length]);

  return (
    <div className="step-solver-panel">
      {/* Header Bar */}
      <div className="step-solver-header">
        <div className="step-solver-title-group">
          <span className={`step-badge ${mode === 'domination' ? 'domination' : ''}`}>
            {mode === 'domination' ? (
              <><FontAwesomeIcon icon={faShieldAlt} /> Solver Dominasi γ</>
            ) : (
              <><FontAwesomeIcon icon={faSearch} /> Solver Dimensi Metrik β</>
            )}
          </span>
          <h3 className="step-solver-title">
            {graph.name} • Panduan Langkah Interaktif
          </h3>
        </div>
        <button onClick={onClose} className="step-close-btn" title="Tutup Simulator">
          <FontAwesomeIcon icon={faTimes} /> Tutup
        </button>
      </div>

      {/* Stepper Dots Progress Bar */}
      <div className="stepper-progress-container">
        {steps.map((st, i) => (
          <div
            key={i}
            className={`stepper-dot ${i === currentStepIndex ? 'active' : ''} ${i < currentStepIndex ? 'completed' : ''}`}
            onClick={() => setCurrentStepIndex(i)}
            title={`Lompat ke ${st.title}`}
          />
        ))}
      </div>

      {/* Body: Narrative Explanation & Mini Live Table */}
      <div className="step-body-grid">
        {/* Left: Narrative */}
        <div className="step-narrative-card">
          <div className={`step-narrative-title ${mode === 'domination' ? 'domination' : ''}`}>
            <FontAwesomeIcon icon={faLightbulb} />
            <span>{currentStep.title}</span>
          </div>
          <div className="step-narrative-desc">
            {currentStep.explanation}
          </div>
          <div className={`step-highlight-box ${mode === 'domination' ? 'domination' : ''}`}>
            {currentStep.tip}
          </div>
        </div>

        {/* Right: Live Status Table */}
        <div className="step-table-card">
          <h4>
            {mode === 'domination'
              ? `Status Pengawasan Simpul (${currentStep.coveredCount}/${currentStep.totalNodes})`
              : `Vektor Koordinat Simpul (Patokan: ${currentStep.selectedNodes.length})`}
          </h4>

          {mode === 'domination' ? (
            <table className="step-mini-table">
              <thead>
                <tr>
                  <th>Simpul</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentStep.statusTable.map(row => (
                  <tr key={row.node} className={row.isCovered ? 'unique-row' : 'collision-row'}>
                    <td><strong>{row.node}</strong></td>
                    <td>
                      {row.isCovered ? (
                        <span><FontAwesomeIcon icon={faCheckCircle} /> {row.status}</span>
                      ) : (
                        <span><FontAwesomeIcon icon={faExclamationTriangle} /> {row.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="step-mini-table">
              <thead>
                <tr>
                  {currentStep.tableHeaders.map((th, i) => (
                    <th key={i}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentStep.tableRows.map(row => (
                  <tr
                    key={row.node}
                    className={row.isCollision ? 'collision-row' : (row.isUnique ? 'unique-row' : '')}
                  >
                    <td><strong>{row.node}</strong></td>
                    {row.distances && row.distances.map((d, dIdx) => (
                      <td key={dIdx}>{d}</td>
                    ))}
                    <td>{row.coords}</td>
                    <td>
                      {row.isCollision ? (
                        <span style={{ color: '#f87171' }}>⚠️ Bentrok</span>
                      ) : row.isUnique ? (
                        <span style={{ color: '#34d399' }}>✅ Unik</span>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Player Controller Bar */}
      <div className="step-player-bar">
        <div className="step-player-btns">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="step-ctrl-btn"
            title="Langkah Sebelumnya"
          >
            <FontAwesomeIcon icon={faBackward} /> Sebelumnya
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="step-ctrl-btn primary"
            title={isPlaying ? 'Jeda Simulasi' : 'Putar Otomatis'}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            {isPlaying ? 'Jeda' : 'Putar Otomatis'}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
            className="step-ctrl-btn"
            title="Langkah Berikutnya"
          >
            Berikutnya <FontAwesomeIcon icon={faForward} />
          </button>

          <button
            onClick={handleReset}
            className="step-ctrl-btn"
            title="Mulai Ulang dari Awal"
          >
            <FontAwesomeIcon icon={faRedo} /> Reset
          </button>
        </div>

        <div className="step-counter">
          Langkah <strong>{currentStepIndex + 1}</strong> dari <strong>{steps.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default StepByStepSolver;
