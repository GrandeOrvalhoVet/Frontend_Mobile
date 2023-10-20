import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { Card, Text, FAB } from "react-native-paper";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import ConsultationService from "../../services/consultations";

const consultationDetail = ({ route }) => {
  const consultationId = route.params.consultation;

  const [consultation, setConsultation] = useState({});
  const fetchConsultation = async () => {
    const data = await ConsultationService.getConsultationById(consultationId);
    setConsultation(data);
  };

  useEffect(() => {
    fetchConsultation();
  }, [consultationId]);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      {consultation.id && (
        <>
          <View style={styles.CardDetails}>
            <Text style={styles.TextTitle}>Informacoes do Consulta</Text>
            <View style={{ marginLeft: 10 }}>
              <View style={{ width: "50%" }}>
                <Text style={styles.TextSubititle}>descricao</Text>
                <Text style={styles.TextDetail}>{consultation.descricao}</Text>
                <Text style={styles.TextSubititle}>data</Text>
                <Text style={styles.TextDetail}>{consultation.data}</Text>
                <Text style={styles.TextSubititle}>hora</Text>
                <Text style={styles.TextDetail}>{consultation.hora}</Text>
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
  },
});

export default consultationDetail;
