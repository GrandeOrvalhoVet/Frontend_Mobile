import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ConsultationList from "./ConsultationsList";
import ConsultationAdd from "./ConsultationAdd";
import ConsultationDetail from "./ConsultationDetail";

const Stack = createNativeStackNavigator();

export default function Consultations({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="ConsultationList">
      <Stack.Screen
        name="ConstationList"
        component={ConsultationList}
        options={{ headerShown: false}}
      />
      <Stack.Screen
        name="ConsultationAdd"
        component={ConsultationAdd}
        options={{ headerShown: true}}
      />
      <Stack.Screen
        name="ConsultationDetail"
        component={ConsultationDetail}
        options={{ headerShown: true }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
}
