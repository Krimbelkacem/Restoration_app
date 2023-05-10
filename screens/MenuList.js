import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import DropDownItem from "react-native-drop-down-item";
import chef from "../assets/chef.png";
import batiment from "../assets/batiment.png";
import MyTabs from "../components/ProfilTab/MyTab";

const contents = [
  {
    title: "Title 1",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Title 2",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Title 3",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const MyDropDown = ({ navigation, route }) => {
  const [contentVisibility, setContentVisibility] = useState(
    Array(contents.length).fill(false)
  );

  const toggleContentVisibility = (index) => {
    const visibilityArray = [...contentVisibility];
    visibilityArray[index] = !visibilityArray[index];
    setContentVisibility(visibilityArray);
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <ScrollView style={{ alignSelf: "stretch" }}>
        {contents.map((content, index) => (
          <DropDownItem
            key={index}
            style={{ marginVertical: 10 }}
            contentVisible={contentVisibility[index]}
            invisibleImage={batiment}
            visibleImage={chef}
            header={
              <View>
                <Text style={{ fontSize: 16, color: "blue" }}>
                  {content.title}
                </Text>
              </View>
            }
            onPress={() => toggleContentVisibility(index)}
          >
            <Text style={{ fontSize: 20 }}>{content.body}</Text>
          </DropDownItem>
        ))}
        <View style={{ height: 96 }} />

        <MyTabs />
      </ScrollView>
    </View>
  );
};

export default MyDropDown;
