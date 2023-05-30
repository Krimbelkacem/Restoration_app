import React from "react";
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { API_URL } from "../../utils/config";

const Pub = ({ Resto }) => {
  const renderPhotoItems = () =>
    Resto.photos.slice(0, 9).map((photo, index) => (
      <TouchableOpacity
        key={index}
        style={{
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        <Image
          source={{
            uri: `${API_URL}/${photo}`,
          }}
          style={{ width: 120, height: 120, borderRadius: 10 }}
        />
      </TouchableOpacity>
    ));

  return (
    <ScrollView
      style={{
        minHeight: 300,
        padding: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {renderPhotoItems()}
    </ScrollView>
  );
};

export default Pub;
