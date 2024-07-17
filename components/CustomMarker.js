import { MapPin } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CustomMarker = ({selectedMarkerId, placeItem, index }) => {
    // const ifFocus = selectedMarkerId === placeItem.place_id
  return (
   <View
    className=" overflow-visible relative"
   >
     {/* <Image style={{
        width:22,
        height:22
     }} source={require('../assets/Marker.png')} /> */}
     <MapPin fill={"#F9541C"} size={34} color={"#F9541C"}/>
     <View style={{
        width:18,
        height:18,
        left:'50%',
        transform:[{translateX: -9}],
        top:5,
     }} className="bg-white absolute   rounded-full flex justify-center items-center" >
            <Text
                className="font-semibold"
                style={{
                    color:"#FA541C"
                }}
            >{index+1}</Text>
        </View>
   </View>
  );
};



export default CustomMarker;

// {
//     ifFocus ? (
//             <View
//         className="flex justify-center items-center"
//         style={{width:24, height:24, borderRadius:24, backgroundColor:'#fff'}}>
//             <View className="flex relative justify-center  overflow-visible items-center" style={{width:20, height:20, borderRadius:20 , backgroundColor:'#222833'}}>
//                 <View
//                 style={{width:9.6, height:9.6, borderRadius:8 , backgroundColor:'#FA541C'}}
//                 />
//         </View>
       
//         </View>
//     ):(
//         <View
       
//         className="flex justify-center items-center"
//         style={{width:20, height:20, borderRadius:20, backgroundColor:'#DFDFDF'}}>
//             <View className="flex justify-center  items-center" style={{width:16, height:16, borderRadius:16 , backgroundColor:'#222833'}}>
//                 <View
//                 style={{width:8, height:8, borderRadius:8 , backgroundColor:'#DFDFDF'}}
//                 />
//         </View>
//     </View>
//     )
//    }