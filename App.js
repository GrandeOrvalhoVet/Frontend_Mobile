import * as React from "react";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./src/views/Home";
import Consultation from "./src/views/Consultation";
import Animal from "./src/views/Animal";
import Login from "./src/views/Login";

const Drawer = createDrawerNavigator();

function MainDrawer(navigation) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Animal" component={Animal} />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Home" component={Home} />
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
