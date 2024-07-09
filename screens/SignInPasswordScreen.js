import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Auth } from 'aws-amplify';
import { themeColors } from '../constant';

const SignInPassword = ({ navigation, route}) => {

    const {email} = route.params

    const [password, setPassword] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const signUp = async () => {
      setIsLoading(true)
        try {
          const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
              email: email,
              profile:'false'
            }
          });
          console.log('Sign up response:', user);
          Alert.alert('Sign Up Successful', 'Please check your email for verification.');
          // Navigate to confirmation screen or handle confirmation flow
          setIsLoading(false)
          navigation.navigate('ConfirmSignUp', { username:email });
        } catch (error) {
          if (error.code === 'UsernameExistsException') {
            // User already exists, check if email is confirmed
            try {
              await Auth.signIn(email, password);
              const userInfo = await Auth.currentAuthenticatedUser();
              let ifProfileSetup = userInfo.attributes.profile
             setIsLoading(false)
              if(ifProfileSetup === "false")
              {
                navigation.replace('ProfileSetup');
              }
              else{
                navigation.replace('DrawerScreen');
        
              }
            } catch (error) {
              Alert.alert('Error', error.message);
            }
            // try {
            //   const user = await Auth.resendSignUp(email);
            //   Alert.alert('User Already Exists', 'Please check your email for a verification link.');
            //   navigation.navigate('ConfirmSignUp', { email });
            //   // Handle the flow to navigate or notify user
            //   // You may want to navigate to a different screen or show a message
            // } catch (resendError) {
            //   console.log('Error resending confirmation code:', resendError);
            //   Alert.alert('Error', resendError.message);
            // }
          } else {
            // Other errors during sign-up process
            Alert.alert('Error', error.message);
          }
        }
      };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1">
      {
        isLoading && (
            <View  style={{backgroundColor:'rgba(0,0,0,0.6)'}} className="absolute w-full h-full z-10  flex justify-center items-center" >
                <ActivityIndicator color={themeColors.primaryColor} size={'large'} />
            </View>
        )
    }
    <View className=" py-14 bg-white" style={{ flex: 1,  paddingHorizontal: 18}}>
        
        <View className=" py-4 flex-row justify-end">
        <TouchableOpacity>
          <Text className="font-semibold" style={{color:'#4D5561'}}>其他方式</Text>
        </TouchableOpacity>
        
        </View>
        <View className=" mt-20 flex-col">
                <Text className="font-semibold" style={{
                  fontSize:32,color:'#38404D'
                }}>登录</Text>
                  <Text
              className="font-semibold mt-4 "
                style={{
                  fontSize:24,color:'#38404D'
                }}
              >请输入密码</Text>
              
              <View className="  mt-4 flex-row items-center ">
                <View className="mr-1" style={{width:48, height:4, backgroundColor:'#38404D', borderRadius:1 }} />
                <View className="mr-1" style={{width:48, height:4, backgroundColor:'#38404D', borderRadius:1 }} />
                <Text
              className="font-semibold "
                style={{fontSize:12, color:"#E4E8EF"}}
                >2/2</Text>
              </View>
                <View className=" mt-9">
                  <Text
                  className="font-semibold"
                  style={{
                    fontSize:16,
                    color:'#ADB5C3'
                  }}
                  >密码
                  </Text>
                  <TextInput 
                  secureTextEntry
                  value={password}
                  onChangeText={(text)=>{setPassword(text)}}
                  className="mt-4 px-4 font-semibold"
                  style={{
                    height:50, 
                    borderRadius:6,
                    backgroundColor:'#F3F4F7',
                    color:'#38404D',
                    fontSize:18
                  }} />
                </View>
                
                <TouchableOpacity
                onPress={()=>{
                  signUp(email)
                }}
                 style={{borderRadius:8, height:50, backgroundColor:'#222833', opacity: isValid ? 1 : 0.4}} className="mt-16 flex-row justify-center items-center">
                  <Text style={{fontSize:16}} className="text-white">确定</Text>
                </TouchableOpacity>
        </View>
      </View>
      </View>
      
    </TouchableWithoutFeedback>
  );
};

export default SignInPassword;
