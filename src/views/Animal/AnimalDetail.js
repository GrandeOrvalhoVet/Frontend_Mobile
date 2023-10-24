import { useEffect, useState, useCallback } from "react";
import { Card, Text, FAB } from "react-native-paper";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import ConsultationService from "../../services/consultations";

export default function AnimalDetail({ navigation }) {
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
      <View style={styles.CardDetails}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ width: "90%" }}>
            <Text>Cachorrito</Text>
            <Text>Sexo-Raça-Cão-Peso</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity>
              <Text>Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          style={{ flexDirection: "row", padding: 10 }}
        >
          <View style={styles.Component}></View>
          <View style={styles.Component}></View>
          <View style={styles.Component}></View>
        </ScrollView>
      </View>
      <View
        style={{
          width: "95%",
          margin: 10,
          backgroundColor: "#FFFFFF",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View style={styles.CardConsultas}>
          <View>
            <Text style={styles.TextTitle}>Consultas</Text>
          </View>
          {consultations.map((consultation) => (
            <TouchableOpacity
              key={consultation.id}
              onPress={() =>
                navigation.navigate("Consultas/ConsultationDetail", {
                  consultation: consultation.id,
                })
              }
            >
              <Card style={styles.CardAnimal}>
                <Card.Content>
                  <View style={styles.CardAnimalContent}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        width: "75%",
                        color: "white",
                      }}
                    >
                      {consultation.descricao}
                    </Text>
                    <Text style={{ ontWeight: "bold", color: "white" }}>
                      {consultation.data}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#F2F2F2",
    height: "auto",
  },
  CardDetails: {
    flex: 1,
    backgroundColor: "#A1B575",
    padding: 10,
    borderRadius: 15,
    margin: 10,
    width: "95%",
    height: "auto",
  },
  CardConsultas: {
    flex: 1,
    backgroundColor: "#A1B575",
    width: "100%",
    borderRadius: 15,
  },
  CardAnimal: {
    width: "auto",
    backgroundColor: "#81A649",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
  },
  CardAnimalContent: {
    width: "auto",
    flexDirection: "row",
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
  },
  Component: {
    height: 150,
    width: 150,
    backgroundColor: "#81A649",
    borderRadius: 15,
    margin: 10,
  },
});
