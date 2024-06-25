import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, TextInput } from 'react-native'
import React from 'react'
import { pageLayout, themeColors } from '../contants'
import { ChevronLeft, Image } from 'lucide-react-native'

const NewRoadBook = ({navigation}) => {
  return (
    <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
>
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
                            <TextInput placeholder='请输入名称' style={{height:40, width:235, borderRadius:8, backgroundColor:'#F3F4F7'}} className=" ml-4 text-right px-4" />
                        </View>
                        <View className="flex flex-row justify-end items-center">
                            <Text style={{color:'#4D5561'}}>目的地</Text>
                            <TextInput placeholder='请选择目的地' style={{height:40, width:235, borderRadius:8, backgroundColor:'#F3F4F7'}} className=" ml-4 text-right px-4" />
                        </View>
                        <View className="flex flex-row justify-end items-center">
                            <Text style={{color:'#4D5561'}}>天数</Text>
                            <TextInput placeholder='天数' style={{height:40, width:235, borderRadius:8, backgroundColor:'#F3F4F7'}} className=" ml-4 text-right px-4" />
                        </View>
                    </View>
                  
                </View>
                <TouchableOpacity style={{backgroundColor:'#222833',height:50, borderRadius:16}} className="justify-center items-center flex mt-10" >
                        <Text className="text-white">开始创建新的路书</Text>
                </TouchableOpacity>
            </View>
            
    </KeyboardAvoidingView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default NewRoadBook