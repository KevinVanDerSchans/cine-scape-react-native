import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from "react-native";
import { ArrowTrendingUpIcon } from 'react-native-heroicons/solid';
import { image500 } from './../api/fetchers';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');


export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  };

  return (
    <View className="py-4 bg-neutral-900">
      <View className="flex-row mx-4 mb-8 items-center">
        <ArrowTrendingUpIcon size='28' color={theme.red} />
        <Text
          className="text-white text-xl"
          accessible
          accessibilityLabel='Trending List'
        >  Trending
        </Text>
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
};

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        className="rounded-3xl"
        style={{
          width: width * 0.6,
          height: height * 0.4
        }}
        accessibilityLabel="Movie image"
      />
    </TouchableWithoutFeedback>
  )
};
