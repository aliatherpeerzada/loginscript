import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { AsyncStorage } from 'react-native';
import Button from '../components/Button';

import { useNavigation } from '@react-navigation/native'
const HomeScreen = () => {

  const navigation = useNavigation()
  const logout =()=>{
  AsyncStorage.setItem("user",JSON.stringify({...userDetails,loggedIn:false}))
navigation.navigate("LoginScreen")
}


  const [userDetails,setUserDetails]=useState()
 
 React.useEffect(()=>{
  userDataDetails();
 },[])
 
  const userDataDetails= async()=>{
const userData=await AsyncStorage.getItem('user');
if(userData){
  setUserDetails(JSON.parse(userData));
}

}
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:"center",
    paddingHorizontal:40}}>
      <Text style={{fontsize:20,fontWeight:'bold'}}>{userDetails?.fullname}</Text>
   
   <Button title="LOG OUT" 
   onPress={logout} />
    </View>
  )
}

export default HomeScreen