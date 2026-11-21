import { useEffect, useState } from 'react'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'

// Jednoduchý hash routing (funguje na GitHub Pages bez servera): #/admin = administrácia.
const isAdmin = () => window.location.hash.startsWith('#/admin')

export default function Root() {
  const [admin, setAdmin] = useState(isAdmin)

  useEffect(() => {
    const onHash = () => {
      const next = isAdmin()
      setAdmin((prev) => {
        if (prev !== next) window.scrollTo(0, 0)
        return next
      })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.title = admin ? 'Administrácia – Klára' : 'Klára – kaviareň & pekáreň'
  }, [admin])

  return admin ? <AdminApp /> : <App />
}
