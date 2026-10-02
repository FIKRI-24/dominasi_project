import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

const API = 'http://localhost:5000/api';

const DIFF_COLORS = { 
  Beginner: { bg: '#064e3b', text: '#34d399', border: '#059669' }, 
  Intermediate: { bg: '#78350f', text: '#fde047', border: '#d97706' }, 
  Advanced: { bg: '#7f1d1d', text: '#fca5a5', border: '#dc2626' } 
};

const CATEGORY_SUGGESTIONS = [
  'Representasi Matriks',
  'Spektral Graf & Laplacian',
  'Dasar Bilangan Dominasi',
  'Variasi Dominasi & Sensor',
  'Konektivitas & Jalur',
  'Pembeda Metrik'
];

const EMOJI_OPTIONS = ['📊', '🔬', '🎯', '🚀', '⚡', '💡', '🧩', '📐', '🌐', '🛡️'];

// ── Komponen Kanvas Interaktif untuk Membangun JSON Graf ──
const GraphCanvas = ({ value, onChange, onAutoAnalyze }) => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [connecting, setConnecting] = useState(null);
  const [mode, setMode] = useState('add'); // 'add' | 'connect' | 'delete'

  useEffect(() => {
    if (value) {
      try {
        const parsed = typeof value === 'string' ? JSON.parse(value) : value;
        if (parsed.nodes) setNodes(parsed.nodes);
        if (parsed.edges) setEdges(parsed.edges);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const graphJson = JSON.stringify({ viewBox: { width: 320, height: 200 }, nodes, edges });
    onChange(graphJson);
  }, [nodes, edges]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background subtle
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Draw edges
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2.5;
    for (const [u, v] of edges) {
      const nu = nodes.find(n => n.id === u);
      const nv = nodes.find(n => n.id === v);
      if (!nu || !nv) continue;
      ctx.beginPath();
      ctx.moveTo(nu.x, nu.y);
      ctx.lineTo(nv.x, nv.y);
      ctx.stroke();
    }

    // Draw nodes
    for (const node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = connecting === node.id ? '#fbbf24' : '#0f172a';
      ctx.fill();
      ctx.strokeStyle = connecting === node.id ? '#d97706' : '#3b82f6';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = connecting === node.id ? '#78350f' : '#93c5fd';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, node.x, node.y);
    }
  };

  useEffect(draw, [nodes, edges, connecting]);

  const getNodeAt = (x, y) => nodes.find(n => Math.hypot(n.x - x, n.y - y) <= 18);

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const clicked = getNodeAt(x, y);

    if (mode === 'add') {
      if (!clicked) {
        const id = `v${nodes.length + 1}`;
        setNodes(prev => [...prev, { id, x: Math.round(x), y: Math.round(y), label: id }]);
      }
    } else if (mode === 'connect') {
      if (clicked) {
        if (!connecting) {
          setConnecting(clicked.id);
        } else if (connecting !== clicked.id) {
          const edgeExists = edges.some(([a, b]) => (a === connecting && b === clicked.id) || (a === clicked.id && b === connecting));
          if (!edgeExists) setEdges(prev => [...prev, [connecting, clicked.id]]);
          setConnecting(null);
        } else {
          setConnecting(null);
        }
      }
    } else if (mode === 'delete') {
      if (clicked) {
        setEdges(prev => prev.filter(([a, b]) => a !== clicked.id && b !== clicked.id));
        setNodes(prev => prev.filter(n => n.id !== clicked.id));
      }
    }
  };

  const clearAll = () => { setNodes([]); setEdges([]); setConnecting(null); };

  return (
    <div style={{ border: '1px solid #334155', borderRadius: 8, padding: 12, background: '#0a0f1e' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {['add', 'connect', 'delete'].map(m => (
          <button key={m} type="button" onClick={() => { setMode(m); setConnecting(null); }}
            style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #475569', background: mode === m ? '#2563eb' : '#1e293b', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: mode === m ? 600 : 400 }}>
            {m === 'add' ? '➕ Titik' : m === 'connect' ? '🔗 Garis' : '🗑️ Hapus'}
          </button>
        ))}
        <button type="button" onClick={clearAll} style={{ padding: '5px 12px', borderRadius: 6, border: '1px solid #dc2626', background: '#450a0a', color: '#fca5a5', cursor: 'pointer', fontSize: 12 }}>🧹 Reset</button>
        {nodes.length >= 2 && onAutoAnalyze && (
          <button type="button" onClick={() => onAutoAnalyze({ nodes, edges })}
            style={{ marginLeft: 'auto', padding: '5px 12px', borderRadius: 6, border: '1px solid #10b981', background: '#064e3b', color: '#6ee7b7', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            🤖 Analisis γ & β Otomatis
          </button>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={320} height={180}
        onClick={handleCanvasClick}
        style={{ display: 'block', background: '#0f172a', borderRadius: 6, cursor: mode === 'add' ? 'crosshair' : 'pointer', border: '1px solid #1e293b', width: '100%', maxWidth: 360 }}
      />
      {mode === 'connect' && connecting && (
        <p style={{ color: '#fbbf24', fontSize: 11, marginTop: 4 }}>Klik titik berikutnya untuk disambungkan dengan "{connecting}"</p>
      )}
      <p style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>
        {nodes.length} titik · {edges.length} sisi
      </p>
    </div>
  );
};

// ── Modal / Form Manajemen Paket Latihan ──
const PackageModal = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || {
    title: '',
    category: 'Representasi Matriks',
    difficulty: 'Beginner',
    target_questions: 10,
    icon: '📊',
    description: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = initial ? `${API}/admin/packages/${initial.id}` : `${API}/admin/packages`;
      const method = initial ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      onSave(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = { width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#f1f5f9', fontSize: 14, boxSizing: 'border-box', marginBottom: 12 };
  const labelStyle = { display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 4, fontWeight: 500 };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 16 }}>
      <form onSubmit={handleSubmit} style={{ background: '#0f172a', border: '1px solid #2563eb', borderRadius: 12, padding: 24, maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <h3 style={{ color: '#f1f5f9', fontSize: 18, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>{initial ? '✏️ Edit Paket Latihan' : '➕ Buat Paket Latihan Baru'}</span>
        </h3>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 16 }}>Tentukan klasifikasi topik, tingkat kesulitan, dan target soal objektif.</p>
        
        {error && <div style={{ background: '#450a0a', border: '1px solid #dc2626', color: '#fca5a5', padding: '8px 12px', borderRadius: 6, marginBottom: 12, fontSize: 13 }}>❌ {error}</div>}

        <label style={labelStyle}>Nama Latihan / Judul Paket *</label>
        <input style={inputStyle} value={form.title} placeholder="Contoh: Dasar Graph Matrix" onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={labelStyle}>Klasifikasi / Kategori Topik *</label>
            <input style={inputStyle} list="category-list" value={form.category} placeholder="Pilih atau ketik topik" onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required />
            <datalist id="category-list">
              {CATEGORY_SUGGESTIONS.map(c => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div>
            <label style={labelStyle}>Tingkat Kesulitan</label>
            <select style={inputStyle} value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}>
              <option value="Beginner">Beginner (Dasar)</option>
              <option value="Intermediate">Intermediate (Menengah)</option>
              <option value="Advanced">Advanced (Mahir)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={labelStyle}>Target Soal Objektif *</label>
            <input style={inputStyle} type="number" min="1" max="50" value={form.target_questions} onChange={e => setForm(f => ({ ...f, target_questions: parseInt(e.target.value) || 1 }))} required />
          </div>
          <div>
            <label style={labelStyle}>Ikon Pengenal</label>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input style={{ ...inputStyle, width: 60, textAlign: 'center', fontSize: 18 }} value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} maxLength={4} />
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {EMOJI_OPTIONS.map(em => (
                  <button key={em} type="button" onClick={() => setForm(f => ({ ...f, icon: em }))} style={{ border: 'none', background: form.icon === em ? '#2563eb' : '#1e293b', borderRadius: 4, padding: '3px 6px', cursor: 'pointer', fontSize: 14 }}>
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <label style={labelStyle}>Deskripsi / Petunjuk untuk Siswa</label>
        <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} placeholder="Tuliskan gambaran materi yang diuji dan tujuan pembelajaran..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
          <button type="button" onClick={onCancel} style={{ padding: '9px 18px', borderRadius: 6, border: '1px solid #475569', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 13 }}>
            Batal
          </button>
          <button type="submit" disabled={saving} style={{ padding: '9px 20px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
            {saving ? '⏳ Menyimpan...' : '💾 Simpan Paket'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ── Form Tambah / Edit Soal Terikat ke Paket ──
const QuestionForm = ({ activePackage, initial, onSave, onCancel }) => {
  const emptyForm = {
    package_id: activePackage.id,
    question_text: '',
    has_diagram: false,
    graph_data: '',
    options: ['', '', '', ''],
    correct_index: 0,
    explanation: ''
  };
  const [form, setForm] = useState(initial || emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAutoAnalyze = async (graphPayload) => {
    try {
      const res = await fetch(`${API}/admin/graph/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphPayload)
      });
      const data = await res.json();
      if (data.success) {
        setAnalysisResult(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
        package_id: activePackage.id,
        options: form.options,
        graph_data: form.has_diagram && form.graph_data ? JSON.parse(form.graph_data) : null
      };
      const url = initial ? `${API}/admin/questions/${initial.id}` : `${API}/admin/questions`;
      const method = initial ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      onSave();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#f1f5f9', fontSize: 14, boxSizing: 'border-box', marginBottom: 12 };
  const labelStyle = { display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 4, fontWeight: 500 };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#0f172a', border: '1px solid #2563eb', borderRadius: 12, padding: 22, marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, borderBottom: '1px solid #1e293b', paddingBottom: 10 }}>
        <div>
          <h3 style={{ color: '#f1f5f9', fontSize: 17, margin: 0 }}>
            {initial ? '✏️ Edit Soal' : '➕ Tambah Soal Baru'}
          </h3>
          <span style={{ fontSize: 12, color: '#60a5fa' }}>
            Paket: {activePackage.icon} {activePackage.title} ({activePackage.category})
          </span>
        </div>
        <button type="button" onClick={onCancel} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16 }}>✕</button>
      </div>

      {error && <p style={{ color: '#ef4444', marginBottom: 12, fontSize: 13 }}>❌ {error}</p>}

      <label style={labelStyle}>Teks Pertanyaan (Mendukung simbol rumus $...$)</label>
      <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} placeholder="Contoh: Berapa nilai bilangan dominasi γ(G) untuk graf lintasan P_6?" value={form.question_text}
        onChange={e => setForm(f => ({ ...f, question_text: e.target.value }))} required />

      <label style={{ ...labelStyle, marginTop: 4 }}>Pilihan Ganda & Tentukan Kunci Jawaban Benar:</label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        {['A', 'B', 'C', 'D'].map((letter, i) => (
          <div key={i} style={{ background: form.correct_index === i ? '#064e3b' : '#1e293b', border: `1px solid ${form.correct_index === i ? '#059669' : '#334155'}`, borderRadius: 8, padding: 10 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: form.correct_index === i ? '#34d399' : '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
              <input type="radio" name="correct_idx" checked={form.correct_index === i} onChange={() => setForm(f => ({ ...f, correct_index: i }))} />
              Opsi {letter} {form.correct_index === i && '✓ Kunci Benar'}
            </label>
            <input style={{ ...inputStyle, marginBottom: 0, background: '#0f172a' }} value={form.options[i]} placeholder={`Isi pilihan jawaban ${letter}`}
              onChange={e => setForm(f => { const o = [...f.options]; o[i] = e.target.value; return { ...f, options: o }; })} required />
          </div>
        ))}
      </div>

      <label style={labelStyle}>Pembahasan & Rujukan Teori Akademik</label>
      <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} placeholder="Jelaskan dasar rumus atau teorema kenapa jawaban tersebut benar..." value={form.explanation}
        onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))} required />

      <div style={{ marginBottom: 14 }}>
        <label style={{ ...labelStyle, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: '#1e293b', padding: '6px 12px', borderRadius: 6 }}>
          <input type="checkbox" checked={form.has_diagram} onChange={e => setForm(f => ({ ...f, has_diagram: e.target.checked }))} />
          <span>Sertakan Diagram Graf Visual pada Soal Ini</span>
        </label>
      </div>

      {form.has_diagram && (
        <div style={{ background: '#0a0f1e', border: '1px solid #1e3a8a', borderRadius: 8, padding: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ ...labelStyle, margin: 0, color: '#93c5fd' }}>Kanvas Interaktif Graf</label>
            <span style={{ fontSize: 11, color: '#64748b' }}>Klik titik & garis untuk menggambar</span>
          </div>
          <GraphCanvas
            value={form.graph_data}
            onChange={gj => setForm(f => ({ ...f, graph_data: gj }))}
            onAutoAnalyze={handleAutoAnalyze}
          />
          {analysisResult && (
            <div style={{ marginTop: 10, background: '#022c22', border: '1px solid #059669', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#6ee7b7' }}>
              <strong>Hasil Analisis Otomatis:</strong><br />
              • Bilangan Dominasi γ(G) = <strong>{analysisResult.domination_number}</strong> (Himpunan: {`{${analysisResult.domination_set.join(', ')}}`})<br />
              • Dimensi Metrik β(G) = <strong>{analysisResult.metric_dimension}</strong> (Resolving set: {`{${analysisResult.resolving_set.join(', ')}}`})<br />
              • Diameter Graf = {analysisResult.diameter}
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" disabled={saving}
          style={{ padding: '9px 24px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
          {saving ? '⏳ Menyimpan...' : '💾 Simpan Soal'}
        </button>
        <button type="button" onClick={onCancel}
          style={{ padding: '9px 18px', borderRadius: 6, border: '1px solid #475569', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 13 }}>
          Batal
        </button>
      </div>
    </form>
  );
};

// ── HALAMAN ADMIN UTAMA (Package-First Management) ──
const Admin = () => {
  const [packages, setPackages] = useState([]);
  const [activePackage, setActivePackage] = useState(null); // Jika null: View 1 (List Paket). Jika terisi: View 2 (Soal Paket)
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals & State
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletePackageConfirm, setDeletePackageConfirm] = useState(null);
  const [deleteQuestionConfirm, setDeleteQuestionConfirm] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

  // Tab Admin (Manajemen Paket vs Rekapitulasi Pelajar)
  const [adminTab, setAdminTab] = useState('packages'); // 'packages' | 'students'
  const [students, setStudents] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/packages`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setPackages(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsAndAttempts = async () => {
    try {
      setStudentsLoading(true);
      const [resUsers, resAttempts] = await Promise.all([
        fetch(`${API}/admin/users`),
        fetch(`${API}/admin/attempts`)
      ]);
      const dataUsers = await resUsers.json();
      const dataAttempts = await resAttempts.json();
      if (dataUsers.success) setStudents(dataUsers.data);
      if (dataAttempts.success) setAttempts(dataAttempts.data);
    } catch (err) {
      console.error('Error fetching students data:', err);
    } finally {
      setStudentsLoading(false);
    }
  };

  const fetchQuestionsForPackage = async (pkgId) => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/admin/questions?package_id=${pkgId}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setQuestions(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    fetchStudentsAndAttempts();
  }, []);

  const handleOpenPackage = (pkg) => {
    setActivePackage(pkg);
    setShowQuestionForm(false);
    setEditingQuestion(null);
    fetchQuestionsForPackage(pkg.id);
  };

  const handleBackToPackages = () => {
    setActivePackage(null);
    setQuestions([]);
    setShowQuestionForm(false);
    setEditingQuestion(null);
    fetchPackages();
  };

  const handleDeletePackage = async (pkgId) => {
    try {
      await fetch(`${API}/admin/packages/${pkgId}`, { method: 'DELETE' });
      setDeletePackageConfirm(null);
      fetchPackages();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteQuestion = async (qId) => {
    try {
      await fetch(`${API}/admin/questions/${qId}`, { method: 'DELETE' });
      setDeleteQuestionConfirm(null);
      fetchQuestionsForPackage(activePackage.id);
      fetchPackages();
    } catch (e) {
      console.error(e);
    }
  };

  const handlePackageSaved = (savedPkg) => {
    setShowPackageModal(false);
    setEditingPackage(null);
    fetchPackages();
    if (activePackage && activePackage.id === savedPkg.id) {
      setActivePackage(savedPkg);
    }
  };

  const handleQuestionSaved = () => {
    setShowQuestionForm(false);
    setEditingQuestion(null);
    fetchQuestionsForPackage(activePackage.id);
    fetchPackages();
  };

  // Filter categories
  const categories = Array.from(new Set(packages.map(p => p.category).filter(Boolean)));
  const filteredPackages = selectedCategoryFilter 
    ? packages.filter(p => p.category === selectedCategoryFilter) 
    : packages;

  const totalQuestionsAll = packages.reduce((acc, p) => acc + (p.question_count || 0), 0);

  return (
    <div style={{ minHeight: '100vh', background: '#060a12', color: '#f1f5f9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      <main style={{ maxWidth: 1160, margin: '0 auto', padding: '2rem 1.5rem' }}>
        
        {/* Tab Navigasi Admin */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, borderBottom: '1px solid #1e293b', paddingBottom: 14 }}>
          <button
            onClick={() => { setAdminTab('packages'); setActivePackage(null); }}
            style={{
              padding: '9px 18px',
              borderRadius: 8,
              border: 'none',
              background: adminTab === 'packages' ? '#2563eb' : '#0f172a',
              color: adminTab === 'packages' ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.15s ease'
            }}
          >
            <span>📦 Manajemen Paket & Soal</span>
          </button>
          <button
            onClick={() => { setAdminTab('students'); setActivePackage(null); fetchStudentsAndAttempts(); }}
            style={{
              padding: '9px 18px',
              borderRadius: 8,
              border: 'none',
              background: adminTab === 'students' ? '#2563eb' : '#0f172a',
              color: adminTab === 'students' ? '#fff' : '#94a3b8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.15s ease'
            }}
          >
            <span>👥 Rekapitulasi Pelajar & Nilai ({attempts.length})</span>
          </button>
        </div>

        {adminTab === 'packages' && (
          <>
            {/* ── JIKA DI VIEW 1: OVERVIEW PAKET LATIHAN ── */}
            {!activePackage && (
              <>
            {/* Header Admin */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>🎓 Manajemen Paket Latihan Graf</span>
                </h1>
                <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
                  Kelola struktur paket soal latihan, klasifikasi materi, dan tetapkan target soal objektif.
                </p>
              </div>
              <button 
                onClick={() => { setEditingPackage(null); setShowPackageModal(true); }}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
              >
                <span>➕ Buat Paket Latihan Baru</span>
              </button>
            </div>

            {/* Statistik Ringkas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 24 }}>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 16 }}>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>Total Paket Aktif</span>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', marginTop: 4 }}>{packages.length} Paket</div>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 16 }}>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>Total Soal di Bank Data</span>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#38bdf8', marginTop: 4 }}>{totalQuestionsAll} Butir Soal</div>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 16 }}>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>Rata-rata Target per Paket</span>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#34d399', marginTop: 4 }}>10 Soal Objektif</div>
              </div>
            </div>

            {/* Filter Klasifikasi / Kategori */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: '#64748b', fontSize: 13, marginRight: 4 }}>Klasifikasi:</span>
              <button 
                onClick={() => setSelectedCategoryFilter('')}
                style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid #334155', background: !selectedCategoryFilter ? '#2563eb' : '#0f172a', color: '#f8fafc', cursor: 'pointer', fontSize: 12 }}
              >
                Semua Topik ({packages.length})
              </button>
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategoryFilter(cat)}
                  style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid #334155', background: selectedCategoryFilter === cat ? '#2563eb' : '#0f172a', color: '#f8fafc', cursor: 'pointer', fontSize: 12 }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Kartu Paket */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>⏳ Memuat paket latihan...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
                {filteredPackages.map(pkg => {
                  const target = pkg.target_questions || 10;
                  const count = pkg.question_count || 0;
                  const isComplete = count >= target;
                  const diffStyle = DIFF_COLORS[pkg.difficulty] || DIFF_COLORS.Beginner;
                  const progressPct = Math.min(Math.round((count / target) * 100), 100);

                  return (
                    <div 
                      key={pkg.id} 
                      style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', transition: 'transform 0.15s, border-color 0.15s' }}
                    >
                      {/* Top Badges */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 24 }}>{pkg.icon}</span>
                          <div>
                            <span style={{ fontSize: 11, background: '#1e293b', color: '#93c5fd', padding: '2px 8px', borderRadius: 10, fontWeight: 500 }}>
                              {pkg.category || 'Teori Graf'}
                            </span>
                          </div>
                        </div>
                        <span style={{ fontSize: 11, background: diffStyle.bg, color: diffStyle.text, border: `1px solid ${diffStyle.border}`, padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                          {pkg.difficulty}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 style={{ fontSize: 17, fontWeight: 600, color: '#f8fafc', margin: '0 0 6px 0' }}>{pkg.title}</h3>
                      <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.4, margin: '0 0 16px 0', flex: 1 }}>{pkg.description || 'Tidak ada deskripsi.'}</p>

                      {/* Progress Bar & Status Soal */}
                      <div style={{ background: '#0a0f1e', borderRadius: 8, padding: 12, border: '1px solid #1e293b', marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                          <span style={{ color: '#94a3b8' }}>Progres Soal Objektif</span>
                          <span style={{ fontWeight: 600, color: isComplete ? '#34d399' : '#fde047' }}>
                            {count} / {target} Butir
                          </span>
                        </div>
                        <div style={{ width: '100%', height: 6, background: '#1e293b', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${progressPct}%`, height: '100%', background: isComplete ? '#10b981' : '#f59e0b', borderRadius: 3 }} />
                        </div>
                        <div style={{ marginTop: 6, fontSize: 11, display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: isComplete ? '#34d399' : '#fbbf24' }}>
                            {isComplete ? '🟢 Siap Rilis (Lengkap)' : `🟡 Draft (Kurang ${target - count} soal)`}
                          </span>
                          <span style={{ color: '#64748b' }}>{progressPct}%</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button 
                          onClick={() => handleOpenPackage(pkg)}
                          style={{ flex: 1, padding: '9px 14px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                        >
                          <span>📝 Kelola Soal</span>
                        </button>
                        <button 
                          onClick={() => { setEditingPackage(pkg); setShowPackageModal(true); }}
                          title="Edit Paket"
                          style={{ padding: '9px 12px', borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#94a3b8', cursor: 'pointer', fontSize: 13 }}
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => setDeletePackageConfirm(pkg.id)}
                          title="Hapus Paket"
                          style={{ padding: '9px 12px', borderRadius: 6, border: '1px solid #7f1d1d', background: '#1e293b', color: '#f87171', cursor: 'pointer', fontSize: 13 }}
                        >
                          🗑️
                        </button>
                      </div>

                      {/* Konfirmasi Hapus Paket */}
                      {deletePackageConfirm === pkg.id && (
                        <div style={{ marginTop: 12, padding: 10, background: '#450a0a', border: '1px solid #dc2626', borderRadius: 6, fontSize: 12 }}>
                          <p style={{ color: '#fca5a5', margin: '0 0 8px 0' }}>⚠️ Hapus paket "{pkg.title}" dan seluruh {count} soalnya?</p>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button onClick={() => handleDeletePackage(pkg.id)} style={{ padding: '4px 10px', borderRadius: 4, border: 'none', background: '#dc2626', color: '#fff', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>Ya, Hapus</button>
                            <button onClick={() => setDeletePackageConfirm(null)} style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid #7f1d1d', background: 'transparent', color: '#fca5a5', cursor: 'pointer', fontSize: 11 }}>Batal</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── JIKA DI VIEW 2: RUANG KERJA SOAL DALAM PAKET (Package Workspace) ── */}
        {activePackage && (
          <div>
            {/* Top Navigation Back */}
            <button 
              onClick={handleBackToPackages}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#94a3b8', cursor: 'pointer', fontSize: 13, marginBottom: 18 }}
            >
              <span>← Kembali ke Semua Paket Latihan</span>
            </button>

            {/* Banner Paket Aktif */}
            <div style={{ background: '#0f172a', border: '1px solid #2563eb', borderRadius: 12, padding: 22, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span style={{ fontSize: 36 }}>{activePackage.icon}</span>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, background: '#1e3a8a', color: '#93c5fd', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                        {activePackage.category}
                      </span>
                      <span style={{ fontSize: 11, background: DIFF_COLORS[activePackage.difficulty]?.bg, color: DIFF_COLORS[activePackage.difficulty]?.text, padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                        {activePackage.difficulty}
                      </span>
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 4px 0' }}>{activePackage.title}</h2>
                    <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{activePackage.description}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>Status Kelengkapan:</span>
                    <div style={{ fontSize: 15, fontWeight: 700, color: questions.length >= (activePackage.target_questions || 10) ? '#34d399' : '#fbbf24' }}>
                      {questions.length} / {activePackage.target_questions || 10} Soal Terisi
                    </div>
                  </div>
                  <button 
                    onClick={() => { setEditingQuestion(null); setShowQuestionForm(true); }}
                    style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <span>➕ Tambah Soal #{questions.length + 1}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Form Tambah/Edit Soal jika aktif */}
            {(showQuestionForm || editingQuestion) && (
              <QuestionForm
                activePackage={activePackage}
                initial={editingQuestion ? { ...editingQuestion, graph_data: editingQuestion.graph_data ? JSON.stringify(editingQuestion.graph_data) : '' } : null}
                onSave={handleQuestionSaved}
                onCancel={() => { setShowQuestionForm(false); setEditingQuestion(null); }}
              />
            )}

            {/* Daftar Soal dalam Paket */}
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                Daftar Butir Soal ({questions.length} Soal)
              </h3>
              <span style={{ fontSize: 12, color: '#64748b' }}>
                Target: {activePackage.target_questions || 10} soal objektif
              </span>
            </div>

            {loading ? (
              <p style={{ color: '#64748b' }}>⏳ Memuat daftar soal...</p>
            ) : questions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: '#0f172a', borderRadius: 12, border: '1px dashed #334155', color: '#94a3b8' }}>
                <p style={{ fontSize: 16, marginBottom: 12 }}>Belum ada soal pada paket ini.</p>
                <button 
                  onClick={() => { setEditingQuestion(null); setShowQuestionForm(true); }}
                  style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
                >
                  ➕ Tambah Soal Pertama
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {questions.map((q, idx) => (
                  <div key={q.id} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <span style={{ background: '#1e293b', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: '#60a5fa' }}>
                            Soal #{idx + 1}
                          </span>
                          {q.has_diagram ? (
                            <span style={{ fontSize: 11, background: '#064e3b', color: '#34d399', padding: '1px 8px', borderRadius: 8 }}>
                              📊 Memiliki Diagram Graf
                            </span>
                          ) : null}
                        </div>

                        <p style={{ color: '#f8fafc', fontSize: 14, lineHeight: 1.5, margin: '0 0 12px 0', fontWeight: 500 }}>
                          {q.question_text}
                        </p>

                        {/* Opsi Jawaban */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8, marginBottom: 12 }}>
                          {q.options.map((opt, i) => (
                            <div key={i} style={{
                              padding: '6px 12px', borderRadius: 6, fontSize: 13,
                              background: q.correct_index === i ? '#064e3b' : '#0a0f1e',
                              border: `1px solid ${q.correct_index === i ? '#059669' : '#1e293b'}`,
                              color: q.correct_index === i ? '#34d399' : '#94a3b8'
                            }}>
                              <strong>{String.fromCharCode(65 + i)}.</strong> {opt} {q.correct_index === i && '✓ (Kunci)'}
                            </div>
                          ))}
                        </div>

                        {/* Pembahasan */}
                        <div style={{ background: '#0a0f1e', borderLeft: '3px solid #f59e0b', padding: '8px 12px', borderRadius: 4 }}>
                          <span style={{ fontSize: 12, color: '#d97706', fontWeight: 600 }}>💡 Pembahasan: </span>
                          <span style={{ fontSize: 12, color: '#94a3b8' }}>{q.explanation}</span>
                        </div>
                      </div>

                      {/* Tombol Aksi Soal */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <button 
                          onClick={() => { setEditingQuestion(q); setShowQuestionForm(false); }}
                          style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#7dd3fc', cursor: 'pointer', fontSize: 12 }}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => setDeleteQuestionConfirm(q.id)}
                          style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #7f1d1d', background: '#1e293b', color: '#f87171', cursor: 'pointer', fontSize: 12 }}
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </div>

                    {/* Konfirmasi Hapus Soal */}
                    {deleteQuestionConfirm === q.id && (
                      <div style={{ marginTop: 12, padding: 10, background: '#450a0a', border: '1px solid #dc2626', borderRadius: 6, fontSize: 12 }}>
                        <p style={{ color: '#fca5a5', margin: '0 0 8px 0' }}>⚠️ Hapus soal nomor #{idx + 1} ini secara permanen?</p>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => handleDeleteQuestion(q.id)} style={{ padding: '4px 10px', borderRadius: 4, border: 'none', background: '#dc2626', color: '#fff', cursor: 'pointer', fontSize: 11, fontWeight: 600 }}>Ya, Hapus</button>
                          <button onClick={() => setDeleteQuestionConfirm(null)} style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid #7f1d1d', background: 'transparent', color: '#fca5a5', cursor: 'pointer', fontSize: 11 }}>Batal</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        </>
        )}

        {/* ── JIKA DI VIEW 2: REKAPITULASI PELAJAR & HASIL EVALUASI ── */}
        {adminTab === 'students' && (
          <div>
            {/* Header Pelajar */}
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>👥 Rekapitulasi Pelajar & Hasil Evaluasi</span>
              </h1>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>
                Pantau seluruh aktivitas latihan, rekam jejak nilai kuis, dan data pelajar terdaftar secara real-time.
              </p>
            </div>

            {/* Statistik Ringkas Pelajar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 28 }}>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 18 }}>
                <span style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', fontFamily: 'monospace' }}>Total Pelajar Terdaftar</span>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#f8fafc', marginTop: 4 }}>{students.length} Siswa</div>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 18 }}>
                <span style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', fontFamily: 'monospace' }}>Sesi Latihan Diselesaikan</span>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#38bdf8', marginTop: 4 }}>{attempts.length} Kali Selesai</div>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 18 }}>
                <span style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', fontFamily: 'monospace' }}>Rata-rata Skor Keseluruhan</span>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#34d399', marginTop: 4 }}>
                  {attempts.length > 0 ? Math.round(attempts.reduce((a, c) => a + c.score, 0) / attempts.length) : 0}%
                </div>
              </div>
            </div>

            {/* Tabel 1: Log Pengerjaan Kuis Siswa Terbaru */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: 22, marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                  📝 Log Riwayat Pengerjaan Kuis Terbaru
                </h3>
                <span style={{ fontSize: 12, color: '#64748b' }}>{attempts.length} Catatan Nilai</span>
              </div>

              {studentsLoading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>⏳ Memuat data riwayat...</div>
              ) : attempts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b', border: '1px dashed #1e293b', borderRadius: 8 }}>
                  Belum ada siswa yang menyelesaikan latihan kuis.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                        <th style={{ padding: '10px 12px' }}>Waktu Selesai</th>
                        <th style={{ padding: '10px 12px' }}>Nama Pelajar</th>
                        <th style={{ padding: '10px 12px' }}>Modul Latihan</th>
                        <th style={{ padding: '10px 12px' }}>Hasil Nilai</th>
                        <th style={{ padding: '10px 12px' }}>Ketepatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attempts.map(at => {
                        const isPass = at.score >= 70;
                        return (
                          <tr key={at.id} style={{ borderBottom: '1px solid #1e293b' }}>
                            <td style={{ padding: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>
                              {new Date(at.completed_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                            </td>
                            <td style={{ padding: '12px' }}>
                              <strong style={{ color: '#f8fafc', display: 'block' }}>{at.student_name}</strong>
                              <span style={{ color: '#64748b', fontSize: 11 }}>{at.student_email}</span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ color: '#38bdf8', fontWeight: 600 }}>{at.package_title}</span>
                              <span style={{ display: 'block', fontSize: 11, color: '#64748b' }}>{at.package_category}</span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <span style={{
                                padding: '4px 10px',
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 700,
                                background: isPass ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                                color: isPass ? '#34d399' : '#fb7185',
                                border: `1px solid ${isPass ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`
                              }}>
                                {at.score}% ({isPass ? 'Lulus' : 'Remedial'})
                              </span>
                            </td>
                            <td style={{ padding: '12px', color: '#94a3b8' }}>
                              {at.correct_count} / {at.total_questions} Benar
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Tabel 2: Daftar Akun Pelajar Terdaftar */}
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#f8fafc', margin: 0 }}>
                  🎓 Daftar Akun Pelajar Terdaftar
                </h3>
                <span style={{ fontSize: 12, color: '#64748b' }}>{students.length} Pelajar</span>
              </div>

              {students.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Belum ada akun pelajar yang terdaftar.</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                        <th style={{ padding: '10px 12px' }}>Nama Pelajar</th>
                        <th style={{ padding: '10px 12px' }}>Email</th>
                        <th style={{ padding: '10px 12px' }}>Tanggal Bergabung</th>
                        <th style={{ padding: '10px 12px' }}>Kuis Diselesaikan</th>
                        <th style={{ padding: '10px 12px' }}>Rata-rata Nilai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(std => (
                        <tr key={std.id} style={{ borderBottom: '1px solid #1e293b' }}>
                          <td style={{ padding: '12px', color: '#f8fafc', fontWeight: 600 }}>{std.name}</td>
                          <td style={{ padding: '12px', color: '#94a3b8' }}>{std.email}</td>
                          <td style={{ padding: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                            {new Date(std.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                          </td>
                          <td style={{ padding: '12px', color: '#38bdf8', fontWeight: 600 }}>
                            {std.attempts_count || 0} Sesi
                          </td>
                          <td style={{ padding: '12px', color: (std.avg_score || 0) >= 70 ? '#34d399' : '#fde047', fontWeight: 700 }}>
                            {std.avg_score !== null ? `${std.avg_score}%` : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal Buat / Edit Paket */}
      {showPackageModal && (
        <PackageModal
          initial={editingPackage}
          onSave={handlePackageSaved}
          onCancel={() => { setShowPackageModal(false); setEditingPackage(null); }}
        />
      )}
    </div>
  );
};

export default Admin;
