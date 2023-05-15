import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
//import L from "leaflet";

export default function MapScreen() {
  const webviewRef = useRef(null);

  return (
    <View style={styles.container}>
      <WebView ref={webviewRef} source={{ uri: "../utils/map.html" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
