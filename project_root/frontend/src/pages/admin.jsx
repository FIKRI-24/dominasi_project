import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

const API = 'http://localhost:5000/api';

const DIFF_COLORS = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#ef4444' };

// ── Komponen canvas interaktif untuk input graph JSON ──
const GraphCanvas = ({ value, onChange }) => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [connecting, setConnecting] = useState(null); // id node yang sedang dipilih untuk disambungkan
  const [mode, setMode] = useState('add'); // 'add' | 'connect' | 'delete'

  // Sync from external value (JSON string)
  useEffect(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (parsed.nodes) setNodes(parsed.nodes);
        if (parsed.edges) setEdges(parsed.edges);
      } catch (e) {}
    }
  }, []);

  // Sync ke parent setiap nodes/edges berubah
  useEffect(() => {
    const graphJson = JSON.stringify({ viewBox: { width: 320, height: 200 }, nodes, edges });
    onChange(graphJson);
  }, [nodes, edges]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw edges
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
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
      ctx.fillStyle = connecting === node.id ? '#fbbf24' : '#fff';
      ctx.fill();
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = '#1e40af';
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
    <div style={{ border: '1px solid #334155', borderRadius: 8, padding: 12, background: '#0f172a' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        {['add', 'connect', 'delete'].map(m => (
          <button key={m} onClick={() => { setMode(m); setConnecting(null); }}
            style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #475569', background: mode === m ? '#1e40af' : '#1e293b', color: '#fff', cursor: 'pointer', fontSize: 12 }}>
            {m === 'add' ? '➕ Tambah Titik' : m === 'connect' ? '🔗 Hubungkan' : '🗑️ Hapus'}
          </button>
        ))}
        <button onClick={clearAll} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #ef4444', background: '#1e293b', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}>🧹 Reset</button>
      </div>
      <canvas
        ref={canvasRef}
        width={320} height={200}
        onClick={handleCanvasClick}
        style={{ display: 'block', background: '#1e293b', borderRadius: 6, cursor: mode === 'add' ? 'crosshair' : 'pointer' }}
      />
      {mode === 'connect' && connecting && (
        <p style={{ color: '#fbbf24', fontSize: 11, marginTop: 4 }}>Klik titik tujuan untuk disambungkan dengan "{connecting}"</p>
      )}
      <p style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>
        {nodes.length} titik · {edges.length} sisi
      </p>
    </div>
  );
};

// ── Form Tambah / Edit Soal ──
const QuestionForm = ({ packages, initial, onSave, onCancel }) => {
  const emptyForm = {
    package_id: packages[0]?.id || 1,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...form,
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
  const labelStyle = { display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 4 };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#0f172a', border: '1px solid #1e40af', borderRadius: 12, padding: 24 }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: 16 }}>{initial ? '✏️ Edit Soal' : '➕ Tambah Soal Baru'}</h3>
      {error && <p style={{ color: '#ef4444', marginBottom: 12, fontSize: 13 }}>❌ {error}</p>}
      
      <label style={labelStyle}>Paket</label>
      <select style={inputStyle} value={form.package_id} onChange={e => setForm(f => ({ ...f, package_id: parseInt(e.target.value) }))}>
        {packages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
      </select>

      <label style={labelStyle}>Teks Soal</label>
      <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.question_text}
        onChange={e => setForm(f => ({ ...f, question_text: e.target.value }))} required />

      {['A', 'B', 'C', 'D'].map((letter, i) => (
        <div key={i}>
          <label style={labelStyle}>
            <input type="radio" name="correct" checked={form.correct_index === i} onChange={() => setForm(f => ({ ...f, correct_index: i }))} style={{ marginRight: 6 }} />
            Opsi {letter} {form.correct_index === i ? '✅ (Jawaban Benar)' : ''}
          </label>
          <input style={inputStyle} value={form.options[i]}
            onChange={e => setForm(f => { const o = [...f.options]; o[i] = e.target.value; return { ...f, options: o }; })} required />
        </div>
      ))}

      <label style={labelStyle}>Penjelasan / Pembahasan</label>
      <textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.explanation}
        onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))} required />

      <div style={{ marginBottom: 12 }}>
        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={form.has_diagram} onChange={e => setForm(f => ({ ...f, has_diagram: e.target.checked }))} />
          <span>Soal memiliki diagram graf</span>
        </label>
      </div>

      {form.has_diagram && (
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Builder Graf Interaktif</label>
          <GraphCanvas
            value={form.graph_data}
            onChange={gj => setForm(f => ({ ...f, graph_data: gj }))}
          />
          <label style={{ ...labelStyle, marginTop: 8 }}>JSON Graf (auto-generated)</label>
          <textarea style={{ ...inputStyle, minHeight: 60, fontSize: 11, color: '#7dd3fc' }} value={form.graph_data}
            onChange={e => setForm(f => ({ ...f, graph_data: e.target.value }))} />
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button type="submit" disabled={saving}
          style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#1d4ed8', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
          {saving ? '⏳ Menyimpan...' : '💾 Simpan'}
        </button>
        <button type="button" onClick={onCancel}
          style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid #475569', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
          Batal
        </button>
      </div>
    </form>
  );
};

// ── Halaman Admin Utama ──
const Admin = () => {
  const [packages, setPackages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filterPkg, setFilterPkg] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingQ, setEditingQ] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchPackages = async () => {
    const res = await fetch(`${API}/packages`);
    const data = await res.json();
    setPackages(data.data);
  };

  const fetchQuestions = async (pkgId = '') => {
    setLoading(true);
    try {
      const url = `${API}/admin/questions${pkgId ? `?package_id=${pkgId}` : ''}`;
      const res = await fetch(url);
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
    fetchQuestions();
  }, []);

  const handleFilter = (pkgId) => {
    setFilterPkg(pkgId);
    fetchQuestions(pkgId);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/admin/questions/${id}`, { method: 'DELETE' });
    setDeleteConfirm(null);
    fetchQuestions(filterPkg);
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditingQ(null);
    fetchQuestions(filterPkg);
  };

  const containerStyle = { minHeight: '100vh', background: '#0a0f1e', color: '#f1f5f9', fontFamily: 'Inter, sans-serif' };
  const cardStyle = { background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: 20, marginBottom: 16 };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ color: '#f1f5f9', fontSize: 26, fontWeight: 700 }}>🎓 Admin Dashboard</h1>
            <p style={{ color: '#64748b', marginTop: 4 }}>Manajemen Bank Soal Graf & Teori Dominasi</p>
          </div>
          <button onClick={() => { setShowForm(true); setEditingQ(null); }}
            style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#1d4ed8', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
            ➕ Tambah Soal
          </button>
        </div>

        {/* Filter paket */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={() => handleFilter('')}
            style={{ padding: '6px 16px', borderRadius: 20, border: '1px solid #475569', background: !filterPkg ? '#1e40af' : 'transparent', color: '#f1f5f9', cursor: 'pointer', fontSize: 13 }}>
            Semua ({questions.length})
          </button>
          {packages.map(p => (
            <button key={p.id} onClick={() => handleFilter(p.id)}
              style={{ padding: '6px 16px', borderRadius: 20, border: '1px solid #475569', background: filterPkg == p.id ? '#1e40af' : 'transparent', color: '#f1f5f9', cursor: 'pointer', fontSize: 13 }}>
              {p.icon} {p.title} ({p.question_count})
            </button>
          ))}
        </div>

        {/* Form tambah / edit */}
        {(showForm || editingQ) && (
          <div style={{ marginBottom: 24 }}>
            <QuestionForm
              packages={packages}
              initial={editingQ ? { ...editingQ, graph_data: editingQ.graph_data ? JSON.stringify(editingQ.graph_data) : '' } : null}
              onSave={handleSaved}
              onCancel={() => { setShowForm(false); setEditingQ(null); }}
            />
          </div>
        )}

        {/* Daftar soal */}
        {error && <p style={{ color: '#ef4444' }}>❌ {error}</p>}
        {loading ? (
          <p style={{ color: '#64748b' }}>⏳ Memuat soal...</p>
        ) : (
          questions.map((q, idx) => (
            <div key={q.id} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ background: '#1e293b', padding: '2px 10px', borderRadius: 12, fontSize: 11, color: '#7dd3fc' }}>#{idx + 1}</span>
                    <span style={{ fontSize: 11, color: DIFF_COLORS[q.package_slug] || '#64748b' }}>{q.package_title}</span>
                    {q.has_diagram ? <span style={{ fontSize: 11, background: '#134e4a', padding: '1px 8px', borderRadius: 10, color: '#34d399' }}>📊 Graf</span> : null}
                  </div>
                  <p style={{ color: '#e2e8f0', marginBottom: 10, lineHeight: 1.5, fontSize: 14 }}>{q.question_text}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
                    {q.options.map((opt, i) => (
                      <div key={i} style={{
                        padding: '5px 10px', borderRadius: 6, fontSize: 13,
                        background: q.correct_index === i ? '#052e16' : '#1e293b',
                        border: `1px solid ${q.correct_index === i ? '#16a34a' : '#334155'}`,
                        color: q.correct_index === i ? '#4ade80' : '#94a3b8'
                      }}>
                        {String.fromCharCode(65 + i)}. {opt} {q.correct_index === i ? '✓' : ''}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#1e293b', borderLeft: '3px solid #f59e0b', padding: '6px 10px', borderRadius: 4 }}>
                    <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>💡 {q.explanation}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <button onClick={() => { setEditingQ(q); setShowForm(false); }}
                    style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#7dd3fc', cursor: 'pointer', fontSize: 12 }}>✏️ Edit</button>
                  <button onClick={() => setDeleteConfirm(q.id)}
                    style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #7f1d1d', background: '#1e293b', color: '#f87171', cursor: 'pointer', fontSize: 12 }}>🗑️ Hapus</button>
                </div>
              </div>
              {/* Konfirmasi hapus */}
              {deleteConfirm === q.id && (
                <div style={{ marginTop: 10, padding: '10px 14px', background: '#1e293b', borderRadius: 8, border: '1px solid #ef4444' }}>
                  <p style={{ color: '#fca5a5', fontSize: 13, marginBottom: 8 }}>⚠️ Hapus soal ini permanen?</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleDelete(q.id)}
                      style={{ padding: '5px 14px', borderRadius: 6, border: 'none', background: '#b91c1c', color: '#fff', cursor: 'pointer', fontSize: 12 }}>Ya, Hapus</button>
                    <button onClick={() => setDeleteConfirm(null)}
                      style={{ padding: '5px 14px', borderRadius: 6, border: '1px solid #475569', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: 12 }}>Batal</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
