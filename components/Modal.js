import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

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
};
