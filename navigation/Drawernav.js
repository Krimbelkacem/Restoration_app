import "react-native-gesture-handler";
import axios from "axios";
import { Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../utils/config";
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  Dimensions,
} from "react-native";

import Bottomnav from "./Bottomnav";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
// Import Custom Sidebar
//import CustomSidebarMenu from "./CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export function NavigationDrawerStructure(props, { navigation }) {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return <View style={{ flexDirection: "row" }}></View>;
}

const CustomDrawer = (props, { navigation }) => {
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
            setUserId(user._id);
          }
        }
      } catch (error) {
        console.log(error + "vous n estes pqs connecter");
      }
    };

    fetchUser();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      alert("deconnection");
      await AsyncStorage.removeItem("session");
      // userData(null);
      setIsconnected(0);
      // navigation.navigate("Login");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {isconnected === 0 ? (
          <View></View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
                backgroundColor: "#f6f6f6",
                marginBottom: 20,
              }}
            >
              <View>
                <Text>{userData?.username}</Text>
                <Text>{userData?.email}</Text>
              </View>
              <Image
                source={{
                  uri: `${API_URL}/${userData?.picture}`,
                }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
            </View>
          </View>
        )}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {isconnected === 0 ? (
        <View>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              left: 0,
              bottom: 50,
              backgroundColor: "#f6f6f6",
              padding: 20,
            }}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text>connection</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            left: 0,
            bottom: 50,
            backgroundColor: "#f6f6f6",
            padding: 20,
          }}
          onPress={handleLogout}
        >
          <Text>deconnection</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

function Drawernav() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
      // drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="Bottomnav"
        options={{
          headerShown: false,
          drawerLabel: "Home",
          drawerIcon: (props) => <Icon name="home" size={30} color="black" />,
        }}
        component={Bottomnav}
      />
    </Drawer.Navigator>
  );
}

export default Drawernav;
