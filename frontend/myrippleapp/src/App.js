import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register.js';
import Login from './components/Login.js';
import UserDashboard from './components/UserDashboard.js';
import AdminDashboard from './components/Admindashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/register"/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/admindashboard' element={<AdminDashboard/>} />
        <Route path='/userdashboard' element={<UserDashboard/>} />
      </Routes>
    </Router>
  )
}


export default App;
