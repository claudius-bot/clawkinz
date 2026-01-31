import { useState, useRef } from 'react'
import type { Clawdbot, InventoryItem } from '../types'
import { asset } from '../utils'

interface RoomScreenProps {
  clawdbot: Clawdbot
  inventory: InventoryItem[]
  clawCash: number
  onShop: () => void
  onUpdateInventory: (inventory: InventoryItem[]) => void
}

export default function RoomScreen({ 
  clawdbot, 
  inventory, 
  clawCash, 
  onShop,
  onUpdateInventory 
}: RoomScreenProps) {
  const [crabPosition, setCrabPosition] = useState({ x: 200, y: 300 })
  const [isWalking, setIsWalking] = useState(false)
  const [facingRight, setFacingRight] = useState(true)
  const roomRef = useRef<HTMLDivElement>(null)

  // Handle click to move crab
  const handleRoomClick = (e: React.MouseEvent) => {
    if (!roomRef.current) return
    
    const rect = roomRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 60 // Center the crab
    const y = e.clientY - rect.top - 60
    
    setFacingRight(x > crabPosition.x)
    setIsWalking(true)
    setCrabPosition({ x: Math.max(0, x), y: Math.max(0, y) })
    
    setTimeout(() => setIsWalking(false), 500)
  }

  // Handle furniture drag
  const handleFurnitureDrag = (id: string, e: React.DragEvent) => {
    e.dataTransfer.setData('furnitureId', id)
  }

  const handleFurnitureDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('furnitureId')
    if (!id || !roomRef.current) return

    const rect = roomRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 75
    const y = e.clientY - rect.top - 75

    const updated = inventory.map(item => 
      item.id === id ? { ...item, position: { x, y } } : item
    )
    onUpdateInventory(updated)
  }

  return (
    <div className="room-screen">
      {/* Room background */}
      <div className="room-background">
        <img src={asset('room-background.png')} alt="" />
      </div>

      <div className="room-content">
        {/* Header */}
        <header className="room-header">
          <div className="pet-info">
            <img 
              src={asset('crab-character.png')}
              alt={clawdbot.name} 
              className="pet-avatar"
            />
            <span className="pet-name">{clawdbot.name}</span>
          </div>
          <div className="currency">
            <span>🪙</span>
            <span>{clawCash.toLocaleString()} ClawCash</span>
          </div>
        </header>

        {/* Main room area */}
        <div 
          ref={roomRef}
          className="room-main"
          onClick={handleRoomClick}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFurnitureDrop}
        >
          {/* Walking crab */}
          <img
            src={asset('crab-walking.png')}
            alt={clawdbot.name}
            className="walking-crab"
            style={{
              left: crabPosition.x,
              top: crabPosition.y,
              transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
              transition: isWalking ? 'all 0.5s ease' : 'none'
            }}
          />

          {/* Placed furniture */}
          {inventory.filter(item => item.placed && item.position).map(item => (
            <div
              key={item.id}
              className="furniture-item"
              style={{
                left: item.position!.x,
                top: item.position!.y,
              }}
              draggable
              onDragStart={(e) => handleFurnitureDrag(item.id, e)}
            >
              <img src={asset(`furniture-${item.type}.png`)} alt={item.name} />
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="room-toolbar">
          <button className="toolbar-btn" onClick={onShop}>
            🛍️ W Shop
          </button>
          <button className="toolbar-btn">
            📦 Inventory ({inventory.length})
          </button>
          <button className="toolbar-btn">
            🎮 Games
          </button>
          <button className="toolbar-btn">
            🗺️ Map
          </button>
        </div>
      </div>
    </div>
  )
}
