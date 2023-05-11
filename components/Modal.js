/*import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
//import Modal from "react-native";
/*
export const MyModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Text>Show Modal</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 22,
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              alignSelf: "stretch",
            }}
          >
            <Text>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              alignSelf: "stretch",
            }}
          >
            <Text>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              alignSelf: "stretch",
            }}
          >
            <Text>Option 3</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};*/
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";
import { List, MD3Colors } from "react-native-paper";

const MyModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <Button title="Open Modal" onPress={toggleModal} />
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
            <Text>This is a modal</Text>
            <List.Section>
              <List.Subheader>Some title</List.Subheader>
              <List.Item
                title="viewProfile"
                left={() => <List.Icon icon="folder" />}
              />
              <List.Item
                title="log out"
                left={() => (
                  <List.Icon color={MD3Colors.tertiary70} icon="folder" />
                )}
              />
            </List.Section>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default MyModal;
