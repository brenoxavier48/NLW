export interface Item {
  id: number
  name: string
  image_url: string
}

export interface PointProtocol {
  id: number
  image: string,
  name: string, 
  email: string,
  whatsapp: string,
  latitude: number,
  longitude: number,
  city: string,
  uf: string,
  items?: Array<Item>
}

