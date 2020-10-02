import React, { useState, useEffect } from 'react'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { View, ImageBackground, Text, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import { PointProtocol, Item } from '../Points/protocols'
import axios from '../../infra/axios'
import styles from './styles'

const Detail = (props: any) => {

  const { point_id } = props.route.params
  const { goBack, navigate } = useNavigation()
  const [point, setPoint] = useState<PointProtocol>({} as PointProtocol)
  const [nameItems, setNameItems] = useState<string>('')

  
  useEffect(() => {
    axios.get(`points/${point_id}`)
    .then(response => {
      setPoint(response.data.point)
      const nameItems = makeNameItems(response.data.items)
      setNameItems(nameItems)
    })
  }, [])
  
  const handleNavigationBack = () => {
    goBack()
  }

  const makeNameItems = (items: Array<Item>): string => {
    const nameItems = items.map((item) => {
      return item.name
    })

    return nameItems.join(', ')
  }

  const message = `Olá`

  const { image, name, city, uf, whatsapp, email, items } = point
  
  const sendWhatsapp = () => {
    Linking.openURL(`whatsapp://send?phone=55${whatsapp}&text=${message}`)
  }

  const sendEmail = () => {
    MailComposer.composeAsync({
      subject: 'Coleta',
      recipients: [email],
      body: message,
    })
  }

  if (!point.id) return <ActivityIndicator size="large" color="#00ff00" />

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigationBack}>
        <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
      </TouchableOpacity>

      <Image style={styles.pointImage} source={{uri: image}}></Image>
      <Text style={styles.pointName}>{name}</Text>
      <Text style={styles.pointItems}>{nameItems}</Text>

      <View style={styles.address}>
        <Text style={styles.addressTitle}>{city}</Text>
        <Text style={styles.addressContent}>{uf}</Text>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={sendWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF"></FontAwesome>
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={sendEmail}>
          <Icon name="mail" size={20} color="#FFF"></Icon>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </View>
  )
}


export default Detail