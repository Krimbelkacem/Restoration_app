import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TimePicker } from "react-native-paper-dates";

const daysOfWeek = [
  { name: "Monday", openingTime: null, closingTime: null },
  { name: "Tuesday", openingTime: null, closingTime: null },
  { name: "Wednesday", openingTime: null, closingTime: null },
  { name: "Thursday", openingTime: null, closingTime: null },
  { name: "Friday", openingTime: null, closingTime: null },
  { name: "Saturday", openingTime: null, closingTime: null },
  { name: "Sunday", openingTime: null, closingTime: null },
];

const Openninghours = () => {
  const [openingHours, setOpeningHours] = useState(daysOfWeek);

  const handleTimeChange = (newTime, dayOfWeek, timeType) => {
    const updatedOpeningHours = openingHours.map((day) => {
      if (day.name === dayOfWeek) {
        return {
          ...day,
          [timeType]: newTime,
        };
      } else {
        return day;
      }
    });
    setOpeningHours(updatedOpeningHours);
  };

  return (
    <ScrollView>
      {openingHours.map((day) => (
        <View key={day.name} style={styles.dayOfWeek}>
          <Text>{day.name}</Text>
          <View style={styles.timePickerRow}>
            <Text style={styles.timePickerLabel}>Opening Time:</Text>
            <TimePicker
              value={day.openingTime}
              onChange={(newTime) =>
                handleTimeChange(newTime, day.name, "openingTime")
              }
            />
          </View>
          <View style={styles.timePickerRow}>
            <Text style={styles.timePickerLabel}>Closing Time:</Text>
            <TimePicker
              value={day.closingTime}
              onChange={(newTime) =>
                handleTimeChange(newTime, day.name, "closingTime")
              }
              style={styles.timePicker}
              inputStyle={styles.input}
              labelStyle={styles.label}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dayOfWeek: {
    margin: 20,
    flexDirection: "column",
  },
  timePickerRow: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  timePickerLabel: {
    marginRight: 10,
  },
  timePicker: {
    width: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    width: 20,
  },
  label: {
    color: "#333",
    marginBottom: 5,
  },
});

export default Openninghours;
