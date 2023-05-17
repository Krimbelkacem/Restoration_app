import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";

import Drawernav from "./Drawernav";

import SignUp from "../screens/SignUp";

import AddResto from "../screens/AddResto";
import Addmenuitem from "../screens/Addcategory";
import Addmenu from "../screens/Addmenu";
import Profile from "../screens/UserProfile";
import EditProfile from "../screens/EditProfile";

import ProfilResto from "../screens/ProfilResto";
import Bottomnav from "./Bottomnav";
import TokenContext from "../store/tokencontext";

import UIUserProfile from "../screens/UIProfile";
import UIOnboarding from "../screens/uionboarding";
import ProfileView from "../screens/RestoProfil2";
import MyTabs from "../components/ProfilTab/MyTab";
import CategoryList from "../screens/MenuList";
import Menu from "../screens/Menu";
import Openninghours from "../components/Openinghours";
import FollowersLit from "../components/FollowersList";
const Stack = createNativeStackNavigator();

export default function Authnav() {
  const searchHeader = () => (
    <View>
      <ProfileView />
      <TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>
    </View>
  );

  const [token, setToken] = useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FollowersLit"
          component={FollowersLit}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Openninghours"
          component={Openninghours}
          // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Menu"
          component={Menu}
          // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CategoryList"
          component={CategoryList}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProfileView"
          component={ProfileView}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            header: searchHeader,
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" color={color} size={26} />
            ),
          }}
          //  options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UIOnboarding"
          component={UIOnboarding}
          //options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bottomnav"
          component={Bottomnav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddResto"
          component={AddResto}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Addmenuitem"
          component={Addmenuitem}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Addmenu"
          component={Addmenu}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfilResto"
          component={ProfilResto}
          //options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </TokenContext.Provider>
  );
}
