import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRedo, faTasks, faCheckCircle, faTimesCircle, faLightbulb, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import styles from './assets/latihan.module.css';
import Navbar from '../../components/navbar.module.jsx';
import '../../src/App.css';

const Latihan = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const questionPackages = {
        1: {
          title: "Paket 1: Dasar Graph Matrix",
          icon: "📊",
          difficulty: "Beginner",
          questions: [
            { question: "Dalam adjacency matrix, apa arti dari nilai 1 pada posisi (i,j)?", options: ["Tidak ada edge antara vertex i dan j", "Ada edge antara vertex i dan j", "Vertex i dan j adalah vertex yang sama", "Terdapat loop pada vertex i"], correct: 1 },
            { question: "Berapa jumlah edge dalam graf jika adjacency matrix berukuran 4×4 memiliki 6 nilai 1?", options: ["6", "3", "12", "Tidak dapat ditentukan"], correct: 1, explanation: "Untuk graf tak berarah, setiap edge dihitung 2 kali dalam adjacency matrix, jadi 6/2 = 3 edge." },
            { question: "Adjacency matrix untuk graf tak berarah memiliki sifat:", options: ["Asimetris", "Simetris", "Diagonal utama selalu 0", "B dan C benar"], correct: 3 },
            { question: "Jika graf memiliki 5 vertex dan adjacency matrix memiliki trace = 2, berapa jumlah loop?", options: ["2", "1", "5", "0"], correct: 0, explanation: "Trace adalah jumlah diagonal utama, yang menunjukkan jumlah loop." },
            { question: "Incidence matrix memiliki dimensi:", options: ["n × n (n = jumlah vertex)", "m × m (m = jumlah edge)", "n × m (n = vertex, m = edge)", "Selalu square matrix"], correct: 2 },
            { question: "Dalam incidence matrix, jumlah nilai 1 pada setiap kolom adalah:", options: ["1", "2", "Tergantung degree vertex", "Tidak tetap"], correct: 1, explanation: "Setiap edge menghubungkan tepat 2 vertex." },
            { question: "Path matrix P^k menunjukkan:", options: ["Jumlah path dengan panjang tepat k", "Jumlah path dengan panjang maksimal k", "Shortest path antara dua vertex", "Semua path yang mungkin"], correct: 0 },
            { question: "Jika A adalah adjacency matrix, maka A² memberikan informasi tentang:", options: ["Path dengan panjang 1", "Path dengan panjang 2", "Jumlah total path", "Degree setiap vertex"], correct: 1 },
            { question: "Degree matrix D memiliki nilai non-zero hanya pada:", options: ["Diagonal utama", "Baris pertama", "Kolom pertama", "Semua posisi"], correct: 0 },
            { question: "Laplacian matrix L dihitung dengan rumus:", options: ["L = A + D", "L = D - A", "L = A - D", "L = D × A"], correct: 1, explanation: "L = D - A, dimana D adalah degree matrix dan A adalah adjacency matrix." }
          ]
        },
        2: {
            title: "Paket 2: Aplikasi Graph Matrix",
            icon: "🔬",
            difficulty: "Intermediate",
            questions: [
                { question: "Untuk menentukan apakah graf terhubung, kita dapat menggunakan:", options: ["Adjacency matrix saja", "Powers of adjacency matrix", "Incidence matrix saja", "Degree matrix saja"], correct: 1 },
                { question: "Eigenvalue terbesar dari adjacency matrix disebut:", options: ["Spectral radius", "Chromatic number", "Independence number", "Domination number"], correct: 0 },
                { question: "Jika adjacency matrix A memiliki rank r, maka graf memiliki maksimal:", options: ["r vertex", "r edge", "r komponen terhubung", "Tidak ada hubungan"], correct: 2 },
                { question: "Untuk graf bipartit, adjacency matrix dapat ditulis dalam bentuk:", options: ["Block diagonal", "Upper triangular", "[[0, B], [B^T, 0]]", "Lower triangular"], correct: 2 },
                { question: "Jumlah triangles dalam graf dapat dihitung dengan:", options: ["trace(A)", "trace(A²)", "trace(A³)/6", "trace(A³)/3"], correct: 2, explanation: "trace(A³) menghitung closed walks panjang 3, dibagi 6 karena setiap triangle dihitung 6 kali." },
                { question: "Multiplicity eigenvalue 0 pada Laplacian matrix menunjukkan:", options: ["Jumlah vertex", "Jumlah edge", "Jumlah komponen terhubung", "Chromatic number"], correct: 2 },
                { question: "Adjacency matrix graf regular memiliki ciri:", options: ["Semua baris memiliki jumlah yang sama", "Simetris", "Eigenvalue terbesar = degree", "Semua benar"], correct: 3 },
                { question: "Untuk graf dengan n vertex, adjacency matrix berukuran n×n memiliki maksimal berapa nilai 1?", options: ["n", "n²", "n(n-1)", "n(n-1)/2"], correct: 2, explanation: "Maksimal n(n-1) untuk graf berarah tanpa loop, atau n(n-1)/2 untuk graf tak berarah." },
                { question: "Permanent dari adjacency matrix berkaitan dengan:", options: ["Jumlah perfect matchings", "Jumlah Hamiltonian cycles", "Jumlah spanning trees", "Chromatic polynomial"], correct: 0 },
                { question: "Matrix-tree theorem menggunakan:", options: ["Adjacency matrix", "Incidence matrix", "Laplacian matrix", "Degree matrix"], correct: 2 }
            ]
        },
        3: {
            title: "Paket 3: Dasar Bilangan Dominasi",
            icon: "🎯",
            difficulty: "Intermediate",
            questions: [
                { question: "Bilangan dominasi γ(G) didefinisikan sebagai:", options: ["Ukuran minimum dominating set", "Ukuran maksimum dominating set", "Jumlah semua dominating set", "Degree maksimum dalam graf"], correct: 0 },
                { question: "Suatu himpunan S ⊆ V(G) disebut dominating set jika:", options: ["Setiap vertex dalam S bertetangga", "Setiap vertex di luar S bertetangga dengan minimal satu vertex di S", "S membentuk clique", "S adalah independent set"], correct: 1 },
                { question: "Untuk graf path P_n, bilangan dominasi γ(P_n) = :", options: ["⌊n/2⌋", "⌈n/2⌉", "⌊n/3⌋", "⌈n/3⌉"], correct: 3, explanation: "Untuk path, strategi optimal adalah memilih setiap vertex ketiga." },
                { question: "Bilangan dominasi untuk graf complete K_n adalah:", options: ["1", "2", "n-1", "n"], correct: 0, explanation: "Satu vertex dapat mendominasi semua vertex lainnya dalam graf complete." },
                { question: "Untuk graf cycle C_n, γ(C_n) = :", options: ["⌊n/2⌋", "⌈n/2⌉", "⌊n/3⌋", "⌈n/3⌉"], correct: 3 },
                { question: "Minimal dominating set yang juga merupakan independent set disebut:", options: ["Perfect dominating set", "Independent dominating set", "Connected dominating set", "Total dominating set"], correct: 1 },
                { question: "Total dominating set mensyaratkan bahwa:", options: ["Setiap vertex mendominasi dirinya sendiri", "Tidak ada vertex yang mendominasi dirinya sendiri", "Himpunan dominasi terhubung", "Himpunan dominasi maksimal"], correct: 1, explanation: "Dalam total domination, setiap vertex harus didominasi oleh vertex lain." },
                { question: "Untuk graf star S_n (n ≥ 2), γ(S_n) = :", options: ["1", "2", "n-1", "n"], correct: 0, explanation: "Vertex pusat dapat mendominasi semua vertex lainnya." },
                { question: "Connected dominating set adalah dominating set yang:", options: ["Berisi semua vertex dengan degree maksimum", "Membentuk subgraf terhubung", "Tidak memiliki dua vertex bertetangga", "Memiliki ukuran minimal"], correct: 1 },
                { question: "Hubungan antara bilangan dominasi γ(G) dan independence number α(G):", options: ["γ(G) = α(G)", "γ(G) ≤ α(G)", "γ(G) ≥ α(G)", "Tidak ada hubungan pasti"], correct: 3, explanation: "Hubungan bergantung pada struktur graf spesifik." }
            ]
        },
        4: {
            title: "Paket 4: Aplikasi dan Variasi Bilangan Dominasi",
            icon: "🚀",
            difficulty: "Advanced",
            questions: [
                { question: "k-dominating set adalah himpunan vertex dimana setiap vertex di luar himpunan bertetangga dengan minimal:", options: ["1 vertex dalam himpunan", "k vertex dalam himpunan", "k vertex di luar himpunan", "degree k"], correct: 1 },
                { question: "Domatic number d(G) adalah:", options: ["Ukuran minimum dominating set", "Maksimum jumlah disjoint dominating sets", "Jumlah total dominating sets", "Rata-rata ukuran dominating sets"], correct: 1 },
                { question: "Untuk graf dengan minimum degree δ, domatic number memenuhi:", options: ["d(G) ≤ δ", "d(G) ≤ δ + 1", "d(G) = δ + 1", "d(G) ≥ δ + 1"], correct: 1, explanation: "Domatic number tidak dapat melebihi minimum degree + 1." },
                { question: "Domination number untuk graf bipartit complete K_{m,n} adalah:", options: ["1", "2", "min(m,n)", "max(m,n)"], correct: 1, explanation: "Perlu satu vertex dari setiap partisi untuk mendominasi semua vertex." },
                { question: "Locating-dominating set memiliki properti tambahan:", options: ["Setiap vertex memiliki neighbor unik dalam set", "Set membentuk clique", "Set terhubung", "Set independent"], correct: 0 },
                { question: "Untuk graf grid m×n, estimasi bilangan dominasi adalah sekitar:", options: ["mn/5", "mn/4", "mn/3", "mn/2"], correct: 0, explanation: "Setiap vertex dapat mendominasi sekitar 5 vertex (termasuk dirinya)." },
                { question: "Restrained dominating set memiliki syarat bahwa:", options: ["Set berukuran minimal", "Komplemen set juga dominating", "Setiap vertex di luar set memiliki neighbor di luar set", "Set membentuk matching"], correct: 2 },
                { question: "Untuk graf wheel W_n (n ≥ 3), γ(W_n) = :", options: ["1", "2", "⌈n/3⌉", "⌈(n+2)/3⌉"], correct: 0, explanation: "Vertex pusat dapat mendominasi semua vertex lainnya." },
                { question: "Roman dominating function f: V → {0,1,2} dengan syarat vertex bernilai 0 bertetangga dengan vertex bernilai:", options: ["1", "2", "1 atau 2", "Minimal 2 vertex bernilai 1"], correct: 1 },
                { question: "Kompleksitas komputasi untuk menentukan bilangan dominasi adalah:", options: ["P (polynomial time)", "NP-complete", "PSPACE-complete", "Undecidable"], correct: 1, explanation: "Masalah domination termasuk dalam kelas NP-complete." }
            ]
        }
    };

    const handlePackageSelect = (id) => { setSelectedPackage(id); setUserAnswers({}); setShowResults(false); setScore(0); };
    const handleAnswerSelect = (qIndex, oIndex) => { setUserAnswers(prev => ({ ...prev, [qIndex]: oIndex })); };
    const calculateScore = () => { const correct = Object.values(userAnswers).filter((answer, index) => answer === questionPackages[selectedPackage].questions[index].correct).length; setScore(correct); setShowResults(true); };
    const resetQuiz = () => setSelectedPackage(null);
    const getScoreMessage = (score, total) => { const p = (score / total) * 100; if (p >= 90) return { message: "Luar Biasa!", color: "var(--success-color)" }; if (p >= 70) return { message: "Kerja Bagus!", color: "var(--primary-color)" }; if (p >= 50) return { message: "Terus Belajar!", color: "var(--warning-color)" }; return { message: "Jangan Menyerah!", color: "var(--danger-color)" }; };

    const difficultyTags = {
        "Beginner": <span className={`${styles.tag} ${styles.isSuccess}`}>Beginner</span>,
        "Intermediate": <span className={`${styles.tag} ${styles.isWarning}`}>Intermediate</span>,
        "Advanced": <span className={`${styles.tag} ${styles.isDanger}`}>Advanced</span>
    };

    const renderPackageSelection = () => (
        <>
            <header className={styles.latihanHeader}>
                <h1 className={styles.title}>Pusat Latihan Teori Graf <FontAwesomeIcon icon={faGraduationCap} /></h1>
                <p className={styles.subtitle}>Pilih paket soal di bawah ini untuk menguji pemahaman Anda.</p>
            </header>
            <div className={styles.packageGrid}>
                {Object.entries(questionPackages).map(([id, pkg]) => (
                    <div key={id} className={styles.packageCard} onClick={() => handlePackageSelect(parseInt(id))}>
                        <div className={styles.packageCardHeader}>
                            <span className={styles.packageCardIcon}>{pkg.icon}</span>
                            <div>
                                <h2 className={styles.packageCardTitle}>{pkg.title}</h2>
                            </div>
                        </div>
                        <p className={styles.packageCardDescription}>{pkg.description}</p>
                        <div className={styles.packageCardMeta}>
                            {difficultyTags[pkg.difficulty]}
                            <span className={`${styles.tag} ${styles.isInfo}`}>{pkg.questions.length} Soal</span>
                            <button className={`${styles.btn} ${styles.btnPrimary}`} style={{marginLeft: 'auto'}}>Mulai</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    const renderQuiz = () => {
        const pkg = questionPackages[selectedPackage];
        const answeredCount = Object.keys(userAnswers).length;
        const progress = (answeredCount / pkg.questions.length) * 100;

        return (
            <>
                <button className={`${styles.btn} ${styles.btnSecondary}`} style={{marginBottom: '1.5rem'}} onClick={resetQuiz}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Kembali</span>
                </button>
                <div className={styles.quizHeader}>
                    <h1 className={styles.title}>{pkg.title}</h1>
                </div>
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressBarInner} style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {pkg.questions.map((q, qIndex) => (
                    <div className={styles.questionCard} key={qIndex}>
                        <h2 className={styles.questionTitle}>{qIndex + 1}. {q.question}</h2>
                        <div>
                            {q.options.map((opt, oIndex) => (
                                <label key={oIndex} className={`${styles.optionLabel} ${userAnswers[qIndex] === oIndex ? styles.selected : ''}`}>
                                    <input type="radio" name={`question-${qIndex}`} checked={userAnswers[qIndex] === oIndex} onChange={() => handleAnswerSelect(qIndex, oIndex)} />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <div className={styles.quizFooter}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} disabled={answeredCount < pkg.questions.length} onClick={calculateScore}>
                        Selesai & Lihat Hasil
                    </button>
                </div>
            </>
        );
    };

    const renderResults = () => {
        const pkg = questionPackages[selectedPackage];
        const percentage = Math.round((score / pkg.questions.length) * 100);
        const scoreInfo = getScoreMessage(score, pkg.questions.length);

        return (
            <div className={styles.resultsGrid}>
                <aside className={styles.resultsSummary}>
                    <h2 className={`${styles.title} is-5`}>Hasil Kuis</h2>
                    <div className={styles.scoreCircle} style={{ '--percentage': percentage, '--dynamic-color': scoreInfo.color }}>
                        <div className={styles.scoreCircleInner}>
                            <div className={styles.scorePercentage}>{percentage}%</div>
                            <div className={styles.scoreFraction}>{score} / {pkg.questions.length} Benar</div>
                        </div>
                    </div>
                    <p className={styles.scoreMessage} style={{ color: scoreInfo.color }}>{scoreInfo.message}</p>
                    <div className={styles.btnGroup}>
                        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={resetQuiz}>
                            <FontAwesomeIcon icon={faTasks} /><span>Pilih Paket Lain</span>
                        </button>
                        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => handlePackageSelect(selectedPackage)}>
                            <FontAwesomeIcon icon={faRedo} /><span>Ulangi</span>
                        </button>
                    </div>
                </aside>
                <main className={styles.reviewSection}>
                     <h2 className={styles.title}>Tinjau Jawaban</h2>
                    {pkg.questions.map((q, index) => {
                        const userAnswerIndex = userAnswers[index];
                        const isCorrect = userAnswerIndex === q.correct;
                        return (
                            <div key={index} className={`${styles.reviewItem} ${isCorrect ? styles.reviewItemCorrect : styles.reviewItemIncorrect}`}>
                                <p className={styles.reviewItemQuestion}>{index + 1}. {q.question}</p>
                                <p className={`${styles.reviewItemYourAnswer} ${!isCorrect ? styles.reviewItemYourAnswerIncorrect : ''}`}>
                                    <FontAwesomeIcon icon={isCorrect ? faCheckCircle : faTimesCircle} className={styles.reviewItemIcon}/>
                                    Anda: {userAnswerIndex !== undefined ? q.options[userAnswerIndex] : 'Tidak dijawab'}
                                </p>
                                {!isCorrect && (
                                    <p className={styles.reviewItemCorrectAnswer}>
                                       <FontAwesomeIcon icon={faCheckCircle} className={styles.reviewItemIcon}/>
                                       Benar: {q.options[q.correct]}
                                    </p>
                                )}
                                {q.explanation && (
                                    <div className={styles.reviewItemExplanation}>
                                        <FontAwesomeIcon icon={faLightbulb} className={styles.reviewItemIcon}/>
                                        {q.explanation}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </main>
            </div>
        );
    };

    return (
        <div className={styles.latihanContainer}>
            <Navbar />
            <main className={styles.latihanWrapper}>
                {!selectedPackage ? renderPackageSelection() : (showResults ? renderResults() : renderQuiz())}
            </main>
        </div>
    );
};

export default Latihan;