import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Button } from "react-native-elements";

const OpeningHoursForm = () => {
  const [openingHours, setOpeningHours] = useState([
    ["Monday", "", ""],
    ["Tuesday", "", ""],
    ["Wednesday", "", ""],
    ["Thursday", "", ""],
    ["Friday", "", ""],
    ["Saturday", "", ""],
    ["Sunday", "", ""],
  ]);

  const updateOpeningHour = (rowIndex, columnIndex, value) => {
    const updatedOpeningHours = [...openingHours];
    updatedOpeningHours[rowIndex][columnIndex] = value;
    setOpeningHours(updatedOpeningHours);
  };

  const handleSubmit = () => {
    // Submit the openingHours data to your server using Node.js backend
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={["Day", "Start Time", "End Time"]}
          style={styles.tableHeader}
          textStyle={styles.tableHeaderText}
        />
        <Rows
          data={openingHours}
          style={styles.tableRow}
          textStyle={styles.tableRowText}
          onChangeText={(text, rowIndex, columnIndex) =>
            updateOpeningHour(rowIndex, columnIndex, text)
          }
        />
      </Table>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#000000",
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
    height: 40,
  },
  tableRowText: {
    textAlign: "center",
  },
});

export default OpeningHoursForm;
