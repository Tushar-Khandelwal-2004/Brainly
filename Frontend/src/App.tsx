import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import CreateContent from './components/CreateContent'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/dashboard'
import Signup from './pages/Signup'
import Signin from './pages/signin'

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Signup/>
  )
}

export default App
