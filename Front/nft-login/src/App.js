import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
