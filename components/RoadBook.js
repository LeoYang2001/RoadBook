import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { EllipsisVertical } from 'lucide-react-native'

const RoadBook = () => {
  return (
    <TouchableOpacity  className="bg-white mb-4  shadow-sm flex-row items-center " style={{height:104, borderRadius:12, padding:12}}>
       <View  style={{width:80, height:80, borderRadius:12}}>
       <Image
                source={require('../assets/RoadBookMapPic.png')}
        />
       </View>
       <View style={{paddingVertical:2}} className=" flex h-full flex-col ml-3 justify-start">
        <Text style={{fontSize:16, color:'#4D5561'}} className=" font-semibold">
            安徽绩溪端午之旅
        </Text>
        <Text style={{fontSize:12, color:'#ADB5C3'}} className="mt-2">
            3天 | 12个活动点
        </Text>
        <Text style={{fontSize:12, color:'#ADB5C3'}} className="mt-auto">
            2024/6/2
        </Text>
       </View>
       <TouchableOpacity className="ml-auto">
       <EllipsisVertical  color={'#ADB5C3'} />
       </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default RoadBook