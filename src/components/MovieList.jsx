import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity } from 'react-native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
import { ForwardIcon, TrophyIcon, VideoCameraIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 768;

export default function MovieList({ title, hideSeeAll, data }) {

  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4 bg-black">

      <View className="mx-4 py-4 flex-row justify-between items-center">
        <View style={{ margin: isLargeScreen ? 200 : 10 }}>
          {
            title === 'Upcoming' ? (
              <ForwardIcon size='25' color={theme.liked} />

            ) : title === 'Top Rated' ? (
              <TrophyIcon size='25' color={theme.liked} />

            ) : (

              <VideoCameraIcon size='25' color={theme.liked} />
            )
          }
            <Text className="text-white text-lg">  {title}</Text>
        </View>

        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={{ color: theme.title }} className="text-lg">See All</Text>
            </TouchableOpacity>
          )
        }
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}
              >
                <View className="space-y-1 mr-4">
                  <Image
                    source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                    className="rounded-3xl"
                    style={{ width: width * 0.33, height: height * 0.22 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {
                      item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                    }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>
    </View>
  )
}
