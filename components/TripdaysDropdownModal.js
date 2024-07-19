import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { generateTripdaysList, tripDaysList } from '../utility';



const TripdaysDropdownModal = ({toggleModal,handleSetTripdays, init_tripDays}) => {

    const screenWidth = Dimensions.get('window').width;
    
    const [tripDays, setTripDays] = useState(init_tripDays)
  
    

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
                
            </Text>
            <TouchableOpacity
                onPress={()=>{
                    handleSetTripdays(tripDays)
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
              width={screenWidth}
              initialSelectedIndex={init_tripDays - 1}
              items={tripDaysList.map(tripDayItem => ({ label: tripDayItem.label, value: tripDayItem.tripDays }))}
              onChange={({ item }) => {
                setTripDays(item.value)
              }
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
                    className="w-full  flex items-center">
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
             
            </View>
       </View>
    </View>
  )
}

export default TripdaysDropdownModal