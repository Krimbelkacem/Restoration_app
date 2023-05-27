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
import {
  SimpleLineIcons,
  Ionicons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  FontAwesome,
} from "react-native-vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Marker, Callout } from "react-native-maps";
import MapView from "react-native-maps";
export default function Details({ Resto }) {
  const latitude = Resto.latitude;
  const longitude = Resto.longitude;
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Animated.View entering={FadeInDown.delay(300).duration(300)}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16 }}>
            Adresse
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
            <Ionicons name="location-outline" size={20} /> {Resto.address}
          </Text>

          <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 36.71671292726152,
                longitude: 4.031816124916077,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: Resto.latitude ?? 0, // Utilisez la latitude du restaurant
                  longitude: Resto.longitude ?? 0, // Utilisez la longitude du restaurant
                }}
                title={Resto.name}
                style={styles.marker}
              >
                <Ionicons name="ios-restaurant" size={12} color="white" />
              </Marker>
            </MapView>
          </View>

          <Text
            style={{ fontFamily: "Poppins-Bold", fontSize: 16, marginTop: 20 }}
          >
            Description
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
            {Resto.descreption}
          </Text>

          <Text
            style={{ fontFamily: "Poppins-Bold", fontSize: 16, marginTop: 20 }}
          >
            Telephone
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
            0659496939
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Bold", fontSize: 16, marginTop: 20 }}
          >
            Type de cuisine
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
            cuine francaise
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Bold", fontSize: 16, marginTop: 20 }}
          >
            prix
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
            500
          </Text>
          <Text
            style={{ fontFamily: "Poppins-Bold", fontSize: 16, marginTop: 20 }}
          >
            Heures d'ouverture
          </Text>
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
            17h
          </Text>
        </View>

        <Text variant="bodyMedium"> </Text>
        <Text variant="bodyMedium"> </Text>
      </Animated.View>
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
  container: {
    height: 200,
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    // Custom marker style
    backgroundColor: "black",
    borderRadius: 5,
    padding: 5,
  },
});
