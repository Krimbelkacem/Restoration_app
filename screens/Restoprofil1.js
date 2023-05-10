import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

import Carousel from "../components/ProfilTab/Carousel";

const ProfileView = () => {
  const handleEditPress = () => {};

  return (
    <View>
      <View style={styles.headerContainer}>
        {
          //<Carousel />
        }
        <View style={styles.profileContainer}></View>
      </View>

      <View style={styles.section}></View>

      <View style={styles.section}>
        <View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.friendsScroll}
          ></ScrollView>
        </View>
      </View>

      <View style={styles.section}></View>

      <View>
        <View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoValue}>Restaurant Akfadou</Text>
            <Text style={styles.infoValue}>San Francisco, CA</Text>
            <Text style={styles.infoValue}>asiatique</Text>
            <Text style={styles.infoValue}>1000 DA</Text>
          </View>
        </View>
      </View>
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
};

export default ProfileView;
