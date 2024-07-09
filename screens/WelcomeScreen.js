import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

const WelcomeScreen = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    console.log('checking auth...')
    try {
      await Auth.currentAuthenticatedUser();
      console.log('authenticated')
      navigation.replace('DrawerScreen')
    } catch (error) {
      console.log('unauthenticated')
      navigation.replace('SignIn')
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Roadbook App!</Text>
      {
        isLoading && (
          <ActivityIndicator size={'large'} color={"blue"} />
        )
      }
    </View>
  );
};

export default WelcomeScreen;
