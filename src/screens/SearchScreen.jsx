import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spinner from '../components/Spinner';
import { fallbackMoviePoster, image185, searchMovies } from '../api/fetchers';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('window');


export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (search) => {
    if (search && search.length > 2) {
      setLoading(true);

      try {
        const data = await searchMovies({
          query: search,
          include_adult: false,
          language: 'en-US',
          page: '1'
        });

        if (data && data.results) {
          setResults(data.results);

        } else {
          console.error("No results found: ", error);
        }

      } catch (error) {
        console.error("Error trying to search for movies: ", error);

      } finally {
        setLoading(false);
      }

    } else {
      setResults([]);
    }
  }

  const handleTextDebounce = (search) => {
    setTimeout(() => {
      handleSearch(search);
    }, 1000);
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View
        className="mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full"
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search your movie..."
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {
        loading ? (
          <Spinner />
        ) :
          results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="space-y-3"
            >
              <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>

              <View className="flex-row justify-between flex-wrap">
                {
                  results.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('Movie', item)}
                      >
                        <View className="space-y-2 mb-4">
                          <Image
                            source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                            style={{ width: width * 0.44, height: height * 0.3 }}
                            className="rounded-3xl"
                          />
                          <Text className="text-gray-300 ml-1">
                            {
                              item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title
                            }
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })
                }
              </View>

            </ScrollView>
          ) : (
          <View className="flex-row justify-center">
            <Image
              source={require('../../public/movieTime.png')}
              className="h-96 w-96"
            />
          </View>
        )
      }
    </SafeAreaView>
  )
};
