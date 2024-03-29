import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { Avatar } from "react-native-paper";
import { API_URL } from "../utils/config";
import axios from "axios";
import io from "socket.io-client";
import Icon from "react-native-vector-icons/FontAwesome";
const ReservationList = ({
  RestoReservation,
  UserId,
  display,
  owner,
  getRestoProfile,
  idR,
  Resto,
}) => {
  const [reservations, setReservations] = useState([]);
  const socket = io(`${API_URL}`);

  const acceptReservation = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/acceptReservation?id=${id}`);
      if (response) {
        alert("Accepted");
        console.log("reciver" + response.data.user);
        handleSendNotification(response.data.user);
        getRestoProfile(idR);
      }
    } catch (error) {
      throw error;
    }
  };
  const rejectReservation = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/rejectReservation?id=${id}`);
      if (response) {
        alert("refused");
        handleSendNotification2(response.data.user);
        getRestoProfile(idR);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSendNotification = (userId) => {
    const notification = {
      senderId: owner, // ID de l'expéditeur
      receiverId: userId, // Remplacez par l'ID du destinataire
      message: `reservation accepter Resto: ${Resto.name}`,
    };
    // Send a notification to the server
    console.log("Send a notification to the server");
    socket.emit("notification", notification);
  };

  const handleSendNotification2 = (userId) => {
    const notification = {
      senderId: owner, // ID de l'expéditeur
      receiverId: userId, // Remplacez par l'ID du destinataire
      message: `reservation rejeter Resto: Resto: ${Resto.name}`,
    };
    // Send a notification to the server
    console.log("Send a notification to the server");
    socket.emit("notification", notification);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {display ? (
        <View>
          {RestoReservation?.map((reservation) => {
            const reservationDate = new Date(reservation.date);
            const formattedDate = reservationDate.toLocaleDateString();

            return (
              <Card key={reservation._id} containerStyle={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                >
                  <Avatar.Image
                    size={40}
                    source={{
                      uri: `${API_URL}/${reservation?.user.picture}`,
                    }}
                  />
                  <Text style={{ marginLeft: 8, fontSize: 16 }}>
                    User: {reservation.user.username}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                  }}
                >
                  <Text>Date: {formattedDate}</Text>
                  <Text>Heure: {reservation.time}</Text>
                  <Text>Nombres de places: {reservation.guests}</Text>

                  <Text>
                    Status:
                    <Text style={{ color: "grey" }}>{reservation.state}</Text>
                  </Text>
                </View>

                {reservation.state === "pending" && (
                  <View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => acceptReservation(reservation._id)}
                      >
                        <Icon name="check" size={20} color="white" />
                        <Text style={styles.buttonText}>accepter</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => rejectReservation(reservation._id)}
                      >
                        <Icon name="times" size={20} color="white" />
                        <Text style={styles.buttonText}>rejeter</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Card>
            );
          })}
        </View>
      ) : (
        <Text></Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    minHeight: 300,
  },
  card: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "grey",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
  },
});

export default ReservationList;
