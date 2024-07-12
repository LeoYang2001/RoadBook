import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { pageLayout, themeColors } from '../constant';
import Filter from '../components/Filter';
import RoadBook from '../components/RoadBook';
import * as Haptics from 'expo-haptics';
import { getRoadBook, getUser } from '../src/graphql/queries';
import * as subscriptions from '../src/graphql/subscriptions';
import { deleteRoadBook, updateUser } from '../src/graphql/mutations';

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



const MainScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [selectionId, setSelectionId] = useState(1)
  const [roadBookList, setRoadBookList] = useState([])





  useEffect(() => {
    fetchRoadBookList()
  }, []);

  useEffect(() => {
    const updateRoadBookList = API.graphql({query: subscriptions.onUpdateUser}).subscribe({
      next:({provider, value}) => {
        // console.log({provider, value})
        console.log('user updated')
        const roadBookListIds = value.data.onUpdateUser.roadBookList
        fetchRoadBookListByIds(roadBookListIds)
      },
      error: (error) => console.warn(error)
    })
    return () => {
      if (updateRoadBookList) updateRoadBookList.unsubscribe();
    }
  }, [])
  

  const fetchRoadBookListByIds = async (userRoadBookList)=>{
     // Step 3: Fetch the RoadBooks using the roadBook_id list
     const roadBookPromises = userRoadBookList.map(roadBookId => 
      API.graphql(graphqlOperation(getRoadBook, { id: roadBookId }))
    );

    const roadBooksResponses = await Promise.all(roadBookPromises);
    const roadBooks = roadBooksResponses.map(response => {
      const jsObject = response.data.getRoadBook
      return {
        ...jsObject,
        placesPlan: JSON.parse(jsObject.placesPlan)
      }
    });
    setRoadBookList(roadBooks.reverse())
  }


  const fetchRoadBookList = async ()=>{
      try {

         // Step 1: Get the current authenticated user's information

        const userInfo = await Auth.currentAuthenticatedUser();
        if(!userInfo)
        {
          throw new Error('User not authenticated')
        }
        setUser(userInfo)
        const userId = userInfo.attributes.sub

         // Step 2: Fetch the user's roadBookList

        const userResponse = await API.graphql(graphqlOperation(getUser, {id : userId}))
        const userRoadBookList = userResponse.data.getUser.roadBookList

        if (!userRoadBookList || userRoadBookList.length === 0) {
          return []; // Return an empty array if the user has no roadbooks
        }

       await fetchRoadBookListByIds(userRoadBookList)

      } catch (error) {
        console.error('Error fetching RoadBook list:', error);
        throw new Error('Failed to fetch RoadBook list');
      }
  }

 
  const handleRoadBookEdit = (roadBookItem) => {
    navigation.navigate('RoadBookEdit', {
      roadBookItem:roadBookItem
  })
  }

  const handleRoadBookDelete = async(roadBookItem) => {
    let userId = user.attributes.sub
    let roadBookIdToDelete = roadBookItem.id
    try {
      // Step 1: Update User's roadBookList by removing the deletedId
      const updatedUser = await API.graphql(graphqlOperation(getUser, { id: userId }));
      const updatedRoadBookList = updatedUser.data.getUser.roadBookList.filter(id => id !== roadBookIdToDelete);

      await API.graphql(graphqlOperation(updateUser, { input: { id: userId, roadBookList: updatedRoadBookList } }));

       // Step 2: Delete RoadBook from roadBookList table
      await API.graphql(graphqlOperation(deleteRoadBook, { input: { id: roadBookIdToDelete } }));

      console.log(`RoadBook ${roadBookIdToDelete} deleted successfully.`);

    } catch (error) {
      console.log(error)
    }

  }

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const createNewRoadBook = ()=>{
    Haptics.selectionAsync()
    navigation.navigate('NewRoadBook')
  }


  if (!user) {
    return null; 
  }

  return (
    <SafeAreaView style={{backgroundColor:themeColors.backgroundColor}} className="flex-1" >
      <View style={{paddingHorizontal:pageLayout.paddingHorizontal, paddingTop: pageLayout.paddingVertical}} className=" flex-1  flex-col  ">
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
         <View className="flex-1  pt-4 overflow-hidden  ">
          <ScrollView showsVerticalScrollIndicator={false}  className=" overflow-visible">
            {
              roadBookList.map((roadBookItem) => (
                <RoadBook handleRoadBookDelete={handleRoadBookDelete} handleRoadBookEdit={handleRoadBookEdit} key={roadBookItem.id} roadBookItem={roadBookItem} />
              ))
            }
          </ScrollView>
         </View>
      </View>
    </SafeAreaView>
  );
};


export default MainScreen;
