import { View, Text, Modal, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BlurView } from 'expo-blur'
import { Plus } from 'lucide-react-native'
import DraggableFlatList, { NestableDraggableFlatList, NestableScrollContainer, ScaleDecorator } from "react-native-draggable-flatlist";
import * as Haptics from 'expo-haptics';
import { transformToDailyPlacesArray, transformToDailyPlacesObject } from '../utility';


// const initialData = [
//     {
//         id:'6723acd45f62f7d771455b0c1721221336902',
//         name:'day1',
//         placesList:['demo','demo']
//     },
//     {
//         id:'6723acd45f62f7d771455b0c1721221336231',
//         name:'day2',
//         placesList:['demo','demo']
//     },
//     {
//         id:'6723acd45f62f7d771455b0c1721221331111',
//         name:'day3',
//         placesList:['demo','demo']
//     }
// ]

const SlidingModal = ({modalVisible, setModalVisible, placesPlan, setPlacesPlan, incrementTripDays}) => {





  const [data, setData] = useState([]);
  
  useEffect(() => {
    const placesPlan_array = transformToDailyPlacesArray(placesPlan)
    setData(placesPlan_array)
  }, [placesPlan])
  

  const handleUpdatePlacesPlan = (newData) => {
    console.log(newData)
  }

  const dragScrollRef = useRef(null)

  const renderItem = ({item, drag, isActive}) => {
    return (
        <ScaleDecorator>
            <TouchableOpacity
             onLongPress={()=>{
                Haptics.selectionAsync()
                drag()
              }}
              disabled={isActive}
              style={{
                height:81, 
                marginHorizontal:10,
                width:210,
                borderRadius:8,
                backgroundColor:isActive ? '#FF6A38' : 'white',
                marginTop:9
            }}

                className=" p-2 flex-row"
            >
                <Text 
                className="font-semibold"
                style={{
                    color:isActive ? 'white' : '#38404D'
                }}>{item.id.split('-')[0]}</Text>
                <View className="  flex-1 ml-4 flex-col">
                    {
                        item.dailyPlacesList.length > 0 ? (
                            <>
                             {
                            item.dailyPlacesList.map((place) => (
                            <View 
                            key={place.timeId}
                            className="flex-row ">
                                <Text style={{
                                    color:isActive ? 'white' : "#38404D",
                                    opacity:0.8
                                }} className="font-bold mr-1 ">·</Text>
                                <View className=" flex justify-center items-center">
                                <Text
                                style={{
                                    color:isActive ? 'white' : "#38404D",
                                    opacity:0.8,
                                    fontSize:10
                                }}
                                >
                                    {
                                        place.main_text
                                    }

                                </Text>
                                </View>
                        </View>
                        ))
                    }
                            </>
                        ):(
                            <Text
                                style={{
                                    color:"#38404D",
                                    fontSize:10,
                                    opacity:0.4,
                                    marginTop:4
                                }}
                            >暂无标记点</Text>
                        )
                    }
                </View>
            </TouchableOpacity>
        </ScaleDecorator>
    )
  }


  return (
    <Modal
        animationType='fade'
        visible={modalVisible}
        transparent={true}
    >
      <BlurView intensity={20} style={{backgroundColor:"rgba(0,0,0,0.5)"}} className=" flex-1">
        <Pressable 
            onPress={()=>{
                setModalVisible(false)
            }}
        className="flex justify-center items-center  flex-1">
        </Pressable>
        {/* Days List Area  */}
        <View style={{
                    maxHeight:630,

            width:230,
            right:10,
            top:74,
            paddingVertical:10
        }} className="  bg-transparent   absolute ">
            <TouchableOpacity
            onPress={incrementTripDays}
                style={{
                    width:210,
                    height:51,
                    borderRadius:8,
                    marginHorizontal:10,
                    backgroundColor:"rgba(0,0,0,0.4)"
                }}
                className="flex-col justify-center items-center"
            >
                <Plus size={24} color={"rgba(255,255,255,0.8)"} />
                <Text
                    style={{
                        color:"white",
                        opacity:0.8
                    }}
                >增加一天</Text>
            </TouchableOpacity>
            <NestableScrollContainer
                ref={dragScrollRef}
                onContentSizeChange={()=>{
                    dragScrollRef?.current.scrollToEnd()
                }}
                className="flex-1 ">
            <NestableDraggableFlatList
                data={data}
                onDragEnd={({ data }) => {
                    console.log(data)
                    let newPlacesPlan = transformToDailyPlacesObject(data)
                    console.log(newPlacesPlan)
                    setPlacesPlan(newPlacesPlan)
                }}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            >

            </NestableDraggableFlatList>
            </NestableScrollContainer>
        </View>
      </BlurView>
    </Modal>
  )
}

export default SlidingModal