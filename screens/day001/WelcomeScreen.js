import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FadeIn from "./components/FadeIn";

const WelcomeScreen = ({ navigation }) => {
  const navigateToSingUp = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <FadeIn delay={300}>
          <Image
            source={require("../../assets/01.jpg")}
            style={{
              width: 380,
              height: 400,
              backgroundColor: "#d99bf1",
              borderRadius: 25,
            }}
            resizeMode="contain"
          />
        </FadeIn>

        <FadeIn delay={500}>
          <View style={{ marginTop: 40 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#353045",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Bienvenu a El Mida{" "}
            </Text>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 40,
                backgroundColor: "#e9ecf7",
                borderColor: "#FFF",
                borderBottomEndRadius: 10,
                borderTopRightRadius: 10,
              }}
              onPress={() => navigation.navigate("Drawernav")}
            >
              <Text style={{ fontSize: 16, color: "#353045" }}>Commencer</Text>
            </TouchableOpacity>
          </View>
        </FadeIn>

        <FadeIn delay={800}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 60,
              backgroundColor: "#e9ecf7",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#FFF",
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 40,
                backgroundColor: "#FFF",
                borderWidth: 1,
                borderColor: "#FFF",
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text style={{ fontSize: 16, color: "#353045" }}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 40,
                backgroundColor: "#e9ecf7",
                borderColor: "#FFF",
                borderBottomEndRadius: 10,
                borderTopRightRadius: 10,
              }}
              onPress={() => navigateToSingUp()}
            >
              <Text style={{ fontSize: 16, color: "#353045" }}>
                Se Connecter
              </Text>
            </TouchableOpacity>
          </View>
        </FadeIn>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

export default WelcomeScreen;
