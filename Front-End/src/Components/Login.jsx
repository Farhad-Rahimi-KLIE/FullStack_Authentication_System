import React,{ useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const login = () => {

  const [input, setInput] = useState({
    email : "",
    password : "",
  })
  const navigate = useNavigate()

  const HandleLogin = ()=>{
    axios.post("http://localhost:3000/login", input).then(result => {
      localStorage.setItem('token', result.data.token)
      localStorage.setItem('name', result.data.name)
      console.log(result)
    }).catch(err => console.log(err))
    navigate('/home')
  }

  return (
    <div className='login'>
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder='Enter Email'
            name='email'
            value={input.email}
            onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
             />
            <input type="password" className="inputBox" placeholder='Enter Password'
            name='password'
            value={input.password}
            onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
             />
            <button className="appButton" type="button" onClick={HandleLogin}>Login</button>
        </div>
  )
}

export default login