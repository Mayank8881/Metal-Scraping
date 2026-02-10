// ============================================================================
// APP.JSX - Root Application Component
// ============================================================================
// This is the main entry point of the React application.
// It serves as the root component that renders the Dashboard page.
// The Dashboard contains all functionality for viewing and filtering metals.

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'

// Root App Component - Renders the Dashboard
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Main Dashboard page with all metal price data and controls */}
      <Dashboard />
    </>
  )
}

export default App
