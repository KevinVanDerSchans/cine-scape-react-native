import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fallbackActorImage, fetchActorDetails, fetchActorMovies, image342 } from '../api/fetchers';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieList from '../components/MovieList';
import Spinner from '../components/Spinner';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { theme } from '../theme';
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get('window');


export default function ActorScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [actor, setActor] = useState({});
  const [actorMovies, setActorMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getActorDetails(item.id);
    getActorMovies(item.id);
  }, [item]);

  const getActorDetails = async (id) => {
    try {
      const data = await fetchActorDetails(id);

      if (data) {
        setActor(data);
      }

    } catch (error) {
      console.error("Error getting ActorDetails: ", error);

      Toast.show({
        type: 'error',
        text1: 'Error',
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

  const getActorMovies = async (id) => {
    try {
      const data = await fetchActorMovies(id);

      if (data && data.cast) {
        setActorMovies(data.cast);
      }

    } catch (error) {
      console.error("Error getting ActorMovies: ", error);

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

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >

      <SafeAreaView
        className="flex-row justify-between items-center mx-4 z-10 mt-3"
      >
        <TouchableOpacity style={{ backgroundColor: theme.background }} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {
        loading ? (
          <Spinner />
          ) : (
            <View>
              <View className="flex-row justify-center"
                style={{ marginBottom: 70 }}
              >
                <View
                  className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2"
                  style={{
                    shadowColor: 'white',
                    elevation: 50,
                  }}
                >
                  <Image
                    source={{ uri: image342(actor?.profile_path) || fallbackActorImage }}
                    style={{ height: height * 0.43, width: width * 0.74 }}
                  />
                </View>
              </View>

              <View className="-mt-10">
                <Text className="text-3xl text-white font-bold text-center">
                  {actor?.name}
                </Text>

                <Text className="text-neutral-500 text-base text-center">
                  {actor?.place_of_birth}
                </Text>
              </View>

              <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold ">Gender</Text>
                  <Text className="text-neutral-300 text-sm">
                    {actor?.gender == 1 ? 'Female' : 'Male'}
                  </Text>
                </View>

                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Birthday</Text>
                  <Text className="text-neutral-300 text-sm">
                    {actor?.birthday}
                  </Text>
                </View>

                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">known for</Text>
                  <Text className="text-neutral-300 text-sm">
                      {actor?.known_for_department}
                  </Text>
                </View>

                <View className="px-2 items-center">
                  <Text className="text-white font-semibold">Popularity</Text>
                  <Text className="text-neutral-300 text-sm">
                    {actor?.popularity?.toFixed(2)} %
                  </Text>
                </View>
              </View>

              <View className="my-6 mx-4 space-y-2">
                <Text className="text-white text-lg">Biography</Text>
                <Text className="text-neutral-400 text-lg tracking-wide">
                  {actor?.biography ? actor.biography : 'N/A'}
                </Text>
              </View>
          </View>
        )
      }

      {actor?.id && actorMovies.length > 0 && <MovieList title="Movies" hideSeeAll={true} data={actorMovies} />}
    </ScrollView>
  );
}
