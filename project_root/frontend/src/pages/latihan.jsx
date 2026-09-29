import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faRedo, 
  faTasks, 
  faCheckCircle, 
  faTimesCircle, 
  faLightbulb, 
  faGraduationCap,
  faFire,
  faAward,
  faStar,
  faChevronRight,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import styles from './assets/latihan.module.css';
import Navbar from '../components/Navbar';

const Latihan = () => {
    // Current package state
    const [selectedPackage, setSelectedPackage] = useState(null);
    
    // Quiz progress states
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    
    // Score tracking states
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [xpPoints, setXpPoints] = useState(0);
    
    // End screen state
    const [showResults, setShowResults] = useState(false);

    const questionPackages = {
        1: {
          title: "Dasar Graph Matrix",
          icon: "📊",
          difficulty: "Beginner",
          description: "Pelajari cara merepresentasikan jaringan menggunakan baris dan kolom matriks.",
          questions: [
            { question: "Dalam adjacency matrix, apa arti dari nilai 1 pada posisi (i,j)?", options: ["Tidak ada edge antara vertex i dan j", "Ada edge antara vertex i dan j", "Vertex i dan j adalah vertex yang sama", "Terdapat loop pada vertex i"], correct: 1, explanation: "Nilai 1 pada posisi (i,j) dalam adjacency matrix melambangkan adanya keterhubungan langsung (sisi/edge) antara titik i dan titik j." },
            { question: "Berapa jumlah edge dalam graf jika adjacency matrix berukuran 4×4 memiliki 6 nilai 1?", options: ["6", "3", "12", "Tidak dapat ditentukan"], correct: 1, explanation: "Untuk graf sederhana tak berarah, setiap edge dihitung 2 kali (simetris di atas dan bawah diagonal utama) dalam adjacency matrix, sehingga 6/2 = 3 edge." },
            { question: "Adjacency matrix untuk graf tak berarah memiliki sifat:", options: ["Asimetris", "Simetris", "Diagonal utama selalu 0", "B dan C benar"], correct: 3, explanation: "Pada graf tak berarah, matriks ketetanggaan selalu simetris (A = A^T), dan jika tidak memiliki loop, diagonal utamanya bernilai 0." },
            { question: "Jika graf tak berarah memiliki adjacency matrix dengan trace = 2 (menggunakan konvensi derajat di mana tiap loop bernilai 2 pada diagonal), berapa jumlah loop pada graf tersebut?", options: ["2", "1", "5", "0"], correct: 1, explanation: "Trace adalah jumlahan elemen pada diagonal utama. Berdasarkan konvensi derajat pada graf tak berarah, setiap loop menyumbang nilai 2 pada diagonal utama agar jumlahan baris sama dengan derajat simpul. Dengan trace = 2, terdapat 2/2 = 1 loop." },
            { question: "Incidence matrix memiliki dimensi:", options: ["n × n (n = jumlah vertex)", "m × m (m = jumlah edge)", "n × m (n = vertex, m = edge)", "Selalu square matrix"], correct: 2, explanation: "Incidence matrix menghubungkan simpul dengan sisi, sehingga dimensinya adalah jumlah simpul (n) × jumlah sisi (m)." },
            { question: "Dalam incidence matrix, jumlah nilai 1 pada setiap kolom adalah:", options: ["1", "2", "Tergantung degree vertex", "Tidak tetap"], correct: 1, explanation: "Setiap kolom melambangkan satu edge, dan setiap edge selalu menghubungkan tepat 2 titik ujung (kecuali loop), sehingga kolom selalu berisi tepat dua nilai 1." },
            { question: "Path matrix P^k menunjukkan:", options: ["Jumlah path dengan panjang tepat k", "Jumlah path dengan panjang maksimal k", "Shortest path antara dua vertex", "Semua path yang mungkin"], correct: 0, explanation: "Perkalian matriks ketetanggaan A^k memberikan jumlah jalur (walk/path) dengan panjang tepat k langkah antar simpul." },
            { question: "Jika A adalah adjacency matrix, maka A² memberikan informasi tentang:", options: ["Path dengan panjang 1", "Path dengan panjang 2", "Jumlah total path", "Degree setiap vertex"], correct: 1, explanation: "Sesuai teori eksponen matriks ketetanggaan, nilai pada matriks A² menunjukkan jumlah lintasan (walk) dengan panjang tepat 2 langkah." },
            { question: "Degree matrix D memiliki nilai non-zero hanya pada:", options: ["Diagonal utama", "Baris pertama", "Kolom pertama", "Semua posisi"], correct: 0, explanation: "Degree matrix adalah matriks diagonal di mana nilai derajat setiap titik hanya diletakkan pada diagonal utama (d_ii = deg(v_i))." },
            { question: "Laplacian matrix L dihitung dengan rumus:", options: ["L = A + D", "L = D - A", "L = A - D", "L = D × A"], correct: 1, explanation: "Laplacian matrix L didefinisikan secara akademis dengan mengurangkan matriks ketetanggaan dari matriks derajat: L = D - A." }
          ]
        },
        2: {
            title: "Aplikasi Graph Matrix",
            icon: "🔬",
            difficulty: "Intermediate",
            description: "Analisis karakteristik spektral dan sifat jaringan menggunakan komputasi matriks.",
            questions: [
                { question: "Untuk menentukan apakah graf terhubung, kita dapat menggunakan:", options: ["Adjacency matrix saja", "Powers of adjacency matrix", "Incidence matrix saja", "Degree matrix saja"], correct: 1, explanation: "Dengan menjumlahkan perpangkatan matriks ketetanggaan dari A^0 hingga A^(n-1), kita mendapatkan matriks keterjangkauan untuk melihat konektivitas graf." },
                { question: "Eigenvalue terbesar dari adjacency matrix disebut:", options: ["Spectral radius", "Chromatic number", "Independence number", "Domination number"], correct: 0, explanation: "Nilai eigen (eigenvalue) terbesar dari suatu matriks ketetanggaan graf disebut sebagai radius spektral (spectral radius)." },
                { question: "Jika adjacency matrix A memiliki rank r, maka jumlah komponen terhubung tak terisolasi (memiliki sisi) pada graf tersebut maksimal:", options: ["r vertex", "r edge", "r komponen terhubung", "Tidak ada hubungan"], correct: 2, explanation: "Setiap komponen terhubung yang memiliki sisi menyumbang rank minimal 2 pada adjacency matrix (rank(A) >= 2c). Maka, jumlah komponen terhubung tak terisolasi dibatasi maksimal sebanyak r (bahkan secara ketat maksimal r/2) komponen." },
                { question: "Untuk graf bipartit, adjacency matrix dapat ditulis dalam bentuk:", options: ["Block diagonal", "Upper triangular", "[[0, B], [B^T, 0]]", "Lower triangular"], correct: 2, explanation: "Graf bipartit membagi simpul menjadi dua himpunan independen, sehingga relasi ketetanggaannya hanya ada antar himpunan yang membentuk struktur matriks blok [[0, B], [B^T, 0]]." },
                { question: "Jumlah triangles dalam graf dapat dihitung dengan:", options: ["trace(A)", "trace(A²)", "trace(A³)/6", "trace(A³)/3"], correct: 2, explanation: "trace(A³) menghitung lintasan tertutup sepanjang 3 langkah. Karena setiap segitiga memiliki 3 titik dan dapat dilalui dalam 2 arah berbeda, jumlah segitiga sebenarnya adalah trace(A³)/6." },
                { question: "Multiplicity eigenvalue 0 pada Laplacian matrix menunjukkan:", options: ["Jumlah vertex", "Jumlah edge", "Jumlah komponen terhubung", "Chromatic number"], correct: 2, explanation: "Multiplisitas aljabar dari eigenvalue 0 pada matriks Laplacian selalu sama dengan jumlah komponen terhubung (connected components) di dalam graf." },
                { question: "Adjacency matrix graf regular memiliki ciri:", options: ["Semua baris memiliki jumlah yang sama", "Simetris", "Eigenvalue terbesar = degree", "Semua benar"], correct: 3, explanation: "Graf regular memiliki derajat simpul yang sama (k), sehingga baris bermatriks berjumlah k, matriks tetap simetris, dan radius spektralnya tepat sama dengan k." },
                { question: "Untuk graf dengan n vertex, adjacency matrix berukuran n×n memiliki maksimal berapa nilai 1?", options: ["n", "n²", "n(n-1)", "n(n-1)/2"], correct: 2, explanation: "Untuk graf berarah sederhana tanpa loop, kapasitas maksimal nilai 1 adalah n(n-1) (tidak ada nilai 1 di diagonal utama)." },
                { question: "Permanent dari adjacency matrix berkaitan dengan:", options: ["Jumlah perfect matchings", "Jumlah Hamiltonian cycles", "Jumlah spanning trees", "Chromatic polynomial"], correct: 0, explanation: "Secara aljabar, nilai permanen dari adjacency matrix graf bipartit mengukur jumlah pencocokan sempurna (perfect matchings)." },
                { question: "Matrix-tree theorem menggunakan:", options: ["Adjacency matrix", "Incidence matrix", "Laplacian matrix", "Degree matrix"], correct: 2, explanation: "Matrix-Tree Theorem menyatakan bahwa jumlah spanning tree dalam graf sama dengan kofaktor manapun dari matriks Laplacian (L)." }
            ]
        },
        3: {
            title: "Dasar Bilangan Dominasi",
            icon: "🎯",
            difficulty: "Intermediate",
            description: "Pahami konsep set dominasi minimum dan penempatan sensor optimal di graf.",
            questions: [
                { question: "Bilangan dominasi γ(G) didefinisikan sebagai:", options: ["Ukuran minimum dominating set", "Ukuran maksimum dominating set", "Jumlah semua dominating set", "Degree maksimum dalam graf"], correct: 0, explanation: "Bilangan dominasi γ(G) adalah kardinalitas atau ukuran paling sedikit (minimum) dari suatu himpunan dominasi di graf G." },
                { question: "Suatu himpunan S ⊆ V(G) disebut dominating set jika:", options: ["Setiap vertex dalam S bertetangga", "Setiap vertex di luar S bertetangga dengan minimal satu vertex di S", "S membentuk clique", "S adalah independent set"], correct: 1, explanation: "Definisi formal dominating set adalah setiap simpul di luar himpunan tersebut harus terhubung langsung (bertetangga) dengan setidaknya satu simpul di dalam himpunan." },
                { question: "Untuk graf path P_n, bilangan dominasi γ(P_n) = :", options: ["⌊n/2⌋", "⌈n/2⌉", "⌊n/3⌋", "⌈n/3⌉"], correct: 3, explanation: "Untuk graf lintasan, penempatan sensor paling optimal adalah setiap 3 langkah sekali, menghasilkan nilai batas atas: ⌈n/3⌉." },
                { question: "Bilangan dominasi untuk graf complete K_n adalah:", options: ["1", "2", "n-1", "n"], correct: 0, explanation: "Dalam graf lengkap K_n, semua simpul terhubung langsung dengan simpul lainnya, sehingga cukup memilih 1 simpul manapun untuk mendominasi seluruh graf." },
                { question: "Untuk graf cycle C_n, γ(C_n) = :", options: ["⌊n/2⌋", "⌈n/2⌉", "⌊n/3⌋", "⌈n/3⌉"], correct: 3, explanation: "Sama seperti lintasan, simpul pada graf siklus melingkar dapat didominasi secara optimal oleh 1 sensor untuk setiap 3 simpul, menghasilkan ⌈n/3⌉." },
                { question: "Minimal dominating set yang juga merupakan independent set disebut:", options: ["Perfect dominating set", "Independent dominating set", "Connected dominating set", "Total dominating set"], correct: 1, explanation: "Sesuai namanya, jika simpul-simpul di dalam himpunan dominasi tidak saling bertetangga satu sama lain, maka disebut independent dominating set." },
                { question: "Total dominating set mensyaratkan bahwa:", options: ["Setiap vertex hanya mendominasi dirinya sendiri", "Setiap vertex (termasuk anggota set) wajib memiliki tetangga di dalam set", "Himpunan dominasi terhubung", "Himpunan dominasi maksimal"], correct: 1, explanation: "Dalam total domination (open neighborhood domination), setiap simpul di graf—termasuk simpul di dalam himpunan dominasi itu sendiri—wajib memiliki tetangga di dalam himpunan tersebut, sehingga tidak ada simpul terisolasi di dalam subgraf himpunan dominasi." },
                { question: "Untuk graf star S_n (n ≥ 2), γ(S_n) = :", options: ["1", "2", "n-1", "n"], correct: 0, explanation: "Graf bintang memiliki 1 pusat yang bertetangga dengan seluruh simpul lainnya. Cukup tempatkan 1 sensor di pusat maka seluruh jaringan terdominasi." },
                { question: "Connected dominating set adalah dominating set yang:", options: ["Berisi semua vertex dengan degree maksimum", "Membentuk subgraf terhubung", "Tidak memiliki dua vertex bertetangga", "Memiliki ukuran minimal"], correct: 1, explanation: "Himpunan dominasi terhubung mewajibkan subgraf yang diinduksi oleh simpul-simpul dominasi tersebut membentuk graf yang saling terhubung (tidak terputus)." },
                { question: "Hubungan antara bilangan dominasi γ(G) dan independence number α(G):", options: ["γ(G) = α(G)", "γ(G) ≤ α(G)", "γ(G) ≥ α(G)", "Tidak ada hubungan pasti"], correct: 1, explanation: "Secara teoretis, ukuran himpunan dominasi independen minimum γ(G) selalu kurang dari atau sama dengan ukuran himpunan independen maksimum α(G)." }
            ]
        },
        4: {
            title: "Aplikasi & Variasi Dominasi",
            icon: "🚀",
            difficulty: "Advanced",
            description: "Kuasai variasi lanjut seperti Domatic Number, Roman Domination, dan kompleksitas algoritma.",
            questions: [
                { question: "k-dominating set adalah himpunan vertex dimana setiap vertex di luar himpunan bertetangga dengan minimal:", options: ["1 vertex dalam himpunan", "k vertex dalam himpunan", "k vertex di luar himpunan", "degree k"], correct: 1, explanation: "Pada k-domination, setiap simpul di luar himpunan dominasi wajib memiliki minimal k buah tetangga yang berada di dalam himpunan dominasi." },
                { question: "Domatic number d(G) adalah:", options: ["Ukuran minimum dominating set", "Maksimum jumlah disjoint dominating sets", "Jumlah total dominating sets", "Rata-rata ukuran dominating sets"], correct: 1, explanation: "Domatic number d(G) didefinisikan sebagai jumlah maksimal partisi himpunan dominasi yang saling lepas (disjoint) yang dapat dibentuk di graf G." },
                { question: "Untuk graf dengan minimum degree δ, domatic number memenuhi:", options: ["d(G) ≤ δ", "d(G) ≤ δ + 1", "d(G) = δ + 1", "d(G) ≥ δ + 1"], correct: 1, explanation: "Secara matematis, batas atas dari domatic number dari graf G tidak akan pernah melebihi derajat minimum (δ) ditambah satu: d(G) ≤ δ + 1." },
                { question: "Domination number untuk graf bipartit lengkap K_{m,n} adalah:", options: ["1", "2", "min(m,n)", "max(m,n)"], correct: 1, explanation: "Karena tidak ada sisi internal dalam partisi yang sama, kita harus memilih 1 simpul dari partisi kiri dan 1 simpul dari partisi kanan untuk mendominasi seluruh simpul lawan. Jadi γ = 2." },
                { question: "Locating-dominating set memiliki properti tambahan:", options: ["Setiap vertex memiliki neighbor unik dalam set", "Set membentuk clique", "Set terhubung", "Set independent"], correct: 0, explanation: "Locating-dominating set mengharuskan setiap simpul di luar himpunan memiliki himpunan tetangga patokan yang unik di dalam set dominasi tersebut." },
                { question: "Untuk graf grid m×n, estimasi bilangan dominasi adalah sekitar:", options: ["mn/5", "mn/4", "mn/3", "mn/2"], correct: 0, explanation: "Pada graf grid dua dimensi, sebuah simpul di tengah mendominasi dirinya sendiri ditambah 4 tetangganya (total 5 simpul). Maka efisiensi kasarnya sekitar mn/5." },
                { question: "Restrained dominating set memiliki syarat bahwa:", options: ["Set berukuran minimal", "Komplemen set juga dominating", "Setiap vertex di luar set memiliki neighbor di luar set", "Set membentuk matching"], correct: 2, explanation: "Restrained domination mengharuskan subgraf yang dibentuk oleh simpul-simpul di luar set dominasi tidak memiliki simpul terisolasi (setiap simpul luar punya tetangga simpul luar)." },
                { question: "Untuk graf wheel W_n (n ≥ 3), γ(W_n) = :", options: ["1", "2", "Refaktor rim", "n/3"], correct: 0, explanation: "Sama seperti graf bintang, graf roda memiliki poros pusat (hub) yang terhubung langsung dengan semua simpul rim. Cukup taruh 1 sensor di pusat untuk mendominasi." },
                { question: "Roman dominating function f: V → {0,1,2} dengan syarat vertex bernilai 0 bertetangga dengan vertex bernilai:", options: ["1", "2", "1 atau 2", "Minimal 2 vertex bernilai 1"], correct: 1, explanation: "Roman domination mengamanatkan bahwa setiap simpul dengan bobot 0 (tidak ada legiun) wajib bertetangga dengan minimal satu simpul berbobot 2 (memiliki legiun cadangan)." },
                { question: "Kompleksitas komputasi untuk menentukan bilangan dominasi adalah:", options: ["P (polynomial time)", "NP-complete", "PSPACE-complete", "Undecidable"], correct: 1, explanation: "Menemukan ukuran minimum dominating set adalah salah satu masalah klasik yang tergolong dalam kelas NP-complete (sulit diselesaikan secara efisien untuk ukuran besar)." }
            ]
        }
    };

    // Helper to render interactive visual graphs inside specific questions
    const renderQuestionDiagram = (pkgId, qIdx) => {
        if (pkgId === 1 && qIdx === 0) {
            return (
                <svg width="200" height="90" viewBox="0 0 200 90" className={styles.questionSvg}>
                    <line x1="40" y1="45" x2="100" y2="20" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="100" y1="20" x2="160" y2="45" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="40" cy="45" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="100" cy="20" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="160" cy="45" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <text x="40" y="49" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v1</text>
                    <text x="100" y="24" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v2</text>
                    <text x="160" y="49" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v3</text>
                </svg>
            );
        }
        if (pkgId === 1 && qIdx === 1) {
            return (
                <svg width="200" height="90" viewBox="0 0 200 90" className={styles.questionSvg}>
                    <line x1="50" y1="25" x2="150" y2="25" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="150" y1="25" x2="100" y2="70" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="100" y1="70" x2="50" y2="25" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="50" cy="25" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="150" cy="25" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="100" cy="70" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <text x="50" y="29" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v1</text>
                    <text x="150" y="29" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v2</text>
                    <text x="100" y="74" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v3</text>
                </svg>
            );
        }
        if (pkgId === 3 && qIdx === 2) {
            return (
                <svg width="260" height="70" viewBox="0 0 260 70" className={styles.questionSvg}>
                    <line x1="30" y1="35" x2="85" y2="35" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="85" y1="35" x2="140" y2="35" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="140" y1="35" x2="195" y2="35" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="195" y1="35" x2="250" y2="35" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="30" cy="35" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="85" cy="35" r="14" fill="#d1fae5" stroke="#10b981" strokeWidth="3" />
                    <circle cx="140" cy="35" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="195" cy="35" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="250" cy="35" r="14" fill="#d1fae5" stroke="#10b981" strokeWidth="3" />
                    <text x="30" y="39" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v1</text>
                    <text x="85" y="39" fontSize="10" fontWeight="bold" fill="#047857" textAnchor="middle">v2</text>
                    <text x="140" y="39" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v3</text>
                    <text x="195" y="39" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v4</text>
                    <text x="250" y="39" fontSize="10" fontWeight="bold" fill="#047857" textAnchor="middle">v5</text>
                </svg>
            );
        }
        if (pkgId === 3 && qIdx === 3) {
            return (
                <svg width="180" height="130" viewBox="0 0 180 130" className={styles.questionSvg}>
                    <path d="M 90,15 L 30,55 L 53,115 L 127,115 L 150,55 Z" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="90" y1="15" x2="53" y2="115" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="90" y1="15" x2="127" y2="115" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="30" y1="55" x2="127" y2="115" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="30" y1="55" x2="150" y2="55" stroke="#cbd5e1" strokeWidth="2" />
                    <line x1="53" y1="115" x2="150" y2="55" stroke="#cbd5e1" strokeWidth="2" />
                    <circle cx="90" cy="15" r="14" fill="#d1fae5" stroke="#10b981" strokeWidth="3" />
                    <circle cx="30" cy="55" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="53" cy="115" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="127" cy="115" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <circle cx="150" cy="55" r="14" fill="#ffffff" stroke="#1e40af" strokeWidth="3" />
                    <text x="90" y="19" fontSize="10" fontWeight="bold" fill="#047857" textAnchor="middle">v1</text>
                    <text x="30" y="59" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v2</text>
                    <text x="53" y="119" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v3</text>
                    <text x="127" y="119" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v4</text>
                    <text x="150" y="59" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">v5</text>
                </svg>
            );
        }
        if (pkgId === 3 && qIdx === 7) {
            return (
                <svg width="180" height="140" viewBox="0 0 180 140" className={styles.questionSvg}>
                    <line x1="90" y1="70" x2="90" y2="20" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="90" y1="70" x2="140" y2="45" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="90" y1="70" x2="140" y2="95" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="90" y1="70" x2="90" y2="120" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="90" y1="70" x2="40" y2="95" stroke="#cbd5e1" strokeWidth="3" />
                    <line x1="90" y1="70" x2="40" y2="45" stroke="#cbd5e1" strokeWidth="3" />
                    <circle cx="90" cy="70" r="14" fill="#d1fae5" stroke="#10b981" strokeWidth="3" />
                    <circle cx="90" cy="20" r="12" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
                    <circle cx="140" cy="45" r="12" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
                    <circle cx="140" cy="95" r="12" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
                    <circle cx="90" cy="120" r="12" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
                    <circle cx="40" cy="95" r="12" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
                    <circle cx="40" cy="45" r="12" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
                    <text x="90" y="74" fontSize="10" fontWeight="bold" fill="#047857" textAnchor="middle">c</text>
                    <text x="90" y="24" fontSize="8" fontWeight="bold" fill="#1e40af" textAnchor="middle">v1</text>
                    <text x="140" y="49" fontSize="8" fontWeight="bold" fill="#1e40af" textAnchor="middle">v2</text>
                    <text x="140" y="99" fontSize="8" fontWeight="bold" fill="#1e40af" textAnchor="middle">v3</text>
                    <text x="90" y="124" fontSize="8" fontWeight="bold" fill="#1e40af" textAnchor="middle">v4</text>
                    <text x="40" y="99" fontSize="8" fontWeight="bold" fill="#1e40af" textAnchor="middle">v5</text>
                    <text x="40" y="49" fontSize="8" fontWeight="bold" fill="#1e40af" textAnchor="middle">v6</text>
                </svg>
            );
        }
        return null;
    };

    const handlePackageSelect = (id) => { 
        setSelectedPackage(id); 
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswerChecked(false);
        setUserAnswers({}); 
        setShowResults(false); 
        setScore(0); 
        setStreak(0);
        setMaxStreak(0);
        setXpPoints(0);
    };

    const handleOptionClick = (optionIdx) => {
        if (isAnswerChecked) return; // Lock options after checking answer
        setSelectedOption(optionIdx);
    };

    const handleCheckAnswer = () => {
        const pkg = questionPackages[selectedPackage];
        const currentQuestion = pkg.questions[currentIndex];
        const isCorrect = selectedOption === currentQuestion.correct;
        
        setIsAnswerChecked(true);
        setUserAnswers(prev => ({ ...prev, [currentIndex]: selectedOption }));
        
        if (isCorrect) {
            setScore(prev => prev + 1);
            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak > maxStreak) setMaxStreak(newStreak);
            
            // Score formula: 10 XP base + streak bonus (5 XP per streak above 2)
            const streakBonus = newStreak > 2 ? 5 : 0;
            setXpPoints(prev => prev + 10 + streakBonus);
        } else {
            setStreak(0);
        }
    };

    const handleNextQuestion = () => {
        const pkg = questionPackages[selectedPackage];
        if (currentIndex < pkg.questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => setSelectedPackage(null);

    const getScoreMessage = (percentage) => {
        if (percentage >= 90) return { message: "Grandmaster Graf! 🏆", color: "var(--success)", badge: "Gold Medal" };
        if (percentage >= 70) return { message: "Teoretikus Berbakat! 🔬", color: "var(--primary)", badge: "Silver Medal" };
        if (percentage >= 50) return { message: "Penjelajah Jaringan! 🧭", color: "var(--warning)", badge: "Bronze Badge" };
        return { message: "Tetap Semangat & Coba Lagi! 🎯", color: "var(--error)", badge: "Participant Ribbon" };
    };

    const difficultyTags = {
        "Beginner": <span className={`${styles.tag} ${styles.isSuccess}`}>Beginner</span>,
        "Intermediate": <span className={`${styles.tag} ${styles.isWarning}`}>Intermediate</span>,
        "Advanced": <span className={`${styles.tag} ${styles.isDanger}`}>Advanced</span>
    };

    const renderPackageSelection = () => (
        <>
            <header className={styles.latihanHeader}>
                <h1 className={styles.title}>
                    <FontAwesomeIcon icon={faGraduationCap} /> Pusat Latihan Spektral
                </h1>
                <p className={styles.subtitle}>
                    Uji keterampilan analitis dan pemecahan masalah Anda dengan tantangan terstruktur setingkat akademisi internasional.
                </p>
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
                            <span className={`${styles.tag} ${styles.isInfo}`}>{pkg.questions.length} Tantangan</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    const renderQuiz = () => {
        const pkg = questionPackages[selectedPackage];
        const q = pkg.questions[currentIndex];
        const progress = ((currentIndex + 1) / pkg.questions.length) * 100;
        const isCorrect = selectedOption === q.correct;

        return (
            <div className={styles.quizCard}>
                {/* Header controls inside quiz */}
                <div className={styles.quizTopBar}>
                    <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={resetQuiz}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Keluar Kuis</span>
                    </button>
                    
                    {streak > 0 && (
                        <div className={styles.streakIndicator}>
                            <FontAwesomeIcon icon={faFire} />
                            <span>Streak: {streak} Soal 🔥</span>
                        </div>
                    )}
                    
                    <span className={styles.progressLabel}>
                        Tantangan {currentIndex + 1} dari {pkg.questions.length}
                    </span>
                </div>

                {/* Progress bar */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressBarInner} style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {/* Question Section */}
                <div className={styles.questionSection}>
                    <h2 className={styles.questionText}>{q.question}</h2>
                    {renderQuestionDiagram(selectedPackage, currentIndex) ? (
                        <div key={`diagram-wrapper-${selectedPackage}-${currentIndex}`} className={styles.diagramWrapper}>
                            {renderQuestionDiagram(selectedPackage, currentIndex)}
                        </div>
                    ) : null}
                </div>

                {/* Options Section */}
                <div className={styles.optionsList}>
                    {q.options.map((opt, oIndex) => {
                        const isSelected = selectedOption === oIndex;
                        let optionClass = styles.optionLabel;
                        if (isSelected) optionClass += ` ${styles.selected}`;
                        if (isAnswerChecked) optionClass += ` ${styles.disabled}`;
                        
                        return (
                            <div 
                                key={`opt-${selectedPackage}-${currentIndex}-${oIndex}`} 
                                className={optionClass}
                                onClick={() => handleOptionClick(oIndex)}
                            >
                                <span className={styles.optionNumber}>
                                    {String.fromCharCode(65 + oIndex)}
                                </span>
                                <span>{opt}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Step-by-Step Alert Feedback */}
                {isAnswerChecked && (
                    <div className={`${styles.feedbackAlert} ${isCorrect ? styles.feedbackAlertCorrect : styles.feedbackAlertIncorrect}`}>
                        <div className={styles.alertHeader}>
                            {isCorrect ? (
                                <span>
                                    <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '0.5rem' }} /> 
                                    Jawaban Anda Tepat! (+10 XP)
                                </span>
                            ) : (
                                <span>
                                    <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: '0.5rem' }} /> 
                                    Kurang Tepat! Jawaban benar adalah: {String.fromCharCode(65 + q.correct)}
                                </span>
                            )}
                        </div>
                        <p className={styles.alertExplanation}>{q.explanation}</p>
                    </div>
                )}

                {/* Action button */}
                <div className={styles.quizControls}>
                    {!isAnswerChecked ? (
                        <button 
                            key="btn-check"
                            className={`${styles.btn} ${styles.btnPrimary}`} 
                            disabled={selectedOption === null}
                            onClick={handleCheckAnswer}
                        >
                            <span>Periksa Jawaban</span>
                        </button>
                    ) : (
                        <button 
                            key="btn-next"
                            className={`${styles.btn} ${styles.btnPrimary}`} 
                            onClick={handleNextQuestion}
                        >
                            <span>{currentIndex === pkg.questions.length - 1 ? "Lihat Skor Akhir" : "Lanjut"}</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const renderResults = () => {
        const pkg = questionPackages[selectedPackage];
        const percentage = Math.round((score / pkg.questions.length) * 100);
        const scoreInfo = getScoreMessage(percentage);

        return (
            <div className={styles.resultsGrid}>
                {/* Left Side: Score Board */}
                <aside className={styles.resultsSummary}>
                    <h2 className={styles.statsTitle}>Hasil Kuis</h2>
                    
                    <div className={styles.accuracyRing} style={{ '--percentage': percentage }}>
                        <div className={styles.accuracyRingInner}>
                            <div className={styles.scorePercentage}>{percentage}%</div>
                            <div className={styles.scoreFraction}>{score} / {pkg.questions.length} Benar</div>
                        </div>
                    </div>
                    
                    <h3 className={styles.scoreMessage} style={{ color: scoreInfo.color }}>
                        {scoreInfo.message}
                    </h3>
                    
                    <div className={styles.achievementBadge}>
                        <FontAwesomeIcon icon={faAward} style={{ color: scoreInfo.color, marginRight: '0.5rem' }} />
                        {scoreInfo.badge}
                    </div>
                    
                    <div style={{ margin: '0.5rem 0' }}>
                        <span className={styles.xpBadge}>
                            <FontAwesomeIcon icon={faStar} /> +{xpPoints} XP
                        </span>
                    </div>

                    <div className={styles.statsRow}>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>{maxStreak}</div>
                            <div className={styles.statLabel}>Max Streak</div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>
                                <FontAwesomeIcon icon={faHeart} style={{ color: '#ef4444' }} />
                            </div>
                            <div className={styles.statLabel}>Completed</div>
                        </div>
                    </div>

                    <div className={styles.btnGroup}>
                        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={resetQuiz}>
                            <FontAwesomeIcon icon={faTasks} />
                            <span>Pilih Paket</span>
                        </button>
                        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => handlePackageSelect(selectedPackage)}>
                            <FontAwesomeIcon icon={faRedo} />
                            <span>Ulangi</span>
                        </button>
                    </div>
                </aside>

                {/* Right Side: Detailed Review */}
                <main className={styles.reviewSection}>
                    <h2 className={styles.reviewSectionTitle}>Tinjau Jawaban Soal</h2>
                    {pkg.questions.map((q, index) => {
                        const userAnswerIndex = userAnswers[index];
                        const isCorrect = userAnswerIndex === q.correct;
                        return (
                            <div 
                                key={index} 
                                className={`${styles.reviewItem} ${isCorrect ? styles.reviewItemCorrect : styles.reviewItemIncorrect}`}
                            >
                                <h3 className={styles.reviewItemQuestion}>
                                    Soal {index + 1}. {q.question}
                                </h3>
                                
                                <div className={`${styles.reviewItemYourAnswer} ${!isCorrect ? styles.reviewItemYourAnswerIncorrect : ''}`}>
                                    <FontAwesomeIcon icon={isCorrect ? faCheckCircle : faTimesCircle} className={styles.reviewItemIcon}/>
                                    <span>Pilihan Anda: <strong>{String.fromCharCode(65 + userAnswerIndex)} ({q.options[userAnswerIndex]})</strong></span>
                                </div>
                                
                                {!isCorrect && (
                                    <div className={styles.reviewItemCorrectAnswer}>
                                        <FontAwesomeIcon icon={faCheckCircle} className={styles.reviewItemIcon}/>
                                        <span>Jawaban Benar: <strong>{String.fromCharCode(65 + q.correct)} ({q.options[q.correct]})</strong></span>
                                    </div>
                                )}
                                
                                {q.explanation && (
                                    <div className={styles.reviewItemExplanation}>
                                        <FontAwesomeIcon icon={faLightbulb} className={styles.reviewItemIcon} style={{ marginRight: '0.5rem', color: 'var(--warning)' }} />
                                        <span>{q.explanation}</span>
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