import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, query, orderBy, addDoc } from 'firebase/firestore';

export default function Reservasi() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  // Form State
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [phone, setPhone] = useState('');
  const [memberId, setMemberId] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const qServices = query(collection(db, 'services'), orderBy('createdAt', 'asc'));
    const unsubServices = onSnapshot(qServices, (snapshot) => {
       const dbServices = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
       if (dbServices.length > 0) {
         setServices(dbServices);
         setService(dbServices[0].name); // default
       } else {
         const def = [
           { id: '1', name: 'Baby Spa & Pijat', price: 'Rp 250.000', duration: '60 Menit' },
           { id: '2', name: 'Perawatan Ibu Hamil', price: 'Rp 300.000', duration: '90 Menit' },
           { id: '3', name: 'Mom & Kids Package', price: 'Rp 450.000', duration: '120 Menit' }
         ];
         setServices(def);
         setService(def[0].name);
       }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'services'));

    return () => unsubServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !childName || !phone || !service || !date || !time) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reservations'), {
        parentName,
        childName,
        phone,
        memberId,
        service,
        date,
        time,
        status: 'Pending',
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      setIsSubmitted(true);
      // Reset
      setParentName('');
      setChildName('');
      setPhone('');
      setMemberId('');
      setDate('');
      setTime('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'reservations');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="animate-in fade-in zoom-in duration-500 py-24 px-6 max-w-2xl mx-auto text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-3xl font-bold text-on-surface mb-4">Reservasi Berhasil!</h1>
        <p className="text-lg text-on-surface-variant mb-8">
          Terima kasih telah melakukan reservasi. Tim kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi jadwal.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-primary hover:bg-[#005d51] text-white px-8 py-3 rounded-full font-[Lexend] text-sm font-semibold tracking-wider transition-all duration-300"
        >
          Kembali ke Form
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 py-16 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
      
      {/* Kiri : Info */}
      <div className="lg:w-1/3 space-y-8 sticky top-28">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
            Jadwalkan <br className="hidden lg:block"/> Kunjungan
          </h1>
          <p className="text-lg text-on-surface-variant">
            Pilih layanan dan waktu yang sesuai untuk si kecil. Kami sangat menantikan kehadiran Anda.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl bg-surface-container-low/50">
          <h3 className="font-[Lexend] text-sm font-semibold text-on-surface mb-4 uppercase tracking-wide">Info Penting</h3>
          <ul className="space-y-4 text-sm text-on-surface-variant font-medium">
            <li className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</span>
              <p>Harap datang 15 menit sebelum sesi dimulai.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</span>
              <p>Pastikan bayi dalam kondisi sehat dan sudah makan (minimal 1 jam sebelum).</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</span>
              <p>Pembatalan maksimal H-1 sebelum jadwal reservasi.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Kanan : Form */}
      <div className="lg:w-2/3 w-full bg-surface-bright rounded-[2.5rem] p-8 md:p-12 float-shadow border border-outline-variant/20">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Data Diri */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/30 pb-4">
              <User size={24} className="text-primary" /> Data Diri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-[Lexend] text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">Nama Orang Tua</label>
                <input required value={parentName} onChange={e => setParentName(e.target.value)} type="text" className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Contoh: Bunda Sarah" />
              </div>
              <div className="space-y-2">
                <label className="font-[Lexend] text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">Nama Anak & Usia</label>
                <input required value={childName} onChange={e => setChildName(e.target.value)} type="text" className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Contoh: Leo (6 bulan)" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-[Lexend] text-xs font-semibold text-on-surface-variant uppercase tracking-wider block flex items-center gap-2">
                   No. WhatsApp Aktif
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-on-surface-variant"><Phone size={20}/></span>
                  <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="0812-xxxx-xxxx" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-[Lexend] text-xs font-semibold text-on-surface-variant uppercase tracking-wider block flex items-center gap-2">
                   ID Member (Opsional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-on-surface-variant"><User size={20}/></span>
                  <input value={memberId} onChange={e => setMemberId(e.target.value)} type="text" className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Kosongkan jika bukan member" />
                </div>
              </div>
            </div>
          </section>

          {/* Layanan */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-4">
              Pilihan Layanan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map(svc => (
                 <label key={svc.id} className="cursor-pointer">
                   <input type="radio" name="layanan" value={svc.name} checked={service === svc.name} onChange={e => setService(e.target.value)} className="peer sr-only" />
                   <div className="p-4 rounded-2xl border-2 border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary-container/20 hover:bg-surface-container-low transition-all h-full">
                     <h4 className="font-bold text-on-surface mb-1">{svc.name}</h4>
                     <p className="text-xs text-on-surface-variant flex gap-2"><span className="font-medium text-primary">{svc.price}</span> | <span>{svc.duration}</span></p>
                   </div>
                 </label>
              ))}
            </div>
          </section>

          {/* Jadwal */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/30 pb-4">
               Pilih Jadwal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-[Lexend] text-xs font-semibold text-on-surface-variant uppercase tracking-wider block flex items-center gap-1">
                  <CalendarIcon size={14} /> Tanggal
                </label>
                <input required value={date} onChange={e => setDate(e.target.value)} type="date" className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans" />
              </div>
              <div className="space-y-2">
                <label className="font-[Lexend] text-xs font-semibold text-on-surface-variant uppercase tracking-wider block flex items-center gap-1">
                  <Clock size={14}/> Waktu
                </label>
                <select required value={time} onChange={e => setTime(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none">
                  <option value="">Pilih Waktu</option>
                  <option value="09:00">09:00 WIB</option>
                  <option value="11:00">11:00 WIB</option>
                  <option value="13:00">13:00 WIB</option>
                  <option value="15:00">15:00 WIB</option>
                  <option value="17:00">17:00 WIB</option>
                </select>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button disabled={isSubmitting} type="submit" className="w-full bg-primary hover:bg-[#005d51] text-white px-8 py-4 rounded-xl font-[Lexend] text-base font-bold tracking-wider hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,107,93,0.3)] hover:shadow-[0_15px_25px_rgba(0,107,93,0.4)] transition-all duration-300 disabled:opacity-70 flex justify-center items-center">
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Konfirmasi Reservasi'}
            </button>
            <p className="text-center text-xs text-on-surface-variant mt-4 font-medium">Pembayaran dilakukan di klinik setelah perawatan selesai.</p>
          </div>

        </form>
      </div>
    </div>
  );
}
