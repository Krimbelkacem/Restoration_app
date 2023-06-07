import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
//deleteprofil
import { API_URL } from "../../utils/config";
import FadeIn from "../../screens/day001/components/FadeIn";
import Icon from "react-native-vector-icons/FontAwesome";

import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
export default function Following({ route, navigation }) {
  const followings = route.params.followings;
  console.log(followings);
  return (
    <View>
      {followings?.length > 0 ? (
        <View>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16 }}>
            Restaurants suivies
          </Text>
          <View>
            {followings?.map((resto) => (
              <Animated.View
                key={resto.id}
                entering={FadeInRight.delay(300).duration(400)}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", marginTop: 12 }}
                  onPress={() =>
                    navigation.navigate("Resto", {
                      // rest: resto,
                      idR: resto._id,
                    })
                  }
                >
                  <Image
                    source={{
                      uri: `${API_URL}/${resto.avatar}`,
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 20,
                      resizeMode: "cover",
                    }}
                  />
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 16,
                      marginLeft: 10,
                      fontWeight: "bold",

                      textAlign: "center",
                    }}
                  >
                    {resto.name}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
}
