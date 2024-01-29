import { fallbackMoviePoster, fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies, image500 } from "../api/fetchers";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Spinner from "../components/Spinner";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView } from "react-native";
import { theme } from "../theme";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    try {
      const data = await fetchMovieDetails(id);

      if (data) {
        setMovie({ ...movie, ...data });
      }

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

    } finally {
      setLoading(false);
    }
  };

  const getMovieCredits = async (id) => {
    try {
      const data = await fetchMovieCredits(id);

      if (data && data.cast) {
        setCast(data.cast);
      }

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
    }
  };

  const getSimilarMovies = async (id) => {
    try {
      const data = await fetchSimilarMovies(id);

      if (data && data.results) {
        setSimilarMovies(data.results);
      }

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
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      stickyHeaderIndices={[0]}
      className="flex-1 bg-neutral-900"
    >

      <SafeAreaView
        className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-3"
      >
        <TouchableOpacity
          style={{ backgroundColor: theme.background }}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}
          accessible
          accessibilityLabel="Return"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <View className="w-full">
        {
          loading ? (
            <Spinner />
          ) : (
            <View>
              <Image
                source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                style={{ width, height: height * 0.55 }}
                accessibilityLabel="Fallback Poster image"
              />

              <LinearGradient
                colors={["transparent", "rgba(23, 23, 23, 0.8)", "rgba(23, 23, 23, 1)"]}
                style={{ width, height: height * 0.40 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          )
        }
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text
          className="text-white text-center text-3xl font-bold tracking-widest"
          style={{ color: theme.red }}
          accessible
          accessibilityLabel={`Movie title: ${movie?.title}`}
        >
          {movie?.title}
        </Text>

        {
          movie?.id ? (
            <Text
              className="text-neutral-400 font-semibold text-base text-center"
              accessible
              accessibilityLabel={`Movie status: ${movie?.title}, release date: ${movie?.release_date} and runtime: ${movie?.runtime}`}
            >
              {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"} • {movie?.runtime} min
            </Text>
          ) : null
        }

        <View className="flex-row justify-center mx-4 space-x-2">
          {
            movie?.genres?.map((genre, index) => {
              let showDot = index + 1 != movie.genres.length;

              return (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text-base text-center"
                  accessible
                  accessibilityLabel={`${genre?.name}`}
                >
                  {genre?.name} {showDot ? "•" : null}
                </Text>
              )
            })
          }
        </View>

        <Text
          className="text-neutral-400 text-lg mx-4 tracking-wide"
          accessible
          accessibilityLabel={`${movie?.overview}`}
        >
          {movie?.overview}
        </Text>
      </View>

      {movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {movie?.id && similarMovies.length > 0 && <MovieList title={"Similar Movies"} hideSeeAll={true} data={similarMovies} />}
    </ScrollView>
  );
}
