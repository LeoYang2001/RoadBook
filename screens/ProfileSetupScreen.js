import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import { Auth, Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import { createUser } from '../src/graphql/mutations'; 
import { API, graphqlOperation } from 'aws-amplify';

const ProfileSetupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState('')
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    fetchUser();
  }, []);


  const fetchUser = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  const handleChooseImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      const userInfo = await Auth.currentUserInfo();
      setUsername(userInfo.username)
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
        if(!username)  return alert('picture uploading error')
        const fileName = `${username}-profile-pic.jpg`;

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
        picture: imageUrl.split('?')[0],
        profile: 'true'
      });
    alert('successfully updated profile')

    
    if(user)
    {
      // if signed up successfully, add user into userlist
      const userDetails = {
        id: userInfo.attributes.sub,
        username: name,
        email: userInfo.attributes.email,
        createdAt: new Date().toISOString(),
        roadBookList: []
      };
      try {
        await API.graphql(graphqlOperation(createUser, { input: userDetails }));
        console.log('user created successfully')
      } catch (error) {
        console.log(error)
      }
    }

      navigation.replace('DrawerScreen'); 
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
