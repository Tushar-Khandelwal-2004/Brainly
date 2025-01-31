import './App.css'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Shared from './pages/Shared';
import LocomotiveScroll from "locomotive-scroll"
//Delete content
//signin UI
//Log out
function App() {
  const locomotiveScroll=new LocomotiveScroll();
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
