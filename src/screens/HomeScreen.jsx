import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Bars3CenterLeftIcon, FilmIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

import { theme } from '../theme';

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-blue-500">

      <SafeAreaView>
        <StatusBar style='light' />

        <View className="flex-row justify-between items-center mx-4 my-2 mb-3">
          <Bars3CenterLeftIcon size='30' strokeWidth={2} color={theme.text} />

          <View className="flex-row">
            <FilmIcon size='30' color={theme.title} />

            <Text className='text-white text-xl font-bold'>
              <Text style={{ color: theme.title }}> CineScape</Text>
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size='30' color={theme.text} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

    </View>
  )
}
