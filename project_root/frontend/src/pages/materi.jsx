import React, { useState } from 'react';
import Navbar from '../../components/navbar.module.jsx';
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
          <h1 className="materi-title">Penentuan dan Karakterisasi Bilangan Dominasi-Lokasi-Metrik</h1>
          <p className="materi-subtitle">Kajian mendalam tentang himpunan dominasi-lokasi-metrik pada berbagai kelas graf</p>
        </div>
      </section>

      <div className="container materi-content">
        
        <SectionWrapper titleKey="pendahuluan" title="dominasi dan matrix" icon={faBrain}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Motivasi Penelitian</h3>
              <p>Bilangan dominasi-lokasi-metrik merupakan gabungan konsep bilangan dominasi dan dimensi metrik yang diperkenalkan oleh Brigham dkk. (2003). Konsep ini mencari himpunan yang sekaligus merupakan himpunan dominasi dan himpunan pembeda.</p>
            </div>
          </div>

          <h3 className="sub-section-title">Definisi Dasar Graf</h3>
          <div className="definition-box">
            <p><strong>Graf G = (V, E):</strong> Pasangan himpunan dimana V adalah himpunan titik dan E adalah himpunan sisi</p>
            <p><strong>Orde |G|:</strong> Banyak titik dalam graf</p>
            <p><strong>Ukuran ||G||:</strong> Banyak sisi dalam graf</p>
            <p><strong>Derajat d(v):</strong> Banyak sisi yang terkait pada titik v</p>
          </div>

          <h3 className="sub-section-title">Konsep Jarak dan Keterhubungan</h3>
          <div className="variations-grid">
            {[
              { title: 'Jarak d(u,v)', desc: 'Panjang lintasan terpendek yang menghubungkan titik u dan v' },
              { title: 'Diameter diam(G)', desc: 'Nilai maksimum dari eksentrisitas titik di G' },
              { title: 'Radius rad(G)', desc: 'Nilai minimum dari eksentrisitas titik di G' },
              { title: 'Eksentrisitas ecc(v)', desc: 'Maksimum jarak v ke sebarang titik di G' }
            ].map((term, idx) => (
              <div className="variation" key={idx}>
                <h3>{term.title}</h3>
                <p>{term.desc}</p>
              </div>
            ))}
          </div>

          <div className="applications-grid">
            {[{
              icon: faNetworkWired,
              title: 'Penemuan Jaringan',
              desc: 'Menemukan lokasi titik rusak dan melakukan perbaikan'
            }, {
              icon: faShieldAlt,
              title: 'Deteksi Ancaman',
              desc: 'Mengetahui lokasi ancaman dan lokasi terdekat untuk mengatasinya'
            }, {
              icon: faMapMarkedAlt,
              title: 'Optimasi Fasilitas',
              desc: 'Penempatan optimal rumah sakit, sekolah, atau kantor polisi'
            }, {
              icon: faUserShield,
              title: 'Jaringan Sosial',
              desc: 'Identifikasi influencer untuk penyebaran informasi'
            }].map((item, idx) => (
              <div className="application-item" key={idx}>
                <FontAwesomeIcon icon={item.icon} className="app-icon" />
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="himpunan_dominasi" title="Himpunan Dominasi dan Bilangan Dominasi" icon={faShieldAlt}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Analogi Penjaga Museum</h3>
              <p>Bayangkan menempatkan penjaga di museum dimana setiap penjaga bisa mengawasi ruangannya dan ruangan yang terhubung langsung. Tujuannya: gunakan penjaga sesedikit mungkin untuk mengawasi seluruh museum.</p>
            </div>
          </div>
          
          <div className="definition-box">
            <h3>Definisi Formal</h3>
            <p><strong>Himpunan Dominasi D ⊆ V:</strong> Himpunan dimana setiap titik di V − D bertetangga dengan minimal satu titik di D</p>
            <p><strong>Bilangan Dominasi γ(G):</strong> Kardinalitas terkecil dari himpunan dominasi di G</p>
            <FontAwesomeIcon
              icon={faCopy}
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={() => copyToClipboard('γ(G) = min{|D| : D is a dominating set of G}')}
              title="Salin rumus"
            />
            {copied === 'γ(G) = min{|D| : D is a dominating set of G}' && <span style={{ marginLeft: 8, color: 'green' }}>Disalin!</span>}
          </div>

          <h3 className="sub-section-title">Sifat Himpunan Dominasi Minimum (Ore, 1962)</h3>
          <div className="special-graphs">
            <div className="special-graph">Setiap dua titik di D tidak bertetangga, atau</div>
            <div className="special-graph">Jika bertetangga, ada titik c ∉ D sehingga N(c) ∩ D = d</div>
            <div className="special-graph">Titik pendan atau tetangganya harus termuat di himpunan dominasi</div>
          </div>

          <h3 className="sub-section-title">Batas Bilangan Dominasi</h3>
          <div className="domination-examples">
            <div className="example">
              <h4>Berge (1962)</h4>
              <div className="gamma-value">|G| − ||G|| ≤ γ(G) ≤ |G| − Δ</div>
            </div>
            <div className="example">
              <h4>Ore (1962)</h4>
              <div className="gamma-value">2γ(G) ≤ n</div>
            </div>
            <div className="example">
              <h4>Fink dkk. (1985)</h4>
              <div className="gamma-value">γ(G) ≤ ⌊n/2⌋</div>
            </div>
          </div>

          <h3 className="sub-section-title">Bilangan Dominasi Graf Khusus</h3>
          <div className="variations-grid">
            {[
              { title: 'Graf Lengkap Kₙ', desc: 'γ(Kₙ) = 1', complexity: 'Satu titik mendominasi semua' },
              { title: 'Graf Bintang Sₙ', desc: 'γ(Sₙ) = 1', complexity: 'Titik pusat mendominasi' },
              { title: 'Graf Siklus Cₙ', desc: 'γ(Cₙ) = ⌈n/3⌉', complexity: 'Optimal dengan jarak 2' },
              { title: 'Graf Bipartit Kₘ,ₙ', desc: 'γ(Kₘ,ₙ) = 2', complexity: 'Satu dari tiap partisi' },
              { title: 'Graf Lintasan Pₙ', desc: 'γ(Pₙ) = ⌈n/3⌉', complexity: 'Optimal dengan jarak 2' }
            ].map((g, idx) => (
              <div className="variation" key={idx}>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
                <div style={{ marginTop: '10px', fontSize: '12px' }}>
                  <strong>Keterangan:</strong> {g.complexity}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="himpunan_pembeda" title="Himpunan Pembeda dan Dimensi Metrik" icon={faSearch}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Analogi GPS dan Landmark</h3>
              <p>Seperti sistem GPS yang menggunakan beberapa satelit sebagai "landmark" untuk menentukan posisi unik setiap titik berdasarkan jarak. Slater (1975) dan Harary & Melter (1976) memperkenalkan konsep ini untuk jaringan deteksi sonar.</p>
            </div>
          </div>

          <div className="definition-box">
            <h3>Definisi Formal</h3>
            <p><strong>Representasi r(v|W):</strong> Vektor jarak (d(v,w₁), d(v,w₂), ..., d(v,wₖ)) dari titik v terhadap himpunan W</p>
            <p><strong>Himpunan Pembeda W:</strong> Himpunan dimana r(x|W) ≠ r(y|W) untuk setiap dua titik berbeda x, y ∈ V(G)</p>
            <p><strong>Dimensi Metrik β(G):</strong> Kardinalitas minimum himpunan pembeda</p>
            <FontAwesomeIcon
              icon={faCopy}
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={() => copyToClipboard('β(G) = min{|W| : W is a resolving set of G}')}
              title="Salin rumus"
            />
            {copied === 'β(G) = min{|W| : W is a resolving set of G}' && <span style={{ marginLeft: 8, color: 'green' }}>Disalin!</span>}
          </div>

          <h3 className="sub-section-title">Sifat Titik Kembar</h3>
          <div className="definition-box">
            {/* <p><strong>Titik Kembar:</strong> Dua titik u dan v disebut kembar jika N(u) − {v} = N(v) − {u}</p> */}
            <p><strong>Teorema:</strong> Jika S adalah himpunan dengan p ≥ 2 titik kembar pada graf G, maka setiap himpunan pembeda harus memuat p − 1 titik dari S</p>
          </div>

          <h3 className="sub-section-title">Karakterisasi Dimensi Metrik (Chartrand dkk., 2000)</h3>
          <div className="domination-examples">
            {[
              { label: 'β(G) = 1', val: 'G ≅ Pₙ', desc: 'Hanya graf lintasan' },
              { label: 'β(G) = n−1', val: 'G ≅ Kₙ', desc: 'Graf lengkap' },
              { label: 'β(G) = n−2', val: 'Kᵣ,ₛ, Kᵣ + Kₛ, dll', desc: 'Graf bipartit lengkap dan variannya' },
              { label: 'β(Cₙ)', val: 'β(Cₙ) = 2', desc: 'Graf siklus untuk n ≥ 3' }
            ].map((e, idx) => (
              <div className="example" key={idx}>
                <h4>{e.label}</h4>
                <div className="gamma-value">{e.val}</div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>{e.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Dimensi Metrik Pohon (Slater, 1975)</h3>
          <div className="definition-box">
            <p><strong>Titik Mayor:</strong> Titik v dengan d(v) ≥ 3</p>
            <p><strong>Titik Terminal:</strong> Titik pendan u dari titik mayor v jika d(u,v) &lt; d(u,w) untuk setiap titik mayor w</p>
            <p><strong>Derajat Terminal ter(v):</strong> Banyaknya titik terminal dari v</p>
            <p><strong>Formula:</strong> β(T) = σ(T) − ex(T), dimana σ(T) adalah total derajat terminal dan ex(T) banyaknya titik mayor eksterior</p>
          </div>

          <h3 className="sub-section-title">Graf dengan Dimensi Metrik 2</h3>
          <div className="variations-grid">
            {[
              { title: 'Lintasan Unik', desc: 'Terdapat tepat satu lintasan terpendek antara dua titik pembeda' },
              { title: 'Batas Derajat', desc: 'Derajat titik pembeda paling banyak 3' },
              { title: 'Titik Lain', desc: 'Setiap titik lain di lintasan berderajat paling banyak 5' },
              { title: 'Tidak Memuat', desc: 'Tidak memuat K₅ dan K₃,₃ sebagai subgraf' }
            ].map((prop, idx) => (
              <div className="variation" key={idx}>
                <h3>{prop.title}</h3>
                <p>{prop.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="bilangan_dominasi_lokasi" title="Bilangan Dominasi-Lokasi-Metrik" icon={faProjectDiagram}>
          <div className="definition-box">
            <h3>Definisi Utama</h3>
            <p><strong>Himpunan Dominasi-Lokasi-Metrik:</strong> Himpunan S yang sekaligus merupakan himpunan dominasi DAN himpunan pembeda</p>
            <p><strong>Bilangan Dominasi-Lokasi-Metrik γₘ(G):</strong> Kardinalitas minimum dari himpunan dominasi-lokasi-metrik</p>
            <FontAwesomeIcon
              icon={faCopy}
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={() => copyToClipboard('γₘ(G) = min{|S| : S is metric-locating-dominating set}')}
              title="Salin rumus"
            />
            {copied === 'γₘ(G) = min{|S| : S is metric-locating-dominating set}' && <span style={{ marginLeft: 8, color: 'green' }}>Disalin!</span>}
          </div>

          <h3 className="sub-section-title">Batas Fundamental (Brigham dkk., 2003)</h3>
          <div className="formula-box">
            <div className="formula">
  max{'{'}γ(G), β(G){'}'} ≤ γₘ(G) ≤ min{'{'}γ(G) + β(G), n − 1{'}'}
</div>
            <p>Hubungan antara bilangan dominasi, dimensi metrik, dan bilangan dominasi-lokasi-metrik</p>
          </div>

          <h3 className="sub-section-title">Empat Kondisi Himpunan</h3>
          <div className="variations-grid">
            {[
              { 
                title: 'Kondisi 1: R ⊆ D', 
                desc: 'Himpunan pembeda termuat dalam himpunan dominasi minimum',
                notation: 'γₘ(G) = max{γ(G), β(G)}',
                app: 'Batas bawah tercapai'
              },
              { 
                title: 'Kondisi 2: D ⊂ R', 
                desc: 'Himpunan dominasi termuat dalam himpunan pembeda minimum',
                notation: 'γₘ(G) = max{γ(G), β(G)}',
                app: 'Batas bawah tercapai'
              },
              { 
                title: 'Kondisi 3: D ∩ R = ∅', 
                desc: 'Himpunan dominasi dan pembeda minimum saling lepas',
                notation: 'γₘ(G) = min{γ(G) + β(G), n−1}',
                app: 'Batas atas tercapai'
              },
              { 
                title: 'Kondisi 4: D ∩ R ≠ ∅', 
                desc: 'Ada irisan tapi tidak subset',
                notation: 'max{γ(G), β(G)} < γₘ(G) < min{γ(G)+β(G), n−1}',
                app: 'Di antara batas'
              }
            ].map((v, idx) => (
              <div className="variation" key={idx}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div style={{ marginTop: '8px', fontSize: '12px' }}>
                  <div><strong>Hasil:</strong> {v.notation}</div>
                  <div><strong>Keterangan:</strong> {v.app}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Karakterisasi Graf Khusus</h3>
          <div className="domination-examples">
            {[
              { label: 'γₘ(G) = 1', val: 'G ≅ Pₙ, n=1,2', desc: 'Hanya lintasan orde 1 atau 2' },
              { label: 'γₘ(G) = n−1', val: 'K₁,ₙ₋₁ atau Kₙ', desc: 'Graf bintang atau lengkap' },
              { label: 'γₘ(Cₙ)', val: 'γₘ(Cₙ) = γ(Cₙ)', desc: 'Sama dengan bilangan dominasi' },
              { label: 'γₘ(Kₙ)', val: 'γₘ(Kₙ) = β(Kₙ)', desc: 'Sama dengan dimensi metrik' }
            ].map((e, idx) => (
              <div className="example" key={idx}>
                <h4>{e.label}</h4>
                <div className="gamma-value">{e.val}</div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="karakterisasi_n_minus_2" title="Karakterisasi γₘ(G) = n−2" icon={faSitemap}>
          <div className="definition-box">
            <h3>Tujuh Keluarga Graf (Henning & Oellermann, 2004)</h3>
            <p>Graf orde n dengan γₘ(G) = n−2 jika dan hanya jika G termasuk salah satu keluarga berikut:</p>
          </div>

          <div className="variations-grid">
            {[
              { 
                title: 'F₁: Graf Bintang Ganda', 
                desc: 'S(m,k) dengan m, k ≥ 1 dan m+k+2 ≥ 4',
                detail: 'Penambahan m dan k pendan pada masing-masing titik K₂'
              },
              { 
                title: 'F₂: Kₙ + Pendan', 
                desc: 'Graf lengkap orde ≥ 3 dengan pendan pada satu titik',
                detail: 'Penambahan sejumlah pendan pada tepat satu titik'
              },
              { 
                title: 'F₃: K₂ + Kₘ Variant 1', 
                desc: 'Pendan pada titik berderajat m',
                detail: 'Graf K₂ + Kₘ dengan penambahan pendan'
              },
              { 
                title: 'F₄: K₂ + Kₘ Variant 2', 
                desc: 'Pendan pada titik berderajat m+1',
                detail: 'Graf K₂ + Kₘ dengan penambahan pendan berbeda'
              },
              { 
                title: 'F₅: Graf Bipartit', 
                desc: 'Kₘ,ₖ dengan m, k ≥ 2',
                detail: 'Graf bipartit lengkap'
              },
              { 
                title: 'F₆: Penjumlahan', 
                desc: 'Kₘ + Kₖ dengan m, k ≥ 2',
                detail: 'Operasi tambah dua graf lengkap'
              },
              { 
                title: 'F₇: Kₘ − k Sisi', 
                desc: 'Penghapusan k sisi dari Kₘ',
                detail: 'Dengan 2 ≤ k ≤ m−3, sisi terkait satu titik'
              }
            ].map((f, idx) => (
              <div className="variation" key={idx}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div style={{ fontSize: '11px', marginTop: '5px', fontStyle: 'italic' }}>
                  {f.detail}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="pohon" title="Bilangan Dominasi-Lokasi-Metrik Pohon" icon={faTree}>
          <div className="definition-box">
            <h3>Terminologi Pohon</h3>
            <p><strong>Titik Pendukung S(T):</strong> Titik yang bertetangga dengan titik pendan</p>
            <p><strong>Titik Pendukung Kuat S'(T):</strong> Titik yang bertetangga dengan ≥ 2 titik pendan</p>
            <p><strong>ℓ(T):</strong> Banyak titik pendan</p>
            <p><strong>ℓ'(T):</strong> Banyak titik pendan yang bertetangga dengan titik pendukung kuat</p>
          </div>

          <h3 className="sub-section-title">Teorema Utama Pohon (Henning & Oellermann, 2004)</h3>
          <div className="formula-box">
            <div className="formula">γₘ(T) = γ(T) + ℓ'(T) − |S'(T)|</div>
            <p>Formula umum untuk bilangan dominasi-lokasi-metrik pohon</p>
          </div>

          <h3 className="sub-section-title">Kondisi Khusus</h3>
          <div className="domination-examples">
            <div className="example">
              <h4>Batas Bawah</h4>
              <div className="gamma-value">γₘ(T) = γ(T)</div>
              <p style={{ fontSize: '12px' }}>Jika dan hanya jika T tidak mempunyai titik pendukung kuat</p>
            </div>
            <div className="example">
              <h4>Batas Atas</h4>
              <div className="gamma-value">γₘ(T) = β(T) + γ(T)</div>
              <p style={{ fontSize: '12px' }}>Setiap titik mayor eksterior dengan ter(u) ≥ 2 adalah pendukung semua titik terminalnya</p>
            </div>
            <div className="example">
              <h4>Setengah Orde</h4>
              <div className="gamma-value">γₘ(T) = ½n</div>
              <p style={{ fontSize: '12px' }}>Setiap titik dalam bertetangga dengan tepat satu titik pendan</p>
            </div>
          </div>

          <h3 className="sub-section-title">Contoh Pohon Khusus</h3>
          <div className="variations-grid">
            {[
              { title: 'Graf Bintang K₁,ₙ', desc: 'γₘ(K₁,ₙ) = n', note: 'Semua titik pendan kecuali satu' },
              { title: 'Graf Lintasan Pₙ', desc: 'γₘ(Pₙ) = ⌈n/3⌉', note: 'Sama dengan bilangan dominasi' },
              { title: 'Graf Ulat C(m;n₁,...,nₘ)', desc: 'Bergantung pada distribusi pendan', note: 'Analisis kasus per kasus' },
              { title: 'Subdivisi K₁,ₙ', desc: 'K₁,ₙ(k;m₁,...,mₖ)', note: 'Penyisipan titik pada k sisi' }
            ].map((tree, idx) => (
              <div className="variation" key={idx}>
                <h3>{tree.title}</h3>
                <p>{tree.desc}</p>
                <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
                  {tree.note}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="operasi_korona" title="Graf Hasil Operasi Korona" icon={faRandom}>
          <div className="definition-box">
            <h3>Operasi Korona G ⊙ H</h3>
            <p>Graf yang diperoleh dengan mengambil satu salinan G dan |V(G)| salinan H, lalu menghubungkan titik ke-i dari G ke setiap titik pada salinan Hᵢ</p>
            <p><strong>V(G ⊙ H):</strong> V(G) ∪ ⋃ᵢ∈V(G) V(Hᵢ)</p>
            <p>
  <strong>E(G ⊙ H):</strong> E(G) &cup; &bigcup;ᵢ&isin;V(G) (E(Hᵢ) &cup; {'{'}iu | u &isin; V(Hᵢ){'}'})
</p>
            <FontAwesomeIcon
              icon={faCopy}
              style={{ marginLeft: 10, cursor: 'pointer' }}
              onClick={() => copyToClipboard('G ⊙ H: corona product')}
              title="Salin notasi"
            />
            {copied === 'G ⊙ H: corona product' && <span style={{ marginLeft: 8, color: 'green' }}>Disalin!</span>}
          </div>

          <h3 className="sub-section-title">Syarat untuk Batas Bawah dan Atas</h3>
          <div className="variations-grid">
            {[
              { 
                title: 'γₘ(G ⊙ H) = γ(G ⊙ H)', 
                desc: 'Tercapai jika himpunan pembeda termuat dalam himpunan dominasi',
                condition: 'H adalah graf spesial atau memiliki kondisi khusus'
              },
              { 
                title: 'γₘ(G ⊙ H) = β(G ⊙ H)', 
                desc: 'Tercapai jika himpunan dominasi termuat dalam himpunan pembeda',
                condition: 'H memiliki titik berderajat penuh'
              },
              { 
                title: 'γₘ(G ⊙ H) = γ(G ⊙ H) + β(G ⊙ H)', 
                desc: 'Batas atas tercapai jika keduanya saling lepas',
                condition: 'Setiap himpunan dominasi dan pembeda minimum saling lepas'
              }
            ].map((cond, idx) => (
              <div className="variation" key={idx}>
                <h3>{cond.title}</h3>
                <p>{cond.desc}</p>
                <div style={{ fontSize: '11px', marginTop: '5px', fontStyle: 'italic' }}>
                  {cond.condition}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Contoh Hasil Operasi Korona</h3>
          <div className="domination-examples">
            {[
              { label: 'K₁ ⊙ Pₘ', val: 'γₘ = m', desc: 'Korona titik dengan lintasan' },
              { label: 'K₁ ⊙ Cₘ', val: 'γₘ = ⌈m/3⌉', desc: 'Korona titik dengan siklus' },
              { label: 'G ⊙ Kₙ', val: 'Bergantung struktur G', desc: 'Korona dengan graf lengkap' },
              { label: 'G ⊙ K₁', val: 'γₘ(G ⊙ K₁) ≥ |V(G)|', desc: 'Penambahan pendan pada setiap titik' }
            ].map((e, idx) => (
              <div className="example" key={idx}>
                <h4>{e.label}</h4>
                <div className="gamma-value">{e.val}</div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="graf_k_lintasan" title="Graf k-Lintasan" icon={faRoute}>
          <div className="definition-box">
            <h3>Definisi Graf k-Lintasan</h3>
            <p>
  <strong>Graf k-lintasan G:</strong> Graf dengan V(G) = {'{'}v₁, v₂, ..., vₙ{'}'} dan E(G) = {'{'}vᵢvⱼ : |i − j| &le; k{'}'}
</p>
            <p>Untuk k = 1, graf 1-lintasan adalah graf lintasan biasa Pₙ</p>
          </div>

          <h3 className="sub-section-title">Sifat Graf k-Lintasan</h3>
          <div className="variations-grid">
            {[
              { title: 'Dimensi Metrik', desc: 'β(G) = k untuk graf k-lintasan', ref: 'Behtoei dkk. (2015)' },
              { title: 'Bilangan Dominasi', desc: 'Setiap titik mendominasi k tetangga sebelum dan sesudahnya', ref: 'Sifat struktural' },
              { title: 'Himpunan Dominasi', desc: '{v₂, v₇} dominasi jika 8−2 ≤ k tetapi {v₂, v₈} tidak jika 8−2 > k', ref: 'Contoh kasus' }
            ].map((prop, idx) => (
              <div className="variation" key={idx}>
                <h3>{prop.title}</h3>
                <p>{prop.desc}</p>
                <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
                  Referensi: {prop.ref}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Teorema Utama</h3>
          <div className="formula-box">
            <div className="formula">γₘ(G) = γ(G) untuk graf k-lintasan</div>
            <p>Bilangan dominasi-lokasi-metrik graf k-lintasan mencapai batas bawah, sama dengan bilangan dominasinya</p>
          </div>

          <div className="domination-examples">
            <div className="example">
              <h4>Graf 1-lintasan (Pₙ)</h4>
              <div className="gamma-value">γₘ(Pₙ) = ⌈n/3⌉</div>
              <p style={{ fontSize: '12px' }}>Sama dengan graf lintasan biasa</p>
            </div>
            <div className="example">
              <h4>Graf 2-lintasan</h4>
              <div className="gamma-value">β(G) = 2, γₘ(G) = γ(G)</div>
              <p style={{ fontSize: '12px' }}>Batas bawah tercapai</p>
            </div>
            <div className="example">
              <h4>Graf k-lintasan umum</h4>
              <div className="gamma-value">γₘ(G) = γ(G)</div>
              <p style={{ fontSize: '12px' }}>Untuk sebarang k ≥ 1</p>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="karakterisasi_2" title="Karakterisasi γₘ(G) = 2" icon={faSquare}>
          <div className="definition-box">
            <h3>Syarat Cukup dan Perlu</h3>
            <p>Suatu graf G memiliki γₘ(G) = 2 berdasarkan ketunggalan lintasan terpendek, derajat titik, orde, dan diameter</p>
          </div>

          <h3 className="sub-section-title">Kelas Graf dengan γₘ = 2</h3>
          <div className="variations-grid">
            {[
              { title: 'Graf Lintasan Pₙ', desc: 'n = 3, 4, 5, 6', detail: 'Lintasan pendek' },
              { title: 'Graf Siklus Cₙ', desc: 'n = 4, 5', detail: 'Siklus kecil' },
              { title: 'K₁ + H', desc: 'H ≅ P₂, P₂∪K₁, P₃, P₄, C₅, 2P₂', detail: 'Penambahan titik dominan' },
              { title: 'Graf Khusus F₁-F₅', desc: 'Lima keluarga graf spesifik', detail: 'Karakterisasi lengkap' },
              { title: 'Graf H₁-H₁₄', desc: '14 graf khusus', detail: 'Struktur tertentu' },
              { title: 'Graf R₁-R₁₇', desc: '17 graf khusus', detail: 'Variasi struktur' }
            ].map((g, idx) => (
              <div className="variation" key={idx}>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
                <div style={{ fontSize: '11px', marginTop: '5px', fontStyle: 'italic' }}>
                  {g.detail}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Kondisi Geometrik</h3>
          <div className="definition-box">
            <p><strong>Lintasan Unik:</strong> Terdapat tepat satu lintasan terpendek antara dua titik pembeda</p>
            <p><strong>Batas Derajat:</strong> Derajat titik pembeda maksimal 3</p>
            <p><strong>Diameter:</strong> Diameter graf mempengaruhi kemungkinan γₘ = 2</p>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="karakterisasi_3_pohon" title="Karakterisasi Pohon dengan γₘ(T) = 3" icon={faTree}>
          <div className="definition-box">
            <h3>Subdivisi Graf Bintang</h3>
            <p>Pohon T dengan γₘ(T) = 3 dapat dikarakterisasi melalui subdivisi dari graf bintang K₁,ₙ</p>
            <p><strong>Notasi K₁,ₙ(k; m₁, m₂, ..., mₖ):</strong> Subdivisi graf K₁,ₙ pada k sisi masing-masing sebanyak m₁, m₂, ..., mₖ titik</p>
          </div>

          <h3 className="sub-section-title">Contoh Kasus Khusus</h3>
          <div className="domination-examples">
            {[
              { label: 'K₁,₃(2; k₁, k₂)', val: 'γₘ = 3', desc: 'Subdivisi 2 sisi dari K₁,₃' },
              { label: 'K₁,₃(2; 1, 1)', val: 'γₘ = 3', desc: 'Masing-masing sisipan 1 titik' },
              { label: 'K₁,₃(2; 1, 2)', val: 'γₘ = 3', desc: 'Sisipan berbeda' },
              { label: 'K₁,₃(3; 1, k₁, k₂)', val: 'γₘ = 3', desc: 'Subdivisi 3 sisi' }
            ].map((e, idx) => (
              <div className="example" key={idx}>
                <h4>{e.label}</h4>
                <div className="gamma-value">{e.val}</div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>{e.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Syarat Umum</h3>
          <div className="variations-grid">
            {[
              { title: 'Struktur Dasar', desc: 'Berbasis subdivisi graf bintang K₁,ₙ' },
              { title: 'Titik Mayor', desc: 'Memiliki tepat satu titik mayor (pusat)' },
              { title: 'Penyisipan', desc: 'Penyisipan titik pada beberapa sisi tertentu' },
              { title: 'Cabang', desc: 'Setiap cabang memiliki struktur tertentu' }
            ].map((cond, idx) => (
              <div className="variation" key={idx}>
                <h3>{cond.title}</h3>
                <p>{cond.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="karakterisasi_3_unisiklik" title="Karakterisasi Graf Unisiklik dengan γₘ = 3" icon={faCircle}>
          <div className="definition-box">
            <h3>Graf Unisiklik</h3>
            <p><strong>Definisi:</strong> Graf yang memuat tepat satu siklus</p>
            <p><strong>Struktur:</strong> Terdiri dari satu siklus Cₘ dengan cabang-cabang pohon</p>
          </div>

          <h3 className="sub-section-title">Klasifikasi Berdasarkan Panjang Siklus</h3>
          <div className="variations-grid">
            {[
              { 
                title: 'Siklus C₉', 
                desc: 'U₉.₁, U₉.₂, U₉.₃',
                count: '3 graf'
              },
              { 
                title: 'Siklus C₈', 
                desc: 'U₈.₁ sampai U₈.₄',
                count: '4 graf'
              },
              { 
                title: 'Siklus C₇', 
                desc: 'U₇.₁ sampai U₇.₈',
                count: '8 graf'
              },
              { 
                title: 'Siklus C₆', 
                desc: 'U₆.₁ sampai U₆.₁₄',
                count: '14 graf'
              },
              { 
                title: 'Siklus C₅', 
                desc: 'U₅.₁ sampai U₅.₂₄',
                count: '24 graf'
              },
              { 
                title: 'Siklus C₄', 
                desc: 'U₄.₁ sampai U₄.₂₃',
                count: '23 graf'
              },
              { 
                title: 'Siklus C₃', 
                desc: 'U₃.₁ sampai U₃.₅₈',
                count: '58 graf'
              }
            ].map((cycle, idx) => (
              <div className="variation" key={idx}>
                <h3>{cycle.title}</h3>
                <p>{cycle.desc}</p>
                <div style={{ fontSize: '12px', marginTop: '5px', fontWeight: 'bold', color: '#007bff' }}>
                  {cycle.count}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Total Karakterisasi</h3>
          <div className="formula-box">
            <div className="formula">Total: 134 graf unisiklik dengan γₘ = 3</div>
            <p>Meliputi semua kemungkinan konfigurasi siklus C₃ hingga C₉ dengan cabang pohon</p>
          </div>

          <h3 className="sub-section-title">Pola Umum</h3>
          <div className="special-graphs">
            <div className="special-graph">Semakin panjang siklus, semakin sedikit variasi cabang yang mungkin</div>
            <div className="special-graph">Siklus C₃ memiliki variasi terbanyak (58 graf)</div>
            <div className="special-graph">Penambahan pendan pada titik siklus mempengaruhi γₘ</div>
            <div className="special-graph">Struktur cabang pohon harus memenuhi syarat tertentu</div>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="setengah_orde" title="Graf dengan γₘ(G) = ½n" icon={faCalculator}>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Kondisi Khusus</h3>
              <p>
  Graf dengan bilangan dominasi-lokasi-metrik setengah dari ordenya memenuhi kondisi keempat: max{'{'}γ(G), β(G){'}'} &lt; γₘ(G) &lt; min{'{'}γ(G) + β(G), n − 1{'}'}
</p>
            
            </div>
          </div>

          <h3 className="sub-section-title">Pohon dengan γₘ(T) = ½n</h3>
          <div className="definition-box">
            <p><strong>Teorema (Fink dkk., 1985):</strong> Pohon T orde n mempunyai γ(T) = ½n jika dan hanya jika setiap titik dalam bertetangga dengan tepat satu titik pendan</p>
            <p><strong>Karakterisasi:</strong> Untuk γₘ(T) = ½n, struktur harus memenuhi kondisi tambahan terkait himpunan pembeda</p>
          </div>

          <h3 className="sub-section-title">Contoh Graf Ulat</h3>
          <div className="domination-examples">
            {[
              { label: 'C(5; 3,1,0,2,1)', val: 'γₘ = ½n', desc: 'Graf ulat dengan distribusi pendan tertentu' },
              { label: 'C(m; n₁,...,nₘ)', val: 'Bergantung distribusi', desc: 'Syarat: setiap titik dalam punya 1 pendan' },
              { label: 'Pohon Umum', val: 'γₘ(T) = ½n', desc: 'Jika memenuhi kondisi struktural' }
            ].map((e, idx) => (
              <div className="example" key={idx}>
                <h4>{e.label}</h4>
                <div className="gamma-value">{e.val}</div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>{e.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Graf Hasil Operasi Korona dengan γₘ = ½n</h3>
          <div className="variations-grid">
            {[
              { title: 'G ⊙ K₁', desc: 'Penambahan satu pendan pada setiap titik G', condition: 'Jika G memenuhi syarat tertentu' },
              { title: 'Kondisi Graf G', desc: 'Struktur G harus memungkinkan distribusi merata', condition: 'γ(G) dan β(G) seimbang' },
              { title: 'Perhitungan', desc: 'γₘ(G ⊙ K₁) = |V(G)|', condition: 'Untuk kasus khusus' }
            ].map((korona, idx) => (
              <div className="variation" key={idx}>
                <h3>{korona.title}</h3>
                <p>{korona.desc}</p>
                <div style={{ fontSize: '11px', marginTop: '5px', fontStyle: 'italic' }}>
                  {korona.condition}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Graf Unisiklik dengan γₘ = ½n</h3>
          <div className="definition-box">
            <p><strong>Struktur:</strong> Siklus Cₘ dengan m titik pendan pada titik-titik tertentu</p>
            <p><strong>Notasi Cₘ(v₁, vₖ; p):</strong> Graf unisiklik dengan p pendan pada titik v₁ dan vₖ yang berjarak tertentu</p>
            <p><strong>Syarat:</strong> Distribusi pendan harus memenuhi kondisi keseimbangan</p>
          </div>

          <h3 className="sub-section-title">Graf Hasil Kali Sisir</h3>
          <div className="definition-box">
            <p><strong>Definisi G ⊠ᵥ H:</strong> Graf hasil kali sisir dengan operasi khusus pada titik v</p>
            <p><strong>Contoh Sₙ(k; 1,1,...,1):</strong> Graf bintang dengan subdivisi khusus</p>
            <p><strong>Syarat γₘ = ½n:</strong> Struktur harus memungkinkan partisi seimbang</p>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="kompleksitas" title="Kompleksitas Komputasi" icon={faCogs}>
          <div className="definition-box">
            <h3>NP-Completeness</h3>
            <p><strong>Dimensi Metrik:</strong> Khuller dkk. (1996) menunjukkan bahwa penentuan dimensi metrik adalah NP-complete</p>
            <p><strong>Bilangan Dominasi-Lokasi-Metrik:</strong> Karena melibatkan dimensi metrik, penentuan γₘ(G) juga NP-complete untuk graf umum</p>
          </div>

          <h3 className="sub-section-title">Kasus Polynomial</h3>
          <div className="variations-grid">
            {[
              { 
                title: 'Graf Pohon', 
                desc: 'Dapat diselesaikan dalam waktu polynomial',
                complexity: 'O(n) dengan algoritma khusus'
              },
              { 
                title: 'Graf Lintasan', 
                desc: 'Trivial: γₘ(Pₙ) = ⌈n/3⌉',
                complexity: 'O(1) setelah mengetahui n'
              },
              { 
                title: 'Graf k-lintasan', 
                desc: 'Dapat dihitung dengan formula',
                complexity: 'O(n) dengan pendekatan greedy'
              },
              { 
                title: 'Graf Khusus', 
                desc: 'Kₙ, Kₘ,ₙ, Cₙ memiliki formula eksplisit',
                complexity: 'O(1)'
              }
            ].map((case_comp, idx) => (
              <div className="variation" key={idx}>
                <h3>{case_comp.title}</h3>
                <p>{case_comp.desc}</p>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>
                  <strong>Kompleksitas:</strong> {case_comp.complexity}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Pendekatan Penelitian</h3>
          <div className="special-graphs">
            <div className="special-graph">Karakterisasi graf dengan nilai tertentu</div>
            <div className="special-graph">Pembatasan pada kelas graf tertentu</div>
            <div className="special-graph">Pencarian syarat cukup dan perlu</div>
            <div className="special-graph">Analisis batas bawah dan batas atas</div>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="hasil_terdahulu" title="Ringkasan Hasil Penelitian Terdahulu" icon={faProjectDiagram}>
          <h3 className="sub-section-title">Kontribusi Peneliti Utama</h3>
          <div className="variations-grid">
            {[
              { 
                title: 'Brigham dkk. (2003)', 
                desc: 'Memperkenalkan konsep bilangan dominasi-lokasi-metrik',
                contribution: 'Batas fundamental: max{γ, β} ≤ γₘ ≤ min{γ+β, n−1}'
              },
              { 
                title: 'Henning & Oellermann (2004)', 
                desc: 'Karakterisasi graf dengan γₘ = n−1 dan n−2',
                contribution: 'Formula untuk pohon dan 7 keluarga graf'
              },
              { 
                title: 'González dkk. (2018)', 
                desc: 'Karakterisasi pohon mencapai batas atas',
                contribution: 'Syarat cukup dan perlu untuk γₘ(T) = γ(T) + β(T)'
              },
              { 
                title: 'Cáceres & Pelayo (2023)', 
                desc: 'Perumuman untuk sebarang graf terhubung',
                contribution: 'Batas bawah: γₘ(G) ≥ γ(G) + ℓ(G) − |S(G)|'
              },
              { 
                title: 'Susilowati dkk. (2020)', 
                desc: 'Karakterisasi γₘ = 1 dan hasil operasi',
                contribution: 'Graf lengkap, bipartit, dan operasi penjumlahan'
              }
            ].map((researcher, idx) => (
              <div className="variation" key={idx}>
                <h3>{researcher.title}</h3>
                <p>{researcher.desc}</p>
                <div style={{ fontSize: '11px', marginTop: '5px', fontStyle: 'italic' }}>
                  Kontribusi: {researcher.contribution}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Hasil untuk Graf Khusus</h3>
          <div className="domination-examples">
            {[
              { label: 'Graf Lengkap', val: 'γₘ(Kₙ) = n−1', desc: 'Henning & Oellermann (2004)' },
              { label: 'Graf Bintang', val: 'γₘ(K₁,ₙ) = n−1', desc: 'Henning & Oellermann (2004)' },
              { label: 'Graf Siklus', val: 'γₘ(Cₙ) = ⌈n/3⌉', desc: 'Susilowati dkk. (2020)' },
              { label: 'Graf Persahabatan', val: 'γₘ(Fₙ) = n', desc: 'Kurniawati dkk. (2020)' },
              { label: 'Graf Helm', val: 'γₘ(Hₘ) = m', desc: 'Hayyu dkk. (2020)' },
              { label: 'Graf k-lintasan', val: 'γₘ(G) = γ(G)', desc: 'Penelitian ini' }
            ].map((e, idx) => (
              <div className="example" key={idx}>
                <h4>{e.label}</h4>
                <div className="gamma-value">{e.val}</div>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="masalah_terbuka" title="Masalah Terbuka dan Arah Penelitian" icon={faGlobe}>
          <div className="variations-grid">
            {[
              { 
                title: 'Karakterisasi Lengkap', 
                desc: 'Belum semua nilai γₘ dikarakterisasi',
                open: 'Graf dengan γₘ = 3, 4, 5, ..., n−3 untuk n besar'
              },
              { 
                title: 'Algoritma Efisien', 
                desc: 'Belum ada algoritma polynomial untuk graf umum',
                open: 'Pengembangan heuristik dan aproksimasi'
              },
              { 
                title: 'Graf Khusus Lain', 
                desc: 'Banyak kelas graf belum dikaji',
                open: 'Graf planar, graf regular, graf Cayley'
              },
              { 
                title: 'Operasi Graf', 
                desc: 'Belum semua operasi dipelajari',
                open: 'Hasil kali kartesius, join, dll'
              },
              { 
                title: 'Batas Lebih Ketat', 
                desc: 'Batas Brigham masih lebar',
                open: 'Pencarian batas yang lebih tajam'
              },
              { 
                title: 'Aplikasi Praktis', 
                desc: 'Implementasi dalam masalah nyata',
                open: 'Optimasi jaringan, sensor placement'
              }
            ].map((problem, idx) => (
              <div className="variation" key={idx}>
                <h3>{problem.title}</h3>
                <p>{problem.desc}</p>
                <div style={{ fontSize: '11px', marginTop: '5px', color: '#d9534f', fontStyle: 'italic' }}>
                  Terbuka: {problem.open}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Arah Penelitian Masa Depan</h3>
          <div className="applications-grid">
            {[
              { icon: faNetworkWired, title: 'Jaringan Kompleks', desc: 'Aplikasi pada jaringan sosial dan internet' },
              { icon: faFlask, title: 'Bioinformatika', desc: 'Protein interaction networks dan drug discovery' },
              { icon: faCogs, title: 'Optimasi Kombinatorial', desc: 'Pengembangan algoritma aproksimasi' },
              { icon: faChartLine, title: 'Machine Learning', desc: 'Graph Neural Networks dan knowledge graphs' }
            ].map((app, idx) => (
              <div className="application-item" key={idx}>
                <FontAwesomeIcon icon={app.icon} className="app-icon" />
                <h4>{app.title}</h4>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="metodologi" title="Metodologi Penelitian" icon={faSearch}>
          <div className="definition-box">
            <h3>Pendekatan Penelitian</h3>
            <p>Penelitian bilangan dominasi-lokasi-metrik menggunakan kombinasi pendekatan teoretis dan konstruktif</p>
          </div>

          <h3 className="sub-section-title">Tahapan Penelitian</h3>
          <div className="variations-grid">
            {[
              { 
                title: 'Analisis Struktur', 
                desc: 'Mempelajari sifat struktural graf',
                method: 'Mengidentifikasi pola himpunan dominasi dan pembeda'
              },
              { 
                title: 'Konstruksi Himpunan', 
                desc: 'Membangun himpunan dominasi-lokasi-metrik',
                method: 'Menggunakan sifat dominasi dan pembeda'
              },
              { 
                title: 'Pembuktian Minimalitas', 
                desc: 'Membuktikan kardinalitas minimum',
                method: 'Kontradiksi dan induksi matematika'
              },
              { 
                title: 'Karakterisasi', 
                desc: 'Menentukan syarat cukup dan perlu',
                method: 'Analisis kasus dan generalisasi'
              },
              { 
                title: 'Verifikasi', 
                desc: 'Memverifikasi hasil dengan contoh',
                method: 'Konstruksi graf dan perhitungan manual'
              }
            ].map((step, idx) => (
              <div className="variation" key={idx}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div style={{ fontSize: '11px', marginTop: '5px', fontStyle: 'italic' }}>
                  Metode: {step.method}
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Teknik Pembuktian</h3>
          <div className="special-graphs">
            <div className="special-graph">Bukti langsung dengan konstruksi eksplisit</div>
            <div className="special-graph">Bukti kontradiksi untuk menunjukkan minimalitas</div>
            <div className="special-graph">Induksi matematika untuk kelas graf tak hingga</div>
            <div className="special-graph">Analisis kasus untuk karakterisasi lengkap</div>
          </div>
        </SectionWrapper>

        <SectionWrapper titleKey="aplikasi_nyata" title="Aplikasi dalam Kehidupan Nyata" icon={faGlobe}>
          <h3 className="sub-section-title">Penempatan Fasilitas Umum</h3>
          <div className="analogy-box">
            <FontAwesomeIcon icon={faLightbulb} className="analogy-icon" />
            <div>
              <h3>Contoh Kasus</h3>
              <p>Menentukan lokasi optimal untuk menempatkan rumah sakit, sekolah, atau kantor polisi di suatu wilayah sehingga setiap lokasi dapat diidentifikasi unik berdasarkan jarak ke fasilitas terdekat, dan setiap area terlayani</p>
            </div>
          </div>

          <h3 className="sub-section-title">Jaringan Sensor Nirkabel</h3>
          <div className="variations-grid">
            {[
              { title: 'Penempatan Sensor', desc: 'Minimalisasi jumlah sensor untuk coverage maksimal' },
              { title: 'Identifikasi Lokasi', desc: 'Setiap titik teridentifikasi unik berdasarkan jarak' },
              { title: 'Monitoring Network', desc: 'Deteksi dan perbaikan node yang rusak' },
              { title: 'Energy Efficiency', desc: 'Optimasi konsumsi energi dengan sensor minimal' }
            ].map((sensor, idx) => (
              <div className="variation" key={idx}>
                <h3>{sensor.title}</h3>
                <p>{sensor.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Analisis Jaringan Sosial</h3>
          <div className="applications-grid">
            {[
              { icon: faUserShield, title: 'Identifikasi Influencer', desc: 'Menemukan node kunci untuk penyebaran informasi' },
              { icon: faNetworkWired, title: 'Community Detection', desc: 'Mengidentifikasi komunitas dalam jaringan' },
              { icon: faChartLine, title: 'Viral Marketing', desc: 'Strategi pemasaran dengan jangkauan optimal' },
              { icon: faShieldAlt, title: 'Network Security', desc: 'Identifikasi titik kritis untuk keamanan' }
            ].map((social, idx) => (
              <div className="application-item" key={idx}>
                <FontAwesomeIcon icon={social.icon} className="app-icon" />
                <h4>{social.title}</h4>
                <p>{social.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="sub-section-title">Optimasi Jaringan Komputer</h3>
          <div className="definition-box">
            <p><strong>Router Placement:</strong> Penempatan router optimal untuk coverage dan identifikasi</p>
            <p><strong>Fault Detection:</strong> Deteksi lokasi kerusakan dalam jaringan</p>
            <p><strong>Load Balancing:</strong> Distribusi beban dengan titik kontrol minimal</p>
            <p><strong>Network Topology:</strong> Desain topologi jaringan yang efisien</p>
          </div>
        </SectionWrapper>
       

      </div>
    </div>
  );
};

export default Materi;