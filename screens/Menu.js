/*import React, { useState, useEffect } from "react";
import Swiper from "react-native-swiper";
import randomcolor from "randomcolor";
//import { Tab } from 'react-native-elements';
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
import { TabView, Tab } from 'react-native-elements';
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


const Menu = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const menu = route.params.menu;
  console.log(menu);

  useEffect(() => {
    setCategories(menu.categories);
  }, [navigation]);


  const [index, setIndex] = useState(0); // Initialize the 'index' variable using the 'useState' hook

  return (
  
      <Swiper loop={false} showsPagination={false} index={index}>
        {categories.map((item) => (
          <View key={item._id} style={{ backgroundColor: "white" }}>
            <List.Item
              title={item.name}
              left={(props) => <List.Icon {...props} icon="folder" />}
            />
               <ScrollView>
            {item.items.map((data) => (
              <Card key={data._id}>
                <Card.Content>
                  <Title>{data.name}</Title>
                  <Paragraph>{data.price} Da</Paragraph>
                  <Paragraph>{data.image} Da</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: `${API_URL}/${data.image}` }} />
                <Card.Actions></Card.Actions>
              </Card>
            ))}</ScrollView>
          </View>
        ))}
      </Swiper>
   
     /* <Swiper loop={false} showsPagination={false} index={1}>
        <View style={styles.viewStyle}>
          <TitleText label="Left" />
        </View>

        <View style={styles.viewStyle}>
          <TitleText label="Right" />
        </View>
      </Swiper>*/
  
 /* );
};

export default Menu;
*/
import React, { useState, useEffect } from "react";
import Swiper from "react-native-swiper";
import randomcolor from "randomcolor";
import { Card, Title, Paragraph, List } from "react-native-paper";
import { View, ScrollView } from "react-native";
import { API_URL } from "../utils/config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Menu = ({ navigation, route }) => {
  const [categories, setCategories] = useState([]);
  const menu = route.params.menu;
  console.log(menu);

  useEffect(() => {
    setCategories(menu.categories);
  }, [menu]);

  const [index, setIndex] = useState(0);

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {categories.map((_, i) => (
        <View
          key={i}
          style={[
            styles.paginationDot,
            i === index && styles.paginationActiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsPagination={false}
        index={index}
        onIndexChanged={setIndex}
        paginationStyle={styles.paginationStyle}
        dot={<View style={styles.paginationDot} />}
        activeDot={<View style={styles.paginationActiveDot} />}
      >
        {categories.map((item) => (
          <View  key={item._id}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
             <List.Item
                title={item.name}
                right={(props) => [                  <Icon {...props} name="chevron-left" size={24} />,
                  <Icon {...props} name="chevron-right" size={24} />
                ]}
              />
          <ScrollView
           
          >
            <View style={styles.categoryContainer}>
             
              {item.items.map((data) => (
                <Card key={data._id}>
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
          </ScrollView>
          </View>
        ))}
      </Swiper>
      {renderPagination()}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  categoryContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  paginationActiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#555",
    marginHorizontal: 5,
  },
};

export default Menu;

