import React from "react";
import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import FadeIn from "../day001/components/FadeIn";
import LottieView from "lottie-react-native";
import {
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

function MenuSetting({ route, navigation }) {
  const restoname = route.params.Restoname;
  const idR = route.params.idR;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 12 }}>
        <FadeIn delay={300}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              paddingBottom: 30,
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
          >
            <View style={{ marginLeft: 20, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-Medium",
                  color: "black",
                }}
              >
                {restoname}
              </Text>
            </View>
          </View>
        </FadeIn>
        <FadeIn delay={600}>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailsSettings", {
                  idR: idR,
                })
              }
              style={{ flexDirection: "row" }}
            >
              <View
                style={{
                  backgroundColor: "#3b2924",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <MaterialCommunityIcons
                  name="details"
                  size={20}
                  color={"#ff9844"}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-Regular",
                  color: "black",
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              >
                Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", marginTop: 20 }}
              onPress={() =>
                navigation.navigate("Addcuisine", {
                  idR: idR,
                })
              }
            >
              <View
                style={{
                  backgroundColor: "#28194c",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <MaterialIcons name="lock-open" size={20} color={"#8300ff"} />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-Regular",
                  color: "black",
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              >
                cuisines
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", marginTop: 20 }}
              onPress={() =>
                navigation.navigate("Addmenu", {
                  idresto: idR,
                })
              }
            >
              <View
                style={{
                  backgroundColor: "#1c3f4c",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <MaterialIcons name="security" size={20} color={"#32b1b7"} />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-Regular",
                  color: "black",
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              >
                menucategories
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", marginTop: 20 }}
              onPress={() =>
                navigation.navigate("Addmenuitem", {
                  idresto: idR,
                })
              }
            >
              <View
                style={{
                  backgroundColor: "#3b242f",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <MaterialIcons name="chat" size={20} color={"#ff4339"} />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-Regular",
                  color: "black",
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              >
                Menuitems
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: "row", marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#1b344c",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <MaterialIcons
                  name="notifications-none"
                  size={20}
                  color={"#097fc3"}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-Regular",
                  color: "black",
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              >
                Help
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: "row", marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#253b1f",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <MaterialIcons name="report" size={20} color={"#91ec1d"} />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-Regular",
                  color: "black",
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              >
                Report
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: "row", marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#3b194b",
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                }}
              >
                <MaterialIcons
                  name="notifications-none"
                  size={20}
                  color={"#fe00f9"}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins-Regular",
                  color: "black",
                  alignSelf: "center",
                  marginLeft: 10,
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </FadeIn>
      </View>
    </View>
  );
}
export default MenuSetting;
