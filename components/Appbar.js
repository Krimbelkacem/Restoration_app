//import * as React from "react";
import React, { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  FlatList,
} from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { API_URL } from "../utils/config";
import Modal from "react-native-modal";
import { List, MD3Colors } from "react-native-paper";
export default function MyAppbar({
  isconnected,
  userData,
  handleLogout,
  navigation,
  token,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const connected = isconnected;

  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");
  const handleMore = () => {
    console.log("Shown more");
  };
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <View>
          {isconnected === 0 ? (
            <Appbar.Action icon="menu" onPress={toggleModal} />
          ) : (
            <TouchableOpacity onPress={toggleModal}>
              <Avatar.Image
                size={40}
                source={{
                  uri: `${API_URL}${userData.picture
                    .replace("public", "")
                    .replace(/\\/g, "/")}`,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </Appbar.Header>

      <View>
        <View style={{ flex: 1, height: 500 }}>
          <Modal
            isVisible={modalVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={toggleModal}
            style={{ justifyContent: "flex-end", margin: 0 }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 22,
                // justifyContent: "center",
                // alignItems: "center",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              {isconnected === 0 ? (
                <View>
                  <Text> text</Text>
                  <List.Section>
                    <List.Subheader>Some title</List.Subheader>
                    <List.Item
                      onPress={() => navigation.navigate("SignUp")}
                      title="sign up"
                      left={() => <List.Icon icon="folder" />}
                    />
                    <List.Item
                      title="log in"
                      left={() => (
                        <List.Icon color={MD3Colors.tertiary70} icon="folder" />
                      )}
                      onPress={() => navigation.navigate("Login")}
                    />
                  </List.Section>
                </View>
              ) : (
                <View>
                  <Text> {userData.username}</Text>
                  <List.Section>
                    <List.Subheader>Some title</List.Subheader>
                    <List.Item
                      onPress={() =>
                        navigation.navigate("Profile", { token: token })
                      }
                      title="viewProfile"
                      left={() => <List.Icon icon="folder" />}
                    />
                    <List.Item
                      title="log out"
                      left={() => (
                        <List.Icon color={MD3Colors.tertiary70} icon="folder" />
                      )}
                      onPress={handleLogout}
                    />
                  </List.Section>
                </View>
              )}
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}
