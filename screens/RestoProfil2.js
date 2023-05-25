import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import axios from "axios";
import Carousel from "../components/ProfilTab/Carousel";
import {
  Card,
  Text,
  Avatar,
  IconButton,
  Button,
  FAB,
} from "react-native-paper";
import { SpeedDial } from "react-native-elements";
//import { Button } from "@rneui/themed";
import MenuResto from "../components/menuresto/MenuResto";
import RestoFollowers from "../components/RestoFollowers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../utils/config";
import { MD3Colors } from "react-native-paper";
import MyModal from "../components/Modal";
import ModalResto from "../components/menuresto/ModalResto";
import RestoCarousel from "../components/ProfilTab/RestoCarousel";
import { AlignCenter, User } from "react-native-feather";
import Reservation from "../components/Reservation/Reservation";
import ReservationList from "../components/GestionReservation";
import { fetchRestoProfile } from "../Api/RestoProfil";

const ProfileView = ({ route, navigation }) => {
  const [display, setDisplay] = useState(null);
  //const [isfollowing, setIsfollowing] = useState(0);
  const [isfollowing, setIsfollowing] = useState(false);

  const [followerss, setfollowerss] = useState([]);
  const [slicedPhotos, setSlicedPhotos] = useState([]);
  const [photos, setphotos] = useState([]);
  const [Resto, setResto] = useState({});
  const [UserId, setUserId] = useState(null);
  const [RestoReservations, setRestoReservations] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const idR = route.params.idR;
      getRestoProfile(idR);
      console.log("actualiser1");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const idR = route.params.idR;
    console.log("idR: " + idR);
    getRestoProfile(idR);
    console.log("actualiser2");
  }, [navigation]);

  const getRestoProfile = async (idR) => {
    try {
      const profileData = await fetchRestoProfile(idR);
      //  const response = await axios.get(`${API_URL}/ProfilResto?id=${idR}`);
      console.log("ok");
      console.log(profileData);
      if (profileData) {
        // setMenu(profileData.menu.categories);
        // console.log(menu[0]);
        //setMenucontext(profileData.menu.categories);
        setResto(profileData);
        setphotos(profileData.photos);
        const sliced = profileData.photos.slice(0, 3);

        setfollowerss(profileData.followers);
        setRestoReservations(profileData.reservations);

        // set state variable with sliced array of photos
        setSlicedPhotos(sliced);

        const sessionData = await AsyncStorage.getItem("session");
        if (sessionData) {
          const { userId } = JSON.parse(sessionData);
          setUserId(userId);
          setIsfollowing(
            profileData.followers.some((follower) => follower._id === userId)
          );
          if (userId && userId === profileData.owner) {
            setDisplay("owner");
          }
        }

        /*   if (response.data.followers.includes(UserId)) {
          setIsfollowing(1);
        }*/
      }

      // slice first 3 photos
    } catch (error) {
      console.log(error);
      alert("resto not charged");
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/addfollower?idU=${UserId}&idR=${route.params.idR}  `
      );
      console.log(response.data);
      setIsfollowing(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/unfollow?idU=${UserId}&idR=${route.params.idR}  `
      );
      console.log(response.data);
      setIsfollowing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [showReservation, setShowReservation] = useState(false);

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  return (
    <View>
      <ScrollView>
        <View>
          {showReservation && (
            <Reservation restoId={Resto._id} onClose={toggleReservation} />
          )}
        </View>
        <View style={styles.headerContainer}>
          <RestoCarousel photos={slicedPhotos} />
          <View style={styles.profileContainer}></View>
        </View>

        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.infoValue}>
              {Resto.name}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.statCount}>{followerss.length}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>

          <View style={styles.section}>
            <View>
              <ScrollView
                horizontal
                contentContainerStyle={styles.friendsScroll}
              >
                {/*followerss.map((follower) => (
                <Text key={follower._id}>{follower.username}</Text>
              ))*/}
                <Pressable
                  onPress={() =>
                    navigation.navigate("FollowersLit", {
                      followers: Resto.followers,
                      idR: Resto._id,
                    })
                  }
                >
                  {followerss?.map(({ picture, _id }) => (
                    <View style={styles.friendCard} key={_id}>
                      <Image
                        style={styles.friendImage}
                        source={{ uri: `${API_URL}/${picture}` }}
                      />
                    </View>
                  ))}
                </Pressable>
              </ScrollView>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.bioText}>{Resto.description}</Text>
            <View style={styles.container}>
              {Resto.description ? (
                <Text>{Resto.description}</Text>
              ) : (
                <Button>adddescription</Button>
              )}
            </View>
          </View>
          {/* user / owener /visiteur */}
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
                        {isfollowing ? (
                          <View>
                            <TouchableOpacity
                              style={styles.button}
                              onPress={handleUnfollow}
                            >
                              <Text style={styles.buttonText}>abonnée</Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View>
                            <TouchableOpacity
                              style={styles.button}
                              onPress={handleFollow}
                            >
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
                  <Text style={styles.buttonText}>
                    veuillez creer un compte
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>

        <View>
          <Text variant="bodyMedium"> {Resto.address}</Text>

          <Text variant="bodyMedium">asiatique</Text>
          <Text variant="bodyMedium">1000 DA</Text>
        </View>
        <View>
          {
            // addphoto / ad category / ad item
          }

          <Text variant="titleLarge" style={styles.infoValue}>
            Menu
          </Text>
          {display ? (
            <View style={{ flexDirection: "row", width: "100%" }}>
              <ModalResto idresto={Resto._id} />
              <Button
                icon="menu"
                mode="contained"
                onPress={() =>
                  navigation.navigate("Addmenuitem", {
                    idresto: Resto._id,
                  })
                }
                style={{
                  backgroundColor: "grey",
                  // backgroundColor: "rgba(244, 244, 244, 1)",
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 30,
                }}
              >
                item
              </Button>
              <Button
                icon="menu"
                mode="contained"
                onPress={() =>
                  navigation.navigate("Addmenu", {
                    idresto: Resto._id,
                  })
                }
                style={{
                  backgroundColor: "grey",
                  // backgroundColor: "rgba(244, 244, 244, 1)",
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 30,
                }}
              >
                Category
              </Button>
            </View>
          ) : (
            <Text></Text>
          )}
          <MenuResto navigation={navigation} menu={Resto.menu} />
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
                  {photos.length > 0 &&
                    photos.slice(0, 9).map((photo, index) => (
                      <View key={index}>
                        <TouchableOpacity>
                          <Image
                            style={styles.photo}
                            source={{
                              uri: `${API_URL}/${photo}`,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}

                  <TouchableOpacity>
                    <Image
                      style={styles.photo}
                      source={{
                        uri:
                          "https://bootdey.com/img/Content/avatar/avatar6.png",
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

        <ReservationList
          RestoReservation={RestoReservations}
          UserId={UserId}
          display={display}
          owner={Resto.owner}
        />
      </ScrollView>
      {UserId ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            margin: 16,
          }}
        >
          {display ? (
            <Text></Text>
          ) : (
            <TouchableOpacity
              onPress={toggleReservation}
              style={{
                backgroundColor: "#2f95dc",
                borderRadius: 50,
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}
            >
              <Text style={{ fontSize: 15, color: "#fff", fontWeight: "bold" }}>
                new Reservation
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
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
