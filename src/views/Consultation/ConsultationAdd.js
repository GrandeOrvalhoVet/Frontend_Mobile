import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";

import animalService from "../../services/animals";
import consultationService from "../../services/consultations";

export default function ConsultationAdd({ navigation }) {
  const theme = useTheme();

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
      <View style={{ marginHorizontal: 10 }}>
        <TextInput
          label="descricao"
          style={{ marginBottom: 10 }}
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
          style={{ marginBottom: 10 }}
          type="date"
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
          style={{ marginBottom: 10 }}
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
              backgroundColor: theme.colors.surfaceVariant,
            },
            isFocus && {
              borderBottomColor: theme.colors.primary,
              borderBottomWidth: 1.5,
            },
          ]}
          containerStyle={[
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
          placeholderStyle={styles.placeholderStyle}
          itemContainerStyle={[
            {
              backgroundColor: theme.colors.surfaceVariant,
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
      </View>
      <View style={styles.buttons}>
        <Button mode="contained" onPress={save}>
          Adicionar
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
});
