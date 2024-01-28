import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from "../api/moviedb";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Bars3CenterLeftIcon, FilmIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Spinner from "../components/Spinner";
import MovieList from "../components/MovieList";
import TrendingMovies from "../components/TrendingMovies";
import { theme } from "../theme";


export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
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

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();

    if (data && data.results)
      setTopRated(data.results);
  };

  return (
    <View className="flex-1 bg-blue-500">
      <SafeAreaView>
        <StatusBar style="dark" />

        <View className="flex-row justify-between items-center mx-4 my-5 mb-3">
          <Bars3CenterLeftIcon size="30" strokeWidth={2.5} color={theme.text} />

          <View className="flex-row">
            <FilmIcon size="30" color={theme.title} />
            <Text className="text-white text-xl font-bold">
              <Text> CineScape</Text>
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="28" color={theme.text} strokeWidth={2.5} />
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

              {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}
            </ScrollView>
          )
        }
      </SafeAreaView>
    </View>
  )
}
