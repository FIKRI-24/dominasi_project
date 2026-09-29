import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Halaman
import Beranda from './pages/beranda';
import Materi from './pages/materi';
import Contoh from './pages/contoh';
import Coba from './pages/coba';
import Latihan from './pages/latihan';
import Login from './pages/login';
import Admin from './pages/admin';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/materi" element={<Materi />} />
        <Route path="/contoh" element={<Contoh />} />
        <Route path="/coba" element={<Coba />} />
        <Route path="/latihan" element={<Latihan />} />
         <Route path="/login" element={<Login />} />
         <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
