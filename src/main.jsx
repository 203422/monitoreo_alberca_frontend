import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './routes/Dashboard.jsx'
import './assets/styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import { AuthProvider } from './auth/authProvider.jsx'
import Ph from './routes/Ph.jsx'
import Agua from './routes/Agua.jsx'
import Temperatura from './routes/Temperatura.jsx'
import Clima from './routes/Clima.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/ph",
        element: <Ph />
      },
      {
        path: "/agua",
        element: <Agua />
      },
      {
        path: "/temperatura",
        element: <Temperatura />
      },
      {
        path: "/clima",
        element: <Clima />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>,
)
