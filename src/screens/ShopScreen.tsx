import { useState } from 'react'
import type { InventoryItem, ShopItem } from '../types'

interface ShopScreenProps {
  clawCash: number
  onPurchase: (item: InventoryItem, cost: number) => boolean
  onBack: () => void
}

const CATEGORIES = [
  { id: 'furniture', label: '🛋️ Furniture', icon: '🛋️' },
  { id: 'food', label: '🍕 Food', icon: '🍕' },
  { id: 'clothing', label: '👕 Clothing', icon: '👕' },
  { id: 'toys', label: '🎾 Toys', icon: '🎾' },
  { id: 'decorations', label: '🎨 Decorations', icon: '🎨' },
  { id: 'special', label: '✨ Special', icon: '✨' },
]

const SHOP_ITEMS: ShopItem[] = [
  // Furniture
  { id: 'bed1', name: 'Cozy Bed', category: 'furniture', price: 500, emoji: '🛏️', image: '/assets/furniture-bed.png' },
  { id: 'chair1', name: 'Comfy Chair', category: 'furniture', price: 300, emoji: '🪑' },
  { id: 'table1', name: 'Round Table', category: 'furniture', price: 400, emoji: '🪵' },
  { id: 'lamp1', name: 'Cute Lamp', category: 'furniture', price: 200, emoji: '🪔' },
  { id: 'plant1', name: 'Potted Plant', category: 'furniture', price: 150, emoji: '🪴' },
  { id: 'rug1', name: 'Fluffy Rug', category: 'furniture', price: 350, emoji: '🟫' },
  // Food
  { id: 'pizza', name: 'Cheesy Pizza', category: 'food', price: 50, emoji: '🍕' },
  { id: 'burger', name: 'Tasty Burger', category: 'food', price: 60, emoji: '🍔' },
  { id: 'icecream', name: 'Ice Cream', category: 'food', price: 40, emoji: '🍦' },
  { id: 'cake', name: 'Birthday Cake', category: 'food', price: 100, emoji: '🎂' },
  { id: 'apple', name: 'Fresh Apple', category: 'food', price: 20, emoji: '🍎' },
  { id: 'cookie', name: 'Chocolate Cookie', category: 'food', price: 30, emoji: '🍪' },
  // Toys
  { id: 'ball1', name: 'Beach Ball', category: 'toys', price: 75, emoji: '🏐' },
  { id: 'teddy', name: 'Teddy Bear', category: 'toys', price: 250, emoji: '🧸' },
  { id: 'kite', name: 'Rainbow Kite', category: 'toys', price: 150, emoji: '🪁' },
  { id: 'puzzle', name: 'Fun Puzzle', category: 'toys', price: 100, emoji: '🧩' },
  // Clothing
  { id: 'hat1', name: 'Party Hat', category: 'clothing', price: 200, emoji: '🎩' },
  { id: 'bow1', name: 'Cute Bow', category: 'clothing', price: 150, emoji: '🎀' },
  { id: 'crown', name: 'Royal Crown', category: 'clothing', price: 500, emoji: '👑' },
  { id: 'glasses', name: 'Cool Shades', category: 'clothing', price: 175, emoji: '🕶️' },
  // Decorations
  { id: 'poster1', name: 'Star Poster', category: 'decorations', price: 100, emoji: '⭐' },
  { id: 'trophy', name: 'Gold Trophy', category: 'decorations', price: 300, emoji: '🏆' },
  { id: 'balloon', name: 'Party Balloons', category: 'decorations', price: 50, emoji: '🎈' },
  { id: 'frame', name: 'Photo Frame', category: 'decorations', price: 125, emoji: '🖼️' },
  // Special
  { id: 'gem1', name: 'Magic Gem', category: 'special', price: 1000, emoji: '💎' },
  { id: 'wand', name: 'Sparkle Wand', category: 'special', price: 750, emoji: '🪄' },
  { id: 'rainbow', name: 'Rainbow Charm', category: 'special', price: 500, emoji: '🌈' },
]

export default function ShopScreen({ clawCash, onPurchase, onBack }: ShopScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('furniture')
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null)

  const filteredItems = SHOP_ITEMS.filter(item => item.category === selectedCategory)

  const handlePurchase = (item: ShopItem) => {
    if (clawCash < item.price) {
      setPurchaseMessage("Not enough ClawCash! 😢")
      setTimeout(() => setPurchaseMessage(null), 2000)
      return
    }

    const inventoryItem: InventoryItem = {
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      type: item.id,
      category: item.category,
      emoji: item.emoji,
      placed: false,
      position: { x: 0, y: 0 }
    }

    if (onPurchase(inventoryItem, item.price)) {
      setPurchaseMessage(`Purchased ${item.name}! 🎉`)
      setTimeout(() => setPurchaseMessage(null), 2000)
    }
  }

  return (
    <div className="shop-screen">
      {/* Header */}
      <header className="shop-header">
        <div className="shop-title">
          <img src="/assets/shop-building.png" alt="W Shop" />
          <h1>W Shop</h1>
        </div>
        <div className="currency">
          <span>🪙</span>
          <span>{clawCash.toLocaleString()} ClawCash</span>
        </div>
        <button className="back-btn" onClick={onBack}>
          ← Back to Room
        </button>
      </header>

      {/* Purchase message */}
      {purchaseMessage && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff',
          padding: '15px 30px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          zIndex: 100,
          fontWeight: 'bold',
          color: '#764ba2'
        }}>
          {purchaseMessage}
        </div>
      )}

      <div className="shop-content">
        {/* Category sidebar */}
        <nav className="category-sidebar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.label.split(' ')[1]}</span>
            </button>
          ))}
        </nav>

        {/* Items grid */}
        <div className="items-grid">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="shop-item"
              onClick={() => handlePurchase(item)}
            >
              <div className="item-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: 'auto' }} />
                ) : (
                  item.emoji
                )}
              </div>
              <div className="item-name">{item.name}</div>
              <div className="item-price">
                <span>🪙</span>
                <span>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
