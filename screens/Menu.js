import React, { useState, useEffect } from "react";
import Swiper from "react-native-swiper";
import randomcolor from "randomcolor";

import {
  Card,
  Text,
  Avatar,
  IconButton,
  List,
  Title,
  Paragraph,
} from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { API_URL } from "../utils/config";
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: randomcolor(),
    justifyContent: "center",
    alignItems: "center",
  },
});

class TitleText extends React.Component {
  render() {
    return (
      <Text style={{ fontSize: 48, color: "white" }}>{this.props.label}</Text>
    );
  }
}

const Menu = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const menu = route.params.menu;
  console.log(menu);

  useEffect(() => {
    setCategories(menu.categories);
  }, [navigation]);
  return (
    <ScrollView>
      <Swiper loop={false} showsPagination={false} index={1}>
        {categories.map((item) => (
          <View key={item._id} style={{ backgroundColor: "white" }}>
            <List.Item
              title={item.name}
              left={(props) => <List.Icon {...props} icon="folder" />}
            />
            {item.items.map((data) => (
              <Card>
                <Card.Content>
                  <Title>{data.name}</Title>
                  <Paragraph>{data.price} Da</Paragraph>
                  <Paragraph>{data.image} Da</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: `${API_URL}/${data.image}` }} />
                <Card.Actions></Card.Actions>
              </Card>
            ))}
          </View>
        ))}
      </Swiper>

      {/*
      <Swiper loop={false} showsPagination={false} index={1}>
        <View style={styles.viewStyle}>
          <TitleText label="Left" />
        </View>

        <View style={styles.viewStyle}>
          <TitleText label="Right" />
        </View>
      </Swiper>*/}
    </ScrollView>
  );
};

export default Menu;
