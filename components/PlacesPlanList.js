import React, { useEffect, useRef, useState } from 'react'
import DaysFilter from './DaysFilter'
import { View, Text, Image, TouchableOpacity, Pressable, ScrollView, TextInput } from 'react-native'
import DragAndSort from '../screens/DragAndSort'


const PlacesPlanList = ({
    contentHeight,
    roadBookItem,
    curDay,
    setCurDay,
    placesList,
    handleShowHeader,
    setIfDraging,
    handleUpdatePlacesPlan,
    setModalVisible,
    placesPlan
}) => {

  const [ifShowList, setIfShowList] = useState(true)

  useEffect(() => {
    setIfShowList(false)
    setTimeout(()=>{
    setIfShowList(true)

    },0)
  }, [curDay,placesPlan])
  
    
 
  return (
    <View style={{height: contentHeight}} className="bg-white  pt-5 pb-9 flex-col  ">
                <View className="px-4">
                <DaysFilter setModalVisible={setModalVisible} placesPlan={roadBookItem.placesPlan} curDay={curDay} setCurDay={setCurDay} openDaysIncrementModal={()=>{setModalVisible(true)}} ifFinishedEditing={false} />
                </View>
                 <View className="flex-1 mt-4">
                 {
                  ifShowList && (
                    <DragAndSort 
                    handleUpdatePlacesPlan={handleUpdatePlacesPlan}
                    setIfDraging={setIfDraging}
                    placesList={placesList}
                    curDay={curDay}
                    handleShowHeader={handleShowHeader}
                 />
                  )
                 }
                 </View>
    </View>
  )
}

export default PlacesPlanList
