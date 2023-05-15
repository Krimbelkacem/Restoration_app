import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { API_URL } from "../../utils/config";

const { width, height } = Dimensions.get("window");

const RestoCarousel = ({ photos }) => {
  const newImage = photos; //[lion, fox, cat, background, element];
  const image = (index) => ({ image: newImage[index % newImage.length] });
  const items = Array.from(Array(5)).map((_, index) => image(index));

  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={5}
      // autoplayInterval={1000000}
      index={3}
      autoplayLoop
      data={items}
      renderItem={({ item }) => (
        <Image
          style={styles.image}
          source={{
            uri: `${API_URL}/${item.image}`,
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.4,
    width,
  },
});

export default RestoCarousel;
