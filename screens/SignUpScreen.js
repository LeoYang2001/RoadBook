import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';


const SignUpScreen = ({ navigation }) => {
  const [phoneNum, setPhoneNum] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    
    if(phoneNum.length == 11)
      {
        setIsValid(true)
      }
      else{
        setIsValid(false)
      }
  }, [phoneNum])
  

  const signIn = async () => {
    try {
      await Auth.signIn(username, password);
      const userInfo = await Auth.currentAuthenticatedUser();
      let ifProfileSetup = userInfo.attributes.profile
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
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className=" py-14 bg-white" style={{ flex: 1,  paddingHorizontal: 18}}>
        <View className=" py-4 flex-row justify-end ">
        <TouchableOpacity>
          <Text className="font-semibold" style={{color:'#4D5561'}}>其他方式</Text>
        </TouchableOpacity>
        
        </View>
        <View className=" mt-20 flex-col">
                <Text className="font-semibold" style={{
                  fontSize:32,color:'#38404D'
                }}>注册</Text>
                  <Text
              className="font-semibold mt-4 "
                style={{
                  fontSize:24,color:'#38404D'
                }}
              >你好，初次见面请多指教</Text>
              
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
                  >电话
                  </Text>
                  <TextInput 
                  value={phoneNum}
                  onChangeText={(text)=>{setPhoneNum(text)}}
                  className="mt-4 px-4 font-semibold"
                  keyboardType='phone-pad'
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
                  navigation.navigate('ConfirmSignUp', {phoneNum:phoneNum})
                }}
                disabled={!isValid} style={{borderRadius:8, height:50, backgroundColor:'#222833', opacity: isValid ? 1 : 0.4}} className="mt-16 flex-row justify-center items-center">
                  <Text style={{fontSize:16}} className="text-white">确定</Text>
                </TouchableOpacity>
        </View>
       
      
        {/* <Button title="Sign In" onPress={signIn} /> */}
        {/* <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} /> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
