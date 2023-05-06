import React, { useEffect, useState } from "react";

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
const Stack = createNativeStackNavigator();
export default function Authnav() {
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
          name="UIOnboarding"
          component={UIOnboarding}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UIUserProfile"
          component={UIUserProfile}
          //options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bottomnav"
          component={Bottomnav}
          //options={{ headerShown: false }}
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
