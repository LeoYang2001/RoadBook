import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import awsconfig from './src/aws-exports'; 
import { Amplify } from 'aws-amplify';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ConfirmSignUpScreen from './screens/ConfirmSignUpScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import DrawerScreen from './screens/DrawerScreen';
import NewRoadBook from './screens/NewRoadBook';
import MapMainScreen from './screens/MapMainScreen';
import SignInPassword from './screens/SignInPasswordScreen';
import SignInMock from './screens/SignInMock';
import RoadBookEditScreen from './screens/RoadBookEditScreen';

Amplify.configure(awsconfig);

const Stack = createStackNavigator();


export default function App() {


 
  return (
         <NavigationContainer >
           <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpScreen}/>
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen}/>
            <Stack.Screen name="DrawerScreen" component={DrawerScreen}/>
            <Stack.Screen name="NewRoadBook" component={NewRoadBook}/>
            <Stack.Screen name="MapMain" component={MapMainScreen}/>
            <Stack.Screen name="SignInPassword" component={SignInPassword}/>
            <Stack.Screen name="SignInMock" component={SignInMock}/>
            <Stack.Screen name="RoadBookEdit" component={RoadBookEditScreen}/>
            
            
            </Stack.Navigator>
      </NavigationContainer>
  );
}

