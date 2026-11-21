import { useState } from 'react'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import './admin.css'

// DEMO administrácia. Prihlásenie overuje len prehliadač – nič reálne nechráni.
// TODO: pri napojení na backend nahradiť skutočným prihlásením.
const SESSION_KEY = 'klara-admin-session'

const readSession = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(readSession)

  const login = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // ignore
    }
    setLoggedIn(true)
  }

  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      // ignore
    }
    setLoggedIn(false)
  }

  return <div className="admin">{loggedIn ? <Dashboard onLogout={logout} /> : <Login onLogin={login} />}</div>
}
