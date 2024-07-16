import { View, Text, TouchableWithoutFeedback, Keyboard, TextInput, ScrollView, TouchableOpacity, Pressable, StyleSheet, Button } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, CircleCheck, Search } from 'lucide-react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import PlacesSuggestionItem from '../components/PlacesSuggestionItem';
import PlacesPlanList from '../components/PlacesPlanList';
import MapComponent from '../components/MapComponent';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createRoadBook, updateUser } from '../src/graphql/mutations';
import * as queries from '../src/graphql/queries'
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';
import * as mutations from '../src/graphql/mutations';
import PlacesInputTab from '../components/PlacesInputTab';
import PlacesDetailEdit from '../components/PlacesDetailEdit';
import { countPlanDays, hasNonEmptyArray } from '../utility';
import PlacesPlanListClone from '../components/PlacesPlanListClone';

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




const MapMainScreenClone = ({navigation, route}) => {




    // const {location, city, tripDays,roadbookName} = route.params
    const {location, city, tripDays,roadbookName} = {
       city: "北京市",
        location: {"lat": 39.910924, "lng": 116.413387},
        roadbookName: "第一份路书",
        tripDays: 1
    }

    //STATES
    const [inputText, setInputText] = useState("")
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null)
    const [suggestions, setSuggestions] = useState([])
    const [curDay, setCurDay] = useState(1)
    const [placesPlan, setPlacesPlan] = useState(initializePlacesPlan(tripDays))
    const debounceTimeout = useRef(null)
    const [userInfo, setUserInfo] = useState(null)
    const [userInfoFromUserList, setUserInfoFromUserList] = useState(null)
    //editMode: 1.locEdit, 2.detailEdit
    const [editMode, setEditMode] = useState('locEdit')
    const [ifHeaderShown, setIfHeaderShown] = useState(true)
    const [snapPoints, setSnapPoints] = useState([130,253, 710])
    const [contentHeight, setContentHeight] = useState(185)
    const headerMarginTop = useSharedValue(0);
    //viewMode: 1.title, 2.list
    const [viewMode, setViewMode] = useState('list')
    const [ifDraging, setIfDraging] = useState(false)


    useEffect(() => {
        headerMarginTop.value = withTiming(ifHeaderShown ? 0 : -178, {duration : 200})
    }, [ifHeaderShown])

    useEffect(() => {
      if(editMode === 'detailEdit')
      {
        bottomSheetModalRef.current?.snapToIndex(2);
      }
      else{
        bottomSheetModalRef.current?.snapToIndex(1);
      }

    }, [editMode])
    

    useEffect(() => {
        
        //base height = 223 - 58 = 165
        //contentHeight = 165 + 58 * curDayplaces.length
        //snapPoint = contentHeight + 30
        let newSnapPoints = [...snapPoints]
        let curDayPlaces = placesPlan[`day${curDay}`]
        let newContentHeight = 165 + 58*curDayPlaces.length + 30
        if(curDayPlaces.length > 4)    return
        setContentHeight(newContentHeight)
        newSnapPoints[1] = newContentHeight
        setSnapPoints(newSnapPoints)

        countPlanDays(placesPlan)
      
    }, [placesPlan,curDay])
    

    
    const animatedStyle = useAnimatedStyle(() => {
        return {
            marginTop: headerMarginTop.value,
        };
      });

    //show header and hide placesList modal
    const handleShowHeader = () => {
        setIfHeaderShown(true)
        inputRef.current.focus()
        handleDismissModalPress()
    }

    //hide header and show placesList modal
    const handleHideHeader = () => {
        setIfHeaderShown(false)
        handlePresentModalPress()
    }
    


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
    


    const incrementTripDays = () => {
        let dayKey = `day${Object.keys(placesPlan).length + 1}`
        const newPlacesPlan = {...placesPlan}
        newPlacesPlan[dayKey] = []
        setPlacesPlan(newPlacesPlan)
    }

   // ref
   const bottomSheetModalRef = useRef(null);

 
   // callbacks
   const handlePresentModalPress = useCallback(() => {
     bottomSheetModalRef.current?.present();
   }, []);
   const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
   const handleSheetChanges = useCallback((index) => {
     console.log('handleSheetChanges', index);
     setViewMode(index === 0 ? 'title' : 'list')
     setEditMode(index === 2 ? 'detailEdit':'locEdit')
     //bottom sheet has been dismissed
     //show header
     if(index === -1)
     {
        handleShowHeader()
     }
   
   }, []);

   

    const handleCompleteAddingNewPlace = (place) => {
        //Create unique Id with timeStamp
        let placeWithTimeStamp = {
            ...place,
            timeId: place.place_id + Date.now()
        }
        
        Keyboard.dismiss()
        handleHideHeader()
        setInputText('')
        setSuggestions([])
        let newPlacesPlan = {...placesPlan}
        newPlacesPlan[`day${curDay}`] =  [...newPlacesPlan[`day${curDay}`], placeWithTimeStamp];
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
    <BottomSheetModalProvider>
   
     <View className=" flex-1 ">
         <View  style={{
                height:70,
                top:46
            }} className="flex-row items-center  absolute z-40 w-full  px-4 ">
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.goBack()
                        }}
                    >
                    <ChevronLeft  size={24} color={'#1D2129'} />
                    </TouchableOpacity>
                    {
                        (!isFocused && !hasNonEmptyArray(placesPlan) ) ? (
                            <View className="flex-row items-center ml-4">
                        <View style={{width:7, height:7, backgroundColor:"#FA541C"}} className=" rounded-full flex justify-center items-center mr-3" >
                                <View style={{width:15, height:15, backgroundColor:"#FA541C",opacity:0.3}} className="rounded-full"  />
                            </View>
                        <Text
                            style={{
                                fontSize:18,
                                color:'#222833'
                            }}
                        >计划这场旅行从哪里开始？</Text>
                    </View>
                        ):(
                            <View className=" flex-1 h-full flex justify-center items-center">
                                <PlacesInputTab editMode={editMode} setEditMode={setEditMode} />
                            </View>
                        )
                    }
                    <TouchableOpacity
                                className="ml-auto "

                        onPress={()=>{
                        }}
                    >
                        <CircleCheck    size={24} color={'#222833'} />

                    </TouchableOpacity>
        </View>

        {/* Header Input Area  */}
        <Animated.View style={[{
            paddingTop:46,
            height:178,
        }, animatedStyle]} className=" bg-white px-4 pb-4 flex-col justify-between shadow-md z-20" >
            
            <View className="mt-auto">
                {
                        !isFocused &&  (
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
                <TextInput className="pl-4 " 
                    ref={inputRef}
                    value={inputText}
                    onChangeText={handleInputChange}
                    onFocus={()=>{
                        setIsFocused(true)  
                    }}
                    onBlur={()=>{
                        setIsFocused(false) 
                    }}
                    style={{height:44, backgroundColor:'#F3F4F7', color:'#A8AFBC', borderRadius:12, color:'#000' }}  />
            </View>
        </Animated.View>

         {/* INTERACTIVE MAP  */}
         <TouchableWithoutFeedback 
         onPress={Keyboard.dismiss}
         className=" flex-1">
            <View className=" flex-1 bg-gray-200 flex justify-center relative items-center z-10  ">
            {
                    (suggestions.length > 0 && isFocused  && inputText) && (
                        <View 
                        style={{ height:216 ,
                            backgroundColor:'#fff'
                        }} className=" py-3 z-20  w-full absolute top-0  overflow-scroll shadow-md">
                            <ScrollView keyboardShouldPersistTaps="always" className='px-7'>
                            {
                                suggestions.map((prediction,index)=> (
                                    <PlacesSuggestionItem handleCompleteAddingNewPlace={handleCompleteAddingNewPlace}  key={`${prediction.place_id}-${index}`} prediction={prediction} />
                                ))
                            }
                            </ScrollView>
                    </View>
                    )
                }
               <MapComponent location={location} placesPlan={placesPlan} curDay={curDay} />
            </View>
            </TouchableWithoutFeedback>
        {/* bottom modalsheet for placeslist  */}
        <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
        enableContentPanningGesture={!ifDraging}
      >
        <BottomSheetView 
        style={styles.contentContainer}>
            <View className=" flex-1 w-full ">
             {
                viewMode === 'list' ? (
                    <PlacesPlanListClone 
                    setIfDraging={setIfDraging}
             contentHeight={contentHeight}
             roadBookItem={{
                placesPlan:placesPlan
             }}
             curDay={curDay}
             setCurDay={setCurDay}
             placesList={placesPlan[`day${curDay}`]}
             handleShowHeader={handleShowHeader}
            />
                ):(
                    <View 
                    style={{
                        height:102
                    }}
                        className=" flex  px-6  flex-row justify-between items-center"
                    >
                        <Text 
                        style={{
                            fontSize:16,
                            color:"#4D5561"
                        }}
                        className="font-semibold"
                        >{roadbookName}</Text>
                        <Text
                            className="font-semibold"
                            style={{
                                fontSize:12,
                                color:"#ADB5C3"
                            }}
                        >
                            {countPlanDays(placesPlan).tripDays}天 | {countPlanDays(placesPlan).placesCount}个活动点
                        </Text>
                    </View>
                )
             }
            </View>
        </BottomSheetView>
      </BottomSheetModal>
            
    </View>
  </BottomSheetModalProvider>
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });
  
export default MapMainScreenClone









