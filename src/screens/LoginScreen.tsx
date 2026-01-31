import { useState } from 'react'
import type { User } from '../types'

interface LoginScreenProps {
  isRegister: boolean
  onLogin: (user: User) => void
  onBack: () => void
  onSwitch: () => void
}

export default function LoginScreen({ isRegister, onLogin, onBack, onSwitch }: LoginScreenProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin({
        id: Date.now().toString(),
        username: username.trim(),
        clawCash: 2000,
        createdAt: Date.now()
      })
    }
  }

  return (
    <div className="login-screen">
      <div className="login-container">
        <img 
          src="/assets/crab-character.png" 
          alt="Clawdbot mascot" 
          className="login-mascot"
        />
        
        <h1 className="login-title">
          {isRegister ? '🎉 Join Clawkinz!' : '👋 Welcome Back!'}
        </h1>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegister && (
            <input
              type="password"
              className="login-input"
              placeholder="Confirm Password"
            />
          )}
          <button type="submit" className="login-btn">
            {isRegister ? '🦀 Create Account' : '🦀 Log In'}
          </button>
        </form>
        
        <div className="login-links">
          <button className="login-link" onClick={onSwitch}>
            {isRegister 
              ? 'Already have an account? Log in!' 
              : "Don't have an account? Sign up!"}
          </button>
          <button className="login-link" onClick={onBack}>
            ← Back to Welcome
          </button>
        </div>
      </div>
    </div>
  )
}
