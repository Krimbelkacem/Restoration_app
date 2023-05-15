import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Avatar } from "react-native-paper";
import { API_URL } from "../utils/config";

const ReservationList = ({ RestoReservation }) => {
  const [reservations, setReservations] = useState([]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>gestions Reservations</Text>
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

          <Text>Status: {reservation.state}</Text>
          {reservation.state === "pending" && (
            <View style={styles.buttonContainer}>
              <Button title="Accept" />
              <Button title="Reject" />
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
