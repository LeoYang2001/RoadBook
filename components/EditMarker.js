import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EditMarker = ({selectedMarkerId, placeItem }) => {
  return (
   <>
        <View
        className="flex justify-center items-center shadow-md"
        style={{width:24, height:24, borderRadius:24, backgroundColor:'#ffffff'}}>
                <View
                style={{width:14, height:14, borderRadius:14 , backgroundColor:'#FA541C'}}
                />
    </View>

   </>
  );
};



export default EditMarker;
