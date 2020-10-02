import { AllHTMLAttributes} from 'react'
import { MapEvent } from 'react-native-maps'
import { PointProtocol } from '../../pages/Points/protocols'

export interface MapProps {
  latitude: number,
  longitude: number,
  points: Array<PointProtocol>,
  handleNavigateToDetail (id: number):void
}