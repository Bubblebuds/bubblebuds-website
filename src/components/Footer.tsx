import { Facebook, Instagram, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';

const TiktokIcon = ({ size = 24, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  const { getSetting } = useSettings();

  const brandName = getSetting('brand_name', 'Bubblebuds Babyspa');
  const footerDescription = getSetting('footer_description', 'Nurturing with love and care.');
  const tiktokUrl = getSetting('tiktok_url', '#');
  const instagramUrl = getSetting('instagram_url', '#');
  const facebookUrl = getSetting('facebook_url', '#');

  return (
    <footer className="w-full rounded-t-[3rem] mt-16 bg-surface-container-low border-t border-surface-container-high transition-all duration-200">
      <div className="flex flex-col items-center py-12 px-6 text-center space-y-6 max-w-7xl mx-auto relative">
        <Link to="/admin" className="absolute top-6 right-6 text-outline hover:text-primary transition-colors">
          <Lock size={16} />
        </Link>
        <div className="flex items-center justify-center">
          <Link to="/">
            <img 
              alt={brandName}
              className="h-16 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/ADBb0ugBrQrvLho_R6FjOoZ0ooWr06AWhPhAC1kcomBqecPvcUWPux3R_jIQOwCC2mkvNz7caNVV2HgBtxdRwtIF0RUrvS46nYS6jZh80tW-vPMvjQqnJfxYFn5gia7mOOKdt23MN7jgOs77P_pezTAmWVgkAMCLjrpg9HhQ_WA8VIXHOqO0dAq7Z0KNs2-cmNxxcNvXF5fSF4N0wyTJJsxca7-Ro-xEVMD-uIh7co-F8HwJiOLwo1YAIBc5bFbVje7fF0fs_69tP-1fpg"
            />
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed text-on-surface-variant hover:text-primary underline-offset-4 hover:underline" to="/profil">Tentang Kami</Link>
          <Link className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed text-on-surface-variant hover:text-primary underline-offset-4 hover:underline" to="/#layanan">Layanan</Link>
          <Link className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed text-on-surface-variant hover:text-primary underline-offset-4 hover:underline" to="/artikel">Blog Kesehatan</Link>
          <Link className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed text-on-surface-variant hover:text-primary underline-offset-4 hover:underline" to="/lokasi">Kontak</Link>
          <Link className="font-['Plus_Jakarta_Sans'] text-sm leading-relaxed text-on-surface-variant hover:text-primary underline-offset-4 hover:underline" to="#">Kebijakan Privasi</Link>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-primary-container/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
            <Facebook size={20} />
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-primary-container/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
            <Instagram size={20} />
          </a>
          <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-11 h-11 rounded-full bg-primary-container/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
            <TiktokIcon size={20} />
          </a>
        </div>
        <div className="text-primary font-['Plus_Jakarta_Sans'] text-sm leading-relaxed pt-6 border-t border-primary-container/30 w-full max-w-md mt-6">
          © {new Date().getFullYear()} {brandName}. {footerDescription}
        </div>
      </div>
    </footer>
  );
}
