import { View, Text ,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { List, Plus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';


const DaysFilter = ({placesPlan, curDay, setCurDay, openDaysIncrementModal, ifFinishedEditing}) => {

    const leftOffSet = useSharedValue( (curDay - 1) * 45);

    const handleChangeTab = (i) => {
        setCurDay(i+1)
        leftOffSet.value = withTiming( (i*45) , { duration: 200 })
    }
    const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: leftOffSet.value }],
        };
    });

  return (
    <View className={`flex-row ${ifFinishedEditing ? 'justify-center' : 'justify-between'} items-center `}>
        <View style={{backgroundColor:'#F3F4F7', padding:6, borderRadius:6 }} className="flex-row relative ">
            {/* TAB BAR  */}
            <Animated.View style={[animatedStyle,{width:41, height:25, top:6, left:6, borderRadius:4}]} className="bg-white absolute " />
        {
            Object.keys(placesPlan).map((_, i) => (
                <TouchableOpacity 
                onPress={()=>{
                    handleChangeTab(i)
                    Haptics.selectionAsync()
                }}
                style={{width:41, borderRadius:4, height:25, marginRight: i == 3 ? 0 : 4, 
                    backgroundColor: "transparent",
                    
                }}
                className=" flex justify-center items-center" key={i}>
                    <Text
                    className="font-semibold"
                    style={{
                        color: i == curDay - 1 ? '#4D5561' : "#ADB5C3",
                        fontSize:16
                    }}
                    >D{i+1}</Text>
                </TouchableOpacity>
            ))
        }
        </View>
       {
        !ifFinishedEditing && (
            <TouchableOpacity 
            onPress={()=>{
                openDaysIncrementModal()
            }}
            style={{
                width:51,
                height:37,
                borderRadius:6,
                backgroundColor:'#F3F4F7'
            }} 
            className="flex justify-center items-center ">
                <List size={23} color={'#4D5561'}  />
            </TouchableOpacity>
        )
       }
  </View>
  
  )
}

export default DaysFilter