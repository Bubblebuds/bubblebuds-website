import { useState, useEffect } from 'react';
import { ChevronRight, CalendarDays, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const DEFAULT_ARTICLES = [
  {
    id: '1',
    title: 'Manfaat Pijat Bayi untuk Mengurangi Kolik',
    excerpt: 'Kolik sering menjadi masalah bagi bayi. Ketahui bagaimana pijat lembut dapat membantu menenangkan sistem pencernaan si kecil.',
    category: 'Kesehatan Bayi',
    date: '10 Okt 2023',
    readTime: '4 Menit',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&auto=format&fit=crop',
    colorBox: 'bg-primary-container text-on-primary-container'
  },
  {
    id: '2',
    title: 'Kapan Waktu Terbaik Memulai Baby Spa?',
    excerpt: 'Banyak orang tua ragu kapan waktu yang pas. Artikel ini membahas rentang usia ideal dan persiapannya.',
    category: 'Panduan Orang Tua',
    date: '24 Sep 2023',
    readTime: '5 Menit',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop',
    colorBox: 'bg-secondary-container text-on-secondary-container'
  },
  {
    id: '3',
    title: 'Tips Merawat Kulit Bayi yang Sensitif',
    excerpt: 'Kulit bayi sangat lembut dan rentan. Berikut adalah panduan memilih produk dan metode perawatan yang aman.',
    category: 'Perawatan Kulit',
    date: '05 Sep 2023',
    readTime: '6 Menit',
    image: 'https://images.unsplash.com/photo-1522771960251-5d9a941a5419?w=600&auto=format&fit=crop',
    colorBox: 'bg-tertiary-container text-on-tertiary-container'
  }
];

export default function Artikel() {
  const [articles, setArticles] = useState<any[]>(DEFAULT_ARTICLES);

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const dbArticles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (dbArticles.length > 0) {
        setArticles(dbArticles);
      } else {
        setArticles(DEFAULT_ARTICLES);
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'articles'));
    
    return () => unsub();
  }, []);

  return (
    <div className="animate-in fade-in duration-500 py-16 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
            Blog Kesehatan & <br className="hidden md:block"/> Tips Parenting
          </h1>
          <p className="text-lg text-on-surface-variant">
            Artikel terbaru tentang kesehatan anak, tips pengasuhan, dan panduan perawatan bagi ibu dan bayi.
          </p>
        </div>
        <div className="flex gap-2 font-[Lexend] text-sm font-semibold">
          <button className="px-4 py-2 bg-on-surface text-surface rounded-full">Terbaru</button>
          <button className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-full transition-colors">Terpopuler</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link to={`/artikel/${article.id}`} key={article.id} className="bg-surface rounded-[2rem] overflow-hidden ambient-shadow flex flex-col group border border-outline-variant/20 hover:border-primary/30 transition-all duration-300">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full font-[Lexend] text-[10px] font-bold uppercase tracking-wider ${article.colorBox} shadow-sm backdrop-blur-md bg-opacity-90`}>
                {article.category}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant mb-4">
                <span className="flex items-center gap-1"><CalendarDays size={14} /> {article.date}</span>
                <span className="flex items-center gap-1"><Clock3 size={14} /> {article.readTime}</span>
              </div>
              
              <h2 className="text-xl font-bold text-on-surface leading-snug mb-3 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              
              <p className="text-sm text-on-surface-variant line-clamp-3 mb-6 flex-grow">
                {article.excerpt}
              </p>
              
              <div className="font-[Lexend] text-xs font-semibold tracking-wide uppercase text-primary flex items-center gap-1 w-fit group/link">
                Baca Selengkapnya 
                <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="bg-surface-container text-on-surface hover:bg-surface-container-high px-8 py-3 rounded-full font-[Lexend] text-sm font-semibold tracking-wider transition-all duration-300">
          Muat Lebih Banyak
        </button>
      </div>
    </div>
  );
}
