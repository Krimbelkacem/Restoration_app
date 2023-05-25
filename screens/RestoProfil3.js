import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
  TextInput,
  Modal,
  Text,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutRight,
  Layout,
} from "react-native-reanimated";
import Details from "../components/ProfilTab/Details";
import Menu from "../components/ProfilTab/Menu";
import Pub from "../components/ProfilTab/Pub";
import Reservation from "../components/ProfilTab/Reservation";
import Avis from "../components/ProfilTab/Avis";
export default function Resto() {
  const [currentComponent, setCurrentComponent] = useState("Details");

  const buttonStyle = (componentName) => {
    return currentComponent === componentName
      ? { backgroundColor: "blue" }
      : {};
  };

  const renderComponent = (componentName) => {
    switch (componentName) {
      case "Details":
        return <Details />;
      case "Menu":
        return <Menu />;
      case "Publication":
        return <Pub />;
      case "Reservation":
        return <Reservation />;
      case "Avis":
        return <Avis />;
      default:
        return null;
    }
  };

  const handlePress = (componentName) => {
    setCurrentComponent(componentName);
  };

  return (
    <Animated.View entering={FadeInDown.delay(900).duration(300)}>
      <ScrollView
        horizontal
        style={{ flexGrow: 0 }}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[
            { paddingVertical: 10, paddingHorizontal: 20 },
            buttonStyle("Details"),
          ]}
          onPress={() => handlePress("Details")}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              color: "#ababab",
              fontSize: 14,
            }}
          >
            Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            { paddingVertical: 10, paddingHorizontal: 20 },
            buttonStyle("Menu"),
          ]}
          onPress={() => handlePress("Menu")}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              color: "#ababab",
              fontSize: 14,
            }}
          >
            Menu
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            { paddingVertical: 10, paddingHorizontal: 20 },
            buttonStyle("Publication"),
          ]}
          onPress={() => handlePress("Publication")}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              color: "#ababab",
              fontSize: 14,
            }}
          >
            Publication
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            { paddingVertical: 10, paddingHorizontal: 20 },
            buttonStyle("Reservation"),
          ]}
          onPress={() => handlePress("Reservation")}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              color: "#ababab",
              fontSize: 14,
            }}
          >
            Reservation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            { paddingVertical: 10, paddingHorizontal: 20 },
            buttonStyle("Avis"),
          ]}
          onPress={() => handlePress("Avis")}
        >
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              color: "#ababab",
              fontSize: 14,
            }}
          >
            Avis
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Render the selected component */}
      {renderComponent(currentComponent)}
    </Animated.View>
  );
}
