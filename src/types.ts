export interface User {
  id: string
  username: string
  clawCash: number
  createdAt: number
}

export interface Clawdbot {
  id: string
  name: string
  personality: string | string[]
  color: string
  accessory?: string | null
  happiness: number
  hunger: number
  createdAt?: number
}

export interface InventoryItem {
  id: string
  name: string
  type: string
  category: string
  emoji: string
  placed: boolean | { x: number; y: number }
  position?: { x: number; y: number }
}

export interface ShopItem {
  id: string
  name: string
  category: string
  price: number
  emoji: string
  image?: string
}
