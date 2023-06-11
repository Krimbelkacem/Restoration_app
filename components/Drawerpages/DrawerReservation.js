import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { Card } from "react-native-elements";
import { Avatar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
//deleteprofil
import { API_URL } from "../../utils/config";
import FadeIn from "../../screens/day001/components/FadeIn";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "./DrawerHeader";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
export default function DrawerReservation({ route }) {
  reservations = route.params?.reservations;
  console.log(reservations);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="Mes Reservations" />
      {reservations?.length > 0 ? (
        <View>
          <View>
            <FlatList
              data={reservations}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 10,
                    margin: 10,
                    marginBottom: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                  }}
                >
                  <View style={styles.container}>
                    <Avatar.Image
                      size={40}
                      source={{
                        uri: `${API_URL}${item.Resto.avatar
                          .replace("public", "")
                          .replace(/\\/g, "/")}`,
                      }}
                    />
                    <Text style={styles.restaurantName}>{item.Resto.name}</Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        marginBottom: 5,
                      }}
                    >
                      Date: {item.date}
                    </Text>
                    <Text>temps : {item.time}</Text>
                    <Text>nombres de places: {item.guests}</Text>

                    <Text>Status: {item.state}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
}
const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  restaurantName: {
    marginLeft: 8,
    fontSize: 16,
  },
};
