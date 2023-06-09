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
import { API_URL } from "../utils/config";

export default function EditProfile({ navigation, route }) {
  const [name, setName] = useState(route.params.userData.username);
  const [email, setEmail] = useState(route.params.userData.email);
  const [picture, setpicture] = useState(route.params.userData.picture);
  const [userPasse, setuserPasse] = useState("");
  const id = route.params.userData._id;
  console.log(id);
  const handleSave = async () => {
    const token = route.params.token;
    const post = [name, email];
    try {
      const response = await axios.post(
        `${API_URL}/updateprofil?id=${id}`,
        {
          name: name,
          email: email,
          password: userPasse,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const response = await axios.post(`${API_URL}/deleteprofil?id=${id}`);
      const data = await response.data;
      console.log(data);
      alert("deleted");
      navigation.navigate("LoginScreen");
    } catch (err) {
      console.log(err);
      alert("no deleted");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(userPasse) => setuserPasse(userPasse)}
        />
        <Button title="Save Changes" onPress={handleSave} />
        <Text>if you want to delete your compte</Text>
        <Button title="delete compte" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
});
