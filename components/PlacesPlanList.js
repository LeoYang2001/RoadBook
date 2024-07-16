import React, { useEffect, useRef } from 'react'
import DaysFilter from './DaysFilter'
import { View, Text, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import { MapPin } from 'lucide-react-native'


const PlacesPlanList = ({
    contentHeight,
    roadBookItem,
    curDay,
    setCurDay,
    placesList,
    handleShowHeader
}) => {
    
    const scrollViewRef = useRef(null)
    
 
  return (
    <View style={{height: contentHeight}} className="bg-white  pt-5 pb-9 px-4 flex-col  ">
                <DaysFilter placesPlan={roadBookItem.placesPlan} curDay={curDay} setCurDay={setCurDay} incrementTripDays={()=>{}} ifFinishedEditing={true} />
                 <View className="flex-1 mt-4">
                    {
                      placesList && (
                        <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={{
                            height:placesList.length * 58
                        }}
                        onContentSizeChange={()=>{
                            if(scrollViewRef.current){
                                scrollViewRef.current.scrollToEnd({animated:true})
                            }
                        }}
                        >
                    {
                            placesList.map((place, index) => (
                                <View
                                key={`${place.place_id}-${index}`}
                                className="relative flex-row items-center "
                                style={{
                                    height:58
                                }}
                                >
                                    <>
                                        <View
                                        style={{
                                            paddingHorizontal: 14
                                        }} className=" flex-1 flex-col items-start  ">
                                            <View className="  flex-row flex justify-start  items-center  w-full  flex-1">
                                                    <View 
                                                        style={{
                                                            width:1,
                                                            borderLeftWidth:1,
                                                            height: 34,
                                                            left:7,
                                                            top:29,
                                                            borderColor:'#E4E8EF'
                                                        }}
                                                    />
                                                    <View style={{borderWidth:2, width:14, height:14, borderColor:'#FA541C', borderRadius:14, marginRight:12, marginTop:4}}/>
                                                    <Text className="font-semibold" style={{fontSize:18, color:'#38404D'}}>{place.main_text}</Text>
                                            </View>
                                            </View>
                                    </>
                                    </View>
                            ))
                            }
                            <View
                                className="relative flex-row items-center "
                                style={{
                                    height:58,
                                    marginBottom:30
                                }}
                                >
                                    <>
                                        <View
                                        style={{
                                            paddingHorizontal: 14,
                                        }} className=" flex-1 flex-col items-start ">
                                            <View className="  flex-row flex justify-start  items-center   flex-1">
                                                    <View style={{borderWidth:2, width:14, height:14, borderColor:'#FA541C', borderRadius:14, marginRight:12, marginTop:4}}/>
                                                    <TouchableOpacity
                                                        onPress={()=>{
                                                            handleShowHeader()
                                                        }}

                                                        style={{
                                                            height:44,
                                                            flex:1,
                                                            backgroundColor:"#F3F4F7",
                                                            borderRadius:12
                                                        }}
                                                        className="flex justify-center pl-4"
                                                    >
                                                        <Text
                                                            style={{
                                                                color:"#A8AFBC"
                                                            }}
                                                        >
                                                            为D{curDay}添加第{placesList.length + 1}个地点
                                                        </Text>
                                                    </TouchableOpacity>
                                            </View>
                                            </View>
                                    </>
                                    </View>
                    </ScrollView>
                      )
                    }
                 </View>
            </View>
  )
}

export default PlacesPlanList

