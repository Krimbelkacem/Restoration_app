import React, { useState } from "react";
import { Button, Overlay } from "react-native-elements";
import { View, Text, TextInput, StyleSheet, label } from "react-native";
import Time from "./Time";
import { API_URL } from "../../utils/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default Reservation = ({ restoId }) => {
  const [UserId, setUserId] = useState(null);
  const [value, setValue] = useState("0");

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const updateValues = (newHours, newMinutes) => {
    setHours(newHours);
    setMinutes(newMinutes);
  };
  const [selectedDate, setSelectedDate] = useState(null);

  function handleDateSelection(date) {
    setSelectedDate(date);
  }
  async function submitReservation() {
    const guests = value;
    if (!selectedDate || !hours || !minutes || !guests || !restoId) {
      alert("dates hours mitutes guests  are required");
      return;
    }
    const dateR = selectedDate.toDateString();
    const sessionData = await AsyncStorage.getItem("session");
    if (sessionData) {
      const { userId } = JSON.parse(sessionData);

      if (userId) {
        alert(dateR);
        try {
          const response = await axios.post(
            `${API_URL}/newReservation?userId=${userId}&restoId=${restoId}`,
            { dateR, hours, minutes, guests }
          );
          return alert(
            "reservation effectuer le: " +
              response.data.date +
              " à " +
              response.data.time
          );
        } catch (error) {
          console.error(error + "reservation");
          throw new Error("Failed to create reservation.");
        }
      }
    }
  }

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Time updateValues={updateValues} onSelectDate={handleDateSelection} />

        <View style={styles.container}>
          <Text style={styles.label}>nombres de places </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={value}
            onChangeText={handleValueChange}
          />
        </View>

        <Text>
          Hours: {hours}, Minutes: {minutes}
        </Text>
        <Text>Selected date: {selectedDate?.toDateString()}</Text>
        <Button title="Reserver" onPress={submitReservation} />
      </Overlay>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  label: {
    marginRight: 16,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    width: 100,
  },
});
