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

  // Enhanced graph data - sesuai dengan Gambar di Bab II PDF
  const GRAPHS = {
    GAMBAR_II1: {
      name: "Gambar II.1 - Graf G",
      nodes: [
        { id: 'v1', x: 0.5, y: 0.3 },
        { id: 'v2', x: 0.25, y: 0.6 },
        { id: 'v3', x: 0.4, y: 0.7 },
        { id: 'v4', x: 0.6, y: 0.7 },
        { id: 'v5', x: 0.75, y: 0.6 }
      ],
      edges: [
        ['v1','v2'],['v2','v3'],['v3','v4'],['v4','v5'],['v5','v1'],
        ['v1','v3'],['v1','v4']
      ],
      metricDimension: 2,
      dominationNumber: 2,
      possibleSolutions: [['v1', 'v3']],
      description: "Graf G dengan 5 titik dan 7 sisi. |G|=5, ||G||=7, δ(G)=2, Δ(G)=4",
      hint: "Titik v1 bertetangga dengan v2, v3, v4, v5 sehingga N(v1) = {v2, v3, v4, v5}"
    },
    GAMBAR_II3: {
      name: "Gambar II.3 - Graf dengan Diameter 4 dan Radius 3",
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
      metricDimension: 3,
      dominationNumber: 3,
      possibleSolutions: [['v2', 'v4', 'v7']],
      description: "Graf dengan diameter 4 dan radius 3. ecc(v1)=4, ecc(v2)=3, diam(G)=4, rad(G)=3",
      hint: "Diameter adalah jarak maksimum antar dua titik. Radius adalah eksentrisitas minimum."
    },
    GAMBAR_II12: {
      name: "Gambar II.12 - Graf dengan Dimensi Metrik 2",
      nodes: [
        { id: 'v1', x: 0.25, y: 0.3 },
        { id: 'v2', x: 0.4, y: 0.3 },
        { id: 'v3', x: 0.55, y: 0.3 },
        { id: 'v4', x: 0.7, y: 0.3 },
        { id: 'v5', x: 0.5, y: 0.6 },
        { id: 'v6', x: 0.35, y: 0.6 }
      ],
      edges: [
        ['v1','v2'],['v2','v3'],['v3','v4'],['v3','v5'],['v2','v6']
      ],
      metricDimension: 2,
      dominationNumber: 2,
      possibleSolutions: [['v3', 'v5']],
      description: "Graf G dengan dimensi metrik β(G) = 2. W = {v3, v5} adalah himpunan pembeda minimum",
      hint: "Representasi: r(v1|W)=(1,2), r(v2|W)=(1,1), r(v3|W)=(0,2), r(v4|W)=(1,3), r(v5|W)=(2,0), r(v6|W)=(2,1)"
    },
    GAMBAR_II19: {
      name: "Gambar II.19 - Graf dengan γ(G)=6, β(G)=4, γM(G)=7",
      nodes: [
        ...Array.from({length: 12}, (_, i) => ({
          id: `v${i+1}`,
          x: 0.5 + 0.4 * Math.cos((i * 2 * Math.PI) / 12),
          y: 0.5 + 0.4 * Math.sin((i * 2 * Math.PI) / 12)
        })),
        { id: 'v13', x: 0.7, y: 0.25 },
        { id: 'v14', x: 0.85, y: 0.4 },
        { id: 'v15', x: 0.85, y: 0.6 },
        { id: 'v16', x: 0.7, y: 0.75 },
        { id: 'v17', x: 0.92, y: 0.5 }
      ],
      edges: [
        ...Array.from({length: 11}, (_, i) => [`v${i+1}`, `v${i+2}`]),
        ['v12', 'v1'],
        ['v13','v14'],['v14','v15'],['v15','v16'],['v16','v13'],
        ['v12','v13'],['v1','v17'],['v17','v14']
      ],
      metricDimension: 4,
      dominationNumber: 6,
      possibleSolutions: [['v3', 'v6', 'v8', 'v10', 'v12', 'v15', 'v16']],
      description: "Graf dengan γ(G)=6, β(G)=4, γM(G)=7. Contoh dimana γM(G) > max{γ(G), β(G)}",
      hint: "D = {v3,v6,v8,v10,v12,v16} adalah himpunan dominasi minimum. R = {v6,v12,v15,v16} adalah himpunan pembeda minimum."
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
      description: "Graf lintasan dengan 8 titik. β(Pn) = 1, γ(P₈) = ⌈8/3⌉ = 3",
      hint: "Untuk lintasan, satu titik ujung sudah cukup sebagai himpunan pembeda."
    },
    SIKLUS_C8: {
      name: "Graf Siklus C₈",
      nodes: Array.from({length: 8}, (_, i) => ({
        id: `v${i+1}`,
        x: 0.5 + 0.35 * Math.cos((i * 2 * Math.PI) / 8),
        y: 0.5 + 0.35 * Math.sin((i * 2 * Math.PI) / 8)
      })),
      edges: [
        ...Array.from({length: 7}, (_, i) => [`v${i+1}`, `v${i+2}`]),
        ['v8', 'v1']
      ],
      metricDimension: 2,
      dominationNumber: 3,
      possibleSolutions: [
        ['v1', 'v3'], ['v2', 'v5'], ['v3', 'v6']
      ],
      description: "Graf siklus dengan 8 titik. β(Cn) = 2 untuk n ≥ 3, γ(C₈) = ⌈8/3⌉ = 3",
      hint: "Dua titik yang tidak berseberangan diperlukan untuk membedakan semua titik."
    },
    BINTANG_K1_7: {
      name: "Graf Bintang K₁,₇",
      nodes: [
        { id: 'c', x: 0.5, y: 0.5 },
        ...Array.from({length: 7}, (_, i) => ({
          id: `v${i+1}`,
          x: 0.5 + 0.35 * Math.cos((i * 2 * Math.PI) / 7),
          y: 0.5 + 0.35 * Math.sin((i * 2 * Math.PI) / 7)
        }))
      ],
      edges: Array.from({length: 7}, (_, i) => ['c', `v${i+1}`]),
      metricDimension: 6,
      dominationNumber: 1,
      possibleSolutions: [
        ['v1', 'v2', 'v3', 'v4', 'v5', 'v6']
      ],
      description: "Graf bintang dengan 1 pusat dan 7 daun. γ(K₁,n) = 1, β(K₁,n) = n-1, γM(K₁,n) = n",
      hint: "Titik pusat mendominasi semua, tapi n-1 daun diperlukan sebagai pembeda."
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
        ['v1', 'v2', 'v3', 'v4'], ['v2', 'v3', 'v4', 'v5']
      ],
      description: "Graf lengkap dengan 5 titik. γ(Kn) = 1, β(Kn) = n-1, γM(Kn) = n-1",
      hint: "Satu titik mendominasi semua, tapi hampir semua titik diperlukan untuk membedakan."
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
      possibleSolutions: [['u1', 'v1']],
      description: "Graf bipartit lengkap K₃,₃. γ(Km,n) = 2 (m,n≥2), β(Km,n) = m+n-2, γM = n-2",
      hint: "Satu titik dari setiap partisi membentuk himpunan dominasi minimum."
    },
    RODA_W6: {
      name: "Graf Roda W₆",
      nodes: [
        { id: 'c', x: 0.5, y: 0.5 },
        ...Array.from({length: 6}, (_, i) => ({
          id: `v${i+1}`,
          x: 0.5 + 0.32 * Math.cos((i * 2 * Math.PI) / 6),
          y: 0.5 + 0.32 * Math.sin((i * 2 * Math.PI) / 6)
        }))
      ],
      edges: [
        ...Array.from({length: 6}, (_, i) => ['c', `v${i+1}`]),
        ...Array.from({length: 5}, (_, i) => [`v${i+1}`, `v${i+2}`]),
        ['v6', 'v1']
      ],
      metricDimension: 2,
      dominationNumber: 1,
      possibleSolutions: [
        ['c', 'v1'], ['c', 'v2'], ['c', 'v3']
      ],
      description: "Graf roda dengan pusat c dan rim 6 titik. β(Wn) bergantung pada n, γ(Wn) = 1",
      hint: "Pusat dan satu titik rim sudah cukup untuk membedakan semua titik."
    },
    POHON_T: {
      name: "Gambar II.17 - Pohon T dengan β(T)=6",
      nodes: [
        { id: 'v5', x: 0.3, y: 0.3 },
        { id: 'v1', x: 0.15, y: 0.2 },
        { id: 'v2', x: 0.2, y: 0.35 },
        { id: 'v3', x: 0.25, y: 0.2 },
        { id: 'v4', x: 0.35, y: 0.2 },
        { id: 'v8', x: 0.4, y: 0.35 },
        { id: 'v6', x: 0.45, y: 0.3 },
        { id: 'v9', x: 0.45, y: 0.45 },
        { id: 'v10', x: 0.5, y: 0.5 },
        { id: 'v11', x: 0.55, y: 0.45 },
        { id: 'v7', x: 0.6, y: 0.3 },
        { id: 'v18', x: 0.65, y: 0.35 },
        { id: 'v12', x: 0.5, y: 0.6 },
        { id: 'v13', x: 0.55, y: 0.65 },
        { id: 'v14', x: 0.6, y: 0.7 },
        { id: 'v15', x: 0.65, y: 0.65 },
        { id: 'v16', x: 0.7, y: 0.7 },
        { id: 'v17', x: 0.45, y: 0.65 },
        { id: 'v19', x: 0.75, y: 0.5 },
        { id: 'v20', x: 0.8, y: 0.45 },
        { id: 'v21', x: 0.8, y: 0.55 }
      ],
      edges: [
        ['v5','v1'],['v5','v2'],['v5','v3'],['v5','v4'],['v5','v8'],
        ['v6','v8'],['v6','v9'],['v6','v7'],
        ['v9','v10'],['v10','v11'],['v10','v12'],
        ['v7','v18'],
        ['v12','v13'],['v12','v17'],
        ['v13','v14'],['v13','v15'],
        ['v15','v16'],
        ['v19','v7'],['v19','v20'],['v19','v21']
      ],
      metricDimension: 6,
      dominationNumber: 5,
      possibleSolutions: [['v1', 'v4', 'v8', 'v11', 'v16', 'v18']],
      description: "Pohon T dengan σ(T)=11, ex(T)=5, β(T)=6. Titik mayor: v5, v6, v7, v13, v19",
      hint: "β(T) = σ(T) - ex(T) = 11 - 5 = 6. Titik terminal digunakan sebagai himpunan pembeda."
    },
    GRAF_2_LINTASAN: {
      name: "Gambar II.18 - Graf 2-Lintasan dengan 14 titik",
      nodes: Array.from({length: 14}, (_, i) => ({
        id: `v${i+1}`,
        x: 0.08 + (i * 0.06),
        y: 0.5
      })),
      edges: [
        ...Array.from({length: 13}, (_, i) => [`v${i+1}`, `v${i+2}`]),
        ...Array.from({length: 12}, (_, i) => [`v${i+1}`, `v${i+3}`])
      ],
      metricDimension: 2,
      dominationNumber: 5,
      possibleSolutions: [['v2', 'v7'], ['v3', 'v8']],
      description: "Graf k-lintasan dengan k=2 dan 14 titik. β(G)=k=2, γM(G)=γ(G)",
      hint: "Untuk k-lintasan, vi dan vj dominasi jika |i-j| ≤ k. Dimensi metrik β(G) = k."
    }
  };

  // State
  const [currentGraph, setCurrentGraph] = useState('GAMBAR_II1');
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
      ctx.font = `bold ${Math.min(nodeRadius * 0.65, 12)}px Inter, sans-serif`;
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
        explanation: 'Silakan pilih beberapa simpul terlebih dahulu untuk membentuk himpunan pembeda.', 
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
          message: '🎉 SEMPURNA! Himpunan Pembeda Optimal!', 
          type: 'correct', 
          explanation: `Luar biasa! Anda menemukan himpunan pembeda (resolving set) dengan ${targetSize} simpul. Ini adalah dimensi metrik β(G) = ${targetSize}.`, 
        };
      } else if (selectedSize < targetSize) {
        feedbackData = { 
          ...feedbackData, 
          message: '🤔 Hasil Tidak Biasa', 
          type: 'partial', 
          explanation: `Himpunan Anda valid dengan ukuran ${selectedSize}, tapi teori mengatakan dimensi metrik minimal ${targetSize}. Periksa kembali.`, 
        };
      } else {
        feedbackData = { 
          ...feedbackData, 
          message: '✅ Valid, Tapi Belum Optimal', 
          type: 'partial', 
          explanation: `Himpunan pembeda Anda valid, tapi bisa diperkecil menjadi ${targetSize} simpul untuk mencapai β(G).`, 
        };
      } 
      setHighlightedNodes(new Set(selectedNodes));
    } else {
      const examples = duplicateGroups.slice(0, 2).map(([rep, nodes]) => `{${nodes.join(', ')}}`).join(' dan ');
      feedbackData = { 
        ...feedbackData, 
        message: '❌ Belum Membentuk Himpunan Pembeda', 
        type: 'incorrect', 
        explanation: `Himpunan Anda belum bisa membedakan semua simpul. Simpul dengan representasi sama: ${examples}.\n\n💡 ${graphData.hint}`, 
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
        message: '💡 Contoh Himpunan Pembeda Optimal', 
        type: 'info', 
        explanation: `Ini adalah salah satu himpunan pembeda minimum dengan β(G) = ${graphData.metricDimension} simpul. ${graphData.description}`, 
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
    }).sort((a,b) => {
      const aNum = parseInt(a.node.replace(/\D/g, '')) || 0;
      const bNum = parseInt(b.node.replace(/\D/g, '')) || 0;
      return aNum - bNum;
    });
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
            visualisasi Graf
          </h1>
          <p className="subtitle">
            Eksplorasi diagram-diagram dari Bab II: Himpunan Dominasi dan Dimensi Matrix
          </p>
        </div>
        
        <div className="main-content">
          <div className="control-panel">
            <div className="control-card">
              <label htmlFor="graph-type" style={{color: '#334155', fontWeight: '600', fontSize: '0.9rem'}}>
                Pilih Graf 
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
                  fontSize: '0.95rem', 
                  backgroundColor: '#f8fafc',
                  color: '#334155'
                }}
              >
                <optgroup label="Gambar dari Bab II PDF">
                  <option value="GAMBAR_II1">Gambar II.1 - Graf G (|G|=5, ||G||=7)</option>
                  <option value="GAMBAR_II3">Gambar II.3 - Graf diam=4, rad=3</option>
                  <option value="GAMBAR_II12">Gambar II.12 - Graf β(G)=2</option>
                  <option value="GAMBAR_II19">Gambar II.19 - Graf γ=6, β=4, γM=7</option>
                  <option value="POHON_T">Gambar II.17 - Pohon T (β(T)=6)</option>
                  <option value="GRAF_2_LINTASAN">Gambar II.18 - Graf 2-Lintasan</option>
                </optgroup>
                <optgroup label="Graf Khusus">
                  <option value="LINTASAN_P8">Lintasan P₈ (β=1)</option>
                  <option value="SIKLUS_C8">Siklus C₈ (β=2)</option>
                  <option value="BINTANG_K1_7">Bintang K₁,₇ (γ=1, β=6)</option>
                  <option value="LENGKAP_K5">Lengkap K₅ (γ=1, β=4)</option>
                  <option value="BIPARTIT_K3_3">Bipartit K₃,₃ (γ=2, β=4)</option>
                  <option value="RODA_W6">Roda W₆ (β=2)</option>
                </optgroup>
              </select>
            </div>
            
            <div className="control-card">
              <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>{GRAPHS[currentGraph].name}</h3>
              <p style={{fontSize: '0.9rem', lineHeight: '1.5'}}>{GRAPHS[currentGraph].description}</p>
              <div className="target-info" style={{marginTop: '1rem'}}>
                <strong><FontAwesomeIcon icon={faBullseye} /> Target:</strong> 
                <div style={{marginTop: '0.5rem'}}>
                  <span style={{display: 'block'}}>• Dimensi Metrik β(G) = <strong>{GRAPHS[currentGraph].metricDimension}</strong></span>
                  <span style={{display: 'block'}}>• Bilangan Dominasi γ(G) = <strong>{GRAPHS[currentGraph].dominationNumber}</strong></span>
                </div>
              </div>
            </div>
            
            <div className="control-card">
              <div className="action-buttons">
                <button onClick={resetSelection} className="action-btn reset-btn">
                  <FontAwesomeIcon icon={faEraser} /> Reset
                </button>
                <button onClick={checkAnswer} className="action-btn check-btn">
                  <FontAwesomeIcon icon={faCheck} /> Cek
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
                    {Array.from(selectedNodes).sort((a,b) => {
                      const aNum = parseInt(a.replace(/\D/g, '')) || 0;
                      const bNum = parseInt(b.replace(/\D/g, '')) || 0;
                      return aNum - bNum;
                    }).map(node => (
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
                  height: '500px',
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
                      <h4>💡 Contoh Himpunan Pembeda Minimum:</h4>
                      <div className="solution-nodes">
                        {feedback.correctAnswer.map(node => (
                          <span key={node} className="node-tag correct">{node}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {getDistanceTable() && (
                    <div className="distance-table">
                      <h4>📊 Tabel Representasi Jarak (Vektor Jarak):</h4>
                      <p style={{fontSize: '0.9rem', marginBottom: '1rem', color: '#64748b'}}>
                        Representasi r(v|W) = (d(v,w₁), d(v,w₂), ...) untuk setiap simpul v terhadap himpunan W
                      </p>
                      <div className="table-container">
                        <table>
                          <thead>
                            <tr>
                              <th>Simpul</th>
                              {Array.from(selectedNodes).sort((a,b) => {
                                const aNum = parseInt(a.replace(/\D/g, '')) || 0;
                                const bNum = parseInt(b.replace(/\D/g, '')) || 0;
                                return aNum - bNum;
                              }).map(selNode => (
                                <th key={selNode}>d(-, {selNode})</th>
                              ))}
                              <th>Representasi r(v|W)</th>
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
              Informasi Konsep dari Bab II
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
                  <FontAwesomeIcon icon={faBook} /> Definisi
                </button>
                <button className={`tab-btn ${activeTab === 'strategi' ? 'active' : ''}`} onClick={() => setActiveTab('strategi')}>
                  <FontAwesomeIcon icon={faCogs} /> Teorema
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'panduan' && (
                  <div className="tab-panel">
                    <div className="instruction-grid">
                      <div className="instruction-card">
                        <div className="instruction-number">1</div>
                        <h4>Pilih Graf</h4>
                        <p>Pilih graf dari dropdown. Tersedia diagram dari Gambar II.1 hingga II.19 sesuai PDF Bab II.</p>
                      </div>
                      <div className="instruction-card">
                        <div className="instruction-number">2</div>
                        <h4>Pilih Simpul</h4>
                        <p>Klik simpul untuk membentuk himpunan pembeda atau himpunan dominasi.</p>
                      </div>
                      <div className="instruction-card">
                        <div className="instruction-number">3</div>
                        <h4>Cek Validitas</h4>
                        <p>Klik "Cek" untuk memvalidasi apakah himpunan Anda adalah himpunan pembeda yang valid.</p>
                      </div>
                      <div className="instruction-card">
                        <div className="instruction-number">4</div>
                        <h4>Lihat Tabel Jarak</h4>
                        <p>Analisis tabel representasi jarak untuk memahami konsep dimensi metrik β(G).</p>
                      </div>
                    </div>
                    
                    <div style={{marginTop: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '8px', borderLeft: '4px solid #3b82f6'}}>
                      <h4 style={{margin: '0 0 0.5rem 0', color: '#1e40af'}}>💡 Tips Visualisasi</h4>
                      <ul style={{margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8'}}>
                        <li>Simpul berwarna <span style={{color: '#ef4444', fontWeight: 'bold'}}>merah</span> = simpul yang Anda pilih</li>
                        <li>Simpul berwarna <span style={{color: '#10b981', fontWeight: 'bold'}}>hijau</span> = simpul dengan representasi sama (perlu diperbaiki)</li>
                        <li>Gunakan zoom untuk melihat lebih detail pada graf yang kompleks</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'teori' && (
                  <div className="tab-panel">
                    <div className="theory-definition">
                      <h4>🎯 Himpunan Dominasi</h4>
                      <p>Himpunan D ⊆ V disebut <strong>himpunan dominasi</strong> dari graf G jika untuk setiap titik v ∈ V − D bertetangga dengan suatu titik di D.</p>
                      <p style={{marginTop: '0.5rem'}}><strong>Bilangan Dominasi γ(G):</strong> Kardinalitas terkecil dari himpunan dominasi di G.</p>
                      <p style={{fontSize: '0.85rem', fontStyle: 'italic', color: '#64748b'}}>Contoh: Pada graf bintang K₁,n, γ(K₁,n) = 1 (titik pusat mendominasi semua).</p>
                    </div>
                    
                    <div className="theory-definition">
                      <h4>📏 Himpunan Pembeda (Resolving Set)</h4>
                      <p>Himpunan W ⊆ V disebut <strong>himpunan pembeda</strong> jika r(x|W) ≠ r(y|W) untuk setiap dua titik berbeda x, y ∈ V.</p>
                      <p style={{marginTop: '0.5rem'}}>Representasi: r(v|W) = (d(v,w₁), d(v,w₂), ..., d(v,wₖ))</p>
                      <p style={{fontSize: '0.85rem', fontStyle: 'italic', color: '#64748b'}}>Vektor jarak dari titik v ke setiap anggota W.</p>
                    </div>
                    
                    <div className="theory-definition">
                      <h4>📐 Dimensi Metrik β(G)</h4>
                      <p><strong>Dimensi metrik</strong> dari G adalah bilangan bulat terkecil k sedemikian sehingga G mempunyai himpunan pembeda dengan k anggota.</p>
                     
                      <p style={{fontSize: '0.85rem', fontStyle: 'italic', color: '#64748b'}}>
                        Contoh: β(Pn) = 1, β(Cn) = 2, β(Kn) = n-1
                      </p>
                    </div>
                    
                    <div className="theory-definition">
                      <h4>🎯📏 Himpunan Dominasi-Lokasi-Metrik</h4>
                      <p>Himpunan S yang sekaligus merupakan <strong>himpunan dominasi DAN himpunan pembeda</strong>.</p>
                      <p style={{marginTop: '0.5rem'}}><strong>Bilangan Dominasi-Lokasi-Metrik γM(G):</strong> Kardinalitas minimum dari himpunan dominasi-lokasi-metrik.</p>
                      <p style={{marginTop: '0.5rem', padding: '0.5rem', background: '#fef3c7', borderRadius: '4px'}}>
                        <strong>Batas (Brigham et al., 2003):</strong><br/>
                        {/* max{γ(G), β(G)} ≤ γM(G) ≤ min{γ(G) + β(G), n  } */}
                      </p>
                    </div>
                  </div>
                )}
                
                {activeTab === 'strategi' && (
                  <div className="tab-panel">
                    <h4 style={{marginBottom: '1rem', color: '#1e40af'}}>📚 Teorema Penting dari Bab II</h4>
                    
                    <div style={{marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                      <h5 style={{margin: '0 0 0.5rem 0', color: '#0f172a'}}>Teorema II.6 (Chartrand et al., 2000)</h5>
                      <ul style={{margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8'}}>
                        <li>β(G) = 1 ⟺ G ≅ Pn (hanya graf lintasan)</li>
                        <li>β(G) = n−1 ⟺ G ≅ Kn (graf lengkap)</li>
                        <li>β(Cn) = 2 untuk n ≥ 3</li>
                      </ul>
                    </div>
                    
                    <div style={{marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                      <h5 style={{margin: '0 0 0.5rem 0', color: '#0f172a'}}>Teorema II.11 (Dimensi Metrik Pohon)</h5>
                      <p style={{margin: 0}}>Jika T adalah pohon bukan lintasan, maka:</p>
                      <p style={{margin: '0.5rem 0 0 0', fontWeight: 'bold', color: '#3b82f6'}}>β(T) = σ(T) − ex(T)</p>
                      <p style={{fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 0 0'}}>
                        σ(T) = total derajat terminal, ex(T) = banyak titik mayor eksterior
                      </p>
                    </div>
                    
                    <div style={{marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                      <h5 style={{margin: '0 0 0.5rem 0', color: '#0f172a'}}>Teorema II.18 & II.19 (Henning & Oellermann, 2004)</h5>
                      {/* <p style={{margin: '0 0 0.5rem 0'}}>γM(G) = n−1 ⟺ G ∈ {K₁,n₋₁, Kn}</p> */}
                      <p style={{margin: 0}}>γM(G) = n−2 ⟺ G ∈ ⋃⁷ᵢ₌₁ Fᵢ (7 keluarga graf khusus)</p>
                    </div>
                    
                    <div style={{marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                      <h5 style={{margin: '0 0 0.5rem 0', color: '#0f172a'}}>Teorema II.20 (Pohon)</h5>
                      <p style={{margin: 0, fontWeight: 'bold', color: '#3b82f6'}}>γM(T) = γ(T) + ℓ'(T) − |S'(T)|</p>
                      <p style={{fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 0 0'}}>
                        ℓ'(T) = banyak titik pendan bertetangga dengan titik pendukung kuat<br/>
                        S'(T) = himpunan titik pendukung kuat
                      </p>
                    </div>
                    
                    <div style={{padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fbbf24'}}>
                      <h5 style={{margin: '0 0 0.5rem 0', color: '#92400e'}}>💡 Sifat Titik Kembar (Teorema II.5)</h5>
                      <p style={{margin: 0}}>Jika S adalah himpunan dengan p ≥ 2 titik kembar pada graf G, maka setiap himpunan pembeda harus memuat <strong>p−1 titik dari S</strong>.</p>
                    </div>
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
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .icon { 
          color: #3b82f6;
        }

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

        .correct-answer {
          margin-top: 1.5rem;
          padding: 1rem;
          background: #f0fdf4;
          border-radius: 8px;
          border: 1px solid #86efac;
        }

        .correct-answer h4 {
          margin: 0 0 0.75rem 0;
          color: #166534;
        }

        .solution-nodes {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

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