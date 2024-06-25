import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import { Auth } from 'aws-amplify';

const DrawerScreen = ({navigation}) => {

const Drawer = createDrawerNavigator();

const handleSignOut = async () => {
    try {
      await Auth.signOut();
      console.log('User signed out');
      navigation.navigate('Welcome');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };


const CustomDrawerContent = (props) => {
    
    return (
    
        <DrawerContentScrollView
        
        contentContainerStyle={{
            flex:1,
            marginBottom:20
        }}
        {...props}>
          <DrawerItemList {...props} />
         
          <DrawerItem
          style={{borderWidth:1,
            marginTop:'auto'
          }}
            label=""
            onPress={handleSignOut}
           
            icon={()=>(
                <Text>
                    Sign Out
                </Text>
            )}
          />
          {/* Add more custom buttons as needed */}
        </DrawerContentScrollView>
      )
};
  return (
    <Drawer.Navigator  drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Main" component={MainScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerScreen