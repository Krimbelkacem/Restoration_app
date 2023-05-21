import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Card } from "react-native-paper";
import * as Location from "expo-location";
import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,Ionicons
} from "react-native-vector-icons";

//import MapView from "expo-map";
export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      // Request permission to access the user's location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Get the user's current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      // Simulated list of restaurants
      const simulatedRestaurants = [
        {
          id: 1,
          name: "Restaurant 1",
          latitude: currentLocation.coords.latitude + 0.01,
          longitude: currentLocation.coords.longitude + 0.01,
          description: "This is restaurant 1",
        },
        {
          id: 2,
          name: "Restaurant 2",
          latitude: currentLocation.coords.latitude - 0.02,
          longitude: currentLocation.coords.longitude - 0.02,
          description: "This is restaurant 2",
        },
        // Add more restaurants as needed
      ];

      setRestaurants(simulatedRestaurants);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
              title="Marker Title"
              description="Marker Description"
              pinColor="blue" // Customize the marker color
              style={styles.marker} // Apply custom marker style
            >

<Ionicons  name="ios-restaurant" size={32} color="white" />
              <Callout style={styles.calloutContainer}>
              

                <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                <Text style={styles.calloutDescription}>
                {restaurant.description}
                </Text>
              </Card.Content>
            </Card>
                
            
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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

  marker: {
    // Custom marker style
    backgroundColor: "black",
    borderRadius: 5,
    padding: 5,
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
