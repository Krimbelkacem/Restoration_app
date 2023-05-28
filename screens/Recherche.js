import React, { useState } from "react";
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

  ////////////////////////////////////////////////////////////////////
  const [selectedIndex, setSelectedIndex] = useState(0);

  const buttons = [
    `All (${restoResults.length +
      categoryResults.length +
      itemResults.length})`,
    `Restos (${restoResults.length})`,
    `Categories (${categoryResults.length})`,
    `Items (${itemResults.length})`,
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
        </View>
      );
    } else if (selectedIndex === 1) {
      return (
        <View>
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
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={updateIndex}
          containerStyle={{
            height: 50,
            borderWidth: 1,
            borderColor: "lightgrey",
            borderRadius: 10,
            backgroundColor: "white",
          }}
          selectedButtonStyle={{ backgroundColor: "lightgrey" }}
          selectedTextStyle={{ color: "black" }}
          buttonStyle={{
            backgroundColor: "transparent",
          }}
        />
      </View>
      <ScrollView style={{ marginHorizontal: 0, marginBottom: 200 }}>
        {renderSelectedView()}
      </ScrollView>
    </View>
  );
};

export default Recherche;
