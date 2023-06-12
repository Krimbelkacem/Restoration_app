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
const FollowersList = ({ route }) => {
  const followers = route.params.followers;
  const idR = route.params.idR;
  const display = route.params.display;

  //const [UserId, setUserId] = useState(null);
  const handleUnfollow = async (UserId) => {
    alert(UserId);
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

  const renderItem = ({ item }) => {
    return (
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">
                voulez vous vraiment suprimer {item.username}
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>annuler</Button>
              <Button onPress={() => handleUnfollow(item._id)}>oui</Button>
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
                <Text style={styles.time}>
                  {item.date} {item.time}
                </Text>
              </View>
            </View>
            {display ? (
              <AntDesign
                name="deleteuser"
                size={28}
                color="red"
                style={{ marginRight: 50 }}
                onPress={showDialog}
              />
            ) : (
              <Text />
            )}
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
export default FollowersList;
