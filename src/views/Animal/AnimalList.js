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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {animals.map((animal) => (
          <Card key={animal.id}>
            <Card.Content style={styles.CardAnimal}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AnimalDetail", { animal: animal.id })
                }
              >
                <View>
                  <Card.Cover
                    style={{ height: 100, width: 100 }}
                    source={{ uri: animal.capa.url }}
                  />
                  <View style={styles.CardDados}>
                    <View style={styles.CardDetalhes}>
                      <Text>Nome: {animal.nome}</Text>
                      <Text>Idade: {animal.idade}</Text>
                      <Text>Sexo: {animal.sexo}</Text>
                      <Text>Peso: {animal.peso} kg</Text>
                    </View>
                    <View style={styles.CardSlash} />
                    <View style={styles.CardDetalhes}>
                      <Text>Status:{animal.status}</Text>
                      <Text>?</Text>
                      <Text>?</Text>
                      <Text>?</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.CardSlash2} />
                <View style={styles.CardPart2}>
                  <View style={styles.CardConsulta}>
                    <Text>Consulta</Text>
                  </View>
                  <View style={styles.CardConsulta}>
                    <Text>Consulta 2</Text>
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
  CardAnimal: {
    width: "100%",
    height: "auto",
    backgroundColor: "#667338",
    borderRadius: 15,
    margin: 10,
  },
  CardPart: {
    width: "75%",
    height: "100%",
    flexDirection: "row",
  },
  CardImagem: {
    height: "auto",
    width: "auto",
  },
  CardDados: {
    width: "50%",
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
  CardSlash2: {
    width: "100%",
    height: 1,
    margin: 2,
    textAlign: "center",
    backgroundColor: "black",
  },
  CardPart2: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  CardConsulta: {
    width: "100%",
    height: "40%",
    padding: 10,
    margin: 5,
    backgroundColor: "#525A35",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
