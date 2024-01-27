import axios from 'axios';

const apiKey = 'f2c9b612cb6364f8beadd512476a4cca';

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;


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
