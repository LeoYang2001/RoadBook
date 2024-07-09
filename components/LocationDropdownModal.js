import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { provinces_cities } from '../constant';

const LocationDropdownModal = ({toggleModal,handleSetCity}) => {

    const [provinces, setProvinces] = useState(Object.keys(provinces_cities))
    const [selectedProvince, setSelectedProvince] = useState(provinces[0])
    const [cities, setCities] = useState(provinces_cities[selectedProvince])
    const [selectedCity, setSelectedCity] = useState(cities[0])

    const [ifRefresh, setIfRefresh] = useState(false)


    useEffect(() => {
      setCities(provinces_cities[selectedProvince])
      setIfRefresh(false)
        setTimeout(()=>{
        setIfRefresh(true)
        },1)
    }, [selectedProvince])
    
    

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
                请选择目的地
            </Text>
            <TouchableOpacity
                onPress={()=>{
                    handleSetCity(selectedCity)
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
              items={provinces.map(name => ({ label: name, value: name }))}
              onChange={({ item }) => {
                setSelectedProvince(item.label)
                setSelectedCity(cities[0])
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
              {
                ifRefresh ? (

                    <WheelPickerExpo
                   height={220}
                   width={220}
                   initialSelectedIndex={0}
                   items={cities.map(name => ({ label: name, value: name}))}
                   onChange={({ item }) => setSelectedCity(item.label)}
                   renderItem={(item)=>{
                       if(item.label.length === 0) return 
                       return(
                          <View
                          className="  w-full pr-10 flex items-center">
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
                ):(
                    
                   <View className="flex-1 ">
                    </View>
                )
              }
             
            </View>
       </View>
    </View>
  )
}

export default LocationDropdownModal