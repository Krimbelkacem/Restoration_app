import React, { useState, useEffect, useRef } from "react";

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
  Row,
  ContainerImage,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";
import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  FontAwesome,
} from "react-native-vector-icons";
import { ButtonGroup } from "react-native-elements";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";

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
import Populaire from "../components/home/Populaire";
import { Stack, IconButton } from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";
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
    fetchpub();
    fetchUser();
    fetchTopRestos();
    fetchRecentssRestos();
    fetchcuisines();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [navigation]);

  useEffect(() => {
    const handleFocus = () => {
      fetchUser();
      fetchpub();
    };

    const unsubscribe = navigation.addListener("focus", handleFocus);

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // Additional effect for handling page refresh
  useEffect(() => {
    fetchUser();
    fetchTopRestos();
    fetchRecentssRestos();
    fetchcuisines();
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
  /////////////////////////////////////////////////
  const [homePub, setHomepub] = useState([]);

  const fetchpub = async () => {
    try {
      const response = await axios.get(`${API_URL}/homePub`);
      setHomepub(response.data);
      console.log("homePub", homePub);
    } catch (error) {
      console.error(error);
    }
  };

  //////////////////////////////// get user on connexion
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

  ///////////////////////////////////// get top resto
  const [topRestos, setTopRestos] = useState([]);

  const fetchTopRestos = async () => {
    try {
      // Replace with your API endpoint
      const response = await axios.get(`${API_URL}/top-restaurants`);
      setTopRestos(response.data);
      console.log("TopRestos" + response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [recentsRestos, setRecentsRestos] = useState([]);
  const fetchRecentssRestos = async () => {
    try {
      // Replace with your API endpoint
      const response = await axios.get(`${API_URL}/recents-restaurants`);
      setRecentsRestos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [cuisinesRestos, setCuisinesRestos] = useState([]);
  const fetchcuisines = async () => {
    try {
      // Replace with your API endpoint
      const response = await axios.get(`${API_URL}/random-cuisines`);
      if (response) {
        setCuisinesRestos(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error + "cuisines");
    }
  };

  //////////////////////////////////notifications
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

  /////////////////////////////////////////////////////////////////////
  const [isOpen, setIsOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    Animated.timing(drawerAnimation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    setIsOpen(false);
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const drawerTranslateY = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });
  const handleButtonPress = () => {
    // Handle button press here
  };
  ///////////////////////////////

  /////////////////////

  const renderHomePub = () => {
    const firstSection = homePub.slice(0, 2);
    const secondSection = homePub.slice(2, 4);

    return (
      <View>
        <View>{renderSection(firstSection)}</View>
        <View>{renderSection(secondSection)}</View>
      </View>
    );
  };

  const renderSection = (section) => {
    return section.map((resto) => (
      <View style={{ backgroundColor: "white" }} key={resto.restoId}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() =>
            navigation.navigate("Resto", {
              idR: resto.restoId,
            })
          }
        >
          <ContainerImage
            source={{
              uri: `${API_URL}/${resto.avatar}`,
            }}
            size={40}
            circle
            style={{ marginRight: 5 }}
          />
          <View>
            <Text
              style={{
                marginHorizontal: 5,
                fontSize: 12,
                fontWeight: "800",
                fontFamily: "Poppins-Bold",

                marginBottom: 0,
              }}
            >
              {resto.name}
            </Text>
            <Text
              style={{
                marginHorizontal: 5,
                marginTop: 2,
                fontSize: 11,
                fontWeight: "300",
              }}
            >
              {resto.address}
            </Text>
          </View>
        </TouchableOpacity>
        <ContainerImage
          source={{
            uri: `${API_URL}/${resto.photo}`,
          }}
          size={windowWidth - 5}
        />
      </View>
    ));
  };

  const ContainerImage = ({
    source,
    size,
    width,
    height,
    mode,
    circle,
    style,
  }) => {
    return (
      <View
        style={[
          {
            width: size || width || 25,
            height: size || height || 25,
            borderRadius: circle ? size / 2 : 0,
          },
          style,
        ]}
      >
        <Image
          source={source}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: mode || "contain",
            borderRadius: circle ? size / 2 : 10,
            marginLeft: 2,
          }}
        />
      </View>
    );
  };
  /////////////////////////////////////
  return (
    <View styles={{ flex: 1, backgroundColor: "white" }}>
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
        contentContainerStyle={{ backgroundColor: "white" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ marginBottom: 100 }}
      >
        <View
          style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 20 }}
        >
          <Populaire navigation={navigation} recentsRestos={topRestos} />
        </View>
        <View
          style={{
            paddingHorizontal: 12,
            backgroundColor: "white",
            borderBottomColor: "#6e7e87",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
          }}
        >
          <Cuisines cuisinesRestos={cuisinesRestos} />
        </View>
        <View
          style={{
            paddingHorizontal: 12,
            backgroundColor: "white",
            borderBottomColor: "#6e7e87",
            borderBottomWidth: 0.5,
            paddingBottom: 10,
          }}
        >
          <Top navigation={navigation} topRestos={topRestos} />
        </View>
        <View>{renderSection(homePub.slice(0, 2))}</View>

        <View style={styles.mainContent}>
          <TouchableOpacity onPress={toggleDrawer}></TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: "white" }}></View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ padding: 12, backgroundColor: "white" }}>
            <Recents navigation={navigation} recentsRestos={recentsRestos} />
          </View>
        </View>
        <View>{renderSection(homePub.slice(3, 8))}</View>
      </ScrollView>
      {/*isOpen && (
        <TouchableOpacity style={styles.overlay} onPress={closeDrawer}>
          <Animated.View
            style={[
              styles.drawer,
              { transform: [{ translateY: drawerTranslateY }] },
            ]}
          >
    
            <View style={styles.drawerContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeDrawer}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Ionicons name="log-out" size={24} color="#000" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
        
            </View>
          </Animated.View>
        </TouchableOpacity>
          )*/}
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
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  drawerContent: {
    padding: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logoutText: {
    marginLeft: 8,
  },
});
