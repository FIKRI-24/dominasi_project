import React, { useState, useEffect, useCallback } from 'react';
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
    
    // API state
    const [packages, setPackages] = useState([]);
    const [apiLoading, setApiLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    const [activeQuestions, setActiveQuestions] = useState([]);
    const [questionsLoading, setQuestionsLoading] = useState(false);
    
    // End screen state
    const [showResults, setShowResults] = useState(false);

    // Fetch paket dari backend
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setApiLoading(true);
                const res = await fetch('http://localhost:5000/api/packages');
                if (!res.ok) throw new Error('Gagal memuat data paket');
                const data = await res.json();
                setPackages(data.data);
            } catch (err) {
                setApiError(err.message);
            } finally {
                setApiLoading(false);
            }
        };
        fetchPackages();
    }, []);

    // Fetch soal saat paket dipilih
    const fetchQuestions = useCallback(async (pkgId) => {
        try {
            setQuestionsLoading(true);
            const res = await fetch(`http://localhost:5000/api/packages/${pkgId}/questions`);
            if (!res.ok) throw new Error('Gagal memuat soal');
            const data = await res.json();
            setActiveQuestions(data.data.questions);
        } catch (err) {
            setApiError(err.message);
        } finally {
            setQuestionsLoading(false);
        }
    }, []);

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
        fetchQuestions(id);
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

    const handleCheckAnswer = async () => {
        if (selectedOption === null) return;
        try {
            const answersPayload = { [currentIndex]: selectedOption };
            const res = await fetch(`http://localhost:5000/api/packages/${selectedPackage}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: answersPayload })
            });
            const data = await res.json();
            const result = data.data.results[0];
            const isCorrect = result.is_correct;

            setIsAnswerChecked(true);
            setUserAnswers(prev => ({ 
                ...prev, 
                [currentIndex]: { 
                    selected: selectedOption, 
                    correct_index: result.correct_index,
                    explanation: result.explanation,
                    is_correct: isCorrect
                } 
            }));

            if (isCorrect) {
                setScore(prev => prev + 1);
                const newStreak = streak + 1;
                setStreak(newStreak);
                if (newStreak > maxStreak) setMaxStreak(newStreak);
                const streakBonus = newStreak > 2 ? 5 : 0;
                setXpPoints(prev => prev + 10 + streakBonus);
            } else {
                setStreak(0);
            }
        } catch (err) {
            console.error('Gagal submit jawaban:', err);
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < activeQuestions.length - 1) {
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
            {apiLoading ? (
                <div style={{textAlign:'center',padding:'3rem',color:'var(--text-muted)'}}>⏳ Memuat paket latihan...</div>
            ) : apiError ? (
                <div style={{textAlign:'center',padding:'3rem',color:'var(--error)'}}>❌ {apiError} — Pastikan backend berjalan di port 5000.</div>
            ) : (
                <div className={styles.packageGrid}>
                    {packages.map((pkg) => (
                        <div key={pkg.id} className={styles.packageCard} onClick={() => handlePackageSelect(pkg.id)}>
                            <div className={styles.packageCardHeader}>
                                <span className={styles.packageCardIcon}>{pkg.icon}</span>
                                <div>
                                    <h2 className={styles.packageCardTitle}>{pkg.title}</h2>
                                </div>
                            </div>
                            <p className={styles.packageCardDescription}>{pkg.description}</p>
                            <div className={styles.packageCardMeta}>
                                {difficultyTags[pkg.difficulty]}
                                <span className={`${styles.tag} ${styles.isInfo}`}>{pkg.question_count} Tantangan</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

    const renderQuiz = () => {
        if (questionsLoading) return <div style={{textAlign:'center',padding:'3rem',color:'var(--text-muted)'}}>⏳ Memuat soal...</div>;
        const q = activeQuestions[currentIndex];
        if (!q) return null;
        const currentAnswer = userAnswers[currentIndex];
        const progress = ((currentIndex + 1) / activeQuestions.length) * 100;
        const isCorrect = currentAnswer?.is_correct || false;

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
                        Tantangan {currentIndex + 1} dari {activeQuestions.length}
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
                    <h2 className={styles.questionText}>{q.question_text}</h2>
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
                                    Kurang Tepat! Jawaban benar adalah: {String.fromCharCode(65 + (currentAnswer?.correct_index ?? 0))}
                                </span>
                            )}
                        </div>
                        <p className={styles.alertExplanation}>{currentAnswer?.explanation}</p>
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
                            <span>{currentIndex === activeQuestions.length - 1 ? 'Lihat Skor Akhir' : 'Lanjut'}</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const renderResults = () => {
        const percentage = Math.round((score / activeQuestions.length) * 100);
        const scoreInfo = getScoreMessage(percentage);

        return (
            <div className={styles.resultsGrid}>
                {/* Left Side: Score Board */}
                <aside className={styles.resultsSummary}>
                    <h2 className={styles.statsTitle}>Hasil Kuis</h2>
                    
                    <div className={styles.accuracyRing} style={{ '--percentage': percentage }}>
                        <div className={styles.accuracyRingInner}>
                            <div className={styles.scorePercentage}>{percentage}%</div>
                            <div className={styles.scoreFraction}>{score} / {activeQuestions.length} Benar</div>
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
                    {activeQuestions.map((q, index) => {
                        const ans = userAnswers[index];
                        const userAnswerIndex = ans?.selected;
                        const correctIndex = ans?.correct_index;
                        const isCorrect = ans?.is_correct;
                        return (
                            <div 
                                key={index} 
                                className={`${styles.reviewItem} ${isCorrect ? styles.reviewItemCorrect : styles.reviewItemIncorrect}`}
                            >
                                <h3 className={styles.reviewItemQuestion}>
                                    Soal {index + 1}. {q.question_text}
                                </h3>
                                
                                <div className={`${styles.reviewItemYourAnswer} ${!isCorrect ? styles.reviewItemYourAnswerIncorrect : ''}`}>
                                    <FontAwesomeIcon icon={isCorrect ? faCheckCircle : faTimesCircle} className={styles.reviewItemIcon}/>
                                    <span>Pilihan Anda: <strong>{userAnswerIndex !== undefined ? `${String.fromCharCode(65 + userAnswerIndex)} (${q.options[userAnswerIndex]})` : 'Tidak dijawab'}</strong></span>
                                </div>
                                
                                {!isCorrect && correctIndex !== undefined && (
                                    <div className={styles.reviewItemCorrectAnswer}>
                                        <FontAwesomeIcon icon={faCheckCircle} className={styles.reviewItemIcon}/>
                                        <span>Jawaban Benar: <strong>{String.fromCharCode(65 + correctIndex)} ({q.options[correctIndex]})</strong></span>
                                    </div>
                                )}
                                
                                {ans?.explanation && (
                                    <div className={styles.reviewItemExplanation}>
                                        <FontAwesomeIcon icon={faLightbulb} className={styles.reviewItemIcon} style={{ marginRight: '0.5rem', color: 'var(--warning)' }} />
                                        <span>{ans.explanation}</span>
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