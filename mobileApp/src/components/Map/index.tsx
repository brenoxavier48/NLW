import React, { useState, useEffect } from 'react'
import styles from '../../pages/Points/styles'
import { View, Text, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { MapProps } from './protocols'



const Map = (props: MapProps) => {

  const { latitude, longitude, handleNavigateToDetail, points } = props

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.014,
        longitudeDelta: 0.014
      }}
    >
      {
        points.map((point) => {
          return (
            <Marker
              key={point.id}
              style={styles.mapMarker}
              onPress={ () => handleNavigateToDetail(Number(point.id))}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude
              }}>
              <View style={styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage} source={{ uri: point.image }}></Image>
                <Text style={styles.mapMarkerTitle}>{point.name}</Text>
              </View>
            </Marker>
          )
        })
      }
    </MapView>
  )
}

export default Map