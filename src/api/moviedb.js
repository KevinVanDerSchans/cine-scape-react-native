import axios from 'axios';

const apiKey = 'f2c9b612cb6364f8beadd512476a4cca';
const apiBaseUrl = 'https://api.themoviedb.org/3';

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const movieDetailsEndpoint = (id) => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const actorDetailsEndpoint = (id) => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const actorMoviesEndpoint = (id) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = (posterPath) => posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
export const image342 = (posterPath) => posterPath ? `https://image.tmdb.org/t/p/w342${posterPath}` : null;
export const image185 = (posterPath) => posterPath ? `https://image.tmdb.org/t/p/w185${posterPath}` : null;

export const fallbackMoviePoster = 'https://www.altavod.com/assets/images/poster-placeholder.png';
export const fallbackActorImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';


const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {}
  };

  try {
    const response = await axios.request(options);
    return response.data;

  } catch (error) {
    console.error('Error: ', error);
    return {};
  }
}

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
}

export const fetchMovieCredits = (movieId) => {
  return apiCall(movieCreditsEndpoint(movieId));
}

export const fetchSimilarMovies = (movieId) => {
  return apiCall(similarMoviesEndpoint(movieId));
}

export const fetchActorDetails = (actorId) => {
  return apiCall(actorDetailsEndpoint(actorId));
}

export const fetchActorMovies = (actorId) => {
  return apiCall(actorMoviesEndpoint(actorId));
}

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
}
