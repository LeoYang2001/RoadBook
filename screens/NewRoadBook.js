import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { pageLayout, themeColors } from '../constant'
import { ChevronLeft, Image } from 'lucide-react-native'
import LocationDropdownModal from '../components/LocationDropdownModal'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import DaysDropdownModal from '../components/DaysDropdownModal'


const NewRoadBook = ({navigation}) => {

    const BAIDU_MAPS_APIKEY = process.env.EXPO_PUBLIC_BAIDU_MAPS_APIKEY
    const BAIDU_PLACES_URL = process.env.EXPO_PUBLIC_BAIDU_PLACES_URL

    const [isModal, setIsModal] = useState(false)
    const [modalMode, setModalMode] = useState(null)
    const [city, setCity] = useState(null)
    const [tripDays, setTripDays] = useState(null)
    const [roadbookName, setRoadbookName] = useState('')

    const [isLoading, setisLoading] = useState(false)

    const handleSetCity = (city) => {
        setCity(city)
    }
    const handleSetTripDays = (days) => {
        setTripDays(days)
    }

    const handleNewMap = ()=>{
        if(!city || !tripDays || !roadbookName) return alert('fill out the form please')
        fetchCityLocation()
    }

    const fetchCityLocation = ()=>{
            setisLoading(true)
            const url = BAIDU_PLACES_URL
            const ak = BAIDU_MAPS_APIKEY
            const params = {
                query: city,  // Travel attractions
                region: "中国",     // Beijing
                output: "json",
                ak: ak
            };
        
            const queryString = new URLSearchParams(params).toString();
        
            const requestUrl = `${url}?${queryString}`;
            
            fetch(requestUrl)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data?.results[0]?.location)
                const location = data?.results[0]?.location
                setisLoading(false)
                navigation.replace('MapMainClone', {location:location, city:city, tripDays:tripDays, roadbookName:roadbookName})
            })
            .catch(error => {
                alert(error)
                console.error('There was a problem with the fetch operation:', error);
            });
               
    }


    const transformY = useSharedValue(274)
    const toggleModal = (toggleVal) => {
        setIsModal(toggleVal)
        transformY.value = withTiming(toggleVal ? 0:274, {duration:250})
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ translateY: transformY.value }],
        };
      });

  return (
    <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
><View className="flex-1 bg-white">
    {
        isModal && (
            <Pressable onPress={()=>{
                toggleModal(false)
            }} style={{opacity:0.6}} className="absolute w-full h-full z-10 bg-black" />
        )
    }
     {
        isLoading && (
            <View  style={{backgroundColor:'rgba(0,0,0,0.6)'}} className="absolute w-full h-full z-10  flex justify-center items-center" >
                <ActivityIndicator color={themeColors.primaryColor} size={'large'} />
            </View>
        )
    }


        <Animated.View style={[ animatedStyle, {height:274}]} className=" absolute w-full z-20 bottom-0">
               {
                modalMode == 'location' && (
                    <LocationDropdownModal handleSetCity={handleSetCity} toggleModal={toggleModal}/>
                )
               }
               {
                modalMode == 'days' && (
                   <DaysDropdownModal handleSetTripDays={handleSetTripDays} toggleModal={toggleModal} />
                )
               }
            </Animated.View>
    <SafeAreaView style={{backgroundColor:"#FFFFFF"}} className="flex-1" >
    <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View style={{paddingHorizontal:pageLayout.paddingHorizontal, paddingVertical: pageLayout.paddingVertical}} className=" flex-1  flex-col   justify-start">
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
                <ChevronLeft color={'#38404D'} />
                </TouchableOpacity>

                <View className=" shadow-lg mt-14" 
                style={{width:357, height:367, borderRadius:16, backgroundColor:'#F3F4F7'
                    ,shadowColor:'#ccc'
                }}>
                    <TouchableOpacity className="flex justify-center items-center" style={{height:125}}>
                        <Image size={50} color={'#878895'}/>
                    </TouchableOpacity>
                    <View  className="flex-1 bg-white flex-col justify-around" style={{borderBottomLeftRadius:16, borderBottomRightRadius:16, paddingVertical:30, paddingHorizontal:16}}>
                        <View className="flex flex-row justify-end items-center">
                            <Text style={{color:'#4D5561'}}>路数名称</Text>
                            <TextInput value={roadbookName} 
                            onChangeText={text => setRoadbookName(text)}
                            placeholder='请输入名称' style={{height:40, width:235, borderRadius:8, backgroundColor:'#F3F4F7'}} className=" font-semibold ml-4 text-right px-4" />
                        </View>
                        <View className="flex flex-row justify-end items-center">
                            <Text style={{color:'#4D5561'}}>目的地</Text>
                            <Pressable onPress={() => {
                                Keyboard.dismiss()
                                toggleModal(true)
                                setModalMode('location')
                            }
                            }  style={{height:40, width:235, borderRadius:8, backgroundColor:'#F3F4F7'}} className=" ml-4  flex-row items-center justify-end  text-right px-4" >
                                {
                                    city ? (
                                        <Text style={{color:"#000000"}} className="mr-1 font-semibold">
                                {city}</Text>
                                    ):(
                                        <Text style={{color:"#A8AFBC"}}>请选择目的地</Text>
                                    )
                                }
                                
                            </Pressable>
          
           
                        </View>
                        <View className="flex flex-row justify-end items-center">
                            <Text style={{color:'#4D5561'}}>天数</Text>
                            <Pressable onPress={() => {
                                Keyboard.dismiss()
                                toggleModal(true)
                                setModalMode('days')
                            }
                            }  style={{height:40, width:235, borderRadius:8, backgroundColor:'#F3F4F7'}} className=" ml-4  flex-row items-center justify-end  text-right px-4" >
                               {
                                tripDays && (
                                    <Text style={{color:"#000000"}} className="mr-1 font-semibold">
                                {tripDays}</Text>
                                )
                               }
                                <Text style={{color:"#A8AFBC"}}>
                                天</Text>
                            </Pressable>
          
           
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={handleNewMap} style={{backgroundColor:'#222833',height:50, borderRadius:16}} className="justify-center items-center flex mt-10" >
                        <Text className="text-white">开始创建新的路书</Text>
                </TouchableOpacity>
                
            </View>
            
    </KeyboardAvoidingView>
    </SafeAreaView>
</View>
    </TouchableWithoutFeedback>
  )
}

export default NewRoadBook