import { StyleSheet, Text, View } from 'react-native'
import { Slot, Stack, SplashScreen } from 'expo-router'
import React, { useEffect } from 'react'
import { useFonts } from 'expo-font'
import GlobalProvider from '../Context/GlobalProvider';

SplashScreen.preventAutoHideAsync(); 

const RooyLayout = () => {


  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(()=> {
    if(error) throw error;

    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null;


  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options ={{ headerShown:false}}></Stack.Screen>
        <Stack.Screen name="(auth)" options ={{ headerShown:false}}></Stack.Screen>
        <Stack.Screen name="index" options ={{ headerShown:false}}></Stack.Screen>
      </Stack>
    </GlobalProvider>
  )
}
        {/* <Stack.Screen name="/search/[query]" options ={{ headerShown:false}}></Stack.Screen> */}

export default RooyLayout

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})