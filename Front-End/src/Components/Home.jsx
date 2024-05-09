import React,{useState} from 'react'
import axios from 'axios'
import  './style.css'
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const [input, setInput] = useState({
    newpassword : "",
    confirmpassword : "",
  })
  const navigate = useNavigate()

  const HandleLogin = ()=>{
    axios.post("http://localhost:3000/change", input,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    }).then(result => {
      if (result) {
        console.log(result)
        navigate("/login")
      }
    }).catch(err => console.log(err))
  }

  return (
    <div>
      <h1>This is My Home</h1>
      <h1>Welcome {name}</h1>
      <button>Log out</button>
      <div className='login'>
            <h1>Login</h1>
            <input type="password" className="inputBox" placeholder='newPassword'
            name='newpassword'
            value={input.newpassword}
            onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
             />
            <input type="password" className="inputBox" placeholder='confirmPassword'
            name='confirmpassword'
            value={input.confirmpassword}
            onChange={(e)=> setInput({...input, [e.target.name] : e.target.value})}
             />
            <button className="appButton" type="button" onClick={HandleLogin}>Login</button>
        </div>
    </div>
  )
}

export default Home