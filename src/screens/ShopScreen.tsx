import { useState } from 'react'
import type { InventoryItem, ShopItem } from '../types'

interface ShopScreenProps {
  clawCash: number
  onPurchase: (item: InventoryItem, cost: number) => boolean
  onBack: () => void
}

const CATEGORIES = [
  { id: 'furniture', name: 'Furniture', icon: '🛋️' },
  { id: 'food', name: 'Food', icon: '🍕' },
  { id: 'decorations', name: 'Decorations', icon: '🖼️' },
  { id: 'plants', name: 'Plants', icon: '🌱' },
  { id: 'beds', name: 'Beds', icon: '🛏️' },
  { id: 'lighting', name: 'Lighting', icon: '💡' },
  { id: 'rugs', name: 'Rugs', icon: '🟫' },
  { id: 'tables', name: 'Tables', icon: '🪑' },
  { id: 'electronics', name: 'Electronics', icon: '📺' },
  { id: 'toys', name: 'Toys', icon: '🧸' },
  { id: 'outdoor', name: 'Outdoor', icon: '🌳' },
  { id: 'special', name: 'Special', icon: '⭐' },
]

const SHOP_ITEMS: Record<string, ShopItem[]> = {
  furniture: [
    { id: 'sofa', name: 'Cozy Sofa', icon: '🛋️', category: 'furniture', price: 150 },
    { id: 'chair', name: 'Comfy Chair', icon: '🪑', category: 'furniture', price: 75 },
    { id: 'bookshelf', name: 'Bookshelf', icon: '📚', category: 'furniture', price: 120 },
    { id: 'dresser', name: 'Dresser', icon: '🗄️', category: 'furniture', price: 100 },
  ],
  food: [
    { id: 'pizza', name: 'Yummy Pizza', icon: '🍕', category: 'food', price: 25 },
    { id: 'cake', name: 'Birthday Cake', icon: '🎂', category: 'food', price: 50 },
    { id: 'icecream', name: 'Ice Cream', icon: '🍦', category: 'food', price: 20 },
    { id: 'cookie', name: 'Cookie', icon: '🍪', category: 'food', price: 15 },
  ],
  decorations: [
    { id: 'painting', name: 'Art Painting', icon: '🖼️', category: 'decorations', price: 80 },
    { id: 'mirror', name: 'Fancy Mirror', icon: '🪞', category: 'decorations', price: 60 },
    { id: 'clock', name: 'Wall Clock', icon: '🕐', category: 'decorations', price: 45 },
    { id: 'vase', name: 'Pretty Vase', icon: '🏺', category: 'decorations', price: 55 },
  ],
  plants: [
    { id: 'flower', name: 'Flower Pot', icon: '🌸', category: 'plants', price: 35 },
    { id: 'cactus', name: 'Cute Cactus', icon: '🌵', category: 'plants', price: 40 },
    { id: 'tree', name: 'Mini Tree', icon: '🌳', category: 'plants', price: 90 },
    { id: 'tulip', name: 'Tulip', icon: '🌷', category: 'plants', price: 30 },
  ],
  beds: [
    { id: 'bed', name: 'Cozy Bed', icon: '🛏️', category: 'beds', price: 200 },
    { id: 'hammock', name: 'Hammock', icon: '🏖️', category: 'beds', price: 150 },
    { id: 'pillow', name: 'Fluffy Pillow', icon: '🛋️', category: 'beds', price: 40 },
  ],
  lighting: [
    { id: 'lamp', name: 'Table Lamp', icon: '🪔', category: 'lighting', price: 55 },
    { id: 'candle', name: 'Candle', icon: '🕯️', category: 'lighting', price: 25 },
    { id: 'chandelier', name: 'Chandelier', icon: '💡', category: 'lighting', price: 180 },
  ],
  rugs: [
    { id: 'rug1', name: 'Cozy Rug', icon: '🟫', category: 'rugs', price: 60 },
    { id: 'rug2', name: 'Fancy Carpet', icon: '🔲', category: 'rugs', price: 85 },
  ],
  tables: [
    { id: 'table', name: 'Coffee Table', icon: '🪑', category: 'tables', price: 70 },
    { id: 'desk', name: 'Study Desk', icon: '🖥️', category: 'tables', price: 110 },
  ],
  electronics: [
    { id: 'tv', name: 'Big TV', icon: '📺', category: 'electronics', price: 250 },
    { id: 'radio', name: 'Radio', icon: '📻', category: 'electronics', price: 65 },
    { id: 'computer', name: 'Computer', icon: '💻', category: 'electronics', price: 300 },
  ],
  toys: [
    { id: 'teddy', name: 'Teddy Bear', icon: '🧸', category: 'toys', price: 45 },
    { id: 'ball', name: 'Beach Ball', icon: '🏐', category: 'toys', price: 20 },
    { id: 'kite', name: 'Kite', icon: '🪁', category: 'toys', price: 35 },
  ],
  outdoor: [
    { id: 'bench', name: 'Park Bench', icon: '🪑', category: 'outdoor', price: 80 },
    { id: 'fountain', name: 'Fountain', icon: '⛲', category: 'outdoor', price: 200 },
    { id: 'gnome', name: 'Garden Gnome', icon: '🧙', category: 'outdoor', price: 50 },
  ],
  special: [
    { id: 'trophy', name: 'Trophy', icon: '🏆', category: 'special', price: 500 },
    { id: 'crown', name: 'Royal Crown', icon: '👑', category: 'special', price: 1000 },
    { id: 'star', name: 'Gold Star', icon: '⭐', category: 'special', price: 250 },
  ],
}

export default function ShopScreen({ clawCash, onPurchase, onBack }: ShopScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('furniture')
  const [message, setMessage] = useState('')

  const handleBuy = (item: ShopItem) => {
    if (clawCash < item.price) {
      setMessage("Not enough ClawCash! 😢")
      setTimeout(() => setMessage(''), 2000)
      return
    }

    const inventoryItem: InventoryItem = {
      id: Date.now().toString(),
      name: item.name,
      category: item.category,
      icon: item.icon,
      price: item.price,
    }

    const success = onPurchase(inventoryItem, item.price)
    if (success) {
      setMessage(`Bought ${item.name}! 🎉`)
      setTimeout(() => setMessage(''), 2000)
    }
  }

  const items = SHOP_ITEMS[selectedCategory] || []

  return (
    <div className="shop-screen">
      {/* Header */}
      <div className="shop-header">
        <div className="shop-logo">
          <span className="shop-mascot">🦀</span>
          <span className="shop-logo-text">C Shop</span>
        </div>
        <div className="clawcash-display">
          <span>💰</span>
          <span>{clawCash} ClawCash</span>
        </div>
        <button className="back-button" onClick={onBack}>
          ← Back to Room
        </button>
      </div>

      {/* Content */}
      <div className="shop-content">
        {/* Categories */}
        <div className="shop-categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-button ${selectedCategory === cat.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="shop-items">
          {message && (
            <div style={{
              textAlign: 'center',
              padding: '10px',
              background: message.includes('😢') ? '#fee2e2' : '#dcfce7',
              borderRadius: '10px',
              marginBottom: '15px',
              fontWeight: 600,
              color: message.includes('😢') ? '#dc2626' : '#16a34a'
            }}>
              {message}
            </div>
          )}
          <div className="items-grid">
            {items.map(item => (
              <div 
                key={item.id} 
                className="shop-item"
                onClick={() => handleBuy(item)}
              >
                <div className="item-icon">{item.icon}</div>
                <div className="item-name">{item.name}</div>
                <div className="item-price">💰 {item.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="shop-footer">
        <div className="cart-info">
          Click items to buy them instantly!
        </div>
        <button className="checkout-button" onClick={onBack}>
          Done Shopping 🛒
        </button>
      </div>
    </div>
  )
}
