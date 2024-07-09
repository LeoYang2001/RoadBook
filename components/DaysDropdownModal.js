import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { provinces_cities } from '../constant';
import { refresh } from '@react-native-community/netinfo';

const DaysDropdownModal = ({toggleModal, handleSetTripDays}) => {

    const [days, setDays] = useState([1,2,3,4,5,6,7])
    const [selectedDay, setSelectedDay] = useState(days[0])

  return (
    <View className="flex-1 bg-white w-full shadow-md">
        <View className=" flex-row p-4 justify-between">
            <TouchableOpacity
                onPress={()=>{
                    toggleModal(false)
                }}
            >
                <Text style={{
                    fontSize:15,
                    color:"#ADB5C3"
                }}>取消</Text>
            </TouchableOpacity>
            <Text
            style={{
                fontSize:16,
                color:"#1D2129"
            }}
            >
                请选择天数 
            </Text>
            <TouchableOpacity
                onPress={()=>{
                    handleSetTripDays(selectedDay)
                    toggleModal(false)
                }}
            >
                <Text
                 style={{
                    fontSize:15,
                    color:"#FA541C"
                }}>确认</Text>
            </TouchableOpacity>
        </View>
       <View className="flex-1  ">
       <View className=" flex flex-row justify-between  relative ">
         <View
         style={{
            borderTopWidth:1,
            top:88,
            borderColor:"#E5E6EB"

         }}
         className="absolute top-0 z-50  w-full">
         </View>
         <View
         style={{
            borderTopWidth:1,
            top:131,
            borderColor:"#E5E6EB"
         }}
         className="absolute top-0 z-50  w-full">
         </View>
            <WheelPickerExpo
              height={220}
              width={220}
              initialSelectedIndex={0}
              items={days.map(name => ({ label: name, value: name }))}
              onChange={({ item }) => setSelectedDay(item.label)
            }
              renderItem={(item)=>{
                if(item.label === '') return
                return(
                    <View
                    style={{
                        height:44,
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center'
                    }}
                    className="w-full pl-10 flex items-center">
                      <Text
                     style={{
                         fontSize:16,
                         color:'#1D2129'
                     }}
                     >{item.label}</Text>
                     </View>
                )
              }}
              />
                <View className="flex-1  flex justify-center items-center">
                <Text
                     style={{
                         fontSize:16,
                         color:'#1D2129'
                     }}
                     >天</Text>
                </View>
            </View>
       </View>
    </View>
  )
}

export default DaysDropdownModal