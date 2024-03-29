import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Text,
  Button,
  List,
  Card,
  Title,
  Paragraph,
  Avatar,
} from "react-native-paper";
import axios from "axios";
import { API_URL } from "../utils/config";
import { Searchbar } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import { horizontal } from "react-native-swiper-flatlist/src/themes";
import { ButtonGroup } from "react-native-elements";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";
import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";

const Recherche = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, setResults] = useState([]);
  const [Data, setData] = useState([]);
  const [restoResults, setRestoResults] = useState([]);
  const [categoryResults, setCategoryResults] = useState([]);
  const [itemResults, setItemResults] = useState([]);
  // const [cuisinesResults, setCuisinesResults] = useState([]);
  const [cuisineResults, setCuisineResults] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [restoName, setrestoName] = useState("");

  const [lowPriceResto, setLowPriceResto] = useState([]);
  const [mediumPriceResto, setMediumPriceResto] = useState([]);
  const [highPriceResto, setHighPriceResto] = useState([]);
  const [priceItems, setPriceItems] = useState([]);
  const getDataUsingSimpleGetCall = async () => {
    if (restoName.trim() !== "") {
      try {
        const res = await axios.post(`${API_URL}/search?keyword=${restoName}`);
        const data = res.data;
        setRestoResults(data.restoResults);

        setCategoryResults(data.categoryResults);
        setItemResults(data.itemResults);
        setCuisineResults(data.cuisineResults);
        setLowPriceResto(data.lowPriceResto);
        console.log(data.categoryResults.items);
        // console.log(data.mediumPriceResto);
        //  console.log(data.highPriceResto);
        setMediumPriceResto(data.mediumPriceResto);
        setHighPriceResto(data.highPriceResto);
        setPriceItems(data.numericResults);
        console.log("priceitems", data.numericResults);
        setData(res.data);
        setResults(res.data);
        setLoading(true);
      } catch (error) {
        console.log(error);
        alert("no");
      }
    }
  };

  //<Text style={styles.statCount}>{restoResults.length}</Text>;
  ///////////////////////price overage///////////////////////////////////////////////////////////////////
  const [selectedValue, setSelectedValue] = useState("0");
  const data = [
    { key: "1", value: "0" },
    { key: "2", value: "00" },
    { key: "3", value: "000" },
    { key: "4", value: "null", disabled: true },
  ];

  const renderRestoList = () => {
    if (selectedValue === "0") {
      return lowPriceResto.map((resto) => (
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
                uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                resizeMode: "cover",
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                {resto.name}
              </Text>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 12,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                Prix moyen: {resto.price_average} da
              </Text>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 12,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                {resto.address}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ));
    } else if (selectedValue === "00") {
      return mediumPriceResto.map((resto) => (
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
                uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                resizeMode: "cover",
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                {resto.name}
              </Text>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 12,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                Prix moyen: {resto.price_average} da
              </Text>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 12,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                {resto.address}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ));
    } else if (selectedValue === "000") {
      return highPriceResto.map((resto) => (
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
                uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                resizeMode: "cover",
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                {resto.name}
              </Text>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 12,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                Prix moyen: {resto.price_average} da
              </Text>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 12,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                {resto.address}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ));
    } else {
      return restoResults.map((resto) => (
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
                uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                resizeMode: "cover",
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                {resto.name}
              </Text>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 12,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                Prix moyen: {resto.price_average} da
              </Text>
              <Text
                style={{
                  color: "#263238",
                  fontSize: 12,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                {resto.address}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ));
    }
  };

  ////////////////////////////////////////////////////////////////////

  const totalLength =
    restoResults?.length +
    categoryResults?.length +
    itemResults?.length +
    cuisineResults?.length +
    (priceItems?.length !== undefined ? priceItems?.length : 0);

  const itemLength =
    itemResults?.length +
    (priceItems?.length !== undefined ? priceItems?.length : 0);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const buttons = [
    `Tous (${totalLength})`,
    `Restos (${restoResults?.length})`,
    `Menu  Categories (${categoryResults?.length})`,
    `Plats (${itemLength})`,
    `cuisines(${cuisineResults?.length})`,
  ];

  const updateIndex = (index) => {
    setSelectedIndex(index);
  };

  const renderSelectedView = () => {
    if (selectedIndex === 0) {
      return (
        <View style={{ flex: 1, backgroundColor: "#ffffff", padding: 12 }}>
          {restoResults?.map((resto) => (
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
                    uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 20,
                    resizeMode: "cover",
                  }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 16,
                      marginLeft: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {resto.name}
                  </Text>
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 12,
                      marginLeft: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {resto.description}
                  </Text>
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 12,
                      marginLeft: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Prix moyen: {resto.price_average} da
                  </Text>
                  <Text
                    style={{
                      color: "#263238",
                      fontSize: 12,
                      marginLeft: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {resto.address}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}

          {categoryResults?.map((category) => (
            <TouchableOpacity
              styles={{ marginVertical: 20 }}
              key={category.categoryId}
              onPress={() =>
                navigation.navigate("Resto", {
                  idR: category.restaurantId,
                })
              }
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,

                  shadowColor: "white",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 1,
                  marginVertical: 20,
                }}
              >
                <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{
                        uri: `${API_URL}/${category.restoAvatar
                          ?.replace("public", "")
                          .replace(/\\/g, "/")}`,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#a93246",
                        borderRadius: 25,
                        marginRight: 20,
                      }}
                    />
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "black",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {category.restoName}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",

                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    key={category.categoryId}
                  >
                    <View
                      style={{
                        padding: 18,
                        borderColor: "grey",
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "#000",
                          fontSize: 18,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          borderBottomWidth: 1,
                          borderBottomColor: "#d9d9d9",
                        }}
                      >
                        {category.name}
                      </Text>

                      {category.items.map((item) => (
                        <View
                          key={item.id}
                          style={{
                            flexDirection: "row",
                            backgroundColor: "lightgray",
                            borderRadius: 10,
                            marginTop: 10,
                            justifyContent: "space-between",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flex: 1,
                            padding: 20,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Poppins-Regular",
                              color: "#000",
                              fontSize: 18,
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              borderBottomWidth: 1,
                              borderBottomColor: "#d9d9d9",
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Poppins-Regular",
                              color: "#000",
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {item.price} da
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </Animated.View>
              </View>
            </TouchableOpacity>
          ))}

          {itemResults?.map((item) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom: 20,
              }}
            >
              <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Resto", {
                      idR: item.restaurantId,
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{
                        uri: `${API_URL}/${item.restoAvatar
                          ?.replace("public", "")
                          .replace(/\\/g, "/")}`,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#a93246",
                        borderRadius: 25,
                        marginRight: 20,
                      }}
                    />
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "black",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {item.restoName}
                      </Text>
                    </View>
                  </View>
                </Pressable>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "lightgrey",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  key={item.itemId}
                >
                  <View
                    style={{
                      padding: 18,
                      // backgroundColor: "#ffe8e8",
                      borderColor: "grey",
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flex: 1,
                      padding: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        color: "#000",
                        fontSize: 18,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderBottomWidth: 1,
                        borderBottomColor: "#d9d9d9",
                      }}
                    >
                      {item.itemName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        color: "#000",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {item.itemPrice} da
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          ))}

          {priceItems?.map((item) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom: 20,
              }}
            >
              <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Resto", {
                      idR: item.restaurantId,
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{
                        uri: `${API_URL}/${item.restaurantPhoto
                          ?.replace("public", "")
                          .replace(/\\/g, "/")}`,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#a93246",
                        borderRadius: 25,
                        marginRight: 20,
                      }}
                    />
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "black",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {item.restaurantName}
                      </Text>
                    </View>
                  </View>
                </Pressable>

                <View
                  onPress={() =>
                    navigation.navigate("Resto", {
                      idR: item.restaurantId,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    backgroundColor: "lightgrey",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  key={item.itemId}
                >
                  <View
                    style={{
                      padding: 18,
                      // backgroundColor: "#ffe8e8",
                      borderColor: "grey",
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flex: 1,
                      padding: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        color: "#000",
                        fontSize: 18,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        borderBottomWidth: 1,
                        borderBottomColor: "#d9d9d9",
                      }}
                    >
                      {item.itemName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        color: "#000",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {item.itemPrice} da
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          ))}

          {cuisineResults?.map((cuisine) => (
            <Animated.View
              key={cuisine._id}
              entering={FadeInRight.delay(300).duration(400)}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 12 }}
                onPress={() =>
                  navigation.navigate("Resto", {
                    // rest: resto,
                    idR: cuisine.restaurantId,
                  })
                }
              >
                <Image
                  source={{
                    uri: `${API_URL}/${cuisine.cuisineImage}`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    resizeMode: "cover",
                  }}
                />
                <Text
                  style={{
                    color: "#263238",
                    fontSize: 16,
                    marginLeft: 10,
                    fontWeight: "bold",
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {cuisine.cuisineName}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      );
    } else if (selectedIndex === 1) {
      return (
        <View>
          <View style={styles.container}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="prix moyen" value="" color="#999999" />
              {data.map((item) => (
                <Picker.Item
                  key={item.key}
                  label={item.value}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
          {renderRestoList()}
        </View>
      );
    } else if (selectedIndex === 2) {
      return (
        <View>
          {categoryResults?.map((category) => (
            <TouchableOpacity
              styles={{ marginVertical: 20 }}
              key={category.categoryId}
              onPress={() =>
                navigation.navigate("Resto", {
                  idR: category.restaurantId,
                })
              }
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,

                  shadowColor: "white",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 1,
                  marginVertical: 20,
                }}
              >
                <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{
                        uri: `${API_URL}/${category.restoAvatar
                          ?.replace("public", "")
                          .replace(/\\/g, "/")}`,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#a93246",
                        borderRadius: 25,
                        marginRight: 20,
                      }}
                    />
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "black",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {category.restoName}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",

                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    key={category.categoryId}
                  >
                    <View
                      style={{
                        padding: 18,
                        borderColor: "grey",
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "#000",
                          fontSize: 18,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          borderBottomWidth: 1,
                          borderBottomColor: "#d9d9d9",
                        }}
                      >
                        {category.name}
                      </Text>

                      {category.items.map((item) => (
                        <View
                          key={item.id}
                          style={{
                            flexDirection: "row",
                            backgroundColor: "lightgray",
                            borderRadius: 10,
                            marginTop: 10,
                            justifyContent: "space-between",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            flex: 1,
                            padding: 20,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Poppins-Regular",
                              color: "#000",
                              fontSize: 18,
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              borderBottomWidth: 1,
                              borderBottomColor: "#d9d9d9",
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Poppins-Regular",
                              color: "#000",
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {item.price} da
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </Animated.View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (selectedIndex === 3) {
      return (
        <View>
          {priceItems?.map((item) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom: 20,
              }}
            >
              <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Resto", {
                      idR: item.restaurantId,
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{
                        uri: `${API_URL}/${item.restaurantPhoto
                          ?.replace("public", "")
                          .replace(/\\/g, "/")}`,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#a93246",
                        borderRadius: 25,
                        marginRight: 20,
                      }}
                    />
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "black",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {item.restaurantName}
                      </Text>
                    </View>
                  </View>

                  <View
                    onPress={() =>
                      navigation.navigate("Resto", {
                        idR: item.restaurantId,
                      })
                    }
                    style={{
                      flexDirection: "row",
                      backgroundColor: "lightgrey",
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    key={item.itemId}
                  >
                    <View
                      style={{
                        padding: 18,
                        // backgroundColor: "#ffe8e8",
                        borderColor: "grey",
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flex: 1,
                        padding: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "#000",
                          fontSize: 18,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          borderBottomWidth: 1,
                          borderBottomColor: "#d9d9d9",
                        }}
                      >
                        {item.itemName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "#000",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {item.itemPrice} da
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Animated.View>
            </View>
          ))}

          {itemResults?.map((item) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom: 20,
              }}
            >
              <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Resto", {
                      idR: item.restaurantId,
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{
                        uri: `${API_URL}/${item.restoAvatar
                          ?.replace("public", "")
                          .replace(/\\/g, "/")}`,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#a93246",
                        borderRadius: 25,
                        marginRight: 20,
                      }}
                    />
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "black",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {item.restoName}
                      </Text>
                    </View>
                  </View>

                  <View
                    onPress={() =>
                      navigation.navigate("Resto", {
                        idR: item.restaurantId,
                      })
                    }
                    style={{
                      flexDirection: "row",
                      backgroundColor: "lightgrey",
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    key={item.itemId}
                  >
                    <View
                      style={{
                        padding: 18,
                        // backgroundColor: "#ffe8e8",
                        borderColor: "grey",
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                      }}
                    ></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flex: 1,
                        padding: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "#000",
                          fontSize: 18,
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          borderBottomWidth: 1,
                          borderBottomColor: "#d9d9d9",
                        }}
                      >
                        {item.itemName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          color: "#000",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {item.itemPrice} da
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Animated.View>
            </View>
          ))}
        </View>
      );
    } else if (selectedIndex === 4) {
      return (
        <View>
          {cuisineResults?.map((cuisine) => (
            <Animated.View
              key={cuisine._id}
              entering={FadeInRight.delay(300).duration(400)}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 12 }}
                onPress={() =>
                  navigation.navigate("Resto", {
                    // rest: resto,
                    idR: cuisine.restaurantId,
                  })
                }
              >
                <Image
                  source={{
                    uri: `${API_URL}/${cuisine.cuisineImage}`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    resizeMode: "cover",
                  }}
                />
                <Text
                  style={{
                    color: "#263238",
                    fontSize: 16,
                    marginLeft: 10,
                    fontWeight: "bold",

                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {cuisine.cuisineName}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{ backgroundColor: "white", padding: 12 }}>
      <View style={{ backgroundColor: "white", paddingVertical: 30 }}>
        <Animated.View entering={FadeInDown.delay(300).duration(300)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "white",
                paddingVertical: 8,
                paddingHorizontal: 2,
                borderRadius: 20,
                marginHorizontal: 2,
                flex: 1,
                fontFamily: "Poppins-Regular",
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <TextInput
                autoFocus={true}
                onChangeText={(restoName) => setrestoName(restoName)}
                blurOnSubmit={false}
                onSubmitEditing={getDataUsingSimpleGetCall}
                returnKeyType="next"
                onBlur={getDataUsingSimpleGetCall}
                value={restoName}
                placeholder=" Restaurant , Menu ,Une cuisine"
                defaultValue=""
                placeholderTextColor="black"
                style={{
                  flex: 1,
                  fontFamily: "Poppins-Regular",
                  marginLeft: 8,
                  marginTop: 3,
                }}
              />
              <FontAwesome5 name="search" size={24} color="black" />
            </TouchableOpacity>

            <View
              style={{
                borderRadius: 25,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            ></View>
          </View>
        </Animated.View>
      </View>
      {/* <View
        style={{
          backgroundColor: "#f3f3f3",
          flexDirection: "row",
          alignItems: "center",
          padding: 8,
          borderRadius: 10,
          marginTop: 50,
        }}
      >
        <Feather name="search" size={22} color="black" />
        <TextInput
          onChangeText={(restoName) => setrestoName(restoName)}
          blurOnSubmit={false}
          onSubmitEditing={getDataUsingSimpleGetCall}
          returnKeyType="next"
          onBlur={getDataUsingSimpleGetCall}
          value={restoName}
          placeholder="Search"
          style={{
            flex: 1,
            fontSize: 16,
            marginLeft: 8,
            marginTop: 3,
            caretColor: "black",
          }}
        /> 
      </View>*/}

      <View style={{ marginTop: 0, backgroundColor: "white" }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ButtonGroup
            buttons={buttons}
            selectedIndex={selectedIndex}
            onPress={updateIndex}
            containerStyle={{
              height: 60,
              width: 500,
              borderWidth: 0,
              borderColor: "lightgrey",
              borderRadius: 10,
              backgroundColor: "white",
            }}
            selectedButtonStyle={{
              height: 60,

              backgroundColor: "black",
              borderRadius: 10,
            }}
            selectedTextStyle={{
              fontFamily: "Poppins-Medium",
              color: "white",
              fontSize: 12,
            }}
            textStyle={{
              fontFamily: "Poppins-Regular",
              color: "black",
              fontSize: 12,
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "lightgray",
            }}
            innerBorderStyle={{ width: 0 }}
            buttonContainerStyle={{ marginHorizontal: 2 }} // Add horizontal margin
          />
        </ScrollView>
      </View>

      <ScrollView style={{ marginHorizontal: 0, marginBottom: 200 }}>
        {renderSelectedView()}
      </ScrollView>
    </View>
  );
};

export default Recherche;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  picker: {
    width: 200,
    height: 50,
    backgroundColor: "#eaeaea",
    borderRadius: 10,
    marginBottom: 20,
  },
  pickerItem: {
    color: "#333333",
    fontSize: 16,
  },
});
