import { NavLink, Link } from 'react-router-dom';
import { Baby } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      "font-[Plus_Jakarta_Sans] font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5",
      isActive
        ? "text-primary border-b-2 border-primary pb-1"
        : "text-on-surface-variant hover:text-primary"
    );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 min-h-[6rem] bg-white/60 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(118,215,196,0.3)] transition-all duration-300">
      <div className="flex justify-between items-center w-full px-8 max-w-7xl mx-auto py-2">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="https://lh3.googleusercontent.com/aida/ADBb0ugBrQrvLho_R6FjOoZ0ooWr06AWhPhAC1kcomBqecPvcUWPux3R_jIQOwCC2mkvNz7caNVV2HgBtxdRwtIF0RUrvS46nYS6jZh80tW-vPMvjQqnJfxYFn5gia7mOOKdt23MN7jgOs77P_pezTAmWVgkAMCLjrpg9HhQ_WA8VIXHOqO0dAq7Z0KNs2-cmNxxcNvXF5fSF4N0wyTJJsxca7-Ro-xEVMD-uIh7co-F8HwJiOLwo1YAIBc5bFbVje7fF0fs_69tP-1fpg" 
            alt="Bubblebuds Babyspa" 
            className="h-20 w-auto object-contain"
          />
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink to="/" className={navLinkClass}>Beranda</NavLink>
          <NavLink to="/profil" className={navLinkClass}>Profil</NavLink>
          <NavLink to="/lokasi" className={navLinkClass}>Lokasi</NavLink>
          <NavLink to="/artikel" className={navLinkClass}>Artikel</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/reservasi"
            className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-['Lexend'] text-[12px] font-semibold tracking-wider hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            Reservasi
            <Baby size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
