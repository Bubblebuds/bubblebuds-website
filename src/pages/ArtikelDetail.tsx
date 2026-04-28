import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react';

export default function ArtikelDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, 'articles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `articles/${id}`);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center">Memuat artikel...</div>;
  }

  if (!article) {
    return <div className="py-20 text-center">Artikel tidak ditemukan.</div>;
  }

  return (
    <div className="animate-in fade-in duration-500 py-16 px-6 lg:px-8 max-w-4xl mx-auto">
      <Link to="/artikel" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold mb-8">
        <ArrowLeft size={20} /> Kembali ke Blog
      </Link>
      
      <div className="mb-8">
        <div className={`inline-block px-3 py-1 rounded-full font-[Lexend] text-[10px] font-bold uppercase tracking-wider ${article.colorBox || 'bg-primary-container text-on-primary-container'} mb-4`}>
          {article.category || 'Artikel'}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-6">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
          <span className="flex items-center gap-1"><CalendarDays size={16} /> {article.date || 'Tanggal tidak tersedia'}</span>
          <span className="flex items-center gap-1"><Clock3 size={16} /> {article.readTime || '3 Menit'}</span>
        </div>
      </div>

      <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="prose prose-lg text-on-surface max-w-none pb-12 whitespace-pre-wrap">
        {article.content}
      </div>
    </div>
  );
}
