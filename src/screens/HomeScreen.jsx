import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from "../api/fetchers";
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
import Toast from "react-native-toast-message";
import tw from "twrnc";

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
    try {
      const data = await fetchTrendingMovies();
      setTrending(data.results);

    } catch (error) {
      console.error("Error getting TrendingMovies: ", error);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      })
    }
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    try {
      const data = await fetchUpcomingMovies();
      setUpcoming(data.results);

    } catch (error) {
      console.error("Error getting UpcomingMovies: ", error);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      })
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const data = await fetchTopRatedMovies();
      setTopRated(data.results);

    } catch (error) {
      console.error("Error getting TopRatedMovies: ", error);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      })
    }
  };

  const handleIconClick = () => {
    Toast.show({
      type: 'info',
      text1: 'Function not currently available',
      text2: 'It will be implemented in the next version',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  return (
    <View style={tw`flex-1 bg-blue-500 h-full`}>
      <SafeAreaView>
        <StatusBar style="dark" />

        <View style={tw`flex-row justify-between items-center mx-4 my-5 mb-3`}>
          <Bars3CenterLeftIcon
            size="30"
            strokeWidth={2.5}
            color={theme.text}
            onPress={handleIconClick}
          />

          <View style={tw`flex-row`}>
            <FilmIcon size="30" color={theme.title} />
            <Text style={tw`text-white text-xl font-bold`}>
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
