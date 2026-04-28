import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Star, Baby, UserCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const DEFAULT_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=2070&auto=format&fit=crop'
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "1",
    name: 'Bunda Sarah',
    role: 'Ibu dari Leo (6 Bulan)',
    text: 'Pengalaman luar biasa! Bayi saya sangat rewel akhir-akhir ini, tapi setelah sesi pijat dan berenang di sini, tidurnya jadi jauh lebih nyenyak. Terapisnya sangat sabar dan lembut. Tempatnya juga sangat higienis dan nyaman.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop'
  },
  {
    id: "2",
    name: 'Bunda Anisa',
    role: 'Hamil 32 Minggu',
    text: 'Paket pijat kehamilan di sini benar-benar menyelamatkan punggung saya! Sangat direkomendasikan untuk ibu hamil yang butuh relaksasi.',
    rating: 5,
    avatarUrl: ''
  },
  {
    id: "3",
    name: 'Bunda Dina',
    role: 'Ibu dari Mila (3 Tahun)',
    text: 'Anak balita saya sangat suka berendam di sini. Stafnya ramah dan mainan yang disediakan sangat edukatif.',
    rating: 5,
    avatarUrl: ''
  }
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>(DEFAULT_HERO_IMAGES);
  const [testimonials, setTestimonials] = useState<any[]>(DEFAULT_TESTIMONIALS);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const qImages = query(collection(db, 'heroImages'), orderBy('order'));
    const unsubImages = onSnapshot(qImages, (snapshot) => {
      const dbImages = snapshot.docs.map(doc => doc.data().imageUrl);
      if (dbImages.length > 0) setHeroImages(dbImages);
      else setHeroImages(DEFAULT_HERO_IMAGES);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'heroImages'));
    
    const qTestimonials = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsubTestimonials = onSnapshot(qTestimonials, (snapshot) => {
      const dbTestimonials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (dbTestimonials.length > 0) setTestimonials(dbTestimonials);
      else setTestimonials(DEFAULT_TESTIMONIALS);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'testimonials'));

    const qServices = query(collection(db, 'services'), orderBy('createdAt', 'asc'));
    const unsubServices = onSnapshot(qServices, (snapshot) => {
       const dbServices = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
       if (dbServices.length > 0) setServices(dbServices);
       else setServices([
         { id: '1', name: 'Baby Spa & Pijat', description: 'Meningkatkan motorik dan memberikan relaksasi maksimal untuk si kecil dengan terapis bersertifikat.', iconType: 'Baby' },
         { id: '2', name: 'Perawatan Ibu Hamil', description: 'Meringankan ketegangan otot dan meningkatkan sirkulasi darah selama masa kehamilan yang indah.', iconType: 'UserCircle2', isPopular: true },
         { id: '3', name: 'Mom & Kids Package', description: 'Nikmati waktu berkualitas bersama anak dengan perawatan spa bersama yang menyegarkan.', iconType: 'Sparkles' }
       ]);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'services'));

    return () => {
      unsubImages();
      unsubTestimonials();
      unsubServices();
    };
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [heroImages]);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-tertiary-container rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-[20%] left-[-10%] w-72 h-72 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-[Lexend] text-xs font-semibold tracking-wider">
                <Sparkles size={14} className="text-primary" /> Kesejahteraan untuk Ibu & Si Kecil
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight text-on-surface">
                Momen Penuh Kasih, <br />
                <span className="text-primary">Perawatan Sempurna.</span>
              </h1>
              <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-lg">
                Berikan sentuhan lembut dan perawatan khusus untuk bayi, anak, dan ibu dalam suasana yang menenangkan dan menyenangkan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/reservasi" className="bg-primary hover:bg-[#005d51] text-white px-8 py-4 rounded-full font-[Lexend] text-sm font-semibold tracking-wider hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,107,93,0.3)] hover:shadow-[0_15px_25px_rgba(0,107,93,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                  Pesan Sekarang
                  <Calendar size={18} />
                </Link>
                <a href="#layanan" className="bg-surface-container text-on-surface hover:bg-surface-container-high px-8 py-4 rounded-full font-[Lexend] text-sm font-semibold tracking-wider hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  Lihat Layanan
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-[2rem] overflow-hidden float-shadow z-10 border-4 border-white h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover" 
                    src={heroImages[currentImage]}
                    alt="Bubblebuds Hero Slide"
                  />
                </AnimatePresence>
                <div className="absolute bottom-6 left-6 glass-panel p-4 rounded-2xl flex items-center gap-4 z-20">
                  <div className="bg-secondary-container text-on-secondary-container w-12 h-12 rounded-full flex items-center justify-center">
                    <Star size={24} className="fill-current" />
                  </div>
                  <div>
                    <p className="font-[Lexend] text-xs font-semibold tracking-wider text-on-surface">Rating Teringgi</p>
                    <p className="text-base font-bold text-primary leading-tight mt-1">5.0 dari Orang Tua</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 blob-bg z-0 opacity-60 animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-24 bg-surface-container-low relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold leading-snug text-on-surface">Layanan Unggulan Kami</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto font-medium">Perawatan khusus yang dirancang untuk kenyamanan dan kebahagiaan keluarga Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, index) => {
              const bgColors = ['bg-tertiary-container text-on-tertiary-container', 'bg-primary-container text-on-primary-container', 'bg-surface-dim text-on-surface'];
              const IconColorClass = bgColors[index % bgColors.length];
              
              const renderIcon = (type: string) => {
                if (type === 'Baby') return <Baby size={32} />;
                if (type === 'UserCircle2') return <UserCircle2 size={32} />;
                if (type === 'Sparkles') return <Sparkles size={32} />;
                return <Star size={32} />;
              }

              return (
                <div key={svc.id} className="bg-surface rounded-3xl p-8 ambient-shadow hover:-translate-y-2 transition-transform duration-300 border border-outline-variant/30 relative flex flex-col">
                  {svc.isPopular && (
                    <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-bl-xl font-[Lexend] text-[10px] font-bold uppercase tracking-wider">
                      Populer
                    </div>
                  )}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${IconColorClass}`}>
                    {renderIcon(svc.iconType)}
                  </div>
                  <h3 className="text-2xl font-bold leading-snug text-on-surface mb-3">{svc.name}</h3>
                  <p className="text-base text-on-surface-variant leading-relaxed mb-6 flex-grow">{svc.description}</p>
                  <Link to="/reservasi" className="font-[Lexend] text-xs font-semibold tracking-wider uppercase text-primary flex items-center gap-1 hover:text-[#005d51] transition-colors mt-auto">
                    Pelajari Lebih Lanjut <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-on-surface mb-12">Cerita Bahagia Mereka</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
            {testimonials.slice(0, 3).map((t, index) => {
              if (index === 0) {
                return (
                  <div key={t.id} className="md:col-span-2 md:row-span-2 bg-primary-container/20 rounded-3xl p-8 flex flex-col justify-between soft-shadow">
                    <div>
                      <div className="flex text-secondary mb-6">
                         {[...Array(t.rating)].map((_, i) => <Star key={i} size={20} className="fill-current inline-block" />)}
                      </div>
                      <p className="text-xl font-medium text-on-surface italic leading-relaxed mb-8">
                        "{t.text}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {t.avatarUrl ? 
                        <img src={t.avatarUrl} className="w-14 h-14 rounded-full object-cover" alt={t.name} />
                      : <div className="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container font-black text-xl">{t.name[0]}</div>}
                      <div>
                        <h4 className="font-[Lexend] text-sm font-semibold tracking-wide text-on-surface uppercase">{t.name}</h4>
                        <p className="text-sm text-on-surface-variant font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={t.id} className="md:col-span-2 bg-surface rounded-3xl p-6 border border-outline-variant/30 ambient-shadow">
                    <p className="text-base text-on-surface mb-6 leading-relaxed line-clamp-3">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      {t.avatarUrl ? 
                        <img src={t.avatarUrl} className="w-12 h-12 rounded-full object-cover" alt={t.name} />
                      : <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${index === 1 ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-container text-on-tertiary-container'}`}>{t.name[0]}</div>}
                      <div>
                        <h4 className="font-[Lexend] text-xs font-semibold tracking-wide text-on-surface uppercase">{t.name}</h4>
                        <p className="text-xs text-on-surface-variant">{t.role}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
