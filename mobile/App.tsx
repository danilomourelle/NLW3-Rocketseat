import React from 'react';

import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import Routes from './src/routes'
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    nunito700: Nunito_700Bold, // Como alterar o nome da font
    Nunito_800ExtraBold
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.content}>
      <StatusBar style="light" backgroundColor="#15C3D6" />
      <Routes />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#333333'

  }
})

