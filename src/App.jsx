import MovieCard from "./MovieCard";
import Loader from "./Loader";
import "./App.css";
import { useState, useEffect } from "react";

const API_URL = "http://www.omdbapi.com?apikey=13fc2d15";

function App() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  async function searchMovies(title) {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    searchMovies("spiderman");
  }, []);

  return (
    <>
      <h1>Cinemaville</h1>
      <div className="input-box">
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
          type="text"
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        <button
          onClick={() => {
            searchMovies(searchTerm);
          }}
        >
          <div className="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          {movies?.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie1={movie} />
            ))
          ) : (
            <div className="empty">
              <h2 className="not-found">No movies found!</h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
