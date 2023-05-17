import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
} from "react-native";
import {
  TextInput,
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

const Recherche = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, setResults] = useState([]);
  const [Data, setData] = useState([]);
  const [restoResults, setRestoResults] = useState([]);
  const [categoryResults, setCategoryResults] = useState([]);
  const [itemResults, setItemResults] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [restoName, setrestoName] = useState("");
  const getDataUsingSimpleGetCall = async () => {
    try {
      const res = await axios.post(`${API_URL}/search?keyword=${restoName}`);
      const data = res.data;
      setRestoResults(data.restoResults);
      setCategoryResults(data.categoryResults);
      setItemResults(data.itemResults);

      setData(res.data);
      setResults(res.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
      alert("no");
    }
  };
  //<Text style={styles.statCount}>{restoResults.length}</Text>;
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
        <View>
          {restoResults?.map((resto) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileView", {
                  // rest: resto,
                  idR: resto._id,
                })
              }
            >
              <Card key={resto.id} style={{ margin: 16, elevation: 4 }}>
                <Card.Cover
                  source={{
                    uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
                  }}
                />
                <Card.Content>
                  <Title
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {resto.name}
                  </Title>
                  <Paragraph style={{ fontSize: 16, lineHeight: 24 }}>
                    This is a beautiful card view created using React Native
                    Paper.
                  </Paragraph>
                </Card.Content>
              </Card>
              {/*
            <View key={resto.id} style={styles.card}>
              <Image
                source={{
                  uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
                }}
                style={styles.photo}
              />
              {console.log(resto.avatar.replace(/\\/g, "/"))}

              <Text style={styles.name}>Name:{resto.name}</Text>
              <Text style={styles.name}>owner :{resto.owner}</Text>
              </View>*/}
            </TouchableOpacity>
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
                  <Paragraph style={{ fontSize: 16, lineHeight: 24 }}>
                    This is a beautiful card view created using React Native
                    Paper.
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}

          {itemResults?.map((item) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileView", {
                  idR: item.restaurantId,
                })
              }
            >
              <Card
                key={item.itemId}
                style={{
                  elevation: 4,
                  alignContent: "center",
                  margin: 10,
                }}
              >
                <Card.Cover
                  source={{
                    uri: `${API_URL}/${item.itemImage}`,
                  }}
                />
                <Card.Content>
                  <Title
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {item.itemName}
                  </Title>
                  <Paragraph style={{ fontSize: 16, lineHeight: 24 }}>
                    This is a beautiful card view created using React Native
                    Paper.
                  </Paragraph>
                </Card.Content>
              </Card>
              <Text> {item.restoName}</Text>
              <Avatar.Image
                size={40}
                source={{
                  uri: `${API_URL}/${item.restoAvatar.replace("public", "")}`,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (selectedIndex === 1) {
      return (
        <View>
          {restoResults?.map((resto) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileView", {
                  // rest: resto,
                  idR: resto._id,
                })
              }
            >
              <Card key={resto.id} style={{ margin: 16, elevation: 4 }}>
                <Card.Cover
                  source={{
                    uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
                  }}
                />
                <Card.Content>
                  <Title
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {resto.name}
                  </Title>
                  <Paragraph style={{ fontSize: 16, lineHeight: 24 }}>
                    This is a beautiful card view created using React Native
                    Paper.
                  </Paragraph>
                </Card.Content>
              </Card>
              {/*
      <View key={resto.id} style={styles.card}>
        <Image
          source={{
            uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
          }}
          style={styles.photo}
        />
        {console.log(resto.avatar.replace(/\\/g, "/"))}

        <Text style={styles.name}>Name:{resto.name}</Text>
        <Text style={styles.name}>owner :{resto.owner}</Text>
        </View>*/}
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileView", {
                  idR: item.restaurantId,
                })
              }
            >
              <Card
                key={item.itemId}
                style={{
                  elevation: 4,
                  alignContent: "center",
                  margin: 10,
                }}
              >
                <Card.Cover
                  source={{
                    uri: `${API_URL}/${item.itemImage}`,
                  }}
                />
                <Card.Content>
                  <Title
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 8,
                    }}
                  >
                    {item.itemName}
                  </Title>
                  <Paragraph style={{ fontSize: 16, lineHeight: 24 }}>
                    This is a beautiful card view created using React Native
                    Paper.
                  </Paragraph>
                  <Text> {item.restoName}</Text>
                  <Avatar.Image
                    size={40}
                    source={{
                      uri: `${API_URL}/${item.restoAvatar.replace(
                        "public",
                        ""
                      )}`,
                    }}
                  />
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View>
      <SearchBar
        placeholder="Search"
        onChangeText={(restoName) => setrestoName(restoName)}
        blurOnSubmit={false}
        onSubmitEditing={getDataUsingSimpleGetCall}
        returnKeyType="next"
        onBlur={getDataUsingSimpleGetCall}
        value={restoName}
        label="Search"
        //onSubmitEditing={handleSearch}
        // onClear={handleClear}
        inputContainerStyle={{ backgroundColor: "#fff" }}
        containerStyle={{
          backgroundColor: "#fff",
          borderBottomColor: "transparent",
        }}
        leftIconContainerStyle={{ marginLeft: 0 }}
        leftIcon={{
          type: "material",
          name: "arrow-back",
          onPress: () => console.log("Back button pressed"),
        }}
      />
      <View style={{ padding: 16 }}>
        <Text style={{ marginBottom: 8 }}>Filter:</Text>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={updateIndex}
          containerStyle={{ height: 50 }}
        />
      </View>
      <ScrollView style={{ marginHorizontal: 0, marginBottom: 200 }}>
        {renderSelectedView()}
      </ScrollView>
    </View>
  );
};

export default Recherche;
