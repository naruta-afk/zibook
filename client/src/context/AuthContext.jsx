import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

const readStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('zibookUser')
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    return null
  }
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser)

  useEffect(() => {
    const syncUser = () => setUser(readStoredUser())
    window.addEventListener('zibook-auth-change', syncUser)
    window.addEventListener('storage', syncUser)

    return () => {
      window.removeEventListener('zibook-auth-change', syncUser)
      window.removeEventListener('storage', syncUser)
    }
  }, [])

  const login = (credentials) => {
    const nextUser = { ...credentials }
    delete nextUser.password
    localStorage.setItem('zibookUser', JSON.stringify(nextUser))
    setUser(nextUser)
    window.dispatchEvent(new Event('zibook-auth-change'))
    return nextUser
  }

  const logout = async () => {
    try {
      await api.post('/api/user/logout')
    } catch (error) {
      console.warn('Logout request failed:', error)
    }

    localStorage.removeItem('zibookUser')
    setUser(null)
    window.dispatchEvent(new Event('zibook-auth-change'))
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin' || user?.isAdmin === true,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be used inside AuthProvider')

  return context
}

export default AuthProvider