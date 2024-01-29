import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { fallbackActorImage, image185 } from '../api/fetchers';


export default function Cast({ cast, navigation }) {

  return (
    <View className="my-6">
      <Text
        className="text-white text-lg mx-4 mb-5"
        accessible
        accessibilityLabel='Top Cast'
      >
        Top Cast
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          cast && cast.map((actor, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Actor', actor)}
                className="mr-4 items-center"
              >
                <View
                  className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500"
                >
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={{ uri: image185(actor?.profile_path) || fallbackActorImage }}
                    accessibilityLabel="Fallback actor image"
                  />
                </View>

                <Text
                  className="text-white text-xs mt-1"
                  accessible
                  accessibilityLabel={`Actor: ${actor?.character}`}
                >
                  {actor?.character.length > 10 ? actor.character.slice(0, 10) + '...' : actor?.character}
                </Text>

                <Text
                  className="text-neutral-400 text-xs"
                  accessible
                  accessibilityLabel={`Actor full name ${actor?.original_name}`}
                >
                  {actor?.original_name.length > 10 ? actor.original_name.slice(0, 10) + '...' : actor?.original_name}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
};
