import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faProjectDiagram, faHome, faBook, faPlayCircle,
  faPenFancy, faTasks, faArrowRight, faPlay,
  faBookOpen, faGamepad, faPencilRuler, faChevronRight
} from '@fortawesome/free-solid-svg-icons';

// Halaman
import Beranda from './pages/beranda';
import Materi from './pages/materi';
import Contoh from './pages/contoh';
import Coba from './pages/coba';
import Latihan from './pages/latihan';
import Login from './pages/login';



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
      </Routes>
    </Router>
  );
}

export default App;
