import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const PlacesInputTab = ({editMode ,setEditMode, handleHideHeader, ifHeaderShown}) => {

    const tabLeft = useSharedValue(34);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: tabLeft.value,
        };
      });

    useEffect(() => {
        tabLeft.value = withTiming(editMode === 'locEdit' ? 34 : 130, {duration : 200})
    }, [editMode])
    
    

  return (
    <View className="flex-row  relative">
  
      {
        ifHeaderShown ? (
          <Text
          style={{
              fontSize:16,
              color:'#222833'
          }}
          >
          添加标记点
      </Text>
        ):(
          <>
            <Animated.View 
              style={[animatedStyle, {
                  position:"absolute",
                  height:2,
                  width:28,
                  borderRadius:1,
                  backgroundColor:'#FA541C',
                  bottom:0,
              }]}
          />
              <TouchableOpacity

              onPress={()=>{
                  setEditMode('locEdit')
              }}

              className="flex justify-center items-center py-3"
              style={{
                  width:96
              }}
              >
              <Text
                  style={{
                      fontSize:16,
                      color:editMode === 'locEdit' ? '#FA541C':'#222833'
                  }}
                  >
                  线路规划
              </Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>{
                  setEditMode('detailEdit')
              }}
              className="flex justify-center items-center  py-2"
              style={{
                  width:96
              }}
              >
              <Text
                  style={{
                      fontSize:16,
                      color:editMode === 'detailEdit' ? '#FA541C':'#222833'
                  }}
                  >
                  信息标记
              </Text>
              </TouchableOpacity>
          </>
        )
      }
    </View>
  )
}

export default PlacesInputTab