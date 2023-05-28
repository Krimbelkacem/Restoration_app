import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect, useContext } from "react";
import { Pressable } from "react-native";
import { API_URL } from "../../utils/config";
import axios from "axios";

import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";

import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";

export default function Cuisines({ navigation, menu }) {
  const [topRestos, setTopRestos] = useState([]);

  useEffect(() => {
    const fetchTopRestos = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get(`${API_URL}/random-cuisines`);
        if (response) {
          setTopRestos(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error + "cuisines");
      }
    };

    fetchTopRestos();
  }, []);

  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: "black",
            }}
          >
            cuisines
          </Text>
        </View>

        <ScrollView horizontal style={{ height: 150 }}>
          {topRestos?.map((cuisine) => (
            <TouchableOpacity
              key={cuisine._id}
              style={{ alignItems: "center", marginLeft: 10 }}
            >
              <Image
                source={{
                  uri: `${API_URL}/${cuisine.image}`,
                }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Text
                style={{
                  fontSize: 9,
                  fontFamily: "Poppins-Regular",
                  color: "black",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {cuisine.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
