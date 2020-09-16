import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native'
// import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import {  SvgUri } from 'react-native-svg'
import { Item } from './protocols'
import axios from '../../infra/axios'
import styles from './styles'

const Detail = () => {

  const { goBack, navigate } = useNavigation()
  const [ items, setItems ] = useState<Item[]>([])

  useEffect( () => {
    axios.get('/items')
      .then(response => setItems(response.data))
  }, [])

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
          <MapView 
            style={styles.map}
            initialRegion={{
              latitude: -19.8217822,
              longitude: -43.9879123,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}
          >
            <Marker 
              style={styles.mapMarker}
              coordinate={{ 
                latitude: -19.8217822,
                longitude: -43.9879123
            }}>
              <View style={styles.mapContainer}>
                <Image style={styles.mapMarkerImage} source={{uri: 'http://192.168.0.17:3333/uploads/lampadas.svg'}}></Image>
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}
        >
          {
            items.map((item) => {
              return ( //{item.image_url}
                <TouchableOpacity style={styles.item} onPress={() => {}} key={item.id}>
                  <SvgUri width={42} height={42} uri="http://192.168.0.17:3333/uploads/lampadas.svg"/>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    </>
  )
}


export default Detail