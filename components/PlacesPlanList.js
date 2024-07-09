import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Plus } from 'lucide-react-native';


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
    <View style={{gap:12}} className="bg-white shadow-md pt-5 pb-9 px-4 flex-col">
      <View className="flex-row justify-between items-center ">
        <View style={{backgroundColor:'#F3F4F7', padding:6, borderRadius:6 }} className="flex-row relative ">
            {/* TAB BAR  */}
            <Animated.View style={[animatedStyle,{width:41, height:25, top:6, left:6, borderRadius:4}]} className="bg-white absolute " />
           {
             Object.keys(placesPlan).map((_, i) => (
                <TouchableOpacity 
                onPress={()=>{
                    handleChangeTab(i)
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
        <TouchableOpacity 
        onPress={()=>{
            incrementTripDays()
        }}
        style={{
            width:40,
            height:27,
            borderRadius:6,
            backgroundColor:'#F3F4F7'
        }} 
        className="flex justify-center items-center ">
            <Plus size={20} color={'#ADB5C3'} />
        </TouchableOpacity>
      </View>
      
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