import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title }) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    marginLeft: 16,
    fontSize: 18,
    color: "white",
  },
};

export default Header;
