import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { Card, Avatar } from "react-native-paper";
import { StyleSheet, View, Text, Image } from "react-native";
import axios from "axios";
import { API_URL } from "../utils/config";
import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  Ionicons,
} from "react-native-vector-icons";
export default function MyMap({ navigation }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [restos, setRestos] = useState([]);

  useEffect(() => {
    fetchRestos();
  }, [navigation]);

  const fetchRestos = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin_resto`);

      setRestos(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.69620746716127, // Use the restaurant's latitude
          longitude: 4.055869169533253, // Use the restaurant's longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {restos?.map((restaurant) => (
          <Marker
            key={restaurant._id}
            coordinate={{
              latitude: restaurant.latitude ?? 0, // Utilisez la latitude du restaurant
              longitude: restaurant.longitude ?? 0, // Utilisez la longitude du restaurant
            }}
            title={restaurant.name}
            style={styles.marker}
          >
            <Ionicons name="ios-restaurant" size={15} color="white" />
            <Callout
              onPress={() =>
                navigation.navigate("Resto", {
                  idR: restaurant._id,
                })
              }
              style={styles.calloutContainer}
            >
              <View
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: 10,
                  padding: 12,
                  flexDirection: "row",

                  width: 180,
                }}
              >
                <Image
                  source={{
                    uri: `${API_URL}/${restaurant.avatar.replace(
                      "public",
                      ""
                    )}`,
                  }}
                  style={{ width: 80, height: 80, borderRadius: 10 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      color: "#3d4fb8",
                      fontSize: 15,
                    }}
                  >
                    {restaurant.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: -2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        color: "#fbb131",
                        fontSize: 20,
                        marginBottom: -8,
                        marginLeft: 5,
                      }}
                    >
                      {restaurant.price_average}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      color: "#666666",
                      fontSize: 10,
                      textAlign: "left",
                    }}
                  >
                    {restaurant.description}
                  </Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
  },
  /* map: {
    width: '400%',
    height: '400%',
  },*/
  marker: {
    // Custom marker style
    backgroundColor: "black",
    borderRadius: 5,
    padding: 5,
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    width: 200,
  },

  callout: {
    // Custom callout style
    backgroundColor: "black",
    borderRadius: 10,
    // padding: 10,
    width: 200,
  },

  card: {
    // Custom card style
    borderRadius: 10,
    elevation: 4, // Adds shadow to the card
  },
  calloutTitle: {
    fontSize: 9,
    //fontWeight: "bold",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 9,
  },
});
