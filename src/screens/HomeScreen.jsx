import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-web';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrendingMovies();
  });

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();

    if (data && data.results)
      setTrending(data.results);
  }

  return (
    <View className="flex-1 bg-blue-400">

      <ScrollView>
        { trending.length > 0 && <TrendingMovies data={trending} />}
      </ScrollView>
    </View>
  )
}
