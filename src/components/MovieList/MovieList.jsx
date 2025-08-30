import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../services/api';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.item}>
          <Link 
            to={`/movies/${movie.id}`} 
            state={location}
            className={css.link}
          >
            {movie.poster_path && (
              <img 
                src={getImageUrl(movie.poster_path)} 
                alt={movie.title}
                className={css.poster}
              />
            )}
            <h3 className={css.title}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}