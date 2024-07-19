import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { EllipsisVertical } from 'lucide-react-native'
import * as Haptics from 'expo-haptics';
import { formatDate } from '../utility';


const RoadBook = ({roadBookItem, handleRoadBookEdit, handleRoadBookDelete}) => {

 

  const placesPlan = roadBookItem.placesPlan

  const days = Object.keys(placesPlan).length

  const [placesCount, setPlacesCount] = useState(0)

  const createdAt = formatDate(roadBookItem.createdAt)

  useEffect(() => {
    setPlacesCount(0)
    for(let dayth in placesPlan)
    {
      setPlacesCount(prev => prev + placesPlan[dayth].length)
    }
  }, [placesPlan])
  

  return (
    <TouchableOpacity 
    onPress={()=>{
      Haptics.selectionAsync()
      handleRoadBookEdit(roadBookItem)
    }}
    className="bg-white mb-4  shadow-sm flex-row items-center " style={{height:104, borderRadius:12, padding:12}}>
       <View  style={{width:80, height:80, borderRadius:12}}>
       <Image
                source={require('../assets/RoadBookMapPic.png')}
        />
       </View>
       <View style={{paddingVertical:2}} className=" flex h-full flex-col ml-3 justify-start">
        <Text style={{fontSize:16, color:'#4D5561'}} className=" font-semibold">
            {roadBookItem.name}
        </Text>
        <Text style={{fontSize:12, color:'#ADB5C3'}} className="mt-2">
            {days}天 | {placesCount}个活动点
        </Text>
        <Text style={{fontSize:12, color:'#ADB5C3'}} className="mt-auto">
           {createdAt}
        </Text>
       </View>
       <TouchableOpacity 

       onPress={()=>{
        handleRoadBookDelete(roadBookItem)
       }}
       className="ml-auto">
       <EllipsisVertical  color={'#ADB5C3'} />
       </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default RoadBook