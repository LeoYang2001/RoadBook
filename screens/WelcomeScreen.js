import React from 'react';
import { View, Text, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Roadbook App!</Text>
      <Button
        title="Sign In / Sign Up"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
};

export default WelcomeScreen;
