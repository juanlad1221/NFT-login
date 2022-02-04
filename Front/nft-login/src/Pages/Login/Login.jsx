import './Login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../assets/miner.png'
import axios from 'axios'
import NavBar from '../../Components/NavBar'



export default function Home() {
  let navigate = useNavigate()
  const [username, setUser] = useState('')
  const [password, setPass] = useState('')

  const makeLogin = (user, password) => {
    if (!user || !password) {
      alert('ERROR: FIELDS EMPTY...')
      return
    }

    axios.post('http://localhost:3001/api/login', {
      username,
      password
    })
      .then(resp => {
        localStorage.setItem('token', resp.data.token)
          ; navigate('/home')
      })
      .catch(err => { handleError(err) })
  }
  const handleUser = (e) => {
    setUser(e.target.value)
    console.log(e.target.value)
  }
  const handlePassword = (e) => {
    setPass(e.target.value)
    console.log(e.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    makeLogin(username, password)
  }
  const handleError = (err) => {
    alert('ERROR: INCORRECT USER OR PASSWORD...')
    setUser('')
    setPass('')
    document.getElementById('user').value = ''
    document.getElementById('password').value = ''
  }





  return (
    <>

      <NavBar />

      <div className='login-container'>

        <form action="" onSubmit={handleSubmit}>
          <input type="text" id='user' placeholder='username...' onChange={(e) => handleUser(e)} />

          <input type="password" id='password' placeholder='password...' onChange={(e) => handlePassword(e)} />

          <button type='submit'>Send</button>
        </form>

        <div className="mt">
          <Link to='/register'>
            <a href="">Register</a>
          </Link>
        </div>

      </div>

    </>
  );
}
