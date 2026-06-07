import { createContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  savedPredictions: SavedPrediction[]
  savedColleges: string[]
  mockHistory: MockAllocation[]
}

export interface SavedPrediction {
  id: string
  type: 'rank' | 'college'
  date: string
  data: Record<string, unknown>
}

export interface MockAllocation {
  id: string
  date: string
  result: Record<string, unknown>
}

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  savePrediction: (prediction: Omit<SavedPrediction, 'id' | 'date'>) => void
  saveCollege: (collegeId: string) => void
  removeCollege: (collegeId: string) => void
  isCollegeSaved: (collegeId: string) => boolean
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  updateUser: () => {},
  savePrediction: () => {},
  saveCollege: () => {},
  removeCollege: () => {},
  isCollegeSaved: () => false,
})

const USERS_KEY = 'counsello-users'
const CURRENT_USER_KEY = 'counsello-current-user'

function getUsers(): Record<string, { password: string; user: User }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveUsers(users: Record<string, { password: string; user: User }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
      // Also update in users store
      const users = getUsers()
      if (users[user.email]) {
        users[user.email].user = user
        saveUsers(users)
      }
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }, [user])

  const login = async (email: string, password: string) => {
    const users = getUsers()
    const record = users[email.toLowerCase()]
    if (!record) return { success: false, error: 'No account found with this email.' }
    if (record.password !== password) return { success: false, error: 'Incorrect password.' }
    setUser(record.user)
    return { success: true }
  }

  const register = async (name: string, email: string, password: string) => {
    const users = getUsers()
    const key = email.toLowerCase()
    if (users[key]) return { success: false, error: 'An account with this email already exists.' }
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email: key,
      createdAt: new Date().toISOString(),
      savedPredictions: [],
      savedColleges: [],
      mockHistory: [],
    }
    users[key] = { password, user: newUser }
    saveUsers(users)
    setUser(newUser)
    return { success: true }
  }

  const logout = () => setUser(null)

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null)
  }

  const savePrediction = (prediction: Omit<SavedPrediction, 'id' | 'date'>) => {
    if (!user) return
    const newPrediction: SavedPrediction = {
      ...prediction,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    }
    updateUser({ savedPredictions: [newPrediction, ...user.savedPredictions].slice(0, 50) })
  }

  const saveCollege = (collegeId: string) => {
    if (!user) return
    if (!user.savedColleges.includes(collegeId)) {
      updateUser({ savedColleges: [...user.savedColleges, collegeId] })
    }
  }

  const removeCollege = (collegeId: string) => {
    if (!user) return
    updateUser({ savedColleges: user.savedColleges.filter(id => id !== collegeId) })
  }

  const isCollegeSaved = (collegeId: string) => {
    return user?.savedColleges.includes(collegeId) ?? false
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, savePrediction, saveCollege, removeCollege, isCollegeSaved }}>
      {children}
    </AuthContext.Provider>
  )
}
