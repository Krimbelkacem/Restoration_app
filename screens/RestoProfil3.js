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
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutRight,
  Layout,
} from "react-native-reanimated";

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
      ? { backgroundColor: "black" }
      : {};
  };

  const renderComponent = (componentName) => {
    switch (componentName) {
      case "Details":
        return <Details idR={idR} Resto={Resto} />;
      case "Menu":
        return <Menu idR={idR} />;
      case "Publication":
        return <Pub idR={idR} Resto={Resto} />;
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
        return <Avis idR={idR} />;
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
          if (userId && userId === profileData.owner) {
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
      <ScrollView>
        <View>
          {showReservation && (
            <Reservation restoId={Resto._id} onClose={toggleReservation} />
          )}
        </View>

        <Animated.View entering={FadeInDown.delay(400).duration(300)}>
          <View style={styles.headerContainer}>
            <RestoCarousel photos={slicedPhotos} />
            <View style={styles.profileContainer}></View>
          </View>
        </Animated.View>

        <View style={styles.section}>
          {UserId ? (
            <View>
              {display ? (
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>modifier</Text>
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
              <Text style={styles.buttonText}>veuillez creer un compte</Text>
            </TouchableOpacity>
          )}
        </View>
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
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
};
