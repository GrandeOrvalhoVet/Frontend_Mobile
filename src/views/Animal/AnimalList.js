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
      <View style={{ margin: 20, height: "auto", width: "auto" }}>
        <Text
          style={{
            textTransform: "none",
            fontSize: 35,
            fontFamily: "Times New Roman",
          }}
        >
          Seus pets
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {animals.map((animal) => (
          <Card key={animal.id} style={styles.CardAnimal}>
            <Card.Content>
              <TouchableOpacity
                style={styles.CardPart}
                onPress={() =>
                  navigation.navigate("AnimalDetail", { animal: animal.id })
                }
              >
                <Card.Cover
                  style={{ height: 100, width: 100 }}
                  source={{ uri: animal.capa.url }}
                />
                <View style={styles.CardDados}>
                  <View style={styles.CardDetalhes}>
                    <Text style={styles.TextDados}>Nome: {animal.nome}</Text>
                    <Text style={styles.TextDados}>Idade: {animal.idade}</Text>
                    <Text style={styles.TextDados}>Peso: {animal.peso} kg</Text>
                  </View>
                  <View style={styles.CardSlash} />
                  <View style={styles.CardDetalhes}>
                    <Text style={styles.TextDados}>Sexo: {animal.sexo}</Text>
                    <Text style={styles.TextDados}>?</Text>
                    <Text style={styles.TextDados}>?</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
    backgroundColor: "#F2F2F2",
  },
  CardAnimal: {
    width: "auto",
    backgroundColor: "#667338",
    borderRadius: 15,
    margin: 10,
  },
  CardPart: {
    width: "auto",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  CardDados: {
    width: "80%",
    padding: 10,
    flexDirection: "row",
  },
  CardDetalhes: {
    width: "50%",
    textAlign: "center",
    padding: 5,
  },
  CardSlash: {
    width: 1,
    height: "100%",
    textAlign: "center",
    backgroundColor: "black",
  },
  TextDados: {
    fontFamily: "Times New Roman",
    fontSize: 15,
    margin: 5,
  },
});
