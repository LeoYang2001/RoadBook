import React from 'react'
import DaysFilter from './DaysFilter'
import { View, Text, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import { MapPin } from 'lucide-react-native'


const PlacesDetailEdit = ({
    contentHeight,
    roadBookItem,
    curDay,
    setCurDay,
    placesList
}) => {

  console.log({
    contentHeight,
    roadBookItem,
    curDay,
    setCurDay,
    placesList
})
    
  return (
    <View style={{height: contentHeight, gap:12}} className="bg-white  pt-5 pb-9 px-4 flex-col  ">
                <DaysFilter placesPlan={roadBookItem.placesPlan} curDay={curDay} setCurDay={setCurDay} incrementTripDays={()=>{}} ifFinishedEditing={true} />
                 <View className="flex-1 ">
                    {
                      placesList && (
                        <ScrollView>
                    {
                   placesList.map((place, index) => (
                    <View
                    key={place.place_id}
                    className="relative flex-row items-center "
                    >
                        <>
                            <View
                            style={{
                                paddingHorizontal: 14
                            }} className=" flex-1 flex-col items-start ">
                                   <View className="  flex-row flex justify-start  flex-1">
                                        <View style={{borderWidth:2, width:14, height:14, borderColor:'#FA541C', borderRadius:14, marginRight:12, marginTop:4}}/>
                                        <Text className="font-semibold" style={{fontSize:18, color:'#38404D'}}>{place.main_text}</Text>
                                   </View>
                                   <View style={{
                                    marginLeft: 7,
                                    borderLeftWidth: index === placesList.length - 1 ? 0 : 1 ,
                                    paddingLeft:20,
                                    borderColor:'#E4E8EF'
                                   }} className=" flex-row items-center  w-full  py-4  ">
                                        <MapPin size={16} color={'#7C8697'} style={{
                                            marginTop:5,
                                            marginRight:2
                                        }}  />
                                        <Text 
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        className=" mt-2" style={{fontSize:14, color:'#7C8697'}}>{place.detailed_name}</Text>
                                   </View>
                                </View>
                        </>
                        </View>
                ))
                }
                    </ScrollView>
                      )
                    }
                 </View>
            </View>
  )
}

export default PlacesDetailEdit

