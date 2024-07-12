import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Plus } from 'lucide-react-native';
import DaysFilter from './DaysFilter';


const PlacesList = ({highLightTabId, handleAddingNewPlace, placePlanForCertainDay})=>{

    const [placesList, setPlacesList] = useState( placePlanForCertainDay ? placePlanForCertainDay : [] )

    useEffect(() => {
        setPlacesList(placePlanForCertainDay)
    }, [placePlanForCertainDay])
    

    return (
        <View className="" 
    >
        {
            placesList.map((place, place_id) => (
               <View
               key={place_id}
               className="relative   flex-row items-center"
               style={{height:72}} 
               >
                   <>
                   <View
                    style={{width:0, borderWidth:1 , height:26, borderColor:'#E4E8EF', left:20, top:59}}
                        className="absolute" />
                    <TouchableOpacity

                    style={{
                        padding:14
                    }} className=" flex-row items-center">
                        <View style={{borderWidth:2, width:14, height:14, borderColor:'#FA541C', borderRadius:14, marginRight:12}}></View>
                            <Text className="font-semibold" style={{fontSize:18, color:'#38404D'}}>{place.main_text}</Text>
                        </TouchableOpacity>
                   </>
                </View>
            ))
        }

        {/* last item will be displayed as a input box */}
        <View style={{
        padding:14
    }} className=" flex-row items-center ">
        <View style={{borderWidth:2, width:14, height:14, borderColor:'#FA541C', borderRadius:14, marginRight:12}}></View>
            <TouchableOpacity
            onPress={()=>{
                handleAddingNewPlace( day = highLightTabId )
            }}
            className="flex-row justify-start items-center px-5 flex-1"
            style={{backgroundColor:"#F3F4F7", borderRadius:12, height:44}}>
                <Text 
                style={{color:'#A8AFBC'}}
                >为D{highLightTabId}添加第{placesList.length + 1}个地点</Text>
            </TouchableOpacity>
        </View>
    </View>
    )

}

const PlacesPlanList = ({handleAddingNewPlace, placesPlan, curDay, setCurDay, incrementTripDays, handleCreatingRoadBook}) => {
  
  return (
    <View style={{gap:12}} className="bg-white shadow-md pt-5 pb-9 px-4 flex-col">
         
      <DaysFilter placesPlan={placesPlan} curDay={curDay} setCurDay={setCurDay} incrementTripDays={incrementTripDays} ifFinishedEditing={false} />
      <PlacesList placePlanForCertainDay={placesPlan[`day${curDay}`]} handleAddingNewPlace={handleAddingNewPlace} highLightTabId={curDay} />

      <TouchableOpacity
      onPress={handleCreatingRoadBook}
      className=" flex-row justify-center items-center" style={{height:50, borderRadius:8, backgroundColor:'#222833'}}>
        <Text style={{color:'#fff', fontSize:16}}>完成</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PlacesPlanList