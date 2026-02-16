import { useState } from 'react'

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [movieName, setMovieName] = useState("");

  // EKLEME (Create) [cite: 18]
  const addMovie = () => {
    if (!movieName.trim()) return;
    setWatchlist([...watchlist, { id: Date.now(), title: movieName, isWatched: false }]);
    setMovieName("");
  };

  // SİLME (Delete) [cite: 21]
  const deleteMovie = (id) => {
    setWatchlist(watchlist.filter(m => m.id !== id));
  };

  // GÜNCELLEME (Update) [cite: 20]
  const toggleStatus = (id) => {
    setWatchlist(watchlist.map(m => m.id === id ? { ...m, isWatched: !m.isWatched } : m));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-6 font-sans">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl border border-slate-200 mt-10">
        
        {/* Header - Sade Tasarım [cite: 15, 28] */}
        <div className="p-8 border-b border-slate-100 text-center">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Watchlist Manager</h1>
          <p className="text-slate-500 text-sm mt-1">Javascript Uygulama Projesi</p>
        </div>

        <div className="p-8">
          {/* Giriş Alanı [cite: 17, 27] */}
          <div className="flex gap-2 mb-8">
            <input 
              className="flex-1 p-3 rounded-lg border border-slate-300 focus:border-indigo-500 outline-none transition-all text-slate-700 bg-white"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              placeholder="Film veya dizi ekleyin..."
            />
            <button onClick={addMovie} className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm">
              Ekle
            </button>
          </div>

          {/* Listeleme [cite: 19] */}
          <div className="space-y-2">
            {watchlist.map(movie => (
              <div key={movie.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl group transition-all">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={movie.isWatched} 
                    onChange={() => toggleStatus(movie.id)}
                    className="w-5 h-5 rounded border-slate-300"
                  />
                  <span className={`font-medium ${movie.isWatched ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {movie.title}
                  </span>
                </div>
                <button onClick={() => deleteMovie(movie.id)} className="text-red-400 hover:text-red-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;