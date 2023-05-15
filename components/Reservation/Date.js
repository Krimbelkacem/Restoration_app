import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Date() {
  const [inputDate, setInputDate] = useState(undefined);
  const [datee, setdatee] = useState("");

  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <DatePickerInput
          locale="en"
          label="reservation"
          value={inputDate}
          onChange={(d) => {
            setInputDate(d), setdatee(d);
          }}
          inputMode="start"
        />
      </View>
    </SafeAreaProvider>
  );
}
