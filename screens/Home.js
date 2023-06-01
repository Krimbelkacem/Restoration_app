import React, { useState, useEffect } from "react";

import {
  Image,
  Pressable,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  FlatList,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../utils/config";
import * as Icon from "react-native-feather";
import MyAppbar from "../components/Appbar";
//import Carousel from "react-native-snap-carousel";
import Top from "../components/home/top";
import Recents from "../components/home/recents";
import Cuisines from "../components/home/cuisines";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import io from "socket.io-client";
//import MyModal from "../components/Modal";
export default function Home({ navigation }) {
  const [userData, setUserData] = useState(null);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [isconnected, setIsconnected] = useState(0);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  /* useEffect(() => {
    const fetchUser = async () => {
      try {
        const sessionData = await AsyncStorage.getItem("session");
        if (sessionData) {
          const { token } = JSON.parse(sessionData);
          setToken(token);
          const response = await fetch(`${API_URL}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = await response.json();
          setUserData(user);
          if (user) {
            setIsconnected(1);
            setUserId(user._id);

            handleJoin(user._id);
          }
        }
      } catch (error) {
        console.log(error + "vous n estes pqs connecter");
      }
    };

    fetchUser();
*/
  /*
    const getData = async () => {
      const unsubscribe = navigation.addListener("focus", async () => {
        const sessionString = await AsyncStorage.getItem("session");
        if (sessionString) {
          const sessionData = JSON.parse(sessionString);
          setUserId(sessionData.userId);
          setToken(sessionData.token);
        }
        if (token) {
          getUserProfile(token);
        }
      });

      return unsubscribe;
    };
    getData();
  }, [navigation]);
  const getUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log("ok");
      console.log(response.data);
      setUserData(response.data);
      // setIsconnected(1);
    } catch (error) {
      console.log(error);
      alert("no");
    }
  };*/
  const fetchUser = async () => {
    try {
      const sessionData = await AsyncStorage.getItem("session");
      if (sessionData) {
        const { token } = JSON.parse(sessionData);
        setToken(token);
        const response = await fetch(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await response.json();
        setUserData(user);
        if (user) {
          setIsconnected(1);
          setUserId(user._id);
          handleJoin(user._id);
        }
      }
    } catch (error) {
      console.log(error + "vous n'estes pas connecté");
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      fetchUser();
    };

    const unsubscribe = navigation.addListener("focus", handleFocus);

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // Additional effect for handling page refresh
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      alert("nn");
      await AsyncStorage.removeItem("session");
      // userData(null);
      setIsconnected(0);
      // navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const [notificationMessage, setNotificationMessage] = useState("");
  const [receivedNotification, setReceivedNotification] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const socket = io(`${API_URL}`);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("notification", (message) => {
      // Handle received notification
      setReceivedNotification(message);
      setNotificationCount((prevCount) => prevCount + 1);
      console.log("Received notification:", message);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoin = (userId) => {
    console.log("envoie de id user connecter");
    // Send the user ID to the server
    socket.emit("join", userId);
  };

  /* const handleSendNotification = () => {
    // Send a notification to the server
    socket.emit('notification', { userId, message: notificationMessage });
  };*/

  return (
    <View>
      <MyAppbar
        isconnected={isconnected}
        userData={userData}
        handleLogout={handleLogout}
        navigation={navigation}
        token={token}
        receivedNotification={receivedNotification}
        notificationCount={notificationCount}
      />

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, backgroundColor: "white" }}></View>
        <View style={{ flex: 1 }}>
          <View style={{ padding: 12, backgroundColor: "white" }}>
            <Top navigation={navigation} />
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ padding: 12, backgroundColor: "white" }}>
            <Recents navigation={navigation} />
          </View>
          <View style={{ padding: 12, backgroundColor: "white" }}>
            <Cuisines />
          </View>
        </View>
      </ScrollView>
    </View>

    /*<Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={200}
        autoplay={true}
        loop={true}
  />*/
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  see: { width: 300 },

  item: {
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
