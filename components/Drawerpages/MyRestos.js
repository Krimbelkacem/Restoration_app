import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
//deleteprofil
import { API_URL } from "../../utils/config";
import FadeIn from "../../screens/day001/components/FadeIn";
import Icon from "react-native-vector-icons/FontAwesome";

import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import Header from "./DrawerHeader";
export default function MyRestos({ route, navigation }) {
  const restoData = route.params.Restos;
  return (
    <View>
      <Header title="Mes Restaurants" />
      {restoData?.length > 0 ? (
        <View>
          <View>
            {restoData.map((resto) => (
              <Animated.View
                key={resto.id}
                entering={FadeInRight.delay(300).duration(400)}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginVertical: 15,
                    marginHorizontal: 15,
                  }}
                  onPress={() =>
                    navigation.navigate("Resto", {
                      // rest: resto,
                      idR: resto._id,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: `${API_URL}/${resto.avatar}`,
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 20,
                      resizeMode: "cover",
                    }}
                  />
                  <View style={{ flexDirection: "column", marginTop: 5 }}>
                    <Text
                      style={{
                        color: "#263238",
                        fontSize: 16,
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {resto.name}
                    </Text>
                    <Text
                      style={{
                        color: "#263238",
                        fontSize: 12,
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {resto.description}
                    </Text>
                    <Text
                      style={{
                        color: "#263238",
                        fontSize: 14,
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {resto.address}
                    </Text>

                    <Text
                      style={{
                        color: "#263238",
                        fontSize: 14,
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {resto.price_average} :prixMoyenn
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
}
