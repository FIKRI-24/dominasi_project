import React, { useState } from 'react';

// --- PLACEHOLDER NAVBAR COMPONENT ---
// This is a placeholder to resolve the import error.
// You can replace this with your actual Navbar component's code.
import Navbar from '../../components/navbar.module.jsx';

// --- EMBEDDED CSS STYLES ---
// All styles are now inside the component to avoid import issues.
const cssStyles = `
/* --- Google Font Import --- */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* --- Color and Style Variables --- */
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --background-light: #f4f7f9;
  --card-background: #ffffff;
  --text-dark: #34495e;
  --text-light: #7f8c8d;
  --border-color: #e0e6ed;
  --shadow-color: rgba(44, 62, 80, 0.15);
  --success-color: #2ecc71;
}

/* --- Main Page Styling --- */
.contohPage {
  background-color: var(--background-light);
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  color: var(--text-dark);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.mainTitle {
  text-align: center;
  margin-bottom: 3.5rem;
}

.mainTitle h1 {
  font-size: clamp(2rem, 5vw, 2.8rem);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.mainTitle p {
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  color: var(--primary-color);
  font-weight: 500;
  max-width: 650px;
  margin: auto;
  line-height: 1.6;
}

/* --- Grid for the Cards --- */
.graphGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

/* --- Flip Card Core Styles --- */
.graphCard {
  background-color: transparent;
  height: 440px;
  perspective: 1500px;
  cursor: pointer;
}

.cardInner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-style: preserve-3d;
  box-shadow: 0 10px 30px var(--shadow-color);
  border-radius: 15px;
}

.isFlipped {
  transform: rotateY(180deg);
}

.cardFront, .cardBack {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* --- Card Front Styling --- */
.cardFront {
  background: var(--card-background);
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.frontIcon {
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 1.5rem;
}

.frontName {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--secondary-color);
    margin: 0;
}

.frontDescription {
    color: var(--text-light);
    margin-top: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
}

.frontFooter {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background-color: #f8f9fa;
    border-top: 1px solid var(--border-color);
    color: var(--primary-color);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    opacity: 0.8;
    font-size: 0.9rem;
}

/* --- Card Back Styling --- */
.cardBack {
  background-color: var(--card-background);
  transform: rotateY(180deg);
  padding: 1.25rem;
}

.backHeader {
  text-align: center;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid var(--primary-color);
}

.backHeader h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin: 0;
}

.backContent {
    flex-grow: 1;
    overflow-y: auto;
    padding-right: 5px; /* for scrollbar */
}

/* Custom scrollbar for webkit browsers */
.backContent::-webkit-scrollbar { width: 5px; }
.backContent::-webkit-scrollbar-track { background: var(--border-color); }
.backContent::-webkit-scrollbar-thumb { background: var(--primary-color); border-radius: 5px; }

.diagramContainer {
  background-color: var(--background-light);
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
}

.infoGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    background-color: var(--background-light);
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
}

.infoGrid div {
    font-size: 0.95rem;
}

.infoGrid strong {
    color: var(--secondary-color);
    display: block;
    font-weight: 500;
}

.dominationInfo {
    grid-column: 1 / -1;
    font-weight: 600;
    color: var(--success-color);
    border-top: 1px solid var(--border-color);
    padding-top: 0.75rem;
    margin-top: 0.25rem;
}
.dominationInfo strong {
    color: var(--secondary-color);
}

.explanation {
    font-size: 0.9rem;
}
.explanation h4 {
    margin: 0 0 0.5rem 0;
    font-weight: 600;
    color: var(--secondary-color);
}
.explanation p {
    margin: 0;
    color: var(--text-light);
    line-height: 1.6;
}

/* --- Responsive Design --- */
@media (max-width: 768px) {
  .graphGrid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
`;

// --- SVG Graph Components (Diagrams from coba.jsx) ---
function GambarII1() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Nodes */}
      <circle cx="100" cy="60" r="8" fill="#3498db" />
      <circle cx="50" cy="120" r="8" fill="#e74c3c" />
      <circle cx="80" cy="140" r="8" fill="#3498db" />
      <circle cx="120" cy="140" r="8" fill="#3498db" />
      <circle cx="150" cy="120" r="8" fill="#e74c3c" />
      
      {/* Edges */}
      <line x1="100" y1="60" x2="50" y2="120" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="50" y1="120" x2="80" y2="140" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="80" y1="140" x2="120" y2="140" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="120" y1="140" x2="150" y2="120" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="150" y1="120" x2="100" y2="60" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="100" y1="60" x2="80" y2="140" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="100" y1="60" x2="120" y2="140" stroke="#bdc3c7" strokeWidth="2" />
      
      {/* Labels */}
      <text x="100" y="45" textAnchor="middle" fontSize="10" fill="#2c3e50">v1</text>
      <text x="50" y="105" textAnchor="middle" fontSize="10" fill="#2c3e50">v2</text>
      <text x="80" y="155" textAnchor="middle" fontSize="10" fill="#2c3e50">v3</text>
      <text x="120" y="155" textAnchor="middle" fontSize="10" fill="#2c3e50">v4</text>
      <text x="150" y="105" textAnchor="middle" fontSize="10" fill="#2c3e50">v5</text>
    </svg>
  );
}

function GambarII3() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Nodes */}
      <circle cx="20" cy="100" r="8" fill="#3498db" />
      <circle cx="50" cy="100" r="8" fill="#3498db" />
      <circle cx="80" cy="100" r="8" fill="#e74c3c" />
      <circle cx="110" cy="60" r="8" fill="#3498db" />
      <circle cx="110" cy="140" r="8" fill="#3498db" />
      <circle cx="140" cy="60" r="8" fill="#3498db" />
      <circle cx="140" cy="140" r="8" fill="#e74c3c" />
      <circle cx="170" cy="100" r="8" fill="#3498db" />
      
      {/* Edges */}
      <line x1="20" y1="100" x2="50" y2="100" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="50" y1="100" x2="80" y2="100" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="80" y1="100" x2="110" y2="60" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="80" y1="100" x2="110" y2="140" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="110" y1="60" x2="140" y2="60" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="110" y1="140" x2="140" y2="140" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="140" y1="60" x2="170" y2="100" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="140" y1="140" x2="170" y2="100" stroke="#bdc3c7" strokeWidth="2" />
      
      {/* Labels */}
      <text x="20" y="85" textAnchor="middle" fontSize="10" fill="#2c3e50">v1</text>
      <text x="50" y="85" textAnchor="middle" fontSize="10" fill="#2c3e50">v2</text>
      <text x="80" y="85" textAnchor="middle" fontSize="10" fill="#2c3e50">v3</text>
      <text x="110" y="45" textAnchor="middle" fontSize="10" fill="#2c3e50">v4</text>
      <text x="110" y="155" textAnchor="middle" fontSize="10" fill="#2c3e50">v5</text>
      <text x="140" y="45" textAnchor="middle" fontSize="10" fill="#2c3e50">v6</text>
      <text x="140" y="155" textAnchor="middle" fontSize="10" fill="#2c3e50">v7</text>
      <text x="170" y="85" textAnchor="middle" fontSize="10" fill="#2c3e50">v8</text>
    </svg>
  );
}

function GambarII12() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Nodes */}
      <circle cx="50" cy="60" r="8" fill="#3498db" />
      <circle cx="80" cy="60" r="8" fill="#3498db" />
      <circle cx="110" cy="60" r="8" fill="#e74c3c" />
      <circle cx="140" cy="60" r="8" fill="#3498db" />
      <circle cx="100" cy="120" r="8" fill="#e74c3c" />
      <circle cx="70" cy="120" r="8" fill="#3498db" />
      
      {/* Edges */}
      <line x1="50" y1="60" x2="80" y2="60" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="80" y1="60" x2="110" y2="60" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="110" y1="60" x2="140" y2="60" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="110" y1="60" x2="100" y2="120" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="80" y1="60" x2="70" y2="120" stroke="#bdc3c7" strokeWidth="2" />
      
      {/* Labels */}
      <text x="50" y="45" textAnchor="middle" fontSize="10" fill="#2c3e50">v1</text>
      <text x="80" y="45" textAnchor="middle" fontSize="10" fill="#2c3e50">v2</text>
      <text x="110" y="45" textAnchor="middle" fontSize="10" fill="#2c3e50">v3</text>
      <text x="140" y="45" textAnchor="middle" fontSize="10" fill="#2c3e50">v4</text>
      <text x="100" y="135" textAnchor="middle" fontSize="10" fill="#2c3e50">v5</text>
      <text x="70" y="135" textAnchor="middle" fontSize="10" fill="#2c3e50">v6</text>
    </svg>
  );
}

function PathGraph() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100">
      <circle cx="20" cy="50" r="8" fill="#3498db" />
      <circle cx="60" cy="50" r="8" fill="#e74c3c" />
      <circle cx="100" cy="50" r="8" fill="#3498db" />
      <circle cx="140" cy="50" r="8" fill="#e74c3c" />
      <circle cx="180" cy="50" r="8" fill="#3498db" />
      
      <line x1="20" y1="50" x2="60" y2="50" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="60" y1="50" x2="100" y2="50" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="100" y1="50" x2="140" y2="50" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="140" y1="50" x2="180" y2="50" stroke="#bdc3c7" strokeWidth="2" />
      
      <text x="20" y="35" textAnchor="middle" fontSize="10" fill="#2c3e50">v1</text>
      <text x="60" y="35" textAnchor="middle" fontSize="10" fill="#2c3e50">v2</text>
      <text x="100" y="35" textAnchor="middle" fontSize="10" fill="#2c3e50">v3</text>
      <text x="140" y="35" textAnchor="middle" fontSize="10" fill="#2c3e50">v4</text>
      <text x="180" y="35" textAnchor="middle" fontSize="10" fill="#2c3e50">v5</text>
    </svg>
  );
}

function CycleGraph() {
  const points = []; 
  const centerX = 100, centerY = 100, radius = 80; 
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
      {points.map((point, i) => (
        <circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill={i % 2 === 0 ? '#e74c3c' : '#3498db'} />
      ))}
      {points.map((point, i) => { 
        const nextPoint = points[(i + 1) % points.length]; 
        return (
          <line key={`edge-${i}`} x1={point.x} y1={point.y} x2={nextPoint.x} y2={nextPoint.y} stroke="#bdc3c7" strokeWidth="2" />
        ); 
      })}
      
      {points.map((point, i) => (
        <text key={`label-${i}`} x={point.x} y={point.y - 12} textAnchor="middle" fontSize="10" fill="#2c3e50">
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
  const radius = 80;
  
  for (let i = 0; i < nodes - 1; i++) { 
    const angle = (i * 2 * Math.PI / (nodes - 1)); 
    points.push({ 
      x: centerX + radius * Math.cos(angle), 
      y: centerY + radius * Math.sin(angle) 
    }); 
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {points.map((point, i) => (
        <circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill={i === 0 ? '#e74c3c' : '#3498db'} />
      ))}
      {points.slice(1).map((point, i) => (
        <line key={`edge-${i}`} x1={centerX} y1={centerY} x2={point.x} y2={point.y} stroke="#bdc3c7" strokeWidth="2" />
      ))}
      
      <text x={centerX} y={centerY - 12} textAnchor="middle" fontSize="10" fill="#2c3e50">c</text>
      {points.slice(1).map((point, i) => (
        <text key={`label-${i}`} x={point.x} y={point.y - 12} textAnchor="middle" fontSize="10" fill="#2c3e50">
          v{i+1}
        </text>
      ))}
    </svg>
  );
}

function CompleteGraph() {
  const points = []; 
  const centerX = 100, centerY = 100, radius = 80; 
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
      {points.map((p1, i) => 
        points.map((p2, j) => {
          if (i < j) return (
            <line key={`${i}-${j}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#bdc3c7" strokeWidth="2" />
          );
          return null;
        })
      )}
      {points.map((point, i) => (
        <circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill="#3498db" />
      ))}
      
      {points.map((point, i) => (
        <text key={`label-${i}`} x={point.x} y={point.y - 12} textAnchor="middle" fontSize="10" fill="#2c3e50">
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
      {left.map((l, i) => 
        right.map((r, j) => (
          <line key={`${i}-${j}`} x1={l.x} y1={l.y} x2={r.x} y2={r.y} stroke="#bdc3c7" strokeWidth="2" />
        ))
      )}
      {left.map((n, i) => (
        <circle key={`l${i}`} cx={n.x} cy={n.y} r="8" fill="#3498db" />
      ))}
      {right.map((n, i) => (
        <circle key={`r${i}`} cx={n.x} cy={n.y} r="8" fill="#e74c3c" />
      ))}
      
      {left.map((n, i) => (
        <text key={`llabel${i}`} x={n.x} y={n.y - 12} textAnchor="middle" fontSize="10" fill="#2c3e50">
          u{i+1}
        </text>
      ))}
      {right.map((n, i) => (
        <text key={`rlabel${i}`} x={n.x} y={n.y - 12} textAnchor="middle" fontSize="10" fill="#2c3e50">
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
  const radius = 80;
  
  for (let i = 0; i < nodes - 1; i++) { 
    const angle = (i * 2 * Math.PI / (nodes - 1)); 
    points.push({ 
      x: centerX + radius * Math.cos(angle), 
      y: centerY + radius * Math.sin(angle) 
    }); 
  }
  
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="8" fill={i === 0 ? '#e74c3c' : '#3498db'} />
      ))}
      {points.slice(1).map(p => (
        <line key={`s-${p.x}`} x1={centerX} y1={centerY} x2={p.x} y2={p.y} stroke="#bdc3c7" strokeWidth="2" />
      ))}
      {points.slice(1).map((p, i, arr) => {
        const nextP = arr[(i + 1) % arr.length];
        return (
          <line key={`r-${i}`} x1={p.x} y1={p.y} x2={nextP.x} y2={nextP.y} stroke="#bdc3c7" strokeWidth="2" />
        );
      })}
      
      <text x={centerX} y={centerY - 12} textAnchor="middle" fontSize="10" fill="#2c3e50">c</text>
      {points.slice(1).map((p, i) => (
        <text key={`label-${i}`} x={p.x} y={p.y - 12} textAnchor="middle" fontSize="10" fill="#2c3e50">
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
      {edges.map((edge, i) => { 
        const from = nodes.find(n => n.id === edge.from); 
        const to = nodes.find(n => n.id === edge.to); 
        return (
          <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#bdc3c7" strokeWidth="2" />
        ); 
      })}
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r="8" fill="#3498db" />
      ))}
      {nodes.map((node, i) => (
        <text key={`label-${i}`} x={node.x} y={node.y - 12} textAnchor="middle" fontSize="10" fill="#2c3e50">
          {node.label}
        </text>
      ))}
    </svg>
  );
}

function GambarII19() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Simplified version of GAMBAR_II19 */}
      <circle cx="100" cy="100" r="60" stroke="#bdc3c7" strokeWidth="2" fill="none" />
      {Array.from({length: 12}, (_, i) => {
        const angle = (i * 2 * Math.PI / 12);
        const x = 100 + 60 * Math.cos(angle);
        const y = 100 + 60 * Math.sin(angle);
        return (
          <circle key={i} cx={x} cy={y} r="6" fill="#3498db" />
        );
      })}
      <circle cx="140" cy="70" r="6" fill="#e74c3c" />
      <circle cx="160" cy="100" r="6" fill="#e74c3c" />
      <circle cx="140" cy="130" r="6" fill="#e74c3c" />
      <circle cx="170" cy="100" r="6" fill="#3498db" />
      
      <text x="100" y="100" textAnchor="middle" fontSize="8" fill="#2c3e50">Graf Kompleks</text>
      <text x="100" y="115" textAnchor="middle" fontSize="8" fill="#2c3e50">γ=6, β=4, γM=7</text>
    </svg>
  );
}

function GambarII17() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Simplified tree structure */}
      <circle cx="100" cy="50" r="6" fill="#e74c3c" />
      <circle cx="60" cy="90" r="6" fill="#3498db" />
      <circle cx="100" cy="90" r="6" fill="#3498db" />
      <circle cx="140" cy="90" r="6" fill="#3498db" />
      <circle cx="40" cy="130" r="6" fill="#3498db" />
      <circle cx="80" cy="130" r="6" fill="#3498db" />
      <circle cx="120" cy="130" r="6" fill="#e74c3c" />
      <circle cx="160" cy="130" r="6" fill="#3498db" />
      <circle cx="60" cy="170" r="6" fill="#3498db" />
      <circle cx="100" cy="170" r="6" fill="#3498db" />
      <circle cx="140" cy="170" r="6" fill="#e74c3c" />
      
      {/* Edges */}
      <line x1="100" y1="50" x2="60" y2="90" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="100" y1="50" x2="100" y2="90" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="100" y1="50" x2="140" y2="90" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="60" y1="90" x2="40" y2="130" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="60" y1="90" x2="80" y2="130" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="100" y1="90" x2="120" y2="130" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="140" y1="90" x2="160" y2="130" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="120" y1="130" x2="100" y2="170" stroke="#bdc3c7" strokeWidth="2" />
      <line x1="120" y1="130" x2="140" y2="170" stroke="#bdc3c7" strokeWidth="2" />
      
      <text x="100" y="40" textAnchor="middle" fontSize="8" fill="#2c3e50">Pohon T</text>
      <text x="100" y="190" textAnchor="middle" fontSize="8" fill="#2c3e50">β(T)=6</text>
    </svg>
  );
}

function GambarII18() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100">
      {Array.from({length: 14}, (_, i) => {
        const x = 15 + i * 12;
        return (
          <circle key={i} cx={x} cy="50" r="4" fill={i % 3 === 0 ? '#e74c3c' : '#3498db'} />
        );
      })}
      
      {Array.from({length: 13}, (_, i) => (
        <line key={`e1-${i}`} x1={15 + i * 12} y1="50" x2={15 + (i+1) * 12} y2="50" stroke="#bdc3c7" strokeWidth="2" />
      ))}
      
      {Array.from({length: 12}, (_, i) => (
        <line key={`e2-${i}`} x1={15 + i * 12} y1="50" x2={15 + (i+2) * 12} y2="50" stroke="#bdc3c7" strokeWidth="1" strokeDasharray="2,2" />
      ))}
      
      <text x="100" y="30" textAnchor="middle" fontSize="8" fill="#2c3e50">Graf 2-Lintasan</text>
    </svg>
  );
}
// --- End of SVG Components ---

function getDominationExplanation(id) {
    const explanations = {
        1: "Graf G dengan 5 titik dan 7 sisi. Dimensi metrik β(G) = 2, bilangan dominasi γ(G) = 2. Himpunan pembeda minimum: {v1, v3}",
        2: "Graf dengan diameter 4 dan radius 3. Dimensi metrik β(G) = 3, bilangan dominasi γ(G) = 3. Himpunan pembeda: {v2, v4, v7}",
        3: "Graf dengan dimensi metrik β(G) = 2. W = {v3, v5} adalah himpunan pembeda minimum. Bilangan dominasi γ(G) = 2",
        4: "Graf lintasan dengan 8 titik. β(Pn) = 1, γ(P₈) = ⌈8/3⌉ = 3. Satu titik ujung sudah cukup sebagai himpunan pembeda",
        5: "Graf siklus dengan 8 titik. β(Cn) = 2 untuk n ≥ 3, γ(C₈) = ⌈8/3⌉ = 3. Dua titik yang tidak berseberangan diperlukan",
        6: "Graf bintang dengan 1 pusat dan 7 daun. γ(K₁,n) = 1, β(K₁,n) = n-1 = 6. Titik pusat mendominasi semua",
        7: "Graf lengkap dengan 5 titik. γ(Kn) = 1, β(Kn) = n-1 = 4. Satu titik mendominasi semua simpul",
        8: "Graf bipartit lengkap K₃,₃. γ(Km,n) = 2 (m,n≥2), β(Km,n) = m+n-2 = 4. Satu titik dari setiap partisi",
        9: "Graf roda dengan pusat c dan rim 6 titik. β(Wn) = 2, γ(Wn) = 1. Pusat dan satu titik rim cukup",
        10: "Pohon T dengan σ(T)=11, ex(T)=5, β(T)=6. Titik terminal digunakan sebagai himpunan pembeda",
        11: "Graf dengan γ(G)=6, β(G)=4, γM(G)=7. Contoh dimana γM(G) > max{γ(G), β(G)}",
        12: "Graf k-lintasan dengan k=2 dan 14 titik. β(G)=k=2, γM(G)=γ(G). Untuk k-lintasan, vi dan vj dominasi jika |i-j| ≤ k"
    };
    return explanations[id] || "Penjelasan dominasi untuk graf ini...";
}

// --- Main App Component ---
const Contoh = () => {
    const [flippedCard, setFlippedCard] = useState(null);

    const graphExamples = [
        { id: 1, name: "Gambar II.1 - Graf G", icon: "🔷", description: "Graf G dengan 5 titik dan 7 sisi", nodes: 5, edges: 7, domination: "β=2, γ=2", diagram: <GambarII1 /> },
        { id: 2, name: "Gambar II.3 - Diameter 4", icon: "📏", description: "Graf dengan diameter 4 dan radius 3", nodes: 8, edges: 8, domination: "β=3, γ=3", diagram: <GambarII3 /> },
        { id: 3, name: "Gambar II.12 - β(G)=2", icon: "🎯", description: "Graf dengan dimensi metrik 2", nodes: 6, edges: 5, domination: "β=2, γ=2", diagram: <GambarII12 /> },
        { id: 4, name: "Graf Lintasan P₈", icon: "↔️", description: "Simpul terhubung dalam satu garis lurus", nodes: 8, edges: 7, domination: "β=1, γ=3", diagram: <PathGraph /> },
        { id: 5, name: "Graf Siklus C₈", icon: "🔄", description: "Simpul membentuk sebuah lingkaran tertutup", nodes: 8, edges: 8, domination: "β=2, γ=3", diagram: <CycleGraph /> },
        { id: 6, name: "Graf Bintang K₁,₇", icon: "⭐", description: "Satu simpul pusat terhubung ke semua", nodes: 8, edges: 7, domination: "β=6, γ=1", diagram: <StarGraph /> },
        { id: 7, name: "Graf Lengkap K₅", icon: "🕸️", description: "Setiap simpul terhubung ke semua simpul", nodes: 5, edges: 10, domination: "β=4, γ=1", diagram: <CompleteGraph /> },
        { id: 8, name: "Graf Bipartit K₃,₃", icon: "⚖️", description: "Dua set simpul, koneksi antar set", nodes: 6, edges: 9, domination: "β=4, γ=2", diagram: <BipartiteGraph /> },
        { id: 9, name: "Graf Roda W₆", icon: "☸️", description: "Gabungan graf bintang dan siklus", nodes: 7, edges: 12, domination: "β=2, γ=1", diagram: <WheelGraph /> },
        { id: 10, name: "Gambar II.17 - Pohon T", icon: "🌳", description: "Pohon T dengan β(T)=6", nodes: 21, edges: 20, domination: "β=6, γ=5", diagram: <GambarII17 /> },
        { id: 11, name: "Gambar II.19 - γ=6, β=4", icon: "💠", description: "Graf dengan γ=6, β=4, γM=7", nodes: 17, edges: 20, domination: "β=4, γ=6", diagram: <GambarII19 /> },
        { id: 12, name: "Gambar II.18 - 2-Lintasan", icon: "🛣️", description: "Graf 2-lintasan dengan 14 titik", nodes: 14, edges: 25, domination: "β=2, γ=5", diagram: <GambarII18 /> }
    ];

    // SVG icon to replace FontAwesome
    const FlipIcon = () => (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
    );

    return (
        <div className="contohPage">
            <style>{cssStyles}</style>
            <Navbar />
            <div className="container">
                <div className="mainTitle">
                    <h1>Galeri Graf - Bab II</h1>
                    <p>Klik pada kartu untuk membaliknya dan melihat detail, diagram, serta penjelasan dimensi metrik dan bilangan dominasi dari berbagai jenis graf.</p>
                </div>

                <div className="graphGrid">
                    {graphExamples.map((graph) => (
                        <div key={graph.id} className="graphCard" onClick={() => setFlippedCard(flippedCard === graph.id ? null : graph.id)}>
                            <div className={`cardInner ${flippedCard === graph.id ? 'isFlipped' : ''}`}>
                                {/* Card Front */}
                                <div className="cardFront">
                                    <div className="frontIcon">{graph.icon}</div>
                                    <h3 className="frontName">{graph.name}</h3>
                                    <p className="frontDescription">{graph.description}</p>
                                    <div className="frontFooter">
                                        <FlipIcon />
                                        <span>Balik untuk Detail</span>
                                    </div>
                                </div>
                                {/* Card Back */}
                                <div className="cardBack">
                                    <div className="backHeader"><h3>{graph.name}</h3></div>
                                    <div className="backContent">
                                        <div className="diagramContainer">{graph.diagram}</div>
                                        <div className="infoGrid">
                                            <div><strong>Simpul:</strong> {graph.nodes}</div>
                                            <div><strong>Sisi:</strong> {graph.edges}</div>
                                            <div className="dominationInfo">
                                                <strong>Dimensi Metrik (β):</strong> {graph.domination.split(', ')[0]}
                                                <br />
                                                <strong>Bilangan Dominasi (γ):</strong> {graph.domination.split(', ')[1]}
                                            </div>
                                        </div>
                                        <div className="explanation">
                                            <h4>Penjelasan</h4>
                                            <p>{getDominationExplanation(graph.id)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contoh;