import './NavBar.css'
import { useState, useEffect } from 'react'


export default function NavBar() {
    const [islogged, setIslogged] = useState(false)

    const LogOut = () => {
        localStorage.setItem('token', '')
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
