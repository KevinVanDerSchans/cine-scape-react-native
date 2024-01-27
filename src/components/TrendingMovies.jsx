import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from "react-native";
import { ArrowTrendingUpIcon } from 'react-native-heroicons/solid';
import Carousel from 'react-native-snap-carousel';
import { image500 } from './../api/moviedb';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {

  const navigation = useNavigation();
  const handleClick = (item) => {
      navigation.navigate('Movie', item);
  }

  return (
    <View className="mb-8 py-4 bg-black">
      <View className="flex-row mx-4 mb-8 items-center">
        <ArrowTrendingUpIcon size='30' color={theme.liked} />
        <Text className="text-white text-xl">  Trending</Text>
      </View>

      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideScale={0.85}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  )
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
            width: width * 0.6,
            height: height * 0.4
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  )
}
