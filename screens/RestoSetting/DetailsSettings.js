import FadeIn from "../day001/components/FadeIn";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { Icon, Input, Button } from "@rneui/themed";
import {
  EvilIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "react-native-vector-icons";
const DetailsSettings = ({ navigation, route }) => {
  const [imageUri, setImageUri] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setavatar] = useState(null);
  const [resto, setResto] = useState({});
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");

  const handleInputChange = (value) => {
    setText(value);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idR = route.params.idR;
        const response = await axios.get(`${API_URL}/ProfilResto?id=${idR}`);
        setResto(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setphone(response.data.phone);
        setavatar(response.data.avatar);
        setText(response.data.openingHours);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigation]);

  const submit = async () => {
    const restoid = route.params.idR;

    const formData = new FormData();

    if (name) {
      formData.append("name", name);
    }
    if (phone) {
      formData.append("phone", phone);
    }
    if (description) {
      formData.append("description", description);
    }
    console.log(name);

    if (imageUri) {
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "image.jpg",
      });
    }
    console.log(imageUri);

    try {
      const response = await axios.post(
        `${API_URL}/updatedetailsResto?id=${restoid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("cuisine ajouer");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FadeIn delay={300}></FadeIn>
      <FadeIn delay={400}>
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
                  source={{
                    uri: `${API_URL}/${avatar}`,
                  }}
                  style={styles.imgback}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </FadeIn>
      <FadeIn delay={500}>
        <View style={{ width: 350, marginTop: 20 }}>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="ajouter nom Restaurant"
            style={styles.inp}
            returnKeyType="next"
            blurOnSubmit={false}
            leftIcon={
              <Ionicons name="restaurant-outline" size={24} color="black" />
            }
          />
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder=" ajouter Description Restaurant "
            style={styles.inp}
            returnKeyType="next"
            blurOnSubmit={false}
            leftIcon={
              <MaterialIcons name="description" size={24} color="black" />
            }
          />

          <Input
            value={phone}
            onChangeText={setphone}
            placeholder="ajouter numero Restaurant "
            style={styles.inp}
            returnKeyType="next"
            blurOnSubmit={false}
            leftIcon={<MaterialIcons name="phone" size={24} color="black" />}
          />
        </View>

        <TouchableOpacity
          onPress={submit}
          style={{
            backgroundColor: "black",
            width: 350,
            borderRadius: 10,
            marginTop: 20,
            paddingVertical: 15,
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
            Mettre a jour
          </Text>
        </TouchableOpacity>
      </FadeIn>
    </View>
  );
};
export default DetailsSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },

  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "grey",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  container2: {
    marginVertical: 20,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    borderRadius: 0,
    marginBottom: 100,
  },
  container3: {
    position: "absolute",
    zIndex: 1,
    bottom: -80,
    flex: 1,
    alignItems: "center",
    borderRadius: 75,
    justifyContent: "center",

    // backgroundColor: "lightskyblue",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  imgback: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "lightgray",
  },
  buttonsubmit: {
    // backgroundColor: "black",
    backgroundColor: "rgba(244, 244, 244, 1)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
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
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
});
