import { View, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
import { ChevronLeft } from 'lucide-react-native'

const AiCreationScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       <KeyboardAvoidingView 
        style={{
            backgroundColor:'#F5F6F8'
        }}
       className='flex-1 '>
        <View style={{
            paddingTop:64
        }} className=" flex-row  absolute w-full border px-4 py-4 items-center justify-between">
          <TouchableOpacity className=" ">
            <ChevronLeft  size={24} color={'#1D2129'} />
          </TouchableOpacity>
            <Text
                style={{
                    fontSize:17,
                    color:"#1D2129"
                }}
            >
                AI创建
            </Text>
            <View className="">
            <ChevronLeft  size={24} color={'transparent'} />
          </View>
        </View>
       </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default AiCreationScreen