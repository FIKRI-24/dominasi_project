import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
  faChevronDown,
  faChevronUp,
  faShieldAlt,
  faSearch,
  faArrowsAlt,
  faRedo,
  faPlay,
  faFlask
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StepByStepSolver from '../components/StepByStepSolver';
import './assets/coba.css';

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Enhanced graph data - CORRECTED MATHEMATICAL SOLUTIONS
const GRAPHS = {
  GAMBAR_II1: {
    name: "Graf G",
    nodes: [
      { id: 'v1', x: 0.5, y: 0.28 },
      { id: 'v2', x: 0.22, y: 0.58 },
      { id: 'v3', x: 0.38, y: 0.72 },
      { id: 'v4', x: 0.62, y: 0.72 },
      { id: 'v5', x: 0.78, y: 0.58 }
    ],
    edges: [
      ['v1','v2'],['v2','v3'],['v3','v4'],['v4','v5'],['v5','v1'],
      ['v1','v3'],['v1','v4']
    ],
    metricDimension: 2,
    dominationNumber: 1,
    possibleSolutions: [['v2', 'v5'], ['v3', 'v4']],
    possibleDominationSolutions: [['v1'], ['v2', 'v4'], ['v2', 'v5']],
    description: "Graf G dengan 5 titik dan 7 sisi. |G|=5, ||G||=7, δ(G)=2, Δ(G)=4",
    hint: "Simpul v1 bertetangga dengan semua titik lainnya sehingga mendominasi seluruh graf. Untuk pembeda metrik, pilih 2 simpul luar yang simetris."
  },
  GAMBAR_II3: {
    name: "Graf Gambar II.3",
    nodes: [
      { id: 'v1', x: 0.1, y: 0.5 },
      { id: 'v2', x: 0.25, y: 0.5 },
      { id: 'v3', x: 0.4, y: 0.5 },
      { id: 'v4', x: 0.55, y: 0.3 },
      { id: 'v5', x: 0.55, y: 0.7 },
      { id: 'v6', x: 0.7, y: 0.3 },
      { id: 'v7', x: 0.7, y: 0.7 },
      { id: 'v8', x: 0.85, y: 0.5 }
    ],
    edges: [
      ['v1','v2'],['v2','v3'],['v3','v4'],['v3','v5'],
      ['v4','v6'],['v5','v7'],['v6','v8'],['v7','v8']
    ],
    metricDimension: 2,
    dominationNumber: 3,
    possibleSolutions: [['v1', 'v4'], ['v1', 'v5'], ['v6', 'v7'], ['v2', 'v4']],
    possibleDominationSolutions: [['v2', 'v4', 'v7'], ['v1', 'v4', 'v7'], ['v2', 'v6', 'v5']],
    description: "Graf G Gambar II.3 dengan 8 titik dan 8 sisi. ecc(v1)=5, ecc(v3)=3, diam(G)=5, rad(G)=3, β(G)=2, γ(G)=3.",
    hint: "Cukup pilih 2 simpul strategis (misal v1 dan v4) untuk membedakan seluruh simpul secara metrik (β=2). Untuk dominasi penjagaan, diperlukan 3 simpul (γ=3)."
  },
  GAMBAR_II12: {
    name: "Graf Dimensi Metrik 2",
    nodes: [
      { id: 'v1', x: 0.25, y: 0.3 },
      { id: 'v2', x: 0.4, y: 0.3 },
      { id: 'v3', x: 0.55, y: 0.3 },
      { id: 'v4', x: 0.7, y: 0.3 },
      { id: 'v5', x: 0.55, y: 0.6 },
      { id: 'v6', x: 0.4, y: 0.6 }
    ],
    edges: [
      ['v1','v2'],['v2','v3'],['v3','v4'],['v3','v5'],['v2','v6']
    ],
    metricDimension: 2,
    dominationNumber: 2,
    possibleSolutions: [['v1', 'v5'], ['v1', 'v4'], ['v4', 'v6']],
    possibleDominationSolutions: [['v2', 'v3'], ['v1', 'v3', 'v6']],
    description: "Graf G dengan dimensi metrik β(G) = 2 dan bilangan dominasi γ(G) = 2.",
    hint: "Dua titik dengan posisi ujung atau percabangan yang strategis dapat memantau dan membedakan semua titik."
  },
  LINTASAN_P8: {
    name: "Graf Lintasan P₈",
    nodes: Array.from({length: 8}, (_, i) => ({
      id: `v${i+1}`, 
      x: 0.12 + (i * 0.096), 
      y: 0.5
    })),
    edges: Array.from({length: 7}, (_, i) => [`v${i+1}`, `v${i+2}`]),
    metricDimension: 1,
    dominationNumber: 3,
    possibleSolutions: [['v1'], ['v8']],
    possibleDominationSolutions: [['v2', 'v5', 'v8'], ['v1', 'v4', 'v7']],
    description: "Graf lintasan dengan 8 titik. β(Pn) = 1, γ(P₈) = ⌈8/3⌉ = 3",
    hint: "Untuk lintasan, cukup satu titik ujung saja sebagai pembeda (v1 atau v8). Untuk dominasi penjagaan, tempatkan tiap 3 langkah sekali (v2, v5, v8)."
  },
  SIKLUS_C8: {
    name: "Graf Siklus C₈",
    nodes: Array.from({length: 8}, (_, i) => ({
      id: `v${i+1}`,
      x: 0.5 + 0.3 * Math.cos((i * 2 * Math.PI) / 8 - Math.PI/2),
      y: 0.5 + 0.3 * Math.sin((i * 2 * Math.PI) / 8 - Math.PI/2)
    })),
    edges: [
      ...Array.from({length: 7}, (_, i) => [`v${i+1}`, `v${i+2}`]),
      ['v8', 'v1']
    ],
    metricDimension: 2,
    dominationNumber: 3,
    possibleSolutions: [['v1', 'v3'], ['v1', 'v4'], ['v2', 'v4'], ['v2', 'v5'], ['v3', 'v5'], ['v3', 'v6'], ['v4', 'v6'], ['v4', 'v7'], ['v5', 'v7'], ['v5', 'v8'], ['v6', 'v8'], ['v6', 'v1']],
    possibleDominationSolutions: [['v1', 'v4', 'v7'], ['v2', 'v5', 'v8']],
    description: "Graf siklus dengan 8 titik. β(Cn) = 2 untuk n ≥ 3, γ(C₈) = ⌈8/3⌉ = 3",
    hint: "Dua titik yang tidak berseberangan membedakan seluruh siklus. Untuk dominasi, dibutuhkan 3 penjaga tersebar merata."
  },
  BINTANG_K1_7: {
    name: "Graf Bintang K₁,₇",
    nodes: [
      { id: 'c', x: 0.5, y: 0.5 },
      ...Array.from({length: 7}, (_, i) => ({
        id: `v${i+1}`,
        x: 0.5 + 0.3 * Math.cos((i * 2 * Math.PI) / 7 - Math.PI/2),
        y: 0.5 + 0.3 * Math.sin((i * 2 * Math.PI) / 7 - Math.PI/2)
      }))
    ],
    edges: Array.from({length: 7}, (_, i) => ['c', `v${i+1}`]),
    metricDimension: 6,
    dominationNumber: 1,
    possibleSolutions: [
      ['v1', 'v2', 'v3', 'v4', 'v5', 'v6'],
      ['v1', 'v2', 'v3', 'v4', 'v5', 'v7'],
      ['v1', 'v2', 'v3', 'v4', 'v6', 'v7'],
      ['v1', 'v2', 'v3', 'v5', 'v6', 'v7'],
      ['v1', 'v2', 'v4', 'v5', 'v6', 'v7'],
      ['v1', 'v3', 'v4', 'v5', 'v6', 'v7'],
      ['v2', 'v3', 'v4', 'v5', 'v6', 'v7']
    ],
    possibleDominationSolutions: [['c']],
    description: "Graf bintang dengan 1 pusat dan 7 daun. γ(K₁,n) = 1, β(K₁,n) = n-1 = 6",
    hint: "Titik pusat mendominasi semua sekaligus (γ=1), namun butuh 6 daun sebagai pembeda (β=6) karena semua daun berjarak sama ke pusat."
  },
  LENGKAP_K5: {
    name: "Graf Lengkap K₅",
    nodes: Array.from({length: 5}, (_, i) => ({
      id: `v${i+1}`,
      x: 0.5 + 0.3 * Math.cos((i * 2 * Math.PI) / 5 - Math.PI/2),
      y: 0.5 + 0.3 * Math.sin((i * 2 * Math.PI) / 5 - Math.PI/2)
    })),
    edges: [
      ['v1','v2'],['v1','v3'],['v1','v4'],['v1','v5'],
      ['v2','v3'],['v2','v4'],['v2','v5'],
      ['v3','v4'],['v3','v5'],
      ['v4','v5']
    ],
    metricDimension: 4,
    dominationNumber: 1,
    possibleSolutions: [
      ['v1', 'v2', 'v3', 'v4'], 
      ['v1', 'v2', 'v3', 'v5'],
      ['v1', 'v2', 'v4', 'v5'],
      ['v1', 'v3', 'v4', 'v5'],
      ['v2', 'v3', 'v4', 'v5']
    ],
    possibleDominationSolutions: [['v1'], ['v2'], ['v3'], ['v4'], ['v5']],
    description: "Graf lengkap dengan 5 titik. γ(Kn) = 1, β(Kn) = n-1 = 4",
    hint: "Satu titik manapun mendominasi semua (γ=1), tapi n-1 titik diperlukan untuk membedakan simpul secara metrik (β=4)."
  },
  BIPARTIT_K3_3: {
    name: "Graf Bipartit Lengkap K₃,₃",
    nodes: [
      { id: 'u1', x: 0.3, y: 0.25 },
      { id: 'u2', x: 0.3, y: 0.5 },
      { id: 'u3', x: 0.3, y: 0.75 },
      { id: 'v1', x: 0.7, y: 0.25 },
      { id: 'v2', x: 0.7, y: 0.5 },
      { id: 'v3', x: 0.7, y: 0.75 }
    ],
    edges: [
      ['u1','v1'],['u1','v2'],['u1','v3'],
      ['u2','v1'],['u2','v2'],['u2','v3'],
      ['u3','v1'],['u3','v2'],['u3','v3']
    ],
    metricDimension: 4,
    dominationNumber: 2,
    possibleSolutions: [
      ['u1', 'u2', 'v1', 'v2'],
      ['u1', 'u3', 'v1', 'v3'],
      ['u2', 'u3', 'v2', 'v3'],
      ['u1', 'u2', 'v1', 'v3'],
      ['u1', 'u3', 'v1', 'v2']
    ],
    possibleDominationSolutions: [['u1', 'v1'], ['u2', 'v2'], ['u3', 'v3']],
    description: "Graf bipartit lengkap K₃,₃. γ(Km,n) = 2, β(Km,n) = m+n-2 = 4",
    hint: "Cukup 1 simpul dari masing-masing kubu untuk mendominasi (γ=2). Untuk pembeda metrik, dibutuhkan m+n-2 = 4 simpul."
  },
  RODA_W6: {
    name: "Graf Roda W₆",
    nodes: [
      { id: 'c', x: 0.5, y: 0.5 },
      ...Array.from({length: 6}, (_, i) => ({
        id: `v${i+1}`,
        x: 0.5 + 0.3 * Math.cos((i * 2 * Math.PI) / 6 - Math.PI/2),
        y: 0.5 + 0.3 * Math.sin((i * 2 * Math.PI) / 6 - Math.PI/2)
      }))
    ],
    edges: [
      ...Array.from({length: 6}, (_, i) => ['c', `v${i+1}`]),
      ...Array.from({length: 5}, (_, i) => [`v${i+1}`, `v${i+2}`]),
      ['v6', 'v1']
    ],
    metricDimension: 3,
    dominationNumber: 1,
    possibleSolutions: [['v1', 'v2', 'v4'], ['v2', 'v3', 'v5'], ['v3', 'v4', 'v6'], ['c', 'v1', 'v3'], ['c', 'v2', 'v4']],
    possibleDominationSolutions: [['c']],
    description: "Graf roda dengan pusat c dan rim 6 titik. Sesuai teorema Buczkowski et al. (2003), β(W₆) = 3 dan γ(W₆) = 1.",
    hint: "Pusat c langsung mengawasi seluruh rim (γ=1). Untuk pembeda metrik, dibutuhkan minimal 3 simpul (misal v1, v2, dan v4) untuk membedakan seluruh simpul secara unik (β=3)."
  }
};

const Coba = () => {
  // Refs
  const canvasRef = useRef(null);
  const explanationRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  
  // State for interactive tabs & modes
  const [activeTab, setActiveTab] = useState('panduan');
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [activeMode, setActiveMode] = useState('metric'); // 'metric' | 'domination'
  const [showStepSolver, setShowStepSolver] = useState(false);

  // Graph state & canvas transform
  const [currentGraph, setCurrentGraph] = useState('GAMBAR_II1');
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  
  // Feedback state
  const [feedback, setFeedback] = useState({ 
    message: '', type: '', explanation: '', correctAnswer: [], showDistances: false, dominationReport: null
  });
  const [showExplanation, setShowExplanation] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());

  const getAdjacencyMap = useCallback(() => {
    const adj = new Map(); 
    const { nodes, edges } = GRAPHS[currentGraph];
    nodes.forEach(node => adj.set(node.id, []));
    edges.forEach(([u, v]) => { 
      if (adj.has(u)) adj.get(u).push(v);
      if (adj.has(v)) adj.get(v).push(u);
    }); 
    return adj;
  }, [currentGraph]);

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
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.save(); 
    ctx.translate(panOffset.x, panOffset.y);
    ctx.scale(zoom, zoom);
    
    const { edges, nodes } = GRAPHS[currentGraph];
    
    // Draw edges
    edges.forEach(([u, v]) => {
      const uNode = nodes.find(n => n.id === u); 
      const vNode = nodes.find(n => n.id === v);
      if (uNode && vNode) {
        ctx.beginPath(); 
        ctx.moveTo(uNode.x * rect.width, uNode.y * rect.height);
        ctx.lineTo(vNode.x * rect.width, vNode.y * rect.height);
        
        // In domination mode, highlight protection edges
        if (activeMode === 'domination' && (selectedNodes.has(u) || selectedNodes.has(v))) {
          ctx.strokeStyle = '#93c5fd';
          ctx.lineWidth = 2.5;
        } else {
          ctx.strokeStyle = '#cbd5e1'; 
          ctx.lineWidth = 2;
        }
        ctx.stroke();
      }
    });
    
    // Draw nodes
    const nodeRadius = 16;
    nodes.forEach(node => {
      const x = node.x * rect.width; 
      const y = node.y * rect.height;
      
      const gradient = ctx.createRadialGradient(x - 5, y - 5, 0, x, y, nodeRadius);
      if (highlightedNodes.has(node.id)) { 
        if (activeMode === 'domination') {
          // Unprotected node in domination mode (soft red)
          gradient.addColorStop(0, '#fee2e2'); 
          gradient.addColorStop(1, '#ef4444'); 
        } else {
          // Duplicate distance node in metric mode (amber)
          gradient.addColorStop(0, '#fef3c7'); 
          gradient.addColorStop(1, '#f59e0b'); 
        }
      }
      else if (selectedNodes.has(node.id)) { 
        if (activeMode === 'domination') {
          // Guard node (emerald green)
          gradient.addColorStop(0, '#d1fae5'); 
          gradient.addColorStop(1, '#10b981'); 
        } else {
          // Landmark node (cyber blue)
          gradient.addColorStop(0, '#e0f2fe'); 
          gradient.addColorStop(1, '#38bdf8'); 
        }
      }
      else { 
        // Normal nodes: White fill
        gradient.addColorStop(0, '#ffffff'); 
        gradient.addColorStop(1, '#ffffff'); 
      }
      
      // Draw node circle
      ctx.beginPath(); 
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2); 
      ctx.fillStyle = gradient;
      ctx.shadowColor = 'rgba(30, 64, 175, 0.15)'; 
      ctx.shadowBlur = 4; 
      ctx.shadowOffsetX = 2; 
      ctx.shadowOffsetY = 2;
      ctx.fill(); 
      ctx.shadowColor = 'transparent';
      
      // Draw node border
      ctx.beginPath(); 
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      if (highlightedNodes.has(node.id)) {
        ctx.strokeStyle = activeMode === 'domination' ? '#b91c1c' : '#d97706';
        ctx.lineWidth = 3; 
      } else if (selectedNodes.has(node.id)) {
        ctx.strokeStyle = activeMode === 'domination' ? '#047857' : '#0284c7';
        ctx.lineWidth = 3; 
      } else {
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 2.5; 
      }
      ctx.stroke();
      
      // Draw node label
      if (selectedNodes.has(node.id)) {
        ctx.fillStyle = activeMode === 'domination' ? '#064e3b' : '#1e293b'; 
      } else if (highlightedNodes.has(node.id)) {
        ctx.fillStyle = activeMode === 'domination' ? '#7f1d1d' : '#92400e'; 
      } else {
        ctx.fillStyle = '#1e40af'; 
      }
      ctx.font = `bold ${Math.min(nodeRadius * 0.75, 12)}px 'Inter', sans-serif`;
      ctx.textAlign = 'center'; 
      ctx.textBaseline = 'middle'; 
      ctx.fillText(node.id, x, y);
    });
    
    ctx.restore();
  }, [currentGraph, selectedNodes, zoom, panOffset, highlightedNodes, activeMode]);

  useEffect(() => {
    const canvas = canvasRef.current; 
    if (!canvas) return;
    
    const handleResize = () => {
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
  }, [currentGraph, selectedNodes, zoom, panOffset, highlightedNodes, activeMode, drawGraph]);

  const findNodeAt = (canvasX, canvasY) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const { nodes } = GRAPHS[currentGraph]; 
    const nodeRadius = 18;
    const rect = canvas.getBoundingClientRect();
    
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
    setFeedback({ message: '', type: '', explanation: '', correctAnswer: [], showDistances: false, dominationReport: null }); 
    setHighlightedNodes(new Set());
  };

  // Pan / Drag handlers for Canvas
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y
    };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x - panOffset.x;
    const dy = e.clientY - dragStartRef.current.y - panOffset.y;
    if (Math.hypot(dx, dy) > 4) {
      hasMovedRef.current = true;
    }
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    
    if (!hasMovedRef.current) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left - panOffset.x) / zoom;
      const y = (e.clientY - rect.top - panOffset.y) / zoom;
      const clickedNode = findNodeAt(x, y);
      if (clickedNode) {
        toggleNodeSelection(clickedNode.id);
      }
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      isDraggingRef.current = true;
      hasMovedRef.current = false;
      dragStartRef.current = {
        x: touch.clientX - panOffset.x,
        y: touch.clientY - panOffset.y
      };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x - panOffset.x;
    const dy = touch.clientY - dragStartRef.current.y - panOffset.y;
    if (Math.hypot(dx, dy) > 4) {
      hasMovedRef.current = true;
    }
    setPanOffset({
      x: touch.clientX - dragStartRef.current.x,
      y: touch.clientY - dragStartRef.current.y
    });
  };

  const handleTouchEnd = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (!hasMovedRef.current && e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (touch.clientX - rect.left - panOffset.x) / zoom;
      const y = (touch.clientY - rect.top - panOffset.y) / zoom;
      const clickedNode = findNodeAt(x, y);
      if (clickedNode) {
        toggleNodeSelection(clickedNode.id);
      }
    }
  };

  const bfs = useCallback((startId) => {
    const distances = new Map(); 
    const { nodes } = GRAPHS[currentGraph];
    nodes.forEach(node => distances.set(node.id, Infinity));
    
    const adj = getAdjacencyMap(); 
    if (!adj.has(startId)) {
      return distances;
    }
    
    const queue = [[startId, 0]]; 
    distances.set(startId, 0); 
    let head = 0;
    
    while (head < queue.length) {
      const [currentId, dist] = queue[head++];
      const neighbors = adj.get(currentId) || [];
      
      neighbors.forEach(neighborId => {
        if (distances.get(neighborId) === Infinity) { 
          distances.set(neighborId, dist + 1); 
          queue.push([neighborId, dist + 1]); 
        }
      });
    } 
    return distances;
  }, [currentGraph, getAdjacencyMap]);

  // Validation: Metric Resolving Set
  const isResolvingSet = useCallback((nodeSet) => {
    const { nodes } = GRAPHS[currentGraph]; 
    const selectedArray = Array.from(nodeSet).sort();
    
    if (selectedArray.length === 0) {
      return { 
        isResolving: false, 
        duplicateGroups: [],
        error: 'Tidak ada simpul yang dipilih.',
        unreachableNodes: []
      };
    }
    
    const invalidNodes = selectedArray.filter(id => 
      !nodes.some(n => n.id === id)
    );
    if (invalidNodes.length > 0) {
      return {
        isResolving: false,
        duplicateGroups: [],
        error: `Simpul tidak valid: ${invalidNodes.join(', ')}`,
        unreachableNodes: []
      };
    }
    
    const allDistances = new Map();
    selectedArray.forEach(selId => {
      allDistances.set(selId, bfs(selId));
    });
    
    const repToNodes = new Map();
    const representations = new Map();
    const unreachableNodes = [];
    
    nodes.forEach(node => {
      const distances = selectedArray.map(selId => {
        const dist = allDistances.get(selId)?.get(node.id);
        return dist !== undefined && dist !== Infinity ? dist : '∞';
      });
      
      if (distances.includes('∞')) {
        unreachableNodes.push(node.id);
      }
      
      const repString = distances.join(',');
      representations.set(node.id, distances);
      
      if (!repToNodes.has(repString)) { 
        repToNodes.set(repString, []); 
      } 
      repToNodes.get(repString).push(node.id);
    });
    
    const duplicateGroups = Array.from(repToNodes.entries())
      .filter(([, group]) => group.length > 1)
      .map(([rep, group]) => ({
        representation: rep,
        nodes: group,
        count: group.length
      }));
    
    return { 
      isResolving: duplicateGroups.length === 0 && unreachableNodes.length === 0,
      duplicateGroups,
      representations,
      unreachableNodes,
      totalUnique: repToNodes.size,
      totalNodes: nodes.length
    };
  }, [currentGraph, bfs]);

  // Validation: Dominating Set
  const isDominatingSet = useCallback((selected) => {
    const { nodes } = GRAPHS[currentGraph];
    const adj = getAdjacencyMap();
    const undominated = [];
    const dominatedReport = [];

    nodes.forEach(node => {
      if (selected.has(node.id)) {
        dominatedReport.push({
          node: node.id,
          status: 'Penjaga (Mendominasi Diri Sendiri)',
          guard: node.id,
          isCovered: true
        });
        return;
      }
      const neighbors = adj.get(node.id) || [];
      const guards = neighbors.filter(neighbor => selected.has(neighbor));
      if (guards.length > 0) {
        dominatedReport.push({
          node: node.id,
          status: `Terawasi oleh ${guards.join(', ')}`,
          guard: guards.join(', '),
          isCovered: true
        });
      } else {
        undominated.push(node.id);
        dominatedReport.push({
          node: node.id,
          status: 'Belum Terawasi',
          guard: '-',
          isCovered: false
        });
      }
    });

    return {
      isDominating: undominated.length === 0,
      undominated,
      dominatedReport,
      totalNodes: nodes.length,
      coveredCount: nodes.length - undominated.length
    };
  }, [currentGraph, getAdjacencyMap]);

  const checkAnswer = () => {
    const graphData = GRAPHS[currentGraph]; 
    const selectedSize = selectedNodes.size; 
    
    if (selectedSize === 0) {
      setFeedback({ 
        message: '❌ Belum Ada Simpul yang Dipilih', 
        type: 'incorrect', 
        explanation: activeMode === 'metric' 
          ? 'Silakan klik simpul pada diagram graf untuk memilih himpunan patokan pembeda navigasi.'
          : 'Silakan klik simpul pada diagram graf untuk menempatkan pos penjaga dominasi.', 
        correctAnswer: [], 
        showDistances: false,
        dominationReport: null
      });
      setShowExplanation(true); 
      return;
    }

    if (activeMode === 'metric') {
      const targetSize = graphData.metricDimension;
      const validation = isResolvingSet(selectedNodes);
      
      if (validation.error) {
        setFeedback({
          message: '⚠️ Error Validasi',
          type: 'incorrect',
          explanation: validation.error,
          correctAnswer: graphData.possibleSolutions[0] || [],
          showDistances: false,
          dominationReport: null
        });
        setShowExplanation(true);
        return;
      }
      
      if (validation.unreachableNodes && validation.unreachableNodes.length > 0) {
        setFeedback({
          message: '⚠️ Graf Tidak Terhubung',
          type: 'incorrect',
          explanation: `Beberapa simpul tidak dapat dijangkau dari simpul patokan pilihan Anda: ${validation.unreachableNodes.join(', ')}.`,
          correctAnswer: graphData.possibleSolutions[0] || [],
          showDistances: false,
          dominationReport: null
        });
        setHighlightedNodes(new Set(validation.unreachableNodes));
        setShowExplanation(true);
        return;
      }
      
      let feedbackData = { 
        correctAnswer: graphData.possibleSolutions[0] || [], 
        showDistances: true, 
        dominationReport: null
      };
      
      if (validation.isResolving) {
        const efficiency = ((targetSize / selectedSize) * 100).toFixed(1);
        
        if (selectedSize === targetSize) {
          feedbackData = { 
            ...feedbackData, 
            message: '🎉 SEMPURNA! Himpunan Pembeda Optimal!', 
            type: 'correct', 
            explanation: `Luar biasa! Anda berhasil menemukan himpunan pembeda minimum dengan ${targetSize} simpul patokan.\n\n✅ Seluruh ${validation.totalNodes} simpul memiliki koordinat jarak yang unik.\n✅ Ini adalah nilai dimensi metrik β(G) = ${targetSize}.\n\n💡 Karakteristik: ${graphData.hint}`, 
          };
        } else if (selectedSize < targetSize) {
          feedbackData = { 
            ...feedbackData, 
            message: '🤔 Hasil Khusus Terverifikasi', 
            type: 'partial', 
            explanation: `Himpunan Anda membentuk resolving set yang valid dengan ${selectedSize} simpul. Silakan periksa kembali dengan solusi standar.`, 
          };
        } else {
          const wastedNodes = selectedSize - targetSize;
          feedbackData = { 
            ...feedbackData, 
            message: '✅ Valid, Tetapi Belum Optimal', 
            type: 'partial', 
            explanation: `Himpunan pembeda Anda valid dengan ${selectedSize} simpul, tetapi masih bisa dihemat menjadi ${targetSize} simpul patokan.\n\n📊 Efisiensi: ${efficiency}%\n⚠️ Terbuang ${wastedNodes} simpul berlebih.\n\n💡 Coba ganti posisi simpul agar mencapai target optimal β(G) = ${targetSize}.`, 
          };
        } 
        setHighlightedNodes(new Set(selectedNodes));
      } else {
        const exampleGroups = validation.duplicateGroups.slice(0, 2);
        const examples = exampleGroups.map(g => `{${g.nodes.join(', ')}}`).join(' dan ');
        const totalDuplicates = validation.duplicateGroups.reduce((sum, g) => sum + g.count, 0);
        
        feedbackData = { 
          ...feedbackData, 
          message: '❌ Belum Membentuk Himpunan Pembeda', 
          type: 'incorrect', 
          explanation: `Himpunan pilihan Anda belum dapat membedakan posisi semua simpul secara unik.\n\n❌ Terdapat ${validation.duplicateGroups.length} kelompok simpul yang memiliki representasi jarak sama.\n❌ Total ${totalDuplicates} simpul bertabrakan.\n\nContoh simpul yang berkoordinat kembar: ${examples}.\n\n💡 ${graphData.hint}`, 
          showDistances: true, 
        };
        const duplicateNodes = validation.duplicateGroups.flatMap(g => g.nodes); 
        setHighlightedNodes(new Set(duplicateNodes));
      }
      
      setFeedback(feedbackData); 
      setShowExplanation(true);
    } else {
      // DOMINATION MODE
      const targetSize = graphData.dominationNumber;
      const domValidation = isDominatingSet(selectedNodes);
      const possibleSols = graphData.possibleDominationSolutions || [[]];
      
      let feedbackData = {
        correctAnswer: possibleSols[0] || [],
        showDistances: false,
        dominationReport: domValidation.dominatedReport
      };

      if (domValidation.isDominating) {
        if (selectedSize === targetSize) {
          feedbackData = {
            ...feedbackData,
            message: '🎉 SEMPURNA! Himpunan Dominasi Minimum Optimal!',
            type: 'correct',
            explanation: `Luar biasa! Himpunan {${Array.from(selectedNodes).join(', ')}} berhasil mengawasi seluruh ${domValidation.totalNodes} simpul jaringan dengan tepat ${targetSize} penjaga.\n\n✅ Seluruh area terawasi secara optimal.\n✅ Nilai ini adalah Bilangan Dominasi γ(G) = ${targetSize}.\n\n💡 Karakteristik: ${graphData.hint}`
          };
          setHighlightedNodes(new Set(selectedNodes));
        } else if (selectedSize < targetSize) {
          feedbackData = {
            ...feedbackData,
            message: '🎉 Dominasi Super Efisien!',
            type: 'correct',
            explanation: `Himpunan ini berhasil mengawasi seluruh jaringan hanya dengan ${selectedSize} simpul penjaga!`
          };
          setHighlightedNodes(new Set(selectedNodes));
        } else {
          const wasted = selectedSize - targetSize;
          feedbackData = {
            ...feedbackData,
            message: '✅ Valid Mendominasi, Tetapi Belum Minimum',
            type: 'partial',
            explanation: `Seluruh jaringan terawasi dengan aman! Namun jumlah penjaga Anda (${selectedSize} simpul) masih bisa dihemat sebanyak ${wasted} simpul untuk mencapai batas minimum γ(G) = ${targetSize} penjaga.`
          };
          setHighlightedNodes(new Set(selectedNodes));
        }
      } else {
        feedbackData = {
          ...feedbackData,
          message: '❌ Belum Mendominasi Seluruh Jaringan',
          type: 'incorrect',
          explanation: `Terdapat ${domValidation.undominated.length} simpul yang belum terawasi: {${domValidation.undominated.join(', ')}}.\n\nSimpul-simpul merah tersebut tidak berada dalam himpunan penjaga dan tidak terhubung langsung dengan satupun penjaga pilihan Anda.\n\n💡 Coba letakkan penjaga di simpul dengan derajat konektivitas yang lebih tinggi.`
        };
        setHighlightedNodes(new Set(domValidation.undominated));
      }

      setFeedback(feedbackData);
      setShowExplanation(true);
    }

    setTimeout(() => { 
      explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); 
    }, 100);
  };

  const resetSelection = () => { 
    setSelectedNodes(new Set()); 
    setFeedback({ message: '', type: '', explanation: '', correctAnswer: [], showDistances: false, dominationReport: null }); 
    setHighlightedNodes(new Set()); 
    setShowExplanation(false); 
  };

  const showSolution = () => {
    const graphData = GRAPHS[currentGraph];
    if (activeMode === 'metric') {
      if (graphData.possibleSolutions.length > 0) {
        const solution = new Set(graphData.possibleSolutions[0]);
        setSelectedNodes(solution); 
        setHighlightedNodes(solution);
        setFeedback({ 
          message: '💡 Contoh Himpunan Pembeda Optimal', 
          type: 'info', 
          explanation: `Ini adalah salah satu pilihan himpunan pembeda minimum dengan β(G) = ${graphData.metricDimension} simpul patokan.\n\n✨ ${graphData.description}\n\n💡 ${graphData.hint}\n\n${graphData.possibleSolutions.length > 1 ? `\n📝 Info: Terdapat ${graphData.possibleSolutions.length} kemungkinan himpunan pembeda optimal pada graf ini.` : ''}`, 
          correctAnswer: Array.from(solution), 
          showDistances: true,
          dominationReport: null 
        });
        setShowExplanation(true);
      }
    } else {
      const sols = graphData.possibleDominationSolutions || [[]];
      if (sols.length > 0 && sols[0].length > 0) {
        const solution = new Set(sols[0]);
        setSelectedNodes(solution);
        setHighlightedNodes(solution);
        const domValidation = isDominatingSet(solution);
        setFeedback({
          message: '💡 Contoh Himpunan Dominasi Minimum',
          type: 'info',
          explanation: `Ini adalah salah satu pilihan himpunan penjaga minimum dengan γ(G) = ${graphData.dominationNumber} simpul.\n\n✨ ${graphData.description}\n\n${sols.length > 1 ? `\n📝 Info: Terdapat ${sols.length} variasi penempatan penjaga minimum yang valid pada graf ini.` : ''}`,
          correctAnswer: Array.from(solution),
          showDistances: false,
          dominationReport: domValidation.dominatedReport
        });
        setShowExplanation(true);
      }
    }
    setTimeout(() => { 
      explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); 
    }, 100);
  };

  const handleModeChange = (newMode) => {
    if (newMode === activeMode) return;
    setActiveMode(newMode);
    setSelectedNodes(new Set());
    setHighlightedNodes(new Set());
    setFeedback({ message: '', type: '', explanation: '', correctAnswer: [], showDistances: false, dominationReport: null });
    setShowExplanation(false);
  };

  const handleGraphChange = (e) => { 
    setCurrentGraph(e.target.value); 
    resetSelection(); 
    resetView();
  };

  const getDistanceTable = useCallback(() => {
    if (!feedback.showDistances || selectedNodes.size === 0) return null;
    const { nodes } = GRAPHS[currentGraph]; 
    const selectedArray = Array.from(selectedNodes).sort((a,b) => {
      const aNum = parseInt(a.replace(/\D/g, '')) || 0;
      const bNum = parseInt(b.replace(/\D/g, '')) || 0;
      return aNum - bNum;
    });
    
    const validSelected = selectedArray.filter(id => 
      nodes.some(node => node.id === id)
    );
    
    if (validSelected.length === 0) return null;
    
    const allDistances = new Map(validSelected.map(selId => [selId, bfs(selId)]));
    
    return nodes.map(node => {
      const distances = validSelected.map(selId => {
        const dist = allDistances.get(selId)?.get(node.id);
        return dist !== undefined && dist !== Infinity ? dist : '∞';
      });
      return { 
        node: node.id, 
        distances, 
        representation: `(${distances.join(',')})` 
      };
    }).sort((a,b) => {
      const aNum = parseInt(a.node.replace(/\D/g, '')) || 0;
      const bNum = parseInt(b.node.replace(/\D/g, '')) || 0;
      return aNum - bNum;
    });
  }, [feedback.showDistances, selectedNodes, currentGraph, bfs]);

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.15, 2.5));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.5));
  const resetView = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="cobaPage">
      <Navbar />
      
      {/* Hero Section */}
      <section className="coba-hero">
        <div className="container">
          <div className="coba-hero-eyebrow">
            <FontAwesomeIcon icon={faFlask} />
            <span>Laboratorium Graf Interaktif</span>
          </div>
          <h1 className="coba-title">
            Lab Eksperimen <span className="coba-title-highlight">Teori Graf</span>
          </h1>
          <p className="coba-subtitle">
            Simulasikan penempatan sensor secara langsung pada simpul graf interaktif untuk menguji Himpunan Dominasi (Penjaga) dan Dimensi Metrik (Pembeda).
          </p>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="coba-layout-grid">
        
        {/* Left Side: Sidebar Controls */}
        <aside className="coba-sidebar">
          
          {/* Card 1: Mode Switcher & Selector */}
          <div className="sidebar-card">
            <label className="sidebar-field-label">
              MODE EKSPERIMEN
            </label>
            <div className="mode-toggle-group">
              <button
                type="button"
                className={`mode-btn ${activeMode === 'metric' ? 'active active-metric' : ''}`}
                onClick={() => handleModeChange('metric')}
              >
                <FontAwesomeIcon icon={faSearch} />
                <span>Pembeda (β)</span>
              </button>
              <button
                type="button"
                className={`mode-btn ${activeMode === 'domination' ? 'active active-domination' : ''}`}
                onClick={() => handleModeChange('domination')}
              >
                <FontAwesomeIcon icon={faShieldAlt} />
                <span>Dominasi (γ)</span>
              </button>
            </div>

            <label htmlFor="graph-type" className="sidebar-field-label">
              PILIH STRUKTUR JARINGAN
            </label>
            <div className="select-wrapper">
              <select 
                id="graph-type"
                value={currentGraph}
                onChange={handleGraphChange}
                className="coba-select"
              >
                <optgroup label="Graf Utama">
                  <option value="GAMBAR_II1">Graf G (5 titik, 7 sisi)</option>
                  <option value="GAMBAR_II3">Graf Gambar II.3 (8 titik, β=2, γ=3)</option>
                  <option value="GAMBAR_II12">Graf Dimensi Metrik 2 (6 titik)</option>
                </optgroup>
                <optgroup label="Graf Khusus">
                  <option value="LINTASAN_P8">Lintasan Lurus P₈ (β=1, γ=3)</option>
                  <option value="SIKLUS_C8">Siklus Melingkar C₈ (β=2, γ=3)</option>
                  <option value="BINTANG_K1_7">Bintang Terpusat K₁,₇ (γ=1, β=6)</option>
                  <option value="LENGKAP_K5">Lengkap Padat K₅ (γ=1, β=4)</option>
                  <option value="BIPARTIT_K3_3">Bipartit K₃,₃ (γ=2, β=4)</option>
                  <option value="RODA_W6">Roda W₆ (γ=1, β=3)</option>
                </optgroup>
              </select>
            </div>
            
            <div className="target-telemetry">
              <div className="target-telemetry-header">
                <span className="telemetry-title">Target Teoretis Graf</span>
              </div>
              <div className="telemetry-rows">
                <div className={`telemetry-row ${activeMode === 'metric' ? 'active-metric' : ''}`}>
                  <div className="telemetry-info">
                    <span className="telemetry-label">Dimensi Metrik β(G)</span>
                    <span className="telemetry-subtext">
                      {activeMode === 'metric' ? 'Sedang Diuji (Mode Aktif)' : 'Batas Minimum Patokan'}
                    </span>
                  </div>
                  <div className="telemetry-val">
                    <span className="telemetry-num">{GRAPHS[currentGraph].metricDimension}</span>
                    <span className="telemetry-unit">patokan</span>
                  </div>
                </div>

                <div className={`telemetry-row ${activeMode === 'domination' ? 'active-domination' : ''}`}>
                  <div className="telemetry-info">
                    <span className="telemetry-label">Bilangan Dominasi γ(G)</span>
                    <span className="telemetry-subtext">
                      {activeMode === 'domination' ? 'Sedang Diuji (Mode Aktif)' : 'Batas Minimum Penjaga'}
                    </span>
                  </div>
                  <div className="telemetry-val">
                    <span className="telemetry-num">{GRAPHS[currentGraph].dominationNumber}</span>
                    <span className="telemetry-unit">penjaga</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card 2: Interactive Controls */}
          <div className="sidebar-card">
            <h3 className="sidebar-card-title">Kontrol Eksperimen</h3>
            <div className="actions-grid">
              <button 
                type="button" 
                onClick={resetSelection} 
                className="action-btn action-btn-reset" 
                title="Hapus seluruh pilihan simpul"
              >
                <FontAwesomeIcon icon={faEraser} />
                <span>Reset</span>
              </button>
              <button 
                type="button" 
                onClick={checkAnswer} 
                className="action-btn action-btn-cek" 
                title="Cek apakah pilihan simpul sudah memenuhi syarat"
              >
                <FontAwesomeIcon icon={faCheck} />
                <span>Cek</span>
              </button>
              <button 
                type="button" 
                onClick={showSolution} 
                className="action-btn action-btn-solusi" 
                title="Tampilkan contoh himpunan penyelesaian optimal"
              >
                <FontAwesomeIcon icon={faLightbulb} />
                <span>Solusi</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!showStepSolver) resetSelection();
                setShowStepSolver(prev => !prev);
              }}
              className={`action-btn-step ${showStepSolver ? 'active' : ''}`}
              title="Buka panduan langkah penyelesaian interaktif"
            >
              <FontAwesomeIcon icon={faPlay} />
              <span>{showStepSolver ? 'Tutup Simulator Langkah' : 'Simulator Langkah (Step-by-Step)'}</span>
            </button>
            
            <div className="zoom-controls">
              <span className="zoom-label">Skala Tampilan:</span>
              <div className="zoom-btn-group">
                <button type="button" onClick={zoomOut} className="zoom-btn" title="Perkecil (-)">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <button 
                  type="button"
                  onClick={resetView} 
                  className="zoom-indicator" 
                  title="Klik untuk reset zoom & posisi (100%)"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button type="button" onClick={zoomIn} className="zoom-btn" title="Perbesar (+)">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Card 3: Selected Nodes */}
          <div className="sidebar-card">
            <div className="sidebar-card-header">
              <h3 className="sidebar-card-title">
                {activeMode === 'metric' ? 'Patokan Metrik' : 'Pos Penjaga Dominasi'}
              </h3>
              <span className={`count-badge ${activeMode === 'domination' ? 'domination' : 'metric'}`}>
                {selectedNodes.size} Terpilih
              </span>
            </div>
            <p className="sidebar-card-desc">
              {activeMode === 'metric'
                ? 'Simpul yang Anda tandai sebagai patokan koordinat metrik:'
                : 'Simpul yang Anda tugaskan sebagai penjaga/sensor pemantau:'}
            </p>
            {selectedNodes.size > 0 ? (
              <div className="selected-nodes-container">
                {Array.from(selectedNodes).sort((a,b) => {
                  const aNum = parseInt(a.replace(/\D/g, '')) || 0;
                  const bNum = parseInt(b.replace(/\D/g, '')) || 0;
                  return aNum - bNum;
                }).map(node => (
                  <button 
                    type="button"
                    key={node} 
                    className={`selected-node-badge ${activeMode === 'domination' ? 'domination' : 'metric'}`}
                    onClick={() => toggleNodeSelection(node)}
                    title={`Klik untuk melepas simpul ${node}`}
                  >
                    <span>{node}</span>
                    <FontAwesomeIcon icon={faTimes} className="badge-remove-icon" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="selected-nodes-empty">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>Belum ada simpul dipilih. Silakan klik bulatan simpul pada kanvas.</span>
              </div>
            )}
          </div>

        </aside>

        {/* Right Side: Interactive Canvas Visualizer */}
        <div className="coba-canvas-column">
          {showStepSolver && (
            <StepByStepSolver
              graph={GRAPHS[currentGraph]}
              mode={activeMode}
              bfs={bfs}
              onStepChange={({ selectedNodes: sNodes, highlightedNodes: hNodes }) => {
                setSelectedNodes(new Set(sNodes));
                setHighlightedNodes(new Set(hNodes));
              }}
              onClose={() => {
                setShowStepSolver(false);
                resetSelection();
              }}
            />
          )}

          <div className="coba-canvas-card">
            <div className="canvas-header-bar">
              <div className="canvas-graph-meta">
                <span className="canvas-graph-name">{GRAPHS[currentGraph].name}</span>
                <span className="canvas-meta-tag">
                  {GRAPHS[currentGraph].nodes.length} Simpul • {GRAPHS[currentGraph].edges.length} Sisi
                </span>
              </div>
              <div className="canvas-hint">
                <FontAwesomeIcon icon={faArrowsAlt} />
                <span>
                  {activeMode === 'metric'
                    ? 'Klik simpul untuk memilih patokan • Geser kanvas untuk navigasi'
                    : 'Klik simpul untuk menaruh penjaga • Geser kanvas untuk navigasi'}
                </span>
              </div>
              <button 
                type="button"
                onClick={resetView} 
                className="canvas-reset-view-btn"
                title="Kembalikan posisi dan zoom ke tampilan awal"
              >
                <FontAwesomeIcon icon={faRedo} />
                <span>Reset Posisi</span>
              </button>
            </div>

            <div className="coba-canvas-wrapper">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="coba-canvas"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Dynamic Feedback Card */}
      {feedback.message && (
        <div className="coba-feedback-wrapper" ref={explanationRef}>
          <div className={`coba-feedback-card feedback-${feedback.type}`}>
            <div className="feedback-header">
              <h3>
                {feedback.type === 'correct' && <FontAwesomeIcon icon={faCheck} />}
                {feedback.type === 'incorrect' && <FontAwesomeIcon icon={faTimes} />}
                {feedback.type === 'partial' && <FontAwesomeIcon icon={faInfoCircle} />}
                {feedback.type === 'info' && <FontAwesomeIcon icon={faLightbulb} />}
                {feedback.message}
              </h3>
              <button 
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="feedback-toggle-btn"
              >
                {showExplanation ? (
                  <><FontAwesomeIcon icon={faChevronUp} /> Sembunyikan Rincian</>
                ) : (
                  <><FontAwesomeIcon icon={faChevronDown} /> Tampilkan Rincian</>
                )}
              </button>
            </div>
            
            {showExplanation && (
              <div className="feedback-body">
                <p className="feedback-explanation">{feedback.explanation}</p>
                
                {feedback.correctAnswer.length > 0 && (
                  <div className="solution-box">
                    <h4>
                      {activeMode === 'metric' 
                        ? '💡 Contoh Himpunan Pembeda Minimum yang Valid:' 
                        : '💡 Contoh Himpunan Dominasi Minimum yang Valid:'}
                    </h4>
                    <div className="solution-badge-grid">
                      {feedback.correctAnswer.map(node => (
                        <span 
                          key={`sol-${node}`} 
                          className="solution-badge"
                          style={{ background: activeMode === 'domination' ? '#047857' : 'var(--coba-primary)' }}
                        >
                          {node}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Domination Report Table */}
                {activeMode === 'domination' && feedback.dominationReport && (
                  <div className="table-section">
                    <h4>🛡️ Status Pengawasan Simpul Jaringan</h4>
                    <p className="table-subtitle">
                      Setiap simpul harus bertindak sebagai penjaga atau bertetangga langsung dengan minimal satu penjaga:
                    </p>
                    <div className="table-responsive-wrapper">
                      <table className="distance-table">
                        <thead>
                          <tr>
                            <th>Simpul</th>
                            <th>Status Pemantauan</th>
                            <th>Penjaga yang Mengawasi</th>
                            <th>Status Keamanan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feedback.dominationReport.map(row => (
                            <tr key={row.node} className={row.isCovered ? 'row-covered' : 'row-uncovered'}>
                              <td>
                                <span className={`node-badge-small ${selectedNodes.has(row.node) ? 'selected-node' : ''}`}>
                                  {row.node}
                                </span>
                              </td>
                              <td>{row.status}</td>
                              <td>{row.guard}</td>
                              <td>
                                <span className={`status-tag ${row.isCovered ? 'status-covered' : 'status-uncovered'}`}>
                                  {row.isCovered ? '✓ Terawasi' : '✗ Belum Terawasi'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Metric Distance Table */}
                {activeMode === 'metric' && getDistanceTable() && (
                  <div className="table-section">
                    <h4>📊 Tabel Representasi Jarak (Vektor Jarak)</h4>
                    <p className="table-subtitle">
                      Masing-masing koordinat r(v|W) = (d(v, w₁), d(v, w₂), ...) menunjukkan jarak simpul terhadap seluruh patokan navigasi
                    </p>
                    <div className="table-responsive-wrapper">
                      <table className="distance-table">
                        <thead>
                          <tr>
                            <th>Simpul</th>
                            {Array.from(selectedNodes).sort((a,b) => {
                              const aNum = parseInt(a.replace(/\D/g, '')) || 0;
                              const bNum = parseInt(b.replace(/\D/g, '')) || 0;
                              return aNum - bNum;
                            }).map(selNode => (
                              <th key={selNode}>Jarak ke {selNode}</th>
                            ))}
                            <th>Representasi Koordinat r(v|W)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getDistanceTable().map(row => (
                            <tr key={row.node} className={selectedNodes.has(row.node) ? 'selected-row' : ''}>
                              <td>
                                <span className={`node-badge-small ${selectedNodes.has(row.node) ? 'selected-node' : ''}`}>
                                  {row.node}
                                </span>
                              </td>
                              {row.distances.map((dist, i) => (
                                <td key={i}>{dist}</td>
                              ))}
                              <td>
                                <code className="representation-code">
                                  {row.representation}
                                </code>
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

      {/* Bottom Concepts Panel (Accordion) */}
      <section className="info-accordion-card">
        <button 
          type="button"
          onClick={() => setShowInfoPanel(!showInfoPanel)}
          className="info-accordion-header"
          aria-expanded={showInfoPanel}
        >
          <div className="info-accordion-title-wrap">
            <FontAwesomeIcon icon={faInfoCircle} className="info-accordion-icon" />
            <h3 className="info-accordion-title">Konsep Teori & Teorema Graf</h3>
          </div>
          <div className="info-accordion-toggle">
            <FontAwesomeIcon icon={showInfoPanel ? faChevronUp : faChevronDown} />
          </div>
        </button>
        
        {showInfoPanel && (
          <div className="accordion-body-wrapper">
            <div className="accordion-tabs-bar">
              <button 
                type="button"
                onClick={() => setActiveTab('panduan')}
                className={`accordion-tab-btn ${activeTab === 'panduan' ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={faQuestionCircle} />
                <span>Cara Bereksperimen</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('teori')}
                className={`accordion-tab-btn ${activeTab === 'teori' ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={faBook} />
                <span>Definisi Istilah</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('teorema')}
                className={`accordion-tab-btn ${activeTab === 'teorema' ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={faCogs} />
                <span>Teorema Kunci</span>
              </button>
            </div>
            
            <div className="accordion-content-body">
              {activeTab === 'panduan' && (
                <div className="tab-pane">
                  <h4 className="tab-pane-title">Panduan Penggunaan Lab Graf Interaktif</h4>
                  <div className="steps-cards-grid">
                    <div className="step-craft-card">
                      <div className="step-craft-number">1</div>
                      <div className="step-craft-content">
                        <h5>Pilih Mode Eksperimen</h5>
                        <p>Pilih <strong>Pembeda (β)</strong> untuk menguji keunikan koordinat vektor jarak simpul, atau <strong>Dominasi (γ)</strong> untuk penempatan pos pengawas keamanan jaringan.</p>
                      </div>
                    </div>
                    <div className="step-craft-card">
                      <div className="step-craft-number">2</div>
                      <div className="step-craft-content">
                        <h5>Pilih Struktur Graf</h5>
                        <p>Gunakan menu pilihan untuk memilih graf standar atau keluarga graf khusus seperti Lintasan P₈, Siklus C₈, Bintang K₁,₇, hingga Graf Roda W₆.</p>
                      </div>
                    </div>
                    <div className="step-craft-card">
                      <div className="step-craft-number">3</div>
                      <div className="step-craft-content">
                        <h5>Pilih Simpul pada Kanvas</h5>
                        <p>Klik langsung pada lingkaran simpul di kanvas visual. Geser (*drag*) dan atur skala (*zoom*) untuk meneliti hubungan ketetanggaan.</p>
                      </div>
                    </div>
                    <div className="step-craft-card">
                      <div className="step-craft-number">4</div>
                      <div className="step-craft-content">
                        <h5>Periksa dan Analisis</h5>
                        <p>Tekan tombol <strong>Cek</strong> untuk memeriksa keterpenuhan syarat, atau buka <strong>Simulator Langkah</strong> untuk animasi pemantauan tahap demi tahap.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'teori' && (
                <div className="tab-pane">
                  <h4 className="tab-pane-title">Definisi Parameter Graf</h4>
                  <div className="theory-cards-grid">
                    <div className="theory-craft-card">
                      <div className="theory-badge domination">Dominasi</div>
                      <h5>Himpunan Dominasi (Dominating Set)</h5>
                      <p>
                        Himpunan simpul S ⊆ V(G) sedemikian rupa sehingga setiap simpul di luar S bertetangga langsung dengan sekurang-kurangnya satu simpul di S.
                      </p>
                      <div className="theory-param">
                        <span>Parameter Minimum:</span>
                        <strong>Bilangan Dominasi γ(G)</strong>
                      </div>
                    </div>
                    <div className="theory-craft-card">
                      <div className="theory-badge metric">Metrik</div>
                      <h5>Himpunan Pembeda (Resolving Set)</h5>
                      <p>
                        Himpunan patokan W = {'{w₁, w₂, ..., wₖ}'} ⊆ V(G) sedemikian rupa sehingga untuk setiap dua simpul berbeda u, v ∈ V(G), berlaku r(u|W) ≠ r(v|W).
                      </p>
                      <div className="theory-param">
                        <span>Parameter Minimum:</span>
                        <strong>Dimensi Metrik β(G)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'teorema' && (
                <div className="tab-pane">
                  <h4 className="tab-pane-title">Teorema Karakterisasi Keluarga Graf</h4>
                  <div className="theorems-grid">
                    <div className="theorem-craft-card">
                      <div className="theorem-header">
                        <h5>Graf Lintasan Pₙ (n ≥ 3)</h5>
                        <span className="theorem-family-tag">Lintasan</span>
                      </div>
                      <p>Cukup 1 simpul ujung untuk membedakan seluruh titik lain secara berurutan, sedangkan pengawasan memerlukan pembagian kelipatan 3.</p>
                      <div className="theorem-formulas">
                        <span className="formula-chip">Dimensi Metrik: β(Pₙ) = 1</span>
                        <span className="formula-chip">Bilangan Dominasi: γ(Pₙ) = ⌈n/3⌉</span>
                      </div>
                    </div>
                    <div className="theorem-craft-card">
                      <div className="theorem-header">
                        <h5>Graf Lengkap Kₙ (n ≥ 3)</h5>
                        <span className="theorem-family-tag">Lengkap</span>
                      </div>
                      <p>Satu simpul terhubung ke semua titik (mendominasi instan), tetapi seluruh simpul berjarak 1 sama lain sehingga hampir semua simpul harus jadi patokan.</p>
                      <div className="theorem-formulas">
                        <span className="formula-chip">Dimensi Metrik: β(Kₙ) = n - 1</span>
                        <span className="formula-chip">Bilangan Dominasi: γ(Kₙ) = 1</span>
                      </div>
                    </div>
                    <div className="theorem-craft-card">
                      <div className="theorem-header">
                        <h5>Graf Bintang K₁,ₙ₋₁</h5>
                        <span className="theorem-family-tag">Bintang</span>
                      </div>
                      <p>Simpul pusat tunggal mengawasi semua daun, tetapi seluruh daun berjarak 2 satu sama lain sehingga n-2 daun harus dijadikan patokan koordinat.</p>
                      <div className="theorem-formulas">
                        <span className="formula-chip">Dimensi Metrik: β(K₁,ₙ₋₁) = n - 2</span>
                        <span className="formula-chip">Bilangan Dominasi: γ(K₁,ₙ₋₁) = 1</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Official Academic Footer */}
      <Footer />
    </div>
  );
};

export default Coba;