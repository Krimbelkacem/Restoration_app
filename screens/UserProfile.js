import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";

import TokenContext from "../store/tokencontext";
import { API_URL } from "../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/UserProfilestyle";
export default function Profile({ navigation }) {
  const route = useRoute();
  const [userid, setUserid] = useState({});
  const [userData, setUserData] = useState(null);
  const [restoData, setRestoData] = useState([]);
  const [restochoosed, setRestoChoosed] = useState({});
  //const { token } = useContext(TokenContext);
  // const { setToken } = useContext(TokenContext);
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
  }, [navigation]);

  const getUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log("ok");
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
      alert("no");
    }
  };

  const getuserrestos = async () => {
    setRestoData(userData.Restos);
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
  const ProfilResto = () => {
    //alert(userData._id);
    const rest = restochoosed;
    // alert(rest);
    navigation.navigate("ProfilResto", {
      rest: restochoosed,
      id: userData._id,
    });
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
                  uri: `${API_URL}${userData.picture
                    .replace("public", "")
                    .replace(/\\/g, "/")}`,
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
              <View style={styles.stat}>
                <Button
                  title="view resto"
                  buttonStyle={styles.button}
                  containerStyle={{
                    width: 100,
                    marginHorizontal: 20,
                    marginVertical: 10,
                  }}
                  titleStyle={styles.statLabel}
                  onPress={getuserrestos}
                />
              </View>
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

            <View style={styles.body}>
              {restoData.map((resto) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProfileView", {
                      // rest: resto,
                      idR: resto._id,
                      id: userData._id,
                    })
                  }
                >
                  <View key={resto.id} style={styles.box}>
                    <Image
                      source={{
                        uri: `${API_URL}/${resto.avatar.replace("public", "")}`,
                      }}
                      style={styles.photo}
                    />
                    {console.log(resto.avatar.replace(/\\/g, "/"))}

                    <Text style={styles.username}>Name :{resto.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

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
