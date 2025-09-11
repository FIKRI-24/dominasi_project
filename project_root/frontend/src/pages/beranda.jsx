import React, { useEffect, useRef } from 'react';

// --- Placeholder Navbar Component ---
// Ganti ini dengan komponen Navbar Anda yang sebenarnya.
import Navbar from '../../components/navbar.module.jsx';
    

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
            <style>{`
                /* CSS Variables from app.css */
                :root {
                    --primary: #1e40af; 
                    --accent: #38bdf8; 
                    --dark: #1e1e24;
                    --light: #f8f9fa;
                }

                /* Global Styles */
                .beranda-container {
                    font-family: 'Inter', sans-serif;
                    background-color: var(--light);
                    color: var(--dark);
                }

                /* Hero Section */
                .hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    background: linear-gradient(135deg, var(--primary), #3730a3);
                    color: white;
                    overflow: hidden;
                }
                #hero-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }
                .hero-content {
                    position: relative;
                    z-index: 2;
                    padding: 2rem;
                    animation: fadeIn 1s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .hero-title {
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 800;
                    margin-bottom: 1rem;
                    text-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
                .hero-subtitle {
                    font-size: clamp(1.1rem, 2vw, 1.5rem);
                    max-width: 650px;
                    margin: 0 auto 2.5rem;
                    opacity: 0.9;
                }
                .hero-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }
                .hero-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.9rem 2rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                .hero-button.primary {
                    background-color: white;
                    color: var(--primary);
                }
                .hero-button.primary:hover {
                    background-color: transparent;
                    color: white;
                    border-color: white;
                    transform: translateY(-3px);
                }
                .hero-button.secondary {
                    background-color: rgba(255,255,255,0.15);
                    color: white;
                }
                .hero-button.secondary:hover {
                    background-color: white;
                    color: var(--primary);
                    transform: translateY(-3px);
                }

                /* Features Section */
                .features {
                    padding: 6rem 2rem;
                    background-color: var(--light);
                }
                .features-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    text-align: center;
                }
                .section-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--dark);
                    margin-bottom: 1rem;
                }
                .section-subtitle {
                    font-size: 1.1rem;
                    color: #6b7280;
                    max-width: 600px;
                    margin: 0 auto 4rem;
                }
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                .feature-card {
                    background-color: white;
                    padding: 2.5rem 2rem;
                    border-radius: 12px;
                    text-align: left;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .feature-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 10px 30px rgba(30, 64, 175, 0.1);
                }
                .feature-icon-wrapper {
                    display: inline-flex;
                    padding: 1rem;
                    background-color: #eef2ff;
                    border-radius: 10px;
                    margin-bottom: 1.5rem;
                }
                .feature-icon-wrapper .icon {
                    width: 2rem;
                    height: 2rem;
                    color: var(--primary);
                }
                .feature-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                }
                .feature-description {
                    color: #6b7280;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                .feature-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    color: var(--primary);
                    font-weight: 600;
                    text-decoration: none;
                    transition: gap 0.2s ease;
                }
                .feature-link:hover {
                    gap: 0.6rem;
                    text-decoration: underline;
                }
                .feature-link .icon {
                    width: 1rem;
                    height: 1rem;
                }
                .icon {
                    width: 1em;
                    height: 1em;
                }
            `}</style>
            
            <Navbar />

            <section className="hero">
                <canvas ref={canvasRef} id="hero-canvas"></canvas>
                <div className="hero-content">
                    <h1 className="hero-title">Selamat Datang di Pembelajaran Teori Graf</h1>
                    <p className="hero-subtitle">Jelajahi dunia simpul dan sisi melalui materi, contoh, dan visualisasi yang interaktif dan menyenangkan.</p>
                    <div className="hero-buttons">
                        <a href="/materi" className="hero-button primary">
                            Mulai Belajar <Icon icon="arrow-right" />
                        </a>
                        <a href="/coba" className="hero-button secondary">
                            Coba Editor Graf
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Beranda;

