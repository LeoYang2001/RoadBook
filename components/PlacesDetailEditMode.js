import React, { useEffect, useRef, useState } from 'react'
import DaysFilter from './DaysFilter'
import { View, Text, Image, TouchableOpacity, Pressable, ScrollView, TextInput } from 'react-native'
import { MapPin } from 'lucide-react-native'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import KeyBoardToolBar from './KeyBoardToolBar'





const PlaceEditModeItem = ({place, index, placesList, editHighlightId, setEditHighlightId ,setIfKeyBoard, editMode, setEditMode}) => {
    const ifEdit = editHighlightId === index + 1

    const [inputMode, setInputMode] = useState('note')
    const [note, setNote] = useState('')

    const noteInputRef = useRef(null)

    useEffect(() => {
      setEditMode('ready')
    }, [editHighlightId])


    const handleStartEditing = () => {
        setEditMode('editing')
        setTimeout(()=>{
            if(noteInputRef)
                {
                    noteInputRef.current.focus()
                }
        },0)
    }
    
    return (
        <View
                key={place.place_id}
                    className="relative flex-row items-center "
                    >
                        <>
                            <View
                          
                            style={{
                                paddingHorizontal: 14
                            }} className=" flex-1 flex-col items-start ">
                                   <TouchableOpacity
                                   
                                   onPress={()=>{
                                    setEditHighlightId(index+1)
                                }}className="  flex-row flex justify-start  flex-1">
                                        <View style={{borderWidth:2, width:14, height:14, borderColor:'#FA541C', backgroundColor: ifEdit ? '#FA541C':"#fff", borderRadius:14, marginRight:12, marginTop:4}}/>
                                        <Text className="font-semibold" style={{fontSize:18, color:'#38404D'}}>{place.main_text}</Text>
                                   </TouchableOpacity>

                                   <View style={{
                                    marginLeft: 7,
                                    borderLeftWidth: index === placesList.length - 1 ? 0 : 1 ,
                                    paddingLeft:20,
                                    borderColor:'#E4E8EF'
                                   }} className=" flex-col  w-full  py-4  ">
                                            {/* display when being highlighted and editMode is ready  */}
                                            {
                                                (ifEdit && editMode === 'ready') && (
                                                    <View style={{
                                                        width:216,
                                                        height:36,
                                                        backgroundColor:"#F3F4F7",
                                                        borderRadius:4
                                                    }} className=" flex-row  justify-between items-center my-2">
                                                        <TouchableOpacity
                                                            className="flex-1  flex justify-center items-center"
                                                            onPress={handleStartEditing}
                                                        >
                                                            <Text
                                                                style={{
                                                                    color:"#7C8697"
                                                                }}
                                                            >编辑详情</Text>
                                                        </TouchableOpacity>
                                                        <View 
                                                            style={{
                                                                height:19.5,
                                                                width:1,
                                                                backgroundColor:'#D0D5DF'
                                                            }}
                                                        />
                                                        <TouchableOpacity
                                                       className="flex-1  flex justify-center items-center"
                                                        >
                                                            <Text
                                                              style={{
                                                                color:"#7C8697"
                                                            }}
                                                            >修改地点</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }
                                            {/* display when editMode is editing  */}
                                            {
                                                ((ifEdit && editMode === 'editing') || note) && (
                                                    <View
                                                    className="px-2 flex-row items-center my-2"
                                                    style={{
                                                        backgroundColor:editMode === 'ready' ? '#F1F4FF90':'#FFF8F6',
                                                        height:36,
                                                        borderRadius:2
                                                    }}
                                                >
                                                {
                                                    editMode === "ready" ? (
                                                        <Image  
                                                    className="mr-2"
                                                style={{
                                                    width:20,
                                                    height:20
                                                }} source={require('./../assets/quote-disabled.png')} />
                                                    ):(
                                                        <Image  
                                                    className="mr-2"
                                                style={{
                                                    width:20,
                                                    height:20
                                                }} source={require('./../assets/quote.png')} />
                                                    )
                                                }
                                                <BottomSheetTextInput 
                                                    editable={editMode !== 'ready'}
                                                    style={{
                                                        flex:1,
                                                        height:'100%',
                                                        color:'#7C8697',
                                                        fontSize:12
                                                    }}
                                                    value={note}
                                                    ref={noteInputRef}
                                                    onChangeText={(text)=>{
                                                        setNote(text)
                                                    }}
                                                    onFocus={()=>{
                                                        setIfKeyBoard(true)
                                                    }}
                                                    onBlur={()=>{
                                                        setIfKeyBoard(false)
                                                        setEditMode('ready')
                                                    }}
                                                />
                                            </View>
                                                )
                                            }
                                        <View className=" flex-row items-center  w-full">
                                        <MapPin size={16} color={'#7C8697'} style={{
                                            marginTop:5,
                                            marginRight:2
                                        }}  />
                                        <Text 
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        className=" mt-2" style={{fontSize:14, color:'#7C8697'}}>{place.detailed_name}</Text>
                                        </View>
                                   </View>
               
                                </View>
                               
                        </>
                        </View>
    )
}



const PlacesDetailEditMode = ({
    contentHeight,
    roadBookItem,
    curDay,
    setCurDay,
    placesList,
    setIfKeyBoard,
    
}) => {

    const [editHighlightId, setEditHighlightId] = useState(1)
    const [editMode, setEditMode] = useState('ready')

    useEffect(() => {
      setEditHighlightId(1)
    }, [curDay])
    
    
  return (
    <View style={{height: contentHeight, gap:12}} className="bg-white  pt-5  pb-9  flex-col  ">
                <View style={{gap:12}} className="flex-1 px-4  flex-col ">
                <DaysFilter placesPlan={roadBookItem.placesPlan} curDay={curDay} setCurDay={setCurDay} incrementTripDays={()=>{}} ifFinishedEditing={true} />
                 <View className="flex-1 ">
                    {
                      placesList && (
                        <ScrollView>
                    {
                   placesList.map((place, index) => (
                    <PlaceEditModeItem 
                        key={place.place_id}
                        place={place}
                        index={index}
                        placesList={placesList}
                        editHighlightId={editHighlightId}
                        setEditHighlightId={setEditHighlightId}
                        setIfKeyBoard={setIfKeyBoard}
                        editMode={editMode}
                        setEditMode={setEditMode}
                    />
                ))
                }
                    </ScrollView>
                      )
                    }
                  
                 </View>
                </View>
                {
                    editMode === 'editing' && (
                        <KeyBoardToolBar />
                    )
                }
            </View>
  )
}


export default PlacesDetailEditMode

