import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Input, Button, Layout } from "@ui-kitten/components";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { API_URL } from "../utils/config";

export default function Addmenuitem({ navigation, route }) {
  const [cats, setCats] = useState([]);

  //  alert(restoid);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const restoid = route.params.idresto;
    const response = await axios.get(`${API_URL}/category?id=${restoid}`);
    const categories = response.data;
    setCats(categories);
    console.log("categories");
    console.log(categories);
  }
  const [selectedCat, setSelectedCat] = useState(null);

  const handleCatChange = async (catId) => {
    const selectedcat = cats.find((cat) => cat._id === catId);
    await setSelectedCat(selectedcat);
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function addItem() {
    const restoid = route.params.idresto;
    const formData = new FormData();
    formData.append("category", selectedCat);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    try {
      console.log(restoid);
      console.log(name);
      console.log(description);
      console.log(price);
      // console.log(formData.get("category"));
      const response = await axios.post(
        `${API_URL}/additem?id=${restoid}`,
        {
          name: name,
          category: selectedCat,
          description: description,
          price: price,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = () => {
    addItem;
  };

  return (
    <View style={styles.container}>
      <Text></Text>
      <Layout style={styles.formContainer}>
        <Text>choose category:</Text>
        <Picker
          selectedValue={selectedCat?._id}
          onValueChange={handleCatChange}
          style={{
            height: 50, // set the height to 50 pixels
            width: 300, // set the width to 200 pixels
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            fontSize: 16,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            width: 300,
          }}
        >
          {cats.map((cat) => (
            <Picker.Item
              key={cat._id}
              label={cat.name}
              value={cat._id}
              style={{ fontSize: 16, color: "#333" }}
            />
          ))}
        </Picker>

        <View>
          <Text>Name:</Text>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              width: 300,
            }}
          />
          <Text>Price:</Text>
          <Input
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              width: 300,
            }}
          />
          <Text>Description:</Text>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline={true}
            numberOfLines={4}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              margin: 10,
            }}
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
            add
          </Button>
        </View>
      </Layout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: 200,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },

  selection: {
    fontSize: 16,
    marginTop: 20,
  },
});
