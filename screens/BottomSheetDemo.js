import { View, Text, Image, TouchableOpacity, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, MapPin, PencilLine, Share2 } from 'lucide-react-native'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import DaysFilter from '../components/DaysFilter'

const roadBookItem = {
    createdAt: "2024-07-11T15:42:37.600Z",
     name: "第二份路书", 
     placesPlan: {
        'day1':[{
            detailedName:'上海市黄浦区中山东二路1号',
            location:{
                lat:31.238196,
                lng:121.499768
            },
            main_text:'外滩轮渡口',
            place_id:'cd176d78a38dc841e215f9bb'
        },
        {
            detailedName:'上海市黄浦区中山东二路3号',
            location:{
                lat:31.238196,
                lng:121.499768
            },
            main_text:'外滩轮渡口',
            place_id:'cd176d78a38dc841e215f9bc'
        },
        {
            detailedName:'上海市黄浦区中山东二路3号',
            location:{
                lat:31.238196,
                lng:121.499768
            },
            main_text:'外滩轮渡口',
            place_id:'cd176d78a38dc841e215f9bh'
        },
        {
            detailedName:'上海市黄浦区中山东二路3号',
            location:{
                lat:31.238196,
                lng:121.499768
            },
            main_text:'外滩轮渡口',
            place_id:'cd176d78a38dc841e215f9bs'
        }
        ],
        'day2':[{
            detailedName:'上海市黄浦区中山东二路1号',
            location:{
                lat:31.238196,
                lng:121.499768
            },
            main_text:'外滩轮渡口day2',
            place_id:'cd176d78a38dc841e215f9bb'
        }],
     }
   }

const editModeSnapPoints = [330, 600]
const notEditModeSnapPoints = [330]

const BottomSheetDemo = ({}) => {

    
    const [contentHeight, setContentHeight] = useState(330)
    const [snapPoints, setSnapPoints] = useState(notEditModeSnapPoints)
    const [ifEditMode, setIfEditMode] = useState(false)
    const [curDay, setCurDay] = useState(1)
    const [placesList, setPlacesList] = useState(roadBookItem.placesPlan[`day${curDay}`])

    const bottomSheetRef = useRef(null)


    useEffect(() => {
        setPlacesList(roadBookItem.placesPlan[`day${curDay}`])
    }, [curDay])
    


    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
      }, []);

    useEffect(() => {
      handlePresentModal()
    }, [])
    



    const handlePresentModal = () => {
        bottomSheetRef.current?.present()
    }

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index)
        setContentHeight(editModeSnapPoints[index])
    },[])

    const handleEditMode = (ifEditMode)=>{
        handleSnapPress(0)
        if(ifEditMode)
        {
            setIfEditMode(true)
            setSnapPoints(editModeSnapPoints)
        }
        else{
            setIfEditMode(false)
            setSnapPoints(notEditModeSnapPoints)
        }
    }

    return (
        <View className="flex-1">
            <BottomSheetModalProvider>
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
                    {roadBookItem.name}
                </Text>
                </View>
                {
                    ifEditMode ? (
                        <View className=" flex  flex-row items-center gap-4">
                            <TouchableOpacity 
                                onPress={()=>{
                                    handleEditMode(false)
                                }}
                            >
                                <Text>保存</Text>
                            </TouchableOpacity>
                    </View>
                    ):(
                        <View className=" flex  flex-row items-center gap-4">
                            <TouchableOpacity
                            onPress={()=>{
                                handleEditMode(true)
                            }}
                        >
                            <PencilLine  size={24} color={"#38404D"}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Share2 size={24} color={"#38404D"}  />
                        </TouchableOpacity>
                    </View>
                    )
                }
            </View>
             {/* height adjustable when keyboard is being displayed  */}
            <View className="border flex-1  bg-red-50" style={{
                marginBottom:330
            }}>
                
            </View>
            <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={{
                borderRadius:0
            }}
            enablePanDownToClose={false}
            >
            <View style={{height: contentHeight, gap:12}} className="bg-white  pt-5 pb-9 px-4 flex-col  ">
                <DaysFilter placesPlan={roadBookItem.placesPlan} curDay={curDay} setCurDay={setCurDay} incrementTripDays={()=>{}} ifFinishedEditing={true} />
                 <View className="flex-1 ">
                    <ScrollView>
                    {
                   placesList.map((place, index) => (
                    <View
                    key={place.place_id}
                    className="relative   flex-row items-center "
                    style={{height:72}} 
                    >
                        <>
                        {
                           !( placesList.length === index + 1) && (
                            <View
                            style={{width:0, borderWidth:1 , height:'60%', borderColor:'#E4E8EF', left:20, top:'50%', }}
                                className="absolute" />
                           )
                        }
                            <TouchableOpacity

                            style={{
                                padding:14
                            }} className=" flex-row items-start">
                                <View style={{borderWidth:2, width:14, height:14, borderColor:'#FA541C', borderRadius:14, marginRight:12, marginTop:4}}></View>
                                   <View className=" flex-col flex justify-between ">
                                   <Text className="font-semibold" style={{fontSize:18, color:'#38404D'}}>{place.main_text}</Text>
                                   <View className=" flex flex-row items-center  mt-2">
                                    <MapPin size={16} color={'#7C8697'} style={{
                                        marginTop:5
                                    }}  />
                                    <TextInput 
                                        className="border w-full"
                                    />
                                   </View>
                                   </View>
                                </TouchableOpacity>
                        </>
                        </View>
                ))
                }
                    </ScrollView>
                 </View>
            </View>
            </BottomSheetModal>
        </View>
        </BottomSheetModalProvider>
        </View>
    )
}

export default BottomSheetDemo