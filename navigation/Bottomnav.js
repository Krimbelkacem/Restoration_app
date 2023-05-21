//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import Home from "../screens/Home";
import Searchkey from "../screens/Searchresults";
import Recherche from "../screens/Recherche";
import { Input } from "react-native-elements";
import MyMap from "../screens/MyMap";
import Not from "../notifications/Not";
import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
//const Tab = createMaterialBottomTabNavigator();
export default function Bottomnav({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [value, setValue] = React.useState("");

  const searchHeader = () => (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, marginLeft: 10 }}></Text>
      </View>
      <View>
        {
          // <TextInput style={styles.searchInput} placeholder="Search" />
        }
        <View style={styles.inputContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#aaa"
            style={styles.icon}
          />
          <TextInput
            style={{ height: 50, width: "65%" }}
            placeholder="Search"
            //onChangeText={(restoName) => setrestoName(restoName)}
            blurOnSubmit={false}
            // onSubmitEditing={getDataUsingSimpleGetCall}
            returnKeyType="next"
            // onBlur={getDataUsingSimpleGetCall}
            // value={restoName}
          />
        </View>
      </View>
      <Pressable //onPress={() => navigation.toggleDrawer()}
      >
        <Image
          source={require("../assets/serveur.png")}
          style={styles.profileIcon}
        />
      </Pressable>
    </View>
  );
  return (
    <Tab.Navigator
      // screenOptions={{ headerTitle: searchHeader }}

      /*
        title: "",
        headerRight: () => (
          <View
            style={{
              flexDirection: "row-reverse",
              backgroundColor: "white",
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => navigation.toggleDrawer()}
            >
              <EvilIcons
                name="navicon"
                style={styles.textStyle}
                size={40}
                color="#888"
              />
            </Pressable>
            <View
              style={{
                padding: 5,
                borderRadius: 20,
                width: 300,
              }}
            >
              <View
                style={{
                  backgroundColor: "light-grey",
                  padding: 10,

                  borderRadius: 20,
                }}
              >
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="always"
                  placeholder="Search"
                  style={{ paddingHorizontal: 20 }}
                  value={value}
                />
              </View>
            </View>
          </View>
        ),
      }}*/

      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "skyblue",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          //header: searchHeader,
          headerShown: false,
          tabBarBadge: 10,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="MyMap"
        component={MyMap}
        options={{
          // header: searchHeader,
          headerShown: false,

          headerBackTitle: "Back",
          tabBarLabel: "search",
          tabBarIcon: ({ color }) => (
            <Feather name="map-pin" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Recherche"
        component={Recherche}
        options={{
          // header: searchHeader,
          headerShown: false,

          //headerBackTitle: "Back",
          tabBarLabel: "search",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="search" color={color} size={26} />
          ),
        }}
      />
        <Tab.Screen
        name="Not"
        component={Not}
        options={{
          // header: searchHeader,
          headerShown: false,

          //headerBackTitle: "Back",
          tabBarLabel: "notifications",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="notification" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  see: { width: 300 },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",

    height: 50,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    width: 300,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    margin: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    marginRight: 10,
  },
});
