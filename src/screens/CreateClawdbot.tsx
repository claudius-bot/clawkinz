import { useState } from 'react'
import type { Clawdbot } from '../types'

interface CreateClawdbotProps {
  onComplete: (clawdbot: Clawdbot) => void
}

const PERSONALITIES = [
  { id: 'loyal', label: '💝 Loyal', emoji: '💝' },
  { id: 'clever', label: '🧠 Clever', emoji: '🧠' },
  { id: 'playful', label: '🎮 Playful', emoji: '🎮' },
  { id: 'mischievous', label: '😈 Mischievous', emoji: '😈' },
  { id: 'curious', label: '🔍 Curious', emoji: '🔍' },
  { id: 'brave', label: '⚔️ Brave', emoji: '⚔️' },
  { id: 'gentle', label: '🌸 Gentle', emoji: '🌸' },
  { id: 'energetic', label: '⚡ Energetic', emoji: '⚡' },
  { id: 'sleepy', label: '😴 Sleepy', emoji: '😴' },
]

const COLORS = [
  { id: 'red', color: '#ff6b6b', filter: 'hue-rotate(0deg)' },
  { id: 'orange', color: '#ffb347', filter: 'hue-rotate(30deg)' },
  { id: 'yellow', color: '#ffd54f', filter: 'hue-rotate(50deg)' },
  { id: 'green', color: '#4ade80', filter: 'hue-rotate(100deg)' },
  { id: 'blue', color: '#4a90d9', filter: 'hue-rotate(180deg)' },
  { id: 'purple', color: '#a855f7', filter: 'hue-rotate(260deg)' },
  { id: 'pink', color: '#f472b6', filter: 'hue-rotate(320deg)' },
]

const ACCESSORIES = [
  { id: 'none', label: 'None', emoji: '❌' },
  { id: 'hat', label: 'Hat', emoji: '🎩' },
  { id: 'bow', label: 'Bow', emoji: '🎀' },
  { id: 'crown', label: 'Crown', emoji: '👑' },
  { id: 'glasses', label: 'Glasses', emoji: '👓' },
  { id: 'flower', label: 'Flower', emoji: '🌺' },
]

export default function CreateClawdbot({ onComplete }: CreateClawdbotProps) {
  const [name, setName] = useState('')
  const [personalities, setPersonalities] = useState<string[]>([])
  const [color, setColor] = useState('red')
  const [accessory, setAccessory] = useState('none')

  const togglePersonality = (id: string) => {
    setPersonalities(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id)
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]
      }
      return [...prev, id]
    })
  }

  const handleCreate = () => {
    if (!name.trim()) {
      alert('Please give your Clawdbot a name!')
      return
    }
    if (personalities.length === 0) {
      alert('Please select at least one personality trait!')
      return
    }

    onComplete({
      id: Date.now().toString(),
      name: name.trim(),
      personality: personalities,
      color,
      accessory: accessory === 'none' ? null : accessory,
      happiness: 100,
      hunger: 100
    })
  }

  const selectedColor = COLORS.find(c => c.id === color)
  const selectedAccessory = ACCESSORIES.find(a => a.id === accessory)

  return (
    <div className="create-screen">
      <h1 className="create-title">🦀 Create Your Clawdbot! 🦀</h1>
      
      <div className="create-box">
        {/* Preview */}
        <div className="clawdbot-preview">
          <div 
            className="preview-crab"
            style={{ filter: selectedColor?.filter }}
          >
            🦀
            {selectedAccessory && selectedAccessory.id !== 'none' && (
              <span style={{ 
                position: 'absolute', 
                top: '-20px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                fontSize: '2rem'
              }}>
                {selectedAccessory.emoji}
              </span>
            )}
          </div>
          <div className="preview-name">{name || 'Your Clawdbot'}</div>
        </div>

        {/* Name */}
        <div className="create-section">
          <h3 className="create-section-title">What's your Clawdbot's name?</h3>
          <input
            type="text"
            className="name-input"
            placeholder="Enter a name..."
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={20}
          />
        </div>

        {/* Personality */}
        <div className="create-section">
          <h3 className="create-section-title">Choose up to 3 personality traits:</h3>
          <div className="personality-grid">
            {PERSONALITIES.map(p => (
              <div
                key={p.id}
                className={`personality-option ${personalities.includes(p.id) ? 'selected' : ''}`}
                onClick={() => togglePersonality(p.id)}
              >
                {p.label}
              </div>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="create-section">
          <h3 className="create-section-title">Pick a color:</h3>
          <div className="color-grid">
            {COLORS.map(c => (
              <div
                key={c.id}
                className={`color-option ${color === c.id ? 'selected' : ''}`}
                style={{ background: c.color }}
                onClick={() => setColor(c.id)}
              />
            ))}
          </div>
        </div>

        {/* Accessory */}
        <div className="create-section">
          <h3 className="create-section-title">Choose an accessory:</h3>
          <div className="accessory-grid">
            {ACCESSORIES.map(a => (
              <div
                key={a.id}
                className={`accessory-option ${accessory === a.id ? 'selected' : ''}`}
                onClick={() => setAccessory(a.id)}
              >
                {a.emoji}
              </div>
            ))}
          </div>
        </div>

        <button className="create-button" onClick={handleCreate}>
          Adopt Your Clawdbot! 🦀💕
        </button>
      </div>
    </div>
  )
}
