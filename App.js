import * as React from "react";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Consultation from "./src/views/Consultation";
import Animal from "./src/views/Animal";
import Login from "./src/views/Login";

const Drawer = createDrawerNavigator();

function MainDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#666945",
        },
        headerTitleStyle: {
          color: "white",
        },
        drawerLabelStyle: {
          color: "white",
        },
        headerTitleAlign: "center",
        drawerStyle: {
          backgroundColor: "#666945",
        },
      }}
    >
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Animal"
        component={Animal}
        options={{
          title: "Animais",
        }}
        navigation={navigation}
      />
      <Drawer.Screen name="Consultas" component={Consultation} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}
