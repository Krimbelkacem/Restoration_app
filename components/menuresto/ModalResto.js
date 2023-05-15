import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
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
const ModalResto = ({ navigation, route, idresto }) => {
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
          backgroundColor: "grey",
          // backgroundColor: "rgba(244, 244, 244, 1)",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
      >
        addphoto
      </Button>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Layout style={styles.modalContainer}>
          <Card disabled={true}>
            <Text>laarbi amroune duchen matchi d la sorciaire 😻</Text>

            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 304, height: 300 }}
              />
            ) : (
              <View>
                <Text>upload image</Text>
              </View>
            )}
          </Card>

          <Button
            style={{
              backgroundColor: "grey",
              backgroundColor: "rgba(244, 244, 244, 1)",
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 30,
              color: "white",
            }}
            onPress={submit}
          >
            send
          </Button>
        </Layout>
      </Modal>
    </View>
  );
};

export default ModalResto;
