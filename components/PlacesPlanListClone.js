import React, { useEffect, useRef, useState } from 'react'
import DaysFilter from './DaysFilter'
import { View, Text, Image, TouchableOpacity, Pressable, ScrollView, TextInput } from 'react-native'
import DragAndSort from '../screens/DragAndSort'


const PlacesPlanListClone = ({
    contentHeight,
    roadBookItem,
    curDay,
    setCurDay,
    placesList,
    handleShowHeader,
    setIfDraging
}) => {
    
 
  return (
    <View style={{height: contentHeight}} className="bg-white  pt-5 pb-9 flex-col  ">
                <DaysFilter placesPlan={roadBookItem.placesPlan} curDay={curDay} setCurDay={setCurDay} incrementTripDays={()=>{}} ifFinishedEditing={true} />
                 <View className="flex-1 mt-4">
                 <DragAndSort 
                    setIfDraging={setIfDraging}
                    placesList={placesList}
                    curDay={curDay}
                    handleShowHeader={handleShowHeader}
                 />
                 </View>
    </View>
  )
}

export default PlacesPlanListClone
