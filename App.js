// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Authnav from "./navigation/Authnav";
import { AppRegistry, Alert } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

//import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";

import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo";
import * as Permissions from "expo-permissions";
import { ToastAndroid } from "react-native";
import { useFonts } from "expo-font";
function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/poppins/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    // Request permission and register for push notifications
    registerForPushNotificationsAsync();

    // Add a listener for incoming notifications
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Handle the incoming notification
        handleNotification(notification);
      }
    );

    return () => {
      // Clean up the listener when the component unmounts
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token = null;

    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      if (finalStatus === "granted") {
        token = await Notifications.getExpoPushTokenAsync({
          projectId: "YOUR_PROJECT_ID",
        });
        console.log("Expo Push Token:", token);
      } else {
        console.log("Permission for push notifications declined");
      }
    } else {
      console.log(
        "Device is not a physical device, push notifications are not supported"
      );
    }

    return token;
  };

  const handleNotification = (notification) => {
    // Extract the title and body from the received notification
    const { title, body } = notification.request.content.data;

    // Display the notification as an alert
    Alert.alert(title, body);
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Authnav />
      </NavigationContainer>
    </ApplicationProvider>
  );
}

AppRegistry.registerComponent("MyApp", () => App);
export default App;
