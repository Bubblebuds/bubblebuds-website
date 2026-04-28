import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

export default function Lokasi() {
  const { getSetting } = useSettings();

  const alamatKlinik = getSetting('alamat_klinik', 'Jl. Manggar nomor 86 Tegalsari, Kecamatan Ambulu, Kabupaten Jember');
  const jamOperasional = getSetting('jam_operasional', 'Sabtu - Kamis : 08.00 - 17.00');
  const telepon = getSetting('telepon', '+62 851 3436 3262');
  const email = getSetting('email', 'admin@bubblebudsbabyspa.com');
  // Use simple embedded OSM for the map at requested coordinates.
  const iframeMap = getSetting('iframe_map', 'https://www.openstreetmap.org/export/embed.html?bbox=113.600,-8.347,113.603,-8.345&layer=mapnik&marker=-8.34660,113.60100');

  return (
    <div className="animate-in fade-in duration-500 py-16 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
          Hubungi Kami
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          Kami siap membantu Anda memilih perawatan terbaik untuk si kecil tercinta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Kontak Info */}
        <div className="space-y-8">
          <div className="bg-surface-bright p-8 rounded-3xl ambient-shadow border border-outline-variant/30 flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-2">Lokasi Kami</h3>
              <p className="text-base text-on-surface-variant leading-relaxed whitespace-pre-line">
                {alamatKlinik}
              </p>
            </div>
          </div>

          <div className="bg-surface-bright p-8 rounded-3xl ambient-shadow border border-outline-variant/30 flex gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-2">Jam Operasional</h3>
              <p className="text-base text-on-surface-variant leading-relaxed">
                <span className="block mb-1">{jamOperasional}</span>
                <span className="block text-primary font-medium mt-2">*Jumat Libur</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-[Lexend] text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Telepon</h4>
                <p className="font-medium text-on-surface">{telepon}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-surface-dim text-on-surface flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-[Lexend] text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Email</h4>
                <p className="font-medium text-on-surface">{email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[500px] bg-surface-container-high rounded-[2rem] overflow-hidden ambient-shadow relative group">
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src={iframeMap} 
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
