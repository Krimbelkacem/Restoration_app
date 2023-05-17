import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import {
  SimpleLineIcons,
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { API_URL } from "../utils/config";
import axios from "axios";
export default FollowersList = ({ route }) => {
  const followers = route.params.followers;
  const idR = route.params.idR;
  alert(idR);
  //const [UserId, setUserId] = useState(null);
  const handleUnfollow = async (UserId) => {
    console.log(UserId);
    console.log(route.params.idR);
    try {
      const response = await axios.post(
        `${API_URL}/unfollow?idU=${UserId}&idR=${idR}  `
      );
      console.log(response.data);

      setVisible(false);
    } catch (error) {
      console.error(error);
      setVisible(false);
    }
  };
  callsData = [
    {
      id: 1,
      name: "Mark Doe",
      date: "12 jan",
      time: "11:14 am",
      video: false,
      image: "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    {
      id: 2,
      name: "Clark Man",
      date: "12 jul",
      time: "15:58 am",
      video: false,
      image: "https://bootdey.com/img/Content/avatar/avatar6.png",
    },
    {
      id: 3,
      name: "Jaden Boor",
      date: "12 aug",
      time: "12:45 am",
      video: true,
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      id: 4,
      name: "Srick Tree",
      date: "12 feb",
      time: "08:32 am",
      video: false,
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      id: 5,
      name: "John Doe",
      date: "12 oct",
      time: "07:45 am",
      video: true,
      image: "https://bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      id: 6,
      name: "John Doe",
      date: "12 jan",
      time: "09:54 am",
      video: false,
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      id: 8,
      name: "John Doe",
      date: "12 jul",
      time: "11:22 am",
      video: true,
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 9,
      name: "John Doe",
      date: "12 aug",
      time: "13:33 am",
      video: false,
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      id: 10,
      name: "John Doe",
      date: "12 oct",
      time: "11:58 am",
      video: true,
      image: "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    {
      id: 11,
      name: "John Doe",
      date: "12 jan",
      time: "09:28 am",
      video: false,
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 12,
      name: "John Doe",
      date: "12 jan",
      time: "09:28 am",
      video: false,
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 13,
      name: "John Doe",
      date: "12 jan",
      time: "09:28 am",
      video: false,
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 14,
      name: "John Doe",
      date: "12 jan",
      time: "09:28 am",
      video: false,
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
  ];

  const [calls, setCalls] = useState(callsData);

  const renderItem = ({ item }) => {
    var callIcon = "https://img.icons8.com/color/48/000000/phone.png";
    if (item.video == true) {
      callIcon = "https://img.icons8.com/color/48/000000/video-call.png";
    }
    return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">
                do you want to delete :: {item.username}
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={() => handleUnfollow(item._id)}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <TouchableOpacity>
          <View style={styles.row}>
            <Image
              source={{ uri: `${API_URL}/${item.picture}` }}
              style={styles.pic}
            />
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item.username}</Text>
              </View>
              <View style={styles.end}>
                <Image
                  style={[
                    styles.icon,
                    { marginLeft: 15, marginRight: 5, width: 14, height: 14 },
                  ]}
                  source={{
                    uri:
                      "https://img.icons8.com/small/14/000000/double-tick.png",
                  }}
                />
                <Text style={styles.time}>
                  {item.date} {item.time}
                </Text>
              </View>
            </View>
            <AntDesign
              name="deleteuser"
              size={28}
              color="red"
              style={{ marginRight: 50 }}
              onPress={showDialog}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const showDialog = () => setVisible(true);
  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <FlatList
          extraData={followers}
          data={followers}
          keyExtractor={(item) => {
            return item._id;
          }}
          renderItem={renderItem}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dcdcdc",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
  },
  end: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontWeight: "400",
    color: "#666",
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
});
