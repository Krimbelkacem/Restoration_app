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

export default function Details({ Resto }) {
  return (
    <View style={{ minHeight: 300 }}>
      <Text>{Resto.name}</Text>
      <Text variant="bodyMedium"> {Resto.address}</Text>
      <Text variant="bodyMedium"> {Resto.latitude}</Text>
      <Text variant="bodyMedium"> {Resto.longitude}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  infoValue: {
    marginTop: 5,
  },
});
