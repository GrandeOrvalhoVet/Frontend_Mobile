import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AnimalsList from "./AnimalList";
import AnimalDetail from "./AnimalDetail";

export default function AnimalHome({ navigation }) {
  return (
    <ScrollView>
      <AnimalsList navigation={navigation} />
      <AnimalDetail navigation={navigation} />
    </ScrollView>
  );
}
