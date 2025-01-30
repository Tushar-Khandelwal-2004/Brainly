//3:14:31
import './App.css'
import Dashboard from './pages/dashboard'
import Signup from './pages/Signup'
import Signin from './pages/signin'
// import { BrowserRouter ,Routes , Route } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Shared from './pages/Shared';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/share/:shareId' element={<Shared />} />
      </Routes>
    </Router>
  )
}

export default App
