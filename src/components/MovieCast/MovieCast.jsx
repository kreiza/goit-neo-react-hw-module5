import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, getImageUrl } from '../../services/api';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieCast = await fetchMovieCredits(movieId);
        setCast(movieCast);
      } catch (err) {
        setError('Failed to fetch movie cast');
      } finally {
        setLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (cast.length === 0) return <p>We don't have any cast information for this movie.</p>;

  return (
    <ul className={css.list}>
      {cast.map(actor => (
        <li key={actor.id} className={css.item}>
          {actor.profile_path ? (
            <img 
              src={getImageUrl(actor.profile_path)} 
              alt={actor.name}
              className={css.photo}
            />
          ) : (
            <div className={css.noPhoto}>No photo</div>
          )}
          <div className={css.info}>
            <h4>{actor.name}</h4>
            <p>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}