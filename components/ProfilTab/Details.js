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

export default function Details() {
  return (
    <View>
      <Text>
     Details
      </Text>
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
