import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';

import { Auth } from 'aws-amplify';

const ConfirmSignUpScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [isValid, setIsValid] = useState(false)
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [curFocusIndex, setCurFocusIndex] = useState(null)
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(true);


  useEffect(() => {
    let timer;
    if(isCounting){
      if( timeLeft > 0 ){
        timer = setTimeout(()=> setTimeLeft(timeLeft - 1), 1000)
      }
      else{
        setIsCounting(false)
      }
    }
  }, [isCounting, timeLeft])
  

  useEffect(() => {
    if(code.join("").length === 6)
      {
        setIsValid(true)
      }
      else{
        setIsValid(false)
      }
  }, [code])
  

  const handleInputChange = (index, value) => {
    if(value.length > 1)  return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleResend = () => {
    setTimeLeft(60);
    setIsCounting(true);
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const confirmSignUp = async () => {
    let cfmCode = code.join("")
    try {
      await Auth.confirmSignUp(username,cfmCode);
      Alert.alert('Success', 'Email verification successful! You can now sign in.');
      navigation.navigate('SignInMock'); // Navigate to sign-in screen after confirmation
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
              }}>验证</Text>
                <Text
            className="font-semibold mt-4 "
              style={{
                fontSize:24,color:'#38404D'
              }}
            >验证码已经发送到手机</Text>
            
            <View className="  mt-4 flex-row items-center ">
              <View className="mr-1" style={{width:48, height:4, backgroundColor:'#38404D', borderRadius:1 }} />
              <View className="mr-2" style={{width:48, height:4, backgroundColor:'#38404D', borderRadius:1 }} />
              <Text
            className="font-semibold "
              style={{fontSize:12, color:"#E4E8EF"}}
              >2/2</Text>
            </View>
              <View className="   flex-row  justify-around mt-9">
              {code.map((digit, index) => (
              <TextInput
                key={index}
                onFocus={()=>{
                  setCurFocusIndex(index)
                }}
                onBlur={()=>{
                  setCurFocusIndex(null)
                }}
                ref={(ref) => (inputRefs.current[index] = ref)}
                keyboardType="numeric"
                className="text-center font-semibold"
                style={{
                  width:48,
                  height:56,
                  borderRadius:6,
                  backgroundColor:'#F3F4F7',
                  color:'#38404D',
                  fontSize:24,
                  borderWidth:2,
                  borderColor: curFocusIndex === index ? '#FA541C' : '#F3F4F7'
                }}
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleInputChange(index, value)}
                onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
              />
            ))}
              </View>
            <View style={{justifyContent:isCounting ? 'flex-start':'flex-end'}} className=" flex flex-row ">
             {
              isCounting ? (
                <Text style={{color:'#ADB5C3'}} className="   mt-4 font-semibold">{timeLeft}秒内有效</Text>
              ):(
                <TouchableOpacity onPress={handleResend}>
                    <Text  style={{color:'#ADB5C3'}} className="  mt-4 font-semibold">Resend Code</Text>
                  </TouchableOpacity>
              )
             }
            </View>

              <TouchableOpacity onPress={confirmSignUp} disabled={!isValid} style={{borderRadius:8, height:50, backgroundColor:'#222833', opacity: isValid ? 1 : 0.4}} className="mt-12 flex-row justify-center items-center">
                <Text style={{fontSize:16}} className="text-white">确定</Text>
              </TouchableOpacity>
      </View>
     
    
    </View>
  </TouchableWithoutFeedback>
  );
};

export default ConfirmSignUpScreen;
