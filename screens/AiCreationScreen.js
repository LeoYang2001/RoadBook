import { View, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity, ScrollView, TextInput, Platform, Pressable, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft } from 'lucide-react-native'
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import AiInputArea from '../components/AiInputArea';
import OpenAI from "openai";
import { formatAiPrompt, generateRoadbook } from '../AiFunctionUtilities';
import { formatDate } from '../utility';

const CHATGPT_KEY = process.env.EXPO_PUBLIC_CHATGPT_KEY

const openai = new OpenAI(
  {
    apiKey: CHATGPT_KEY,
    dangerouslyAllowBrowser: true,
  }
);







const ChatReplyItem = ({
  role,
  text,
  roadbook,
  navigation
}) => {

  const [placesCount, setPlacesCount] = useState(0)


  if(roadbook){

    let days = Object.keys(roadbook.placesPlan).length
    
    let createdAt = formatDate(new Date().toISOString())

    useEffect(() => {
      let {placesPlan} = roadbook
      setPlacesCount(0)
      for(let dayth in placesPlan)
      {
        setPlacesCount(prev => prev + placesPlan[dayth].length)
      }
    }, [])

    return (
      <View
      className="  flex-row justify-start">
        <View style={{
          maxWidth:340,
          backgroundColor:'rgba(228, 232, 239, 0.6)',
          paddingVertical:12,
          paddingHorizontal:20,
          borderRadius:16,
          borderBottomLeftRadius:0,
          marginBottom:24
  
        }} className="">
        <Text
          style={{
            color:'#38404D'
          }}
        >帮你生成了这份路上，请查看</Text>
        <TouchableOpacity 
        onPress={()=>{
          
          const {city, location, tripDays, roadbookName, placesPlan} = roadbook
          navigation.navigate('MapMain', {location:location, city:city, tripDays:tripDays,placesPlan:placesPlan, roadbookName:roadbookName, ifGeneratedByAi:true})
          }}
        
        style={{
          height:104,
          width:290,
          borderRadius:8
        }}
          className=' bg-white mt-2 flex-row items-center  p-3 items-center'
        >
          <Image 
            source={require('../assets/RoadBookMapPic.png')}
          />
          <View className=" flex-1 h-full ml-4 flex-col justify-between">
              <View >
                  <Text
                    style={{
                      fontSize:16,
                      color:"#4D5561"
                    }}
                    className="font-semibold"
                  >{roadbook.roadbookName}</Text>
                  <Text style={{fontSize:12, color:'#ADB5C3'}}  className="mt-1">
                  {days}天 | {placesCount}个活动点
              </Text>
              </View>
              <Text
              style={{fontSize:12, color:'#ADB5C3'}}
              >{createdAt}</Text>
          </View>
          </TouchableOpacity>
        </View>
  </View>
    )
  
  }
  if(!text) return
  return(
    <>
      {
        role ==='gpt' ? (
          <View
          className="  flex-row justify-start">
            <View style={{
              maxWidth:340,
              backgroundColor:'rgba(228, 232, 239, 0.6)',
              paddingVertical:12,
              paddingHorizontal:20,
              borderRadius:16,
              borderBottomLeftRadius:0,
              marginBottom:24

            }} className="">
            <Text
              style={{
                color:'#38404D'
              }}
            >{text}</Text>
            </View>
    </View>
        ):(
          <View className="  flex-row justify-end">
      <View style={{
        maxWidth:340,
        backgroundColor:'#222833',
        paddingVertical:12,
        paddingHorizontal:20,
        borderRadius:16,
        borderBottomRightRadius:0,
        marginBottom:24

      }} className="">
      <Text
        style={{
          color:'#fff'
        }}
      >{text}</Text>
      </View>
    </View>
        )
      }
    </>
  )
}

const AiCreationScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    
  ]);
  const [chatWindowHeight, setChatWindowHeight] = useState(0);
  const [actualChatWindowHeight, setActualChatWindowHeight] = useState(0)
  const [isGeneratingRoadbook, setIsGeneratingRoadbook] = useState(false)
  // inputMode: main => roadBookGeneration placesRecommendation, travelingAdvice roadBookImprovement
  const [inputMode, setInputMode] = useState('main')

  const chatWindowRef = useRef(null)

 

  const fetchAiResponse = async (msg) => {
    setInputMode('main')
    const completion = await openai.chat.completions.create({
      messages:[
        {role:'system', content:'You are a travel planning assistant.'},
        {role: "user", content: msg}
      ],
      model:'gpt-4o-mini'
    })
    const response = completion.choices[0]
    return JSON.stringify(response)
  }

  const sendAiResponse = async (inputText, promptAttributes) => {
    const aiGeneratedRoadbook = await generateRoadbook(inputText, promptAttributes)
    
    let newMsg = {
      role:'gpt',
      text: inputText,
      id: Date.now().toString(),
      roadbook: aiGeneratedRoadbook
    }
    setIsGeneratingRoadbook(false)
    if (inputText.trim().length > 0) {
      setMessages(prevMessages => [...prevMessages, newMsg]);
    }
  }


  const sendMessage = async (role, inputText, promptAttributes) => {
    if(role === 'user')
    {
      let newMsg = {
        role:role,
        text: inputText,
        id: Date.now().toString()
      }
      if (inputText.trim().length > 0) {
        setMessages(prevMessages => [...prevMessages, newMsg]);
      }
      setIsGeneratingRoadbook(true)
      // fetching ai response
      let aiPromptMsg = formatAiPrompt(promptAttributes)
      const responseFromAi = await fetchAiResponse(aiPromptMsg)
      sendAiResponse(responseFromAi, promptAttributes)
    }
    else{
      let newMsg = {
        role:role,
        text: inputText,
        id: Date.now().toString()
      }
      if (inputText.trim().length > 0) {
        setMessages(prevMessages => [...prevMessages, newMsg]);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#F5F6F8' }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* HEADER */}
        <BlurView intensity={50} style={{ paddingTop: 64 }} className="flex-row z-10 absolute w-full   px-4 py-4 items-center justify-between">
          <TouchableOpacity
            onPress={() => {
              Haptics.selectionAsync()
              navigation.goBack()
            }}
            className=" ">
            <ChevronLeft size={24} color={'#1D2129'} />
          </TouchableOpacity>
          <Text style={{ fontSize: 17, color: "#1D2129" }}>
            AI创建
          </Text>
          <View className="">
            <ChevronLeft size={24} color={'transparent'} />
          </View>
        </BlurView>
        <View className="flex-1 flex justify-center items-center">
          <ScrollView
            ref={chatWindowRef}
            onContentSizeChange={()=>{
              if(messages.length > 2)
              {
                chatWindowRef?.current?.scrollToEnd()
              }
            }}
            style={{ flex: 1, width: '100%', }}
            showsVerticalScrollIndicator={false}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setChatWindowHeight(height);
            }}
          >
          <View
          style={{
            marginTop:120,
          }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setActualChatWindowHeight(height)
          }}
          onStartShouldSetResponder={()=> true}
          className="flex-1   px-4">
                {/* FIRST MESSAGE  */}
                {
                  messages.length === 0 ? (
                    <View
                style={{
                  height:54,
                  marginBottom:24
                }}
                className="flex-1  flex-row items-center justify-start px-4">
                  <View
                  style={{
                    width:15,
                    height:15,
                    backgroundColor:'rgba(0,0,0,0.3)'
                  }}
                    className="flex justify-center items-center rounded-full mr-2"
                  >
                    <View
                      style={{
                        width:7,
                        height:7,
                        backgroundColor:'rgba(0,0,0,0.6)'
                      }}
                      className=" rounded-full"
                    />
                  </View>
                  <Text
                  className="font-semibold"
                    style={{
                      fontSize:24,
                      color:'#222833'
                    }}
                  >有什么我可以帮你的?</Text>
              </View> 
                  ):(
                    <ChatReplyItem
                    role={'gpt'}
                    text={'有什么我可以帮你的'}
                    key={Date.now().toString()}
                    
                    />
                  )
                }

            {messages.map(message => (
              //   <View  key={message.id} style={{ padding: 10, backgroundColor: '#fff', marginVertical: 5, borderRadius: 5, alignSelf: 'stretch', marginHorizontal: 10 }}>
              //   <Text>{message.text}</Text>
              // </View>
              <ChatReplyItem
                key={message.id}


                role={message.role}
                text={message.text}
                roadbook={message?.roadbook}
                navigation={navigation}
              />
            ))}
            {
              isGeneratingRoadbook && (
                <ChatReplyItem 
                  key={'generatingRoadbookID'}
                  role={'gpt'}
                  text={'正在帮你生成路书...'}
                  />
              )
            }
              </View>
           {
            (actualChatWindowHeight < chatWindowHeight) && (
              <Pressable
              style={{
                height:chatWindowHeight - actualChatWindowHeight - 120
              }}
              className="w-full bg-transparent" />
            )
           }
          </ScrollView>
        </View>
        <AiInputArea 
            chatWindowRef={chatWindowRef}
            sendMessage={sendMessage}
            inputMode={inputMode}
            setInputMode={setInputMode}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default AiCreationScreen
