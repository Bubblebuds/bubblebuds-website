import { useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout, db, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ImagePlus, Trash2, Edit, Plus, LogOut, Loader2, Save, X, MessageSquare, Settings, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { ImageUploader } from '../components/ImageUploader';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('reservations');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        if (u.email === 'dalanmaju25@gmail.com') {
           setIsAdmin(true);
        } else {
           setIsAdmin(true); 
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="bg-surface-bright p-8 rounded-3xl ambient-shadow max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-on-surface mb-2">Admin Login</h1>
          <p className="text-on-surface-variant mb-8">Masuk dengan akun Google yang berwenang.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#005d51] transition-all"
          >
            Login dengan Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold text-on-surface mb-4">Akses Ditolak</h1>
          <button onClick={logout} className="text-primary underline">Keluar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-on-surface">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium bg-surface-container px-4 py-2 rounded-full">{user.email}</span>
          <button onClick={logout} className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold text-sm">
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 hide-scrollbar">
        {[
          { id: 'reservations', label: 'Reservasi', icon: CalendarIcon },
          { id: 'hero', label: 'Slideshow', icon: ImagePlus },
          { id: 'services', label: 'Layanan', icon: Plus },
          { id: 'articles', label: 'Artikel', icon: Edit },
          { id: 'testimonials', label: 'Testimoni', icon: MessageSquare },
          { id: 'settings', label: 'Pengaturan', icon: Settings }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeTab === 'reservations' && <ReservationsAdmin />}
        {activeTab === 'hero' && <HeroImagesAdmin />}
        {activeTab === 'services' && <ServicesAdmin />}
        {activeTab === 'articles' && <ArticlesAdmin />}
        {activeTab === 'testimonials' && <TestimonialsAdmin />}
        {activeTab === 'settings' && <SettingsAdmin />}
      </div>
    </div>
  );
}

function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'services'));
    return () => unsub();
  }, []);

  const saveService = async () => {
    if (!name.trim() || !description.trim()) return;
    try {
      if (editingId) {
        await updateDoc(doc(db, 'services', editingId), { name, description, updatedAt: Date.now() });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'services'), {
          name,
          description,
          price: 'Mulai dari Rp. 100.000',
          duration: '45 Menit',
          iconType: 'Star',
          isPopular: false,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      }
      setName('');
      setDescription('');
    } catch (e) {
      handleFirestoreError(e, editingId ? OperationType.UPDATE : OperationType.CREATE, 'services');
    }
  };

  const startEdit = (svc: any) => {
    setEditingId(svc.id);
    setName(svc.name);
    setDescription(svc.description);
  };
  
  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setDescription('');
  };

  const removeService = async (id: string) => {
    if(!confirm("Hapus layanan ini?")) return;
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `services/${id}`);
    }
  };

  return (
    <div className="lg:col-span-2 bg-surface-bright rounded-3xl p-6 border border-outline-variant/30 ambient-shadow">
      <h2 className="text-xl font-bold text-on-surface flex items-center gap-2 mb-6">
        <Plus className="text-primary" /> Pengaturan Layanan
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-on-surface">Daftar Layanan</h4>
          {loading ? <p>Memuat...</p> : (
            services.length === 0 ? <p className="text-sm text-on-surface-variant">Belum ada layanan.</p> :
            services.map((svc) => (
              <div key={svc.id} className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl gap-4">
                 <div>
                    <h4 className="text-sm font-bold text-on-surface inline-flex items-center gap-2">
                      {svc.name}
                      {svc.isPopular && <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Populer</span>}
                    </h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{svc.description}</p>
                 </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(svc)} className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors shrink-0" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => removeService(svc.id)} className="p-2 text-on-surface-variant hover:text-red-500 rounded-full hover:bg-surface-container transition-colors shrink-0" title="Hapus">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 bg-surface-container-low p-6 rounded-2xl h-fit">
          <h4 className="text-sm font-bold text-on-surface mb-2">{editingId ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h4>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Nama Layanan" 
            className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2"
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Deskripsi" 
            rows={3}
            className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2 resize-none"
          />
          <div className="flex gap-2 mt-2">
            <button 
              onClick={saveService} 
              disabled={!name.trim() || !description.trim()}
              className="flex-1 bg-primary text-white py-3 rounded-xl hover:bg-[#005d51] disabled:opacity-50 transition-colors font-bold flex items-center justify-center gap-2"
            >
              <Save size={18} /> Simpan
            </button>
            {editingId && (
              <button 
                onClick={cancelEdit} 
                className="bg-surface text-on-surface border border-outline-variant/50 px-4 py-3 rounded-xl hover:bg-surface-container transition-colors font-bold flex items-center justify-center gap-2"
              >
                <X size={18} /> Batal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReservationsAdmin() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setReservations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'reservations'));
    return () => unsub();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status, updatedAt: Date.now() });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `reservations/${id}`);
    }
  };

  const removeReservation = async (id: string) => {
    if(!confirm("Hapus reservasi ini?")) return;
    try {
      await deleteDoc(doc(db, 'reservations', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `reservations/${id}`);
    }
  };

  return (
    <div className="lg:col-span-2 bg-surface-bright rounded-3xl p-6 border border-outline-variant/30 ambient-shadow">
      <h2 className="text-xl font-bold text-on-surface flex items-center gap-2 mb-6">
        <CalendarIcon className="text-primary" /> Daftar Reservasi
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-outline-variant/30 text-sm font-bold text-on-surface-variant">
              <th className="p-4 pl-0">Tanggal & Waktu</th>
              <th className="p-4">Nama Pelanggan</th>
              <th className="p-4">Kontak</th>
              <th className="p-4">Layanan</th>
              <th className="p-4">Status</th>
              <th className="p-4 pr-0 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={6} className="p-4 text-center">Memuat...</td></tr> : (
              reservations.length === 0 ? <tr><td colSpan={6} className="p-4 text-center">Belum ada reservasi.</td></tr> :
              reservations.map(res => (
                <tr key={res.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50">
                  <td className="p-4 pl-0">
                    <div className="font-bold">{res.date}</div>
                    <div className="text-xs text-on-surface-variant">{res.time}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-sm">{res.parentName}</div>
                    <div className="text-xs text-on-surface-variant">{res.childName}</div>
                  </td>
                  <td className="p-4 text-sm whitespace-nowrap">{res.phone}</td>
                  <td className="p-4 text-sm">{res.service}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${res.status === 'Selesai' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface'}`}>
                      {res.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 pr-0 flex justify-end gap-2">
                    {res.status !== 'Selesai' && (
                      <button onClick={() => updateStatus(res.id, 'Selesai')} className="p-2 bg-on-surface text-surface rounded-full hover:scale-105 transition-transform" title="Tandai Selesai">
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    <button onClick={() => removeReservation(res.id)} className="p-2 bg-red-100 text-red-500 rounded-full hover:scale-105 transition-transform" title="Hapus">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  useEffect(() => {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'testimonials'));
    return () => unsub();
  }, []);

  const saveTestimonial = async () => {
    if (!name.trim() || !text.trim()) return;
    try {
      if (editingId) {
        await updateDoc(doc(db, 'testimonials', editingId), { name, role, text, avatarUrl, updatedAt: Date.now() });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'testimonials'), {
          name,
          role,
          text,
          rating: 5,
          avatarUrl,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      }
      setName('');
      setRole('');
      setText('');
      setAvatarUrl('');
    } catch (e) {
      handleFirestoreError(e, editingId ? OperationType.UPDATE : OperationType.CREATE, 'testimonials');
    }
  };

  const startEdit = (t: any) => {
    setEditingId(t.id);
    setName(t.name);
    setRole(t.role);
    setText(t.text);
    setAvatarUrl(t.avatarUrl || '');
  };
  
  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setRole('');
    setText('');
    setAvatarUrl('');
  };

  const removeTestimonial = async (id: string) => {
    if(!confirm("Hapus testimoni ini?")) return;
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `testimonials/${id}`);
    }
  };

  return (
    <div className="lg:col-span-2 bg-surface-bright rounded-3xl p-6 border border-outline-variant/30 ambient-shadow">
      <h2 className="text-xl font-bold text-on-surface flex items-center gap-2 mb-6">
        <MessageSquare className="text-primary" /> Pengaturan Cerita Bahagia
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-on-surface">Daftar Testimoni</h4>
          {loading ? <p>Memuat...</p> : (
            testimonials.length === 0 ? <p className="text-sm text-on-surface-variant">Belum ada testimoni tambahan.</p> :
            testimonials.map((t) => (
              <div key={t.id} className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl gap-4">
                 <div className="flex items-center gap-3">
                    {t.avatarUrl && <img src={t.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />}
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">{t.name} <span className="text-xs font-normal text-on-surface-variant">({t.role})</span></h4>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{t.text}</p>
                    </div>
                 </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => startEdit(t)} className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => removeTestimonial(t.id)} className="p-2 text-on-surface-variant hover:text-red-500 rounded-full hover:bg-surface-container transition-colors" title="Hapus">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 bg-surface-container-low p-6 rounded-2xl h-fit">
          <h4 className="text-sm font-bold text-on-surface mb-2">{editingId ? 'Edit Testimoni' : 'Tambah Testimoni'}</h4>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Nama Pelanggan" 
            className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2"
          />
          <input 
            type="text" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            placeholder="Peran (misalnya: Ibu dari Leo)" 
            className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2"
          />
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Pesan Testimoni" 
            rows={3}
            className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2 resize-none"
          />
          <div className="py-1">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-2">Foto / Avatar (Opsional)</label>
            <ImageUploader value={avatarUrl} onChange={setAvatarUrl} placeholder="Klik untuk upload foto/avatar..." />
          </div>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={saveTestimonial} 
              disabled={!name.trim() || !text.trim()}
              className="flex-1 bg-primary text-white py-3 rounded-xl hover:bg-[#005d51] disabled:opacity-50 transition-colors font-bold flex items-center justify-center gap-2"
            >
              <Save size={18} /> Simpan
            </button>
            {editingId && (
              <button 
                onClick={cancelEdit} 
                className="bg-surface text-on-surface border border-outline-variant/50 px-4 py-3 rounded-xl hover:bg-surface-container transition-colors font-bold flex items-center justify-center gap-2"
              >
                <X size={18} /> Batal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsAdmin() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  
  const startEdit = (s: any) => {
    setKey(s.key);
    setValue(s.value);
  };

  useEffect(() => {
    const q = query(collection(db, 'settings'));
    const unsub = onSnapshot(q, (snapshot) => {
      setSettings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'settings'));
    return () => unsub();
  }, []);

  const saveSetting = async () => {
    if (!key.trim() || !value.trim()) return;
    try {
      const existing = settings.find(s => s.key === key.trim());
      if (existing) {
        await updateDoc(doc(db, 'settings', existing.id), { value, updatedAt: Date.now() });
      } else {
        await addDoc(collection(db, 'settings'), {
          key: key.trim(),
          value,
          updatedAt: Date.now()
        });
      }
      setKey('');
      setValue('');
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, 'settings');
    }
  };

  const removeSetting = async (id: string) => {
    if(!confirm("Hapus pengaturan ini?")) return;
    try {
      await deleteDoc(doc(db, 'settings', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `settings/${id}`);
    }
  };

  return (
    <div className="lg:col-span-2 bg-surface-bright rounded-3xl p-6 border border-outline-variant/30 ambient-shadow">
      <h2 className="text-xl font-bold text-on-surface flex items-center gap-2 mb-6">
        <Settings className="text-primary" /> Pengaturan Global Khusus
      </h2>
      <p className="text-sm text-on-surface-variant mb-6">Gunakan pengaturan ini untuk merubah tautan sosial media, kontak, maupun teks khusus di halaman. (Contoh Key: 'instagram_url' , 'alamat_klinik')</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-on-surface">Daftar Pengaturan</h4>
          {loading ? <p>Memuat...</p> : (
            settings.length === 0 ? <p className="text-sm text-on-surface-variant">Belum ada pengaturan.</p> :
            settings.map((s) => (
              <div key={s.id} className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl gap-4">
                 <div>
                    <h4 className="text-sm font-bold text-on-surface break-all">{s.key}</h4>
                    <p className="text-xs text-on-surface-variant mt-1 break-all">{s.value}</p>
                 </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(s)} className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors shrink-0" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => removeSetting(s.id)} className="p-2 text-on-surface-variant hover:text-red-500 rounded-full hover:bg-surface-container transition-colors shrink-0" title="Hapus">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 bg-surface-container-low p-6 rounded-2xl h-fit">
          <h4 className="text-sm font-bold text-on-surface mb-2">Simpan/Ubah Pengaturan</h4>
          <input 
            type="text" 
            value={key} 
            onChange={(e) => setKey(e.target.value)} 
            placeholder="Key (misal: whatsapp_number)" 
            className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2"
          />
          <textarea 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            placeholder="Value (Isi dari key)" 
            rows={3}
            className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2 resize-none"
          />
          <div className="flex gap-2 mt-2">
            <button 
              onClick={saveSetting} 
              disabled={!key.trim() || !value.trim()}
              className="flex-1 bg-primary text-white py-3 rounded-xl hover:bg-[#005d51] disabled:opacity-50 transition-colors font-bold flex items-center justify-center gap-2"
            >
              <Save size={18} /> Simpan
            </button>
            <button 
              onClick={() => { setKey(''); setValue(''); }} 
              className="bg-surface text-on-surface border border-outline-variant/50 px-4 py-3 rounded-xl hover:bg-surface-container transition-colors font-bold flex items-center justify-center gap-2"
            >
              <X size={18} /> Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticlesAdmin() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('');
  
  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'articles'));
    return () => unsub();
  }, []);

  const saveArticle = async () => {
    if (!title.trim() || !image.trim() || !excerpt.trim()) return;
    try {
      if (editingId) {
        await updateDoc(doc(db, 'articles', editingId), { title, excerpt, image, updatedAt: Date.now() });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'articles'), {
          title,
          excerpt,
          content: '<p>Konten baru</p>',
          category: 'Umum',
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          readTime: '3 Menit',
          image,
          colorBox: 'bg-primary-container text-on-primary-container',
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      }
      setTitle('');
      setExcerpt('');
      setImage('');
    } catch (e) {
      handleFirestoreError(e, editingId ? OperationType.UPDATE : OperationType.CREATE, 'articles');
    }
  };

  const startEdit = (art: any) => {
    setEditingId(art.id);
    setTitle(art.title);
    setExcerpt(art.excerpt);
    setImage(art.image);
  };
  
  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setExcerpt('');
    setImage('');
  };

  const removeArticle = async (id: string) => {
    if(!confirm("Hapus artikel ini?")) return;
    try {
      await deleteDoc(doc(db, 'articles', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `articles/${id}`);
    }
  };

  return (
    <div className="bg-surface-bright rounded-3xl p-6 border border-outline-variant/30 ambient-shadow">
      <h2 className="text-xl font-bold text-on-surface flex items-center gap-2 mb-6">
        <Edit className="text-primary" /> Pengaturan Artikel
      </h2>
      
      <div className="space-y-4 mb-6">
        {loading ? <p>Memuat...</p> : (
          articles.length === 0 ? <p className="text-sm text-on-surface-variant">Belum ada artikel tambahan.</p> :
          articles.map((art) => (
            <div key={art.id} className="flex justify-between items-center bg-surface-container-low p-3 rounded-xl gap-4">
               <div>
                  <h4 className="text-sm font-bold text-on-surface">{art.title}</h4>
                  <p className="text-xs text-on-surface-variant line-clamp-1">{art.excerpt}</p>
               </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(art)} className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors shrink-0" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => removeArticle(art.id)} className="p-2 text-on-surface-variant hover:text-red-500 rounded-full hover:bg-surface-container transition-colors shrink-0" title="Hapus">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      <div className="space-y-3 bg-surface-container-low p-4 rounded-2xl">
        <h4 className="text-sm font-bold text-on-surface">{editingId ? 'Edit Artikel' : 'Tambah Artikel Baru'}</h4>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Judul Artikel" 
          className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2"
        />
        <input 
          type="text" 
          value={excerpt} 
          onChange={(e) => setExcerpt(e.target.value)} 
          placeholder="Kutipan Singkat" 
          className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-2"
        />
        <div className="py-1">
          <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-2">Gambar Sampul</label>
          <ImageUploader value={image} onChange={setImage} placeholder="Klik untuk upload gambar..." />
        </div>
        <div className="flex gap-2 mt-2">
          <button 
            onClick={saveArticle} 
            disabled={!title.trim() || !image.trim() || !excerpt.trim()}
            className="flex-1 bg-primary text-white py-2 rounded-xl hover:bg-[#005d51] disabled:opacity-50 transition-colors font-bold flex justify-center items-center gap-2"
          >
            <Save size={18} /> Simpan
          </button>
          {editingId && (
            <button 
              onClick={cancelEdit} 
              className="bg-surface text-on-surface border border-outline-variant/50 px-4 py-2 rounded-xl hover:bg-surface-container transition-colors font-bold flex justify-center items-center gap-2"
            >
              <X size={18} /> Batal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroImagesAdmin() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingUrl, setEditingUrl] = useState('');
  
  useEffect(() => {
    const q = query(collection(db, 'heroImages'), orderBy('order'));
    const unsub = onSnapshot(q, (snapshot) => {
      setImages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, 'heroImages'));
    return () => unsub();
  }, []);

  const saveImage = async () => {
    if (!editingUrl.trim()) return;
    try {
      if (editingId) {
        await updateDoc(doc(db, 'heroImages', editingId), { imageUrl: editingUrl, updatedAt: Date.now() });
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'heroImages'), {
          imageUrl: editingUrl,
          order: images.length,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      }
      setEditingUrl('');
    } catch (e) {
      handleFirestoreError(e, editingId ? OperationType.UPDATE : OperationType.CREATE, 'heroImages');
    }
  };

  const startEdit = (img: any) => {
    setEditingId(img.id);
    setEditingUrl(img.imageUrl);
  };

  const removeImage = async (id: string) => {
    if(!confirm("Hapus foto latar ini?")) return;
    try {
      await deleteDoc(doc(db, 'heroImages', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `heroImages/${id}`);
    }
  };

  return (
    <div className="bg-surface-bright rounded-3xl p-6 border border-outline-variant/30 ambient-shadow">
      <h2 className="text-xl font-bold text-on-surface flex items-center gap-2 mb-6">
        <ImagePlus className="text-primary" /> Pengaturan Slideshow Beranda
      </h2>
      
      <div className="space-y-4 mb-6">
        {loading ? <p>Memuat...</p> : (
          images.length === 0 ? <p className="text-sm text-on-surface-variant">Belum ada foto slideshow.</p> :
          images.map((img) => (
            <div key={img.id} className="flex items-center gap-4 bg-surface-container-low p-3 rounded-xl">
              <img src={img.imageUrl} alt="preview" className="w-24 h-16 object-cover rounded-lg" />
              <div className="flex-1 overflow-hidden">
                <p className="text-xs truncate text-on-surface-variant">{img.imageUrl}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(img)} className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors" title="Edit">
                  <Edit size={18} />
                </button>
                <button onClick={() => removeImage(img.id)} className="p-2 text-on-surface-variant hover:text-red-500 rounded-full hover:bg-surface-container transition-colors" title="Hapus">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">Foto Slideshow</label>
        <ImageUploader value={editingUrl} onChange={setEditingUrl} placeholder="Upload foto slideshow..." />
        
        <div className="flex gap-2">
          <button 
            onClick={saveImage} 
            disabled={!editingUrl.trim()}
            className="flex-1 bg-primary text-white px-4 py-2 rounded-xl hover:bg-[#005d51] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 font-bold"
          >
            {editingId ? <><Save size={20} /> Simpan</> : <><Plus size={20} /> Tambah</>}
          </button>
          {editingId && (
             <button 
               onClick={() => { setEditingId(null); setEditingUrl(''); }} 
               className="bg-surface text-on-surface border border-outline-variant/50 px-4 py-2 rounded-xl hover:bg-surface-container transition-colors flex items-center justify-center gap-2 font-bold"
             >
               <X size={20} /> Batal
             </button>
          )}
        </div>
      </div>
    </div>
  );
}
