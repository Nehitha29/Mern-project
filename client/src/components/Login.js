import React, { useContext, useState } from 'react'
import "./Form.css"
import { blogContext } from '../contexts/blogs/BlogState'
import { useNavigate } from 'react-router-dom'
import { alertContext } from '../contexts/alerts/AlertState'
import Spinner from './Spinner'

const Login = () => {

  const {login, loading, setloading} = useContext(blogContext)
  const {showAlert} = useContext(alertContext)
  const navigate = useNavigate()

  const [mail, setmail] = useState("")
  const [password, setpassword] = useState("")
   
  const clickLogin = async (e) => {
     e.preventDefault()
     setloading(true)
    const json = await login(mail, password);
    setloading(false)

    if(json.success){
      
      localStorage.setItem('usertoken',  json.authToken )
      
      navigate("/")
      showAlert("Login successfully !", "success")
    }

    else{
      showAlert(json.error, "danger");
    }
  }





  return (
    <>{loading && <div><Spinner/><h5 className='text-center'>Logging in...</h5>
    </div>} {!loading && <div className="contain login">
        <div className='container text-center'>
            <h2>Login</h2>
        </div>
        <form onSubmit={clickLogin}>
  <div className="mb-3">

    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder='usermail' onChange={e => {setmail(e.target.value)}} value={mail}/>
    
  </div>
  <div className="mb-3">
    
    <input type="password" className="form-control" id="password" name="password" placeholder='password' onChange={e => setpassword(e.target.value)} value={password}/>
  </div>
  
  <div className="text-center">
  <button type="submit" className="btn btn-dark">Login</button>
  </div>
</form>
    </div>}</>
    
  )
}

export default Login
