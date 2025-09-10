// src/pages/Latihan.jsx
import React, { useState } from 'react';
import '../pages/assets/latihan.css'
import Navbar from '../../components/navbar.jsx';
import '../../src/App.css'


const Latihan = () => {
  
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [animateScore, setAnimateScore] = useState(false);

  // soal 
  const questionPackages = {
    1: {
      title: "Paket 1: Dasar Graph Matrix",
      icon: "📊",
      description: "Pelajari konsep dasar adjacency matrix, incidence matrix, dan operasi dasar",
      difficulty: "Beginner",
      questions: [
        {
          question: "Dalam adjacency matrix, apa arti dari nilai 1 pada posisi (i,j)?",
          options: [
            "Tidak ada edge antara vertex i dan j",
            "Ada edge antara vertex i dan j",
            "Vertex i dan j adalah vertex yang sama",
            "Terdapat loop pada vertex i"
          ],
          correct: 1
        },
        {
          question: "Berapa jumlah edge dalam graf jika adjacency matrix berukuran 4×4 memiliki 6 nilai 1?",
          options: ["6", "3", "12", "Tidak dapat ditentukan"],
          correct: 1,
          explanation: "Untuk graf tak berarah, setiap edge dihitung 2 kali dalam adjacency matrix, jadi 6/2 = 3 edge"
        },
        {
          question: "Adjacency matrix untuk graf tak berarah memiliki sifat:",
          options: [
            "Asimetris",
            "Simetris",
            "Diagonal utama selalu 0",
            "B dan C benar"
          ],
          correct: 3
        },
        {
          question: "Jika graf memiliki 5 vertex dan adjacency matrix memiliki trace = 2, berapa jumlah loop?",
          options: ["2", "1", "5", "0"],
          correct: 0,
          explanation: "Trace adalah jumlah diagonal utama, yang menunjukkan jumlah loop"
        },
        {
          question: "Incidence matrix memiliki dimensi:",
          options: [
            "n × n (n = jumlah vertex)",
            "m × m (m = jumlah edge)",
            "n × m (n = vertex, m = edge)",
            "Selalu square matrix"
          ],
          correct: 2
        },
        {
          question: "Dalam incidence matrix, jumlah nilai 1 pada setiap kolom adalah:",
          options: ["1", "2", "Tergantung degree vertex", "Tidak tetap"],
          correct: 1,
          explanation: "Setiap edge menghubungkan tepat 2 vertex"
        },
        {
          question: "Path matrix P^k menunjukkan:",
          options: [
            "Jumlah path dengan panjang tepat k",
            "Jumlah path dengan panjang maksimal k",
            "Shortest path antara dua vertex",
            "Semua path yang mungkin"
          ],
          correct: 0
        },
        {
          question: "Jika A adalah adjacency matrix, maka A² memberikan informasi tentang:",
          options: [
            "Path dengan panjang 1",
            "Path dengan panjang 2",
            "Jumlah total path",
            "Degree setiap vertex"
          ],
          correct: 1
        },
        {
          question: "Degree matrix D memiliki nilai non-zero hanya pada:",
          options: [
            "Diagonal utama",
            "Baris pertama",
            "Kolom pertama",
            "Semua posisi"
          ],
          correct: 0
        },
        {
          question: "Laplacian matrix L dihitung dengan rumus:",
          options: [
            "L = A + D",
            "L = D - A",
            "L = A - D",
            "L = D × A"
          ],
          correct: 1,
          explanation: "L = D - A, dimana D adalah degree matrix dan A adalah adjacency matrix"
        }
      ]
    },
    2: {
      title: "Paket 2: Aplikasi Graph Matrix",
      icon: "🔬",
      description: "Eksplorasi aplikasi lanjutan matrix dalam analisis graf dan spectral theory",
      difficulty: "Intermediate",
      questions: [
        {
          question: "Untuk menentukan apakah graf terhubung, kita dapat menggunakan:",
          options: [
            "Adjacency matrix saja",
            "Powers of adjacency matrix",
            "Incidence matrix saja",
            "Degree matrix saja"
          ],
          correct: 1
        },
        {
          question: "Eigenvalue terbesar dari adjacency matrix disebut:",
          options: [
            "Spectral radius",
            "Chromatic number",
            "Independence number",
            "Domination number"
          ],
          correct: 0
        },
        {
          question: "Jika adjacency matrix A memiliki rank r, maka graf memiliki maksimal:",
          options: [
            "r vertex",
            "r edge",
            "r komponen terhubung",
            "Tidak ada hubungan"
          ],
          correct: 2
        },
        {
          question: "Untuk graf bipartit, adjacency matrix dapat ditulis dalam bentuk:",
          options: [
            "Block diagonal",
            "Upper triangular",
            "[[0, B], [B^T, 0]]",
            "Lower triangular"
          ],
          correct: 2
        },
        {
          question: "Jumlah triangles dalam graf dapat dihitung dengan:",
          options: [
            "trace(A)",
            "trace(A²)",
            "trace(A³)/6",
            "trace(A³)/3"
          ],
          correct: 2,
          explanation: "trace(A³) menghitung closed walks panjang 3, dibagi 6 karena setiap triangle dihitung 6 kali"
        },
        {
          question: "Multiplicity eigenvalue 0 pada Laplacian matrix menunjukkan:",
          options: [
            "Jumlah vertex",
            "Jumlah edge",
            "Jumlah komponen terhubung",
            "Chromatic number"
          ],
          correct: 2
        },
        {
          question: "Adjacency matrix graf regular memiliki ciri:",
          options: [
            "Semua baris memiliki jumlah yang sama",
            "Simetris",
            "Eigenvalue terbesar = degree",
            "Semua benar"
          ],
          correct: 3
        },
        {
          question: "Untuk graf dengan n vertex, adjacency matrix berukuran n×n memiliki maksimal berapa nilai 1?",
          options: [
            "n",
            "n²",
            "n(n-1)",
            "n(n-1)/2"
          ],
          correct: 2,
          explanation: "Maksimal n(n-1) untuk graf berarah tanpa loop, atau n(n-1)/2 untuk graf tak berarah"
        },
        {
          question: "Permanent dari adjacency matrix berkaitan dengan:",
          options: [
            "Jumlah perfect matchings",
            "Jumlah Hamiltonian cycles",
            "Jumlah spanning trees",
            "Chromatic polynomial"
          ],
          correct: 0
        },
        {
          question: "Matrix-tree theorem menggunakan:",
          options: [
            "Adjacency matrix",
            "Incidence matrix",
            "Laplacian matrix",
            "Degree matrix"
          ],
          correct: 2
        }
      ]
    },
    3: {
      title: "Paket 3: Dasar Bilangan Dominasi",
      icon: "🎯",
      description: "Menguasai konsep dominating set dan berbagai jenis dominasi dalam graf",
      difficulty: "Intermediate",
      questions: [
        {
          question: "Bilangan dominasi γ(G) didefinisikan sebagai:",
          options: [
            "Ukuran minimum dominating set",
            "Ukuran maksimum dominating set",
            "Jumlah semua dominating set",
            "Degree maksimum dalam graf"
          ],
          correct: 0
        },
        {
          question: "Suatu himpunan S ⊆ V(G) disebut dominating set jika:",
          options: [
            "Setiap vertex dalam S bertetangga",
            "Setiap vertex di luar S bertetangga dengan minimal satu vertex di S",
            "S membentuk clique",
            "S adalah independent set"
          ],
          correct: 1
        },
        {
          question: "Untuk graf path P_n, bilangan dominasi γ(P_n) = :",
          options: [
            "⌊n/2⌋",
            "⌈n/2⌉",
            "⌊n/3⌋",
            "⌈n/3⌉"
          ],
          correct: 3,
          explanation: "Untuk path, strategi optimal adalah memilih setiap vertex ketiga"
        },
        {
          question: "Bilangan dominasi untuk graf complete K_n adalah:",
          options: [
            "1",
            "2",
            "n-1",
            "n"
          ],
          correct: 0,
          explanation: "Satu vertex dapat mendominasi semua vertex lainnya dalam graf complete"
        },
        {
          question: "Untuk graf cycle C_n, γ(C_n) = :",
          options: [
            "⌊n/2⌋",
            "⌈n/2⌉",
            "⌊n/3⌋",
            "⌈n/3⌉"
          ],
          correct: 3
        },
        {
          question: "Minimal dominating set yang juga merupakan independent set disebut:",
          options: [
            "Perfect dominating set",
            "Independent dominating set",
            "Connected dominating set",
            "Total dominating set"
          ],
          correct: 1
        },
        {
          question: "Total dominating set mensyaratkan bahwa:",
          options: [
            "Setiap vertex mendominasi dirinya sendiri",
            "Tidak ada vertex yang mendominasi dirinya sendiri",
            "Himpunan dominasi terhubung",
            "Himpunan dominasi maksimal"
          ],
          correct: 1,
          explanation: "Dalam total domination, setiap vertex harus didominasi oleh vertex lain"
        },
        {
          question: "Untuk graf star S_n (n ≥ 2), γ(S_n) = :",
          options: [
            "1",
            "2",
            "n-1",
            "n"
          ],
          correct: 0,
          explanation: "Vertex pusat dapat mendominasi semua vertex lainnya"
        },
        {
          question: "Connected dominating set adalah dominating set yang:",
          options: [
            "Berisi semua vertex dengan degree maksimum",
            "Membentuk subgraf terhubung",
            "Tidak memiliki dua vertex bertetangga",
            "Memiliki ukuran minimal"
          ],
          correct: 1
        },
        {
          question: "Hubungan antara bilangan dominasi γ(G) dan independence number α(G):",
          options: [
            "γ(G) = α(G)",
            "γ(G) ≤ α(G)",
            "γ(G) ≥ α(G)",
            "Tidak ada hubungan pasti"
          ],
          correct: 3,
          explanation: "Hubungan bergantung pada struktur graf spesifik"
        }
      ]
    },
    4: {
      title: "Paket 4: Aplikasi dan Variasi Bilangan Dominasi",
      icon: "🚀",
      description: "Topik lanjutan tentang variasi dominasi dan aplikasi dalam dunia nyata",
      difficulty: "Advanced",
      questions: [
        {
          question: "k-dominating set adalah himpunan vertex dimana setiap vertex di luar himpunan bertetangga dengan minimal:",
          options: [
            "1 vertex dalam himpunan",
            "k vertex dalam himpunan",
            "k vertex di luar himpunan",
            "degree k"
          ],
          correct: 1
        },
        {
          question: "Domatic number d(G) adalah:",
          options: [
            "Ukuran minimum dominating set",
            "Maksimum jumlah disjoint dominating sets",
            "Jumlah total dominating sets",
            "Rata-rata ukuran dominating sets"
          ],
          correct: 1
        },
        {
          question: "Untuk graf dengan minimum degree δ, domatic number memenuhi:",
          options: [
            "d(G) ≤ δ",
            "d(G) ≤ δ + 1",
            "d(G) = δ + 1",
            "d(G) ≥ δ + 1"
          ],
          correct: 1,
          explanation: "Domatic number tidak dapat melebihi minimum degree + 1"
        },
        {
          question: "Domination number untuk graf bipartit complete K_{m,n} adalah:",
          options: [
            "1",
            "2",
            "min(m,n)",
            "max(m,n)"
          ],
          correct: 1,
          explanation: "Perlu satu vertex dari setiap partisi untuk mendominasi semua vertex"
        },
        {
          question: "Locating-dominating set memiliki properti tambahan:",
          options: [
            "Setiap vertex memiliki neighbor unik dalam set",
            "Set membentuk clique",
            "Set terhubung",
            "Set independent"
          ],
          correct: 0
        },
        {
          question: "Untuk graf grid m×n, estimasi bilangan dominasi adalah sekitar:",
          options: [
            "mn/5",
            "mn/4",
            "mn/3",
            "mn/2"
          ],
          correct: 0,
          explanation: "Setiap vertex dapat mendominasi sekitar 5 vertex (termasuk dirinya)"
        },
        {
          question: "Restrained dominating set memiliki syarat bahwa:",
          options: [
            "Set berukuran minimal",
            "Komplemen set juga dominating",
            "Setiap vertex di luar set memiliki neighbor di luar set",
            "Set membentuk matching"
          ],
          correct: 2
        },
        {
          question: "Untuk graf wheel W_n (n ≥ 3), γ(W_n) = :",
          options: [
            "1",
            "2",
            "⌈n/3⌉",
            "⌈(n+2)/3⌉"
          ],
          correct: 0,
          explanation: "Vertex pusat dapat mendominasi semua vertex lainnya"
        },
        {
          question: "Roman dominating function f: V → {0,1,2} dengan syarat vertex bernilai 0 bertetangga dengan vertex bernilai:",
          options: [
            "1",
            "2",
            "1 atau 2",
            "Minimal 2 vertex bernilai 1"
          ],
          correct: 1
        },
        {
          question: "Kompleksitas komputasi untuk menentukan bilangan dominasi adalah:",
          options: [
            "P (polynomial time)",
            "NP-complete",
            "PSPACE-complete",
            "Undecidable"
          ],
          correct: 1,
          explanation: "Masalah domination termasuk dalam kelas NP-complete"
        }
      ]
    }
  };

  const difficultyColors = {
    "Beginner": "is-success",
    "Intermediate": "is-warning", 
    "Advanced": "is-danger"
  };

  const handlePackageSelect = (packageNum) => {
    setSelectedPackage(packageNum);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setAnimateScore(false);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateScore = () => {
    const questions = questionPackages[selectedPackage].questions;
    let correctAnswers = 0;
    
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setShowResults(true);
    setAnimateScore(true);
  };

  const resetQuiz = () => {
    setSelectedPackage(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setAnimateScore(false);
  };

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return { message: "🏆 Outstanding! Perfect mastery!", color: "is-success" };
    if (percentage >= 80) return { message: "🌟 Excellent work! Great understanding!", color: "is-success" };
    if (percentage >= 70) return { message: "👍 Good job! Solid foundation!", color: "is-info" };
    if (percentage >= 60) return { message: "📚 Keep studying! You're getting there!", color: "is-warning" };
    return { message: "💪 Don't give up! Practice makes perfect!", color: "is-danger" };
  };

  if (!selectedPackage) {
    return (
      <section className="latihan">
        <Navbar/>
        <div className="container">
          <br />
          
          {/* Hero Section */}
          <div className="hero is-primary is-medium has-text-centered mb-6">
            <div className="hero-body">
              <div className="container">
                <h1 className="title is-1 has-text-weight-bold">
                  🎓 Latihan Soal Graph Theory
                </h1>
                <p className="subtitle is-4">
                  Uji pemahaman Anda tentang konsep-konsep penting dalam teori graf
                </p>
                <div className="tags is-centered mt-4">
                  <span className="tag is-light is-large">4 Paket Soal</span>
                  <span className="tag is-light is-large">40 Soal Total</span>
                  <span className="tag is-light is-large">Penjelasan Lengkap</span>
                </div>
              </div>
            </div>
          </div>

          {/* Package Selection Cards */}
          <div className="columns is-multiline is-variable is-5">
            {Object.keys(questionPackages).map(packageNum => {
              const pkg = questionPackages[packageNum];
              const isHovered = hoveredPackage === packageNum;
              
              return (
                <div key={packageNum} className="column is-half">
                  <div 
                    className={`card ${isHovered ? 'has-shadow' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('Card clicked, package:', packageNum);
                      handlePackageSelect(parseInt(packageNum));
                    }}
                    onMouseEnter={() => setHoveredPackage(packageNum)}
                    onMouseLeave={() => setHoveredPackage(null)}
                    style={{ 
                      height: '100%', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s ease',
                      transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      zIndex: isHovered ? 10 : 1,
                      position: 'relative'
                    }}
                  >
                    <div className="card-content has-background-primary-light" style={{ height: '100%' }}>
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">
                            <div className="has-text-centered" style={{ fontSize: '2rem', lineHeight: '48px' }}>
                              {pkg.icon}
                            </div>
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-5 has-text-weight-bold">{pkg.title}</p>
                          <div className="tags">
                            <span className={`tag ${difficultyColors[pkg.difficulty]}`}>
                              {pkg.difficulty}
                            </span>
                            <span className="tag is-primary">10 Soal</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="content">
                        <p className="has-text-grey-dark">{pkg.description}</p>
                        
                        <div className="level is-mobile mt-4">
                          <div className="level-left">
                            <div className="level-item has-text-centered">
                              <div>
                                <p className="heading">Durasi</p>
                                <p className="title is-6">~15 min</p>
                              </div>
                            </div>
                          </div>
                          <div className="level-right">
                            <div className="level-item">
                              <button 
                                className="button is-primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Button clicked, package:', packageNum);
                                  handlePackageSelect(parseInt(packageNum));
                                }}
                                style={{ borderRadius: '20px' }}
                              >
                                <span className="mr-2">▶️</span>
                                <span>Mulai</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Info Section */}
          <div className="section">
            <div className="container">
              <h2 className="title is-3 has-text-centered mb-6">📋 Materi yang Dibahas</h2>
              <div className="columns is-variable is-6">
                <div className="column">
                  <div className="box has-background-info-light">
                    <h3 className="title is-4 has-text-info">
                      <span className="icon-text">
                        <span className="icon">📊</span>
                        <span>Graph Matrix</span>
                      </span>
                    </h3>
                    <div className="content">
                      <div className="tags">
                        <span className="tag is-info is-light">Adjacency Matrix</span>
                        <span className="tag is-info is-light">Incidence Matrix</span>
                        <span className="tag is-info is-light">Laplacian Matrix</span>
                        <span className="tag is-info is-light">Path Matrix</span>
                        <span className="tag is-info is-light">Spectral Theory</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="box has-background-warning-light">
                    <h3 className="title is-4 has-text-warning-dark">
                      <span className="icon-text">
                        <span className="icon">🎯</span>
                        <span>Bilangan Dominasi</span>
                      </span>
                    </h3>
                    <div className="content">
                      <div className="tags">
                        <span className="tag is-warning is-light">Dominating Set</span>
                        <span className="tag is-warning is-light">Connected Domination</span>
                        <span className="tag is-warning is-light">Total Domination</span>
                        <span className="tag is-warning is-light">Independent Domination</span>
                        <span className="tag is-warning is-light">Aplikasi Lanjutan</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentPackage = questionPackages[selectedPackage];
  const questions = currentPackage.questions;

  if (showResults) {
    const scoreInfo = getScoreMessage(score, questions.length);
    const percentage = Math.round((score/questions.length) * 100);
    
    return (
      <section className="section">
        <div className="container">
          {/* Back Button */}
          <div className="mb-4">
            <button 
              className="button is-light"
              onClick={resetQuiz}
              style={{
                borderRadius: '25px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid #dbdbdb',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.borderColor = '#b5b5b5';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#dbdbdb';
              }}
            >
              <span style={{ fontSize: '14px' }}>←</span>
              <span>Kembali</span>
            </button>
          </div>

          {/* Results Header */}
          <div className="hero is-light mb-6">
            <div className="hero-body has-text-centered">
              <div className="container">
                <h1 className="title is-2">🎊 Hasil {currentPackage.title}</h1>
                <div className={`box has-background-primary-light ${animateScore ? 'animate__animated animate__bounceIn' : ''}`}>
                  <div className="level">
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Skor Anda</p>
                        <p className="title is-1 has-text-primary" style={{ 
                          fontSize: '4rem',
                          animation: animateScore ? 'pulse 2s infinite' : 'none'
                        }}>
                          {score}/{questions.length}
                        </p>
                      </div>
                    </div>
                    <div className="level-item has-text-centered">
                      <div>
                        <p className="heading">Persentase</p>
                        <p className="title is-1" style={{ fontSize: '3rem' }}>
                          {percentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tags is-centered is-large mt-4">
                    <span className={`tag is-large ${scoreInfo.color}`}>
                      {scoreInfo.message}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <progress 
                    className={`progress ${scoreInfo.color} is-large mt-4`}
                    value={percentage} 
                    max="100"
                    style={{ height: '1.5rem' }}
                  >
                    {percentage}%
                  </progress>
                </div>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="section">
            <div className="container">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <h2 className="title is-3">📝 Review Jawaban</h2>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <div className="field is-grouped">
                      <div className="control">
                        <div className="tags has-addons">
                          <span className="tag">Benar</span>
                          <span className="tag is-success">{score}</span>
                        </div>
                      </div>
                      <div className="control">
                        <div className="tags has-addons">
                          <span className="tag">Salah</span>
                          <span className="tag is-danger">{questions.length - score}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns is-multiline">
                {questions.map((question, index) => {
                  const userAnswer = userAnswers[index];
                  const isCorrect = userAnswer === question.correct;
                  
                  return (
                    <div key={index} className="column is-full">
                      <div className={`card ${isCorrect ? 'has-background-success-light' : 'has-background-danger-light'}`}>
                        <div className="card-header">
                          <div className="card-header-title">
                            <span className="mr-3" style={{ fontSize: '1.2rem' }}>
                              {isCorrect ? '✅' : '❌'}
                            </span>
                            <span className="has-text-weight-bold">
                              Soal {index + 1}
                            </span>
                          </div>
                          <div className="card-header-icon">
                            <span className={`tag ${isCorrect ? 'is-success' : 'is-danger'}`}>
                              {isCorrect ? 'Benar' : 'Salah'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="card-content">
                          <div className="content">
                            <h4 className="subtitle is-5 has-text-weight-semibold">
                              {question.question}
                            </h4>
                            
                            <div className="columns">
                              <div className="column is-half">
                                <div className="box">
                                  <p className="has-text-weight-semibold mb-2">
                                    <span className="mr-2">👤</span>
                                    <span>Jawaban Anda:</span>
                                  </p>
                                  <p className={`has-text-${isCorrect ? 'success' : 'danger'} has-text-weight-semibold`}>
                                    {userAnswer !== undefined ? 
                                      `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}` : 
                                      'Tidak dijawab'
                                    }
                                  </p>
                                </div>
                              </div>
                              <div className="column is-half">
                                <div className="box has-background-success-light">
                                  <p className="has-text-weight-semibold mb-2">
                                    <span className="mr-2">✅</span>
                                    <span>Jawaban Benar:</span>
                                  </p>
                                  <p className="has-text-success has-text-weight-semibold">
                                    {String.fromCharCode(65 + question.correct)}. {question.options[question.correct]}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {question.explanation && (
                              <div className="box has-background-info-light mt-4">
                                <p className="has-text-weight-semibold mb-2">
                                  <span className="mr-2">💡</span>
                                  <span>Penjelasan:</span>
                                </p>
                                <p className="has-text-info-dark">{question.explanation}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="has-text-centered mt-6">
                <div className="field is-grouped is-grouped-centered">
                  <div className="control">
                    <button 
                      className="button is-primary is-large"
                      onClick={resetQuiz}
                      style={{ borderRadius: '25px', minWidth: '200px' }}
                    >
                      <span className="mr-2">📋</span>
                      <span>Pilih Paket Lain</span>
                    </button>
                  </div>
                  <div className="control">
                    <button 
                      className="button is-light is-large"
                      onClick={() => handlePackageSelect(selectedPackage)}
                      style={{ borderRadius: '25px', minWidth: '200px' }}
                    >
                      <span className="mr-2">🔄</span>
                      <span>Ulangi Paket Ini</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        {/* Back Button - Fixed positioning and styling */}
        <div className="mb-4">
          <button 
            className="button is-light"
            onClick={resetQuiz}
            style={{
              borderRadius: '25px',
              padding: '10px 20px',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '1px solid #dbdbdb',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f5f5f5';
              e.target.style.borderColor = '#b5b5b5';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#dbdbdb';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>←</span>
            <span style={{ fontWeight: '500' }}>Kembali</span>
          </button>
        </div>

        {/* Quiz Header */}
        <div className="hero is-primary mb-6" style={{ borderRadius: '12px' }}>
          <div className="hero-body">
            <div className="container">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <div>
                      <h1 className="title has-text-white is-size-3">
                        <span className="mr-3" style={{ fontSize: '2rem' }}>
                          {currentPackage.icon}
                        </span>
                        {currentPackage.title}
                      </h1>
                      <p className="subtitle has-text-white-ter is-size-5">
                        {currentPackage.description}
                      </p>
                      <div className="tags mt-3">
                        <span className={`tag ${difficultyColors[currentPackage.difficulty]} is-medium`}>
                          {currentPackage.difficulty}
                        </span>
                        <span className="tag is-light is-medium">
                          {questions.length} Soal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="box mb-6">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div>
                  <p className="heading">Progress</p>
                  <p className="title is-4">
                    {Object.keys(userAnswers).length}/{questions.length} Soal Terjawab
                  </p>
                </div>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="tags">
                  <span className="tag is-info is-large">
                    {Math.round((Object.keys(userAnswers).length / questions.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <progress 
            className="progress is-primary is-large" 
            value={Object.keys(userAnswers).length} 
            max={questions.length}
            style={{ height: '1.2rem' }}
          >
            {Object.keys(userAnswers).length}/{questions.length}
          </progress>
        </div>

        {/* Questions Grid */}
        <div className="columns is-multiline is-variable is-4">
          {questions.map((question, index) => {
            const isAnswered = userAnswers.hasOwnProperty(index);
            
            return (
              <div key={index} className="column is-full">
                <div className={`card ${isAnswered ? 'has-background-success-light' : 'has-background-white-ter'}`}
                     style={{ 
                       transition: 'all 0.3s ease',
                       border: isAnswered ? '2px solid #48c78e' : '2px solid transparent',
                       borderRadius: '12px'
                     }}>
                  <div className="card-header">
                    <div className="card-header-title">
                      <span className="mr-3" style={{ fontSize: '1.2rem' }}>
                        {isAnswered ? '✅' : '❓'}
                      </span>
                      <span className="has-text-weight-bold">
                        Soal {index + 1}
                      </span>
                    </div>
                    <div className="card-header-icon">
                      <span className={`tag ${isAnswered ? 'is-success' : 'is-light'}`}>
                        {isAnswered ? 'Terjawab' : 'Belum'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <div className="content">
                      <h3 className="subtitle is-5 has-text-weight-semibold mb-4">
                        {question.question}
                      </h3>
                      
                      <div className="field">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = userAnswers[index] === optionIndex;
                          
                          return (
                            <div key={optionIndex} className="control mb-3">
                              <label 
                                className={`radio is-flex is-align-items-center p-3 ${isSelected ? 'has-background-primary-light' : 'has-background-white'}`}
                                style={{ 
                                  borderRadius: '8px',
                                  border: isSelected ? '2px solid #3273dc' : '2px solid #e5e5e5',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) {
                                    e.target.style.backgroundColor = '#f5f5f5';
                                    e.target.style.borderColor = '#b5b5b5';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) {
                                    e.target.style.backgroundColor = '#ffffff';
                                    e.target.style.borderColor = '#e5e5e5';
                                  }
                                }}
                              >
                                <input
                                  type="radio"
                                  name={`question-${index}`}
                                  value={optionIndex}
                                  checked={isSelected}
                                  onChange={() => handleAnswerSelect(index, optionIndex)}
                                  className="mr-3"
                                />
                                <span className={`tag is-rounded mr-3 ${isSelected ? 'is-primary' : 'is-light'}`}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </span>
                                <span className={isSelected ? 'has-text-weight-semibold' : ''}>
                                  {option}
                                </span>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Section */}
        <div className="section has-background-light mt-6" style={{ borderRadius: '12px' }}>
          <div className="container">
            <div className="has-text-centered">
              <div className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    <div className="field is-grouped">
                      <div className="control">
                        <div className="tags has-addons">
                          <span className="tag is-medium">Terjawab</span>
                          <span className="tag is-success is-medium">
                            {Object.keys(userAnswers).length}
                          </span>
                        </div>
                      </div>
                      <div className="control">
                        <div className="tags has-addons">
                          <span className="tag is-medium">Sisa</span>
                          <span className="tag is-warning is-medium">
                            {questions.length - Object.keys(userAnswers).length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    {Object.keys(userAnswers).length === questions.length ? (
                      <button 
                        className="button is-primary is-large" 
                        onClick={calculateScore}
                        style={{ 
                          borderRadius: '25px',
                          minWidth: '200px'
                        }}
                      >
                        <span className="mr-2">✅</span>
                        <span>Lihat Hasil</span>
                      </button>
                    ) : (
                      <div>
                        <p className="has-text-grey mb-2">
                          Jawab semua soal untuk melihat hasil
                        </p>
                        <button 
                          className="button is-light is-large" 
                          disabled
                          style={{ 
                            borderRadius: '25px',
                            minWidth: '200px'
                          }}
                        >
                          <span className="mr-2">🔒</span>
                          <span>Lihat Hasil</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Latihan;