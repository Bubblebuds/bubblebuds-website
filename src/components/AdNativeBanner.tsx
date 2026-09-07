import { useState } from 'react';
import { X } from 'lucide-react';

export default function AdNativeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="flex justify-center my-8 overflow-hidden w-full px-4">
      <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-pink-100 flex flex-col items-center max-w-[600px] w-full">
        <div className="w-full flex justify-between items-center mb-3">
          <span className="text-xs font-bold tracking-wider text-pink-500 uppercase flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse"></span>
            Penawaran Spesial Mitra Kami
          </span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-pink-500 transition-colors"
            title="Sembunyikan"
          >
            <X size={14} />
          </button>
        </div>
        <div className="overflow-hidden rounded-xl bg-gradient-to-tr from-pink-50 to-mint-50 w-full flex justify-center items-center h-[250px] border border-pink-50">
          <iframe 
            src="/ads/native-banner.html"
            className="w-full h-full"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            title="Mitra Native Banner"
          ></iframe>
        </div>
        <div className="w-full text-center mt-2">
          <span className="text-[10px] text-gray-400">Iklan oleh partner cpmnetwork terpercaya</span>
        </div>
      </div>
    </div>
  );
}
