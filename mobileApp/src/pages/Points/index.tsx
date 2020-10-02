import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native'
// import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'
import { Item, PointProtocol } from './protocols'
import Map from '../../components/Map'
import axios from '../../infra/axios'
import styles from './styles'

const Point = () => {

  const { goBack, navigate } = useNavigation()
  const [items, setItems] = useState<Item[]>([])
  const [points, setPoints] = useState<PointProtocol[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [position, setPosition] = useState<[number, number]>([0, 0])


  useEffect(() => {
    axios.get('/items')
      .then(response => setItems(response.data))
  }, [])

  useEffect(() => {
    async function loadLocation() {
      const { granted } = await Location.requestPermissionsAsync()
      if (!granted) {
        Alert.alert('Ooops...', 'Necessitamos de sua de sua permissão para obter a localização')
        return
      }

      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      setPosition([latitude, longitude])
    }

    loadLocation()
  }, [])

  useEffect( () => {
    // selectedItems.forEach(id => {
      axios.get(`/points?uf=MG&city=BH`,{
        params: {
          items: selectedItems
        }
      })
        .then(response => setPoints(response.data))
    // })

  }, [selectedItems])

  const handleNavigationBack = () => {
    goBack()
  }

  const handleNavigateToDetail = (point: PointProtocol) => {
    navigate('Detail', point)
  }

  const handleSelectItem = (id: number) => {
    const alreadySelected = selectedItems.some(selectedId => selectedId === id)

    if (alreadySelected) {
      const filteredItems = selectedItems.filter(selectedId => selectedId !== id)
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
          {
            (position[0] !== 0)
              &&
            (<Map
              latitude={position[0]}
              longitude={position[1]}
              handleNavigateToDetail={handleNavigateToDetail}
              points={points}
            />)
          }
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {
            items.map((item) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.item,
                    selectedItems.includes(item.id) ? styles.selectedItem : {}
                  ]}
                  onPress={() => {
                    handleSelectItem(item.id)
                  }}
                  key={String(item.id)}
                  activeOpacity={0.7}
                >
                  <SvgUri width={42} height={42} uri={item.id !== 3 ? item.image_url : "http://192.168.0.17:3333/uploads/lampadas.svg"} />
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


export default Point