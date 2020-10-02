import React from 'react'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { View, ImageBackground, Text, Image, TouchableOpacity, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import styles from './styles'

const Detail = (props: any) => {

  const { goBack, navigate } = useNavigation()

  const handleNavigationBack = () => {
    goBack()
  }

  // id: number
  // image: string,
  // name: string, 
  // email: string,
  // whatsapp: string,
  // latitude: number,
  // longitude: number,
  // city: string,
  // uf: string

  const message = `Olá`
  const { image, name, city, uf, whatsapp, email } = props.route.params
  
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigationBack}>
        <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
      </TouchableOpacity>

      <Image style={styles.pointImage} source={{uri: image}}></Image>
      <Text style={styles.pointName}>{name}</Text>
      <Text style={styles.pointName}>Lâmpadas, óleo de cozinha</Text>

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