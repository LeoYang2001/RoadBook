import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { pageLayout, themeColors } from '../contants';
import Filter from '../components/Filter';
import RoadBook from '../components/RoadBook';


const MainScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [selectionId, setSelectionId] = useState(1)

  const selections = [
    {
        id:1,
        name:'初来乍到'
    },
    {
        id:2,
        name:'心愿'
    },
    {
        id:3,
        name:'完成'
    },
    {
        id:4,
        name:'管理我的夹子'
    }
]

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUser(userInfo);
      if (!userInfo.attributes.name || !userInfo.attributes.picture) {
        navigation.navigate('ProfileSetup');
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const createNewRoadBook = ()=>{
    navigation.navigate('NewRoadBook')
  }


  if (!user) {
    return null; 
  }

  return (
    <SafeAreaView style={{backgroundColor:themeColors.backgroundColor}} className="flex-1" >
      <View style={{paddingHorizontal:pageLayout.paddingHorizontal, paddingVertical: pageLayout.paddingVertical}} className=" flex-1  flex-col  ">
         <View className="  flex flex-row items-center">
            <TouchableOpacity onPress={openDrawer}>
              <Image
                source={{ uri: user.attributes.picture }}
                style={{ width: 42, height: 42, borderRadius: 8}}
              />
            </TouchableOpacity>
            <View className="ml-3 flex-col justify-between mr-auto" >
              <Text className=" font-semibold text-gray-600">
                {user.attributes.name}
              </Text>
              <Text className="   text-gray-400">
                12篇路书3个夹子
                </Text>
            </View>
            <TouchableOpacity 
            onPress={createNewRoadBook}
            style={{width:67, height:30, borderRadius:31, backgroundColor:'#222833'}} className=" flex-row justify-center items-center ">
              <Image
                source={require('../assets/magicStick.png')}
              />
              <Text className=" text-white ml-1">
                AI
              </Text>
            </TouchableOpacity>
         </View>
         <View className="mt-8">
          <Text style={{lineHeight:20, color:'#ADB5C3'}}>
            最近
          </Text>
         </View>
         <View style={{height:174}} className="mt-4 ">
         <ScrollView  showsHorizontalScrollIndicator={false} horizontal className=" overflow-visible gap-4 ">
           <TouchableOpacity style={{height:174, width:207, borderRadius:12, backgroundColor:'#F9F9F9'}} className="shadow-lg ">
            <View style={{height:110, backgroundColor:'white', borderTopLeftRadius:12, borderTopRightRadius:12}} className=" flex flex-col p-4 justify-around">
              <Text style={{fontSize:18}} className=" font-bold">
                Road Book
              </Text>
              <Text style={{fontSize:18}} className="  font-semibold">

                使用指南
              </Text>
              <TouchableOpacity style={{width:51, height:22, backgroundColor:themeColors.primaryColor, borderRadius:8}} className="flex flex-row  justify-center items-center" >
                <Text style={{fontSize:12}} className="font-bold text-white ">
                查收
                </Text>
              </TouchableOpacity>
            </View>
            <View className="p-4">
              <Text  style={{fontSize:16}} className="font-semibold">
                嗨！新来的先看看这
              </Text>
            </View>
           </TouchableOpacity>
           <TouchableOpacity style={{height:174, width:207, borderRadius:12}} className="shadow-lg  bg-white">
            <Text>demo</Text>
           </TouchableOpacity>
         </ScrollView>
         </View>
         <View className="z-20">
         <Filter setSelectionId={setSelectionId} selectionId={selectionId} selections={selections}/>
         </View>
         <View className="flex-1  pt-4 overflow-hidden ">
          <ScrollView  className=" overflow-visible">
            <RoadBook/>
            <RoadBook/>
          </ScrollView>
         </View>
      </View>
    </SafeAreaView>
  );
};


export default MainScreen;
