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
  color: var(--primary); /* pakai warna biru primary */
  margin-bottom: 0.5rem;
}

.mainTitle p {
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  color: var(--primary); /* pakai warna biru primary juga */
  font-weight: 500; /* agak tebal biar jelas */
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


// --- SVG Graph Components (Your components are preserved here) ---
function PathGraph() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100">
      <circle cx="20" cy="50" r="8" fill="#3498db" /><circle cx="60" cy="50" r="8" fill="#e74c3c" /><circle cx="100" cy="50" r="8" fill="#3498db" /><circle cx="140" cy="50" r="8" fill="#e74c3c" /><circle cx="180" cy="50" r="8" fill="#3498db" />
      <line x1="20" y1="50" x2="60" y2="50" stroke="#bdc3c7" strokeWidth="2" /><line x1="60" y1="50" x2="100" y2="50" stroke="#bdc3c7" strokeWidth="2" /><line x1="100" y1="50" x2="140" y2="50" stroke="#bdc3c7" strokeWidth="2" /><line x1="140" y1="50" x2="180" y2="50" stroke="#bdc3c7" strokeWidth="2" />
    </svg>
  );
}

function CycleGraph() {
  const points = []; const centerX = 100, centerY = 100, radius = 80; const nodes = 6;
  for (let i = 0; i < nodes; i++) { const angle = (i * 2 * Math.PI / nodes) - Math.PI / 2; points.push({ x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) }); }
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {points.map((point, i) => (<circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill={i % 3 === 0 ? '#e74c3c' : '#3498db'} />))}
      {points.map((point, i) => { const nextPoint = points[(i + 1) % points.length]; return (<line key={`edge-${i}`} x1={point.x} y1={point.y} x2={nextPoint.x} y2={nextPoint.y} stroke="#bdc3c7" strokeWidth="2" />); })}
    </svg>
  );
}

function StarGraph() {
  const centerX = 100, centerY = 100; const points = [{ x: centerX, y: centerY }]; const nodes = 7; const radius = 80;
  for (let i = 0; i < nodes - 1; i++) { const angle = (i * 2 * Math.PI / (nodes - 1)); points.push({ x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) }); }
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {points.map((point, i) => (<circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill={i === 0 ? '#e74c3c' : '#3498db'} />))}
      {points.slice(1).map((point, i) => (<line key={`edge-${i}`} x1={centerX} y1={centerY} x2={point.x} y2={point.y} stroke="#bdc3c7" strokeWidth="2" />))}
    </svg>
  );
}

function CompleteGraph() {
    const points = []; const centerX = 100, centerY = 100, radius = 80; const nodes = 5;
    for (let i = 0; i < nodes; i++) { const angle = (i * 2 * Math.PI / nodes) - Math.PI / 2; points.push({ x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) }); }
    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {points.map((point, i) => (<circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill="#3498db" />))}
            {points.map((p1, i) => points.map((p2, j) => {
                if (i < j) return <line key={`${i}-${j}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#bdc3c7" strokeWidth="2" />;
                return null;
            }))}
        </svg>
    );
}

function WheelGraph() {
    const centerX = 100, centerY = 100; const points = [{ x: centerX, y: centerY }]; const nodes = 8; const radius = 80;
    for (let i = 0; i < nodes - 1; i++) { const angle = (i * 2 * Math.PI / (nodes - 1)); points.push({ x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) }); }
    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="8" fill={i === 0 ? '#e74c3c' : '#3498db'} />)}
            {points.slice(1).map(p => <line key={`s-${p.x}`} x1={centerX} y1={centerY} x2={p.x} y2={p.y} stroke="#bdc3c7" strokeWidth="2" />)}
            {points.slice(1).map((p, i, arr) => {
                const nextP = arr[(i + 1) % arr.length];
                return <line key={`r-${i}`} x1={p.x} y1={p.y} x2={nextP.x} y2={nextP.y} stroke="#bdc3c7" strokeWidth="2" />;
            })}
        </svg>
    );
}

function TreeGraph() {
  const nodes = [{ id: 1, x: 100, y: 30 },{ id: 2, x: 50, y: 80 },{ id: 3, x: 150, y: 80 },{ id: 4, x: 30, y: 130 },{ id: 5, x: 70, y: 130 },{ id: 6, x: 130, y: 130 },{ id: 7, x: 170, y: 130 }];
  const edges = [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 3, to: 6 }, { from: 3, to: 7 }];
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {edges.map((edge, i) => { const from = nodes.find(n => n.id === edge.from); const to = nodes.find(n => n.id === edge.to); return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#bdc3c7" strokeWidth="2" />; })}
      {nodes.map((node, i) => <circle key={i} cx={node.x} cy={node.y} r="8" fill="#3498db" />)}
    </svg>
  );
}

function BipartiteGraph() {
  const left = [{ x: 50, y: 50 }, { x: 50, y: 100 }, { x: 50, y: 150 }];
  const right = [{ x: 150, y: 50 }, { x: 150, y: 100 }, { x: 150, y: 150 }];
  const edges = [[0,0], [0,2], [1,1], [2,1], [2,2]];
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {edges.map(([l,r], i) => <line key={i} x1={left[l].x} y1={left[l].y} x2={right[r].x} y2={right[r].y} stroke="#bdc3c7" strokeWidth="2" />)}
      {left.map((n, i) => <circle key={`l${i}`} cx={n.x} cy={n.y} r="8" fill="#3498db" />)}
      {right.map((n, i) => <circle key={`r${i}`} cx={n.x} cy={n.y} r="8" fill="#e74c3c" />)}
    </svg>
  );
}

function GridGraph() {
    const rows=3, cols=3, spacing=60, offset=40;
    const nodes = Array.from({length:rows*cols}, (_,i)=>({x:offset+ (i%cols)*spacing, y:offset+Math.floor(i/cols)*spacing}));
    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {nodes.map((n,i) => {
                const lines = [];
                if ((i+1)%cols !== 0) lines.push(<line key={`h${i}`} x1={n.x} y1={n.y} x2={nodes[i+1].x} y2={nodes[i+1].y} stroke="#bdc3c7" strokeWidth="2"/>);
                if (i < cols*(rows-1)) lines.push(<line key={`v${i}`} x1={n.x} y1={n.y} x2={nodes[i+cols].x} y2={nodes[i+cols].y} stroke="#bdc3c7" strokeWidth="2"/>);
                return lines;
            })}
            {nodes.map((n,i) => <circle key={i} cx={n.x} cy={n.y} r="8" fill="#3498db"/>)}
        </svg>
    );
}

function PetersenGraph() {
    const cX=100, cY=100, oR=80, iR=40;
    const p = (r, n, i) => ({x: cX+r*Math.cos(2*Math.PI*i/n - Math.PI/2), y: cY+r*Math.sin(2*Math.PI*i/n - Math.PI/2)});
    const outer = Array.from({length: 5}, (_, i) => p(oR, 5, i));
    const inner = Array.from({length: 5}, (_, i) => p(iR, 5, i));
    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {[...Array(5)].map((_, i) => <line key={`o${i}`} x1={outer[i].x} y1={outer[i].y} x2={outer[(i + 1) % 5].x} y2={outer[(i + 1) % 5].y} stroke="#bdc3c7" strokeWidth="2" />)}
            {[...Array(5)].map((_, i) => <line key={`i${i}`} x1={inner[i].x} y1={inner[i].y} x2={inner[(i + 2) % 5].x} y2={inner[(i + 2) % 5].y} stroke="#bdc3c7" strokeWidth="2" />)}
            {[...Array(5)].map((_, i) => <line key={`c${i}`} x1={outer[i].x} y1={outer[i].y} x2={inner[i].x} y2={inner[i].y} stroke="#bdc3c7" strokeWidth="2" />)}
            {outer.map((pt, i) => <circle key={`oc${i}`} cx={pt.x} cy={pt.y} r="8" fill="#3498db" />)}
            {inner.map((pt, i) => <circle key={`ic${i}`} cx={pt.x} cy={pt.y} r="8" fill="#e74c3c" />)}
        </svg>
    );
}

function CubeGraph() {
    const p = (x, y, z, pz=200) => ({ x: 100 + (x * 100) / (pz - z), y: 100 + (y * 100) / (pz - z) });
    const nodes = [ p(-50,-50,-50), p(50,-50,-50), p(50,50,-50), p(-50,50,-50), p(-50,-50,50), p(50,-50,50), p(50,50,50), p(-50,50,50) ];
    const edges = [ [0,1],[1,2],[2,3],[3,0], [4,5],[5,6],[6,7],[7,4], [0,4],[1,5],[2,6],[3,7] ];
    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {edges.map(([a,b],i) => <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#bdc3c7" strokeWidth="2" />)}
            {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r="8" fill="#3498db" />)}
        </svg>
    );
}

function CompleteBipartiteGraph() {
    const left = Array.from({length: 3}, (_, i) => ({x: 50, y: 40 + i * 60}));
    const right = Array.from({length: 3}, (_, i) => ({x: 150, y: 40 + i * 60}));
    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {left.map((l, i) => right.map((r, j) => <line key={`${i}-${j}`} x1={l.x} y1={l.y} x2={r.x} y2={r.y} stroke="#bdc3c7" strokeWidth="2" />))}
            {left.map((n, i) => <circle key={`l${i}`} cx={n.x} cy={n.y} r="8" fill="#3498db" />)}
            {right.map((n, i) => <circle key={`r${i}`} cx={n.x} cy={n.y} r="8" fill="#e74c3c" />)}
        </svg>
    );
}

function FriendshipGraph() {
    const center = {x: 100, y: 100}; const triangles = 3; const r=80;
    const nodes = [center, ...Array.from({length: triangles * 2}, (_, i) => {
        const angle = 2*Math.PI*Math.floor(i/2)/triangles + (i%2===0 ? -0.3 : 0.3);
        return {x: center.x + r*Math.cos(angle), y: center.y + r*Math.sin(angle)};
    })];
    return (
        <svg width="200" height="200" viewBox="0 0 200 200">
            {Array.from({length:triangles}).map((_, i)=>{
                const p1 = nodes[i*2+1], p2 = nodes[i*2+2];
                return <React.Fragment key={i}>
                    <line x1={center.x} y1={center.y} x2={p1.x} y2={p1.y} stroke="#bdc3c7" strokeWidth="2" />
                    <line x1={center.x} y1={center.y} x2={p2.x} y2={p2.y} stroke="#bdc3c7" strokeWidth="2" />
                    <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#bdc3c7" strokeWidth="2" />
                </React.Fragment>
            })}
            {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r="8" fill={i === 0 ? '#e74c3c' : '#3498db'} />)}
        </svg>
    );
}
// --- End of SVG Components ---

function getDominationExplanation(id) {
    const explanations = {
        1: "Pada graf lintasan, himpunan dominasi minimal dapat dipilih dengan mengambil setiap simpul ketiga. Untuk 5 simpul, ⌈5/3⌉ = 2 simpul cukup.",
        2: "Graf siklus membutuhkan setidaknya ⌈n/3⌉ simpul untuk mendominasi. Untuk 6 simpul, ⌈6/3⌉ = 2 simpul cukup.",
        3: "Simpul pusat pada graf bintang dapat mendominasi seluruh graf sendirian, sehingga bilangan dominasinya adalah 1.",
        4: "Pada graf lengkap, satu simpul manapun dapat mendominasi semua simpul lainnya, sehingga bilangan dominasinya 1.",
        5: "Graf roda membutuhkan 2 simpul untuk mendominasi, yaitu simpul pusat dan satu simpul di bagian luar.",
        6: "Bilangan dominasi untuk pohon bervariasi, namun untuk pohon seimbang seringkali mendekati ⌈n/2⌉.",
        7: "Graf bipartit umumnya membutuhkan 2 simpul (satu dari setiap partisi) untuk mendominasi seluruh graf.",
        8: "Graf grid membutuhkan sekitar ⌈n/4⌉ simpul untuk mendominasi seluruhnya secara efisien.",
        9: "Graf Petersen adalah contoh klasik dengan bilangan dominasi 3, membutuhkan 3 simpul untuk mendominasi.",
        10: "Graf kubus membutuhkan 2 simpul yang letaknya berseberangan secara diagonal untuk mendominasi.",
        11: "Sama seperti graf bipartit, graf bipartit lengkap membutuhkan minimal 2 simpul untuk mendominasi.",
        12: "Simpul pusat pada graf friendship dapat mendominasi seluruh graf, sehingga bilangan dominasinya adalah 1."
    };
    return explanations[id] || "Penjelasan dominasi untuk graf ini...";
}

// --- Main App Component ---
const Contoh = () => {
    const [flippedCard, setFlippedCard] = useState(null);

    const graphExamples = [
        { id: 1, name: "Graf Lintasan", icon: "↔️", description: "Simpul terhubung dalam satu garis lurus.", nodes: 5, edges: 4, domination: "γ(G) = ⌈n/3⌉", diagram: <PathGraph /> },
        { id: 2, name: "Graf Siklus", icon: "🔄", description: "Simpul membentuk sebuah lingkaran tertutup.", nodes: 6, edges: 6, domination: "γ(G) = ⌈n/3⌉", diagram: <CycleGraph /> },
        { id: 3, name: "Graf Bintang", icon: "⭐", description: "Satu simpul pusat terhubung ke semua.", nodes: 7, edges: 6, domination: "γ(G) = 1", diagram: <StarGraph /> },
        { id: 4, name: "Graf Lengkap", icon: "🕸️", description: "Setiap simpul terhubung ke semua simpul.", nodes: 5, edges: 10, domination: "γ(G) = 1", diagram: <CompleteGraph /> },
        { id: 5, name: "Graf Roda", icon: "☸️", description: "Gabungan graf bintang dan siklus.", nodes: 8, edges: 14, domination: "γ(G) = 2", diagram: <WheelGraph /> },
        { id: 6, name: "Graf Pohon", icon: "🌳", description: "Graf tanpa siklus dengan hierarki.", nodes: 9, edges: 8, domination: "≈ ⌈n/2⌉", diagram: <TreeGraph /> },
        { id: 7, name: "Graf Bipartit", icon: " bipartite", description: "Dua set simpul, koneksi antar set.", nodes: 6, edges: 7, domination: "γ(G) = 2", diagram: <BipartiteGraph /> },
        { id: 8, name: "Graf Grid", icon: "🏁", description: "Simpul dalam bentuk grid persegi.", nodes: 9, edges: 12, domination: "≈ ⌈n/4⌉", diagram: <GridGraph /> },
        { id: 9, name: "Graf Petersen", icon: "💠", description: "Graf khusus dengan 10 simpul.", nodes: 10, edges: 15, domination: "γ(G) = 3", diagram: <PetersenGraph /> },
        { id: 10, name: "Graf Kubus", icon: "🧊", description: "Graf 3D berbentuk kubus.", nodes: 8, edges: 12, domination: "γ(G) = 2", diagram: <CubeGraph /> },
        { id: 11, name: "Bipartit Lengkap", icon: "➿", description: "Setiap simpul terhubung ke semua di set lain.", nodes: 6, edges: 9, domination: "γ(G) = 2", diagram: <CompleteBipartiteGraph /> },
        { id: 12, name: "Graf Friendship", icon: "🤝", description: "Gabungan beberapa segitiga di satu pusat.", nodes: 7, edges: 9, domination: "γ(G) = 1", diagram: <FriendshipGraph /> }
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
                    <h1>Galeri Graf Interaktif</h1>
                    <p>Klik pada kartu untuk membaliknya dan melihat detail, diagram, serta penjelasan bilangan dominasi dari berbagai jenis graf.</p>
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
                                            <div className="dominationInfo"><strong>Bilangan Dominasi (γ):</strong> {graph.domination}</div>
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