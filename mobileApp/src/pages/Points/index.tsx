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
  const [ selectedItems, setSelectedItems ] = useState<number[]>([])


  useEffect( () => {
    axios.get('/items')
      .then(response => setItems(response.data))
  }, [])

  const handleNavigationBack = () => {
    goBack()
  }

  const handleNavigateToDetail = () => {
    navigate('Detail')
  }

  const handleSelectItem = (id: number) => {
    const alreadySelected = selectedItems.some(selectedId => selectedId === id)

    if (alreadySelected) {
      const filteredItems = selectedItems.filter(selectedId => selectedId === id)
      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
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
              onPress={handleNavigateToDetail}
              coordinate={{ 
                latitude: -19.8217822,
                longitude: -43.9879123
            }}>
              <View style={styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage} source={{uri: 'https://images.unsplash.com/photo-1598006033491-c355cd69f274?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&q=60'}}></Image>
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
              return ( 
                <TouchableOpacity style={styles.item} onPress={() => {}} key={String(item.id)} activeOpacity={0.7}>
                  <SvgUri width={42} height={42} uri={item.id !== 3 ? item.image_url : "http://192.168.0.17:3333/uploads/lampadas.svg"}/>
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