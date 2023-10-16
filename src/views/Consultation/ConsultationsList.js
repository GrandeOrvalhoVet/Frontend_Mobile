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
        {consultations.map((consultation) => (
          <TouchableOpacity
            key={consultation.id}
            onPress={() => navigation.navigate("ConsultationDetail")}
          >
            <Card style={styles.CardAnimal}>
              <Card.Content>
                <View>
                  <View>
                    <View>
                      <Text>{consultation.descricao}</Text>
                      <Text>{consultation.data}</Text>
                      <Text>{consultation.hora}</Text>
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
        <View
          style={{
            height: 1,
            width: "auto",
            backgroundColor: "black",
            margin: 10,
          }}
        />
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ConsultationAdd")}
            style={styles.buttonNewSchedule}
          >
            <Text style={styles.buttonTextNewSchedule}>Novo Agendamento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonNewSchedule: {
    backgroundColor: "#667340",
    height: 50,
    width: "auto",
    padding: 10,
    borderRadius: 15,
    margin: 10,
    justifyContent: "center",
  },
  buttonTextNewSchedule: {
    textShadowColor: "white",
  },
});
