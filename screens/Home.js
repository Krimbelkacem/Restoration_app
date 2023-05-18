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
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  FlatList,
} from "react-native";
import axios from "axios";
import { Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../utils/config";
import * as Icon from "react-native-feather";
import MyAppbar from "../components/Appbar";
//import Carousel from "react-native-snap-carousel";
import Top from "../components/home/top";

import MyModal from "../components/Modal";
export default function Home({ navigation }) {
  const [userData, setUserData] = useState(null);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [isconnected, setIsconnected] = useState(0);
  useEffect(() => {
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
          }
          console.log(user);
        }
      } catch (error) {
        console.log(error);
        navigation.navigate("Login");
        alert("email or passe not valide");
      }
    };

    fetchUser();

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
    getData();*/
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
  };

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

  return (
    <View>
      <MyAppbar
        isconnected={isconnected}
        userData={userData}
        handleLogout={handleLogout}
        navigation={navigation}
        token={token}
      />
      <Text>HH</Text>
      <View>
        {userData ? (
          <View>
            <Text> {userData.username}</Text>
          </View>
        ) : (
          <View>
            <Text>no</Text>
          </View>
        )}
      </View>
      <Top />
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
