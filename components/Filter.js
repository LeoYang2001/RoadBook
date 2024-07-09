import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';


const Filter = ({selections, setSelectionId, selectionId}) => {
    const [isOpen, setIsOpen] = useState(false)
    

    const filterHeight = 35*selections.length + 15

    const rotation = useSharedValue(0);
    const height = useSharedValue(0);
    const opacity = useSharedValue(0);

    const toggleFilter = () => {
        Haptics.selectionAsync()
        setIsOpen(!isOpen);
        rotation.value = withTiming(isOpen ? 0 : 90, { duration: 300 });
        height.value = withTiming(isOpen ? 0 : filterHeight, { duration: 300 }); 
        opacity.value = withTiming(isOpen ? 0 : 1, { duration: 300 }); 
      };


      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ rotateZ: `${rotation.value}deg` }],
        };
      });

      const animatedHeightStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
            opacity: opacity.value
        };
      });

      const handleSelectFilter = (id) => {
        toggleFilter()
        setSelectionId(id)
      }

  return (
    <View className="mt-8  flex-row items-center relative" >
        <TouchableOpacity  className=" flex-row items-center " onPress={toggleFilter} >
         <Text style={{lineHeight:20, color:'#ADB5C3'}}>
          {selections[selectionId - 1].name}
         </Text>
         <Animated.View style={animatedStyle}>
            <ChevronRight color="#ADB5C3" size={20} />
        </Animated.View>
        </TouchableOpacity>
       
        {
            isOpen && (
                <Animated.View style={[animatedHeightStyle, 
                    {top:24,  borderRadius:10, paddingHorizontal:12, paddingVertical:8, 
                        backgroundColor:'#222833'
                    }]} className="border absolute z-20 " >
                    {
                        selections.map((selection)=>(
                            <TouchableOpacity
                            onPress={()=>{
                                handleSelectFilter(selection.id)
                            }}
                            key={selection.id}  style={{height:35, borderBottomWidth: selection.id === selections.length ? 0 : 1, borderColor:'rgba(255,255,255,0.2)'}} className=" flex justify-center items-start">
                                <Text style={{color:"rgba(255,255,255,0.8)", fontSize:14}}>
                                    {
                                        selection.name
                                    }
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </Animated.View>
            )
        }
    </View>
  )
}

export default Filter