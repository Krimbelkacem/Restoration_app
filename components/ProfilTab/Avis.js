import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutRight,
  Layout,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { API_URL } from "../../utils/config";
import axios from "axios";
export default function Avis({ idR, idU, display }) {
  // Function to add a comment to a restaurant's profile
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_URL}/getcomments?idR=${idR}`);
      setComments(response.data);
      console.log(response.data);
      setIsVisible(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [idU]);

  const addCommentToRestaurant = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/addcomments?idR=${idR}&userId=${idU}`,

        {
          comment: comment,
        }
      );

      console.log("Comment added successfully!", response.data);

      // Rechargez les commentaires après avoir ajouté un commentaire
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);

      // Handle error state or display error message
    }
  };

  const text = "Youwhich";
  const { width, height } = Dimensions.get("window");

  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 18,
            marginTop: 5,
            color: "#686869",
          }}
        >
          commentaires
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1, padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {comments?.map((item) => (
          <Animated.View
            key={item.id}
            style={{
              backgroundColor: "black",
              padding: 20,
              borderRadius: 20,
              marginBottom: 20,
            }}
            layout={Layout}
            entering={FadeInRight.delay(300).duration(300)}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: `${API_URL}/${item?.user?.picture}` }}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "grey",
                  borderRadius: 25,
                  marginRight: 20,
                }}
              />
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  {item?.user?.username}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 12,
                    color: "white",
                    marginTop: -5,
                  }}
                >
                  {item.date}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 15,
                color: "white",
                marginTop: 10,
              }}
            >
              {item.comment}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 5,
              }}
            ></View>
          </Animated.View>
        ))}
      </ScrollView>
      {display ? (
        <Text></Text>
      ) : (
        <View>
          {idU ? (
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,

                bottom: 50,
                left: width / 2 - 30,
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setIsVisible(true)}
            >
              <MaterialCommunityIcons name="plus" size={50} color="#FFF" />
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
      )}

      <Modal
        style={{ flex: 1 }}
        visible={isVisible}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}
        animationType={"fade"}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <View
            style={{
              height: 300,
              backgroundColor: "white",
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingHorizontal: 25,
              paddingVertical: 25,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                value={comment}
                onChangeText={(text) => setComment(text)}
                placeholder="commentaire"
                placeholderTextColor={"black"}
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Medium",
                  color: "black",
                }}
                multiline={true}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
                padding: 12,
                borderRadius: 20,
              }}
              onPress={addCommentToRestaurant}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 14,
                  color: "#FFF",
                }}
              >
                commenter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
