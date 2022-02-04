import './NavBar.css'
import { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'


export default function NavBar() {
    let navigate = useNavigate()
    const [islogged, setIslogged] = useState(false)

    const LogOut = () => {
        localStorage.setItem('token', '')
        navigate('/')
        window.location.reload()
    }
    
    useEffect(() => {
        if(localStorage.getItem('token')){
          setIslogged(true)
        }
      }, []);


    return (
        <nav>
            <ul className='menu'>
                <li className="logo"><h5>NFT-Game</h5></li>
                {
                    islogged ?
                        <li onClick={LogOut}>LogOut</li>
                        :
                        <li>Login</li>
                }

            </ul>
        </nav>
    )
}
