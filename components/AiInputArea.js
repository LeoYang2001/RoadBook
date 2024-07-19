import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import LocationDropdownModal from './LocationDropdownModal';
import TripdaysDropdownModal from './TripdaysDropdownModal';
import { tripDaysList } from '../utility';
import TravelStyleSlider from './TravelStyleSlider';
import { travelStyleList } from '../constant';


const mainOptionList = [
    {
        name:'生成路书',
        optionMode:'roadBookGeneration'
    },
    {
        name:'景点推荐',
        optionMode:'placesRecommendation'
    },
    {
        name:'旅行建议',
        optionMode:'travelingAdvice'
    },
    {
        name:'路数修改',
        optionMode:'roadBookImprovement'
    },
    
]




const RoadBookGeneration = ({sendMessage, chatWindowRef}) => {

    //promptInputMode null => city, places, travelStyle, tripDays
    const [promptInputMode, setPromptInputMode] = useState(null)
    const [city, setCity] = useState('')
    const [tripDays, setTripDays] = useState(3)
    const [travelStyle, setTravelStyle] = useState(0)

    const bottomOffset = useSharedValue(-500)

    const animatedStyle = useAnimatedStyle(() => {
        return {
          bottom: bottomOffset.value,
        };
    });


    useEffect(() => {
      if(!promptInputMode){
        bottomOffset.value = withTiming( -500 , { duration: 400 })
      }
      else{
        bottomOffset.value = withTiming( 0 , { duration: 400 })
      }
    }, [promptInputMode])


    const handleSendingMessage = () => {
        if(!city)   return alert("fill the prompt")
        chatWindowRef?.current?.scrollToEnd()
        const promptMsg = `我想去[${city}]游玩，我喜欢[${travelStyleList[travelStyle]}]。根据我的描述帮我生成[${tripDaysList[tripDays - 1].label}]的旅行路书.`
        const promptAttributes = {city, travelStyle, tripDays}
        sendMessage('user',promptMsg,promptAttributes)
    }
    

    const TouchableText = ({text, promptOption})=>{
        return (
            <TouchableOpacity
                            style={{
                                transform:[{translateY:3}],
                            }}
                            onPress={()=>{
                                setPromptInputMode(promptOption)
                            }}
            >
            <Text
        className="font-semibold"

                style={{
            color:"#165DFF"

                }}
            >
            [{text}]
            </Text>
        </TouchableOpacity>
        )
    }

    return (
        <View className="relative">
                {/* OPTIONS VIEW  */}
                <Animated.View  className="absolute w-full z-30"
                    style={animatedStyle}
                >
                   {
                    promptInputMode === 'city' && (
                        <View style={{
                            height:315
                        }}>
                                <LocationDropdownModal handleSetCity={setCity} toggleModal={()=>{
                                    setPromptInputMode(null)
                                }}/>
                        </View>
                    )
                   }
                   {
                    promptInputMode === 'tripDays' && (
                        <View style={{
                            height:315
                        }}>
                                <TripdaysDropdownModal init_tripDays={tripDays} handleSetTripdays={setTripDays} toggleModal={()=>{
                                    setPromptInputMode(null)
                                }}/>
                        </View>
                    )
                   }
                   {
                     promptInputMode === 'travelStyle' && (
                        <View style={{
                            height:230
                        }}
                        >
                            <TravelStyleSlider travelStyle={travelStyle} setTravelStyle={setTravelStyle}  toggleModal={()=>{
                                    setPromptInputMode(null)
                                }} />
                        </View>
                     )
                   }
                </Animated.View>
       {
        !promptInputMode && (
            <View  className="bg-white shadow-md " >
           
            <View
                            style={{
                                margin:19,
                                backgroundColor:"#F3F4F7",
                                borderRadius:12,
                                padding:12
                            }}
                            className="  flex-row">
                            {/* <TextInput
                    onFocus={()=>{
                        if(chatWindowRef){
                        setTimeout(()=>{
                        chatWindowRef?.current?.scrollToEnd()

                        },100)
                        }
                    }}
                        style={{ flex: 1, padding: 10, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 10 }}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type your message..."
                    /> */}
                    <View className="flex-1  flex justify-center items-center ">
                        <Text style={{
                            color:"#4D5561",
                        }}
                            className="font-semibold"
                        >
                            我想去
                            <TouchableText text={city ? city:'城市'} promptOption={'city'} />
                       的<TouchableText text={'景点'} promptOption={'places'} />
                       游玩，我喜欢<TouchableText text={travelStyleList[travelStyle]}  promptOption={'travelStyle'}/>
                       。根据我的描述帮我生成<TouchableText text={tripDaysList[tripDays - 1]?.label} promptOption={'tripDays'} />的旅行路书。
                       </Text>
                    </View>
                    <TouchableOpacity
                    style={{
                        width:50,
                        height:30,
                        borderRadius:6,
                        backgroundColor:'#222833'
                    }}
                    className="mt-auto flex justify-center ml-2 items-center"
                    onPress={handleSendingMessage} >
                          <Image
                                className="mb-1 mt-1"
                                style={{
                                    width:18,
                                    height:18
                                }}
                                    source={require('../assets/sendMsg.png')}
                                />
                    </TouchableOpacity>
                            </View>
        </View>
        )
       }
        </View>
    )
}




const AiInputArea = ({
    chatWindowRef,
    sendMessage,
    inputMode,
    setInputMode
}) => {

    
    
  return (
    <>
        {
            inputMode === 'main' && (
                <View className="bg-white shadow-md" 
                    style={{
                        height:135
                    }}
                >
                <View className="flex-1   flex-row items-center justify-between px-3">
                    {
                        mainOptionList.map(option => (
                            <TouchableOpacity
                            onPress={()=>{
                                setInputMode(option.optionMode)
                            }}
                            key={option.optionMode}
                                style={{
                                    width:80,
                                    height:80,
                                    borderRadius:10,
                                    backgroundColor:"#F5F6F8"
                                }}
                                className="flex-col justify-center items-center"
                            >
                                <Image
                                className="mb-1"
                                style={{
                                    width:40,
                                    height:40
                                }}
                                    source={require('../assets/optionImg.png')}
                                />
                                <Text
                                className="font-semibold"
                                    style={{
                                        color:'#4D5561',
                                        fontSize:12
                                    }}
                                >
                                {option.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                </View>
            )
        }
          {
            inputMode === 'roadBookGeneration' && (
                <RoadBookGeneration setInputMode={setInputMode} chatWindowRef={chatWindowRef} sendMessage={sendMessage} />
            )
          }
    </>
  )
}

export default AiInputArea