import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const handleButtonPress = () => {
  // Lógica a ser executada quando o botão é tocado
  alert("Botão tocado!");
};

export default function HomeCarousel({ navigation }) {
  return (
    <View>
      <View>
        <Text>Olá o que seu pet Precisa hoje?</Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Consultation')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Consulta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container2}>
          <TouchableOpacity onPress={handleButtonPress} style={styles.button2}>
            <Text style={styles.buttonText}>Banho</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress} style={styles.button2}>
            <Text style={styles.buttonText}>Vacina</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>Emergencia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  container2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  button2: {
    backgroundColor: "blue",
    width: "50%",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
