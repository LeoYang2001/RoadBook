import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Slider from '@react-native-community/slider';
import { Diamond } from 'lucide-react-native';
import { travelStyleList } from '../constant';





const TravelStyleSlider = ({
    travelStyle,
    setTravelStyle,
  toggleModal
}) => {

  return (
    <View
        style={{
            height:230
        }}
        className="shadow-md bg-white"
    >
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
        <View className="flex-1  justify-center items-center">
            <View className=" absolute flex-row justify-between " 
                    style={{
                        width:282,
                        transform:[{translateY: -55}]
                    }}
                >
                    
                     {[0, 1, 2, 3].map((dot, index) => {

                        const ifFirst = dot === 0
                        const ifLast = dot === 3
                        let leftOffSet = 82

                        let alignItemsVal = 'center'
                        if(ifFirst) alignItemsVal = 'start'
                        if(ifLast) alignItemsVal = 'start'

                        return (
                            <View
                            key={index}
                            style={{
                                width:24,
                                height:24,
                                backgroundColor:"transparent",
                                alignItems:alignItemsVal,
                                transform:[{translateX:ifLast ? -154 : 0}]
                            }}
                            className="rounded-full flex  justify-center "
                            >
                                <View 
                                style={{
                                    width:178,
                                    height:36,
                                    backgroundColor: travelStyle >= dot ? '#38404D' : '#E5E6EB',
                                    opacity: travelStyle === dot ? 1 : 0,
                                    borderRadius:4
                                }}
                                className="flex-row justify-center items-center"
                                >
                                    <Text
                                        style={{
                                            color:"#fff",
                                            fontSize:12
                                        }}
                                    >
                                        {travelStyleList[dot]}
                                    </Text>
                                    {
                                        ifFirst && (
                                            <View
                                        className="absolute"
                                        style={{
                                            width:16,
                                            height:16,
                                            backgroundColor:'transparent',
                                            left:5,
                                            top:27,
                                            transform: [{ rotateZ: '90deg' }]
                                        }}
                                    >
                                        <Diamond size={16}  fill={"#38404D"} color={"#38404D"}/>
                                    </View>
                                        )
                                    }
                                    {
                                        ifLast && (
                                            <View
                                        className="absolute"
                                        style={{
                                            width:16,
                                            height:16,
                                            backgroundColor:'transparent',
                                            right:5,
                                            top:27,
                                            transform: [{ rotateZ: '90deg' }]
                                        }}
                                    >
                                        <Diamond size={16}  fill={"#38404D"} color={"#38404D"}/>
                                    </View>
                                        )
                                    }
                                    {
                                        !ifFirst && !ifLast &&(
                                            <View
                                        className="absolute"
                                        style={{
                                            width:16,
                                            height:16,
                                            backgroundColor:'transparent',
                                            left:leftOffSet,
                                            top:27,
                                            transform: [{ rotateZ: '90deg' }]
                                        }}
                                    >
                                            <Diamond size={16}  fill={"#38404D"} color={"#38404D"}/>
                                        </View>
                                        )
                                    }


                                </View>
                            </View>
                        )
                     })}
                </View>
                <Slider
                    style={{width: 288, height: 40,zIndex:10}}
                    step={1}
                    minimumValue={0}
                    maximumValue={3}
                    minimumTrackTintColor="#38404D"
                    maximumTrackTintColor="#E5E6EB"
                    tapToSeek={true}
                    value={travelStyle}
                    onValueChange={value => setTravelStyle(value)}
                />
                <View className=" absolute flex-row justify-between " 
                    style={{
                        width:274,
                        transform:[{translateY: 28}]
                    }}
                >
                    <Text
                        style={{
                            color:"#86909C"
                        }}
                    >低</Text>
                    <Text
                    style={{
                        color:"#86909C"
                    }}
                    >高</Text>
                </View>
        </View>
    </View>
  )
}

export default TravelStyleSlider