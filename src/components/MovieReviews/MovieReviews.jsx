import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieReviews = await fetchMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (err) {
        setError('Failed to fetch movie reviews');
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (reviews.length === 0) return <p>We don't have any reviews for this movie.</p>;

  return (
    <ul className={css.list}>
      {reviews.map(review => (
        <li key={review.id} className={css.item}>
          <h4>Author: {review.author}</h4>
          <p className={css.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}