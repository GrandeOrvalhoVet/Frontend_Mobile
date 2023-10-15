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
  CardAnimal: {
    width: "100",
    height: "auto",
    backgroundColor: "#667338",
    padding: 10,
    borderRadius: 15,
    margin: 10,
  },
  CardPart: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
  },
  CardImagem: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  CardDados: {
    width: "75%",
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
