// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Authnav from "./navigation/Authnav";
import { AppRegistry } from "react-native";
function App() {
  return (
    <NavigationContainer>
      <Authnav />
    </NavigationContainer>
  );
}
AppRegistry.registerComponent("MyApp", () => App);
export default App;
