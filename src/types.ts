export interface User {
  id: string
  username: string
  createdAt: number
}

export interface Clawdbot {
  id: string
  name: string
  personality: string[]
  color: string
  accessory: string | null
  happiness: number
  hunger: number
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  icon: string
  price: number
  placed?: { x: number; y: number }
}

export interface ShopItem {
  id: string
  name: string
  category: string
  icon: string
  price: number
}
