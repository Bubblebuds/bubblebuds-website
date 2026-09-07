import { ExternalLink, Sparkles } from 'lucide-react';

export default function AdDirectPromo() {
  const directLink = "https://www.effectivecpmnetwork.com/jh0jkrt4wq?key=aa019b2b9276503b096293a47fcf181c";

  return (
    <div className="my-10 px-4 w-full max-w-4xl mx-auto">
      <a 
        href={directLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block group relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-purple-50 to-teal-50 p-6 md:p-8 border border-pink-200/50 hover:border-pink-300 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
      >
        {/* Glow / decorative elements */}
        <div className="absolute -right-16 -top-16 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-teal-300/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-pink-200/50 text-pink-700 text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles size={12} className="animate-spin-slow" />
              Rekomendasi Minggu Ini
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight group-hover:text-pink-600 transition-colors">
              Paket Perawatan Bayi Organik Premium &amp; Mainan Edukatif Terpilih 🛁✨
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
              Dapatkan diskon eksklusif hingga 40% untuk produk spa bayi rumahan, baby safety kits, dan mainan sensorik terbaik dari kurasi spa therapist kami. Nikmati momen terbaik bersama si kecil!
            </p>
          </div>
          
          <div className="flex shrink-0">
            <span className="inline-flex items-center gap-2 bg-pink-500 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-lg shadow-pink-500/20 group-hover:bg-pink-600 group-hover:shadow-pink-600/30 transition-all duration-300">
              Lihat Promo Eksklusif
              <ExternalLink size={16} />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
