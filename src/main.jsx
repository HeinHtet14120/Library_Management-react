import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeContextProvider } from './contexts/ThemeContext'
import AuthContexProvider from './contexts/AuthContex'
import Router from './router/index'


ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthContexProvider>
    <ThemeContextProvider>
     <Router/>
    </ThemeContextProvider>
  </AuthContexProvider> 

)
