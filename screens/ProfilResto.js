

import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Card, Modal, Layout } from "@ui-kitten/components";
import { Button, Text } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";

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
import { API_URL } from "../utils/config";
import { useRoute } from "@react-navigation/native";
import TokenContext from "../store/tokencontext";
import axios from "axios";
import styles from "../style/ProfiRestostyle";
import Carousel from "react-native-snap-carousel";
const ProfilResto = ({ navigation, route }) => {
  const [restodata, setRestodata] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [visible, setVisible] = React.useState(false);

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

  const [images, setImages] = useState([
    "https://www.bootdey.com/image/280x280/FF00FF/000000",
    "https://www.bootdey.com/image/280x280/00FFFF/000000",
    "https://www.bootdey.com/image/280x280/FF7F50/000000",
    "https://www.bootdey.com/image/280x280/6495ED/000000",
    "https://www.bootdey.com/image/280x280/DC143C/000000",
    "https://www.bootdey.com/image/280x280/008B8B/000000",
  ]);
  const [photos, setphotos] = useState([]);
  const [Owner, setOwner] = useState(false);
  const [postCount, setPostCount] = useState(10);

  const [followingCount, setFollowingCount] = useState(20);
  const [followerCount, setFollowerCount] = useState(30);
  const [restoName, setRestoName] = useState("");
  const [address, setAddress] = useState("");
  const { token } = useContext(TokenContext);
  const { setToken } = useContext(TokenContext);
  const [display, setDisplay] = useState(null);

  // Function to fetch user data from API

  //  const unsubscribe = navigation.addListener("focus", () => {
  const resto = route.params.rest;
  console.log(resto);

  useEffect(() => {
    setphotos(resto.photos);
    if (route.params.id && route.params.id === resto.owner) {
      setDisplay(route.params.id);
    }
  }, [navigation]);

  const submit = async () => {
    const formData = new FormData();
    if (!imageUri) {
      alert("please select image");
    } else {
      if (restoName) {
        formData.append("name", restoName);
        return;
      }

      if (address) {
        formData.append("address", address);
        return;
      }
      if (imageUri) {
        formData.append("photos", {
          uri: imageUri,
          type: "image/jpeg",
          name: "image.jpg",
        });
      }

      try {
        const response = await axios.post(
          `${API_URL}/updateresto?id=${resto._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);
        await setphotos(response.data.photos);
        console.log(photos);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  // Function to fetch user data from API

  const data = [
    {
      id: "1",
      title: "Item 1",
      imageUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      id: "2",
      title: "Item 2",
      imageUrl: "https://picsum.photos/id/12/200/300",
    },
    {
      id: "3",
      title: "Item 3",
      imageUrl: "https://picsum.photos/id/13/200/300",
    },
  ];
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.imagecar} />
    </View>
  );

  const Header = (props) => (
    <View {...props}>
      <Text category="h6">Maldives</Text>
      <Text category="s1">By Wikipedia</Text>
    </View>
  );

  const Footer = (props) => (
    <View
      {...props}
      // eslint-disable-next-line react/prop-types
      style={[props.style, styles.footerContainer]}
    >
      <Button style={styles.footerControl} size="small" status="basic">
        CANCEL
      </Button>
      <Button style={styles.footerControl} size="small">
        ACCEPT
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
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

          <Button style={styles.modalButton} onPress={() => setVisible(false)}>
            send
          </Button>
        </Layout>
      </Modal>
      <ScrollView>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={400}
          itemWidth={400}
          autoplay={true}
          loop={true}
        />
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Photo</Text>
          </TouchableOpacity>
          <FlatList
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={styles.list}
          />
        </View>

        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <View>
                <Image
                  style={styles.image}
                  source={{
                    // uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
                    uri: `${API_URL}${resto.avatar
                      .replace("public", "")
                      .replace(/\\/g, "/")}`,
                  }}
                />

                <Text style={styles.name}>{resto.name}</Text>
                <Text style={styles.name}>{resto.address}</Text>
                {display ? (
                  <View>
                    <Button
                      title="edit profile"
                      onPress={() => navigation.navigate("UIUserProfile")}
                    />
                    <Button
                      buttonStyle={{
                        backgroundColor: "grey",
                        // backgroundColor: "rgba(244, 244, 244, 1)",
                        borderWidth: 2,
                        borderColor: "white",
                        borderRadius: 30,
                        margin: 5,
                      }}
                      title="add menu"
                      onPress={() =>
                        navigation.navigate("Addmenu", {
                          idresto: resto._id,
                        })
                      }
                    />
                    <Button
                      buttonStyle={{
                        backgroundColor: "grey",
                        // backgroundColor: "rgba(244, 244, 244, 1)",
                        borderWidth: 2,
                        borderColor: "white",
                        borderRadius: 30,
                        margin: 5,
                      }}
                      title="add category"
                      onPress={() =>
                        navigation.navigate("Addmenuitem", {
                          idresto: resto._id,
                        })
                      }
                    />
                  </View>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={styles.statsCount}>{followerCount}</Text>
                <Text style={styles.statsLabel}>Followers</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          {display ? (
            <View>
              <View style={{ width: 80 }}>
                <TouchableOpacity onPress={pickImage}>
                  <Feather
                    name="camera"
                    size={30}
                    color={"gray"}
                    style={{
                      position: "absolute",
                      flex: 1,
                      zIndex: 2,
                      bottom: 0,
                      right: 0,
                    }}
                  />

                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    <View>
                      <Text>upload image</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <Button title="send" onPress={submit} />
            </View>
          ) : (
            <Text>...</Text>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.body}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
          ))}

          <Card style={styles.item} status="basic">
            <Text>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </Text>
          </Card>
          {photos.map((photo, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `${API_URL}${photo
                    .replace("public", "")
                    .replace(/\\/g, "/")}`,
                }}
              />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default ProfilResto;
