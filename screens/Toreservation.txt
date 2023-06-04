import React, { useState } from "react";

import FadeIn from "./day001/components/FadeIn";
import {
  TextInput,
  StyleSheet,
  label,
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";

import Time from "../components/Reservation/Time";
import { API_URL } from "../utils/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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

const ToReservation = ({ route }) => {
  const restoId = route.params.restoId;
  const owner = route.params.owner;
  alert(restoId);

  /*
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
  }*/
  const socket = io(`${API_URL}`);
  const handleSendNotification = (userId) => {
    console.log(owner);
    console.log(userId);
    const notification = {
      senderId: userId, // ID de l'expéditeur
      receiverId: owner, // Remplacez par l'ID du destinataire
      message: "new demande reservation",
    };
    // Send a notification to the server
    console.log("Send a notification to the server");
    socket.emit("notification", notification);
  };

  async function handlesubmit() {
    const guests = selectedNumber;
    console.log("reservation a commencer");
    if (!selectedDay || !selectedTime || !selectedNumber || !restoId) {
      alert("dates selectedTime mitutes guests  are required");
      return;
    }
    const dateR = selectedDay.toString();
    console.log(dateR);
    const sessionData = await AsyncStorage.getItem("session");
    if (sessionData) {
      const { userId } = JSON.parse(sessionData);

      if (userId) {
        alert(dateR);
        try {
          const response = await axios.post(
            `${API_URL}/newReservation?userId=${userId}&restoId=${restoId}`,
            { dateR, selectedTime, guests }
          );
          if (response) {
            handleSendNotification(userId);
          }
          return alert(
            "reservation effectuer le: " +
              response.data.date +
              " à " +
              response.data.time
          );
        } catch (error) {
          console.error(error);
          throw new Error("Failed to create reservation.");
        }
      }
    }
  }
  const currentDate = new Date().toISOString().split("T")[0];
  const [selectedDay, setSelectedDay] = React.useState(currentDate);
  const [isTimePickerVisible, setTimePickerVisible] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [reservationNumber, setReservationNumber] = React.useState("");

  const handleDayPress = (day) => {
    if (day.dateString >= currentDate) {
      setSelectedDay(day.dateString);
    }
  };
  ///////////////////////////////////////////

  const [selectedNumber, setSelectedNumber] = React.useState(null);

  const numbers = Array.from({ length: 20 }, (_, index) => index + 1);

  const handleNumberSelect = (number) => {
    setSelectedNumber(number);
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",

        marginHorizontal: 5,
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: selectedNumber === item ? "black" : "#000",

        backgroundColor: selectedNumber === item ? "black" : "#fff",
      }}
      onTouchEnd={() => handleNumberSelect(item)}
    >
      <Text
        style={{
          color: selectedNumber === item ? "#fff" : "#000",
          fontSize: 16,
        }}
      >
        {item}
      </Text>
    </View>
  );

  ////////////////////////////////////////////////

  const times = Array.from({ length: (23 - 11) * 4 + 2 }, (_, index) => {
    const hour = Math.floor(index / 4) + 11;
    const minute = (index % 4) * 15;
    const time = new Date();
    time.setHours(hour);
    time.setMinutes(minute);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  });
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const renderItemed = ({ item }) => (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: selectedTime === item ? "black" : "#000",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        borderWidth: 1,

        backgroundColor: selectedTime === item ? "black" : "#fff",
      }}
      onTouchEnd={() => handleTimeSelect(item)}
    >
      <Text
        style={{
          color: selectedTime === item ? "#fff" : "#000",
          fontSize: 16,
        }}
      >
        {item}
      </Text>
    </View>
  );

  ////////////////////////////////////////////////

  const markedDates = {
    [selectedDay]: { selected: true, selectedColor: "black" },
  };
  const customStyle = {
    container: {
      backgroundColor: "white",
    },
    textSectionTitleColor: {
      fontWeight: "bold",
    },
    selectedDayTextColor: "white",
    todayTextColor: "black",
    dayTextColor: "black",
    textDisabledColor: "gray",
    dotColor: "black",
    selectedDotColor: "black",
    arrowColor: "black",
    monthTextColor: "black",
    indicatorColor: "black",
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "300",
  };

  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      <View style={{ padding: 20, marginTop: 20 }}>
        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
          nombres de personnes
        </Text>

        <View style={{ justifyContent: "center" }}>
          <FlatList
            data={numbers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>Dates</Text>
        <Calendar
          initialDate={selectedDay}
          onDayPress={handleDayPress}
          markingType="custom"
          markedDates={markedDates}
          theme={customStyle}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "#ffffff", padding: 20 }}>
        <View>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
            Heures
          </Text>
          <View style={{ justifyContent: "center", marginVertical: 20 }}>
            <FlatList
              data={times}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={renderItemed}
            />
          </View>
        </View>

        <FadeIn delay={900}>
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
              Reservation :
            </Text>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Medium",
                  color: "#3e3e3e",
                }}
              >
                nombres de personnes : {selectedNumber}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Medium",
                  color: "#3e3e3e",
                }}
              >
                {selectedDay}
                {selectedTime !== null && <Text>, {selectedTime}</Text>}
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            ></View>
          </View>
        </FadeIn>
        <FadeIn delay={1200}>
          <TouchableOpacity
            style={{
              width: 250,
              backgroundColor: "#313131",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              alignSelf: "center",
              marginTop: 10,
            }}
            onPress={handlesubmit}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                color: "#FFF",
              }}
            >
              Reserver
            </Text>
          </TouchableOpacity>
        </FadeIn>
      </View>
    </ScrollView>
  );
};

export default ToReservation;
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
