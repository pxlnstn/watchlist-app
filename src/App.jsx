import { useState, useEffect } from 'react'

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // OMDb API Key
  const API_KEY = "7fbadd0b"; 

  // Autocomplete - Yazı yazarken önerileri getirir
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (movieName.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`);
        const data = await res.json();
        if (data.Search) {
          setSuggestions(data.Search.slice(0, 5));
        }
      } catch (err) {
        console.error("Suggestion error", err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [movieName]);

  // Filme tıklandığında detayları (Puan, Yıl) çekip listeye ekler
  const addMovie = async (titleFromSuggestion) => {
    const targetTitle = titleFromSuggestion || movieName;
    if (!targetTitle.trim()) return;
    
    setLoading(true);
    setSuggestions([]);

    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${targetTitle}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === "True") {
        const newMovie = { 
          id: Date.now(), 
          title: data.Title.toUpperCase(), 
          year: data.Year,
          rating: data.imdbRating, 
          isWatched: false 
        };
        setWatchlist([newMovie, ...watchlist]);
        setMovieName("");
      } else {
        alert("Movie not found!");
      }
    } catch (error) {
      alert("Error adding movie!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-8 font-sans">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 mt-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-10 text-center">
          <h1 className="text-white text-3xl font-black tracking-tighter uppercase italic mb-2">
            🍿 BingeWatchList
          </h1>
          <p className="text-indigo-100 text-sm font-medium opacity-90">
            Welcome, Create your watchlist and enjoy your movies!
          </p>
        </div>

        <div className="p-8">
          <div className="relative mb-10">
            <div className="flex gap-3">
              <input 
                className="flex-1 p-4 rounded-xl bg-slate-100 border-2 border-transparent focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addMovie()}
                placeholder="Type movie name..."
              />
              <button 
                onClick={() => addMovie()} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
              >
                ADD
              </button>
            </div>

            {/* Autocomplete Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-slate-100 shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {suggestions.map((s) => (
                  <div 
                    key={s.imdbID}
                    onClick={() => addMovie(s.Title)}
                    className="p-4 hover:bg-indigo-50 cursor-pointer flex justify-between items-center transition-colors border-b border-slate-50 last:border-0"
                  >
                    <span className="font-bold text-slate-700">{s.Title}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500">{s.Year}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Watchlist Display */}
          <div className="space-y-4">
            <h2 className="text-slate-400 font-bold text-xs uppercase tracking-widest ml-1">My Collection</h2>
            {watchlist.map(movie => (
              <div key={movie.id} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    checked={movie.isWatched} 
                    onChange={() => setWatchlist(watchlist.map(m => m.id === movie.id ? {...m, isWatched: !m.isWatched} : m))}
                    className="w-5 h-5 accent-indigo-600 cursor-pointer rounded"
                  />
                  <div>
                    <span className={`font-semibold block transition-all ${movie.isWatched ? 'line-through text-slate-400 italic' : 'text-slate-700'}`}>
                      {movie.title}
                    </span>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded font-bold">{movie.year}</span>
                      {movie.rating && movie.rating !== "N/A" && (
                        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold">⭐ {movie.rating}</span>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setWatchlist(watchlist.filter(m => m.id !== movie.id))}
                  className="text-red-400 hover:text-red-600 font-bold px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  DELETE
                </button>
              </div>
            ))}

            {watchlist.length === 0 && (
              <div className="text-center py-10 text-slate-400 italic border-2 border-dashed border-slate-100 rounded-3xl">
                Your watchlist is currently empty.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* API Credit & Info Footer */}
      <footer className="mt-8 text-center space-y-1">
        <p className="text-slate-400 text-[11px] font-medium tracking-widest uppercase">
          Movie data provided by OMDb API
        </p>
        <p className="text-slate-300 text-[10px] italic">
          BingeWatchList © 2026 - Developed with React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}

export default App;