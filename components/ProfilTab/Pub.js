import React from "react";
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { API_URL } from "../../utils/config";

const Pub = ({ Resto }) => {
  const renderPhotoItems = () => {
    const photos = Resto.photos.slice(0, 20);

    const rows = [];
    for (let i = 0; i < photos.length; i += 3) {
      const rowPhotos = photos.slice(i, i + 3);
      const row = (
        <View key={i} style={{ flexDirection: "row", marginBottom: 10 }}>
          {rowPhotos.map((photo, index) => (
            <TouchableOpacity
              key={index}
              style={{
                marginRight: 10,
              }}
            >
              <Image
                source={{
                  uri: `${API_URL}/${photo}`,
                }}
                style={{ width: 120, height: 120, borderRadius: 10 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      );
      rows.push(row);
    }

    return rows;
  };

  return (
    <View
      style={{
        minHeight: 300,
        padding: 10,
      }}
    >
      {renderPhotoItems()}
    </View>
  );
};

export default Pub;
