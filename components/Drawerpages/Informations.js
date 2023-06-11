import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
//deleteprofil
import { API_URL } from "../../utils/config";
import FadeIn from "../../screens/day001/components/FadeIn";
import Icon from "react-native-vector-icons/FontAwesome";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import Header from "./DrawerHeader";

export default function Informations({ navigation, route }) {
  const userData = route.params.userData;
  console.log(userData); // const token = route.params.token;
  const [name, setName] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [picture, setpicture] = useState(userData.picture);
  const [userPasse, setuserPasse] = useState("");

  const id = userData._id;

  const handleSave = async () => {
    const post = [name, email];
    try {
      const response = await axios.post(`${API_URL}/updateprofil?id=${id}`, {
        name: name,
        email: email,
        password: userPasse,
      });
      const data = await response.data;
      console.log(data);
      alert("updated");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      alert("no updated");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.post(`${API_URL}/deleteprofil?idU=${id}`);

      console.log(response.data);
      alert("utilisateur archiver");
      navigation.navigate("LoginScreen");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <Header title="Mes Informations" />
      <ScrollView>
        <View style={styles.container}>
          <FadeIn delay={300}>
            {userData && (
              <View
                style={{
                  borderBottomColor: "#6e7e87",
                  borderBottomWidth: 0.5,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    marginTop: 40,
                    paddingBottom: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={{}}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontFamily: "Poppins-Medium",
                        color: "black",
                      }}
                    >
                      {userData.username}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: `${API_URL}/${userData?.picture}`,
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 35,
                      marginTop: 20,
                    }}
                  />
                </View>
              </View>
            )}
          </FadeIn>

          <Text style={styles.label}>Nom Complet:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>mot de passe:</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(userPasse) => setuserPasse(userPasse)}
          />
          <Button
            title="Save Changes"
            onPress={handleSave}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
          <Text
            syles={{
              fontWeight: "bold",
              marginBottom: 8,
              fontSize: 20,
              fontFamily: "Poppins-Medium",
              color: "black",
            }}
          >
            si vous voulez suprimer votre compte
          </Text>
          <Button
            title="delete compte"
            onPress={handleDelete}
            buttonStyle={[styles.button, styles.deleteButton]}
            titleStyle={styles.buttonText}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "black",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f8f6f9",
    borderRadius: 10,
    marginTop: 2,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "lightgrey",
  },
});
