import './Register.css'
import {useState} from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'



export default function Register() {
    let navigate = useNavigate()
    const [username, setUser] = useState('')
    const [password, setPass] = useState('')
    const [email, setEmail] = useState('')


    const handleUser = (e) => {
        setUser(e.target.value)
        console.log(e.target.value)
      }
      const handlePassword = (e) => {
        setPass(e.target.value)
        console.log(e.target.value)
      }
      const handleEmail = (e) => {
        setEmail(e.target.value)
        console.log(e.target.value)
      }
      const handleSubmit = (event) => {
        event.preventDefault()
        makeRegister(username, password, email)
      }
      const handleError = (err) => {
        alert('ERROR: INCORRECT USER OR PASSWORD...')
        setUser('')
        setPass('')
        setEmail('')
        document.getElementById('user').value = ''
        document.getElementById('password').value = ''
        document.getElementById('email').value = ''
      }
      const makeRegister = (user, password, email) => {
        if (!user || !password || !email) {
          alert('ERROR: FIELDS EMPTY...')
          return
        }
    
        axios.post('http://localhost:3001/api/register', {
          username,
          password,
          email
        })
          .then(resp => {
            if(resp.status === 200){
                navigate('/')
            }
          })
          .catch(err => {handleError(err)})
      }


    return (
        <div className='login-container'>

            <h3>Register</h3>

            <form action="" onSubmit={handleSubmit} >
                <input type="text" id='user' placeholder='username...' onChange={(e) => handleUser(e)} />

                <input type="password" id='password' placeholder='password...' onChange={(e) => handlePassword(e)} />

                <input type="text" id='email' placeholder='email...' onChange={(e) => handleEmail(e)} />

                <button type='submit'>Register</button>
            </form>

        </div>
    )
}
