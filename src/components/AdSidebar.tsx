import { useState } from 'react';
import { X } from 'lucide-react';

export default function AdSidebar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 bg-white p-3 rounded-2xl shadow-xl border border-pink-100 flex-col items-center">
      <div className="w-full flex justify-between items-center mb-1.5 px-1">
        <span className="text-[10px] font-semibold tracking-wider text-pink-400 uppercase">Sponsor</span>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-pink-500 transition-colors"
          title="Tutup Iklan"
        >
          <X size={14} />
        </button>
      </div>
      <div className="overflow-hidden rounded-lg bg-pink-50/30">
        <iframe 
          src="/ads/sidebar-160x300.html"
          width="160"
          height="300"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          title="Sponsor Sidebar"
        ></iframe>
      </div>
    </div>
  );
}
