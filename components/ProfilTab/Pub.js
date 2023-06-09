import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { API_URL } from "../../utils/config";

const Pub = ({ Resto }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const renderPhotoItems = () => {
    const photos = Resto?.photos?.slice(0, 20);

    const rows = [];
    for (let i = 0; i < photos.length; i += 3) {
      const rowPhotos = photos?.slice(i, i + 3);
      const row = (
        <View key={i} style={{ flexDirection: "row", marginBottom: 10 }}>
          {rowPhotos?.map((photo, index) => (
            <TouchableOpacity
              key={index}
              style={{
                marginRight: 10,
              }}
              onPress={() => setSelectedImage(photo)}
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

      {/* Modal to display the selected image */}
      <Modal visible={selectedImage !== null} transparent>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => setSelectedImage(null)}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: `${API_URL}/${selectedImage}`,
            }}
            style={{ width: "80%", height: "80%", resizeMode: "contain" }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Pub;
