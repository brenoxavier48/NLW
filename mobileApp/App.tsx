// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo'
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'
import Home from './src/pages/Home'

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  }) 

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      {
        fontsLoaded 
        ? <Home/>
        : <AppLoading/>
      }
    </>
  );
}

