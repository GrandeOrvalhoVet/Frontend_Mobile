import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { Card, Text, FAB } from "react-native-paper";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import animalService from "../../services/animals";
import ConsultationService from "../../services/consultations";
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

  const [refreshing, setRefreshing] = useState(false);
  const [consultations, setConsultations] = useState([]);

  const fetchConsultations = async () => {
    const data = await ConsultationService.getAllConsultation();
    setConsultations(data);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchConsultations();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchConsultations();
  }, []);

  return (
    <View style={styles.container}>
      {animal.id && (
        <>
          <View
            style={{
              width: 400,
              height: 200,
              backgroundColor: "#667338",
              borderBottomLeftRadius: 200,
              borderBottomRightRadius: 200,
              alignItems: "center",
              alignContent: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ height: "75%", width: "50%" }}
              source={{ uri: animal.capa.url }}
            />
          </View>
          <View
            style={{
              height: "15%",
              width: "90%",
              margin: 5,
              backgroundColor: "#A1B575",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text>Informacoes do animal</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%" }}>
                <Text>{animal.nome}</Text>
                <Text>{animal.peso}</Text>
                <Text>{animal.sexo}</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text>{animal.status}</Text>
                <Text>{animal.tipo_sanguineo}</Text>
                <Text>{animal.idade}</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: "auto",
              width: "90%",
              margin: 5,
              backgroundColor: "#A1B575",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text>Consultas</Text>
            {consultations.map((consultation) => (
              <TouchableOpacity
                key={consultation.id}
                onPress={() => navigation.navigate("ConsultationDetail")}
              >
                <Card>
                  <Card.Content>
                    <View>
                      <Text>{consultation.descricao}</Text>
                      <Text>{consultation.data}</Text>
                      <Text>{consultation.hora}</Text>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
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
  },
});

export default AnimalDetail;
