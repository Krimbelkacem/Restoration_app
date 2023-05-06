// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Authnav from "./navigation/Authnav";
import { AppRegistry } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
//import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Authnav />
      </NavigationContainer>
    </ApplicationProvider>
  );
}
AppRegistry.registerComponent("MyApp", () => App);
export default App;
