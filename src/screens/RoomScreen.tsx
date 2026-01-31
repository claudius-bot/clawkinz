import { useState, useRef, useEffect } from 'react'
import { Clawdbot, InventoryItem } from '../types'

interface RoomScreenProps {
  clawdbot: Clawdbot
  inventory: InventoryItem[]
  clawCash: number
  onShop: () => void
  onUpdateInventory: (inventory: InventoryItem[]) => void
}

const COLORS: Record<string, string> = {
  red: 'hue-rotate(0deg)',
  orange: 'hue-rotate(30deg)',
  yellow: 'hue-rotate(50deg)',
  green: 'hue-rotate(100deg)',
  blue: 'hue-rotate(180deg)',
  purple: 'hue-rotate(260deg)',
  pink: 'hue-rotate(320deg)',
}

export default function RoomScreen({ 
  clawdbot, 
  inventory, 
  clawCash, 
  onShop, 
  onUpdateInventory 
}: RoomScreenProps) {
  const [clawdbotPos, setClawdbotPos] = useState({ x: 200, y: 300 })
  const [draggingItem, setDraggingItem] = useState<string | null>(null)
  const roomRef = useRef<HTMLDivElement>(null)

  // Random clawdbot movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (roomRef.current) {
        const rect = roomRef.current.getBoundingClientRect()
        const newX = Math.random() * (rect.width - 100) + 50
        const newY = Math.random() * (rect.height - 200) + 150
        setClawdbotPos({ x: newX, y: newY })
      }
    }, 3000)

    return () => clearInterval(moveInterval)
  }, [])

  const handleRoomClick = (e: React.MouseEvent) => {
    if (roomRef.current && !draggingItem) {
      const rect = roomRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setClawdbotPos({ x: Math.max(50, Math.min(x, rect.width - 50)), y: Math.max(100, Math.min(y, rect.height - 100)) })
    }
  }

  const handleDragStart = (itemId: string) => {
    setDraggingItem(itemId)
  }

  const handleDragEnd = (e: React.MouseEvent, itemId: string) => {
    if (roomRef.current) {
      const rect = roomRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      onUpdateInventory(
        inventory.map(item => 
          item.id === itemId 
            ? { ...item, placed: { x, y } }
            : item
        )
      )
    }
    setDraggingItem(null)
  }

  const placeItemFromInventory = (item: InventoryItem) => {
    if (!item.placed && roomRef.current) {
      const rect = roomRef.current.getBoundingClientRect()
      onUpdateInventory(
        inventory.map(i => 
          i.id === item.id 
            ? { ...i, placed: { x: rect.width / 2, y: rect.height / 2 } }
            : i
        )
      )
    }
  }

  const placedItems = inventory.filter(item => item.placed)
  const unplacedItems = inventory.filter(item => !item.placed)

  return (
    <div className="room-screen">
      {/* Header */}
      <div className="room-header">
        <div className="room-title">🏠 {clawdbot.name}'s Room</div>
        <div className="clawcash-display">
          <span>💰</span>
          <span>{clawCash} ClawCash</span>
        </div>
        <button className="shop-button" onClick={onShop}>
          🛒 C Shop
        </button>
      </div>

      {/* Room Area */}
      <div 
        className="room-area" 
        ref={roomRef}
        onClick={handleRoomClick}
      >
        <div className="room-wall"></div>
        <div className="room-floor"></div>

        {/* Placed Items */}
        {placedItems.map(item => (
          <div
            key={item.id}
            className={`room-item ${draggingItem === item.id ? 'dragging' : ''}`}
            style={{
              left: item.placed!.x - 25,
              top: item.placed!.y - 25,
            }}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            onDragEnd={(e) => handleDragEnd(e as unknown as React.MouseEvent, item.id)}
          >
            {item.icon}
          </div>
        ))}

        {/* Clawdbot */}
        <div 
          className="room-clawdbot"
          style={{
            left: clawdbotPos.x - 40,
            top: clawdbotPos.y - 40,
            filter: COLORS[clawdbot.color] || 'none'
          }}
        >
          🦀
        </div>

        {/* Inventory Bar */}
        {unplacedItems.length > 0 && (
          <div className="inventory-bar">
            {unplacedItems.map(item => (
              <div 
                key={item.id}
                className="inventory-slot"
                onClick={() => placeItemFromInventory(item)}
                title={item.name}
              >
                {item.icon}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
