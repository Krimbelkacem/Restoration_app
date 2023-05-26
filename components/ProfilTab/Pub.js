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
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          height: "auto",
        }}
      >
        {Resto.photos.length > 0 &&
          Resto.photos.slice(0, 9).map((photo, index) => (
            <View key={index}>
              <TouchableOpacity>
                <Image
                  style={{
                    width: 113,
                    height: 113,
                    marginTop: 5,
                    marginRight: 5,
                  }}
                  source={{
                    uri: `${API_URL}/${photo}`,
                  }}
                />
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}
