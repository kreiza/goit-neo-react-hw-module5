import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzAzZjA4YTBhMTVkZTRhMjE5NWFkOGMyMjMyNjEyZCIsIm5iZiI6MTc1NjU5Nzg3NC42OTgsInN1YiI6IjY4YjM4ZTcyY2E1YjEwYzNjZDllMWFjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aMxqrRFvGKwGEUebkyjhrB9LetyTBqErySPlJB5zoOE';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await api.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export const getImageUrl = (path, size = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};