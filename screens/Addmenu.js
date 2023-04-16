import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import {
  EvilIcons,
  Feather,
  FontAwesome5,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
  MaterialIcons,
} from "react-native-vector-icons";
import { Icon, Input, Button } from "@rneui/themed";
import { RadioButton, Text } from "react-native-paper";
import axios from "axios";
import { API_URL } from "../utils/config";
export default function Addmenu({ navigation, route }) {
  const [name, setName] = useState("");
  const [catname, setCatname] = useState("");
  useEffect(() => {
    // Function to fetch user data from API
    const fetchUserData = async () => {};
    fetchUserData();
  }, [addmenuname]);

  const addmenuname = async () => {
    const restoid = route.params.idresto;
    if (!name) {
      alert("Please fill Name");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    console.log(name);
    try {
      const response = await axios.post(`${API_URL}/addmenu?id=${restoid}`, {
        name: name,
      });

      console.log(response.data);
      alert("resto added succesful");
    } catch (error) {
      console.log(error);
      alert("no");
    }
  };

  const addcatname = async () => {
    const restoid = route.params.idresto;
    if (!catname) {
      alert("Please fill Name");
      return;
    }
    const formData = new FormData();
    formData.append("catname", catname);

    console.log(catname);
    try {
      const response = await axios.post(
        `${API_URL}/addcategory?id=${restoid}`,
        { catname: catname }
      );

      console.log(response.data);
      alert("added");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text>Set your Menu Name</Text>
        <Input
          style={styles.inp}
          // label="Name"
          value={name}
          placeholder="name"
          leftIcon={<Icon name="menu" size={24} color="black" />}
          onChangeText={(name) => setName(name)}
        />
        <Button
          title="add"
          buttonStyle={{
            backgroundColor: "black",
            // backgroundColor: "rgba(244, 244, 244, 1)",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={addmenuname}
        />
      </View>
      <View style={styles.container2}>
        <Text>add category</Text>
        <Input
          style={styles.inp}
          // label="Name"
          //value={catname}
          placeholder="category name"
          leftIcon={<Icon name="menu" size={24} color="black" />}
          onChangeText={(catname) => setCatname(catname)}
        />
        <Button
          title="add"
          buttonStyle={{
            backgroundColor: "black",
            // backgroundColor: "rgba(244, 244, 244, 1)",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={addcatname}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: 400,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 8,
    width: 200,
  },
  inp: {
    padding: 8,
    margin: 8,
    width: 200,
  },
});
