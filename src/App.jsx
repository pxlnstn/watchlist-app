import { useState, useEffect } from 'react'

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [movieName, setMovieName] = useState("");

  // API'den başlangıç verilerini çekme (Read işlemi)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=4')
      .then(res => res.json())
      .then(data => {
        const formattedMovies = data.map(m => ({
          id: m.id,
          title: m.title.toUpperCase(),
          isWatched: m.completed
        }));
        setWatchlist(formattedMovies);
      });
  }, []);

  // EKLEME (Create) - [cite: 18]
  const addMovie = () => {
    if (!movieName.trim()) return;
    const newMovie = { id: Date.now(), title: movieName.toUpperCase(), isWatched: false };
    setWatchlist([newMovie, ...watchlist]);
    setMovieName("");
  };

  // SİLME (Delete) - [cite: 21]
  const deleteMovie = (id) => {
    setWatchlist(watchlist.filter(m => m.id !== id));
  };

  // GÜNCELLEME (Update) - [cite: 20]
  const toggleStatus = (id) => {
    setWatchlist(watchlist.map(m => m.id === id ? { ...m, isWatched: !m.isWatched } : m));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-8 font-sans">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 mt-10">
        
        {/* Header - [cite: 30] */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-10 text-center">
          <h1 className="text-white text-3xl font-black tracking-tighter uppercase italic mb-2">
            🍿 BingeWatchList
          </h1>
          <p className="text-indigo-100 text-sm font-medium leading-relaxed max-w-[280px] mx-auto opacity-90">
            Welcome, Create your watchlist and enjoy your movies!
          </p>
        </div>

        <div className="p-8">
          {/* Ekleme Alanı (Create Input) - [cite: 18, 27] */}
          <div className="flex gap-3 mb-10">
            <input 
              className="flex-1 p-4 rounded-xl bg-slate-100 border-2 border-transparent focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              placeholder="What are we watching today?"
            />
            <button 
              onClick={addMovie} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-indigo-100"
            >
              ADD
            </button>
          </div>

          {/* Listeleme Alanı (Read/Listing) - [cite: 19, 29] */}
          <div className="space-y-3">
            <h2 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4 ml-1">My Collection</h2>
            
            {watchlist.map(movie => (
              <div key={movie.id} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-300 transition-colors">
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    checked={movie.isWatched} 
                    onChange={() => toggleStatus(movie.id)}
                    className="w-5 h-5 accent-indigo-600 cursor-pointer"
                  />
                  <span className={`font-semibold transition-all ${movie.isWatched ? 'line-through text-slate-400 italic' : 'text-slate-700'}`}>
                    {movie.title}
                  </span>
                </div>
                
                {/* Silme İşlemi (Delete) - [cite: 21] */}
                <button 
                  onClick={() => deleteMovie(movie.id)} 
                  className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-bold transition-all opacity-0 group-hover:opacity-100"
                >
                  DELETE
                </button>
              </div>
            ))}

            {watchlist.length === 0 && (
              <div className="text-center py-10 text-slate-400 italic">
                Your list is currently empty.
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <footer className="mt-8 text-slate-400 text-xs font-medium uppercase tracking-widest">
        ReactJS & Tailwind CSS Project [cite: 6, 15]
      </footer>
    </div>
  );
}

export default App;