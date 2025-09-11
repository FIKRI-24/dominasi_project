import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faProjectDiagram,
  faBook,
  faQuestionCircle,
  faCogs,
  faPlus,
  faMinus,
  faEraser,
  faLightbulb,
  faCheck,
  faTimes,
  faInfoCircle,
  faBullseye,
  faExpand,
  faCompress,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/navbar.module';
import '../../src/App.css'

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
  
  // State for interactive tabs
  const [activeTab, setActiveTab] = useState('panduan');
  const [isExpanded, setIsExpanded] = useState(false);

  // Enhanced graph data with correct calculations
  const GRAPHS = {
    PATH: {
      name: "Graf Lintasan (P8)",
      nodes: Array.from({length: 8}, (_, i) => ({
        id: `V${i+1}`, 
        x: 0.12 + (i * 0.096), 
        y: 0.5
      })),
      edges: Array.from({length: 7}, (_, i) => [`V${i+1}`, `V${i+2}`]),
      metricDimension: 2,
      possibleSolutions: [
        ['V1', 'V8'],
        ['V1', 'V7'],
        ['V2', 'V8']
      ],
      description: "Graf linear dengan simpul berurutan. Dimensi metrik = 2",
      hint: "Pilih dua simpul di ujung-ujung yang berbeda untuk membedakan semua simpul."
    },
    CYCLE: {
      name: "Graf Siklus (C8)",
      nodes: Array.from({length: 8}, (_, i) => ({
        id: `V${i+1}`,
        x: 0.5 + 0.35 * Math.cos((i * 2 * Math.PI) / 8),
        y: 0.5 + 0.35 * Math.sin((i * 2 * Math.PI) / 8)
      })),
      edges: [
        ...Array.from({length: 7}, (_, i) => [`V${i+1}`, `V${i+2}`]),
        ['V8', 'V1']
      ],
      metricDimension: 3,
      possibleSolutions: [
        ['V1', 'V3', 'V6'],
        ['V1', 'V4', 'V7'],
        ['V2', 'V4', 'V7'],
        ['V1', 'V3', 'V5']
      ],
      description: "Graf melingkar dengan 8 simpul. Dimensi metrik = 3",
      hint: "Pilih tiga simpul yang tersebar merata di sekeliling lingkaran."
    },
    STAR: {
      name: "Graf Bintang (S10)",
      nodes: [
        { id: 'C', x: 0.5, y: 0.5 },
        ...Array.from({length: 9}, (_, i) => ({
          id: `V${i+1}`,
          x: 0.5 + 0.35 * Math.cos((i * 2 * Math.PI) / 9),
          y: 0.5 + 0.35 * Math.sin((i * 2 * Math.PI) / 9)
        }))
      ],
      edges: Array.from({length: 9}, (_, i) => ['C', `V${i+1}`]),
      metricDimension: 9,
      possibleSolutions: [
        ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9']
      ],
      description: "Graf bintang dengan pusat C dan 9 daun. Dimensi metrik = 9",
      hint: "Semua simpul daun diperlukan untuk membedakan satu sama lain (simpul pusat tidak membantu)."
    },
    WHEEL: {
      name: "Graf Roda (W6)",
      nodes: [
        { id: 'C', x: 0.5, y: 0.5 },
        ...Array.from({length: 6}, (_, i) => ({
          id: `V${i+1}`,
          x: 0.5 + 0.32 * Math.cos((i * 2 * Math.PI) / 6),
          y: 0.5 + 0.32 * Math.sin((i * 2 * Math.PI) / 6)
        }))
      ],
      edges: [
        ...Array.from({length: 6}, (_, i) => ['C', `V${i+1}`]),
        ...Array.from({length: 5}, (_, i) => [`V${i+1}`, `V${i+2}`]),
        ['V6', 'V1']
      ],
      metricDimension: 2,
      possibleSolutions: [
        ['C', 'V1'], ['C', 'V2'], ['C', 'V3'],
        ['C', 'V4'], ['C', 'V5'], ['C', 'V6']
      ],
      description: "Graf roda dengan pusat dan rim 6 simpul. Dimensi metrik = 2",
      hint: "Pusat dan salah satu simpul rim sudah cukup untuk membedakan semua simpul."
    },
    COMPLETE: {
      name: "Graf Lengkap (K5)",
      nodes: Array.from({length: 5}, (_, i) => ({
        id: `V${i+1}`,
        x: 0.5 + 0.3 * Math.cos((i * 2 * Math.PI) / 5),
        y: 0.5 + 0.3 * Math.sin((i * 2 * Math.PI) / 5)
      })),
      edges: [
        ['V1','V2'],['V1','V3'],['V1','V4'],['V1','V5'],
        ['V2','V3'],['V2','V4'],['V2','V5'],
        ['V3','V4'],['V3','V5'],
        ['V4','V5']
      ],
      metricDimension: 4,
      possibleSolutions: [
        ['V1', 'V2', 'V3', 'V4'], ['V1', 'V2', 'V3', 'V5'],
        ['V1', 'V2', 'V4', 'V5'], ['V1', 'V3', 'V4', 'V5'],
        ['V2', 'V3', 'V4', 'V5']
      ],
      description: "Graf lengkap dengan 5 simpul. Dimensi metrik = 4",
      hint: "Hampir semua simpul diperlukan karena semua simpul sangat mirip dalam graf lengkap."
    },
    PETERSEN: {
      name: "Graf Petersen",
      nodes: [
        // Outer pentagon
        { id: 'O1', x: 0.5 + 0.35 * Math.cos(0), y: 0.5 + 0.35 * Math.sin(0) },
        { id: 'O2', x: 0.5 + 0.35 * Math.cos(2*Math.PI/5), y: 0.5 + 0.35 * Math.sin(2*Math.PI/5) },
        { id: 'O3', x: 0.5 + 0.35 * Math.cos(4*Math.PI/5), y: 0.5 + 0.35 * Math.sin(4*Math.PI/5) },
        { id: 'O4', x: 0.5 + 0.35 * Math.cos(6*Math.PI/5), y: 0.5 + 0.35 * Math.sin(6*Math.PI/5) },
        { id: 'O5', x: 0.5 + 0.35 * Math.cos(8*Math.PI/5), y: 0.5 + 0.35 * Math.sin(8*Math.PI/5) },
        // Inner star
        { id: 'I1', x: 0.5 + 0.17 * Math.cos(3*Math.PI/10), y: 0.5 + 0.17 * Math.sin(3*Math.PI/10) },
        { id: 'I2', x: 0.5 + 0.17 * Math.cos(7*Math.PI/10), y: 0.5 + 0.17 * Math.sin(7*Math.PI/10) },
        { id: 'I3', x: 0.5 + 0.17 * Math.cos(11*Math.PI/10), y: 0.5 + 0.17 * Math.sin(11*Math.PI/10) },
        { id: 'I4', x: 0.5 + 0.17 * Math.cos(15*Math.PI/10), y: 0.5 + 0.17 * Math.sin(15*Math.PI/10) },
        { id: 'I5', x: 0.5 + 0.17 * Math.cos(19*Math.PI/10), y: 0.5 + 0.17 * Math.sin(19*Math.PI/10) },
      ],
      edges: [
        ['O1','O2'],['O2','O3'],['O3','O4'],['O4','O5'],['O5','O1'],
        ['I1','I3'],['I3','I5'],['I5','I2'],['I2','I4'],['I4','I1'],
        ['O1','I1'],['O2','I2'],['O3','I3'],['O4','I4'],['O5','I5']
      ],
      metricDimension: 3,
      possibleSolutions: [
        ['O1', 'I2', 'I5'], ['O1', 'O3', 'I2'], ['I1', 'I2', 'O3']
      ],
      description: "Graf Petersen yang terkenal. Dimensi metrik = 3",
      hint: "Pilih simpul dari bagian yang berbeda (luar dan dalam) untuk membedakan struktur yang kompleks."
    }
  };

  // State
  const [currentGraph, setCurrentGraph] = useState('PATH');
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [zoom, setZoom] = useState(1);
  const [feedback, setFeedback] = useState({ 
    message: '', type: '', explanation: '', correctAnswer: [], showDistances: false
  });
  const [showExplanation, setShowExplanation] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [showInfoPanel, setShowInfoPanel] = useState(true);

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current; 
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d'); 
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr; 
      canvas.height = rect.height * dpr; 
      ctx.scale(dpr, dpr);
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.save(); 
    ctx.scale(zoom, zoom);
    
    const { edges, nodes } = GRAPHS[currentGraph];
    
    // Draw edges
    ctx.strokeStyle = '#64748b'; 
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
    const nodeRadius = 16;
    nodes.forEach(node => {
      const x = node.x * rect.width; 
      const y = node.y * rect.height;
      
      // Create gradient for node
      const gradient = ctx.createRadialGradient(x - 5, y - 5, 0, x, y, nodeRadius);
      if (highlightedNodes.has(node.id)) { 
        gradient.addColorStop(0, '#34d399'); 
        gradient.addColorStop(1, '#10b981'); 
      }
      else if (selectedNodes.has(node.id)) { 
        gradient.addColorStop(0, '#f87171'); 
        gradient.addColorStop(1, '#ef4444'); 
      }
      else { 
        gradient.addColorStop(0, '#60a5fa'); 
        gradient.addColorStop(1, '#3b82f6'); 
      }
      
      // Draw node
      ctx.beginPath(); 
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2); 
      ctx.fillStyle = gradient;
      ctx.shadowColor = 'rgba(0,0,0,0.3)'; 
      ctx.shadowBlur = 4; 
      ctx.shadowOffsetX = 2; 
      ctx.shadowOffsetY = 2;
      ctx.fill(); 
      ctx.shadowColor = 'transparent';
      
      // Draw node border
      if (selectedNodes.has(node.id) || highlightedNodes.has(node.id)) {
        ctx.beginPath(); 
        ctx.arc(x, y, nodeRadius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = selectedNodes.has(node.id) ? '#dc2626' : '#059669';
        ctx.lineWidth = 3; 
        ctx.stroke();
      }
      
      // Draw node label
      ctx.fillStyle = '#ffffff'; 
      ctx.font = `bold ${Math.min(nodeRadius * 0.7, 14)}px Inter, sans-serif`;
      ctx.textAlign = 'center'; 
      ctx.textBaseline = 'middle'; 
      ctx.fillText(node.id, x, y);
    });
    
    ctx.restore();
  }, [currentGraph, selectedNodes, zoom, highlightedNodes]);

  useEffect(() => {
    const canvas = canvasRef.current; 
    if (!canvas) return;
    
    const handleResize = () => {
      const container = canvas.parentElement; 
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      canvas.style.width = `${rect.width}px`; 
      canvas.style.height = `${rect.height}px`; 
      drawGraph();
    };
    
    const debouncedResize = debounce(() => { 
      requestAnimationFrame(handleResize); 
    }, 100);
    
    const resizeObserver = new ResizeObserver(debouncedResize);
    if (canvas.parentElement) { 
      resizeObserver.observe(canvas.parentElement); 
    }
    
    handleResize(); 
    return () => resizeObserver.disconnect();
  }, [drawGraph]);

  useEffect(() => { 
    requestAnimationFrame(drawGraph); 
  }, [currentGraph, selectedNodes, zoom, highlightedNodes, drawGraph]);
  
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current; 
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom; 
    const y = (e.clientY - rect.top) / zoom;
    const clickedNode = findNodeAt(x, y); 
    if (clickedNode) { 
      toggleNodeSelection(clickedNode.id); 
    }
  };
  
  const findNodeAt = (canvasX, canvasY) => {
    const { nodes } = GRAPHS[currentGraph]; 
    const nodeRadius = 16;
    const rect = canvasRef.current.getBoundingClientRect();
    
    for (const node of nodes) {
      const x = node.x * rect.width; 
      const y = node.y * rect.height;
      const distance = Math.sqrt((canvasX - x) ** 2 + (canvasY - y) ** 2);
      if (distance <= nodeRadius) { 
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
    setFeedback({ message: '', type: '', explanation: '', correctAnswer: [], showDistances: false }); 
    setHighlightedNodes(new Set());
  };
  
  const getAdjacencyMap = useCallback(() => {
    const adj = new Map(); 
    const { nodes, edges } = GRAPHS[currentGraph];
    nodes.forEach(node => adj.set(node.id, []));
    edges.forEach(([u, v]) => { 
      adj.get(u).push(v); 
      adj.get(v).push(u); 
    }); 
    return adj;
  }, [currentGraph]);
  
  const bfs = useCallback((startId) => {
    const distances = new Map(); 
    const { nodes } = GRAPHS[currentGraph];
    nodes.forEach(node => distances.set(node.id, Infinity));
    
    const adj = getAdjacencyMap(); 
    const queue = [[startId, 0]]; 
    distances.set(startId, 0); 
    let head = 0;
    
    while (head < queue.length) {
      const [currentId, dist] = queue[head++];
      adj.get(currentId)?.forEach(neighborId => {
        if (distances.get(neighborId) === Infinity) { 
          distances.set(neighborId, dist + 1); 
          queue.push([neighborId, dist + 1]); 
        }
      });
    } 
    return distances;
  }, [currentGraph, getAdjacencyMap]);
  
  const isResolvingSet = (nodeSet) => {
    const { nodes } = GRAPHS[currentGraph]; 
    const selectedArray = Array.from(nodeSet).sort();
    if (selectedArray.length === 0) return { isResolving: false, duplicateGroups: [] };
    
    const allDistances = new Map(selectedArray.map(selId => [selId, bfs(selId)]));
    const repToNodes = new Map();
    
    nodes.forEach(node => {
      const repString = selectedArray.map(selId => allDistances.get(selId).get(node.id)).join(',');
      if (!repToNodes.has(repString)) { 
        repToNodes.set(repString, []); 
      } 
      repToNodes.get(repString).push(node.id);
    });
    
    const duplicateGroups = Array.from(repToNodes.entries()).filter(([_, group]) => group.length > 1);
    return { isResolving: duplicateGroups.length === 0, duplicateGroups };
  };
  
  const checkAnswer = () => {
    const graphData = GRAPHS[currentGraph]; 
    const selectedSize = selectedNodes.size; 
    const targetSize = graphData.metricDimension;
    
    if (selectedSize === 0) {
      setFeedback({ 
        message: '❌ Tidak Ada Pilihan', 
        type: 'incorrect', 
        explanation: 'Silakan pilih beberapa simpul terlebih dahulu.', 
        correctAnswer: [], 
        showDistances: false 
      });
      setShowExplanation(true); 
      return;
    }
    
    const { isResolving, duplicateGroups } = isResolvingSet(selectedNodes);
    let feedbackData = { 
      correctAnswer: graphData.possibleSolutions[0] || [], 
      showDistances: true, 
    };
    
    if (isResolving) {
      if (selectedSize === targetSize) {
        feedbackData = { 
          ...feedbackData, 
          message: '🎉 SEMPURNA! Jawaban Optimal!', 
          type: 'correct', 
          explanation: `Luar biasa! Anda menemukan metric basis optimal (${targetSize} simpul).`, 
        };
      } else if (selectedSize < targetSize) {
        feedbackData = { 
          ...feedbackData, 
          message: '🤔 Hasil Tidak Biasa', 
          type: 'partial', 
          explanation: `Aneh! Himpunan Anda valid dengan ukuran ${selectedSize}, tapi teori mengatakan minimal ${targetSize}.`, 
        };
      } else {
        feedbackData = { 
          ...feedbackData, 
          message: '✅ Benar, Tapi Belum Optimal', 
          type: 'partial', 
          explanation: `Resolving set Anda valid, tapi bisa diperkecil. Target optimal adalah ${targetSize} simpul.`, 
        };
      } 
      setHighlightedNodes(new Set(selectedNodes));
    } else {
      const examples = duplicateGroups.slice(0, 2).map(([rep, nodes]) => `simpul {${nodes.join(', ')}}`).join(' dan ');
      feedbackData = { 
        ...feedbackData, 
        message: '❌ Belum Benar', 
        type: 'incorrect', 
        explanation: `Himpunan Anda belum bisa membedakan semua simpul, contohnya: ${examples}.\n\n${graphData.hint}`, 
        showDistances: false, 
      };
      const duplicateNodes = duplicateGroups.flatMap(([_, nodes]) => nodes); 
      setHighlightedNodes(new Set(duplicateNodes));
    }
    
    setFeedback(feedbackData); 
    setShowExplanation(true);
    setTimeout(() => { 
      explanationRef.current?.scrollIntoView({ behavior: 'smooth' }); 
    }, 100);
  };
  
  const resetSelection = () => { 
    setSelectedNodes(new Set()); 
    setFeedback({ message: '', type: '', explanation: '', correctAnswer: [], showDistances: false }); 
    setHighlightedNodes(new Set()); 
    setShowExplanation(false); 
  };
  
  const showSolution = () => {
    const graphData = GRAPHS[currentGraph];
    if (graphData.possibleSolutions.length > 0) {
      const solution = new Set(graphData.possibleSolutions[0]);
      setSelectedNodes(solution); 
      setHighlightedNodes(solution);
      setFeedback({ 
        message: '💡 Contoh Solusi Optimal', 
        type: 'info', 
        explanation: `Ini adalah salah satu solusi optimal dengan ${graphData.metricDimension} simpul.`, 
        correctAnswer: Array.from(solution), 
        showDistances: true 
      });
      setShowExplanation(true);
    }
  };
  
  const handleGraphChange = (e) => { 
    setCurrentGraph(e.target.value); 
    resetSelection(); 
  };
  
  const getDistanceTable = useCallback(() => {
    if (!feedback.showDistances || selectedNodes.size === 0) return null;
    const { nodes } = GRAPHS[currentGraph]; 
    const selectedArray = Array.from(selectedNodes).sort();
    const allDistances = new Map(selectedArray.map(selId => [selId, bfs(selId)]));
    
    return nodes.map(node => {
      const distances = selectedArray.map(selId => allDistances.get(selId).get(node.id));
      return { node: node.id, distances, representation: `(${distances.join(',')})` };
    }).sort((a,b) => a.node.localeCompare(b.node, undefined, {numeric: true}));
  }, [feedback.showDistances, selectedNodes, currentGraph, bfs]);

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-wrapper">
        <div className="header">
          <h1 className="judul-heading">
            <FontAwesomeIcon icon={faProjectDiagram} className="icon" />
            Interactive Graph Theory Lab
          </h1>
          <p className="subtitle">
            Eksplorasi konsep Resolving Set dan Metric Dimension melalui graf interaktif
          </p>
        </div>
        
        <div className="main-content">
          <div className="control-panel">
          <div className="control-card">
  <label htmlFor="graph-type" style={{color: '#334155', fontWeight: '600', fontSize: '0.9rem'}}>
    Pilih Jenis Graf:
  </label>
  <select 
    id="graph-type"
    value={currentGraph}
    onChange={handleGraphChange}
    className="graph-type-selector"
    style={{
      width: '100%', 
      padding: '0.75rem', 
      borderRadius: '8px', 
      border: '1px solid #cbd5e1', 
      fontSize: '1rem', 
      backgroundColor: '#f8fafc',
      color: '#334155' // Menambahkan warna teks yang kontras
    }}
  >
    <option value="PATH">Lintasan (P8) - Dimensi: 2</option>
    <option value="CYCLE">Siklus (C8) - Dimensi: 3</option>
    <option value="STAR">Bintang (S10) - Dimensi: 9</option>
    <option value="WHEEL">Roda (W6) - Dimensi: 2</option>
    <option value="COMPLETE">Lengkap (K5) - Dimensi: 4</option>
    <option value="PETERSEN">Petersen - Dimensi: 3</option>
  </select>
</div>
            
            <div className="control-card">
              <h3>{GRAPHS[currentGraph].name}</h3>
              <p>{GRAPHS[currentGraph].description}</p>
              <p className="target-info">
                <strong><FontAwesomeIcon icon={faBullseye} /> Target:</strong> 
                Temukan resolving set dengan <strong>{GRAPHS[currentGraph].metricDimension} simpul</strong>
              </p>
            </div>
            
            <div className="control-card">
              <div className="action-buttons">
                <button onClick={resetSelection} className="action-btn reset-btn">
                  <FontAwesomeIcon icon={faEraser} /> Reset
                </button>
                <button onClick={checkAnswer} className="action-btn check-btn">
                  <FontAwesomeIcon icon={faCheck} /> Cek Jawaban
                </button>
                <button onClick={showSolution} className="action-btn solution-btn">
                  <FontAwesomeIcon icon={faLightbulb} /> Solusi
                </button>
              </div>
              
              <div className="zoom-controls">
                <button onClick={zoomOut} className="zoom-btn" title="Zoom Out">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <button onClick={resetZoom} className="zoom-reset" title="Reset Zoom">
                  {Math.round(zoom * 100)}%
                </button>
                <button onClick={zoomIn} className="zoom-btn" title="Zoom In">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            
            <div className="control-card">
              <div className="selected-nodes-panel">
                <h4>Simpul Terpilih ({selectedNodes.size})</h4>
                {selectedNodes.size > 0 ? (
                  <div className="selected-nodes-list">
                    {Array.from(selectedNodes).sort().map(node => (
                      <span key={node} className="node-tag selected">
                        {node}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="no-selection">Klik simpul pada graf untuk memilih</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="visualization">
  <div className="canvas-container" style={{ minHeight: '300px', position: 'relative' }}>
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{ 
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  </div>
</div>
        </div>
        
        {feedback.message && (
          <div className="feedback-section" ref={explanationRef}>
            <div className={`feedback ${feedback.type}`}>
              <div className="feedback-header">
                <h3>
                  {feedback.type === 'correct' && <FontAwesomeIcon icon={faCheck} />}
                  {feedback.type === 'incorrect' && <FontAwesomeIcon icon={faTimes} />}
                  {feedback.type === 'partial' && <FontAwesomeIcon icon={faInfoCircle} />}
                  {feedback.type === 'info' && <FontAwesomeIcon icon={faLightbulb} />}
                  {' '}{feedback.message}
                </h3>
                <button 
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="toggle-explanation"
                >
                  {showExplanation ? (
                    <>
                      <FontAwesomeIcon icon={faChevronUp} /> Sembunyikan
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faChevronDown} /> Tampilkan
                    </>
                  )}
                </button>
              </div>
              
              {showExplanation && (
                <div className="explanation">
                  <p style={{whiteSpace: 'pre-wrap'}}>{feedback.explanation}</p>
                  
                  {feedback.correctAnswer.length > 0 && (
                    <div className="correct-answer">
                      <h4>💡 Contoh Solusi Optimal:</h4>
                      <div className="solution-nodes">
                        {feedback.correctAnswer.map(node => (
                          <span key={node} className="node-tag correct">{node}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {getDistanceTable() && (
                    <div className="distance-table">
                      <h4>📊 Tabel Representasi Jarak:</h4>
                      <div className="table-container">
                        <table>
                          <thead>
                            <tr>
                              <th>Simpul</th>
                              {Array.from(selectedNodes).sort().map(selNode => (
                                <th key={selNode}>d(-, {selNode})</th>
                              ))}
                              <th>Representasi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getDistanceTable().map(row => (
                              <tr key={row.node} className={selectedNodes.has(row.node) ? 'selected-row' : ''}>
                                <td className="node-cell">
                                  <span className={`node-tag ${selectedNodes.has(row.node) ? 'selected' : ''}`}>
                                    {row.node}
                                  </span>
                                </td>
                                {row.distances.map((dist, i) => (
                                  <td key={i} className="distance-cell">{dist}</td>
                                ))}
                                <td className="representation-cell">
                                  <code>{row.representation}</code>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="info-tabs-container">
          <div className="tab-header" onClick={() => setShowInfoPanel(!showInfoPanel)}>
            <h3>
              <FontAwesomeIcon icon={faInfoCircle} />
              Informasi Graf & Panduan
            </h3>
            <button className="toggle-panel-btn">
              {showInfoPanel ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            </button>
          </div>
          
          {showInfoPanel && (
            <>
              <div className="tab-buttons">
                <button className={`tab-btn ${activeTab === 'panduan' ? 'active' : ''}`} onClick={() => setActiveTab('panduan')}>
                  <FontAwesomeIcon icon={faQuestionCircle} /> Panduan
                </button>
                <button className={`tab-btn ${activeTab === 'teori' ? 'active' : ''}`} onClick={() => setActiveTab('teori')}>
                  <FontAwesomeIcon icon={faBook} /> Teori
                </button>
                <button className={`tab-btn ${activeTab === 'strategi' ? 'active' : ''}`} onClick={() => setActiveTab('strategi')}>
                  <FontAwesomeIcon icon={faCogs} /> Strategi
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'panduan' && (
                  <div className="tab-panel">
                    <div className="instruction-grid">
                      <div className="instruction-card">
                        <div className="instruction-number">1</div>
                        <h4>Pilih Graf</h4>
                        <p>Gunakan menu dropdown untuk memilih jenis graf yang ingin dieksplorasi.</p>
                      </div>
                      <div className="instruction-card">
                        <div className="instruction-number">2</div>
                        <h4>Pilih Simpul</h4>
                        <p>Klik langsung pada simpul di area visualisasi untuk memilihnya sebagai bagian dari resolving set.</p>
                      </div>
                      <div className="instruction-card">
                        <div className="instruction-number">3</div>
                        <h4>Cek Jawaban</h4>
                        <p>Tekan tombol "Cek Jawaban" untuk memvalidasi apakah pilihan Anda sudah optimal.</p>
                      </div>
                      <div className="instruction-card">
                        <div className="instruction-number">4</div>
                        <h4>Analisis Hasil</h4>
                        <p>Perhatikan feedback dan tabel jarak untuk memahami konsep di balik jawaban Anda.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'teori' && (
                  <div className="tab-panel">
                    <div className="theory-definition">
                      <h4>Resolving Set</h4>
                      <p>Sebuah himpunan simpul $S \subseteq V$ di mana setiap pasang simpul yang berbeda di dalam graf, $u, v \in V$, memiliki representasi jarak yang unik terhadap himpunan $S$. Artinya, tidak ada dua simpul yang "terlihat" sama dari sudut pandang himpunan $S$.</p>
                    </div>
                    <div className="theory-definition">
                      <h4>Metric Dimension ($dim(G)$)</h4>
                      <p>Ukuran (kardinalitas) minimum dari sebuah resolving set. Ini adalah jumlah simpul paling sedikit yang dibutuhkan untuk bisa membedakan semua simpul lain di dalam graf.</p>
                    </div>
                    <div className="theory-definition">
                      <h4>Representasi Jarak</h4>
                      <p>Untuk sebuah simpul $v$ dan resolving set $S = \$, representasinya adalah sebuah vektor (atau tuple) yang berisi jarak terpendek dari $v$ ke setiap anggota $S$, yaitu: $r(v|S) = (d(v,s_1), d(v,s_2), ..., d(v,s_k))$.</p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'strategi' && (
                  <div className="tab-panel">
                    <ul className="strategy-list">
                      <li><strong>Graf Lintasan:</strong> Pilih dua simpul di kedua ujung lintasan.</li>
                      <li><strong>Graf Siklus:</strong> Pilih simpul-simpul yang posisinya tersebar dan tidak simetris.</li>
                      <li><strong>Graf Bintang:</strong> Hampir selalu membutuhkan semua simpul daun (leaves), bukan simpul pusat.</li>
                      <li><strong>Graf Roda:</strong> Kombinasi simpul pusat dengan salah satu simpul di lingkaran luar biasanya sudah cukup.</li>
                      <li><strong>Graf Lengkap ($K_n$):</strong> Karena semua simpul terhubung, Anda memerlukan $n-1$ simpul untuk membedakan semuanya.</li>
                      <li><strong>Graf Petersen:</strong> Cobalah kombinasi simpul dari lingkaran luar dan bintang dalam untuk memecah simetri.</li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .app-container { 
          background: linear-gradient(135deg, #f0f2f5 0%, #e6e9f0 100%);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .content-wrapper { 
          max-width: 1400px; 
          margin: 0 auto; 
          padding: 2rem 1.5rem;
        }
        
        .header { 
          text-align: center; 
          margin-bottom: 2.5rem; 
        }
        
        .judul-heading { 
          font-size: 2.5rem; 
          color: #1e3a8a; 
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .subtitle { 
          font-size: 1.2rem; 
          color: #475569; 
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .icon { 
          color: #3b82f6;
        }

        /* Main Layout */
        .main-content { 
          display: flex; 
          gap: 2rem; 
          margin-bottom: 2.5rem;
          flex-direction: column;
        }
        
        @media (min-width: 1024px) {
          .main-content {
            flex-direction: row;
          }
        }
        
        .control-panel { 
          flex: 1; 
          min-width: 320px; 
          display: flex; 
          flex-direction: column; 
          gap: 1.5rem; 
        }
        
        .visualization { 
          flex: 2; 
          min-width: 0; 
          display: flex; 
          flex-direction: column; 
          background: #ffffff; 
          border-radius: 16px; 
          box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 5px 10px rgba(0,0,0,0.05);
          overflow: hidden;
          height: 500px;
        }
        
        @media (min-width: 1024px) {
          .visualization {
            height: auto;
          }
        }

        /* Control Panel Styles */
        .control-card { 
          background: #ffffff; 
          padding: 1.5rem; 
          border-radius: 12px; 
          box-shadow: 0 4px 6px rgba(0,0,0,0.04); 
          border: 1px solid #e2e8f0;
        }
        
        .control-card label { 
          display: block; 
          margin-bottom: 0.75rem; 
          font-weight: 600; 
          color: #334155; 
          font-size: 0.9rem;
        }
        
        .graph-type-selector { 
          width: 100%; 
          padding: 0.75rem; 
          border-radius: 8px; 
          border: 1px solid #cbd5e1; 
          font-size: 1rem; 
          background-color: #f8fafc;
          transition: all 0.2s ease;
        }
        
        .graph-type-selector:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }
        
        .target-info { 
          background-color: #e0f2fe; 
          border-left: 4px solid #0ea5e9; 
          padding: 0.75rem 1rem; 
          border-radius: 6px; 
          margin-top: 1rem; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
          font-size: 0.9rem;
        }
        
        .action-buttons { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); 
          gap: 0.75rem; 
          margin-bottom: 1.25rem;
        }
        
        .action-btn { 
          padding: 0.75rem 1rem; 
          border: none; 
          border-radius: 8px; 
          font-size: 0.9rem; 
          font-weight: 600; 
          cursor: pointer; 
          transition: all 0.2s ease; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 0.5rem; 
        }
        
        .reset-btn { 
          background-color: #f8fafc; 
          color: #475569; 
          border: 1px solid #e2e8f0;
        }
        
        .reset-btn:hover { 
          background-color: #f1f5f9; 
        }
        
        .check-btn { 
          background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
          color: white; 
        }
        
        .check-btn:hover { 
          background: linear-gradient(135deg, #059669 0%, #047857 100%); 
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(5, 150, 105, 0.3);
        }
        
        .solution-btn { 
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); 
          color: white; 
        }
        
        .solution-btn:hover { 
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%); 
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);
        }
        
        .zoom-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }
        
        .zoom-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .zoom-btn:hover {
          background: #e2e8f0;
        }
        
        .zoom-reset {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .zoom-reset:hover {
          background: #e2e8f0;
        }
        
        .selected-nodes-panel h4 {
          margin-bottom: 0.75rem;
          color: #334155;
          font-size: 1rem;
        }
        
        .selected-nodes-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .no-selection {
          color: #94a3b8;
          font-style: italic;
          font-size: 0.9rem;
        }
        
        /* Visualization Styles */
        .canvas-container { 
          flex-grow: 1; 
          position: relative; 
          width: 100%;
          height: 100%;
        }
        
        canvas { 
          position: absolute; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%; 
          border-radius: 16px;
        }
        
        /* Feedback Section */
        .feedback-section { 
          margin-bottom: 2.5rem; 
        }
        
        .feedback { 
          padding: 1.5rem; 
          border-radius: 12px; 
          box-shadow: 0 10px 15px rgba(0,0,0,0.05);
        }
        
        .feedback-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 1rem; 
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .feedback-header h3 { 
          margin: 0; 
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .toggle-explanation { 
          background: none; 
          border: 1px solid #94a3b8; 
          color: #475569; 
          padding: 0.5rem 1rem; 
          border-radius: 20px; 
          cursor: pointer; 
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        
        .toggle-explanation:hover {
          background: #f8fafc;
        }
        
        .explanation { 
          border-top: 1px solid rgba(0,0,0,0.1); 
          padding-top: 1.5rem; 
        }
        
        .feedback.correct { 
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); 
          border-left: 5px solid #22c55e; 
        }
        
        .feedback.incorrect { 
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); 
          border-left: 5px solid #ef4444; 
        }
        
        .feedback.partial { 
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); 
          border-left: 5px solid #f59e0b; 
        }
        
        .feedback.info { 
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); 
          border-left: 5px solid #3b82f6; 
        }

        /* Table & Tags */
        .table-container { 
          overflow-x: auto; 
          margin: 1rem 0; 
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .distance-table table { 
          width: 100%; 
          border-collapse: collapse; 
          font-size: 0.9rem; 
        }
        
        .distance-table th, .distance-table td { 
          padding: 0.75rem 0.5rem; 
          text-align: center; 
          border: 1px solid #e5e7eb; 
        }
        
        .distance-table th { 
          background: #f8fafc; 
          font-weight: 600; 
          color: #374151;
        }
        
        .selected-row { 
          background: rgba(239, 68, 68, 0.1); 
        }
        
        .node-tag { 
          display: inline-block; 
          padding: 0.35rem 0.75rem; 
          border-radius: 20px; 
          font-weight: 600; 
          margin: 0.125rem; 
          font-size: 0.8rem;
        }
        
        .node-tag.correct { 
          background: #10b981; 
          color: white; 
        }
        
        .node-tag.selected { 
          background: #ef4444; 
          color: white; 
        }
        
        .representation-cell code { 
          background: #f1f5f9; 
          padding: 0.25rem 0.5rem; 
          border-radius: 4px; 
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
        }
        
        /* Info Tabs Container */
        .info-tabs-container {
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 5px 10px rgba(0,0,0,0.05);
            overflow: hidden;
            margin-bottom: 2rem;
        }
        
        .tab-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 1.5rem;
            background: #f8fafc;
            cursor: pointer;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .tab-header h3 {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #334155;
        }
        
        .toggle-panel-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: #64748b;
            font-size: 1.1rem;
        }
        
        .tab-buttons {
            display: flex;
            background-color: #f1f5f9;
            padding: 0.5rem;
            gap: 0.5rem;
        }
        
        .tab-btn {
            flex: 1;
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
            font-weight: 600;
            border: none;
            background-color: transparent;
            color: #475569;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .tab-btn:hover {
            background-color: #e2e8f0;
            color: #1e3a8a;
        }
        
        .tab-btn.active {
            background-color: #3b82f6;
            color: #ffffff;
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.4);
        }
        
        .tab-content {
            padding: 1.5rem;
        }
        
        .tab-panel {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Styles for content inside tabs */
        .instruction-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
          gap: 1.5rem; 
        }
        
        .instruction-card { 
          background: #f8fafc; 
          padding: 1.5rem; 
          border-radius: 12px; 
          border: 1px solid #e2e8f0; 
          transition: transform 0.2s ease, box-shadow 0.2s ease; 
          position: relative; 
        }
        
        .instruction-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
        }
        
        .instruction-number { 
          position: absolute; 
          top: -15px; 
          left: -15px; 
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); 
          color: white; 
          width: 40px; 
          height: 40px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 1.25rem; 
          font-weight: bold; 
          border: 3px solid white; 
          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
        }
        
        .instruction-card h4 { 
          margin-top: 1rem; 
          margin-bottom: 0.75rem;
          color: #1e293b;
        }
        
        .instruction-card p {
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }
        
        .theory-definition { 
          margin-bottom: 2rem; 
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 12px;
          border-left: 4px solid #3b82f6;
        }
        
        .theory-definition h4 { 
          color: #1e3a8a; 
          border-bottom: 2px solid #dbeafe; 
          padding-bottom: 0.5rem; 
          margin-bottom: 1rem; 
        }
        
        .theory-definition p { 
          line-height: 1.6; 
          color: #374151;
        }

        .strategy-list { 
          list-style: none; 
          padding: 0; 
        }
        
        .strategy-list li { 
          background: #f8fafc; 
          padding: 1rem 1.5rem; 
          border-radius: 8px; 
          margin-bottom: 0.75rem; 
          border-left: 4px solid #3b82f6; 
          color: #374151;
          line-height: 1.6;
        }
        
        .strategy-list li strong {
          color: #1e3a8a;
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .content-wrapper { padding: 1.5rem 1rem; }
            .main-content { flex-direction: column; }
            .control-panel { min-width: 100%; }
            .judul-heading { font-size: 2rem; }
            .subtitle { font-size: 1rem; }
        }
        
        @media (max-width: 768px) {
            .judul-heading { font-size: 1.75rem; }
            .tab-buttons { flex-direction: column; }
            .feedback-header { flex-direction: column; align-items: flex-start; }
            .toggle-explanation { align-self: flex-end; }
            .instruction-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Coba;