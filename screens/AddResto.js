import React, { useState } from "react";
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
} from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import styles from "../style/Addrestostyle";

import { Icon, Input, Button } from "@rneui/themed";

import { API_URL } from "../utils/config";

export default function AddResto({ navigation, route }) {
  const id = route.params.id;
  const [imageUri, setImageUri] = useState(null);
  const [restoName, setrestoName] = useState("");
  const [restoaddress, setrestoAddress] = useState("");
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!restoName) {
      alert("Please fill Name");
      return;
    }

    const formData = new FormData();
    formData.append("name", restoName);
    formData.append("address", restoaddress);
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "image.jpg",
    });

    try {
      const response = await axios.post(
        `${API_URL}/upload?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("resto added succesful");
      navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
      alert(no);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <TouchableOpacity onPress={pickImage}>
            <Feather
              name="camera"
              size={30}
              color={"gray"}
              style={{
                position: "absolute",
                flex: 1,
                zIndex: 2,
                bottom: 0,
                right: 0,
              }}
            />

            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imgback} />
            ) : (
              <Image
                source={require("../assets/chef.png")}
                style={styles.imgback}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/*
      <View style={styles.SectionStyle}>
      
        <TextInput
          style={styles.inputStyle}
          //  onChangeText={(restoName) => setrestoName(restoName)}
          underlineColorAndroid="#f000"
          placeholder="Enter Name"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          blurOnSubmit={false}
        />
            
      </View>*/}

      <Input
        style={styles.inp}
        returnKeyType="next"
        blurOnSubmit={false}
        onChangeText={(restoName) => setrestoName(restoName)}
        placeholder="name"
        leftIcon={<Ionicons name="restaurant" size={24} color="grey" />}
      />
      <Input
        style={styles.inp}
        returnKeyType="next"
        blurOnSubmit={false}
        onChangeText={(restoaddress) => setrestoAddress(restoaddress)}
        placeholder="address"
        leftIcon={<Entypo name="location" size={24} color="grey" />}
      />

      <StatusBar style="auto" />

      <View style={styles.buttoncontainer}>
        <Button
          title="ajouter un restaurant"
          buttonStyle={{
            backgroundColor: "rgba(111, 202, 186, 1)",
            //borderRadius: 5,
            //  backgroundColor: "black",
            // backgroundColor: "rgba(244, 244, 244, 1)",
            borderWidth: 1,
            borderColor: "lightgrey",
            borderRadius: 30,
          }}
          onPress={uploadImage}
        />
      </View>
    </View>
  );
}
