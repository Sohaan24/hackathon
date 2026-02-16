import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Default demo user
const DEMO_USER = {
  email: 'demo@gigscore.com',
  password: 'gigscore123',
  name: 'Rahul Kumar',
  phone: '+91 98765 43210'
}

// Get registered users from localStorage
const getRegisteredUsers = () => {
  const users = localStorage.getItem('gigscoreRegisteredUsers')
  return users ? JSON.parse(users) : [DEMO_USER]
}

// Save registered users to localStorage
const saveRegisteredUsers = (users) => {
  localStorage.setItem('gigscoreRegisteredUsers', JSON.stringify(users))
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('gigscoreUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        const users = getRegisteredUsers()
        const foundUser = users.find(u => u.email === email && u.password === password)
        
        if (foundUser) {
          const userData = {
            email: foundUser.email,
            name: foundUser.name,
            phone: foundUser.phone,
            isAuthenticated: true
          }
          setUser(userData)
          localStorage.setItem('gigscoreUser', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 1000)
    })
  }

  const signup = (name, email, phone, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getRegisteredUsers()
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
          reject(new Error('Email already registered'))
          return
        }
        
        // Create new user
        const newUser = {
          email,
          password,
          name,
          phone,
          createdAt: new Date().toISOString()
        }
        
        // Save to registered users
        users.push(newUser)
        saveRegisteredUsers(users)
        
        // Log in the new user
        const userData = {
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone,
          isAuthenticated: true
        }
        setUser(userData)
        localStorage.setItem('gigscoreUser', JSON.stringify(userData))
        resolve(userData)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('gigscoreUser')
    localStorage.removeItem('gigscoreData')
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
