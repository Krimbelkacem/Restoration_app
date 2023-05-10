import React, { useState } from "react";

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
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  FlatList,
} from "react-native";

import { API_URL } from "../utils/config";
import * as Icon from "react-native-feather";
import Carousel from "react-native-snap-carousel";

import { MyModal } from "../components/Modal";
export default function Home({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const data = [
    {
      id: "1",
      title: "Item 1",
      imageUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      id: "2",
      title: "Item 2",
      imageUrl: "https://picsum.photos/id/12/200/300",
    },
    {
      id: "3",
      title: "Item 3",
      imageUrl: "https://picsum.photos/id/13/200/300",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
  return (
    <View>
      <MyModal />
      {/*<Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={200}
        autoplay={true}
        loop={true}
  />*/}

      <ScrollView
        vertical={true}
        style={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </View>
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
});
