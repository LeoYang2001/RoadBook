import { View, Text, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, EllipsisVertical, MapPin, PencilLine, Share2 } from 'lucide-react-native'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import DaysFilter from '../components/DaysFilter'
import MapWindow from '../components/MapWindow'
import CustomMarker from '../components/CustomMarker'
import * as Haptics from 'expo-haptics';
import EditMarker from '../components/EditMarker'
import PlacesDetailEdit from '../components/PlacesDetailEdit'
import PlacesDetailEditMode from '../components/PlacesDetailEditMode'


const editModeSnapPoints = [330, 730]
const notEditModeSnapPoints = [330]

const RoadBookEditScreen = ({navigation, route}) => {

  const {roadBookItem} = route.params

    const [contentHeight, setContentHeight] = useState(330)
    const [snapPoints, setSnapPoints] = useState(notEditModeSnapPoints)
    const [ifEditMode, setIfEditMode] = useState(false)
    const [ifKeyBoard, setIfKeyBoard] = useState(false)
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
        setContentHeight(editModeSnapPoints[index])
    },[])

    useEffect(() => {
        if(ifKeyBoard)
        {
            setSnapPoints(notEditModeSnapPoints)
        }
        else{
            setSnapPoints(editModeSnapPoints)
            handleSnapPress(0)
        }
    }, [ifKeyBoard])
    

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
            <View className="  flex flex-row justify-between items-center top-14 z-10  w-full absolute px-4">
                <View className=" flex   flex-row items-center">
                <TouchableOpacity
                  onPress={()=>{
                    navigation.goBack()
                    Haptics.selectionAsync()
                  }}
                  className=" p-2"
                >
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
                            <View 
                            className="flex-row justify-center items-center"
                            style={{
                                width:84,
                                height:32,
                                borderRadius:4,
                                backgroundColor:'#FA541C'
                            }}
                               
                            >
                                <TouchableOpacity
                                className="flex-1 flex  justify-center items-center"
                                 onPress={()=>{
                                    handleEditMode(false)
                                    Haptics.selectionAsync()
                                    setIfKeyBoard(false)
                                }}
                                >
                                    <Text
                                        style={{
                                            color:"#fff",
                                            size:14
                                        }}
                                    >保存</Text>
                                </TouchableOpacity>
                                <TouchableOpacity

                                    style={{
                                        width:26,
                                        borderLeftWidth:1,
                                        borderColor:'#ffffff20'
                                    }}
                                    className=" h-full flex justify-center items-center"
                                >
                                <EllipsisVertical 
                                    color={'#fff'}
                                    size={14}
                                />
                                </TouchableOpacity>
                            </View>
                    </View>
                    ):(
                        <View className=" flex  flex-row items-center gap-4">
                            <TouchableOpacity
                            onPress={()=>{
                                handleEditMode(true)
                                Haptics.selectionAsync()
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
            <View className=" flex-1 bg-red-50 " style={{marginBottom:330}}>
                    <MapWindow 
                        placesWithGeometry={placesList}
                        location={placesList[0]?.location}
                        ifDirections={true}
                        CustomMarker={EditMarker}
                    />
                    
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
                {
                    ifEditMode ? (
                    <PlacesDetailEditMode
                                    contentHeight={contentHeight}
                                    roadBookItem={roadBookItem}
                                    curDay={curDay}
                                    setCurDay={setCurDay}
                                    placesList={placesList}
                                    setIfKeyBoard={setIfKeyBoard}
                                />
                    ) : (
                        <PlacesDetailEdit
                        contentHeight={contentHeight}
                        roadBookItem={roadBookItem}
                        curDay={curDay}
                        setCurDay={setCurDay}
                        placesList={placesList}
                    />
                    )
                }
                
            </BottomSheetModal>
        </View>
        
        </BottomSheetModalProvider>
    )
}

export default RoadBookEditScreen