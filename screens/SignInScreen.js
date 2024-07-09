import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';

const SignInScreen = ({ navigation }) => {
  const [phoneNum, setPhoneNum] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [email, setEmail] = useState('')

  // useEffect(() => {
    
  //   //validation needed 
  //   if(phoneNum.length)
  //     {
  //       setIsValid(true)
  //     }
  //     else{
  //       setIsValid(false)
  //     }
  // }, [phoneNum])
  
  

  // const signIn = async () => {
  //   try {
  //     await Auth.signIn(username, password);
  //     const userInfo = await Auth.currentAuthenticatedUser();
  //     let ifProfileSetup = userInfo.attributes.profile
  //     if(ifProfileSetup === "false")
  //     {
  //       navigation.replace('ProfileSetup');
  //     }
  //     else{
  //       navigation.replace('DrawerScreen');

  //     }
  //   } catch (error) {
  //     Alert.alert('Error', error.message);
  //   }
  // };

  // const signUp = async (phoneNum) => {
  //   // Ensure phoneNum is in the correct format with the country code, e.g., +1234567890
  //   if (!phoneNum.startsWith('+')) {
  //     Alert.alert('Error', 'Please enter your phone number with the country code, e.g., +1234567890');
  //     return;
  //   }
  
  //   try {
  //     await Auth.signUp({
  //       username: phoneNum,
  //       password: 'A_strong_password123!', // Cognito requires a strong password even if not used
  //       attributes: {
  //         phone_number: phoneNum, // Include phone number in attributes
  //       },
  //     });
  //     Alert.alert('Success', 'Verification code sent to your phone number');
  //     navigation.navigate('ConfirmSignUp', { phoneNum });
  //   } catch (error) {
  //     Alert.alert('Error', error.message);
  //     console.log('SignUp Error:', error);
  //   }
  // };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              >你好，欢迎回来</Text>
              
              <View className="  mt-4 flex-row items-center ">
                <View className="mr-1" style={{width:48, height:4, backgroundColor:'#38404D', borderRadius:1 }} />
                <View className="mr-2" style={{width:48, height:4, backgroundColor:'#E4E8EF', borderRadius:1 }} />
                <Text
              className="font-semibold "
                style={{fontSize:12, color:"#E4E8EF"}}
                >1/2</Text>
              </View>
                <View className=" mt-9">
                  <Text
                  className="font-semibold"
                  style={{
                    fontSize:16,
                    color:'#ADB5C3'
                  }}
                  >邮箱
                  </Text>
                  <TextInput 
                  value={email}
                  onChangeText={(text)=>{setEmail(text)}}
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

                  navigation.navigate('SignInPassword', {email:email})
                }}
                disabled={!isValid} style={{borderRadius:8, height:50, backgroundColor:'#222833', opacity: isValid ? 1 : 0.4}} className="mt-16 flex-row justify-center items-center">
                  <Text style={{fontSize:16}} className="text-white">确定</Text>
                </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
