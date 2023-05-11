import React, { useState, useEffect, useContext } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import Carousel from "../components/ProfilTab/Carousel";
import { Card, Text, Avatar, IconButton } from "react-native-paper";
import { Button } from "@rneui/themed";
import MenuResto from "../components/menuresto/MenuResto";
import RestoFollowers from "../components/RestoFollowers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../utils/config";
const ProfileView = ({ route, navigation }) => {
  const [display, setDisplay] = useState(null);
  const [isfollowing, setIsfollowing] = useState(0);
  const [followerss, setfollowerss] = useState([]);
  const [slicedPhotos, setSlicedPhotos] = useState([]);
  const [photos, setphotos] = useState([]);
  const [Resto, setResto] = useState({});
  const [UserId, setUserId] = useState(null);

  useEffect(() => {
    const idR = route.params.idR;
    console.log("idR: " + idR);
    getRestoProfile(idR);
  }, [navigation]);

  const getRestoProfile = async (idR) => {
    try {
      const response = await axios.get(`${API_URL}/ProfilResto?id=${idR}`);
      console.log("ok");
      console.log(response.data);
      if (response) {
        // setMenu(response.data.menu.categories);
        // console.log(menu[0]);
        //setMenucontext(response.data.menu.categories);
        setResto(response.data);
        setphotos(response.data.photos);
        const sliced = response.data.photos.slice(0, 3);

        setfollowerss(Resto.followers);
        console.log("followers : " + followerss);

        // set state variable with sliced array of photos
        setSlicedPhotos(sliced);

        const sessionData = await AsyncStorage.getItem("session");
        if (sessionData) {
          const { userId } = JSON.parse(sessionData);
          setUserId(userId);
          if (userId && userId === response.data.owner) {
            setDisplay("owner");
          }
        }

        alert(response.data.followers);
        if (response.data.followers.includes(UserId)) {
          setIsfollowing(1);
        }
      }

      // slice first 3 photos
    } catch (error) {
      console.log(error);
      alert("no");
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/addfollower?idU=${UserId}&idR=${route.params.idR}  `
      );
      console.log(response.data);
      setIsfollowing(1);
    } catch (error) {
      console.error(error);
    }
  };
  const followers = [
    {
      id: 1,
      avatar: "https://bootdey.com/img/Content/avatar/avatar2.png",
      name: "John Doe",
      age: "30",
    },
    {
      id: 2,
      avatar: "https://bootdey.com/img/Content/avatar/avatar3.png",
      name: "John Doe",
      age: "30",
    },
    {
      id: 3,
      avatar: "https://bootdey.com/img/Content/avatar/avatar4.png",
      name: "John Doe",
      age: "30",
    },
    {
      id: 4,
      avatar: "https://bootdey.com/img/Content/avatar/avatar5.png",
      name: "John Doe",
      age: "30",
    },
    {
      id: 5,
      avatar: "https://bootdey.com/img/Content/avatar/avatar5.png",
      name: "John Doe",
      age: "30",
    },
    {
      id: 6,
      avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
      name: "John Doe",
      age: "30",
    },
  ];

  return (
    <ScrollView>
      <Text>{UserId}</Text>
      <Text>{isfollowing}</Text>
      <View style={styles.headerContainer}>
        <Carousel photos={slicedPhotos} />
        <View style={styles.profileContainer}></View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.statCount}>1234</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>

        <View style={styles.section}>
          <View>
            <ScrollView horizontal contentContainerStyle={styles.friendsScroll}>
              {followers.map(({ avatar, id }) => (
                <View style={styles.friendCard} key={id}>
                  <Image style={styles.friendImage} source={{ uri: avatar }} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.bioText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            ullamcorper nisi.
          </Text>
        </View>

        <View style={styles.section}>
          <View>
            {UserId ? (
              <View>
                {display ? (
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Owner</Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <View>
                      {isfollowing === 1 ? (
                        <View>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={handleFollow}
                          >
                            <Text style={styles.buttonText}>abonnée</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View>
                          <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>s'abonnée</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>veuillez creer un compte</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <View>
        <Card>
          <Card.Content>
            <Text variant="titleLarge" style={styles.infoValue}>
              {Resto.name}
            </Text>
            <Text variant="bodyMedium"> {Resto.address}</Text>

            <Text variant="bodyMedium">asiatique</Text>
            <Text variant="bodyMedium">1000 DA</Text>
          </Card.Content>
        </Card>
      </View>
      <View>
        <Card>
          <Card.Content>
            <Text variant="titleLarge" style={styles.infoValue}>
              Menu
            </Text>
            {display ? (
              <View>
                <Button
                  buttonStyle={{
                    backgroundColor: "grey",
                    // backgroundColor: "rgba(244, 244, 244, 1)",
                    borderWidth: 2,
                    borderColor: "white",
                    borderRadius: 30,
                    margin: 5,
                  }}
                  title="add menuCategory"
                  onPress={() =>
                    navigation.navigate("Addmenu", {
                      idresto: Resto._id,
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
                  title="add menuitem"
                  onPress={() =>
                    navigation.navigate("Addmenuitem", {
                      idresto: Resto._id,
                    })
                  }
                />
              </View>
            ) : (
              <Text></Text>
            )}
            <MenuResto navigation={navigation} menu={Resto.menu} />
          </Card.Content>
        </Card>
      </View>

      <View>
        <Card>
          <Card.Content>
            <View style={styles.sectionHeader}>
              <Text variant="titleLarge" style={styles.infoValue}>
                Avis
              </Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllButtonText}>See all</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </View>
      <View>
        <Card>
          <Card.Content>
            <Text variant="titleLarge" style={styles.infoValue}>
              Publication
            </Text>
            <View style={styles.photosCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Photos</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllButtonText}>See all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.photosContainer}>
                {photos?.map((photo, index) => (
                  <View key={index}>
                    <TouchableOpacity>
                      <Image
                        style={styles.photo}
                        source={{
                          uri: `${API_URL}${photo
                            .replace("public", "")
                            .replace(/\\/g, "/")}`,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity>
                  <Image
                    style={styles.photo}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
      <View>
        <Card>
          <Card.Content>
            <Text variant="titleLarge" style={styles.infoValue}>
              Details
            </Text>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>opening_hours</Text>
              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() => navigation.navigate("Openninghours")}
              >
                <Text style={styles.seeAllButtonText}>edit</Text>
              </TouchableOpacity>
            </View>
            <Text variant="bodyMedium">San Francisco, CA</Text>

            <Text variant="bodyMedium">asiatique</Text>
            <Text variant="bodyMedium">1000 DA</Text>
          </Card.Content>
        </Card>
      </View>

      <View>
        {/* <Image
          style={styles.image}
          source={{
            // uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
            uri: `${API_URL}${Resto.avatar
              .replace("public", "")
              .replace(/\\/g, "/")}`,
          }}
        />*/}
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
  },
  coverPhoto: {
    width: "100%",
    height: 180,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -70,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
    textAlign: "center",
    color: "#A9A9A9",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  statCount: {
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#999",
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#9400D3",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  friendCard: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 2,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendsScroll: {
    paddingBottom: 10,
  },
  infoContainer: {
    margin: 10,
    marginTop: 20,
  },
  infoLabel: {
    marginTop: 5,
    fontWeight: "bold",
  },
  infoValue: {
    fontWeight: "bold",
    marginTop: 5,
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
  },
  photosCard: {
    marginTop: 10,
  },
  photo: {
    width: 113,
    height: 113,
    marginTop: 5,
    marginRight: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
  },
  seeAllButton: {
    backgroundColor: "#A9A9A9",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  seeAllButtonText: {
    color: "#eee",
  },
};

export default ProfileView;
