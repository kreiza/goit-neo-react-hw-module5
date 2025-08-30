import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError('Failed to fetch trending movies');
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}