import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { Tab } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuResto from "../menuresto/MenuResto";
import { API_URL } from "../../utils/config";
import axios from "axios";
export default function Menu({ idR, navigation, display, getRestoProfile }) {
  const restoId = idR;
  const isowner = display;

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const fetchedMenu = await getMenuResto(restoId);
      } catch (error) {
        // Handle error
        console.error(error.message + "menu");
      }
    };

    fetchMenu();
  }, [restoId]);

  const getMenuResto = async (restoId) => {
    try {
      const response = await axios.get(
        `${API_URL}/getMenuResto?restoId=${restoId}`
      );
      console.log(".................." + response.data);
      setMenu(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw new Error("Failed to fetch menu");
    }
  };
  return (
    <ScrollView style={{ minHeight: 300 }}>
      <MenuResto
        navigation={navigation}
        menu={menu.menu}
        display={display}
        idR={restoId}
        getMenuResto={getMenuResto}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});
