import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimalPerfil from "./AnimalPerfil";
import AnimalHome from "./AnimalHome";

const Stack = createNativeStackNavigator();

export default function Animal({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Pets">
      <Stack.Screen
        name="Pets"
        component={AnimalHome}
        options={{ headerShown: false }}
        navigation={navigation}

      />
      <Stack.Screen
        name="AnimalPerfil"
        component={AnimalPerfil}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
