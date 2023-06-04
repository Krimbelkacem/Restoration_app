import FadeIn from "../day001/components/FadeIn";
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
const DeleteRestaurantScreen = ({ navigation, route }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    const restoid = route.params.idR;

    try {
      const response = await axios.delete(
        `${API_URL}/deleteResto?idR=${restoid}`
      );

      console.log(response.data);
      alert("Resto suprimer");
      if (response) {
        navigation.navigate("Profile");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const submit = async () => {};
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
      <Text style={styles.text}>
        Voulez-vous vraiment supprimer ce restaurant ?
      </Text>
      <FadeIn delay={300}>
        <View style={styles.container}></View>
        {showConfirmation ? (
          <Button title="Supprimer" onPress={handleDelete} color="black" />
        ) : (
          <Button
            title="confirmer"
            onPress={() => setShowConfirmation(true)}
            color="black"
          />
        )}
      </FadeIn>
      <FadeIn delay={400}></FadeIn>
      <FadeIn delay={500}></FadeIn>
    </View>
  );
};
export default DeleteRestaurantScreen;

const styles = StyleSheet.create({
  container: {
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
});
