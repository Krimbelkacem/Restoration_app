import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect, useContext } from "react";
import { Pressable } from "react-native";
import { API_URL } from "../../utils/config";
import axios from "axios";

import Animated, { FadeInDown, FadeInUp, FadeInRight, FadeOutRight, Layout, ceil } from 'react-native-reanimated';

import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,  Dimensions,
} from "react-native";

import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";

export default function MenuResto({ navigation, menu }) {
  const { width, height } = Dimensions.get('window');
  const matches = [
    {
      id: 1,
      avatar: "https://bootdey.com/img/Content/avatar/avatar2.png",
      name: "John Doe",
      age: "30",
    },
    {
      id: 2,
      avatar: "https://bootdey.com/img/Content/avatar/avatar3.png",
      name: "John Doe",
      age: "30",
    },
    {
      id: 3,
      avatar: "https://bootdey.com/img/Content/avatar/avatar4.png",
      name: "John Doe",
      age: "30",
    },
    {
      id: 4,
      avatar: "https://bootdey.com/img/Content/avatar/avatar5.png",
      name: "John Doe",
      age: "30",
    },
    {
      id: 5,
      avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
      name: "John Doe",
      age: "30",
    },
  ];
  const slicedCategories = menu?.categories?.slice(0, 2);
  const slicedItems = slicedCategories?.flatMap((category) =>
    category.items.slice(0, 5)
  );

  return (
    <View>




      
      <View style={styles.section}>
        <View>
          {slicedCategories?.map((category) => (
            <View key={category._id}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{category.name}</Text>
                <Pressable
                  style={styles.seeAllButton}
                  onPress={() =>
                    navigation.navigate("Menu", {
                      menu: menu,
                    })
                  }
                >
                  <Text style={styles.seeAllButtonText}>See all</Text>
                </Pressable>
              </View>
              <View>
                <View style={styles.sectionBody}>



                <Animated.View entering={FadeInDown.delay(600).duration(300)}>
                <ScrollView style={{ marginTop: 20, alignSelf: 'center', flexGrow: 0, backgroundColor:'white', }} horizontal showsHorizontalScrollIndicator={false}>
                {category?.items?.slice(0, 5).map((item) => (
                    <View style={{ width: width - 70, height: 200, backgroundColor: '#FFF', borderRadius: 20, padding: 20 }}>
                        <Text style={{ fontSize: 30, color: '#2f2f2f' , marginTop: 75 }}>{item.name}</Text>
                        <Image  source={{ uri: `${API_URL}/${item.image}` }} style={{ width: 180, height: 180, position: 'absolute', right: 0, bottom: 10, zIndex: -1 }} />
                    </View>
                       ))}
                </ScrollView>
            </Animated.View>
                  <ScrollView
                    horizontal
                    contentContainerStyle={styles.sectionScroll}

                  >
                    {category?.items?.slice(0, 5).map((item) => (
                      <View style={styles.sectionCard} key={item._id}>
                        <Image
                          style={styles.sectionImage}
                          source={{ uri: `${API_URL}/${item.image}` }}
                        />
                        <View style={styles.sectionInfo}>
                          <Text style={styles.sectionLabel}>{item.name}</Text>
                          <Text style={styles.sectionLabel}>
                            price: {item.price} Da
                          </Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View></View>
      </View>
      {/* <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Boissons</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionBody}>
          <ScrollView horizontal contentContainerStyle={styles.sectionScroll}>
            {matches.map(({ avatar, id, name, age }) => (
              <View style={styles.sectionCard} key={id}>
                <Image style={styles.sectionImage} source={{ uri: avatar }} />
                <View style={styles.sectionInfo}>
                  <Text style={styles.sectionLabel}>{name}</Text>
                  <Text style={styles.sectionLabel}>Age: {age}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 4,
  },
  informationContainer: {
    width: 150,
    height: 150,
    marginLeft: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  label: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 10,
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
  },
  seeAllButton: {
    backgroundColor: "#A9A9A9",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  seeAllButtonText: {
    color: "#eee",
  },
  sectionBody: {
    marginTop: 10,
  },
  sectionScroll: {
    paddingBottom: 20,
  },
  sectionCard: {
    width: 200,
    minHeight: 200,
    backgroundColor: "#fff",
    shadowColor: "#B0C4DE",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  sectionImage: {
    width: "100%",
    aspectRatio: 1,
  },
  sectionInfo: {
    padding: 10,
  },
  sectionLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
});
