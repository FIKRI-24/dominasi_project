import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faProjectDiagram,
  faCircle,
  faArrowsAlt,
  faTrash,
  faPlus,
  faMinus,
  faSave,
  faUpload,
  faEraser,
  faPen,
  faLightbulb,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import '../pages/assets/try.css';
import Navbar  from '../../components/navbar';

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const Coba = () => {
  // Refs
  const canvasRef = useRef(null);
  const explanationRef = useRef(null);

  // Graph data with more nodes (10+)
  const GRAPHS = {
    PATH: {
      name: "Graf Lintasan (P10)",
      nodes: Array.from({length: 10}, (_, i) => ({
        id: `V${i+1}`, 
        x: 0.1 + (i * 0.08), 
        y: 0.5
      })),
      edges: Array.from({length: 9}, (_, i) => [`V${i+1}`, `V${i+2}`]),
      metricTarget: 3,
      description: "Graf linear dengan simpul berurutan"
    },
    CYCLE: {
      name: "Graf Siklus (C12)",
      nodes: Array.from({length: 12}, (_, i) => ({
        id: `V${i+1}`,
        x: 0.5 + 0.4 * Math.cos((i * 2 * Math.PI) / 12),
        y: 0.5 + 0.4 * Math.sin((i * 2 * Math.PI) / 12)
      })),
      edges: [
        ...Array.from({length: 11}, (_, i) => [`V${i+1}`, `V${i+2}`]),
        ['V12', 'V1']
      ],
      metricTarget: 4,
      description: "Graf melingkar dimana simpul terakhir terhubung ke simpul pertama"
    },
    STAR: {
      name: "Graf Bintang (S15)",
      nodes: [
        { id: 'Center', x: 0.5, y: 0.5 },
        ...Array.from({length: 14}, (_, i) => ({
          id: `V${i+1}`,
          x: 0.5 + 0.4 * Math.cos((i * 2 * Math.PI) / 14),
          y: 0.5 + 0.4 * Math.sin((i * 2 * Math.PI) / 14)
        }))
      ],
      edges: Array.from({length: 14}, (_, i) => ['Center', `V${i+1}`]),
      metricTarget: 1,
      description: "Graf dengan simpul pusat yang terhubung ke semua simpul lainnya"
    },
    WHEEL: {
      name: "Graf Roda (W8)",
      nodes: [
        { id: 'Center', x: 0.5, y: 0.5 },
        ...Array.from({length: 8}, (_, i) => ({
          id: `V${i+1}`,
          x: 0.5 + 0.35 * Math.cos((i * 2 * Math.PI) / 8),
          y: 0.5 + 0.35 * Math.sin((i * 2 * Math.PI) / 8)
        }))
      ],
      edges: [
        ...Array.from({length: 8}, (_, i) => ['Center', `V${i+1}`]),
        ...Array.from({length: 7}, (_, i) => [`V${i+1}`, `V${i+2}`]),
        ['V8', 'V1']
      ],
      metricTarget: 2,
      description: "Gabungan graf bintang dan siklus"
    },
    COMPLETE: {
      name: "Graf Lengkap (K6)",
      nodes: Array.from({length: 6}, (_, i) => ({
        id: `V${i+1}`,
        x: 0.5 + 0.35 * Math.cos((i * 2 * Math.PI) / 6),
        y: 0.5 + 0.35 * Math.sin((i * 2 * Math.PI) / 6)
      })),
      edges: [
        ['V1','V2'],['V1','V3'],['V1','V4'],['V1','V5'],['V1','V6'],
        ['V2','V3'],['V2','V4'],['V2','V5'],['V2','V6'],
        ['V3','V4'],['V3','V5'],['V3','V6'],
        ['V4','V5'],['V4','V6'],
        ['V5','V6']
      ],
      metricTarget: 1,
      description: "Setiap simpul terhubung langsung ke semua simpul lainnya"
    }
  };

  // State
  const [currentGraph, setCurrentGraph] = useState('PATH');
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [zoom, setZoom] = useState(1);
  const [feedback, setFeedback] = useState({ 
    message: '', 
    type: '',
    explanation: '',
    correctAnswer: []
  });
  const [showExplanation, setShowExplanation] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());

  // Draw graph function with useCallback for optimization
  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(zoom, zoom);
    
    // Draw edges
    const { edges, nodes } = GRAPHS[currentGraph];
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    
    edges.forEach(([u, v]) => {
      const uNode = nodes.find(n => n.id === u);
      const vNode = nodes.find(n => n.id === v);
      if (uNode && vNode) {
        ctx.beginPath();
        ctx.moveTo(uNode.x * rect.width, uNode.y * rect.height);
        ctx.lineTo(vNode.x * rect.width, vNode.y * rect.height);
        ctx.stroke();
      }
    });
    
    // Draw nodes
    const nodeRadius = 15;
    nodes.forEach(node => {
      const x = node.x * rect.width;
      const y = node.y * rect.height;
      
      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      
      if (highlightedNodes.has(node.id)) {
        ctx.fillStyle = '#10b981';
      } else if (selectedNodes.has(node.id)) {
        ctx.fillStyle = '#ef4444';
      } else {
        ctx.fillStyle = '#3b82f6';
      }
      
      ctx.fill();
      
      // Border for selected/highlighted nodes
      if (selectedNodes.has(node.id)) {
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();
      } else if (highlightedNodes.has(node.id)) {
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius + 2, 0, Math.PI * 2);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      
      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${nodeRadius * 0.7}px Inter`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, x, y);
    });
    
    ctx.restore();
  }, [currentGraph, selectedNodes, zoom, highlightedNodes, GRAPHS]);

  // Initialize canvas with Resize Observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawGraph();
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(debounce(() => {
      requestAnimationFrame(handleResize);
    }, 100));

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Also keep window resize listener as fallback
    const handleWindowResize = debounce(handleResize, 100);
    window.addEventListener('resize', handleWindowResize);

    // Initial draw
    handleResize();

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [drawGraph]);

  // Redraw graph when state changes
  useEffect(() => {
    drawGraph();
    updateMetricInfo();
  }, [currentGraph, selectedNodes, zoom, highlightedNodes, drawGraph]);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (rect.width * zoom);
    const y = (e.clientY - rect.top) / (rect.height * zoom);
    
    const clickedNode = findNodeAt(x, y);
    if (clickedNode) {
      toggleNodeSelection(clickedNode.id);
    }
  };

  const findNodeAt = (x, y) => {
    const { nodes } = GRAPHS[currentGraph];
    const nodeRadius = 15 / (canvasRef.current.width * zoom);
    
    for (const node of nodes) {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      if (distance < nodeRadius) {
        return node;
      }
    }
    return null;
  };

  const toggleNodeSelection = (nodeId) => {
    setSelectedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
    setFeedback({ message: '', type: '', explanation: '', correctAnswer: [] });
    setHighlightedNodes(new Set());
  };

  const getAdjacencyMap = () => {
    const adj = new Map();
    const { nodes, edges } = GRAPHS[currentGraph];
    
    nodes.forEach(node => adj.set(node.id, []));
    edges.forEach(([u, v]) => {
      adj.get(u).push(v);
      adj.get(v).push(u);
    });
    
    return adj;
  };

  const bfs = (startId) => {
    const distances = new Map();
    const { nodes } = GRAPHS[currentGraph];
    nodes.forEach(node => distances.set(node.id, Infinity));
    
    const adj = getAdjacencyMap();
    const queue = [[startId, 0]];
    distances.set(startId, 0);
    
    let head = 0;
    while (head < queue.length) {
      const [currentId, dist] = queue[head++];
      adj.get(currentId).forEach(neighborId => {
        if (distances.get(neighborId) === Infinity) {
          distances.set(neighborId, dist + 1);
          queue.push([neighborId, dist + 1]);
        }
      });
    }
    return distances;
  };

  const updateMetricInfo = () => {
    const { nodes } = GRAPHS[currentGraph];
    const selectedArray = Array.from(selectedNodes).sort();
    
    if (selectedArray.length === 0) {
      return;
    }
    
    // Calculate metric representations
    const allDistances = new Map();
    selectedArray.forEach(selId => {
      allDistances.set(selId, bfs(selId));
    });
    
    const repToNodes = new Map();
    nodes.forEach(node => {
      const repArray = selectedArray.map(selId => allDistances.get(selId).get(node.id));
      const repString = `(${repArray.join(',')})`;
      
      if (!repToNodes.has(repString)) {
        repToNodes.set(repString, []);
      }
      repToNodes.get(repString).push(node.id);
    });
    
    // Find duplicate representations
    const duplicateGroups = Array.from(repToNodes.entries())
      .filter(([_, nodes]) => nodes.length > 1);
    
    if (duplicateGroups.length > 0) {
      const duplicates = duplicateGroups.flatMap(([_, nodes]) => nodes);
      setHighlightedNodes(new Set(duplicates));
    } else {
      setHighlightedNodes(new Set());
    }
  };

  const checkAnswer = () => {
    const graphData = GRAPHS[currentGraph];
    const selectedSize = selectedNodes.size;
    const targetSize = graphData.metricTarget;
    
    let message = '';
    let type = '';
    let explanation = '';
    let correctAnswer = [];
    
    // Calculate if resolving set
    const { nodes } = graphData;
    const selectedArray = Array.from(selectedNodes).sort();
    const allDistances = new Map();
    selectedArray.forEach(selId => {
      allDistances.set(selId, bfs(selId));
    });
    
    const repToNodes = new Map();
    nodes.forEach(node => {
      const repArray = selectedArray.map(selId => allDistances.get(selId).get(node.id));
      const repString = `(${repArray.join(',')})`;
      
      if (!repToNodes.has(repString)) {
        repToNodes.set(repString, []);
      }
      repToNodes.get(repString).push(node.id);
    });
    
    const isResolving = Array.from(repToNodes.values()).every(group => group.length === 1);
    
    if (isResolving) {
      if (selectedSize === targetSize) {
        message = '✅ Jawaban Optimal!';
        type = 'correct';
        explanation = `Anda telah menemukan basis dengan ukuran minimal (${targetSize} simpul). 
          Setiap simpul dalam graf memiliki representasi jarak yang unik terhadap himpunan pilihan Anda.`;
        
        // Find example solution
        if (currentGraph === 'PATH') {
          correctAnswer = ['V1', 'V10'];
        } else if (currentGraph === 'CYCLE') {
          correctAnswer = ['V1', 'V4', 'V7', 'V10'];
        } else if (currentGraph === 'STAR') {
          correctAnswer = ['Center'];
        } else if (currentGraph === 'WHEEL') {
          correctAnswer = ['Center', 'V1'];
        } else if (currentGraph === 'COMPLETE') {
          correctAnswer = ['V1'];
        }
      } else if (selectedSize > targetSize) {
        message = '⚠️ Benar tapi Belum Optimal';
        type = 'partial';
        explanation = `Himpunan Anda memang membedakan semua simpul, tapi masih bisa diperkecil. 
          Basis minimal untuk graf ini seharusnya hanya ${targetSize} simpul. 
          Coba temukan himpunan yang lebih kecil!`;
      } else {
        message = '❌ Tidak Mungkin';
        type = 'incorrect';
        explanation = 'Menarik! Menurut teori, himpunan seukuran ini tidak mungkin menjadi basis. Mungkin ada kesalahan perhitungan.';
      }
    } else {
      message = '❌ Belum Tepat';
      type = 'incorrect';
      
      // Find which nodes have identical representations
      const duplicateGroups = Array.from(repToNodes.entries())
        .filter(([_, nodes]) => nodes.length > 1);
      
      if (duplicateGroups.length > 0) {
        const examples = duplicateGroups.map(([rep, nodes]) => 
          `simpul ${nodes.join(', ')} memiliki representasi ${rep}`).join(' dan ');
        
        explanation = `Himpunan Anda belum membedakan semua simpul. Contoh: ${examples}. 
          Coba tambahkan/tukar simpul untuk membedakan mereka.`;
      }
      
      // Provide hint based on graph type
      if (currentGraph === 'PATH') {
        explanation += '\n\nTip: Untuk graf lintasan, pilih simpul di ujung-ujungnya.';
      } else if (currentGraph === 'CYCLE') {
        explanation += '\n\nTip: Untuk graf siklus, pilih simpul yang berjarak merata.';
      } else if (currentGraph === 'STAR') {
        explanation += '\n\nTip: Untuk graf bintang, simpul pusat saja sudah cukup.';
      }
    }
    
    setFeedback({ message, type, explanation, correctAnswer });
    setShowExplanation(true);
    
    // Auto-scroll to explanation
    setTimeout(() => {
      explanationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const resetSelection = () => {
    setSelectedNodes(new Set());
    setFeedback({ message: '', type: '', explanation: '', correctAnswer: [] });
    setHighlightedNodes(new Set());
    setShowExplanation(false);
  };

  const showSolution = () => {
    const graphData = GRAPHS[currentGraph];
    let solution = [];
    
    if (currentGraph === 'PATH') {
      solution = ['V1', 'V10'];
    } else if (currentGraph === 'CYCLE') {
      solution = ['V1', 'V4', 'V7', 'V10'];
    } else if (currentGraph === 'STAR') {
      solution = ['Center'];
    } else if (currentGraph === 'WHEEL') {
      solution = ['Center', 'V1'];
    } else if (currentGraph === 'COMPLETE') {
      solution = ['V1'];
    }
    
    setSelectedNodes(new Set(solution));
    setFeedback({ 
      message: 'Contoh Solusi', 
      type: 'info',
      explanation: `Ini adalah salah satu solusi optimal dengan ${graphData.metricTarget} simpul. 
        Perhatikan bagaimana setiap simpul lain memiliki representasi jarak yang unik terhadap himpunan ini.`,
      correctAnswer: solution
    });
    setShowExplanation(true);
  };

  const handleGraphChange = (e) => {
    setCurrentGraph(e.target.value);
    resetSelection();
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    
    <div className="navbar-container">
         <Navbar />
      <div className="header">
        
       <h1 className="judul-heading">
  <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
  Sandbox Teori Graph
</h1>
        {/* <p className="subtitle">
          Eksplorasi konsep basis dan bilangan dominasi melalui graf interaktif
        </p> */}
      </div>
      
      <div className="main-content">
        <div className="control-panel">
          <div className="graph-selector">
            <label htmlFor="graph-type">Pilih Jenis Graf:</label>
            <select 
              id="graph-type"
              value={currentGraph}
              onChange={handleGraphChange}
              className="graph-type-selector"
            >
              <option value="PATH">Lintasan (P10)</option>
              <option value="CYCLE">Siklus (C12)</option>
              <option value="STAR">Bintang (S15)</option>
              <option value="WHEEL">Roda (W8)</option>
              <option value="COMPLETE">Lengkap (K6)</option>
            </select>
          </div>
          
          <div className="graph-description">
            <h3>{GRAPHS[currentGraph].name}</h3>
            <p>{GRAPHS[currentGraph].description}</p>
            <p><strong>Target:</strong> Temukan basis dengan {GRAPHS[currentGraph].metricTarget} simpul</p>
          </div>
          
          <div className="zoom-controls">
            <button onClick={handleZoomIn} title="Zoom In">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button onClick={handleZoomOut} title="Zoom Out">
              <FontAwesomeIcon icon={faMinus} />
            </button> 
            <button onClick={handleResetZoom} title="Reset Zoom">
              100%
            </button>
          </div>
          
          <div className="action-buttons">
            <button onClick={resetSelection} className="reset-btn">
              <FontAwesomeIcon icon={faEraser} /> Reset
            </button>
            <button onClick={checkAnswer} className="check-btn">
              <FontAwesomeIcon icon={faCheck} /> Cek Jawaban
            </button>
            <button onClick={showSolution} className="solution-btn">
              <FontAwesomeIcon icon={faLightbulb} /> Lihat Solusi
            </button>
          </div>
        </div>
        
        <div className="visualization">
          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
            />
          </div>
          
          <div className="status-info">
            <div className="selected-nodes">
              <strong>Simpul Terpilih:</strong> 
              {Array.from(selectedNodes).join(', ') || 'Belum ada'}
            </div>
            <div className="zoom-level">
              <strong>Zoom:</strong> {Math.round(zoom * 100)}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="feedback-section" ref={explanationRef}>
        {feedback.message && (
          <div className={`feedback ${feedback.type}`}>
            <div className="feedback-header">
              <h3>
                {feedback.type === 'correct' && <FontAwesomeIcon icon={faCheck} />}
                {feedback.type === 'incorrect' && <FontAwesomeIcon icon={faTimes} />}
                {feedback.type === 'partial' && <FontAwesomeIcon icon={faLightbulb} />}
                {feedback.message}
              </h3>
              <button 
                onClick={() => setShowExplanation(!showExplanation)}
                className="toggle-explanation"
              >
                {showExplanation ? 'Sembunyikan' : 'Tampilkan'} Penjelasan
              </button>
            </div>
            
            {showExplanation && (
              <div className="explanation">
                <p>{feedback.explanation}</p>
                
                {feedback.correctAnswer.length > 0 && (
                  <div className="correct-answer">
                    <h4>Contoh Solusi Optimal:</h4>
                    <div className="solution-nodes">
                      {feedback.correctAnswer.map(node => (
                        <span key={node} className="node-tag">{node}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="instructions">
        <h3><FontAwesomeIcon icon={faLightbulb} /> Cara Menggunakan</h3>
        <ol>
          <li>Pilih jenis graf dari dropdown</li>
          <li>Klik pada simpul untuk memilih/deselect</li>
          <li>Gunakan tombol "Cek Jawaban" untuk memverifikasi solusi Anda</li>
          <li>Lihat penjelasan dan perbaiki jawaban jika diperlukan</li>
          <li>Gunakan "Lihat Solusi" untuk contoh jawaban optimal</li>
        </ol>
        
        <div className="theory-tip">
          <h4>Konsep Basis Graf:</h4>
          <p>
            Himpunan simpul S disebut <strong>basis</strong> jika setiap simpul dalam graf memiliki 
            representasi jarak yang unik terhadap S. Ukuran basis terkecil disebut 
            <strong> dimensi metrik</strong> graf.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coba;