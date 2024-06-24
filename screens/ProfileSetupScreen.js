import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import { Auth, Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';

const ProfileSetupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChooseImage = async () => {
   console.log('handleChooseImage...')
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
  };

  const handleSaveProfile = async () => {
    if (!name) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    let imageUrl = '';

    if (image) {
      setUploading(true);
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        const fileName = `${Auth.currentUserInfo().username}-profile-pic.jpg`;

        const { key } = await Storage.put(fileName, blob, {
          contentType: 'image/jpeg',
        });

        imageUrl = await Storage.get(key);
      } catch (error) {
        Alert.alert('Error', 'Failed to upload image');
        console.log('Error uploading image:', error);
      } finally {
        setUploading(false);
      }
    }

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        name,
        picture: imageUrl,
      });
    alert('successfully updated profile')
      navigation.navigate('Main'); // Navigate to the main screen after profile setup
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
      console.log('Error saving profile:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Setup</Text>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, width: '80%', marginBottom: 20, padding: 10 }}
      />
      <Button title="Choose Profile Picture" onPress={()=>{
        handleChooseImage()
      }} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginVertical: 20 }} />}
      <Button title={uploading ? 'Saving...' : 'Save Profile'} onPress={handleSaveProfile} disabled={uploading} />
    </View>
  );
};

export default ProfileSetupScreen;
