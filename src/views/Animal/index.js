import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimalList from "./AnimalList";
import AnimalDetail from "./AnimalDetail";

const Stack = createNativeStackNavigator();

export default function Animal() {
  return (
    <Stack.Navigator initialRouteName="AnimalList">
      <Stack.Screen
        name="AnimalList"
        component={AnimalList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AnimalDetail"
        component={AnimalDetail}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
