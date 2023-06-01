import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
  TextInput,
  Modal,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutRight,
  Layout,
} from "react-native-reanimated";
import {
  SimpleLineIcons,
  Ionicons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  FontAwesome,
} from "react-native-vector-icons";

import ReservationList from "../components/GestionReservation";
import Details from "../components/ProfilTab/Details";
import Menu from "../components/ProfilTab/Menu";
import Pub from "../components/ProfilTab/Pub";
import Reservation from "../components/Reservation/Reservation";
import Avis from "../components/ProfilTab/Avis";
import { fetchRestoProfile } from "../Api/RestoProfil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../utils/config";
import RestoCarousel from "../components/ProfilTab/RestoCarousel";
import { Button } from "react-native-elements";
import axios from "axios";
import ModalResto from "../components/menuresto/ModalResto";
export default function Resto({ route, navigation }) {
  const [display, setDisplay] = useState(null);

  const [isfollowing, setIsfollowing] = useState(false);

  const [followerss, setfollowerss] = useState([]);
  const [slicedPhotos, setSlicedPhotos] = useState([]);
  const [photos, setphotos] = useState([]);
  const [Resto, setResto] = useState({});
  const [UserId, setUserId] = useState(null);
  const [RestoReservations, setRestoReservations] = useState([]);

  const [currentComponent, setCurrentComponent] = useState("Details");
  const idR = route.params.idR;

  const buttonStyle = (componentName) => {
    return currentComponent === componentName
      ? { borderBottomWidth: 2, borderBottomColor: "black", paddingBottom: 5 }
      : {};
  };

  const renderComponent = (componentName) => {
    switch (componentName) {
      case "Details":
        return <Details idR={idR} Resto={Resto} />;
      case "Menu":
        return <Menu idR={idR} display={display} />;
      case "Publication":
        return <Pub idR={idR} Resto={Resto} onFunctionCall={getRestoProfile} />;
      case "Reservation":
        return (
          <ReservationList
            RestoReservation={RestoReservations}
            UserId={UserId}
            display={display}
            owner={Resto.owner}
          />
        );
      case "Avis":
        return <Avis idR={idR} idU={UserId} display={display} />;
      default:
        return null;
    }
  };

  const handlePress = (componentName) => {
    setCurrentComponent(componentName);
  };

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

      console.log("ok");
      console.log(profileData);
      if (profileData) {
        setResto(profileData);
        setphotos(profileData.photos);
        const sliced = profileData.photos.slice(0, 3);

        setfollowerss(profileData.followers);
        setRestoReservations(profileData.reservations);

        setSlicedPhotos(sliced);

        const sessionData = await AsyncStorage.getItem("session");
        if (sessionData) {
          const { userId } = JSON.parse(sessionData);
          setUserId(userId);
          setIsfollowing(
            profileData.followers.some((follower) => follower._id === userId)
          );
          console.log(userId + "====" + profileData.owner._id);

          if (userId && userId === profileData.owner._id) {
            alert("owner");
            setDisplay("owner");
          }
        }
      }
    } catch (error) {
      console.log(error);
      alert("resto not charged");
    }
  };
  const [showReservation, setShowReservation] = useState(false);

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/addfollower?idU=${UserId}&idR=${route.params.idR}  `
      );
      console.log(response.data);
      // setIsfollowing(true);
      handleRefresh();
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
      // setIsfollowing(false);
      handleRefresh();
    } catch (error) {
      console.error(error);
    }
  };
  const showAlert = () => {
    Alert.alert(
      "se desabonner ",
      "vous ete sur de vouloir vous desabonner ",
      [
        {
          text: "OK",
          onPress: handleUnfollow,
        },
      ],
      { cancelable: false }
    );
  };
  const handleRefresh = () => {
    const idR = route.params.idR;
    if (idR) {
      getRestoProfile(idR);
    }
  };
  return (
    <View style={{ backgroundColor: "#FFF" }}>
      {UserId ? (
        <View
          style={{
            flex: 1,
            position: "absolute",
            bottom: 0,
            right: 0,
            margin: 16,
            zIndex: 1,
          }}
        >
          {display ? (
            <Text></Text>
          ) : (
            <TouchableOpacity
              // onPress={toggleReservation}
              onPress={() =>
                navigation.navigate("ToReservation", {
                  restoId: Resto._id,
                  owner: Resto.owner._id,
                })
              }
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
      <ScrollView>
        <View>
          {/*showReservation && (
            <Reservation restoId={Resto._id} onClose={toggleReservation} />
          )*/}
        </View>
        <Animated.View entering={FadeInDown.delay(400).duration(300)}>
          <View style={styles.headerContainer}>
            <RestoCarousel photos={slicedPhotos} />
            <View style={{ position: "absolute", top: 30, left: 20 }}>
              {display ? (
                <ModalResto
                  idresto={Resto._id}
                  getRestoProfile={getRestoProfile}
                />
              ) : (
                <View />
              )}
            </View>
            <View style={styles.profileContainer}></View>
          </View>
        </Animated.View>

        <View style={styles.sectionfriends}>
          <Text style={styles.statCount}>{followerss.length}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.sectionfriends}>
          <View>
            <ScrollView horizontal contentContainerStyle={styles.friendsScroll}>
              {/*followerss.map((follower) => (
                <Text key={follower._id}>{follower.username}</Text>
              ))*/}
              <Pressable
                onPress={() =>
                  navigation.navigate("FollowersLit", {
                    followers: Resto.followers,
                    idR: Resto._id,
                    display: display,
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
          {UserId ? (
            <View>
              {display ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "black",
                    margin: 5,
                    marginHorizontal: 20,
                    padding: 10,
                    // borderRadius: 2,
                    alignItems: "center",
                    shadowColor: "#048533",
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.36,
                    shadowRadius: 6.68,
                    elevation: 11,
                    marginBottom: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("MenuSetting", {
                      idR: Resto._id,
                      Restoname: Resto.name,
                    })
                  }
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-Medium",
                      fontSize: 14,
                      color: "#FFF",
                    }}
                  >
                    Parametres
                  </Text>
                </TouchableOpacity>
              ) : (
                <View>
                  <View>
                    {isfollowing ? (
                      <View>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={showAlert}
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
              <Text style={styles.buttonText}>veuillez creer un compte</Text>
            </TouchableOpacity>
          )}
        </View>

        <Animated.View entering={FadeInRight.delay(300).duration(300)}>
          <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 25 }}>
              {Resto.name}
            </Text>

            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
              <Ionicons name="location-outline" size={20} /> {Resto.address}
            </Text>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
              <Ionicons name="ios-restaurant-outline" size={20} />
              {Resto.cuisines}
            </Text>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
              <FontAwesome name="money" size={20} />
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          ></TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(800).duration(300)}>
          <ScrollView
            horizontal
            style={{ flexGrow: 0 }}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[
                { paddingVertical: 10, paddingHorizontal: 20 },
                buttonStyle("Details"),
              ]}
              onPress={() => handlePress("Details")}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#ababab",
                  fontSize: 14,
                }}
              >
                Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                { paddingVertical: 10, paddingHorizontal: 20 },
                buttonStyle("Menu"),
              ]}
              onPress={() => handlePress("Menu")}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#ababab",
                  fontSize: 14,
                }}
              >
                Menu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                { paddingVertical: 10, paddingHorizontal: 20 },
                buttonStyle("Publication"),
              ]}
              onPress={() => handlePress("Publication")}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#ababab",
                  fontSize: 14,
                }}
              >
                Publication
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                { paddingVertical: 10, paddingHorizontal: 20 },
                buttonStyle("Reservation"),
              ]}
              onPress={() => handlePress("Reservation")}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#ababab",
                  fontSize: 14,
                }}
              >
                Reservation
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                { paddingVertical: 10, paddingHorizontal: 20 },
                buttonStyle("Avis"),
              ]}
              onPress={() => handlePress("Avis")}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "#ababab",
                  fontSize: 14,
                }}
              >
                Avis
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Render the selected component */}
          {renderComponent(currentComponent)}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
const styles = {
  profileContainer: {
    alignItems: "center",
    marginTop: -70,
    marginBottom: 100,
  },
  headerContainer: {
    alignItems: "center",
  },
  button: {
    // backgroundColor: "#9400D3",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,

    backgroundColor: "black", // Vibrant pink
    borderColor: "#FFFFFF", // White
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  sectionfriends: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 10,
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
};
