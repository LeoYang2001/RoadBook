import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Auth } from 'aws-amplify';

const ConfirmSignUpScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [confirmationCode, setConfirmationCode] = useState('');

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      Alert.alert('Success', 'Email verification successful! You can now sign in.');
      navigation.navigate('SignIn'); // Navigate to sign-in screen after confirmation
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Confirm Sign Up</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
        placeholder="Confirmation Code"
        onChangeText={text => setConfirmationCode(text)}
        value={confirmationCode}
        keyboardType="numeric"
      />
      <Button title="Confirm" onPress={confirmSignUp} />
    </View>
  );
};

export default ConfirmSignUpScreen;
