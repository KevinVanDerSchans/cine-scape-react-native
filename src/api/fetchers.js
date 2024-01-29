import axios from "axios";
import { apiKey } from "../constants";
import Toast from "react-native-toast-message";

const apiBaseUrl = "https://api.themoviedb.org/3";
const userApiKey = apiKey;

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${userApiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${userApiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${userApiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${userApiKey}`;

const movieDetailsEndpoint = (id) => `${apiBaseUrl}/movie/${id}?api_key=${userApiKey}`;
const movieCreditsEndpoint = (id) => `${apiBaseUrl}/movie/${id}/credits?api_key=${userApiKey}`;
const similarMoviesEndpoint = (id) => `${apiBaseUrl}/movie/${id}/similar?api_key=${userApiKey}`;
const actorDetailsEndpoint = (id) => `${apiBaseUrl}/person/${id}?api_key=${userApiKey}`;
const actorMoviesEndpoint = (id) => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${userApiKey}`;

export const image500 = (posterPath) => posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
export const image342 = (posterPath) => posterPath ? `https://image.tmdb.org/t/p/w342${posterPath}` : null;
export const image185 = (posterPath) => posterPath ? `https://image.tmdb.org/t/p/w185${posterPath}` : null;

export const fallbackMoviePoster = "https://www.altavod.com/assets/images/poster-placeholder.png";
export const fallbackActorImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";


const apiCall = async (endpoint, params = {}) => {
  const options = {
    method: "GET",
    url: endpoint,
    params
  };

  try {
    const response = await axios.request(options);
    return response.data;

  } catch (error) {
    console.error("Error in the API call: ", error);

    if (error.response) {
      console.error("Server Error: ", error.response.status);

    } else if (error.request) {
      console.error("Network Error");

    } else {
      console.error("Request Error: ", error.message);
    }

    throw error;
  }
}

export const fetchTrendingMovies = async () => {
  try {
    const data = await apiCall(trendingMoviesEndpoint);
    return data;

  } catch (error) {
    console.error("Error getting TrendingMovies: ", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })

    return [];
  }
}

export const fetchUpcomingMovies = async () => {
  try {
    const data = await apiCall(upcomingMoviesEndpoint);
    return data;

  } catch (error) {
    console.error("Error getting UpcomingMovies: ", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })

    return [];
  }
}

export const fetchTopRatedMovies = async () => {
  try {
    const data = await apiCall(topRatedMoviesEndpoint);
    return data;

  } catch (error) {
    console.error("Error getting TopRatedMovies: ", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })

    return [];
  }
}

export const fetchMovieDetails = async (id) => {
  try {
    const data = await apiCall(movieDetailsEndpoint(id));
    return data;

  } catch (error) {
    console.error("Error getting MovieDetails: ", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })

    return [];
  }
}

export const fetchMovieCredits = async (movieId) => {
  try {
    const data = await apiCall(movieCreditsEndpoint(movieId));
    return data;

  } catch (error) {
    console.error("Error getting MovieCredits: ", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })

    return [];
  }
}

export const fetchSimilarMovies = async (movieId) => {
  try {
    const data = await apiCall(similarMoviesEndpoint(movieId));
    return data;

  } catch (error) {
    console.error("Error getting SimilarMovies: ", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })

    return [];
  }
}

export const fetchActorDetails = async (actorId) => {
  try {
    const data = await apiCall(actorDetailsEndpoint(actorId));
    return data;

  } catch (error) {
    console.error("Error getting ActorDetails: ", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })

    return [];
  }
}

export const fetchActorMovies = async (actorId) => {
  try {
    const data = await apiCall(actorMoviesEndpoint(actorId));
    return data;

  } catch (error) {
    console.error("Error getting ActorMovies: ", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })

    return [];
  }
}

export const searchMovies = async (params) => {
  try {
    const data = await apiCall(searchMoviesEndpoint, params);
    return data;

  } catch (error) {
    console.error("Error trying to search for movies: ", error);

    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })

    return [];
  }
}
