import { Eye, HeartHandshake, Leaf, GraduationCap } from 'lucide-react';

export default function Profil() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container/40 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-tertiary-container/30 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3 animate-pulse delay-700"></div>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 z-10">
            <span className="font-[Lexend] text-xs font-semibold tracking-widest uppercase px-4 py-2 bg-surface-container-high rounded-full inline-block text-on-surface-variant">
              Tentang Kami
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              Sentuhan Lembut untuk Tumbuh Kembang Si Kecil
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Bubblebuds Babyspa didedikasikan untuk memberikan pengalaman relaksasi dan perawatan holistik bagi ibu, bayi, dan anak-anak. Kami percaya bahwa sentuhan penuh kasih sayang adalah kunci untuk pertumbuhan yang sehat dan bahagia.
            </p>
          </div>
          <div className="flex-1 relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden float-shadow">
            <img 
              src="https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=2070&auto=format&fit=crop" 
              alt="Mom massaging baby" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Visi Misi Bento Grid */}
      <section className="py-24 px-6 lg:px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-on-surface">Visi & Misi Kami</h2>
            <p className="text-lg text-on-surface-variant mt-2">Panduan kami dalam memberikan layanan terbaik</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Visi */}
            <div className="md:col-span-2 bg-surface-bright rounded-3xl p-8 ambient-shadow flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-primary-container/20">
                <Eye size={200} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-primary mb-4">Visi</h3>
                <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl">
                  Menjadi pusat relaksasi dan kesehatan keluarga terpercaya yang mengedepankan pendekatan holistik, aman, dan menyenangkan untuk setiap tahap perkembangan anak.
                </p>
              </div>
            </div>

            {/* Misi 1 */}
            <div className="bg-surface-bright rounded-3xl p-8 ambient-shadow flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <HeartHandshake size={28} />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Perawatan Penuh Kasih</h3>
              <p className="text-base text-on-surface-variant">Menyediakan layanan spa dan pijat dengan standar keamanan tinggi dan sentuhan ahli yang lembut.</p>
            </div>

            {/* Misi 2 */}
            <div className="bg-surface-bright rounded-3xl p-8 ambient-shadow flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-tertiary-container mt-1 text-on-tertiary-container flex items-center justify-center">
                <Leaf size={28} />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Lingkungan Sehat</h3>
              <p className="text-base text-on-surface-variant">Menciptakan ruang yang bersih, hipoalergenik, dan menenangkan bagi ketenangan pikiran orang tua.</p>
            </div>

            {/* Misi 3 */}
            <div className="md:col-span-2 bg-surface-bright rounded-3xl p-8 ambient-shadow flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-6">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Edukasi Keluarga</h3>
                <p className="text-base text-on-surface-variant">Memberikan edukasi kepada orang tua tentang pentingnya sentuhan terapeutik dan kesejahteraan anak.</p>
              </div>
              <div className="flex-1 w-full h-48 rounded-2xl overflow-hidden float-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop" 
                  alt="Therapist teaching parents" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Fasilitas */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-[Lexend] text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2 block">
            Fasilitas Kami
          </span>
          <h2 className="text-3xl font-bold text-on-surface">Nyaman, Bersih, & Aman</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="col-span-2 row-span-2 rounded-[2rem] overflow-hidden ambient-shadow relative group">
            <img 
              src="https://images.unsplash.com/photo-1579401761822-0ccaff3f91ab?w=800&auto=format&fit=crop" 
              alt="Hydrotherapy pool area" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white text-xl font-bold">Area Hydrotherapy</span>
            </div>
          </div>
          
          <div className="rounded-[2rem] overflow-hidden ambient-shadow aspect-square relative group">
            <img 
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop" 
              alt="Massage room" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white text-lg font-medium">Ruang Pijat Bayi</span>
            </div>
          </div>
          
          <div className="rounded-[2rem] overflow-hidden ambient-shadow aspect-square relative group">
            <img 
              src="https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&auto=format&fit=crop" 
              alt="Play area" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white text-lg font-medium">Area Bermain</span>
            </div>
          </div>
          
          <div className="col-span-2 rounded-[2rem] overflow-hidden ambient-shadow h-56 relative group">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop" 
              alt="Waiting lounge" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white text-lg font-medium">Ruang Tunggu Orang Tua</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
