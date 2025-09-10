import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBrain, faNetworkWired, faRoute, faShieldAlt,
  faLightbulb, faProjectDiagram, faLink, faSitemap,
  faCopy, faCalculator, faTree, faCircle, faSquare,
  faCodeBranch, faAtom, faChartLine, faGamepad,
  faMapMarkedAlt, faCogs, faLayerGroup,
  faSearch, faRandom, faUserShield, faGlobe, faFlask
} from '@fortawesome/free-solid-svg-icons';

import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';

import '../pages/assets/materi.css';


const Materi = () => {
  const [openSections, setOpenSections] = useState({});
  const [copied, setCopied] = useState('');
  const [selectedExample, setSelectedExample] = useState({});

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const selectExample = (section, example) => {
    setSelectedExample(prev => ({ ...prev, [section]: example }));
  };

  const SectionWrapper = ({ titleKey, title, icon, children }) => {
    const isOpen = openSections[titleKey];
    return (
      <div className="materi-card">
        <div className="card-header" onClick={() => toggleSection(titleKey)} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={icon} className="card-icon" />
          <h2 className="card-title">{title}</h2>
          <span style={{ marginLeft: 'auto', transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </div>
        {isOpen && <div className="card-body">{children}</div>}
      </div>
    );
  };

  return (
    <div className="materi-container">
      <Navbar />

      {/* Hero Section */}
      <section className="materi-hero">
        <div className="container">
          <h1 className="materi-title">Materi Pembelajaran Teori Graf</h1>
          <p className="materi-subtitle">Mulai dari konsep dasar hingga topik spesifik seperti Bilangan Dominasi</p>
        </div>
      </section>

      <div className="container materi-content">
        <SectionWrapper titleKey="teori_matriks" title="Teori Matriks dalam Graf" icon={faBrain}>
          <p>
            <strong>Analogi Sederhana:</strong> Bayangkan matriks seperti tabel data atau kotak berisi angka-angka yang disusun rapi dalam baris dan kolom. Seperti papan catur, tapi isinya angka, bukan bidak.
          </p>
          <p><strong>Lambang Umum Matriks:</strong></p>
          <pre>
            [ a₁₁  a₁₂  a₁₃ ]<br />
            [ a₂₁  a₂₂  a₂₃ ]<br />
            [ a₃₁  a₃₂  a₃₃ ]
          </pre>
          
          <h3 className="sub-section-title">Matriks Ketetanggaan (Adjacency Matrix)</h3>
          <div className="definition-box">
            <p>Matriks A = [aᵢⱼ] berukuran n×n dimana aᵢⱼ = 1 jika ada sisi antara vᵢ dan vⱼ, dan 0 jika tidak ada.</p>
            <FontAwesomeIcon
              icon={faCopy}
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={() => copyToClipboard('A = [a_ij] where a_ij = 1 if edge exists, 0 otherwise')}
              title="Salin rumus"
            />
            {copied === 'A = [a_ij] where a_ij = 1 if edge exists, 0 otherwise' && <span style={{ marginLeft: 8, color: 'green' }}>Disalin!</span>}
          </div>

          <h3 className="sub-section-title">Matriks Insidensi (Incidence Matrix)</h3>
          <div className="definition-box">
            <p>Matriks B = [bᵢⱼ] berukuran n×m dimana n adalah jumlah simpul dan m adalah jumlah sisi.</p>
            <p>bᵢⱼ = 1 jika simpul vᵢ insiden dengan sisi eⱼ</p>
          </div>

          <h3 className="sub-section-title">Matriks Laplacian</h3>
          <div className="definition-box">
            <p>L = D - A, dimana D adalah matriks derajat diagonal</p>
            <p>Berguna untuk analisis spektral graf dan konektivitas</p>
            <FontAwesomeIcon
              icon={faCopy}
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={() => copyToClipboard('L = D - A (Laplacian Matrix)')}
              title="Salin rumus"
            />
            {copied === 'L = D - A (Laplacian Matrix)' && <span style={{ marginLeft: 8, color: 'green' }}>Disalin!</span>}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="apa_itu_graf" title="Apa itu Teori Graf?" icon={faBrain}>
          <p>
            Secara sederhana, <strong>graf</strong> adalah kumpulan dari titik-titik (disebut <strong>simpul</strong> atau <em>vertices</em>) yang terhubung oleh garis-garis (disebut <strong>sisi</strong> atau <em>edges</em>). Teori graf adalah cabang matematika yang mempelajari sifat-sifat dan aplikasi dari struktur ini.
          </p>
          
          <div className="applications-grid">
            {[{
              icon: faNetworkWired,
              title: 'Jaringan Sosial',
              desc: 'Orang sebagai simpul, pertemanan sebagai sisi'
            }, {
              icon: faRoute,
              title: 'Jaringan Transportasi',
              desc: 'Kota sebagai simpul, jalan raya sebagai sisi'
            }, {
              icon: faProjectDiagram,
              title: 'Jaringan Komputer',
              desc: 'Router sebagai simpul, koneksi sebagai sisi'
            }, {
              icon: faLink,
              title: 'Jaringan Biologis',
              desc: 'Protein sebagai simpul, interaksi sebagai sisi'
            }, {
              icon: faGlobe,
              title: 'Internet',
              desc: 'Website sebagai simpul, link sebagai sisi'
            }, {
              icon: faMapMarkedAlt,
              title: 'GPS Navigation',
              desc: 'Persimpangan sebagai simpul, jalan sebagai sisi'
            }].map((item, idx) => (
              <div className="application-item" key={idx}>
                <FontAwesomeIcon icon={item.icon} className="app-icon" />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="formula-box">
            <p>Sebuah graf <em>G</em> secara formal didefinisikan sebagai:</p>
            <div className="formula">G = (V, E)</div>
            <p>di mana <em>V</em> adalah himpunan simpul dan <em>E</em> adalah himpunan sisi</p>
          </div>

          <h3 className="sub-section-title">Terminologi Dasar Graf</h3>
          <div className="variations-grid">
            {[
              { title: 'Derajat (Degree)', desc: 'Jumlah sisi yang terhubung ke suatu simpul. Notasi: deg(v)' },
              { title: 'Lintasan (Path)', desc: 'Urutan simpul yang terhubung tanpa mengulang sisi' },
              { title: 'Siklus (Cycle)', desc: 'Lintasan tertutup yang kembali ke simpul awal' },
              { title: 'Subgraf', desc: 'Graf yang dibentuk dari subset simpul dan sisi graf asli' }
            ].map((term, idx) => (
              <div className="variation" key={idx}>
                <h3>{term.title}</h3>
                <p>{term.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="jenis_graf" title="Jenis-Jenis Graf" icon={faSitemap}>
          <div className="graph-types">
            {[
              { title: 'Graf Tak Berarah', desc: 'Sisi tidak memiliki arah.', badge: 'Contoh: Jalan dua arah', icon: faCircle },
              { title: 'Graf Berarah (Digraph)', desc: 'Sisi memiliki arah (panah).', badge: 'Contoh: Jalan satu arah', icon: faRoute },
              { title: 'Graf Sederhana', desc: 'Tidak memiliki sisi ganda atau gelang.', badge: 'Contoh: Graf dasar', icon: faSquare },
              { title: 'Graf Berbobot', desc: 'Sisi memiliki nilai.', badge: 'Contoh: Peta dengan jarak', icon: faCalculator },
              { title: 'Graf Multi', desc: 'Memiliki sisi ganda antara dua simpul.', badge: 'Contoh: Jalur kereta ganda', icon: faLayerGroup },
              { title: 'Graf Pseudo', desc: 'Memiliki gelang (loop).', badge: 'Contoh: Sistem dengan feedback', icon: faConnectdevelop }
            ].map((g, idx) => (
              <div className="graph-type" key={idx}>
                <FontAwesomeIcon icon={g.icon} style={{ fontSize: '24px', marginBottom: '10px' }} />
                <h3 className="type-title">{g.title}</h3>
                <p>{g.desc}</p>
                <div className="type-badge">{g.badge}</div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Graf Khusus</h3>
          <div className="special-graphs">
            {[
              { name: 'Graf Lengkap (Kn)', formula: '|E| = n(n-1)/2', desc: 'Setiap simpul terhubung ke semua simpul lain' },
              { name: 'Graf Siklus (Cn)', formula: '|V| = |E| = n', desc: 'Graf berbentuk lingkaran' },
              { name: 'Graf Lintasan (Pn)', formula: '|E| = n-1', desc: 'Graf berbentuk garis lurus' },
              { name: 'Graf Bintang (Sn)', formula: 'γ(Sn) = 1', desc: 'Satu simpul pusat terhubung ke n-1 simpul lain' },
              { name: 'Graf Roda (Wn)', formula: '|V| = n+1, |E| = 2n', desc: 'Graf siklus dengan satu simpul pusat' },
              { name: 'Graf Bipartit', formula: 'V = X ∪ Y', desc: 'Simpul dapat dibagi menjadi dua himpunan' }
            ].map((g, idx) => (
              <div className="special-graph" key={idx}>
                <h4>{g.name}</h4>
                <p style={{ fontSize: '14px', margin: '5px 0' }}>{g.desc}</p>
                <div style={{ fontWeight: 'bold', color: '#007bff' }}>{g.formula}</div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="algoritma_graf" title="Algoritma dalam Teori Graf" icon={faCogs}>
          <div className="variations-grid">
            {[
              { 
                title: 'Breadth-First Search (BFS)', 
                desc: 'Pencarian level demi level dari simpul awal',
                complexity: 'O(V + E)',
                applications: 'Shortest path, level order traversal'
              },
              { 
                title: 'Depth-First Search (DFS)', 
                desc: 'Pencarian mendalam hingga ujung cabang',
                complexity: 'O(V + E)',
                applications: 'Deteksi siklus, topological sort'
              },
              { 
                title: 'Algoritma Dijkstra', 
                desc: 'Mencari jalur terpendek dari satu sumber',
                complexity: 'O(V² + E)',
                applications: 'GPS navigation, network routing'
              },
              { 
                title: 'Algoritma Kruskal', 
                desc: 'Mencari Minimum Spanning Tree',
                complexity: 'O(E log E)',
                applications: 'Network design, clustering'
              },
              { 
                title: 'Algoritma Prim', 
                desc: 'Alternatif untuk MST, mulai dari simpul tertentu',
                complexity: 'O(V²)',
                applications: 'Network optimization'
              },
              { 
                title: 'Floyd-Warshall', 
                desc: 'All-pairs shortest path',
                complexity: 'O(V³)',
                applications: 'Dense graphs, transitive closure'
              }
            ].map((alg, idx) => (
              <div className="variation" key={idx}>
                <h3>{alg.title}</h3>
                <p>{alg.desc}</p>
                <div style={{ marginTop: '10px', fontSize: '12px' }}>
                  <div><strong>Kompleksitas:</strong> {alg.complexity}</div>
                  <div><strong>Aplikasi:</strong> {alg.applications}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="tree_theory" title="Teori Pohon (Tree Theory)" icon={faTree}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Analogi Pohon Keluarga</h3>
              <p>Seperti pohon keluarga yang menunjukkan hubungan antar anggota tanpa ada "perkawinan silang" yang membuat siklus.</p>
            </div>
          </div>

          <div className="definition-box">
            <h3>Definisi Pohon</h3>
            <p>Graf terhubung yang tidak memiliki siklus. Untuk pohon dengan n simpul, selalu memiliki n-1 sisi.</p>
            <FontAwesomeIcon
              icon={faCopy}
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={() => copyToClipboard('Tree: Connected acyclic graph with n vertices and n-1 edges')}
              title="Salin definisi"
            />
            {copied === 'Tree: Connected acyclic graph with n vertices and n-1 edges' && <span style={{ marginLeft: 8, color: 'green' }}>Disalin!</span>}
          </div>

          <h3 className="sub-section-title">Jenis-Jenis Pohon</h3>
          <div className="variations-grid">
            {[
              { title: 'Binary Tree', desc: 'Setiap simpul maksimal memiliki 2 anak' },
              { title: 'Spanning Tree', desc: 'Subgraf pohon yang mencakup semua simpul' },
              { title: 'Minimum Spanning Tree', desc: 'Spanning tree dengan bobot total minimum' },
              { title: 'Rooted Tree', desc: 'Pohon dengan satu simpul sebagai akar' }
            ].map((tree, idx) => (
              <div className="variation" key={idx}>
                <h3>{tree.title}</h3>
                <p>{tree.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Sifat-Sifat Pohon</h3>
          <div className="special-graphs">
            <div className="special-graph">Antara dua simpul hanya ada satu lintasan</div>
            <div className="special-graph">Menambah satu sisi akan membuat siklus</div>
            <div className="special-graph">Menghapus satu sisi akan memutus koneksi</div>
            <div className="special-graph">Jumlah sisi = Jumlah simpul - 1</div>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="graph_coloring" title="Pewarnaan Graf (Graph Coloring)" icon={faGamepad}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Analogi Peta Wilayah</h3>
              <p>Seperti mewarnai peta dimana wilayah yang bersebelahan harus memiliki warna berbeda. Tujuan: gunakan sesedikit mungkin warna.</p>
            </div>
          </div>

          <div className="definition-box">
            <h3>Bilangan Kromatik χ(G)</h3>
            <p>Jumlah minimum warna yang diperlukan untuk mewarnai simpul-simpul graf sehingga tidak ada dua simpul bertetangga yang memiliki warna sama.</p>
          </div>

          <div className="variations-grid">
            {[
              { title: 'Vertex Coloring', desc: 'Mewarnai simpul-simpul graf', example: 'Penjadwalan ujian' },
              { title: 'Edge Coloring', desc: 'Mewarnai sisi-sisi graf', example: 'Penjadwalan traffic light' },
              { title: 'Face Coloring', desc: 'Mewarnai area dalam graf planar', example: 'Four Color Theorem' }
            ].map((color, idx) => (
              <div className="variation" key={idx}>
                <h3>{color.title}</h3>
                <p>{color.desc}</p>
                <div className="type-badge">{color.example}</div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Teorema Pewarnaan</h3>
          <div className="domination-examples">
            <div className="example">
              <h4>Four Color Theorem</h4>
              <div className="gamma-value">χ(planar) ≤ 4</div>
            </div>
            <div className="example">
              <h4>Brooks' Theorem</h4>
              <div className="gamma-value">χ(G) ≤ Δ(G)</div>
            </div>
            <div className="example">
              <h4>Graf Bipartit</h4>
              <div className="gamma-value">χ(G) = 2</div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="network_flow" title="Aliran Jaringan (Network Flow)" icon={faRandom}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Analogi Sistem Pipa Air</h3>
              <p>Seperti sistem distribusi air dimana setiap pipa memiliki kapasitas maksimum dan kita ingin mengalirkan air sebanyak mungkin dari sumber ke tujuan.</p>
            </div>
          </div>

          <div className="definition-box">
            <h3>Maximum Flow Problem</h3>
            <p>Mencari aliran maksimum dari simpul sumber (source) ke simpul tujuan (sink) dalam jaringan dengan kapasitas terbatas.</p>
          </div>

          <div className="variations-grid">
            {[
              { title: 'Ford-Fulkerson Algorithm', desc: 'Algoritma dasar untuk max flow menggunakan augmenting path' },
              { title: 'Edmonds-Karp Algorithm', desc: 'Implementasi Ford-Fulkerson dengan BFS' },
              { title: 'Push-Relabel Algorithm', desc: 'Algoritma yang lebih efisien untuk graf dense' },
              { title: 'Min-Cut Max-Flow Theorem', desc: 'Nilai maximum flow sama dengan minimum cut' }
            ].map((flow, idx) => (
              <div className="variation" key={idx}>
                <h3>{flow.title}</h3>
                <p>{flow.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Aplikasi Network Flow</h3>
          <div className="applications-grid">
            {[
              { icon: faNetworkWired, title: 'Bandwidth Allocation', desc: 'Distribusi bandwidth internet' },
              { icon: faRoute, title: 'Traffic Routing', desc: 'Optimasi rute lalu lintas' },
              { icon: faFlask, title: 'Supply Chain', desc: 'Manajemen rantai pasok' }
            ].map((app, idx) => (
              <div className="application-item" key={idx}>
                <FontAwesomeIcon icon={app.icon} className="app-icon" />
                <h4>{app.title}</h4>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="bilangan_dominasi" title="Konsep Bilangan Dominasi" icon={faShieldAlt}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Analogi Penjaga Museum</h3>
              <p>Bayangkan menempatkan penjaga di museum dimana setiap penjaga bisa mengawasi ruangannya dan ruangan yang terhubung langsung. Tujuannya: gunakan penjaga sesedikit mungkin untuk mengawasi seluruh museum.</p>
            </div>
          </div>
          
          <div className="domination-definition">
            <h3>Definisi Formal</h3>
            <div className="definition-box">
              <p><strong>Himpunan Dominasi</strong> dari graf G=(V,E) adalah himpunan D ⊆ V dimana setiap simpul tidak di D terhubung dengan minimal satu simpul di D.</p>
              <p><strong>Bilangan Dominasi</strong> γ(G) adalah ukuran himpunan dominasi terkecil yang mungkin.</p>
              <FontAwesomeIcon
                icon={faCopy}
                style={{ marginLeft: 10, cursor: 'pointer' }}
                onClick={() => copyToClipboard('γ(G) = min{|D| : D is a dominating set of G}')}
                title="Salin rumus"
              />
              {copied === 'γ(G) = min{|D| : D is a dominating set of G}' && <span style={{ marginLeft: 8, color: 'green' }}>Disalin!</span>}
            </div>
          </div>

          <h3 className="sub-section-title">Contoh Bilangan Dominasi</h3>
          <div className="domination-examples">
            {[
              { label: 'Graf Lengkap (Kn)', val: 'γ(Kn) = 1', desc: 'Satu simpul bisa mendominasi semua' },
              { label: 'Graf Lintasan (Pn)', val: 'γ(Pn) = ⌈n/3⌉', desc: 'Optimal dengan jarak 2' },
              { label: 'Graf Siklus (Cn)', val: 'γ(Cn) = ⌈n/3⌉', desc: 'Sama dengan path untuk n≥3' },
              { label: 'Graf Bintang (Sn)', val: 'γ(Sn) = 1', desc: 'Simpul pusat mendominasi semua' },
              { label: 'Graf Grid 2×n', val: 'γ(G2,n) = ⌈2n/3⌉', desc: 'Pattern dominasi grid' },
              { label: 'Graf Petersen', val: 'γ(P) = 3', desc: 'Graf khusus dengan γ=3' }
            ].map((e, idx) => (
              <div className="example" key={idx} onClick={() => selectExample('dominasi', e.label)} 
                   style={{ cursor: 'pointer', border: selectedExample.dominasi === e.label ? '2px solid #007bff' : '1px solid #ddd' }}>
                <h4>{e.label}</h4>
                <div className="gamma-value">{e.val}</div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>{e.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Bound untuk Bilangan Dominasi</h3>
          <div className="definition-box">
            <p><strong>Ore's Theorem:</strong> γ(G) ≤ n/2 untuk graf terhubung tanpa daun</p>
            <p><strong>Nordhaus-Gaddum:</strong> γ(G) + γ(Ḡ) ≤ n + 1</p>
            <p><strong>Vizing's Conjecture:</strong> γ(G □ H) ≥ γ(G)γ(H)</p>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="aplikasi_dominasi" title="Aplikasi dan Varian Dominasi" icon={faProjectDiagram}>
          <div className="variations-grid">
            {[
              { 
                title: 'Connected Dominating Set', 
                desc: 'Himpunan dominasi yang juga terhubung.',
                notation: 'γc(G)',
                app: 'Wireless sensor networks'
              },
              { 
                title: 'Total Dominating Set', 
                desc: 'Setiap simpul harus bertetangga dengan anggota himpunan.',
                notation: 'γt(G)',
                app: 'Resource allocation'
              },
              { 
                title: 'Independent Dominating Set', 
                desc: 'Tidak ada dua simpul di himpunan yang saling bertetangga.',
                notation: 'γi(G)',
                app: 'Facility location'
              },
              { 
                title: 'Signed Dominating Set', 
                desc: 'Dominasi dengan nilai positif dan negatif.',
                notation: 'γs(G)',
                app: 'Social influence networks'
              },
              { 
                title: 'Roman Dominating Set', 
                desc: 'Setiap simpul memiliki 0, 1, atau 2 "legion".',
                notation: 'γR(G)',
                app: 'Military strategy'
              },
              { 
                title: 'Double Dominating Set', 
                desc: 'Setiap simpul didominasi oleh minimal 2 simpul.',
                notation: 'γ×2(G)',
                app: 'Fault-tolerant systems'
              }
            ].map((v, idx) => (
              <div className="variation" key={idx}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div style={{ marginTop: '8px', fontSize: '12px' }}>
                  <div><strong>Notasi:</strong> {v.notation}</div>
                  <div><strong>Aplikasi:</strong> {v.app}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="himpunan_pembeda" title="Konsep Himpunan Pembeda dan Dimensi Metrik" icon={faSearch}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Analogi GPS dan Landmark</h3>
              <p>Seperti sistem GPS yang menggunakan beberapa satelit sebagai "landmark" untuk menentukan posisi unik setiap titik di bumi berdasarkan jarak.</p>
            </div>
          </div>

          <div className="variations-grid">
            <div className="variation">
              <h3>Himpunan Pembeda dan Dimensi Metrik</h3>
              <p>Himpunan pembeda adalah sekumpulan "titik acuan" atau "landmark" terpilih dalam sebuah graf untuk membedakan setiap simpul berdasarkan pola jarak uniknya.</p>
            </div>
          </div>

          <h3 className="subheading">Di dalam himpunan pembeda dibagi menjadi 3 bagian, yaitu:</h3>
          <div className="sub-cards">
            {[
              { 
                title: '1. Resolving Set', 
                desc: 'Sekelompok simpul untuk membedakan simpul lain berdasarkan jarak.',
                formula: 'S ⊆ V resolves u,v if d(u,S) ≠ d(v,S)'
              },
              { 
                title: '2. Metric Basis', 
                desc: 'Resolving set terkecil.',
                formula: 'β(G) = min{|S| : S is resolving set}'
              },
              { 
                title: '3. Metric Dimension', 
                desc: 'Jumlah simpul dalam metric basis.',
                formula: 'dim(G) = β(G)'
              }
            ].map((s, idx) => (
              <div className="sub-card" key={idx}>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <div style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '5px' }}>{s.formula}</div>
                <FontAwesomeIcon
                  icon={faCopy}
                  style={{ marginLeft: 5, cursor: 'pointer', fontSize: '12px' }}
                  onClick={() => copyToClipboard(s.formula)}
                  title="Salin rumus"
                />
                {copied === s.formula && <span style={{ marginLeft: 5, color: 'green', fontSize: '10px' }}>✓</span>}
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Contoh Dimensi Metrik</h3>
          <div className="domination-examples">
            {[
              { label: 'Graf Lintasan (Pn)', val: 'dim(Pn) = 1', desc: 'Satu ujung cukup untuk membedakan' },
              { label: 'Graf Siklus (Cn)', val: 'dim(Cn) = 2', desc: 'Butuh 2 landmark' },
              { label: 'Graf Lengkap (Kn)', val: 'dim(Kn) = n-1', desc: 'Hampir semua simpul jadi landmark' },
              { label: 'Graf Grid 2×n', val: 'dim(G2,n) = 2', desc: 'Dua sudut berlawanan' }
            ].map((e, idx) => (
              <div className="example" key={idx}>
                <h4>{e.label}</h4>
                <div className="gamma-value">{e.val}</div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>{e.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Aplikasi Praktis</h3>
          <div className="applications-grid">
            {[
              { icon: faMapMarkedAlt, title: 'Robot Navigation', desc: 'Robot menggunakan landmark untuk navigasi' },
              { icon: faNetworkWired, title: 'Network Monitoring', desc: 'Penempatan sensor untuk monitoring jaringan' },
              { icon: faUserShield, title: 'Pattern Recognition', desc: 'Identifikasi objek berdasarkan fitur pembeda' }
            ].map((app, idx) => (
              <div className="application-item" key={idx}>
                <FontAwesomeIcon icon={app.icon} className="app-icon" />
                <h4>{app.title}</h4>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="planar_graphs" title="Graf Planar dan Teorema Euler" icon={faAtom}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Analogi Peta Tanpa Tumpang Tindih</h3>
              <p>Graf planar seperti peta jalan dimana tidak ada jalan yang bersilangan (overpass/underpass tidak dihitung sebagai persilangan).</p>
            </div>
          </div>

          <div className="definition-box">
            <h3>Formula Euler untuk Graf Planar</h3>
            <div className="formula">V - E + F = 2</div>
            <p>V = jumlah simpul, E = jumlah sisi, F = jumlah wajah (termasuk wajah luar)</p>
            <FontAwesomeIcon
              icon={faCopy}
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={() => copyToClipboard('V - E + F = 2 (Euler\'s Formula)')}
              title="Salin rumus"
            />
            {copied === 'V - E + F = 2 (Euler\'s Formula)' && <span style={{ marginLeft: 8, color: 'green' }}>Disalin!</span>}
          </div>

          <h3 className="sub-section-title">Sifat-Sifat Graf Planar</h3>
          <div className="variations-grid">
            {[
              { title: 'Kuratowski\'s Theorem', desc: 'Graf planar jika tidak mengandung K₅ atau K₃,₃ sebagai subdivision' },
              { title: 'Wagner\'s Theorem', desc: 'Graf planar jika tidak mengandung K₅ atau K₃,₃ sebagai minor' },
              { title: 'Batas Sisi', desc: 'Untuk graf planar sederhana: E ≤ 3V - 6' },
              { title: 'Dual Graph', desc: 'Setiap graf planar memiliki graf dual' }
            ].map((prop, idx) => (
              <div className="variation" key={idx}>
                <h3>{prop.title}</h3>
                <p>{prop.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Contoh Graf Non-Planar</h3>
          <div className="domination-examples">
            <div className="example">
              <h4>Graf Lengkap K₅</h4>
              <div className="gamma-value">V=5, E=10</div>
              <p style={{ fontSize: '12px' }}>Terlalu banyak sisi</p>
            </div>
            <div className="example">
              <h4>Graf Bipartit K₃,₃</h4>
              <div className="gamma-value">V=6, E=9</div>
              <p style={{ fontSize: '12px' }}>Utility graph problem</p>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="matchings" title="Matching dan Independent Set" icon={faCodeBranch}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Analogi Perjodohan</h3>
              <p>Seperti mencarikan pasangan untuk orang-orang dimana setiap orang hanya boleh memiliki satu pasangan, dan kita ingin memaksimalkan jumlah pasangan.</p>
            </div>
          </div>

          <div className="definition-box">
            <h3>Perfect Matching</h3>
            <p>Matching yang mencakup semua simpul dalam graf. Untuk graf dengan n simpul, perfect matching memiliki n/2 sisi.</p>
          </div>

          <div className="variations-grid">
            {[
              { 
                title: 'Maximum Matching', 
                desc: 'Matching dengan jumlah sisi terbanyak',
                algo: 'Edmonds\' Blossom Algorithm'
              },
              { 
                title: 'Maximum Weight Matching', 
                desc: 'Matching dengan bobot total maksimum',
                algo: 'Hungarian Algorithm'
              },
              { 
                title: 'Stable Marriage', 
                desc: 'Matching stabil berdasarkan preferensi',
                algo: 'Gale-Shapley Algorithm'
              }
            ].map((match, idx) => (
              <div className="variation" key={idx}>
                <h3>{match.title}</h3>
                <p>{match.desc}</p>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>
                  <strong>Algorithm:</strong> {match.algo}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Independent Set</h3>
          <div className="definition-box">
            <p><strong>Independent Set:</strong> Himpunan simpul dimana tidak ada dua simpul yang bertetangga.</p>
            <p><strong>Maximum Independent Set:</strong> Independent set dengan kardinalitas maksimum, dinotasikan α(G).</p>
            <p><strong>Hubungan:</strong> α(G) + τ(G) = |V| (dimana τ(G) adalah vertex cover number)</p>
          </div>

          <h3 className="sub-section-title">Aplikasi Matching</h3>
          <div className="applications-grid">
            {[
              { icon: faUserShield, title: 'Job Assignment', desc: 'Mencocokkan pekerja dengan pekerjaan' },
              { icon: faNetworkWired, title: 'Resource Allocation', desc: 'Alokasi sumber daya optimal' },
              { icon: faGamepad, title: 'Tournament Scheduling', desc: 'Penjadwalan pertandingan' }
            ].map((app, idx) => (
              <div className="application-item" key={idx}>
                <FontAwesomeIcon icon={app.icon} className="app-icon" />
                <h4>{app.title}</h4>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="graph_invariants" title="Invarian Graf dan Parameter" icon={faChartLine}>
          <div className="definition-box">
            <h3>Invarian Graf</h3>
            <p>Sifat-sifat graf yang tidak berubah meski graf mengalami transformasi tertentu (seperti relabeling simpul).</p>
          </div>

          <div className="variations-grid">
            {[
              { 
                title: 'Connectivity κ(G)', 
                desc: 'Jumlah minimum simpul yang harus dihapus untuk memutus graf',
                range: '0 ≤ κ(G) ≤ δ(G)'
              },
              { 
                title: 'Edge Connectivity λ(G)', 
                desc: 'Jumlah minimum sisi yang harus dihapus untuk memutus graf',
                range: 'κ(G) ≤ λ(G) ≤ δ(G)'
              },
              { 
                title: 'Girth g(G)', 
                desc: 'Panjang siklus terpendek dalam graf',
                range: 'g(G) ≥ 3 (jika ada siklus)'
              },
              { 
                title: 'Diameter diam(G)', 
                desc: 'Jarak terpanjang antara dua simpul dalam graf',
                range: 'diam(G) ≤ n-1'
              },
              { 
                title: 'Radius rad(G)', 
                desc: 'Eksentrisitas minimum dari semua simpul',
                range: 'rad(G) ≤ diam(G) ≤ 2·rad(G)'
              },
              { 
                title: 'Clique Number ω(G)', 
                desc: 'Ukuran klique terbesar dalam graf',
                range: 'ω(G) ≤ χ(G)'
              }
            ].map((inv, idx) => (
              <div className="variation" key={idx}>
                <h3>{inv.title}</h3>
                <p>{inv.desc}</p>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  <strong>Range:</strong> {inv.range}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Hubungan Antar Parameter</h3>
          <div className="formula-box">
            <p><strong>Inequality Chain:</strong></p>
            <div className="formula">α(G) ≥ n/Δ(G)</div>
            <div className="formula">χ(G) ≥ ω(G)</div>
            <div className="formula">χ(G) ≥ n/α(G)</div>
            <div className="formula">κ(G) ≤ λ(G) ≤ δ(G)</div>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="dominasi_history" title="Sejarah dan Perkembangan Teori Dominasi" icon={faProjectDiagram}>
          <div className="variations-grid">
            {[
              { 
                title: 'Awal Mula (1962)', 
                desc: 'Konsep himpunan dominasi pertama kali diperkenalkan oleh Ore (1962) dalam bukunya "Theory of Graphs".',
                contribution: 'Oystein Ore - Definisi formal dominasi'
              },
              { 
                title: 'Perkembangan (1970s)', 
                desc: 'Berger (1993) dan Cockayne & Hedetniemi mengembangkan berbagai varian dominasi.',
                contribution: 'Claude Berge - Varian dominasi'
              },
              { 
                title: 'Era Modern (1980s-sekarang)', 
                desc: 'Aplikasi dalam computer science, operations research, dan network theory.',
                contribution: 'Berbagai peneliti - Aplikasi praktis'
              }
            ].map((v, idx) => (
              <div className="variation" key={idx}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '5px' }}>
                  {v.contribution}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Aplikasi Modern</h3>
          <div className="applications-grid">
            {[
              { icon: faMapMarkedAlt, title: 'Facility Location', desc: 'Penempatan optimal rumah sakit, sekolah, atau kantor polisi' },
              { icon: faNetworkWired, title: 'Sensor Networks', desc: 'Penempatan sensor untuk coverage maksimal dengan cost minimal' },
              { icon: faUserShield, title: 'Social Networks', desc: 'Identifikasi influencer untuk penyebaran informasi' },
              { icon: faFlask, title: 'Drug Design', desc: 'Identifikasi target molekul dalam desain obat' },
              { icon: faGlobe, title: 'Internet Topology', desc: 'Optimasi struktur jaringan internet' },
              { icon: faCogs, title: 'VLSI Design', desc: 'Penempatan komponen dalam chip design' }
            ].map((app, idx) => (
              <div className="application-item" key={idx}>
                <FontAwesomeIcon icon={app.icon} className="app-icon" />
                <h4>{app.title}</h4>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Kompleksitas Komputasi</h3>
          <div className="definition-box">
            <p><strong>NP-Complete:</strong> Menentukan γ(G) adalah masalah NP-complete untuk graf umum</p>
            <p><strong>Polynomial Cases:</strong> Dapat diselesaikan dalam waktu polynomial untuk trees, interval graphs, dan beberapa kelas graf khusus</p>
            <p><strong>Approximation:</strong> Algoritma aproksimasi dengan rasio ln(Δ) + 1 dimana Δ adalah derajat maksimum</p>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="advanced_topics" title="Topik Lanjutan dalam Teori Graf" icon={faAtom}>
          <div className="variations-grid">
            {[
              { 
                title: 'Spectral Graph Theory', 
                desc: 'Mempelajari sifat graf melalui eigenvalue dan eigenvector matriks terkait',
                key_concept: 'Laplacian eigenvalues, adjacency spectrum'
              },
              { 
                title: 'Random Graphs', 
                desc: 'Graf yang dibentuk melalui proses probabilistik',
                key_concept: 'Erdős–Rényi model, threshold phenomena'
              },
              { 
                title: 'Graph Homomorphisms', 
                desc: 'Pemetaan yang mempertahankan struktur adjacency',
                key_concept: 'Graph colorings as homomorphisms to cliques'
              },
              { 
                title: 'Extremal Graph Theory', 
                desc: 'Menentukan nilai ekstrem dari parameter graf dengan constraint tertentu',
                key_concept: 'Turán\'s theorem, Ramsey theory'
              },
              { 
                title: 'Algebraic Graph Theory', 
                desc: 'Menggunakan aljabar untuk mempelajari sifat graf',
                key_concept: 'Group actions, automorphism groups'
              },
              { 
                title: 'Topological Graph Theory', 
                desc: 'Mempelajari graf yang di-embed dalam permukaan topologi',
                key_concept: 'Genus of graphs, map coloring'
              }
            ].map((topic, idx) => (
              <div className="variation" key={idx}>
                <h3>{topic.title}</h3>
                <p>{topic.desc}</p>
                <div style={{ fontSize: '12px', color: '#007bff', marginTop: '5px' }}>
                  <strong>Key Concept:</strong> {topic.key_concept}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="computational_complexity" title="Kompleksitas Komputasi dalam Teori Graf" icon={faCogs}>
          <div className="definition-box">
            <h3>Kelas Kompleksitas</h3>
            <p>Berbagai masalah dalam teori graf memiliki tingkat kesulitan komputasi yang berbeda-beda.</p>
          </div>

          <div className="variations-grid">
            {[
              { 
                title: 'P (Polynomial)', 
                desc: 'Masalah yang dapat diselesaikan dalam waktu polynomial',
                examples: 'MST, Shortest Path, Bipartite Matching',
                complexity: 'O(n^k) untuk konstanta k'
              },
              { 
                title: 'NP-Complete', 
                desc: 'Masalah tersulit di kelas NP',
                examples: 'Hamiltonian Cycle, Graph Coloring, Dominating Set',
                complexity: 'Belum diketahui algoritma polynomial'
              },
              { 
                title: '#P-Complete', 
                desc: 'Masalah menghitung jumlah solusi',
                examples: 'Counting Perfect Matchings, Counting Hamiltonian Cycles',
                complexity: 'Lebih sulit dari NP-Complete'
              }
            ].map((class_comp, idx) => (
              <div className="variation" key={idx}>
                <h3>{class_comp.title}</h3>
                <p>{class_comp.desc}</p>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>
                  <div><strong>Examples:</strong> {class_comp.examples}</div>
                  <div><strong>Complexity:</strong> {class_comp.complexity}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Algoritma Aproksimasi</h3>
          <div className="domination-examples">
            {[
              { label: 'Vertex Cover', val: '2-approximation', desc: 'Algoritma greedy dengan rasio 2' },
              { label: 'TSP (Metric)', val: '1.5-approximation', desc: 'Christofides algorithm' },
              { label: 'Set Cover', val: 'ln(n)-approximation', desc: 'Greedy algorithm' },
              { label: 'Max Cut', val: '0.878-approximation', desc: 'SDP-based algorithm' }
            ].map((e, idx) => (
              <div className="example" key={idx}>
                <h4>{e.label}</h4>
                <div className="gamma-value">{e.val}</div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="graph_applications" title="Aplikasi Teori Graf dalam Kehidupan Nyata" icon={faGlobe}>
          <div className="applications-grid">
            {[
              { 
                icon: faNetworkWired, 
                title: 'Social Media Analytics', 
                desc: 'Analisis jaringan sosial, deteksi komunitas, viral marketing'
              },
              { 
                icon: faRoute, 
                title: 'Transportation & Logistics', 
                desc: 'Optimasi rute, traffic management, supply chain'
              },
              { 
                icon: faFlask, 
                title: 'Bioinformatics', 
                desc: 'Protein interaction networks, phylogenetic trees, drug discovery'
              },
              { 
                icon: faCogs, 
                title: 'Computer Networks', 
                desc: 'Internet topology, routing protocols, network reliability'
              },
              { 
                icon: faGamepad, 
                title: 'Game Theory', 
                desc: 'Strategy games, tournament brackets, AI pathfinding'
              },
              { 
                icon: faChartLine, 
                title: 'Financial Markets', 
                desc: 'Portfolio optimization, risk management, fraud detection'
              },
              { 
                icon: faAtom, 
                title: 'Chemistry & Physics', 
                desc: 'Molecular structures, crystal lattices, quantum systems'
              },
              { 
                icon: faUserShield, 
                title: 'Cybersecurity', 
                desc: 'Attack graphs, vulnerability analysis, intrusion detection'
              },
              { 
                icon: faSearch, 
                title: 'Web Search', 
                desc: 'PageRank algorithm, web crawling, link analysis'
              }
            ].map((app, idx) => (
              <div className="application-item" key={idx}>
                <FontAwesomeIcon icon={app.icon} className="app-icon" />
                <h4>{app.title}</h4>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Case Study: PageRank Algorithm</h3>
          <div className="definition-box">
            <p>PageRank menggunakan struktur graf dari web links untuk menentukan importance sebuah halaman web.</p>
            <div className="formula">PR(A) = (1-d)/N + d × Σ(PR(Ti)/C(Ti))</div>
            <p>dimana d adalah damping factor, biasanya 0.85</p>
          </div>

          <h3 className="sub-section-title">Emerging Applications</h3>
          <div className="variations-grid">
            {[
              { title: 'Machine Learning', desc: 'Graph Neural Networks, knowledge graphs, recommendation systems' },
              { title: 'Blockchain', desc: 'Transaction graphs, consensus algorithms, network analysis' },
              { title: 'IoT Networks', desc: 'Sensor placement, data routing, energy optimization' },
              { title: 'Smart Cities', desc: 'Traffic optimization, resource allocation, urban planning' }
            ].map((emerge, idx) => (
              <div className="variation" key={idx}>
                <h3>{emerge.title}</h3>
                <p>{emerge.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
};

export default Materi;