import { useState } from 'react'

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [movieName, setMovieName] = useState("");
  
  
  const API_KEY = "7fbadd0b"; 

  const addMovie = async () => {
    if (!movieName.trim()) return;

    try {
      // OMDb API kullanarak gerçek film verisini sorguluyoruz
      const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`);
      const data = await response.json();

      
      const newMovie = { 
        id: Date.now(), 
        title: data.Title ? data.Title.toUpperCase() : movieName.toUpperCase(), 
        year: data.Year || "N/A", 
        isWatched: false 
      };

      setWatchlist([newMovie, ...watchlist]);
      setMovieName("");
    } catch (error) {
      console.error("Connection error!", error);
    }
  };

  const deleteMovie = (id) => {
    setWatchlist(watchlist.filter(m => m.id !== id));
  };

  const toggleStatus = (id) => {
    setWatchlist(watchlist.map(m => m.id === id ? { ...m, isWatched: !m.isWatched } : m));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-8 font-sans">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100 mt-10">
        
        <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-10 text-center">
          <h1 className="text-white text-3xl font-black tracking-tighter uppercase italic mb-2">
            🍿 BingeWatchList
          </h1>
          <p className="text-indigo-100 text-sm font-medium leading-relaxed max-w-[280px] mx-auto opacity-90">
            Welcome, Create your watchlist and enjoy your movies!
          </p>
        </div>

        <div className="p-8">
          <div className="flex gap-3 mb-10">
            <input 
              className="flex-1 p-4 rounded-xl bg-slate-100 border-2 border-transparent focus:border-indigo-500 outline-none transition-all text-slate-700 font-medium"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addMovie()}
              placeholder="Search a movie (e.g. Interstellar)..."
            />
            <button onClick={addMovie} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-indigo-100">
              ADD
            </button>
          </div>

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
                  <div>
                    <span className={`font-semibold block transition-all ${movie.isWatched ? 'line-through text-slate-400 italic' : 'text-slate-700'}`}>
                      {movie.title}
                    </span>
                    <span className="text-[10px] text-indigo-500 font-black tracking-widest uppercase">{movie.year}</span>
                  </div>
                </div>
                <button onClick={() => deleteMovie(movie.id)} className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-bold transition-all opacity-0 group-hover:opacity-100">
                  DELETE
                </button>
              </div>
            ))}

            {watchlist.length === 0 && (
              <div className="text-center py-10 text-slate-400 italic border-2 border-dashed border-slate-100 rounded-2xl">
                Your list is currently empty.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;