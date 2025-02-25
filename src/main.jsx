import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Fana from './App.jsx'
import App from './login'
import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './AuthContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
          <Route path="/" element={
            <App />
          } />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Fana/>
            </ProtectedRoute>
          }/>
        </Routes>
    </AuthProvider>
  </BrowserRouter>,
)
