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

export default function Top({ navigation, menu, topRestos }) {
  const slicedCategories = menu?.categories?.slice(0, 2);
  const slicedItems = slicedCategories?.flatMap((category) =>
    category.items.slice(0, 5)
  );

  return (
    <View
      style={{
        marginTop: 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontFamily: "Poppins-Bold", fontSize: 26, marginBottom: 0 }}
        >
          Meilleurs restaurants
        </Text>
      </View>

      <ScrollView horizontal style={{ height: 250 }}>
        {topRestos?.map((resto) => (
          <TouchableOpacity
            key={resto._id}
            onPress={() =>
              navigation.navigate("Resto", {
                idR: resto._id,
              })
            }
            style={{
              width: 180,
              borderRadius: 10,
              backgroundColor: "white",
              shadowColor: "white",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,

              elevation: 11,
              borderWidth: 1,
              borderColor: "black",
              marginHorizontal: 7,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <Image
                source={{
                  uri: `${API_URL}/${resto.avatar
                    ?.replace("public", "")
                    .replace(/\\/g, "/")}`,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",

                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
            </View>
            <View
              style={{
                borderColor: "white",
              }}
            />
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  color: "#131313",
                }}
              >
                {resto.name}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 14,
                  color: "#131313",
                }}
              >
                {resto.address}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 14,
                  color: "black",
                }}
              >
                Prix moyen : {resto.price_average} DA
              </Text>
            </View>
          </TouchableOpacity>

          /*
          <TouchableOpacity
            key={resto._id}
            style={{ alignItems: "center", marginLeft: 10 }}
            onPress={() =>
              navigation.navigate("Resto", {
                // rest: resto,
                idR: resto._id,
              })
            }
          >
            <Image
              source={{
                uri: `${API_URL}/${resto.avatar
                  ?.replace("public", "")
                  .replace(/\\/g, "/")}`,
              }}
              style={{ width: 150, height: 150, borderRadius: 15 }}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Bold",
                color: "black",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              {resto.name}
              {resto.price_average}
            </Text>
          </TouchableOpacity>*/
        ))}
      </ScrollView>

      {/*   <View style={styles.section}>
        <View>
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top 10</Text>
           
            </View>
            <View>
              <View style={styles.sectionBody}>
                <ScrollView
                  horizontal
                  contentContainerStyle={styles.sectionScroll}
                >
                  {topRestos?.map((resto) => (
                    <View style={styles.sectionCard} key={resto._id}>
                      <Image
                        style={styles.sectionImage}
                        source={{
                          uri: `${API_URL}/${resto.avatar
                            ?.replace("public", "")
                            .replace(/\\/g, "/")}`,
                        }}
                      />
                      <View style={styles.sectionInfo}>
                        <Text style={styles.sectionLabel}>{resto.name}</Text>
                        <Text style={styles.sectionLabel}></Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>

                
              </View>
            </View>
          </View>




          
        </View>
      </View>
  <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top 10</Text>
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
            </View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
