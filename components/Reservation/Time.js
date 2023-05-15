import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { Button, Caption } from "react-native-paper";
import { TimePickerModal, DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Time(props) {
  const [visible, setVisible] = React.useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setHours(hours);
      setMinutes(minutes);
      props.updateValues(hours, minutes, selectedDate);
      setVisible(false);
      console.log({ hours, minutes });
    },
    [setVisible, setHours, setMinutes]
  );

  const [date, setDate] = React.useState(undefined);

  const [open, setOpen] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState(null);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setSelectedDate(params.date);
      props.onSelectDate(params.date);

      setOpen(false);
      setVisible(true);
    },
    [setOpen, setDate, setSelectedDate]
  );

  return (
    <View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          select date
        </Button>
        {/* <Button
          onPress={() => setVisible(true)}
          uppercase={false}
          mode="outlined"
        >
          Pick time
        </Button> */}
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        />

        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </View>

      <View>
        <Text>Selected date: {selectedDate?.toDateString()}</Text>
        <Text>
          Hours: {hours}, Minutes: {minutes}
        </Text>
      </View>
    </View>
  );
}
