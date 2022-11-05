import { View, Text, SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { AsyncStorage } from 'react-native';
import COLORS from '../../conts/colors'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import Loader from '../components/Loader'
const LoginScreen = () => {
  const navigation = useNavigation()
  const [inputs,setInputs]= useState({
      email:'',
      password:'',
  })  
  
  const [errors,setErrors]= useState({})  
  
  
  const [loading,setLoading]=useState(false)
      const validate=()=>{
  
  Keyboard.dismiss();
  let valid=true;
  
  if(!inputs.email){
  handleError("Please input email",'email')
  valid=false;
  }

  if(!inputs.password){
      handleError("Please input password",'password')
  valid=false;
  }
  
  if(valid){
       login()}  
  
  }
  
  const login= ()=>{
  
      setLoading(true)
  setTimeout(async ()=>{
  setLoading(false);
  try{
    let userData= await AsyncStorage.getItem('user');
if(userData){
userData=JSON.parse(userData)
if(inputs.email==userData.email && inputs.password==userData.password){

  AsyncStorage.setItem("user",JSON.stringify({...userData,loggedIn:true}))
  navigation.navigate('HomeScreen');
}
else{
  Alert.alert("Error", "invalid details")
}
}
else{
  Alert.alert("Error"," User Does Not Exist")
}
  }
  catch(error){
      console.log(error)
  }
  },3000)
  }
  
  const handleError =(errorMessage,input)=>{
      setErrors((prevState)=>({...prevState,[input]:errorMessage}))
  }
  
  
  const handleOnChange=(text,input)=>{
      setInputs((prevState)=>({
          ...prevState,[input]:text
       }))
  }



  return (
    <SafeAreaView style={{
      backgroundColor: COLORS.white
      , flex: 1
  }}>
<Loader visible={loading}/>
      <ScrollView
          contentContainerStyle={{
              paddingTop: 50,
              paddingHorizontal: 20
          }}>

          <Text style={{
              color: COLORS.black,
              fontSize: 40,
              fontWeight: 'bold'
          }}>Login</Text>
          <Text style={{
              color: COLORS.grey,
              fontSize: 18,
              marginVertical:10
          }}>Enter Your Details To Login</Text>

<View style={{marginVertical:20}}>
<Input
error={errors.email}
onChangeText={text=>handleOnChange(text,'email')}
label="Email"
iconName="email-outline"
placeholder="Enter Your Email Address"
onFocus={()=>{
handleError(null,'email')
}}
/>


<Input
onChangeText={text=>handleOnChange(text,'password')}
onFocus={()=>{
handleError(null,'password')
}}
error={errors.password}

label="Password"
iconName="lock-outline"
placeholder="Enter Your Password"
password
/>

<Button 
title='Login'
onPress={validate}
/>

<Text
onPress={()=>navigation.navigate("RegistrationScreen")}

style={{
color:COLORS.black,
textAlign:'center',
fontSize:16,
fontWeight:'bold'    
}}
>Want To Create Account? Register Now</Text>
</View>

      </ScrollView>
  </SafeAreaView>
  )
}

export default LoginScreen