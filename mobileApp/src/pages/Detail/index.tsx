import React from 'react'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { View, ImageBackground, Text, Image, TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import styles from './styles'

const Detail = () => {

  const { goBack, navigate } = useNavigation()

  const handleNavigationBack = () => {
    goBack()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigationBack}>
        <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
      </TouchableOpacity>

      <Image style={styles.pointImage} source={{uri: 'https://images.unsplash.com/photo-1598006033491-c355cd69f274?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&q=60'}}></Image>
      <Text style={styles.pointName}>Mercado</Text>
      <Text style={styles.pointName}>Lâmpadas, óleo de cozinha</Text>

      <View style={styles.address}>
        <Text style={styles.addressTitle}>fodas fodas fo</Text>
        <Text style={styles.addressContent}>fodas, MG</Text>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={20} color="#FFF"></FontAwesome>
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={() => {}}>
          <Icon name="mail" size={20} color="#FFF"></Icon>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>

    </View>
  )
}


export default Detail