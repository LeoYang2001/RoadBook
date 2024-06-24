import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Auth } from 'aws-amplify';

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      await Auth.signIn(username, password);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Sign In</Text>
        <TextInput
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
          placeholder="Username (email or phone number)"
          onChangeText={text => setUsername(text)}
          value={username}
          autoCapitalize="none"
          autoCompleteType="email" // Use "email" or "username" depending on your preference
          keyboardType="email-address" // Set keyboard type appropriately
        />
        <TextInput
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          autoCompleteType="password"
        />
        <Button title="Sign In" onPress={signIn} />
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
