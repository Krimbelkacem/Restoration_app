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

export default function Recents({ navigation, menu }) {
  const [topRestos, setTopRestos] = useState([]);

  useEffect(() => {
    const fetchTopRestos = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get(`${API_URL}/recents-restaurants`);
        setTopRestos(response.data);
      } catch (error) {
        console.error(error);
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
            recents restaurants
          </Text>
        </View>

        <ScrollView horizontal style={{ height: 150 }}>
          {topRestos?.map((resto) => (
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
                style={{ width: 120, height: 120, borderRadius: 15 }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Regular",
                  color: "black",
                  textAlign: "left",
                  marginTop: 5,
                }}
              >
                {resto.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* <View style={styles.section}>
        <View>
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recents</Text>
          
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
