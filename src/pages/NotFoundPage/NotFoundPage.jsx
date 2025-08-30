import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className={css.link}>
        Go to Home Page
      </Link>
    </div>
  );
}