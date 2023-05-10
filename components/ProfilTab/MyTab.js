import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";
//import Details from "./Details";
import Menu from "./Menu";
import Avis from "./Avis";
import Reservation from "./Reservation";
import Pub from "./Pub";
import ProfileView from "../../screens/Restoprofil1";

import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";
const Tab = createMaterialTopTabNavigator();

function Details() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Screen 1</Text>
    </View>
  );
}

function CustomHeaderTitle() {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
        My App
      </Text>
    </View>
  );
}

export default function MenuResto() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Avis" component={Avis} />
    </Tab.Navigator>
  );
}
