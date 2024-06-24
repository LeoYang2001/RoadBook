import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const MainScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); 
  

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUser(userInfo);
      console.log(JSON.stringify(userInfo.attributes))
      if (!userInfo.attributes.name || !userInfo.attributes.picture) {
        navigation.navigate('ProfileSetup'); // Navigate to profile setup if attributes are missing
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };
  
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      console.log('User signed out');
      navigation.navigate('Welcome'); 
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {user && user.attributes.picture ? (
      <Image
        source={{ uri: user.attributes.picture }}
        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
      />
    ) : (
      <View style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20, backgroundColor: '#ccc' }} />
    )}
    <Text>Welcome, {user ? user.attributes.name : 'User'}!</Text>
    <Button title="Sign Out" onPress={handleSignOut} />
  </View>
  );
};

export default MainScreen;
