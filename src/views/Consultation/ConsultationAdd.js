import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";

import animalService from "../../services/animals";
import consultationService from "../../services/consultations";

export default function ConsultationAdd({ navigation }) {

  const [isFocus, setIsFocus] = useState(false);

  const [consultation, setConsultations] = useState({
    descricao: "",
    data: "",
    hora: "",
    animais: null,
  });

  const [animal, setAnimals] = useState([]);

  const getAnimals = async () => {
    const data = await animalService.getAllAnimals();
    setAnimals(data);
  };

  useEffect(() => {
    getAnimals();
  }, []);

  const save = async () => {
    const data = await consultationService.saveConsultation(consultation);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: "#50732D",
          padding: 10,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <TextInput
          label="descricao"
          style={styles.TextInput}
          onChangeText={(text) =>
            setConsultations((consultation) => ({
              ...consultation,
              descricao: text,
            }))
          }
          value={consultation.descricao}
        />
        <TextInput
          label="Dia"
          type="date"
          style={styles.TextInput}
          onChangeText={(text) =>
            setConsultations((consultation) => ({
              ...consultation,
              data: text,
            }))
          }
          value={consultation.data}
        />
        <TextInput
          label="Horario"
          style={styles.TextInput}
          onChangeText={(text) =>
            setConsultations((consultation) => ({
              ...consultation,
              hora: text,
            }))
          }
          value={consultation.hora}
        />
        <Dropdown
          style={[
            styles.dropdown,
            {
              backgroundColor: "#81A649",
              borderRadius: 10,
              margin: 10,
              height: 50,
              width: "auto",
            },
            isFocus && {
              borderBottomColor: "#81A649",
            },
          ]}
          containerStyle={[
            {
              backgroundColor: "#81A649",
            },
          ]}
          placeholderStyle={styles.placeholderStyle}
          itemContainerStyle={[
            {
              backgroundColor: "#81A649",
            },
          ]}
          selectedTextStyle={styles.selectedTextStyle}
          data={animal}
          maxHeight={300}
          labelField="nome"
          valueField="id"
          placeholder={isFocus ? "..." : "Selecionar Animal"}
          value={consultation.animais}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(animal) => {
            setConsultations((consultation) => ({
              ...consultation,
              animais: animal.id,
            }));
            setIsFocus(false);
          }}
        />
        <View>
          <TouchableOpacity onPress={save} style={styles.buttons}>
            <Text style={styles.textImput}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  dropdown: {
    height: 55,
    borderBottomColor: "#000a",
    borderBottomWidth: 0.8,
    borderTopRadius: 4,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#000a",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buttons: {
    borderRadius: 10,
    backgroundColor: "#81A649",
    justifyContent: "space-around",
    marginTop: 20,
    marginHorizontal: 50,
    marginBottom: 20,
    padding: 10,
    alignItems: "center",
  },
  TextInput: {
    color: "#000a",
    backgroundColor: "#81A649",
    margin: 10,
  },
});
