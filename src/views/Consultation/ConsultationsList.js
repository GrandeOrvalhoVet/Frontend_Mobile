import { useEffect, useState, useCallback } from "react";
import { Card, Text, FAB } from "react-native-paper";
import {
  RefreshControl,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

import ConsultationService from "../../services/consultations";

export default function ConsultationsList({ navigation }) {
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
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.buttonNewSchedule}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ConsultationAdd")}
            style={{ height: 40, width: 40, backgroundColor: "#81A649", margin: 10, borderRadius: 10, }}
          ></TouchableOpacity>
          <Text style={styles.buttonTextNewSchedule}>Novo Agendamento</Text>
        </View>
        <View style={styles.container}>
          {consultations.map((consultation) => (
            <TouchableOpacity
              key={consultation.id}
              onPress={() =>
                navigation.navigate("ConsultationDetail", { consultation: consultation.id })
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#50732D",
    width: "auto",
    margin: 10,
    borderRadius: 15,
  },
  buttonNewSchedule: {
    backgroundColor: "#50732D",
    height: 50,
    width: "auto",
    padding: 10,
    borderRadius: 15,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonTextNewSchedule: {
    fontWeight: "bold",
    color: "white",
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
});
