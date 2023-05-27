import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect, useContext } from "react";

import { API_URL } from "../../utils/config";

import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  FadeOutRight,
  Layout,
  ceil,
} from "react-native-reanimated";

import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from "react-native";

import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";

export default function MenuResto({ navigation, menu }) {
  const { width, height } = Dimensions.get("window");

  const slicedCategories = menu?.categories;
  const slicedItems = slicedCategories?.flatMap((category) => category.items);

  return (
    <View>
      <View>
        {slicedCategories?.map((category) => (
          <View key={category._id}>
            <View style={{ flex: 1, backgroundColor: "white", padding: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Poppins-Bold", fontSize: 25 }}>
                  {category.name}
                </Text>
              </View>
              {category?.items?.slice(0, 5).map((item) => (
                <View key={item._id}>
                  <Animated.View
                    entering={FadeInRight.delay(300).duration(300)}
                  >
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10,
                        paddingBottom: 10,
                        borderColor: "black",
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <View style={{ justifyContent: "center", flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: "Poppins-Medium",
                            color: "black",
                            marginTop: 4,
                            marginLeft: 12,
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: "Poppins-Regular",
                            color: "black",
                            marginTop: 4,
                            marginLeft: 12,
                            marginTop: -5,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Poppins-Regular",
                          color: "black",
                          marginTop: 4,
                          marginLeft: 12,
                        }}
                      >
                        {item.price}DZD
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 4,
  },
  informationContainer: {
    width: 150,
    height: 150,
    marginLeft: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  label: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 10,
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
  },
  seeAllButton: {
    backgroundColor: "#A9A9A9",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  seeAllButtonText: {
    color: "#eee",
  },
  sectionBody: {
    marginTop: 10,
  },
  sectionScroll: {
    paddingBottom: 20,
  },
  sectionCard: {
    width: 200,
    minHeight: 200,
    backgroundColor: "#fff",
    shadowColor: "#B0C4DE",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  sectionImage: {
    width: "100%",
    aspectRatio: 1,
  },
  sectionInfo: {
    padding: 10,
  },
  sectionLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
});
