import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect, useContext } from "react";
import { Pressable } from "react-native";
import { API_URL } from "../../utils/config";
import axios from "axios";

import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";

import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";

export default function Cuisines({ navigation, menu, cuisinesRestos }) {
  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 26 }}>
            Cuisines
          </Text>
        </View>

        <ScrollView horizontal style={{ height: 150 }}>
          {cuisinesRestos?.map((cuisine) => (
            <TouchableOpacity
              key={cuisine._id}
              style={{ alignItems: "center", marginLeft: 10 }}
            >
              <Image
                source={{
                  uri: `${API_URL}/${cuisine.image}`,
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Poppins-Bold",
                  color: "black",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {cuisine.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
