import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Modal, Layout, Text } from "@ui-kitten/components";
import { Button } from "react-native-paper";
import {
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  Ionicons,
} from "react-native-vector-icons";
import { API_URL } from "../../utils/config";
import styles from "../../style/ProfiRestostyle";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
const ModalResto = ({ navigation, route, idresto, getRestoProfile }) => {
  const [imageUri, setImageUri] = useState(null);
  const [visible, setVisible] = useState(false);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setVisible(true);
    }
  };

  const submit = async () => {
    const formData = new FormData();
    if (!imageUri) {
      alert("please select image");
    } else {
      formData.append("photos", {
        uri: imageUri,
        type: "image/jpeg",
        name: "image.jpg",
      });

      try {
        const response = await axios.post(
          `${API_URL}/updateresto?id=${idresto}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);
        if (response) {
          setVisible(false);
          getRestoProfile(idresto);
        }
        // await setphotos(response.data.photos);
        // console.log(photos);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  return (
    <View>
      <Button
        icon="camera"
        mode="contained"
        onPress={pickImage}
        style={{
          backgroundColor: "black",
          // backgroundColor: "rgba(244, 244, 244, 1)",
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 30,
        }}
      ></Button>

      <Modal
        visible={visible}
        backdropStyle={styless.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Layout style={styless.modalContainer}>
          <Card disabled={true}>
            <Text style={styless.modalTitle}>Ajouter une Publication</Text>

            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styless.image} />
            ) : (
              <View style={styless.uploadContainer}>
                <Text style={styless.uploadText}>Upload Image</Text>
              </View>
            )}
          </Card>

          <Button style={styless.button} onPress={submit}>
            Ajouter
          </Button>
        </Layout>
      </Modal>
    </View>
  );
};
const styless = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 304,
    height: 300,
  },
  uploadContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 16,
    color: "gray",
  },
  button: {
    backgroundColor: "rgba(244, 244, 244, 1)",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    color: "white",
  },
});

export default ModalResto;
