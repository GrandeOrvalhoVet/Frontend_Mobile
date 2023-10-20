import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { Card, Text, FAB } from "react-native-paper";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import animalService from "../../services/animals";
import ConsultationService from "../../services/consultations";

const AnimalPerfil = ({ route }) => {
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
          <View>
            <Image style={styles.Image} source={{ uri: animal.capa.url }} />
          </View>
          <View style={styles.CardDetails}>
            <Text style={styles.TextTitle}>Informacoes do animal</Text>
            <View style={{ marginLeft: 10 }}>
              <View style={{ width: "50%" }}>
                <Text style={styles.TextSubititle}>Nome</Text>
                <Text style={styles.TextDetail}>{animal.nome}</Text>
                <Text style={styles.TextSubititle}>Peso</Text>
                <Text style={styles.TextDetail}>{animal.peso}</Text>
                <Text style={styles.TextSubititle}>Sexo</Text>
                <Text style={styles.TextDetail}>{animal.sexo}</Text>
                <Text style={styles.TextSubititle}>Status</Text>
                <Text style={styles.TextDetail}>{animal.status}</Text>
                <Text style={styles.TextSubititle}>Tipo sanguineo</Text>
                <Text style={styles.TextDetail}>{animal.tipo_sanguineo}</Text>
                <Text style={styles.TextSubititle}>idade</Text>
                <Text style={styles.TextDetail}>{animal.idade}</Text>
              </View>
            </View>
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
  Image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  CardDetails: {
    height: "auto",
    width: "90%",
    margin: 5,
    backgroundColor: "#A1B575",
    borderRadius: 10,
    padding: 10,
  },
  TextSubititle: {
    fontSize: 12,
    marginBottom: 5,
  },
  TextDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  TextTitle: {
    fontSize: 20,
    margin: 10,
  }
});

export default AnimalPerfil;
