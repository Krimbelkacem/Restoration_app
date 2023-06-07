import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text, Dimensions } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import Bottomnav from "./Bottomnav";
import { API_URL } from "../utils/config";
import FadeIn from "../screens/day001/components/FadeIn";
import {
  MaterialIcons,
  Feather,
  SimpleLineIcons,
  Ionicons,
  AntDesign,
} from "react-native-vector-icons";
import Reservation from "../components/ProfilTab/Reservation";
const Drawer = createDrawerNavigator();

export function NavigationDrawerStructure(props) {
  const navigation = useNavigation();

  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Icon name="menu" />
      </TouchableOpacity>
    </View>
  );
}

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const sessionData = await AsyncStorage.getItem("session");
        if (sessionData) {
          const { token } = JSON.parse(sessionData);
          const response = await fetch(`${API_URL}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const user = await response.json();

          setUserData(user);
          setIsConnected(true);
          console.log(user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("session");
      setUserData(null);
      setIsConnected(false);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!isConnected ? (
        <FadeIn delay={300}>
          <View
            style={{
              borderBottomColor: "#6e7e87",
              borderBottomWidth: 0.5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 40,
                paddingBottom: 30,
              }}
            >
              <View
                style={{ marginLeft: 10, justifyContent: "center", width: 200 }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Medium",
                    color: "black",
                  }}
                >
                  Mon compte
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Poppins-Medium",
                    color: "#6e7e87",
                  }}
                >
                  Un compte vous permet de reserver et de s'abonnée a un
                  restaurant plus facilement.
                </Text>
              </View>
              <Image
                source={require("../assets/avataruser.png")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 35,
                  marginTop: 20,
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <Text style={styles.buttonText}>CONNECTEZ-VOUS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </FadeIn>
      ) : (
        <FadeIn delay={300}>
          {userData && (
            <View
              style={{
                borderBottomColor: "#6e7e87",
                borderBottomWidth: 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 40,
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    marginLeft: 10,
                    justifyContent: "center",
                    width: 200,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily: "Poppins-Medium",
                      color: "black",
                    }}
                  >
                    {userData.username}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Poppins-Medium",
                      color: "#6e7e87",
                    }}
                  >
                    {userData.email}
                  </Text>
                </View>
                <Image
                  source={{
                    uri: `${API_URL}/${userData.picture}`,
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 35,
                    marginTop: 20,
                  }}
                />
              </View>
            </View>
          )}
        </FadeIn>
      )}

      <View>
        {
          ///////////////////////////user connected
        }
        {isConnected ? (
          <FadeIn delay={600}>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() =>
                  navigation.navigate("Informations", { userData: userData })
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Feather name="user" size={20} color={"black"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 0,
                  }}
                >
                  Mes informations
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 20 }}
                onPress={() =>
                  navigation.navigate("Following", {
                    followings: userData?.followings,
                  })
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <SimpleLineIcons
                    name="user-following"
                    size={20}
                    color={"black"}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 0,
                  }}
                >
                  Mes abonnement
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 20 }}
                onPress={() =>
                  navigation.navigate("DrawerReservation", {
                    reservations: userData?.reservations,
                  })
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Ionicons name="book-outline" size={20} color={"black"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 0,
                  }}
                >
                  Mes reservations
                </Text>
              </TouchableOpacity>
              {userData.Restos.length > 0 ? (
                <TouchableOpacity
                  style={{ flexDirection: "row", marginTop: 20 }}
                  onPress={() =>
                    navigation.navigate("MyRestos", {
                      Restos: userData?.Restos,
                    })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 25,
                    }}
                  >
                    <Ionicons
                      name="restaurant-outline"
                      size={20}
                      color={"black"}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Regular",
                      color: "black",
                      alignSelf: "center",
                      marginLeft: 0,
                    }}
                  >
                    Mes restaurants
                  </Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 20 }}
                onPress={() => navigation.navigate("ContactAdmin")}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <AntDesign name="mail" size={20} color={"black"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 0,
                  }}
                >
                  Contactez Nous
                </Text>
              </TouchableOpacity>

              {isConnected ? (
                <TouchableOpacity
                  style={{ flexDirection: "row", marginTop: 20 }}
                  onPress={handleLogout}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 25,
                    }}
                  >
                    <Feather name="power" size={20} color={"black"} />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Regular",
                      color: "black",
                      alignSelf: "center",
                      marginLeft: 0,
                    }}
                  >
                    Deconnexion
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text></Text>
              )}
            </View>
          </FadeIn>
        ) : (
          //user desconnect
          <FadeIn delay={600}>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Feather name="user" size={20} color={"black"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 0,
                  }}
                >
                  Mes informations
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 20 }}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <SimpleLineIcons
                    name="user-following"
                    size={20}
                    color={"black"}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 0,
                  }}
                >
                  Mes abonnement
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 20 }}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <Ionicons name="book-outline" size={20} color={"black"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 0,
                  }}
                >
                  Mes reservations
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 20 }}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                  }}
                >
                  <AntDesign name="mail" size={20} color={"black"} />
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins-Regular",
                    color: "black",
                    alignSelf: "center",
                    marginLeft: 0,
                  }}
                >
                  Contactez Nous
                </Text>
              </TouchableOpacity>
            </View>
          </FadeIn>
        )}
      </View>
      <DrawerContentScrollView {...props}></DrawerContentScrollView>

      {!isConnected ? (
        <View>
          <FadeIn delay={300}>
            <View
              style={{
                borderTopColor: "#6e7e87",
                borderTopWidth: 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",

                  paddingBottom: 30,
                }}
              >
                <View
                  style={{
                    marginLeft: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Medium",
                      color: "black",
                    }}
                  >
                    Vous êtes restaurateur ?
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Poppins-Medium",
                      color: "#6e7e87",
                    }}
                  >
                    Enregistrez votre restaurant et attirez de nouveaux clients
                    dans votre restaurant
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text style={styles.buttonText}>INSCRIPTION RESTAURANT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </FadeIn>
        </View>
      ) : (
        <View>
          <FadeIn delay={300}>
            <View
              style={{
                borderTopColor: "#6e7e87",
                borderTopWidth: 0.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",

                  paddingBottom: 30,
                }}
              >
                <View
                  style={{
                    marginLeft: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins-Medium",
                      color: "black",
                    }}
                  >
                    Vous êtes restaurateur ?
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Poppins-Medium",
                      color: "#6e7e87",
                    }}
                  >
                    Enregistrez votre restaurant et attirez de nouveaux clients
                    dans votre restaurant
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("AddResto", { id: userData?._id })
                  }
                >
                  <Text style={styles.buttonText}>INSCRIPTION RESTAURANT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </FadeIn>
        </View>
      )}
    </View>
  );
};

function Drawernav() {
  const [isScreenPressed, setIsScreenPressed] = useState(false);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: "white",
        itemStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen
        name="Bottomnav"
        options={{
          drawerLabel: "",
          drawerActiveBackgroundColor: "white",
          drawerItemStyle: {
            backgroundColor: isScreenPressed ? "white" : "transparent",
          },

          onPress: () => setIsScreenPressed(true),
        }}
        component={Bottomnav}
      />
    </Drawer.Navigator>
  );
}

export default Drawernav;

const styles = {
  button: {
    // backgroundColor: "#9400D3",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,

    backgroundColor: "black", // Vibrant pink
    borderColor: "#FFFFFF", // White
    borderWidth: 2,
    borderRadius: 8,
    marginTop: -30,
    marginBottom: 5,
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
};
