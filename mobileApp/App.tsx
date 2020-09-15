// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Home from './src/Home'

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <Home/>
    </>
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
