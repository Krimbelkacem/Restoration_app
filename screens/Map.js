import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

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
            >
              <Callout style={styles.calloutContainer}>
                <View>
                  <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                  <Text style={styles.calloutDescription}>
                    {restaurant.description}
                  </Text>
                </View>
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
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
  },
});
