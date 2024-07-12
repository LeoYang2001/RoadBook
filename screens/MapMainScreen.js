import { View, Text, TouchableWithoutFeedback, Keyboard, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import PlacesSuggestionItem from '../components/PlacesSuggestionItem';
import PlacesPlanList from '../components/PlacesPlanList';
import MapComponent from '../components/MapComponent';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createRoadBook, updateUser } from '../src/graphql/mutations';
import * as queries from '../src/graphql/queries'

import * as mutations from '../src/graphql/mutations';

const BAIDU_MAPS_APIKEY = process.env.EXPO_PUBLIC_BAIDU_MAPS_APIKEY
const BAIDU_PLACES_URL = process.env.EXPO_PUBLIC_BAIDU_PLACES_URL

const initializePlacesPlan = (tripDays)=>{
    
    
    const placesPlan = {}
    for(let i=0; i<tripDays;i++)
        {
            placesPlan[`day${i+1}`] = []
        }
        return placesPlan
}



const MapMainScreen = ({navigation, route}) => {




    const {location, city, tripDays,roadbookName} = route.params

    
    const [inputText, setInputText] = useState("")
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null)
    const [suggestions, setSuggestions] = useState([])
    const [ifAddingNewPlace, setIfAddingNewPlace] = useState(true)
    const [ifFirstEnter, setIfFirstEnter] = useState(true)
    const [curDay, setCurDay] = useState(1)
    const [placesPlan, setPlacesPlan] = useState(initializePlacesPlan(tripDays))
    const debounceTimeout = useRef(null)
    const [userInfo, setUserInfo] = useState(null)
    const [userInfoFromUserList, setUserInfoFromUserList] = useState(null)

    const height = useSharedValue(180);
    const headerMarginTop = useSharedValue(0);
    const bottomListMarginBottom = useSharedValue(-240 - (placesPlan[`day${curDay}`].length) * 72);




    useEffect(() => {
        fetchUser();
      }, []);
    
      const fetchUser = async () => {
        try {
          const userInfo = await Auth.currentAuthenticatedUser();
          setUserInfo(userInfo);
            fetchUserInfoFromUserList(userInfo.attributes.sub)
        } catch (error) {
          console.log('Error fetching user:', error);
        }
      };
    

    useEffect(() => {
        toggleEditMode(ifAddingNewPlace)
    }, [ifAddingNewPlace])

    const incrementTripDays = () => {
        let dayKey = `day${Object.keys(placesPlan).length + 1}`
        const newPlacesPlan = {...placesPlan}
        newPlacesPlan[dayKey] = []
        setPlacesPlan(newPlacesPlan)
    }


  
    const toggleEditMode = (ifAddingNewPlace) => {
        if(ifFirstEnter) setIfFirstEnter(false)
        if(!ifAddingNewPlace)
        {
            headerMarginTop.value = withTiming(-180, {duration : 300})
            Keyboard.dismiss()
            bottomListMarginBottom.value =  withTiming(0, {duration : 300})
        }
        else{
            headerMarginTop.value = withTiming(0, {duration : 300})
            if(!ifFirstEnter)   inputRef.current.focus()
            bottomListMarginBottom.value =  withTiming(-240 - (placesPlan[`day${curDay}`].length) * 72, {duration : 300})
        }
        
    }
    

    const toggleHeightOnFocus = () => {
        height.value = withTiming(126, {duration : 300})
    }
    const toggleHeightOnBlur = () => {
        height.value = withTiming(180, {duration : 300})
    }

    const handleAddingNewPlace = (day) => {
        setIfAddingNewPlace(true)
        setCurDay(day)
    }

    const handleCompleteAddingNewPlace = (place) => {
        setInputText('')
        setSuggestions([])
        setIfAddingNewPlace(false)
        let newPlacesPlan = {...placesPlan}
        newPlacesPlan[`day${curDay}`] =  [...newPlacesPlan[`day${curDay}`], place];
        setPlacesPlan(newPlacesPlan)
    }


    const fetchSuggestions = async () => {
        const url = BAIDU_PLACES_URL;
        const ak = BAIDU_MAPS_APIKEY;
        const params = {
            query: inputText,  // Travel attractions
            tag: "旅游景点",        // Sights
            region: city,     // Beijing
            output: "json",
            ak: ak
        };
        const queryString = new URLSearchParams(params).toString();
        const requestUrl = `${url}?${queryString}`;
    
        try {
            const response = await fetch(requestUrl);
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            const raw_arr = handleSuggestionsResponse(data.results);
            setSuggestions(raw_arr);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('error occurred', error)
        }
    };

    const handleSuggestionsResponse = (predictions) => {
        if (!predictions || !predictions.length) {
            return [];
        }
    
        const filteredArr = predictions.map(prediction => ({
            main_text: prediction.name,
            detailed_name: prediction.address,
            place_id: prediction.uid,
            location: prediction.location
        }));


        return filteredArr
    }

  


    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
            marginTop: headerMarginTop.value
        };
      });

      const animatedBottomListStyle = useAnimatedStyle(() => {
        return {
            marginBottom: bottomListMarginBottom.value
        };
      });

      const handleInputChange = (text) => {
        if(text.length === 0){
            setSuggestions([])
        }
        setInputText(text); 
      
        if(debounceTimeout?.current)
        {
            clearTimeout(debounceTimeout.current)
        }

        debounceTimeout.current = setTimeout(()=>{
            fetchSuggestions(text)
        },200)
        
      };

      const fetchUserInfoFromUserList = async (uid) => {
        const user = await API.graphql({
          query: queries.getUser,
          variables:{
            id:uid
          }
        })
        setUserInfoFromUserList(user)
      }
    
    
     const handleCreatingRoadBook = async ()=>{
        
        //create roadBook with user id and check if the roadbook name exists in user's roadbooklist
        let userId = userInfo.attributes.sub
        try {
            if(!userId)    return alert('userinfo error')
            // 1. Create RoadBook
                const roadBookInput = {
                name: roadbookName,
                placesPlan: JSON.stringify(placesPlan),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                };
                const createRoadBookResponse = await API.graphql(graphqlOperation(createRoadBook, {input: roadBookInput}));
                let roadBook_id = createRoadBookResponse.data.createRoadBook.id
                let roadBookItem = createRoadBookResponse.data.createRoadBook

                let roadBookItemParsed = {
                    ...roadBookItem,
                    placesPlan:JSON.parse(roadBookItem.placesPlan)
                }
                // insert roadBook_id to user (roadBookList) in userList
                // user.data?.getUser?.roadBookList
                const oldUserInfo = userInfoFromUserList?.data?.getUser
                const updateUserDetail = {
                    id: oldUserInfo?.id,
                    username: oldUserInfo?.username,
                    email: oldUserInfo?.email,
                    createdAt: oldUserInfo?.createdAt,
                    roadBookList: [...oldUserInfo?.roadBookList,roadBook_id]
                  };

                 await API.graphql({
                    query: mutations.updateUser,
                    variables: { input: updateUserDetail }
                  });

                  console.log('update successfully')

                    navigation.replace('RoadBookEdit', {
                       roadBookItem:roadBookItemParsed
                    })

        } catch (error) {
            console.error('Error creating RoadBook:', error);
            Alert.alert('Error', 'Failed to create RoadBook. Please try again later.');
        }

       
     }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       <View className="flex-1  relative">
        
            <Animated.View style={animatedStyle} className="bg-white  px-5 flex-col shadow-lg z-20">
            {
                !isFocused ? (
                    <View className="mt-12 pt-7 flex flex-row items-center">
                <View style={{width:7, height:7, backgroundColor:"#FA541C"}} className=" rounded-full flex justify-center items-center mr-3" >
                    <View style={{width:15, height:15, backgroundColor:"#FA541C",opacity:0.3}} className="rounded-full"  />
                </View>
                <Text style={{color:'#222833', fontSize:18}} className="font-semibold" >
                    计划这场旅行从哪里开始?
                </Text>
            </View>
                ):(
                    <View className="mt-12  flex flex-row items-center" />
                )
            }
            <View className="relative  flex-1  mt-4 flex-col justify-center">
                {
                    !isFocused && !inputText && (
                        <TouchableWithoutFeedback onPress={()=>{
                            setIsFocused(true)
                            inputRef.current.focus()
                            }}  >
                            <View  className="absolute top-50  z-10 w-full flex justify-center items-center flex-row " style={{height:44, backgroundColor:'#F3F4F7', color:'#A8AFBC', borderRadius:12 }}>
                                <Search color={"#A8AFBC"} size={20} className="mr-1" />
                                <Text
                                style={{color:"#A8AFBC"}}
                                >输入一个地点</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }
                <TextInput className="pl-4" 
                ref={inputRef}
                value={inputText}
                onChangeText={handleInputChange}
                onFocus={()=>{
                    setIsFocused(true)  
                    toggleHeightOnFocus()
                }}
                onBlur={()=>{
                    setIsFocused(false) 
                    toggleHeightOnBlur()
                }}
                style={{height:44, backgroundColor:'#F3F4F7', color:'#A8AFBC', borderRadius:12, color:'#000' }}  />
            </View>
        </Animated.View>

            {/* INTERACTIVE MAP  */}
            <View className="   flex-1 bg-gray-200 flex justify-center relative items-center">
                {
                    (suggestions.length > 0 && isFocused && ifAddingNewPlace && inputText) && (
                        <View style={{ maxHeight:216 }} className="z-10 shadow-md w-full absolute top-0">
                        <View className="px-7 py-3" style={{ backgroundColor:'#fff'}}>
                            {
                                suggestions.slice(0,5).map((prediction,index)=> (
                                    <PlacesSuggestionItem handleCompleteAddingNewPlace={handleCompleteAddingNewPlace}  key={`${prediction.place_id}-${index}`} prediction={prediction} />
                                ))
                            }
                        </View>
                    </View>
                    )
                }
               <MapComponent location={location} placesPlan={placesPlan} curDay={curDay} />
            </View>

          
            <Animated.View style={animatedBottomListStyle} className=" mt-auto">
                <PlacesPlanList handleCreatingRoadBook={handleCreatingRoadBook} 
                incrementTripDays={incrementTripDays} curDay={curDay} placesPlan={placesPlan}
                 handleAddingNewPlace={handleAddingNewPlace} setCurDay={setCurDay} />
            </Animated.View>
           
       </View>
    </TouchableWithoutFeedback>
  )
}

export default MapMainScreen









