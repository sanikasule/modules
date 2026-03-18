// import { useState } from 'react'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import { useAuthStore } from './store/auth.store'
import './api/interceptors'
// import './App.css'

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return (
    <>
      {isAuthenticated ? <ProtectedRoute /> : <PublicRoute />}
    </>
  )
}

export default App
