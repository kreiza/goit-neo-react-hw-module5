import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Outlet, NavLink } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl } from '../../services/api';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state || '/movies');

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieDetails = await fetchMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (!movie) return null;

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.backLink}>
        ← Go back
      </Link>
      
      <div className={css.movieInfo}>
        {movie.poster_path && (
          <img 
            src={getImageUrl(movie.poster_path)} 
            alt={movie.title}
            className={css.poster}
          />
        )}
        <div className={css.details}>
          <h1>{movie.title}</h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres?.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h3>Additional information</h3>
        <nav className={css.nav}>
          <NavLink 
            to="cast" 
            className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}
          >
            Cast
          </NavLink>
          <NavLink 
            to="reviews" 
            className={({ isActive }) => isActive ? `${css.link} ${css.active}` : css.link}
          >
            Reviews
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}