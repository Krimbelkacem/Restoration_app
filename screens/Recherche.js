import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
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

  const getDataUsingSimpleGetCall = async () => {
    try {
      const res = await axios.post(`${API_URL}/search?keyword=${restoName}`);
      const data = res.data;
      setRestoResults(data.restoResults);
      setCategoryResults(data.categoryResults);
      setItemResults(data.itemResults);
      setCuisineResults(data.cuisineResults);
      setData(res.data);
      setResults(res.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
      alert("no");
    }
  };
  //<Text style={styles.statCount}>{restoResults.length}</Text>;
  ///////////////////////price overage///////////////////////////////////////////////////////////////////
  const [selected, setSelected] = React.useState([]);

  console.log(selected);

  const data = [
    { key: "1", value: "0", disabled: true },
    { key: "2", value: "00" },
    { key: "3", value: "000" },

    { key: "4", value: "0000" },
  ];
  function calculateNumberOfDigits(price) {
    return price?.toString().length;
  }
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const handleSelect = (value) => {
    setSelectedPriceRange(value);
  };
  const filteredRestos = restoResults.filter((resto) => {
    const numberOfDigits = calculateNumberOfDigits(resto["price_average"]);
    if (selectedPriceRange === "000") {
      return numberOfDigits === 3;
    } else if (selectedPriceRange === "00") {
      return numberOfDigits === 2;
    } else if (selectedPriceRange === "0") {
      return numberOfDigits === 1;
    }
    return false;
  });

  ////////////////////////////////////////////////////////////////////
  const [selectedIndex, setSelectedIndex] = useState(0);

  const buttons = [
    `All (${restoResults.length +
      categoryResults.length +
      itemResults.length +
      cuisineResults.length})`,
    `Restos (${restoResults.length})`,
    `Categories (${categoryResults.length})`,
    `Items (${itemResults.length})`,
    `cuisines(${cuisineResults.length})`,
  ];

  const updateIndex = (index) => {
    setSelectedIndex(index);
  };

  const renderSelectedView = () => {
    if (selectedIndex === 0) {
      return (
        <View style={{ flex: 1, backgroundColor: "#ffffff", padding: 12 }}>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16 }}>
            Restaurants
          </Text>
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
                  {resto.price_average}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}

          {categoryResults?.map((category) => (
            <TouchableOpacity>
              <Card key={category._id} style={{ margin: 16, elevation: 4 }}>
                <Card.Content>
                  <Title
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {category}
                  </Title>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16 }}>
            Menu_items
          </Text>
          {itemResults?.map((item) => (
            <View>
              <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    color: "#000",
                    fontSize: 18,
                  }}
                >
                  {item.restoName}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProfileView", {
                      idR: item.restaurantId,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  key={item.itemId}
                >
                  <View
                    style={{
                      padding: 18,
                      // backgroundColor: "#ffe8e8",
                      backgroundColor: "lightblue",
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: `${API_URL}/${item.itemImage}`,
                      }}
                      style={{ width: 35, height: 35 }}
                    />
                  </View>
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
                      }}
                    >
                      {item.itemName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        color: "#000",
                        fontSize: 18,
                      }}
                    >
                      {item.itemPrice} da
                    </Text>
                  </View>
                </TouchableOpacity>
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
                    idR: resto._id,
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
          <MultipleSelectList
            setSelected={handleSelect}
            data={data}
            save="value"
            // onSelect={() => alert(selected)}
            label="prix moyen"
            placeholder="choisissez le prix moyen"
            fontFamily="Poppins-Medium"
          />

          {restoResults?.map((resto) => (
            <Animated.View
              key={resto.id}
              entering={FadeInRight.delay(300).duration(300)}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 12 }}
                onPress={() =>
                  navigation.navigate("ProfileView", {
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
                <Text
                  style={{ color: "#263238", fontSize: 20, marginLeft: 10 }}
                >
                  {resto.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      );
    } else if (selectedIndex === 2) {
      return (
        <View>
          {categoryResults?.map((category) => (
            <TouchableOpacity>
              <Card key={category._id} style={{ margin: 16, elevation: 4 }}>
                <Card.Content>
                  <Title
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {category}
                  </Title>
                  <Paragraph style={{ fontSize: 16, lineHeight: 24 }}>
                    This is a beautiful card view created using React Native
                    Paper.
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (selectedIndex === 3) {
      return (
        <View>
          {itemResults?.map((item) => (
            <View>
              <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    color: "#000",
                    fontSize: 18,
                  }}
                >
                  {item.restoName}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProfileView", {
                      idR: item.restaurantId,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  key={item.itemId}
                >
                  <View
                    style={{
                      padding: 18,
                      // backgroundColor: "#ffe8e8",
                      backgroundColor: "lightblue",
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: `${API_URL}/${item.itemImage}`,
                      }}
                      style={{ width: 35, height: 35 }}
                    />
                  </View>
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
                      }}
                    >
                      {item.itemName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Poppins-Regular",
                        color: "#000",
                        fontSize: 18,
                      }}
                    >
                      {item.itemPrice} da
                    </Text>
                  </View>
                </TouchableOpacity>
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
    <View style={{ backgroundColor: "#FFF", padding: 12 }}>
      <View
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
          style={{ flex: 1, fontSize: 16, marginLeft: 8, marginTop: 3 }}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
          Filter:
        </Text>
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
