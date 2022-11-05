import { View, Text, SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { AsyncStorage } from 'react-native';
import COLORS from '../../conts/colors'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import Loader from '../components/Loader'
const RegistrationScreen = () => {
    const navigation = useNavigation()
const [inputs,setInputs]= useState({
    email:'',
    fullname:'',
    phone:'',
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
}else if(!inputs.email.match(/\S+@\S+\.\S+/)){
    handleError("Please input valid email",'email')
valid=false;
}

if(!inputs.fullname){
    handleError("Please input fullname",'fullname')
valid=false;
}

if(!inputs.phone){
    handleError("Please input phone",'phone')
valid=false;
}

if(!inputs.password){
    handleError("Please input password",'password')
valid=false;
}else if(inputs.password.length<5){
    handleError("Min Password length should be 5",'password')
valid=false;
}
if(valid){
     register()}  

}

const register= ()=>{

    setLoading(true)
setTimeout( ()=>{
setLoading(false);
try{
     AsyncStorage.setItem("user",JSON.stringify(inputs))
navigation.navigate("LoginScreen")
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
                }}>Register</Text>
                <Text style={{
                    color: COLORS.grey,
                    fontSize: 18,
                    marginVertical:10
                }}>Enter Your Details To Register</Text>

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
onChangeText={text=>handleOnChange(text,'fullname')}
onFocus={()=>{
    handleError(null,'fullname')
}}
error={errors.fullname}

placeholder="Enter Your Full Name"
iconName="account-outline"
label="Full Name"
/>

<Input
onChangeText={text=>handleOnChange(text,'phone')}
onFocus={()=>{
    handleError(null,'phone')
}}
error={errors.number}

keyboardType="numeric"
placeholder="Enter Your Phone Number"
iconName="phone-outline"
label="Phone Number"
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
title='Register'
onPress={validate}
/>

<Text
onPress={()=>navigation.navigate("LoginScreen")}

style={{
    color:COLORS.black,
    textAlign:'center',
    fontSize:16,
fontWeight:'bold'    
}}
>Already Have Account? LogIn</Text>
</View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default RegistrationScreen