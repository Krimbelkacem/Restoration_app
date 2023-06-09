import React, { useState, useContext } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
//import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { Input } from "@ui-kitten/components";
import {
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import axios from "axios";
import TokenContext from "../store/tokencontext";
import { API_URL } from "../utils/config";

export default function Login({ navigation }) {
  const [userEmail, setuserEmail] = useState("");
  const [userPasse, setuserPasse] = useState("");
  const { setToken } = useContext(TokenContext);
  async function submit() {
    if (!userEmail || !userPasse) {
      alert("email and password are required");
      return;
    } else {
      const data = {
        email: userEmail,
        password: userPasse,
      };
      console.log(data.password);
      try {
        const res = await axios.post(`${API_URL}/login`, data);
        if (res) {
          const token = res.data.token;
          const idU = res.data.idU;

          setToken(token);
          await AsyncStorage.setItem(
            "session",
            JSON.stringify({ userId: idU, token: token })
          );
          // await AsyncStorage.setItem("token", "token");
          navigation.navigate("Bottomnav", { token: token });
        }
      } catch (error) {
        console.error(error);

        if (error.response) {
          if (error.response.status === 400) {
            alert("Invalid email or password");
          } else if (error.response.status === 402) {
            alert("veulliez verifier votre compte gmail");
          } else {
            alert("Probleme de connexion");
          }
        }
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/serveur.png")}
            style={{
              width: 200,
              height: 200,
              // resizeMode: "contain",
              borderRadius: 10,
              margin: 30,
            }}
          />
        </View>
        <Input
          style={styles.inp}
          onChangeText={(userEmail) => setuserEmail(userEmail)}
          placeholder="email"
          leftIcon={<Icon name="email" size={24} color="black" />}
        />

        <Input
          style={styles.inp}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(userPasse) => setuserPasse(userPasse)}
          accessoryRight={
            <MaterialCommunityIcons name="eye" size={24} color="black" />
          }
          leftIcon={
            <MaterialCommunityIcons name="lock" size={24} color="black" />
          }
          rightIcon={
            <MaterialCommunityIcons name="eye" size={24} color="black" />
          }
        />

        <StatusBar style="auto" />
        <View style={styles.buttoncontainer}>
          <Button
            title="LOG IN"
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
            onPress={submit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {},
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gradient",
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
