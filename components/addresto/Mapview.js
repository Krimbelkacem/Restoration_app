import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App({navigation}) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);
 
    console.log(coordinate.latitude + '\n' + coordinate.longitude)
      // Retrieve the updated latitude and longitude values from state
    
  
     
      navigation.navigate( 'AddResto',{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
   
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onLongPress={handleLongPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '400%',
    height: '400%',
  },
});
