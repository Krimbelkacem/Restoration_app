import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { Card } from "react-native-elements";
import { Avatar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";

import { API_URL } from "../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/UserProfilestyle";

export default function Profile({ navigation }) {
  const route = useRoute();
  const [userid, setUserid] = useState({});
  const [userData, setUserData] = useState(null);
  const [restoData, setRestoData] = useState([]);
  const [restochoosed, setRestoChoosed] = useState({});
  const [followings, setFollowings] = useState([]);

  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    // Function to fetch user data from API
    const fetchUserData = async () => {
      const unsubscribe = navigation.addListener("focus", async () => {
        // const token = route.params.token;
        const sessionData = await AsyncStorage.getItem("session");
        const session = JSON.parse(sessionData);
        const token = session.token;

        if (token) {
          getUserProfile(token);
        }

        if (!token) {
          navigation.navigate("Login");
          alert("notoken");
          return;
        }
      });

      return unsubscribe;
    };
    fetchUserData();
  }, [navigation, handleRefresh]);

  const getUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log("ok");
      console.log(response.data);
      setUserData(response.data);
      setRestoData(response.data.Restos);
      setFollowings(response.data.followings);
      setReservations(response.data.reservations);
    } catch (error) {
      console.log(error);
      alert("probleme de connection ");
    }
  };

  const getuprofilResto = async (resto) => {
    navigation.navigate("ProfileView", { resto });
  };
  const submit = async (token) => {
    navigation.navigate("EditProfile", { userData }, { token });
  };
  const addResto = async () => {
    const id = userData._id;
    navigation.navigate("AddResto", { id });
  };
  const handleRefresh = () => {
    const token = route.params.token;
    if (token) {
      getUserProfile(token);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Refresh" onPress={handleRefresh} />

      <ScrollView style={styles.ScrollView}>
        {userData ? (
          <View>
            <View style={styles.header}>
              <Image
                style={styles.avatar}
                source={{
                  /*  uri: `${API_URL}${userData.picture
                    .replace("public", "")
                    .replace(/\\/g, "/")}`,*/
                  uri: `${API_URL}/${userData.picture}`,
                }}
              />
              <View style={styles.info}>
                <>
                  <Text style={styles.name}>{userData.username}</Text>
                  <Text style={styles.username}>{userData.email}</Text>
                </>

                <Button
                  buttonStyle={styles.button}
                  title="Edit Profile"
                  onPress={submit}
                  titleStyle={styles.statLabel}
                />
              </View>
            </View>
            <View style={styles.stats}>
              <View style={styles.stat}></View>
              <View style={styles.stat}>
                <Button
                  title="add resto"
                  buttonStyle={styles.button}
                  containerStyle={{
                    width: 100,
                    marginHorizontal: 20,
                    marginVertical: 10,
                  }}
                  titleStyle={styles.statLabel}
                  onPress={addResto}
                />
              </View>

              <View style={styles.stat}></View>
            </View>
            <View style={styles.stat}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                My Restos
              </Text>
            </View>
            <View style={styles.body}>
              {restoData?.length > 0 ? (
                restoData.map((resto) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Resto", {
                        idR: resto._id,
                        id: userData._id,
                      })
                    }
                  >
                    <View key={resto.id} style={styles.box}>
                      <Image
                        source={{
                          uri: `${API_URL}/${resto.avatar.replace(
                            "public",
                            ""
                          )}`,
                        }}
                        style={styles.photo}
                      />
                      <Text style={styles.username}>Name: {resto.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.message}>No restaurants available</Text>
              )}
            </View>
            <View style={styles.stat}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Restos Followings
              </Text>
            </View>
            <View style={styles.body}>
              {followings?.length > 0 ? (
                followings?.map((resto) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProfileView", {
                        idR: resto._id,
                        id: userData._id,
                      })
                    }
                  >
                    <View key={resto.id} style={styles.box}>
                      <Image
                        source={{
                          uri: `${API_URL}/${resto.avatar.replace(
                            "public",
                            ""
                          )}`,
                        }}
                        style={styles.photo}
                      />
                      <Text style={styles.username}>Name: {resto.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.message}>No restaurants available</Text>
              )}
            </View>
            {/*reserve */}
            <View style={styles.stat}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                mes reservations
              </Text>
            </View>

            <View>
              <Text>mes Reservations:</Text>
              <FlatList
                data={reservations}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      padding: 10,
                      margin: 10,
                      marginBottom: 10,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 3,
                    }}
                  >
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>
                      Date: {item.date}
                    </Text>
                    <Text>Time: {item.time}</Text>
                    <Text>Guests: {item.guests}</Text>
                    <Text>Restaurant: {item.Resto.name}</Text>
                    <Avatar.Image
                      size={40}
                      source={{
                        uri: `${API_URL}${item.Resto.avatar
                          .replace("public", "")
                          .replace(/\\/g, "/")}`,
                      }}
                    />
                    <Text>Status: {item.state}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

        <View>
          <View
            style={{
              flex: 1,
              padding: 16,
              paddingTop: 30,
              backgroundColor: "#fff",
            }}
          ></View>
        </View>
        <View>
          <Button
            title="log out"
            buttonStyle={styles.button}
            containerStyle={{
              width: 100,
              marginHorizontal: 20,
              marginVertical: 10,
            }}
            titleStyle={styles.statLabel}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ScrollView>
    </View>
  );
}
