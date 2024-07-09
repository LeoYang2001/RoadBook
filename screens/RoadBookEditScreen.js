import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeft, PencilLine, Share2 } from 'lucide-react-native'

const RoadBookEditScreen = ({navigation, route}) => {
    const {roadbookName, placesPlan} = route.params
  return (
    <View className=" flex-1 ">
        <View className="  flex flex-row justify-between items-center pt-16 px-4">
            <View className=" flex  flex-row items-center">
             <TouchableOpacity>
             <ChevronLeft  size={24} color={"#38404D"}/>
             </TouchableOpacity>
            <Text
             style={{
                fontSize:20,
                color:'#38404D'
             }}
             className="font-semibold"
            >
                {roadbookName}
            </Text>
            </View>
            {/* <View className=" flex  flex-row items-center">
                
                <Image
                style={{width:26, height:26}}
                source={require('../assets/edit.png')}
              />
              <Image
              style={{width:20, height:20}}
                source={require('../assets/Share.png')}
              />
            </View> */}
            <View className=" flex  flex-row items-center gap-4">
                <TouchableOpacity>
                    <PencilLine  size={24} color={"#38404D"}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Share2 size={24} color={"#38404D"}  />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default RoadBookEditScreen