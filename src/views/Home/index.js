import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ConsultationsAdd from "../Consultation/ConsultationAdd";
import HomeUnity from "./HomeUnity";

const Stack = createNativeStackNavigator();

export default function Home(navigation) {
  return (
    <Stack.Navigator initialRouteName="HomeUnity">
      <Stack.Screen
        name="HomeUnity"
        component={HomeUnity}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConsultationsAdd"
        component={ConsultationsAdd}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
