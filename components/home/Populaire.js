import React, { useState, useEffect, useContext } from "react";
import { Pressable } from "react-native";
import { API_URL } from "../../utils/config";
import axios from "axios";
import Animated, {
  FadeInRight,
  FadeInLeft,
  FadeInDown,
} from "react-native-reanimated";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
} from "react-native";

import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";

export default function Populaire({ navigation, menu, recentsRestos }) {
  const { width, height } = Dimensions.get("window");
  console.log(recentsRestos, "eeeeeee");
  return (
    <Animated.View entering={FadeInDown.delay(600).duration(300)}>
      <ScrollView
        style={{ marginTop: 20, alignSelf: "center", flexGrow: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {recentsRestos?.map((resto) => (
          <Pressable
            key={resto._id}
            onPress={() =>
              navigation.navigate("Resto", {
                idR: resto._id,
              })
            }
          >
            <ImageBackground
              source={{
                uri: `${API_URL}/${resto.avatar
                  ?.replace("public", "")
                  .replace(/\\/g, "/")}`,
              }}
              style={{
                width: width - 70,
                height: 200,
                borderRadius: 20,
                padding: 20,

                marginHorizontal: 5,
              }}
              imageStyle={{ borderRadius: 20 }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 27,
                  color: "#FFF",
                  marginTop: 120,
                }}
              >
                {resto.name}
              </Text>
            </ImageBackground>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
