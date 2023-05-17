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
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const connected = isconnected;

  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <View>
          {isconnected === 1 ? (
            <TouchableOpacity onPress={onOpen}>
              <Avatar.Image
                size={40}
                source={{
                  uri: `${API_URL}/${userData.picture}`,
                }}
              />
            </TouchableOpacity>
          ) : (
            <Appbar.Action icon="menu" onPress={onOpen} />
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
        </View>
      </View>
    </View>
  );
}
