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
import { Provider } from 'react-redux';
import store from './store';
import NewRoadBook from './screens/NewRoadBook';

Amplify.configure(awsconfig);

const Stack = createStackNavigator();


export default function App() {


 
  return (
    <Provider store={store}>
         <NavigationContainer >
           <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpScreen}/>
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen}/>
            <Stack.Screen name="DrawerScreen" component={DrawerScreen}/>
            <Stack.Screen name="NewRoadBook" component={NewRoadBook}/>
            
            </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

