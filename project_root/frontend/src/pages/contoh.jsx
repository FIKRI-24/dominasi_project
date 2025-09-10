import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faInfoCircle, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import '../pages/assets/contoh.css';
import Navbar from '../../components/navbar';
// import '../../src/App.css'

const Contoh = () => {
  
  const [activeGraph, setActiveGraph] = useState(null);

  const graphExamples = [
    {
      id: 1,
      name: "Graf Lintasan (Path Graph)",
      description: "Graf dengan simpul yang terhubung dalam satu garis lurus tanpa percabangan.",
      nodes: 5,
      edges: 4,
      domination: "γ(G) = ⌈n/3⌉",
      example: "Rute bus tunggal",
      diagram: <PathGraph />
    },
    {
      id: 2,
      name: "Graf Siklus (Cycle Graph)",
      description: "Graf berbentuk lingkaran dimana simpul pertama dan terakhir terhubung.",
      nodes: 6,
      edges: 6,
      domination: "γ(G) = ⌈n/3⌉",
      example: "Jaringan metro melingkar",
      diagram: <CycleGraph />
    },
    {
      id: 3,
      name: "Graf Bintang (Star Graph)",
      description: "Graf dengan satu simpul pusat yang terhubung ke semua simpul lainnya.",
      nodes: 7,
      edges: 6,
      domination: "γ(G) = 1",
      example: "Jaringan wifi dengan router pusat",
      diagram: <StarGraph />
    },
    {
      id: 4,
      name: "Graf Lengkap (Complete Graph)",
      description: "Setiap simpul terhubung langsung dengan semua simpul lainnya.",
      nodes: 5,
      edges: 10,
      domination: "γ(G) = 1",
      example: "Jaringan telepon dimana semua saling terhubung",
      diagram: <CompleteGraph />
    },
    {
      id: 5,
      name: "Graf Roda (Wheel Graph)",
      description: "Gabungan graf bintang dan siklus dengan simpul pusat.",
      nodes: 8,
      edges: 14,
      domination: "γ(G) = 2",
      example: "Jaringan transportasi dengan terminal pusat",
      diagram: <WheelGraph />
    },
    {
      id: 6,
      name: "Graf Pohon (Tree Graph)",
      description: "Graf tanpa siklus dengan percabangan hierarkis.",
      nodes: 9,
      edges: 8,
      domination: "γ(G) = ⌈n/2⌉",
      example: "Struktur organisasi perusahaan",
      diagram: <TreeGraph />
    },
    {
      id: 7,
      name: "Graf Bipartit (Bipartite Graph)",
      description: "Graf yang simpulnya dapat dibagi menjadi dua himpunan terpisah.",
      nodes: 6,
      edges: 7,
      domination: "γ(G) = 2",
      example: "Jaringan pekerjaan dengan pekerja dan pekerjaan",
      diagram: <BipartiteGraph />
    },
    {
      id: 8,
      name: "Graf Grid (Grid Graph)",
      description: "Graf berbentuk grid persegi dengan koneksi horizontal dan vertikal.",
      nodes: 9,
      edges: 12,
      domination: "γ(G) = ⌈n/4⌉",
      example: "Peta kota dengan jalan sejajar",
      diagram: <GridGraph />
    },
    {
      id: 9,
      name: "Graf Petersen",
      description: "Graf khusus dengan 10 simpul yang sering digunakan sebagai contoh teori.",
      nodes: 10,
      edges: 15,
      domination: "γ(G) = 3",
      example: "Model jaringan kompleks",
      diagram: <PetersenGraph />
    },
    {
      id: 10,
      name: "Graf Kubus (Cube Graph)",
      description: "Graf 3D berbentuk kubus dengan simpul di setiap sudutnya.",
      nodes: 8,
      edges: 12,
      domination: "γ(G) = 2",
      example: "Jaringan komputer dalam data center",
      diagram: <CubeGraph />
    },
    {
      id: 11,
      name: "Graf Bipartit Lengkap (Complete Bipartite)",
      description: "Setiap simpul di satu himpunan terhubung ke semua simpul di himpunan lain.",
      nodes: 6,
      edges: 9,
      domination: "γ(G) = 2",
      example: "Sistem pemasok-produk",
      diagram: <CompleteBipartiteGraph />
    },
    {
      id: 12,
      name: "Graf Friendship",
      description: "Gabungan beberapa graf segitiga yang bertemu di satu simpul pusat.",
      nodes: 7,
      edges: 9,
      domination: "γ(G) = 1",
      example: "Jaringan sosial dengan teman-teman mutual",
      diagram: <FriendshipGraph />
    }
  ];

  const toggleGraph = (id) => {
    setActiveGraph(activeGraph === id ? null : id);
  };

  return (
    <section className="contoh">
      
      {/* Komponen Navbar */}
      <div className="navbar_container">
        <Navbar />
      </div>

      <div className="container">
        {/* Added big title here */}
        <div className="main-title">
          <h1>Contoh-contoh Graf dan Bilangan Dominasinya</h1>
          <p>Berikut adalah berbagai jenis graf beserta penjelasan tentang bilangan dominasinya</p>
        </div>

        <div className="graph-examples">
          {graphExamples.map((graph) => (
            <div key={graph.id} className={`graph-card ${activeGraph === graph.id ? 'active' : ''}`}>
              <div 
                className="graph-header"
                onClick={() => toggleGraph(graph.id)}
              >
                <h3>{graph.name}</h3>
                <FontAwesomeIcon icon={activeGraph === graph.id ? faCircle : faInfoCircle} />
              </div>
              
              {activeGraph === graph.id && (
                <div className="graph-content">
                  <div className="graph-diagram">
                    {graph.diagram}
                  </div>
                  <div className="graph-info">
                    <p><strong>Deskripsi:</strong> {graph.description}</p>
                    <p><strong>Jumlah Simpul:</strong> {graph.nodes}</p>
                    <p><strong>Jumlah Sisi:</strong> {graph.edges}</p>
                    <p><strong>Bilangan Dominasi (γ):</strong> {graph.domination}</p>
                    <p><strong>Contoh Nyata:</strong> {graph.example}</p>
                    <div className="domination-explanation">
                      <h4>Penjelasan Dominasi:</h4>
                      <p>{getDominationExplanation(graph.id)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Graph Components
function PathGraph() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100">
      <circle cx="20" cy="50" r="8" fill="#3b82f6" />
      <circle cx="60" cy="50" r="8" fill="#3b82f6" />
      <circle cx="100" cy="50" r="8" fill="#3b82f6" />
      <circle cx="140" cy="50" r="8" fill="#3b82f6" />
      <circle cx="180" cy="50" r="8" fill="#3b82f6" />
      <line x1="20" y1="50" x2="60" y2="50" stroke="#94a3b8" strokeWidth="2" />
      <line x1="60" y1="50" x2="100" y2="50" stroke="#94a3b8" strokeWidth="2" />
      <line x1="100" y1="50" x2="140" y2="50" stroke="#94a3b8" strokeWidth="2" />
      <line x1="140" y1="50" x2="180" y2="50" stroke="#94a3b8" strokeWidth="2" />
    </svg>
  );
}

function CycleGraph() {
  const points = [];
  const centerX = 100, centerY = 100, radius = 80;
  const nodes = 6;
  
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
        <circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill="#3b82f6" />
      ))}
      {points.map((point, i) => {
        const nextPoint = points[(i + 1) % points.length];
        return (
          <line 
            key={`edge-${i}`}
            x1={point.x} y1={point.y} 
            x2={nextPoint.x} y2={nextPoint.y} 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        );
      })}
    </svg>
  );
}

function StarGraph() {
  const centerX = 100, centerY = 100;
  const points = [];
  const nodes = 7;
  const radius = 80;
  
  // Center node
  points.push({ x: centerX, y: centerY });
  
  // Outer nodes
  for (let i = 0; i < nodes - 1; i++) {
    const angle = (i * 2 * Math.PI / (nodes - 1)) - Math.PI / 2;
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {points.map((point, i) => (
        <circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill="#3b82f6" />
      ))}
      {points.slice(1).map((point, i) => (
        <line 
          key={`edge-${i}`}
          x1={centerX} y1={centerY} 
          x2={point.x} y2={point.y} 
          stroke="#94a3b8" 
          strokeWidth="2" 
        />
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
      {points.map((point, i) => (
        <circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill="#3b82f6" />
      ))}
      {points.map((point1, i) => {
        return points.map((point2, j) => {
          if (i < j) {
            return (
              <line 
                key={`edge-${i}-${j}`}
                x1={point1.x} y1={point1.y} 
                x2={point2.x} y2={point2.y} 
                stroke="#94a3b8" 
                strokeWidth="2" 
              />
            );
          }
          return null;
        });
      })}
    </svg>
  );
}

function WheelGraph() {
  const centerX = 100, centerY = 100;
  const points = [];
  const nodes = 8;
  const radius = 80;
  
  // Center node
  points.push({ x: centerX, y: centerY });
  
  // Outer nodes
  for (let i = 0; i < nodes - 1; i++) {
    const angle = (i * 2 * Math.PI / (nodes - 1)) - Math.PI / 2;
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {points.map((point, i) => (
        <circle key={`node-${i}`} cx={point.x} cy={point.y} r="8" fill="#3b82f6" />
      ))}
      
      {/* Connect center to all outer nodes */}
      {points.slice(1).map((point, i) => (
        <line 
          key={`spoke-${i}`}
          x1={centerX} y1={centerY} 
          x2={point.x} y2={point.y} 
          stroke="#94a3b8" 
          strokeWidth="2" 
        />
      ))}
      
      {/* Connect outer nodes in a cycle */}
      {points.slice(1).map((point, i, arr) => {
        const nextPoint = arr[(i + 1) % arr.length];
        return (
          <line 
            key={`rim-${i}`}
            x1={point.x} y1={point.y} 
            x2={nextPoint.x} y2={nextPoint.y} 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        );
      })}
    </svg>
  );
}

function TreeGraph() {
  const nodes = [
    { id: 1, x: 100, y: 30 },  // Root
    { id: 2, x: 50, y: 80 },   // Level 1 left
    { id: 3, x: 150, y: 80 },  // Level 1 right
    { id: 4, x: 30, y: 130 },  // Level 2 left-left
    { id: 5, x: 70, y: 130 },  // Level 2 left-right
    { id: 6, x: 110, y: 130 }, // Level 2 right-left
    { id: 7, x: 170, y: 130 }, // Level 2 right-right
    { id: 8, x: 20, y: 180 },  // Level 3 left-left-left
    { id: 9, x: 40, y: 180 }   // Level 3 left-left-right
  ];

  const edges = [
    { from: 1, to: 2 }, { from: 1, to: 3 },
    { from: 2, to: 4 }, { from: 2, to: 5 },
    { from: 3, to: 6 }, { from: 3, to: 7 },
    { from: 4, to: 8 }, { from: 4, to: 9 }
  ];

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {edges.map((edge, i) => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        return (
          <line 
            key={`edge-${i}`}
            x1={fromNode.x} y1={fromNode.y} 
            x2={toNode.x} y2={toNode.y} 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        );
      })}
      {nodes.map((node, i) => (
        <circle key={`node-${i}`} cx={node.x} cy={node.y} r="8" fill="#3b82f6" />
      ))}
    </svg>
  );
}

function BipartiteGraph() {
  const leftNodes = [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 50, y: 100 },
    { id: 3, x: 50, y: 150 }
  ];
  
  const rightNodes = [
    { id: 4, x: 150, y: 50 },
    { id: 5, x: 150, y: 100 },
    { id: 6, x: 150, y: 150 }
  ];
  
  const edges = [
    { from: 1, to: 4 }, { from: 1, to: 5 },
    { from: 2, to: 5 }, { from: 2, to: 6 },
    { from: 3, to: 4 }, { from: 3, to: 5 },
    { from: 3, to: 6 }
  ];

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {edges.map((edge, i) => {
        const fromNode = [...leftNodes, ...rightNodes].find(n => n.id === edge.from);
        const toNode = [...leftNodes, ...rightNodes].find(n => n.id === edge.to);
        return (
          <line 
            key={`edge-${i}`}
            x1={fromNode.x} y1={fromNode.y} 
            x2={toNode.x} y2={toNode.y} 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        );
      })}
      {leftNodes.map((node, i) => (
        <circle key={`left-${i}`} cx={node.x} cy={node.y} r="8" fill="#3b82f6" />
      ))}
      {rightNodes.map((node, i) => (
        <circle key={`right-${i}`} cx={node.x} cy={node.y} r="8" fill="#ef4444" />
      ))}
    </svg>
  );
}

function GridGraph() {
  const rows = 3;
  const cols = 3;
  const spacing = 60;
  const offsetX = 40;
  const offsetY = 40;
  
  const nodes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      nodes.push({
        id: r * cols + c + 1,
        x: offsetX + c * spacing,
        y: offsetY + r * spacing
      });
    }
  }
  
  const edges = [];
  // Horizontal edges
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) {
      edges.push({
        from: r * cols + c + 1,
        to: r * cols + c + 2
      });
    }
  }
  // Vertical edges
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 1; r++) {
      edges.push({
        from: r * cols + c + 1,
        to: (r + 1) * cols + c + 1
      });
    }
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {edges.map((edge, i) => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        return (
          <line 
            key={`edge-${i}`}
            x1={fromNode.x} y1={fromNode.y} 
            x2={toNode.x} y2={toNode.y} 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        );
      })}
      {nodes.map((node, i) => (
        <circle key={`node-${i}`} cx={node.x} cy={node.y} r="8" fill="#3b82f6" />
      ))}
    </svg>
  );
}

function PetersenGraph() {
  const outerPoints = [];
  const innerPoints = [];
  const centerX = 100, centerY = 100;
  const outerRadius = 80;
  const innerRadius = 40;
  const nodes = 5;
  
  // Outer pentagon
  for (let i = 0; i < nodes; i++) {
    const angle = (i * 2 * Math.PI / nodes) - Math.PI / 2;
    outerPoints.push({
      id: i + 1,
      x: centerX + outerRadius * Math.cos(angle),
      y: centerY + outerRadius * Math.sin(angle)
    });
  }
  
  // Inner star points
  for (let i = 0; i < nodes; i++) {
    const angle = (i * 2 * Math.PI / nodes) - Math.PI / 2 + Math.PI / nodes;
    innerPoints.push({
      id: i + 6,
      x: centerX + innerRadius * Math.cos(angle),
      y: centerY + innerRadius * Math.sin(angle)
    });
  }
  
  const edges = [
    // Outer pentagon
    { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, 
    { from: 4, to: 5 }, { from: 5, to: 1 },
    // Inner star
    { from: 6, to: 8 }, { from: 8, to: 10 }, { from: 10, to: 7 },
    { from: 7, to: 9 }, { from: 9, to: 6 },
    // Connections between outer and inner
    { from: 1, to: 6 }, { from: 2, to: 7 }, { from: 3, to: 8 },
    { from: 4, to: 9 }, { from: 5, to: 10 }
  ];

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {edges.map((edge, i) => {
        const allNodes = [...outerPoints, ...innerPoints];
        const fromNode = allNodes.find(n => n.id === edge.from);
        const toNode = allNodes.find(n => n.id === edge.to);
        return (
          <line 
            key={`edge-${i}`}
            x1={fromNode.x} y1={fromNode.y} 
            x2={toNode.x} y2={toNode.y} 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        );
      })}
      {outerPoints.map((node, i) => (
        <circle key={`outer-${i}`} cx={node.x} cy={node.y} r="8" fill="#3b82f6" />
      ))}
      {innerPoints.map((node, i) => (
        <circle key={`inner-${i}`} cx={node.x} cy={node.y} r="8" fill="#ef4444" />
      ))}
    </svg>
  );
}

function CubeGraph() {
  const nodes = [
    // Bottom face
    { id: 1, x: 60, y: 60, z: 0 },
    { id: 2, x: 140, y: 60, z: 0 },
    { id: 3, x: 140, y: 140, z: 0 },
    { id: 4, x: 60, y: 140, z: 0 },
    // Top face
    { id: 5, x: 40, y: 40, z: 100 },
    { id: 6, x: 120, y: 40, z: 100 },
    { id: 7, x: 120, y: 120, z: 100 },
    { id: 8, x: 40, y: 120, z: 100 }
  ].map(node => {
    // Simple 3D to 2D projection
    const scale = 100 / (100 + node.z);
    return {
      id: node.id,
      x: 50 + (node.x - 50) * scale,
      y: 50 + (node.y - 50) * scale
    };
  });

  const edges = [
    // Bottom face
    { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 1 },
    // Top face
    { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 8 }, { from: 8, to: 5 },
    // Vertical edges
    { from: 1, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 7 }, { from: 4, to: 8 }
  ];

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {edges.map((edge, i) => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        return (
          <line 
            key={`edge-${i}`}
            x1={fromNode.x} y1={fromNode.y} 
            x2={toNode.x} y2={toNode.y} 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        );
      })}
      {nodes.map((node, i) => (
        <circle key={`node-${i}`} cx={node.x} cy={node.y} r="8" fill="#3b82f6" />
      ))}
    </svg>
  );
}

function CompleteBipartiteGraph() {
  const leftNodes = [
    { id: 1, x: 50, y: 40 },
    { id: 2, x: 50, y: 100 },
    { id: 3, x: 50, y: 160 }
  ];
  
  const rightNodes = [
    { id: 4, x: 150, y: 40 },
    { id: 5, x: 150, y: 100 },
    { id: 6, x: 150, y: 160 }
  ];
  
  const edges = [];
  for (const left of leftNodes) {
    for (const right of rightNodes) {
      edges.push({ from: left.id, to: right.id });
    }
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {edges.map((edge, i) => {
        const fromNode = [...leftNodes, ...rightNodes].find(n => n.id === edge.from);
        const toNode = [...leftNodes, ...rightNodes].find(n => n.id === edge.to);
        return (
          <line 
            key={`edge-${i}`}
            x1={fromNode.x} y1={fromNode.y} 
            x2={toNode.x} y2={toNode.y} 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        );
      })}
      {leftNodes.map((node, i) => (
        <circle key={`left-${i}`} cx={node.x} cy={node.y} r="8" fill="#3b82f6" />
      ))}
      {rightNodes.map((node, i) => (
        <circle key={`right-${i}`} cx={node.x} cy={node.y} r="8" fill="#ef4444" />
      ))}
    </svg>
  );
}

function FriendshipGraph() {
  const center = { id: 1, x: 100, y: 100 };
  const outerNodes = [];
  const triangles = 3;
  const radius = 60;
  
  for (let t = 0; t < triangles; t++) {
    const angle1 = (t * 2 * Math.PI / triangles) - Math.PI / 2;
    const angle2 = angle1 + (2 * Math.PI / (3 * triangles));
    
    outerNodes.push({
      id: 2 + t * 2,
      x: center.x + radius * Math.cos(angle1),
      y: center.y + radius * Math.sin(angle1)
    });
    
    outerNodes.push({
      id: 3 + t * 2,
      x: center.x + radius * Math.cos(angle2),
      y: center.y + radius * Math.sin(angle2)
    });
  }
  
  const edges = [];
  // Connect center to all outer nodes
  outerNodes.forEach(node => {
    edges.push({ from: center.id, to: node.id });
  });
  
  // Connect outer nodes in triangles
  for (let t = 0; t < triangles; t++) {
    const node1 = outerNodes[t * 2];
    const node2 = outerNodes[t * 2 + 1];
    edges.push({ from: node1.id, to: node2.id });
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {edges.map((edge, i) => {
        const allNodes = [center, ...outerNodes];
        const fromNode = allNodes.find(n => n.id === edge.from);
        const toNode = allNodes.find(n => n.id === edge.to);
        return (
          <line 
            key={`edge-${i}`}
            x1={fromNode.x} y1={fromNode.y} 
            x2={toNode.x} y2={toNode.y} 
            stroke="#94a3b8" 
            strokeWidth="2" 
          />
        );
      })}
      <circle cx={center.x} cy={center.y} r="8" fill="#3b82f6" />
      {outerNodes.map((node, i) => (
        <circle key={`outer-${i}`} cx={node.x} cy={node.y} r="8" fill="#ef4444" />
      ))}
    </svg>
  );
}

function getDominationExplanation(id) {
  const explanations = {
    1: "Pada graf lintasan, himpunan dominasi minimal dapat dipilih dengan mengambil setiap simpul ketiga. Untuk graf dengan 5 simpul, ⌈5/3⌉ = 2 simpul cukup untuk mendominasi seluruh graf.",
    2: "Graf siklus membutuhkan setidaknya ⌈n/3⌉ simpul untuk mendominasi semua simpul lainnya. Untuk graf dengan 6 simpul, ⌈6/3⌉ = 2 simpul cukup.",
    3: "Graf bintang memiliki simpul pusat yang dapat mendominasi seluruh graf, sehingga bilangan dominasinya adalah 1.",
    4: "Pada graf lengkap, satu simpul apapun dapat mendominasi semua simpul lainnya karena terhubung langsung, sehingga bilangan dominasinya adalah 1.",
    5: "Graf roda membutuhkan setidaknya 2 simpul untuk mendominasi seluruh graf - simpul pusat dan satu simpul pada siklus luar.",
    6: "Untuk graf pohon, bilangan dominasi biasanya ⌈n/2⌉. Namun, untuk pohon khusus seperti bintang, bisa lebih kecil.",
    7: "Graf bipartit membutuhkan minimal 2 simpul (satu dari setiap partisi) untuk mendominasi seluruh graf.",
    8: "Graf grid membutuhkan sekitar ⌈n/4⌉ simpul untuk mendominasi seluruh grid.",
    9: "Graf Petersen memiliki bilangan dominasi 3, yang berarti dibutuhkan minimal 3 simpul untuk mendominasi seluruh graf.",
    10: "Graf kubus 3D membutuhkan 2 simpul yang berseberangan untuk mendominasi seluruh simpul.",
    11: "Graf bipartit lengkap membutuhkan minimal 2 simpul (satu dari setiap partisi) untuk mendominasi seluruh graf.",
    12: "Graf friendship memiliki simpul pusat yang dapat mendominasi seluruh graf, sehingga bilangan dominasinya adalah 1."
  };
  return explanations[id] || "Penjelasan dominasi untuk graf ini...";
}

export default Contoh;