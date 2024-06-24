import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports'; // Adjust the path as needed
import { Amplify } from 'aws-amplify';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ConfirmSignUpScreen from './screens/ConfirmSignUpScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
Amplify.configure(awsconfig);

const Stack = createStackNavigator();

export default function App() {

  const [authState, setAuthState] = useState('loading');

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    console.log('checking auth...')
    try {
      await Auth.currentAuthenticatedUser();
      setAuthState('authenticated');
      console.log('authenticated')
    } catch (error) {
      setAuthState('unauthenticated');
      console.log('unauthenticated')
    }
  };

  return (
      <NavigationContainer>
           <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpScreen}/>
            <Stack.Screen name="Main" component={MainScreen}/>
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen}/>
            </Stack.Navigator>
      </NavigationContainer>
  );
}

