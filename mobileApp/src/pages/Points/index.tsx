import React from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, TouchableOpacity, Text, Image } from 'react-native'
// import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import MapView from 'react-native-maps'
import styles from './styles'

const Detail = () => {

  const { goBack, navigate } = useNavigation()

  const handleNavigationBack = () => {
    goBack()
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigationBack}>
          <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
        </TouchableOpacity>
        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          <MapView style={styles.map}></MapView>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <TouchableOpacity style={styles.item} onPress={() => {}}></TouchableOpacity>
      </View>
    </>
  )
}


export default Detail