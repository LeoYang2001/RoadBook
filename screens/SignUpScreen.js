import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Auth } from 'aws-amplify';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email: username,
          profile:'false'
        }
      });
      console.log('Sign up response:', user);
      Alert.alert('Sign Up Successful', 'Please check your email for verification.');
      // Navigate to confirmation screen or handle confirmation flow
      navigation.navigate('ConfirmSignUp', { username });
    } catch (error) {
      if (error.code === 'UsernameExistsException') {
        // User already exists, check if email is confirmed
        try {
          const user = await Auth.resendSignUp(username);
          Alert.alert('User Already Exists', 'Please check your email for a verification link.');
          navigation.navigate('ConfirmSignUp', { username });
          // Handle the flow to navigate or notify user
          // You may want to navigate to a different screen or show a message
        } catch (resendError) {
          console.log('Error resending confirmation code:', resendError);
          Alert.alert('Error', resendError.message);
        }
      } else {
        // Other errors during sign-up process
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sign Up</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
        placeholder="Email"
        onChangeText={text => setUsername(text)}
        value={username}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        autoCompleteType="password"
      />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Back to Sign In" onPress={() => navigation.goBack()} />
    </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
