import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import ActorScreen from "../screens/ActorScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function Tabs () {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let label;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
            label = "Home"

          } else if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search-outline";
            label = "Search"
          }

          return <Ionicons name={iconName} size={size} color={color} accessibilityLabel={label} />;
        },
        tabBarActiveTintColor: `${theme.title}`,
        tabBarInactiveTintColor: `${theme.text}`,
        tabBarStyle: { backgroundColor: "#275fba" },
      })}
  >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
    </Tab.Navigator>
  )
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" options={{ headerShown: false }} component={Tabs} />

        <Stack.Screen name="Movie" options={{ headerShown: false }} component={ MovieScreen } />
        <Stack.Screen name="Actor" options={{ headerShown: false }} component={ ActorScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
