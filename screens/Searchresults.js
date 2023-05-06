import React, { useState } from "react";
import axios from "axios";
import Searchbar from "react-native-paper";
import { Card, Title, Paragraph } from "react-native-paper";

import {
  EvilIcons,
  Feather,
  FontAwesome5,
  AntDesign,
} from "react-native-vector-icons";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import { API_URL } from "../utils/config";
const Searchkey = ({ navigation }) => {
  const [Data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [restoName, setrestoName] = useState("");
  //const FormData = new FormData();
  // FormData.append("resto", restoName);
  const config = {
    header: {
      "content-type": "multipart/form-data",
    },
  };
  console.log(restoName);
  const getDataUsingSimpleGetCall = async () => {
    try {
      const resto = await axios.post(
        `${API_URL}/searchResto?restoName=${restoName}`,
        restoName
      );

      setData(resto.data);

      setLoading(true);
    } catch (error) {
      console.log(error);
      alert("no");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginLeft: 10 }}></Text>
        </View>

        <View style={styles.inputContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="#aaa"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={(restoName) => setrestoName(restoName)}
            blurOnSubmit={false}
            onSubmitEditing={getDataUsingSimpleGetCall}
            returnKeyType="next"
            onBlur={getDataUsingSimpleGetCall}
            value={restoName}
          />
        </View>
      </View>

      {/*<TouchableOpacity
        style={styles.buttonStyle}
        onPress={getDataUsingSimpleGetCall}
      >
        <Text>search</Text>
      </TouchableOpacity>*/}
      <ScrollView style={{ marginBottom: 50 }}>
        <View>
          {Data.map((resto) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfilResto", {
                  rest: resto,
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
      </ScrollView>
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlate: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "lightblue",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },

  card: {
    flex: 1,

    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  photo: {
    width: 350,
    height: 200,
    borderRadius: 10,
    margin: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "white",
    marginRight: 100,
  },
  input: {
    flex: 1,
    height: 50,

    paddingLeft: 10,

    backgroundColor: "white",
  },
  icon: {
    marginRight: 10,
  },
});

export default Searchkey;
