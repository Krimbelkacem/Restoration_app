import FadeIn from "./components/FadeIn";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
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
} from "react-native-vector-icons";

const SignUpScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPasse, setuserPasse] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Veuillez saisir une adresse email valide");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Le mot de passe doit comporter au moins 8 caractères");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins une lettre majuscule"
      );
      return false;
    }
    setPasswordError("");
    return true;
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

  const submit = async () => {
    if (!userEmail || !userPasse) {
      alert("email and password are required");
      return;
    }

    if (!validateEmail(userEmail) || !validatePassword(userPasse)) {
      return;
    }

    const formData = new FormData();
    formData.append("name", userName);
    console.log(userName);
    console.log(userEmail);
    console.log(userPasse);
    formData.append("email", userEmail);
    formData.append("passe", userPasse);

    if (imageUri) {
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "image.jpg",
      });
    }

    try {
      const response = await axios.post(
        `${API_URL}/signup?API_URL=${API_URL}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("user created");
      navigation.navigate("LoginScreen");
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
                  source={require("../../assets/chef.png")}
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
            style={styles.inp}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(userName) => setuserName(userName)}
            placeholder="name"
            leftIcon={<FontAwesome name="user" size={24} color="black" />}
          />
          <View>
            <Input
              style={styles.inp}
              placeholder="email"
              leftIcon={<Icon name="email" size={24} color="black" />}
              onChangeText={(userEmail) => {
                setuserEmail(userEmail);
                validateEmail(userEmail);
              }}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <Input
              style={styles.inp}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={(userPasse) => {
                setuserPasse(userPasse);
                validatePassword(userPasse);
              }}
              leftIcon={
                <MaterialCommunityIcons name="lock" size={24} color="black" />
              }
              rightIcon={
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="black"
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
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
          <Text style={{ fontSize: 20, color: "#FFF", textAlign: "center" }}>
            S'inscrire
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text
            style={{
              fontSize: 16,
              color: "#353045",
              textAlign: "center",
              marginTop: 25,
            }}
          >
            Vous avez deja un compte
          </Text>
        </TouchableOpacity>
      </FadeIn>

      <FadeIn delay={800}>
        <View
          style={{
            flexDirection: "row",
            width: 350,
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        ></View>
      </FadeIn>
    </View>
  );
};
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
  errorText: {
    color: "red",
    marginTop: 0,
  },
});

export default SignUpScreen;
