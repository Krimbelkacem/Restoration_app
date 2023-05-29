import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { API_URL } from "../../utils/config";

export default function Pub({ Resto }) {
  return (
    <ScrollView style={{ minHeight: 300 }}>
      {Resto.photos.length > 0 &&
        Resto.photos.slice(0, 9).map((photo, index) => (
          <View
            style={{
              flexDirection: "row",
              width: 380,
              justifyContent: "space-between",
              marginTop: 20,
            }}
            key={index}
          >
            <Image
              source={{
                uri: `${API_URL}/${photo}`,
              }}
              style={{ width: 120, height: 120, borderRadius: 10 }}
            />
          </View>
        ))}
    </ScrollView>
  );
}
