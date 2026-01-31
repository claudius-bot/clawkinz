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
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields!')
      return
    }

    if (isRegister) {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('clawkinz_users') || '{}')
      if (existingUsers[username]) {
        setError('Username already taken!')
        return
      }
      // Save new user
      existingUsers[username] = { password, createdAt: Date.now() }
      localStorage.setItem('clawkinz_users', JSON.stringify(existingUsers))
    } else {
      // Check credentials
      const users = JSON.parse(localStorage.getItem('clawkinz_users') || '{}')
      if (!users[username] || users[username].password !== password) {
        setError('Invalid username or password!')
        return
      }
    }

    onLogin({
      id: username,
      username,
      createdAt: Date.now()
    })
  }

  return (
    <div className="login-screen">
      <div className="login-box">
        <div className="login-crab">🦀</div>
        <h1 className="login-title">
          {isRegister ? 'Join Clawkinz!' : 'Welcome Back!'}
        </h1>
        <p className="login-subtitle">
          {isRegister 
            ? 'Create your account to adopt a Clawdbot!' 
            : 'Sign in to see your Clawdbot!'}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p style={{ color: '#ff6b6b', fontWeight: 600 }}>{error}</p>}
          <button type="submit" className="login-button">
            {isRegister ? "Let's Go! 🦀" : 'Sign In! 🦀'}
          </button>
        </form>

        <div className="login-links">
          <span className="login-link" onClick={onSwitch}>
            {isRegister 
              ? 'Already have an account? Sign in!' 
              : "Don't have an account? Join now!"}
          </span>
          <span className="login-link" onClick={onBack}>
            ← Back to Welcome
          </span>
        </div>
      </div>
    </div>
  )
}
