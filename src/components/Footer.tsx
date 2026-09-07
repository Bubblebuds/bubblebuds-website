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

const WhatsappIcon = ({ size = 24, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Footer() {
  const { getSetting } = useSettings();

  const brandName = getSetting('brand_name', 'Bubblebuds Babyspa');
  const footerDescription = getSetting('footer_description', 'Nurturing with love and care.');
  const tiktokUrl = getSetting('tiktok_url', '#');
  const instagramUrl = getSetting('instagram_url', '#');
  const facebookUrl = getSetting('facebook_url', '#');
  const whatsappNumber = getSetting('whatsapp_number', '085134363262');
  
  const cleanWaNumber = whatsappNumber.replace(/\D/g, '');
  const waUrl = cleanWaNumber.startsWith('0') ? `https://wa.me/62${cleanWaNumber.slice(1)}` : `https://wa.me/${cleanWaNumber}`;

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
              src="/logo.png"
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
          <a href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-11 h-11 rounded-full bg-primary-container/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
            <WhatsappIcon size={20} />
          </a>
        </div>
        <div className="text-primary font-['Plus_Jakarta_Sans'] text-sm leading-relaxed pt-6 border-t border-primary-container/30 w-full max-w-md mt-6">
          © {new Date().getFullYear()} {brandName}. {footerDescription}
        </div>
      </div>
    </footer>
  );
}
