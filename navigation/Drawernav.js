import "react-native-gesture-handler";

import * as React from "react";
import { View, TouchableOpacity, Image, Text, Pressable } from "react-native";

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

export function NavigationDrawerStructure(props) {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return <View style={{ flexDirection: "row" }}></View>;
}

const CustomDrawer = (props, { navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
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
            <Text>John Doe</Text>
            <Text>example@email.com</Text>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: "#f6f6f6",
          padding: 20,
        }}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
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
          drawerLabel: "Home",
          drawerIcon: (props) => <Icon name="home" size={30} color="#900" />,
        }}
        component={Bottomnav}
      />
    </Drawer.Navigator>
  );
}

export default Drawernav;
