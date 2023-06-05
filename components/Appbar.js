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
  Modal,
  FlatList,
} from "react-native";
import { Drawer } from "react-native-paper";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Appbar, Avatar, Badge, IconButton } from "react-native-paper";
import { API_URL } from "../utils/config";
//import Modal from "react-native-modal";
import { List, MD3Colors } from "react-native-paper";
import {
  Actionsheet,
  useDisclose,
  Box,
  Center,
  NativeBaseProvider,
} from "native-base";

export default function MyAppbar({
  isconnected,
  userData,
  handleLogout,
  navigation,
  token,
  receivedNotification,
  notificationCount,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  /* const toggleModal = () => {
    setModalVisible(!modalVisible);
  };*/
  const connected = isconnected;

  const _goBack = () => console.log("Went back");

  const handleNotes = () =>
    alert(
      receivedNotification
        ? receivedNotification.message
        : "no new notification"
    );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      <Appbar.Header>
        <Avatar.Image size={60} source={require("../assets/002.jpg")} />
        <Appbar.Content title="ElMida" />
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 25,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        ></View>
        <View></View>
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 25,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          {notificationCount > 0 ? (
            <Badge
              size={16}
              style={{
                width: 12,
                height: 16,
                backgroundColor: "#27bc5c",
                borderRadius: 6,
                position: "absolute",
                right: 0,
                top: 5,
                borderWidth: 1,
                zIndex: 2,
                borderColor: "#2f3038",
              }}
            >
              {notificationCount}
            </Badge>
          ) : null}
          <FontAwesome5
            name="bell"
            size={25}
            color="black"
            onPress={handleNotes}
          />
        </View>
        <View>
          {isconnected === 1 ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile", { token: token })}
            >
              <Avatar.Image
                size={40}
                source={{
                  uri: `${API_URL}/${userData.picture}`,
                }}
              />
            </TouchableOpacity>
          ) : (
            <Appbar.Action icon="menu" onPress={toggleModal} />
          )}
        </View>
      </Appbar.Header>

      <View>
        <View style={{ flex: 1, height: 500 }}>
          <NativeBaseProvider>
            <Center flex={1} px="3">
              <Center>
                <Button onPress={onOpen} title="Actionsheet" />
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content
                    _dragIndicatorWrapperOffSet={{
                      py: "10",
                    }}
                  >
                    {isconnected === 0 ? (
                      <View>
                        <Actionsheet.Item
                          onPress={() => navigation.navigate("SignUp")}
                        >
                          sign up
                        </Actionsheet.Item>
                        <Actionsheet.Item
                          onPress={() => navigation.navigate("Login")}
                        >
                          log in
                        </Actionsheet.Item>
                      </View>
                    ) : (
                      <View>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                          <Text
                            fontSize="16"
                            color="gray.500"
                            _dark={{
                              color: "gray.300",
                            }}
                          >
                            user:
                          </Text>
                          <Avatar.Image
                            size={40}
                            source={{
                              uri: `${API_URL}/${userData.picture}`,
                            }}
                          />
                        </Box>
                        <Actionsheet.Item
                          onPress={() =>
                            navigation.navigate("Profile", { token: token })
                          }
                        >
                          profil: {userData.username}
                        </Actionsheet.Item>
                        <Actionsheet.Item onPress={handleLogout}>
                          log out
                        </Actionsheet.Item>
                      </View>
                    )}
                  </Actionsheet.Content>
                </Actionsheet>
              </Center>
            </Center>
          </NativeBaseProvider>

          {/* <Modal
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
                      </Modal>*/}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <TouchableWithoutFeedback onPress={closeModal}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableWithoutFeedback>
                  <View style={{ backgroundColor: "#fff", padding: 16 }}>
                    <Text>This is a custom modal drawer</Text>
                    {isconnected === 0 ? (
                      <View>
                        <Text onPress={() => navigation.navigate("SignUp")}>
                          sign up
                        </Text>
                        <Text onPress={() => navigation.navigate("Login")}>
                          log in
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                          <Text
                            fontSize="16"
                            color="gray.500"
                            _dark={{
                              color: "gray.300",
                            }}
                          >
                            user:
                          </Text>
                          <Avatar.Image
                            size={40}
                            source={{
                              uri: `${API_URL}/${userData.picture}`,
                            }}
                          />
                        </Box>
                        <Text
                          onPress={() =>
                            navigation.navigate("Profile", { token: token })
                          }
                        >
                          profil: {userData.username}
                        </Text>
                        <Text onPress={handleLogout}>log out</Text>
                      </View>
                    )}
                    <TouchableOpacity
                      onPress={toggleModal}
                      style={{ marginTop: 16 }}
                    >
                      <Text>Close</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
    </View>
  );
}
