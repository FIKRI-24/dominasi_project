import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './assets/contoh.css';

// --- SVG Graph Components with premium colors ---
function GambarII1() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      <line x1="100" y1="60" x2="50" y2="120" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="50" y1="120" x2="80" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="80" y1="140" x2="120" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="120" y1="140" x2="150" y2="120" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="150" y1="120" x2="100" y2="60" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="100" y1="60" x2="80" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="100" y1="60" x2="120" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Nodes */}
      <circle cx="100" cy="60" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="50" cy="120" r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      <circle cx="80" cy="140" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="120" cy="140" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="150" cy="120" r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      
      {/* Labels */}
      <text x="100" y="45" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v1</text>
      <text x="50" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v2</text>
      <text x="80" y="155" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v3</text>
      <text x="120" y="155" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v4</text>
      <text x="150" y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v5</text>
    </svg>
  );
}

function GambarII3() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      <line x1="20" y1="100" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="50" y1="100" x2="80" y2="100" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="80" y1="100" x2="110" y2="60" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="80" y1="100" x2="110" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="110" y1="60" x2="140" y2="60" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="110" y1="140" x2="140" y2="140" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="140" y1="60" x2="170" y2="100" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="140" y1="140" x2="170" y2="100" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Nodes */}
      <circle cx="20" cy="100" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="50" cy="100" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="80" cy="100" r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      <circle cx="110" cy="60" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="110" cy="140" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="140" cy="60" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="140" cy="140" r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      <circle cx="170" cy="100" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      
      {/* Labels */}
      <text x="20" y="85" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v1</text>
      <text x="50" y="85" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v2</text>
      <text x="80" y="85" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v3</text>
      <text x="110" y="45" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v4</text>
      <text x="110" y="155" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v5</text>
      <text x="140" y="45" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v6</text>
      <text x="140" y="155" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v7</text>
      <text x="170" y="85" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v8</text>
    </svg>
  );
}

function GambarII12() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      <line x1="50" y1="60" x2="80" y2="60" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="80" y1="60" x2="110" y2="60" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="110" y1="60" x2="140" y2="60" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="110" y1="60" x2="100" y2="120" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="80" y1="60" x2="70" y2="120" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Nodes */}
      <circle cx="50" cy="60" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="80" cy="60" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="110" cy="60" r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      <circle cx="140" cy="60" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="100" cy="120" r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      <circle cx="70" cy="120" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      
      {/* Labels */}
      <text x="50" y="45" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v1</text>
      <text x="80" y="45" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v2</text>
      <text x="110" y="45" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v3</text>
      <text x="140" y="45" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v4</text>
      <text x="100" y="135" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v5</text>
      <text x="70" y="135" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v6</text>
    </svg>
  );
}

function PathGraph() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100">
      {/* Edges */}
      <line x1="20" y1="50" x2="60" y2="50" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="60" y1="50" x2="100" y2="50" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="100" y1="50" x2="140" y2="50" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="140" y1="50" x2="180" y2="50" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Nodes */}
      <circle cx="20" cy="50" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="60" cy="50" r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      <circle cx="100" cy="50" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      <circle cx="140" cy="50" r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      <circle cx="180" cy="50" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      
      {/* Labels */}
      <text x="20" y="35" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v1</text>
      <text x="60" y="35" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v2</text>
      <text x="100" y="35" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v3</text>
      <text x="140" y="35" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v4</text>
      <text x="180" y="35" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">v5</text>
    </svg>
  );
}

function CycleGraph() {
  const points = []; 
  const centerX = 100, centerY = 100, radius = 70; 
  const nodes = 8;
  for (let i = 0; i < nodes; i++) { 
    const angle = (i * 2 * Math.PI / nodes) - Math.PI / 2; 
    points.push({ 
      x: centerX + radius * Math.cos(angle), 
      y: centerY + radius * Math.sin(angle) 
    }); 
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      {points.map((point, i) => { 
        const nextPoint = points[(i + 1) % points.length]; 
        return (
          <line key={`edge-${i}`} x1={point.x} y1={point.y} x2={nextPoint.x} y2={nextPoint.y} stroke="#cbd5e1" strokeWidth="2" />
        ); 
      })}
      
      {/* Nodes */}
      {points.map((point, i) => (
        <circle 
          key={`node-${i}`} 
          cx={point.x} 
          cy={point.y} 
          r="8" 
          fill={i % 2 === 0 ? '#10b981' : '#ffffff'} 
          stroke={i % 2 === 0 ? '#047857' : '#1e40af'} 
          strokeWidth={i % 2 === 0 ? '1.5' : '2.5'} 
        />
      ))}
      
      {/* Labels */}
      {points.map((point, i) => (
        <text key={`label-${i}`} x={point.x} y={point.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">
          v{i+1}
        </text>
      ))}
    </svg>
  );
}

function StarGraph() {
  const centerX = 100, centerY = 100; 
  const points = [{ x: centerX, y: centerY }]; 
  const nodes = 7; 
  const radius = 70;
  
  for (let i = 0; i < nodes - 1; i++) { 
    const angle = (i * 2 * Math.PI / (nodes - 1)); 
    points.push({ 
      x: centerX + radius * Math.cos(angle), 
      y: centerY + radius * Math.sin(angle) 
    }); 
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      {points.slice(1).map((point, i) => (
        <line key={`edge-${i}`} x1={centerX} y1={centerY} x2={point.x} y2={point.y} stroke="#cbd5e1" strokeWidth="2" />
      ))}
      
      {/* Nodes */}
      {points.map((point, i) => (
        <circle 
          key={`node-${i}`} 
          cx={point.x} 
          cy={point.y} 
          r="8" 
          fill={i === 0 ? '#10b981' : '#ffffff'} 
          stroke={i === 0 ? '#047857' : '#1e40af'} 
          strokeWidth={i === 0 ? '1.5' : '2.5'} 
        />
      ))}
      
      {/* Labels */}
      <text x={centerX} y={centerY - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">c</text>
      {points.slice(1).map((point, i) => (
        <text key={`label-${i}`} x={point.x} y={point.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">
          v{i+1}
        </text>
      ))}
    </svg>
  );
}

function CompleteGraph() {
  const points = []; 
  const centerX = 100, centerY = 100, radius = 70; 
  const nodes = 5;
  
  for (let i = 0; i < nodes; i++) { 
    const angle = (i * 2 * Math.PI / nodes) - Math.PI / 2; 
    points.push({ 
      x: centerX + radius * Math.cos(angle), 
      y: centerY + radius * Math.sin(angle) 
    }); 
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      {points.map((p1, i) => 
        points.map((p2, j) => {
          if (i < j) return (
            <line key={`${i}-${j}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="2" />
          );
          return null;
        })
      )}
      
      {/* Nodes */}
      {points.map((point, i) => (
        <circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      ))}
      
      {/* Labels */}
      {points.map((point, i) => (
        <text key={`label-${i}`} x={point.x} y={point.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">
          v{i+1}
        </text>
      ))}
    </svg>
  );
}

function BipartiteGraph() {
  const left = [
    { x: 50, y: 50 }, 
    { x: 50, y: 100 }, 
    { x: 50, y: 150 }
  ];
  const right = [
    { x: 150, y: 50 }, 
    { x: 150, y: 100 }, 
    { x: 150, y: 150 }
  ];
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      {left.map((l, i) => 
        right.map((r, j) => (
          <line key={`${i}-${j}`} x1={l.x} y1={l.y} x2={r.x} y2={r.y} stroke="#cbd5e1" strokeWidth="2" />
        ))
      )}
      
      {/* Nodes */}
      {left.map((n, i) => (
        <circle key={`l${i}`} cx={n.x} cy={n.y} r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      ))}
      {right.map((n, i) => (
        <circle key={`r${i}`} cx={n.x} cy={n.y} r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      ))}
      
      {/* Labels */}
      {left.map((n, i) => (
        <text key={`llabel${i}`} x={n.x} y={n.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">
          u{i+1}
        </text>
      ))}
      {right.map((n, i) => (
        <text key={`rlabel${i}`} x={n.x} y={n.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">
          v{i+1}
        </text>
      ))}
    </svg>
  );
}

function WheelGraph() {
  const centerX = 100, centerY = 100; 
  const points = [{ x: centerX, y: centerY }]; 
  const nodes = 6; 
  const radius = 70;
  
  for (let i = 0; i < nodes - 1; i++) { 
    const angle = (i * 2 * Math.PI / (nodes - 1)); 
    points.push({ 
      x: centerX + radius * Math.cos(angle), 
      y: centerY + radius * Math.sin(angle) 
    }); 
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Rim edges */}
      {points.slice(1).map((p, i, arr) => {
        const nextP = arr[(i + 1) % arr.length];
        return (
          <line key={`r-${i}`} x1={p.x} y1={p.y} x2={nextP.x} y2={nextP.y} stroke="#cbd5e1" strokeWidth="2" />
        );
      })}
      {/* Spoke edges */}
      {points.slice(1).map((p, i) => (
        <line key={`s-${i}`} x1={centerX} y1={centerY} x2={p.x} y2={p.y} stroke="#cbd5e1" strokeWidth="2" />
      ))}
      
      {/* Nodes */}
      {points.map((p, i) => (
        <circle 
          key={i} 
          cx={p.x} 
          cy={p.y} 
          r="8" 
          fill={i === 0 ? '#10b981' : '#ffffff'} 
          stroke={i === 0 ? '#047857' : '#1e40af'} 
          strokeWidth={i === 0 ? '1.5' : '2.5'} 
        />
      ))}
      
      {/* Labels */}
      <text x={centerX} y={centerY - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">c</text>
      {points.slice(1).map((p, i) => (
        <text key={`label-${i}`} x={p.x} y={p.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">
          v{i+1}
        </text>
      ))}
    </svg>
  );
}

function TreeGraph() {
  const nodes = [
    { id: 1, x: 100, y: 30, label: 'v5' },
    { id: 2, x: 50, y: 80, label: 'v1' },
    { id: 3, x: 150, y: 80, label: 'v4' },
    { id: 4, x: 30, y: 130, label: 'v2' },
    { id: 5, x: 70, y: 130, label: 'v3' },
    { id: 6, x: 130, y: 130, label: 'v8' },
    { id: 7, x: 170, y: 130, label: 'v6' }
  ];
  
  const edges = [
    { from: 1, to: 2 }, 
    { from: 1, to: 3 }, 
    { from: 2, to: 4 }, 
    { from: 2, to: 5 }, 
    { from: 3, to: 6 }, 
    { from: 3, to: 7 }
  ];
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      {edges.map((edge, i) => { 
        const from = nodes.find(n => n.id === edge.from); 
        const to = nodes.find(n => n.id === edge.to); 
        return (
          <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#cbd5e1" strokeWidth="2" />
        ); 
      })}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      ))}
      {/* Labels */}
      {nodes.map((node, i) => (
        <text key={`label-${i}`} x={node.x} y={node.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">
          {node.label}
        </text>
      ))}
    </svg>
  );
}

function GambarII19() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="60" stroke="#cbd5e1" strokeWidth="2" fill="none" />
      {Array.from({length: 12}, (_, i) => {
        const angle = (i * 2 * Math.PI / 12);
        const x = 100 + 60 * Math.cos(angle);
        const y = 100 + 60 * Math.sin(angle);
        return (
          <circle key={i} cx={x} cy={y} r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
        );
      })}
      <circle cx="140" cy="70" r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
      <circle cx="160" cy="100" r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
      <circle cx="140" cy="130" r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
      <circle cx="170" cy="100" r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      
      <text x="100" y="95" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">Graf Kompleks</text>
      <text x="100" y="112" textAnchor="middle" fontSize="9" fontWeight="500" fill="#64748b">γ=6, β=4, γM=7</text>
    </svg>
  );
}

function GambarII17() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      <line x1="100" y1="50" x2="60" y2="90" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="100" y1="50" x2="100" y2="90" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="100" y1="50" x2="140" y2="90" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="60" y1="90" x2="40" y2="130" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="60" y1="90" x2="80" y2="130" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="100" y1="90" x2="120" y2="130" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="140" y1="90" x2="160" y2="130" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="120" y1="130" x2="100" y2="170" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="120" y1="130" x2="140" y2="170" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Nodes */}
      <circle cx="100" cy="50" r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
      <circle cx="60" cy="90" r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      <circle cx="100" cy="90" r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      <circle cx="140" cy="90" r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      <circle cx="40" cy="130" r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      <circle cx="80" cy="130" r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      <circle cx="120" cy="130" r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
      <circle cx="160" cy="130" r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      <circle cx="60" cy="170" r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      <circle cx="100" cy="170" r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      <circle cx="140" cy="170" r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
      
      <text x="100" y="32" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b">Pohon T</text>
      <text x="100" y="190" textAnchor="middle" fontSize="9" fontWeight="500" fill="#64748b">β(T)=6</text>
    </svg>
  );
}

function GambarII18() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100">
      {/* Edges */}
      {Array.from({length: 13}, (_, i) => (
        <line key={`e1-${i}`} x1={15 + i * 12} y1="50" x2={15 + (i+1) * 12} y2="50" stroke="#cbd5e1" strokeWidth="2" />
      ))}
      {Array.from({length: 12}, (_, i) => (
        <line key={`e2-${i}`} x1={15 + i * 12} y1="50" x2={15 + (i+2) * 12} y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
      ))}
      
      {/* Nodes */}
      {Array.from({length: 14}, (_, i) => {
        const x = 15 + i * 12;
        return (
          <circle 
            key={i} 
            cx={x} 
            cy="50" 
            r="5" 
            fill={i % 3 === 0 ? '#10b981' : '#ffffff'} 
            stroke={i % 3 === 0 ? '#047857' : '#1e40af'} 
            strokeWidth={i % 3 === 0 ? '1' : '2'} 
          />
        );
      })}
      
      <text x="100" y="30" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b">Graf 2-Lintasan</text>
    </svg>
  );
}

function PetersenGraph() {
  const outerRadius = 70;
  const innerRadius = 35;
  const centerX = 100, centerY = 100;
  const nodes = 5;
  
  const outerPoints = [];
  const innerPoints = [];
  
  for (let i = 0; i < nodes; i++) {
    const angle = (i * 2 * Math.PI / nodes) - Math.PI / 2;
    outerPoints.push({
      x: centerX + outerRadius * Math.cos(angle),
      y: centerY + outerRadius * Math.sin(angle),
      label: `v${i+1}`
    });
    innerPoints.push({
      x: centerX + innerRadius * Math.cos(angle + Math.PI / nodes),
      y: centerY + innerRadius * Math.sin(angle + Math.PI / nodes),
      label: `v${i+6}`
    });
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Outer cycle */}
      {outerPoints.map((p, i) => {
        const next = outerPoints[(i + 1) % nodes];
        return (
          <line key={`outer-${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="#cbd5e1" strokeWidth="2" />
        );
      })}
      
      {/* Inner star */}
      {innerPoints.map((p, i) => {
        const next = innerPoints[(i + 1) % nodes];
        return (
          <line key={`inner-${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="#cbd5e1" strokeWidth="2" />
        );
      })}
      
      {/* Spokes connecting outer to inner */}
      {outerPoints.map((p, i) => (
        <line key={`spoke-${i}`} x1={p.x} y1={p.y} x2={innerPoints[i].x} y2={innerPoints[i].y} stroke="#cbd5e1" strokeWidth="2" />
      ))}
      
      {/* Outer nodes */}
      {outerPoints.map((p, i) => (
        <circle key={`outer-node-${i}`} cx={p.x} cy={p.y} r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      ))}
      
      {/* Inner nodes */}
      {innerPoints.map((p, i) => (
        <circle key={`inner-node-${i}`} cx={p.x} cy={p.y} r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
      ))}
      
      {/* Labels */}
      {outerPoints.map((p, i) => (
        <text key={`label-outer-${i}`} x={p.x} y={p.y - 10} textAnchor="middle" fontSize="8" fontWeight="600" fill="#1e293b">
          {p.label}
        </text>
      ))}
      {innerPoints.map((p, i) => (
        <text key={`label-inner-${i}`} x={p.x} y={p.y - 10} textAnchor="middle" fontSize="8" fontWeight="600" fill="#1e293b">
          {p.label}
        </text>
      ))}
    </svg>
  );
}

function PrismGraph() {
  const radius = 60;
  const centerX = 100, centerY = 100;
  const nodes = 6;
  
  const topPoints = [];
  const bottomPoints = [];
  
  for (let i = 0; i < nodes; i++) {
    const angle = (i * 2 * Math.PI / nodes) - Math.PI / 2;
    topPoints.push({
      x: centerX + radius * 0.7 * Math.cos(angle),
      y: centerY + radius * 0.7 * Math.sin(angle),
      label: `t${i+1}`
    });
    bottomPoints.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      label: `b${i+1}`
    });
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Connecting spokes */}
      {topPoints.map((p, i) => (
        <line key={`spoke-${i}`} x1={p.x} y1={p.y} x2={bottomPoints[i].x} y2={bottomPoints[i].y} stroke="#cbd5e1" strokeWidth="2" />
      ))}
      
      {/* Top cycle */}
      {topPoints.map((p, i) => {
        const next = topPoints[(i + 1) % nodes];
        return (
          <line key={`top-${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="#cbd5e1" strokeWidth="2" />
        );
      })}
      
      {/* Bottom cycle */}
      {bottomPoints.map((p, i) => {
        const next = bottomPoints[(i + 1) % nodes];
        return (
          <line key={`bottom-${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="#cbd5e1" strokeWidth="2" />
        );
      })}
      
      {/* Top Nodes */}
      {topPoints.map((p, i) => (
        <circle key={`top-node-${i}`} cx={p.x} cy={p.y} r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      ))}
      {/* Bottom Nodes */}
      {bottomPoints.map((p, i) => (
        <circle key={`bottom-node-${i}`} cx={p.x} cy={p.y} r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
      ))}
      
      <text x="100" y="190" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b">Graf Prisma C₆</text>
    </svg>
  );
}

function LadderGraph() {
  const nodes = 8;
  const startX = 30;
  const endX = 170;
  const step = (endX - startX) / (nodes/2 - 1);
  
  const leftPoints = [];
  const rightPoints = [];
  
  for (let i = 0; i < nodes/2; i++) {
    leftPoints.push({ x: startX + i * step, y: 50, label: `u${i+1}` });
    rightPoints.push({ x: startX + i * step, y: 130, label: `l${i+1}` });
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Left path */}
      {leftPoints.map((p, i) => {
        if (i < leftPoints.length - 1) {
          return (
            <line key={`left-${i}`} x1={p.x} y1={p.y} x2={leftPoints[i+1].x} y2={leftPoints[i+1].y} stroke="#cbd5e1" strokeWidth="2" />
          );
        }
        return null;
      })}
      
      {/* Right path */}
      {rightPoints.map((p, i) => {
        if (i < rightPoints.length - 1) {
          return (
            <line key={`right-${i}`} x1={p.x} y1={p.y} x2={rightPoints[i+1].x} y2={rightPoints[i+1].y} stroke="#cbd5e1" strokeWidth="2" />
          );
        }
        return null;
      })}
      
      {/* Horizontal rungs */}
      {leftPoints.map((p, i) => (
        <line key={`rung-${i}`} x1={p.x} y1={p.y} x2={rightPoints[i].x} y2={rightPoints[i].y} stroke="#cbd5e1" strokeWidth="2" />
      ))}
      
      {/* Nodes */}
      {leftPoints.map((p, i) => (
        <circle key={`left-node-${i}`} cx={p.x} cy={p.y} r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      ))}
      {rightPoints.map((p, i) => (
        <circle key={`right-node-${i}`} cx={p.x} cy={p.y} r="6" fill="#10b981" stroke="#047857" strokeWidth="1" />
      ))}
      
      <text x="100" y="170" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b">Graf Tangga L₄</text>
    </svg>
  );
}

function CompleteBipartiteK24() {
  const leftPoints = [
    { x: 50, y: 70, label: 'u₁' },
    { x: 50, y: 130, label: 'u₂' }
  ];
  const rightPoints = [
    { x: 150, y: 40, label: 'v₁' },
    { x: 150, y: 80, label: 'v₂' },
    { x: 150, y: 120, label: 'v₃' },
    { x: 150, y: 160, label: 'v₄' }
  ];
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Edges */}
      {leftPoints.map((l, i) => 
        rightPoints.map((r, j) => (
          <line key={`${i}-${j}`} x1={l.x} y1={l.y} x2={r.x} y2={r.y} stroke="#cbd5e1" strokeWidth="2" />
        ))
      )}
      {/* Nodes */}
      {leftPoints.map((n, i) => (
        <circle key={`l${i}`} cx={n.x} cy={n.y} r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
      ))}
      {rightPoints.map((n, i) => (
        <circle key={`r${i}`} cx={n.x} cy={n.y} r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      ))}
      
      {leftPoints.map((n, i) => (
        <text key={`llabel${i}`} x={n.x} y={n.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">
          {n.label}
        </text>
      ))}
      {rightPoints.map((n, i) => (
        <text key={`rlabel${i}`} x={n.x} y={n.y - 12} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1e293b">
          {n.label}
        </text>
      ))}
    </svg>
  );
}

function WindmillGraph() {
  const centerX = 100, centerY = 80;
  const radius = 60;
  const petals = 4;
  const points = [];
  
  for (let i = 0; i < petals; i++) {
    const angle = (i * 2 * Math.PI / petals) - Math.PI / 4;
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Outer edges */}
      {points.map((p, i) => {
        const next = points[(i + 1) % points.length];
        return (
          <line key={`outer-edge-${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
        );
      })}
      {/* Spoke edges */}
      {points.map((p, i) => (
        <line key={`spoke-${i}`} x1={centerX} y1={centerY} x2={p.x} y2={p.y} stroke="#cbd5e1" strokeWidth="2" />
      ))}
      
      {/* Center node */}
      <circle cx={centerX} cy={centerY} r="8" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      {/* Outer nodes */}
      {points.map((p, i) => (
        <circle key={`outer-${i}`} cx={p.x} cy={p.y} r="6" fill="#ffffff" stroke="#1e40af" strokeWidth="2" />
      ))}
      
      <text x={centerX} y={centerY - 12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b">c</text>
      <text x="100" y="170" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1e293b">Graf Kincir Wd(3,4)</text>
    </svg>
  );
}

function getDominationExplanation(id) {
  const explanations = {
    1: "Graf G memiliki 5 titik dan 7 sisi. Jaringan ini memiliki dimensi metrik (β) = 2 dengan himpunan patokan pembeda minimum {v1, v3}. Bilangan dominasi penjagaan (γ) = 2.",
    2: "Jaringan berbentuk simetris memanjang dengan diameter 4 dan radius 3. Kita membutuhkan tepat 3 patokan navigasi {v2, v4, v7} dan 3 penjaga agar seluruh area aman serta teridentifikasi dengan unik.",
    3: "Jaringan terhubung dengan 6 titik dan 5 kabel. Dimensi metrik (β) = 2 dengan patokan {v3, v5}. Kebutuhan penjaga (γ) = 2, sehingga sensor super yang dibutuhkan mencapai batas paling minimal.",
    4: "Barisan komputer lurus (P₅) dengan 5 titik. Sangat hemat: cukup 1 titik patokan di salah satu ujung (β = 1), sementara penjaga yang dibutuhkan (γ) = 2 (diletakkan di v2 dan v4).",
    5: "Jalur melingkar tertutup dengan 8 komputer (C₈). Memerlukan tepat 2 patokan untuk navigasi koordinat arah melingkar, dan 3 pos penjaga agar semua komputer terawasi.",
    6: "Graf berbentuk bintang dengan 1 server pusat dan 6 komputer daun di sekelilingnya. Sangat kontras: hanya butuh 1 penjaga di pusat (γ = 1), namun wajib menaruh 6 patokan navigasi di daun (β = 6).",
    7: "Jaringan lengkap dengan 5 titik di mana setiap komputer terhubung ke semua komputer lainnya. Butuh tepat 1 penjaga untuk mengawasi (γ = 1), namun butuh 4 patokan (β = 4) agar posisi bisa dibedakan.",
    8: "Graf bipartit lengkap K₃,₃ (dua kubu masing-masing 3 titik). Membutuhkan tepat 2 penjaga (γ = 2) dan 4 patokan navigasi (β = 4) karena tingkat simetri kubu yang sangat seragam.",
    9: "Graf roda dengan 1 pusat c dan 6 titik melingkar di sekelilingnya. Cukup 1 penjaga di pusat (γ = 1), serta 2 patokan di sisi lingkaran agar seluruh titik teridentifikasi.",
    10: "Struktur pohon bercabang T dengan 11 titik. Dimensi metrik navigasi (β) = 6 diperoleh dengan meletakkan patokan pada titik terminal ujung daun, sementara penjaga (γ) = 5.",
    11: "Jaringan kompleks dengan 17 titik dan 20 sisi. Membutuhkan 6 penjaga dan 4 patokan. Contoh di mana kebutuhan sensor super (γM = 7) melampaui jumlah penjaga biasa.",
    12: "Jalan lintas dengan jalan pintas 2-langkah (2-Lintasan) sepanjang 14 titik. Kebutuhan patokan navigasi (β) = 2, sementara kebutuhan sensor super sama dengan kebutuhan penjaga biasa (γ = 5).",
    13: "Graf Petersen adalah salah satu graf simetris paling terkenal di dunia matematika. Terdiri dari 10 titik dan 15 sisi. Memiliki kebutuhan patokan (β) = 3 dan penjaga (γ) = 3.",
    14: "Graf Prisma C₆ terdiri dari dua lingkaran C₆ yang ditumpuk dan dihubungkan secara vertikal. Membutuhkan 2 patokan navigasi (β) = 2 dan 2 penjaga biasa (γ) = 2.",
    15: "Graf Tangga L₄ berbentuk seperti tangga vertikal 4 tingkat dengan 8 titik. Memerlukan tepat 2 patokan (β) = 2 dan 3 penjaga agar semua lantai terpantau.",
    16: "Graf bipartit lengkap K₂,₄ dengan 2 titik di kubu kiri dan 4 titik di kubu kanan. Membutuhkan 2 penjaga (γ = 2) dan 4 patokan (β = 4) di kubu kanan.",
    17: "Graf kincir Wd(3,4) terdiri dari 4 buah segitiga yang saling menempel di satu titik pusat c. Cukup 1 penjaga di pusat c (γ = 1), serta 3 patokan navigasi (β = 3)."
  };
  return explanations[id] || "Penjelasan tentang kebutuhan sensor dan karakteristik graf...";
}

const Contoh = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua Graf' },
    { id: 'standard', label: 'Graf Standar' },
    { id: 'tree', label: 'Jaringan Pohon' },
    { id: 'famous', label: 'Terkenal & Kompleks' },
    { id: 'bipartite', label: 'Bipartit' }
  ];

  const graphExamples = [
    { id: 1, name: "Graf G", category: "standard", icon: "🔷", icon3d: "/icons3d/1_graf_g.png", description: "Graf umum dengan 5 titik dan 7 sisi", nodes: 5, edges: 7, domination: "β=2, γ=2", metricDimension: 2, dominationNumber: 2, diagram: <GambarII1 /> },
    { id: 2, name: "Graf Diameter 4 & Radius 3", category: "standard", icon: "📏", icon3d: "/icons3d/2_diameter_radius.png", description: "Jalur memanjang dengan diameter 4 dan radius 3", nodes: 8, edges: 8, domination: "β=3, γ=3", metricDimension: 3, dominationNumber: 3, diagram: <GambarII3 /> },
    { id: 3, name: "Graf Dimensi Metrik 2", category: "standard", icon: "🎯", icon3d: "/icons3d/3_dimensi_metrik.png", description: "Jaringan 6 titik dengan dimensi metrik 2", nodes: 6, edges: 5, domination: "β=2, γ=2", metricDimension: 2, dominationNumber: 2, diagram: <GambarII12 /> },
    { id: 4, name: "Graf Lintasan P₅", category: "standard", icon: "↔️", icon3d: "/icons3d/4_lintasan.png", description: "Komputer terhubung dalam satu barisan lurus", nodes: 5, edges: 4, domination: "β=1, γ=2", metricDimension: 1, dominationNumber: 2, diagram: <PathGraph /> },
    { id: 5, name: "Graf Siklus C₈", category: "standard", icon: "🔄", icon3d: "/icons3d/5_siklus.png", description: "Komputer terhubung membentuk lingkaran tertutup", nodes: 8, edges: 8, domination: "β=2, γ=3", metricDimension: 2, dominationNumber: 3, diagram: <CycleGraph /> },
    { id: 6, name: "Graf Bintang K₁,₆", category: "tree", icon: "⭐", icon3d: "/icons3d/6_bintang.png", description: "Satu server pusat mengikat 6 komputer daun", nodes: 7, edges: 6, domination: "β=6, γ=1", metricDimension: 6, dominationNumber: 1, diagram: <StarGraph /> },
    { id: 7, name: "Graf Lengkap K₅", category: "standard", icon: "🕸️", icon3d: "/icons3d/7_lengkap.png", description: "Semua komputer terhubung langsung satu sama lain", nodes: 5, edges: 10, domination: "β=4, γ=1", metricDimension: 4, dominationNumber: 1, diagram: <CompleteGraph /> },
    { id: 8, name: "Graf Bipartit K₃,₃", category: "bipartite", icon: "⚖️", icon3d: "/icons3d/8_bipartit_k33.png", description: "Dua kubu terpisah yang saling terhubung silang", nodes: 6, edges: 9, domination: "β=4, γ=2", metricDimension: 4, dominationNumber: 2, diagram: <BipartiteGraph /> },
    { id: 9, name: "Graf Roda W₆", category: "standard", icon: "☸️", icon3d: "/icons3d/9_roda.png", description: "Graf bintang yang diselimuti lingkaran luar", nodes: 7, edges: 12, domination: "β=2, γ=1", metricDimension: 2, dominationNumber: 1, diagram: <WheelGraph /> },
    { id: 10, name: "Pohon T", category: "tree", icon: "🌳", icon3d: "/icons3d/10_pohon.png", description: "Struktur pohon bercabang lebat berciri pohon T", nodes: 11, edges: 10, domination: "β=6, γ=5", metricDimension: 6, dominationNumber: 5, diagram: <GambarII17 /> },
    { id: 11, name: "Jaringan Kompleks", category: "famous", icon: "💠", icon3d: "/icons3d/11_kompleks.png", description: "Jaringan acak dengan kebutuhan sensor tinggi", nodes: 17, edges: 20, domination: "β=4, γ=6", metricDimension: 4, dominationNumber: 6, diagram: <GambarII19 /> },
    { id: 12, name: "Graf 2-Lintasan", category: "standard", icon: "🛣️", icon3d: "/icons3d/12_2lintasan.png", description: "Lintasan lurus yang dilengkapi jalan pintas", nodes: 14, edges: 25, domination: "β=2, γ=5", metricDimension: 2, dominationNumber: 5, diagram: <GambarII18 /> },
    { id: 13, name: "Graf Petersen P(5,2)", category: "famous", icon: "🔯", icon3d: "/icons3d/13_petersen.png", description: "Graf simetris 10 titik paling populer di dunia", nodes: 10, edges: 15, domination: "β=3, γ=3", metricDimension: 3, dominationNumber: 3, diagram: <PetersenGraph /> },
    { id: 14, name: "Graf Prisma C₆", category: "famous", icon: "📐", icon3d: "/icons3d/14_prisma.png", description: "Dua lingkaran sejajar yang diikat tiang vertikal", nodes: 12, edges: 18, domination: "β=2, γ=2", metricDimension: 2, dominationNumber: 2, diagram: <PrismGraph /> },
    { id: 15, name: "Graf Tangga L₄", category: "famous", icon: "🪜", icon3d: "/icons3d/15_tangga.png", description: "Dua lintasan lurus yang dihubungkan seperti tangga", nodes: 8, edges: 10, domination: "β=2, γ=3", metricDimension: 2, dominationNumber: 3, diagram: <LadderGraph /> },
    { id: 16, name: "Graf Bipartit K₂,₄", category: "bipartite", icon: "🎲", icon3d: "/icons3d/16_bipartit_k24.png", description: "Graf dua partisi yang menampung 2 dan 4 titik", nodes: 6, edges: 8, domination: "β=4, γ=2", metricDimension: 4, dominationNumber: 2, diagram: <CompleteBipartiteK24 /> },
    { id: 17, name: "Graf Kincir Wd(3,4)", category: "famous", icon: "🌀", icon3d: "/icons3d/17_kincir.png", description: "Segitiga-segitiga yang menempel di satu titik pusat", nodes: 9, edges: 12, domination: "β=3, γ=1", metricDimension: 3, dominationNumber: 1, diagram: <WindmillGraph /> }
  ];

  const filteredExamples = graphExamples.filter(graph => {
    const matchesSearch = graph.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          graph.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || graph.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const FlipIcon = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
    </svg>
  );

  return (
    <div className="contohPage">
      <Navbar />
      
      {/* Hero Section */}
      <section className="contoh-hero">
        <div className="container">
          <h1 className="contoh-title">Galeri dan Contoh Graf</h1>
          <p className="contoh-subtitle">
            Jelajahi berbagai jenis jaringan, lihat visualisasi diagramnya, serta analisis kebutuhan sensor navigasi dan penjagaan
          </p>
        </div>
      </section>

      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Cari nama atau deskripsi graf..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-tabs">
          {categories.map(tab => (
            <button
              key={tab.id}
              className={`filter-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Examples */}
      <div className="graphGrid">
        {filteredExamples.map((graph, index) => (
          <div 
            key={graph.id} 
            className="graphCard"
          >
            <div className="cardNumber">{index + 1}</div>
            <div className={`cardInner ${flippedCard === graph.id ? 'isFlipped' : ''}`}>
              
              {/* Card Front */}
              <div 
                className="cardFront" 
                onClick={() => setFlippedCard(graph.id)}
                role="button"
                tabIndex={0}
              >
                <div className="front-visual-wrapper">
                  {graph.icon3d ? (
                    <img 
                      src={graph.icon3d} 
                      alt={graph.name} 
                      className="frontIcon3D" 
                      loading="lazy" 
                    />
                  ) : (
                    <div className="frontIcon">{graph.icon}</div>
                  )}
                </div>
                <h3 className="frontName">{graph.name}</h3>
                <p className="frontDescription">{graph.description}</p>
                <div className="frontFooter">
                  <FlipIcon />
                  <span>Klik untuk Detail Graf</span>
                </div>
              </div>
              
              {/* Card Back */}
              <div className="cardBack" onClick={(e) => e.stopPropagation()}>
                <div className="backHeader">
                  <h3>{graph.name}</h3>
                  <button 
                    className="flipCloseBtn" 
                    onClick={() => setFlippedCard(null)}
                    title="Tutup detail graf"
                  >
                    ✕
                  </button>
                </div>
                <div className="backContent">
                  <div className="diagramContainer">
                    {graph.diagram}
                  </div>
                  
                  <div className="infoGrid">
                    <div>
                      <strong>Jumlah Simpul</strong>
                      {graph.nodes} titik
                    </div>
                    <div>
                      <strong>Jumlah Sisi</strong>
                      {graph.edges} jalur
                    </div>
                    
                    <div className="dominationInfo">
                      <div className="val-row">
                        <strong>Dimensi Metrik (β)</strong>
                        <span className="badge">{graph.metricDimension}</span>
                      </div>
                      <div className="val-row">
                        <strong>Bilangan Dominasi (γ)</strong>
                        <span className="badge">{graph.dominationNumber}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="explanation">
                    <h4>Karakteristik & Penjelasan</h4>
                    <p>{getDominationExplanation(graph.id)}</p>
                  </div>
                </div>

                <div className="backFooter">
                  <button 
                    className="flipBackBtn"
                    onClick={() => setFlippedCard(null)}
                  >
                    <FlipIcon />
                    <span>Kembali ke Ringkasan</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
        {filteredExamples.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', color: 'var(--text-light)' }}>
            <p>Tidak ada contoh graf yang sesuai dengan kriteria pencarian Anda.</p>
          </div>
        )}
      </div>

      {/* Official Academic Footer */}
      <Footer />
    </div>
  );
};

export default Contoh;