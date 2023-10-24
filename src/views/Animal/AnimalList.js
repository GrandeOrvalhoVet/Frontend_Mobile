import { useEffect, useState, useCallback } from "react";
import { Card, Text, FAB } from "react-native-paper";
import {
  RefreshControl,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import AnimalService from "../../services/animals";

export default function AnimalsList({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [animals, setAnimals] = useState([]);

  const fetchAnimals = async () => {
    const data = await AnimalService.getAllAnimals();
    setAnimals(data);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAnimals();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {animals.map((animal) => (
          <Card key={animal.id} style={styles.CardStyle}>
            <Card.Content
              style={{
                alignContent: "center",
                alignItems: "center",
                width: "auto",
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AnimalPerfil", { animal: animal.id })
                }
              >
                <Card.Cover
                  style={{ height: 100, width: 100, borderRadius: 1000 }}
                  source={{ uri: animal.capa.url }}
                />
              </TouchableOpacity>
              <View>
                <Text>{animal.nome}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
  },
  CardStyle: {
    borderRadius: 15,
    padding: 20,
    margin: 10,
    height: "auto",
    width: "20%",
    backgroundColor: "#50732D",
  },
});
