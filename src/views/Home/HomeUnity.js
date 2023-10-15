import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HomeMain from "./HomeMain";
import HomeCarousel from "./HomeCarousel";

export default function HomeUnity() {
  return (
    <View>
      <HomeCarousel />
      <HomeMain />
    </View>
  );
}