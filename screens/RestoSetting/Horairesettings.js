import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Table, Row } from "react-native-table-component";
import { API_URL } from "../../utils/config";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

const OpeningHoursForm = ({ route }) => {
  const [openingHours, setOpeningHours] = useState([
    { day: "Monday", startTime: "", endTime: "" },
    { day: "Tuesday", startTime: "", endTime: "" },
    { day: "Wednesday", startTime: "", endTime: "" },
    { day: "Thursday", startTime: "", endTime: "" },
    { day: "Friday", startTime: "", endTime: "" },
    { day: "Saturday", startTime: "", endTime: "" },
    { day: "Sunday", startTime: "", endTime: "" },
  ]);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedFieldType, setSelectedFieldType] = useState(null);

  const showTimePicker = (index, fieldType) => {
    setSelectedDayIndex(index);
    setSelectedFieldType(fieldType);
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
    setSelectedDayIndex(null);
    setSelectedFieldType(null);
  };

  const handleTimeConfirm = (time) => {
    const updatedOpeningHours = [...openingHours];
    const selectedDay = updatedOpeningHours[selectedDayIndex];

    if (selectedFieldType === "startTime") {
      selectedDay.startTime = time.toLocaleTimeString("en-US", {
        timeStyle: "short",
      });
    } else if (selectedFieldType === "endTime") {
      selectedDay.endTime = time.toLocaleTimeString("en-US", {
        timeStyle: "short",
      });
    }

    setOpeningHours(updatedOpeningHours);
    hideTimePicker();
  };

  const handleSubmit = () => {
    const idR = route.params.idR;
    axios
      .post(`${API_URL}/updateHours?id=${idR}`, openingHours)
      .then((response) => {
        // Handle successful response
        console.log("Opening hours submitted successfully:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error submitting opening hours:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={["Day", "Start Time", "End Time"]}
          style={styles.tableHeader}
          textStyle={styles.tableHeaderText}
        />
        {openingHours.map((hour, index) => (
          <Row
            key={hour.day}
            data={[
              hour.day,
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={hour.startTime}
                  editable={false}
                />
                <Icon
                  name="clock-o"
                  size={20}
                  color="#000000"
                  onPress={() => showTimePicker(index, "startTime")}
                />
              </View>,
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={hour.endTime}
                  editable={false}
                />
                <Icon
                  name="clock-o"
                  size={20}
                  color="#000000"
                  onPress={() => showTimePicker(index, "endTime")}
                />
              </View>,
            ]}
            style={styles.tableRow}
            textStyle={styles.tableRowText}
          />
        ))}
      </Table>

      <TouchableOpacity
        style={[styles.submitBtn, styles.touchableOpacity]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Mise a jour</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "white",
  },

  tableBorder: {
    borderWidth: 1,
    borderColor: "grey",
  },
  tableHeader: {
    height: 40,
    backgroundColor: "#f1f8ff",
  },
  tableHeaderText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  tableRow: {
    height: 50,
  },
  tableRowText: {
    textAlign: "center",
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
  },
  submitBtn: {
    backgroundColor: "#000000",
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  touchableOpacity: {
    alignSelf: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OpeningHoursForm;
