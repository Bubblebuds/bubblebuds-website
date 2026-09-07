import { useState } from 'react';
import { X } from 'lucide-react';

export default function AdBanner468() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="hidden sm:flex justify-center my-6 overflow-hidden w-full px-4">
      <div className="relative bg-white p-2 rounded-xl shadow-md border border-pink-100 flex flex-col items-center max-w-[488px] w-full">
        <div className="w-full flex justify-between items-center mb-1 px-1">
          <span className="text-[9px] font-semibold tracking-wider text-pink-400 uppercase">Sponsor Pilihan</span>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-pink-500 transition-colors"
            title="Tutup Iklan"
          >
            <X size={12} />
          </button>
        </div>
        <div className="overflow-hidden rounded-md bg-pink-50/20">
          <iframe 
            src="/ads/banner-468x60.html"
            width="468"
            height="60"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            title="Sponsor Banner 468"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
