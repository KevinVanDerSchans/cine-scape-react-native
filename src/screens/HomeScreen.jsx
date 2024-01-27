import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Bars3CenterLeftIcon, FilmIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Spinner from '../components/Spinner';
import MovieList from '../components/MovieList';
import TrendingMovies from '../components/TrendingMovies';
import { fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { theme } from '../theme';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();

    if (data && data.results)
      setTrending(data.results);
      setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();

    if (data && data.results)
      setUpcoming(data.results);
  };


  return (
    <View className="flex-1 bg-blue-500">

      <SafeAreaView>
        <StatusBar style='light' />

        <View className="flex-row justify-between items-center mx-4 my-2 mb-3">
          <Bars3CenterLeftIcon size='30' strokeWidth={2} color={theme.text} />

          <View className="flex-row">
            <FilmIcon size='30' color={theme.title} />
            <Text className='text-white text-xl font-bold'>
              <Text>CineScape</Text>
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size='30' color={theme.text} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {
          loading ? (
            <Spinner />

          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
              style={{ marginBottom: 50 }}
            >
              {trending.length > 0 && <TrendingMovies data={trending} />}

              {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}

            </ScrollView>
          )
        }
      </SafeAreaView>
    </View>
  )
}
