import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import DraggableFlatList, { NestableDraggableFlatList, NestableScrollContainer, ScaleDecorator } from "react-native-draggable-flatlist";
import * as Haptics from 'expo-haptics';




export default function DragAndSort({
    setIfDraging,
    placesList,
    curDay,
    handleShowHeader,
    handleUpdatePlacesPlan

}) {
  const [data, setData] = useState(placesList);
  console.log(placesList)
  const [ifShowLeftBar, setIfShowLeftBar] = useState(true)

  const dragScrollRef = useRef(null)

 
  

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={()=>{
            Haptics.selectionAsync()
            setIfDraging(true)
            setIfShowLeftBar(false)
            drag()
          }}
          disabled={isActive}
          style={{
            height:58, 
        }}
        >
           <View
            style={{
                paddingHorizontal: 14
            }} className=" flex-1 flex-col items-start  ">
                <View className="  flex-row flex justify-start  items-center  w-full  flex-1">
                <View 
                            style={{
                                width:1,
                                borderLeftWidth:1,
                                height: 34,
                                left:7,
                                top:29,
                                opacity:ifShowLeftBar ? 1 : 0,
                                borderColor:'#E4E8EF',
                            }}
                        />
                        <View style={{
                            borderWidth:2, width:14, height:14, borderColor:'#FA541C', borderRadius:14, marginRight:12, marginTop:4,
                            backgroundColor:isActive ? '#FA541C' :'transparent'
                            
                            }}/>
                        <Text className="font-semibold" style={{fontSize:18, color:'#38404D'}}>{item.main_text}</Text>
                </View>
                </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <NestableScrollContainer
    ref={dragScrollRef}
    onContentSizeChange={()=>{
        dragScrollRef?.current.scrollToEnd()
    }}
    className="flex-1  px-4  ">
        <NestableDraggableFlatList
        className=" overflow-visible"
        data={data}
        onDragEnd={({ data }) => {
            setData(data)
            setIfDraging(false)
            setIfShowLeftBar(true)
            handleUpdatePlacesPlan(curDay, placesList=data)
            
        }}
        keyExtractor={(item) => item.timeId}
        renderItem={renderItem}
        />
                  <View
              className="relative flex-row items-center "
              style={{
                  height:58,
                  marginBottom:30
              }}
              >
                      <View
                      style={{
                          paddingHorizontal: 14,
                      }} className=" flex-1 flex-col items-start ">
                          <View className="  flex-row flex justify-start  items-center   flex-1">
                                  <View style={{borderWidth:2, width:14, height:14, borderColor:'#FA541C', borderRadius:14, marginRight:12, marginTop:4}}/>
                                  <TouchableOpacity
                                      onPress={()=>{
                                          handleShowHeader()
                                      }}

                                      style={{
                                          height:44,
                                          flex:1,
                                          backgroundColor:"#F3F4F7",
                                          borderRadius:12
                                      }}
                                      className="flex justify-center pl-4"
                                  >
                                      <Text
                                          style={{
                                              color:"#A8AFBC"
                                          }}
                                      >
                                          为D{curDay}添加第{placesList.length + 1}个地点
                                      </Text>
                                  </TouchableOpacity>
                          </View>
                          </View>
                  </View>
    </NestableScrollContainer>
  );
}
