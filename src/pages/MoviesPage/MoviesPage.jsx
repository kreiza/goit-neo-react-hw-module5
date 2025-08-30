import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
      } catch (err) {
        setError('Failed to search movies');
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value.trim();
    
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies..."
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}