import { useState, useEffect } from 'react'
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import CreateClawdbot from './screens/CreateClawdbot'
import RoomScreen from './screens/RoomScreen'
import ShopScreen from './screens/ShopScreen'
import type { User, Clawdbot, InventoryItem } from './types'
import './App.css'

type Screen = 'welcome' | 'login' | 'register' | 'create' | 'room' | 'shop'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome')
  const [user, setUser] = useState<User | null>(null)
  const [clawdbot, setClawdbot] = useState<Clawdbot | null>(null)
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [clawCash, setClawCash] = useState(500)

  // Load saved state
  useEffect(() => {
    const savedUser = localStorage.getItem('clawkinz_user')
    const savedClawdbot = localStorage.getItem('clawkinz_clawdbot')
    const savedInventory = localStorage.getItem('clawkinz_inventory')
    const savedCash = localStorage.getItem('clawkinz_cash')
    
    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedClawdbot) setClawdbot(JSON.parse(savedClawdbot))
    if (savedInventory) setInventory(JSON.parse(savedInventory))
    if (savedCash) setClawCash(JSON.parse(savedCash))
  }, [])

  // Save state changes
  useEffect(() => {
    if (user) localStorage.setItem('clawkinz_user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    if (clawdbot) localStorage.setItem('clawkinz_clawdbot', JSON.stringify(clawdbot))
  }, [clawdbot])

  useEffect(() => {
    localStorage.setItem('clawkinz_inventory', JSON.stringify(inventory))
  }, [inventory])

  useEffect(() => {
    localStorage.setItem('clawkinz_cash', JSON.stringify(clawCash))
  }, [clawCash])

  const handleLogin = (userData: User) => {
    setUser(userData)
    const savedClawdbot = localStorage.getItem('clawkinz_clawdbot')
    if (savedClawdbot) {
      setCurrentScreen('room')
    } else {
      setCurrentScreen('create')
    }
  }

  const handleCreateClawdbot = (newClawdbot: Clawdbot) => {
    setClawdbot(newClawdbot)
    setCurrentScreen('room')
  }

  const handlePurchase = (item: InventoryItem, cost: number) => {
    if (clawCash >= cost) {
      setClawCash(prev => prev - cost)
      setInventory(prev => [...prev, { ...item, id: Date.now().toString() }])
      return true
    }
    return false
  }

  return (
    <div className="app">
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onMember={() => setCurrentScreen('login')}
          onNewAdoption={() => setCurrentScreen('register')}
        />
      )}
      {(currentScreen === 'login' || currentScreen === 'register') && (
        <LoginScreen
          isRegister={currentScreen === 'register'}
          onLogin={handleLogin}
          onBack={() => setCurrentScreen('welcome')}
          onSwitch={() => setCurrentScreen(currentScreen === 'login' ? 'register' : 'login')}
        />
      )}
      {currentScreen === 'create' && (
        <CreateClawdbot
          onComplete={handleCreateClawdbot}
        />
      )}
      {currentScreen === 'room' && clawdbot && (
        <RoomScreen
          clawdbot={clawdbot}
          inventory={inventory}
          clawCash={clawCash}
          onShop={() => setCurrentScreen('shop')}
          onUpdateInventory={setInventory}
        />
      )}
      {currentScreen === 'shop' && (
        <ShopScreen
          clawCash={clawCash}
          onPurchase={handlePurchase}
          onBack={() => setCurrentScreen('room')}
        />
      )}
    </div>
  )
}

export default App
