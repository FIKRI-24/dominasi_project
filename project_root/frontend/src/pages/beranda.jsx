import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './assets/beranda.css';

// --- Custom SVG Icon Library ---
const Icon = ({ icon }) => {
    const icons = {
        'arrow-right': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />,
        'book-open': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
        'gamepad': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
        'pencil-ruler': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
        'chevron-right': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />,
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[icon]}
        </svg>
    );
};

const featureList = [
    {
        icon: 'book-open',
        title: 'Materi Terstruktur',
        description: 'Pelajari konsep graf, himpunan pembeda, bilangan dominasi, hingga karakterisasi penempatan sensor jaringan secara mendalam.',
        link: '/materi',
        linkText: 'Pelajari Materi'
    },
    {
        icon: 'gamepad',
        title: 'Galeri & Contoh Graf',
        description: 'Jelajahi visualisasi berbagai variasi graf standar, bintang, siklus, bipartit, pohon, beserta kebutuhan sensor navigasinya.',
        link: '/contoh',
        linkText: 'Lihat Galeri'
    },
    {
        icon: 'pencil-ruler',
        title: 'Lab Eksperimen Graf',
        description: 'Uji coba langsung penempatan patokan sensor pembeda pada simpul graf interaktif dan dapatkan evaluasi otomatis.',
        link: '/coba',
        linkText: 'Coba Lab Graf'
    },
    {
        icon: 'chevron-right',
        title: 'Latihan Soal & Kuis',
        description: 'Asah dan uji pemahaman Anda dengan paket kuis bertingkat dari dasar hingga tingkat lanjut lengkap dengan evaluasi skor.',
        link: '/latihan',
        linkText: 'Mulai Latihan'
    }
];

const Beranda = () => {
    const canvasRef = useRef(null);

    // --- Hero Background Animation Effect ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        const particles = [];
        const particleCount = Math.floor(canvas.width / 40);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 1.5 + Math.random() * 1.5
            });
        }

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="beranda-container">
            <Navbar />

            {/* Hero Section */}
            <section className="hero">
                <canvas ref={canvasRef} id="hero-canvas"></canvas>
                <div className="hero-content">
                    <h1 className="hero-title">Selamat Datang di Pembelajaran Teori Graf</h1>
                    <p className="hero-subtitle">Jelajahi dunia simpul dan sisi melalui materi, contoh, dan visualisasi yang interaktif dan menyenangkan.</p>
                    <div className="hero-buttons">
                        <Link to="/materi" className="hero-button primary">
                            Mulai Belajar <Icon icon="arrow-right" />
                        </Link>
                        <Link to="/coba" className="hero-button secondary">
                            Coba Editor Graf
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="features-container">
                    <h2 className="section-title">Fitur Pembelajaran Interaktif</h2>
                    <p className="section-subtitle">
                        Pilih modul belajar yang Anda inginkan untuk memahami teori graf dan penempatan sensor secara menyeluruh.
                    </p>
                    <div className="features-grid">
                        {featureList.map((item, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon-wrapper">
                                    <Icon icon={item.icon} />
                                </div>
                                <h3 className="feature-title">{item.title}</h3>
                                <p className="feature-description">{item.description}</p>
                                <Link to={item.link} className="feature-link">
                                    <span>{item.linkText}</span>
                                    <Icon icon="arrow-right" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Beranda;
