import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
import { Avatar } from "react-native-paper";

export default function Welcome({ navigation }) {
  const [name, setName] = useState("");
  const [person, setperson] = useState("");
  const clickHandler = () => {
    setName("ali");
    setperson({ age: "40", name: "kamel" });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Avatar.Image
        size={200}
        source={require("../assets/img_restaurant.jpg")}
      />

      <StatusBar style="auto" />
      <View style={styles.buttoncontainer}>
        <Button
          title="Get started"
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(111, 202, 186, 1)",
            //borderRadius: 5,
            //  backgroundColor: "black",
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
          onPress={() => navigation.navigate("Bottomnav")}
        />
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
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Sign up"
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
          onPress={() => navigation.navigate("SignUp")}
        />
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
    backgroundColor: "#9DA3B4",
  },
});
