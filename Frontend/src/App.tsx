import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import CreateContent from './components/CreateContent'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/dashboard'
import Signup from './pages/Signup'
import Signin from './pages/signin'
import { BrowserRouter ,Routes , Route } from 'react-router-dom'
function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
