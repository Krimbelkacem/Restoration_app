
import React, { useState, useContext } from "react";
import {
     TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
//import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, ButtonGroup, withTheme } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import { Input } from "@ui-kitten/components";
import {
  EvilIcons,
  AntDesign,
  Octicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import axios from "axios";

import { API_URL } from "../../utils/config";

import FadeIn from './components/FadeIn';
import { FontAwesome5 } from '@expo/vector-icons';


const LoginScreen = ({navigation}) => {

    const [userEmail, setuserEmail] = useState("");
    const [userPasse, setuserPasse] = useState("");
  
    async function submit() {
      if (!userEmail || !userPasse) {
        alert("email and password are required");
        return;
      } else {
        const data = {
          email: userEmail,
          password: userPasse,
        };
        console.log(data.password);
        try {
          const res = await axios.post(`${API_URL}/login`, data);
  if(res){  const token = res.data.token;
    const idU = res.data.idU;
  

    await AsyncStorage.setItem(
      "session",
      JSON.stringify({ userId: idU, token: token })
    );
    // await AsyncStorage.setItem("token", "token");
    navigation.navigate("Bottomnav", { token: token });}
        
        } catch (error) {
          console.error(error);
  
          if (error.response && error.response.status === 400) {
            alert("Invalid email or password");
          } else {
            alert("An error occurred. Please try again later.");
          }
        }
      }
    }
  


    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: 'white', alignItems: 'center' }}>

        <FadeIn delay={300}>
            <Text style={{  fontSize: 30, color: '#353045', textAlign: 'center', marginTop: 40 }}>{`Hello!`}</Text>
            <Text style={{fontSize: 20, color: '#353045', textAlign: 'center', }}>{`Create an account!`}</Text>
        </FadeIn>

        <FadeIn delay={500}>
            <View style={{ width: 350, marginTop: 50 }}>
                <TextInput           onChangeText={(userEmail) => setuserEmail(userEmail)}
          placeholder="email"
          leftIcon={<Icon name="email" size={24} color="black" />} placeholderTextColor={'#bdb8c0'} fontSize={16} style={{paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#f8f6f9', borderRadius: 10 }} />
                <View>
                    <TextInput   placeholder="Password"
          secureTextEntry={true}
          onChangeText={(userPasse) => setuserPasse(userPasse)}  placeholderTextColor={'#bdb8c0'} fontSize={16} style={{paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#f8f6f9', borderRadius: 10, marginTop: 10 }} />
                    <FontAwesome5 name="eye-slash" size={24} color={'#bdb8c0'} style={{ position: 'absolute', right: 10, top: 25 }} />
                </View>
            </View>


            <TouchableOpacity     onPress={submit} style={{ backgroundColor: 'black', width: 350, borderRadius: 10, marginTop: 50, paddingVertical: 15 }}>
                <Text style={{fontSize: 20, color: '#FFF', textAlign: 'center', }}>Se Connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigation.navigate('SignUpScreen')}>
                <Text style={{fontSize: 16, color: '#353045', textAlign: 'center', marginTop: 25 }}>{`Already have an account?`}</Text>
            </TouchableOpacity>
        </FadeIn>


        <FadeIn delay={800}>
            <View style={{ flexDirection: 'row', width: 350, justifyContent: 'space-evenly', marginTop: 100 }}>

                <TouchableOpacity style={{ width: 80, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1e4ee', borderRadius: 10, borderWidth: 1, borderColor: '#FFF' }}>
                    <FontAwesome5 name={'facebook'} size={24} color={'#353045'} />
                </TouchableOpacity>

            
                <TouchableOpacity  style={{ width: 80, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1e4ee', borderRadius: 10, borderWidth: 1, borderColor: '#FFF' }}>
                    <FontAwesome5 name={'google'} size={24} color={'#353045'} />
                </TouchableOpacity>
            </View>
        </FadeIn>

    </View>
    );
}

export default LoginScreen ;