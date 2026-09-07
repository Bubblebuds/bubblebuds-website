import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Lokasi from './pages/Lokasi';
import Artikel from './pages/Artikel';
import ArtikelDetail from './pages/ArtikelDetail';
import Reservasi from './pages/Reservasi';
import Admin from './pages/Admin';
import AdSidebar from './components/AdSidebar';
import AdBanner320 from './components/AdBanner320';
import AdBanner468 from './components/AdBanner468';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AdSidebar />
        <main className="flex-grow pt-36">
          <div className="max-w-7xl mx-auto">
            {/* Top banner displayed on desktop (468) or mobile (320) */}
            <AdBanner468 />
            <div className="sm:hidden">
              <AdBanner320 />
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/lokasi" element={<Lokasi />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/artikel/:id" element={<ArtikelDetail />} />
            <Route path="/reservasi" element={<Reservasi />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <div className="border-t border-gray-100 bg-gray-50/30">
          <AdBanner320 />
        </div>
        <Footer />
      </div>
    </Router>
  );
}
