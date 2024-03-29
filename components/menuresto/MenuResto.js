import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect, useContext } from "react";

import { API_URL } from "../../utils/config";

import { ListItem, Button, Icon } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";

import axios from "axios";

import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
  FadeOutRight,
  Layout,
  ceil,
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
  Pressable,
} from "react-native";

import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

export default function MenuResto({
  navigation,
  menu,
  display,
  idR,
  getMenuResto,
}) {
  const { width, height } = Dimensions.get("window");

  const slicedCategories = menu?.categories;
  const slicedItems = slicedCategories?.flatMap((category) => category?.items);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const onItemSelected = (selectedItem) => {
    const isSelected = selectedItems.some(
      (item) => item._id === selectedItem._id
    );

    if (!isSelected) {
      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      setSelectedItems(
        selectedItems.filter((item) => item._id !== selectedItem._id)
      );
    }
  };

  const postSelectedItems = () => {
    const selectedItemIds = selectedItems.map((item) => item._id);
    console.log("delete");
    console.log(selectedItemIds);

    axios
      .delete(`${API_URL}/deleteitems?idR=${idR}`, {
        data: { selectedItemIds }, // Send the array as part of the request body
      })
      .then((response) => {
        // Handle the response if needed
        getMenuResto(idR);
        console.log("Delete request successful:", response.data);
        selectedItems.length = 0;
      })
      .catch((error) => {
        getMenuResto(idR);
        // Handle any errors that occur during the request
        console.error("Error in delete request:", error);
        selectedItems.length = 0;
      });
  };

  const deleteCategory = (idC) => {
    axios
      .post(`${API_URL}/deleteCategory?idR=${idR}&idC=${idC}  `)
      .then((response) => {
        // Handle the r((esponse if needed
        getMenuResto(idR);
        console.log("Post request successful:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error in post request:", error);
      });
  };
  const isButtonVisible = selectedItems.length > 0;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 25 }}>
          {menu?.name}
        </Text>
      </View>
      {display ? (
        <View>
          <View>
            {slicedCategories?.map((category) => (
              <View>
                <View key={category._id}>
                  <ListItem.Swipeable
                    leftContent={(reset) => (
                      <Button
                        title="Delete"
                        onPress={() => deleteCategory(category._id)}
                        icon={
                          <MaterialCommunityIcons
                            name="delete-alert"
                            color="grey"
                            size={30}
                          />
                        }
                        buttonStyle={{
                          minHeight: "100%",
                          backgroundColor: "lightblue",
                        }}
                      />
                    )}
                    rightContent={(reset) => (
                      <Button
                        title="Delete"
                        onPress={() => deleteCategory(category._id)}
                        icon={
                          <MaterialCommunityIcons
                            name="delete-alert"
                            color="grey"
                            size={30}
                          />
                        }
                        buttonStyle={{
                          minHeight: "100%",
                          backgroundColor: "lightblue",
                        }}
                      />
                    )}
                  >
                    <ListItem.Content>
                      <ListItem.Title>
                        <Text
                          style={{ fontFamily: "Poppins-Bold", fontSize: 25 }}
                        >
                          {category.name}
                        </Text>
                      </ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem.Swipeable>
                  {category?.items?.slice(0, 10).map((item) => (
                    <View key={item._id}>
                      <Animated.View
                        entering={FadeInRight.delay(300).duration(300)}
                      >
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 10,
                            paddingBottom: 10,
                            borderColor: "black",
                            borderBottomWidth: 0.5,
                          }}
                          onPress={() => onItemSelected(item)}
                        >
                          {selectedItems.some(
                            (selectedItem) => selectedItem._id === item._id
                          ) && (
                            <FontAwesome5
                              name="check-circle"
                              size={24}
                              color="black"
                            />
                          )}
                          <View style={{ justifyContent: "center", flex: 1 }}>
                            <Text
                              style={{
                                fontSize: 20,
                                fontFamily: "Poppins-Medium",
                                color: "black",
                                marginTop: 4,
                                marginLeft: 12,
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontFamily: "Poppins-Regular",
                                color: "black",
                                marginTop: 4,
                                marginLeft: 12,
                                marginTop: -5,
                              }}
                            >
                              {item.description}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: "Poppins-Regular",
                              color: "black",
                              marginTop: 4,
                              marginLeft: 12,
                            }}
                          >
                            {item.price}DZD
                          </Text>
                        </TouchableOpacity>
                      </Animated.View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          {isButtonVisible && (
            <TouchableOpacity
              onPress={postSelectedItems}
              style={{
                backgroundColor: "black",
                width: "100%",
                borderRadius: 10,
                marginTop: 20,
                paddingVertical: 15,

                justifyContent: "center", // Center the text vertically
                alignItems: "center", // Center the text horizontally
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#FFF",
                  textAlign: "center",
                  fontFamily: "Poppins-Bold",
                }}
              >
                supprimer
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View>
          <View>
            {slicedCategories?.map((category) => (
              <View key={category._id}>
                <View
                  style={{ flex: 1, backgroundColor: "white", padding: 12 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontFamily: "Poppins-Bold", fontSize: 25 }}>
                      {category.name}
                    </Text>
                    <MaterialCommunityIcons
                      name="dots-horizontal"
                      size={30}
                      color="#686869"
                    />
                  </View>
                  {category?.items?.slice(0, 5).map((item) => (
                    <View key={item._id}>
                      <Animated.View
                        entering={FadeInRight.delay(300).duration(300)}
                      >
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 10,
                            paddingBottom: 10,
                            borderColor: "black",
                            borderBottomWidth: 0.5,
                          }}
                          onPress={() => onItemSelected(item)}
                        >
                          {selectedItems.some(
                            (selectedItem) => selectedItem._id === item._id
                          ) && (
                            <FontAwesome5
                              name="check-circle"
                              size={24}
                              color="black"
                            />
                          )}
                          <View style={{ justifyContent: "center", flex: 1 }}>
                            <Text
                              style={{
                                fontSize: 20,
                                fontFamily: "Poppins-Medium",
                                color: "black",
                                marginTop: 4,
                                marginLeft: 12,
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontFamily: "Poppins-Regular",
                                color: "black",
                                marginTop: 4,
                                marginLeft: 12,
                                marginTop: -5,
                              }}
                            >
                              {item.description}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: "Poppins-Regular",
                              color: "black",
                              marginTop: 4,
                              marginLeft: 12,
                            }}
                          >
                            {item.price}DZD
                          </Text>
                        </TouchableOpacity>
                      </Animated.View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          {isButtonVisible && (
            <Button onPress={postSelectedItems} title="commander" />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
