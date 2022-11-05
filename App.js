import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/views/screens/LoginScreen';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import { AsyncStorage } from 'react-native';
import React, { useEffect, useState } from 'react';
import Loader from './src/views/components/Loader';

const Stack= createNativeStackNavigator();



export default function App() {

  useEffect(()=>{
    setTimeout(authUser,2000)
  }, []);
  
  const [initialRouteName,setInitialRouteName]=useState('');
const authUser=async ()=>{
try{
let userData= await AsyncStorage.getItem('user');
if(userData){
userData=JSON.parse(userData)
if(userData?.loggedIn)
{
  setInitialRouteName('HomeScreen')

}else{
  setInitialRouteName('LoginScreen')

}

}
else{
  
  setInitialRouteName('RegistrationScreen')

}
}
catch(error){

  
  setInitialRouteName('RegistrationScreen')
}
}


  return (
<NavigationContainer>
  
{initialRouteName==''?( <Loader visible={true}/>) :(
  <>
  <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{headerShown:false}}>
<Stack.Screen
name="RegistrationScreen"
component={RegistrationScreen}
/>
<Stack.Screen
name="LoginScreen"
component={LoginScreen}
/>

<Stack.Screen
name="HomeScreen"
component={HomeScreen}
/>
  </Stack.Navigator>
  </>
)}

</NavigationContainer>


    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
