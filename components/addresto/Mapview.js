import React, { useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function App({ navigation }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);

    console.log(coordinate.latitude + "\n" + coordinate.longitude);
    // Retrieve the updated latitude and longitude values from state

    navigation.navigate("AddResto", {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onLongPress={handleLongPress}
        initialRegion={{
          latitude: 36.69620746716127, // Use the restaurant's latitude
          longitude: 4.055869169533253, // Use the restaurant's longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "400%",
    height: "400%",
  },
});
