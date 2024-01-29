import React from "react";
import { View, ActivityIndicator } from "react-native";
import { theme } from "../theme";

export default function Spinner() {
  return (
    <View className="absolute flex-row justify-center items-center h-screen w-screen">
      <ActivityIndicator
        size="large"
        color={theme.blue}
        style={{ transform: [{ scaleX: 3 }, { scaleY: 3 }] }}
        accessible
        accessibilityLabel="Loading data..."
      />
    </View>
  )
}
