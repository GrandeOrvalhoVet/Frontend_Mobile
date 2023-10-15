import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import animalService from "../../services/animals";
const AnimalDetail = ({ route }) => {
  const animalId = route.params.animal;

  const [animal, setAnimal] = useState({});
  const fecthAnimal = async () => {
    const data = await animalService.getAnimalById(animalId);
    setAnimal(data);
  };

  useEffect(() => {
    fecthAnimal();
  }, [animalId]);

  return (
    <View style={styles.container}>
      {animal.id && (
        <>
          <Text>{animal.id}</Text>
          <Text>{animal.nome}</Text>
          <Text>{animal.raca.nome}</Text>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AnimalDetail;
