import { View, Text, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, MapPin, PencilLine, Share2 } from 'lucide-react-native'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import DaysFilter from '../components/DaysFilter'


const editModeSnapPoints = [330, 600]
const notEditModeSnapPoints = [330]

const RoadBookEditScreen = ({navigation, route}) => {

    const {roadBookItem} = route.params
    console.log(roadBookItem)

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
                                    <Text className="font-semibold mt-2" style={{fontSize:14, color:'#7C8697'}}>{place.detailedName}</Text>
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
    )
}

export default RoadBookEditScreen