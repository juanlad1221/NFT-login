import { useContext } from 'react'
import Login from '../../Pages/Login/Login'

export default function PrivateRoute({children}) {
    let token = localStorage.getItem('token')
    return token? children : <Login/>
}
