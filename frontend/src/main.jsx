// ============================================================================
// MAIN.JSX - React Application Entry Point
// ============================================================================
// This is the root initialization file for the React application
// Creates the React root element and mounts the App component to the DOM
// Wrapped in StrictMode for development warnings and checks

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create React root at the 'root' div in index.html and mount the App
// StrictMode helps identify potential problems in the application during development
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
