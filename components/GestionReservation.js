import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Avatar } from "react-native-paper";
import { API_URL } from "../utils/config";
import axios from "axios";

const ReservationList = ({ RestoReservation, UserId, display }) => {
  const [reservations, setReservations] = useState([]);

  async function acceptReservation(id) {
    try {
      const response = await axios.put(`${API_URL}/acceptReservation?id=${id}`);
      alert("Accepted");
    } catch (error) {
      throw error;
    }
  }
  async function rejectReservation(id) {
    try {
      const response = await axios.put(`${API_URL}/acceptReservation?id=${id}`);
      alert("refused");
    } catch (error) {
      throw error;
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Reservations</Text>
      {RestoReservation?.map((reservation) => (
        <Card key={reservation._id} containerStyle={styles.card}>
          <Text>Date: {reservation.date}</Text>
          <Text>Time: {reservation.time}</Text>
          <Text>Guests: {reservation.guests}</Text>
          <Avatar.Image
            size={40}
            source={{
              uri: `${API_URL}/${reservation.user.picture}`,
            }}
          />
          <Text>User: {reservation.user.username}</Text>

          <Text>
            Status : <Text style={{ color: "grey" }}>{reservation.state}</Text>
          </Text>
          {reservation.state === "pending" && (
            <View>
              {display ? (
                <View style={styles.buttonContainer}>
                  <Button
                    title="Accept"
                    onPress={acceptReservation(reservation._id)}
                  />
                  <Button
                    title="Reject"
                    onPress={rejectReservation(reservation._id)}
                  />
                </View>
              ) : (
                <Text></Text>
              )}
            </View>
          )}
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
});

export default ReservationList;
