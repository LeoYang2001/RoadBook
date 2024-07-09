import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomMarker = ({selectedMarkerId, placeItem }) => {
    const ifFocus = selectedMarkerId === placeItem.place_id
  return (
   <>
   {
    ifFocus ? (
            <View
        className="flex justify-center items-center"
        style={{width:24, height:24, borderRadius:24, backgroundColor:'#fff'}}>
            <View className="flex relative justify-center  overflow-visible items-center" style={{width:20, height:20, borderRadius:20 , backgroundColor:'#222833'}}>
                <View
                style={{width:9.6, height:9.6, borderRadius:8 , backgroundColor:'#FA541C'}}
                />
        </View>
       
        </View>
    ):(
        <View
       
        className="flex justify-center items-center"
        style={{width:20, height:20, borderRadius:20, backgroundColor:'#DFDFDF'}}>
            <View className="flex justify-center  items-center" style={{width:16, height:16, borderRadius:16 , backgroundColor:'#222833'}}>
                <View
                style={{width:8, height:8, borderRadius:8 , backgroundColor:'#DFDFDF'}}
                />
        </View>
    </View>
    )
   }
   </>
  );
};



export default CustomMarker;
