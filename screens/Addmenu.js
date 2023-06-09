import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
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
import { Icon, Input } from "@rneui/themed";
import { RadioButton, Text } from "react-native-paper";
import { IconButton, Colors } from "react-native-paper";
import { Button } from "@ui-kitten/components";
import { Layout } from "@ui-kitten/components";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_URL } from "../utils/config";
export default function Addmenu({ navigation, route }) {
  const [name, setName] = useState("");

  const [catname, setCatname] = useState("");

  //////////////////////////////////

  const [cats, setCats] = useState([]);

  const [imageUri, setImageUri] = useState(null);
  const [itemname, setitemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
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
      alert("nom du menu ajouter");
    } catch (error) {
      console.log(error);
      alert("probleme de connection");
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
      fetchData();
      alert("ajouter avec succes");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [route.params.idresto]);

  async function fetchData() {
    const restoid = route.params.idresto;

    const response = await axios.get(`${API_URL}/category?id=${restoid}`);
    const categories = response.data;
    setCats(categories);
    console.log("categories");
    console.log(response.data);
  }
  const [selectedCat, setSelectedCat] = useState(null);

  const handleCatChange = async (catId) => {
    const selectedcat = cats.find((cat) => cat._id === catId);
    await setSelectedCat(selectedcat);
  };
  async function addItem() {
    const restoid = route.params.idresto;

    const idC = selectedCat._id;
    const formData = new FormData();
    console.log("name" + itemname);
    console.log("description" + description);
    console.log("price" + description);
    formData.append("name", itemname);
    formData.append("description", description);
    formData.append("price", price);

    try {
      console.log(restoid);
      console.log(itemname);
      console.log(description);
      console.log(price);
      // console.log(formData.get("category"));
      const response = await axios.post(
        `${API_URL}/additem?id=${restoid}&idC=${idC}`,
        {
          name: itemname,
          //category: selectedCat,
          description: description,
          price: price,
        }
      );
      console.log(response.data);
      alert("element ajouter avec succes");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.MainContainer}>
        <ScrollView>
          <View style={{ backgroundColor: "white" }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Regular",
                color: "black",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              Menu nom
            </Text>
            <Input
              style={styles.inp}
              // label="Name"
              value={name}
              placeholder="name"
              rightIcon={
                <Octicons
                  name="diff-added"
                  size={30}
                  color="black"
                  onPress={addmenuname}
                />
              }
              onChangeText={(name) => setName(name)}
            />
            {/* <Button
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
        /> */}
          </View>

          <View style={{ backgroundColor: "white" }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Regular",
                color: "black",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              Menu categories
            </Text>
            <Input
              style={styles.inp}
              // label="Name"
              //value={catname}
              placeholder="category name"
              rightIcon={
                <Octicons
                  name="diff-added"
                  size={30}
                  color="black"
                  onPress={addcatname}
                />
              }
              onChangeText={(catname) => setCatname(catname)}
            />
          </View>

          <View style={{ backgroundColor: "white" }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Regular",
                color: "black",
                textAlign: "center",
                marginTop: 5,
              }}
            >
              ajoute menuElements
            </Text>

            <Picker
              selectedValue={selectedCat?._id}
              onValueChange={handleCatChange}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                marginBottom: 20,
                height: 50, // set the height to 50 pixel
                borderWidth: 1,
                fontSize: 16,
                borderWidth: 1,
                padding: 10,
                width: 400,
              }}
            >
              {cats.map((cat) => (
                <Picker.Item
                  key={cat._id}
                  label={cat.name}
                  //label="selectinne une categorie"
                  value={cat._id}
                  style={styles.inp}
                />
              ))}
            </Picker>

            <View>
              <View>
                <Input
                  value={itemname}
                  onChangeText={setitemName}
                  placeholder="Enter name"
                  style={styles.inp}
                />

                <Input
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Enter price"
                  keyboardType="numeric"
                  style={styles.inp}
                />

                <Input
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter description"
                  multiline={true}
                  numberOfLines={4}
                  style={styles.inp}
                />
                <Button
                  style={{
                    backgroundColor: "black",
                    borderRadius: 8,
                    borderColor: "#ccc",
                    margin: 10,
                  }}
                  onPress={addItem}
                >
                  ajouter
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    paddingHorizontal: 10,
    margin: 8,
    width: 200,
  },
  MainContainer: {
    justifyContent: "center",

    margin: 10,
  },

  TextInputStyleClass: {
    textAlign: "center",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },

  TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginBottom: 15,
  },
  picker: {
    width: 200,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
});
