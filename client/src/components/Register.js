import React, { useContext, useState } from 'react'
import "./Form.css"
import { blogContext } from '../contexts/blogs/BlogState'
import { useNavigate } from 'react-router-dom'
import { alertContext } from '../contexts/alerts/AlertState'

import Spinner from "./Spinner"

const Register = () => {
  
  const { register, loading, setloading} = useContext(blogContext)
  const {showAlert} = useContext(alertContext)
  const [details, setdetails] = useState({
    name : "",
    email : "",
    password : "",
    repassword : ""
  })

  const navigate = useNavigate();
 

  const onchange = (e) => {
    setdetails({...details, [e.target.name] : e.target.value})
  }

  const clickRegister = async(e) => {
    e.preventDefault();
    let {name, email, password, repassword} = details ;

    // 
    setloading(true)
    const json = await register(name, email, password, repassword)
    setloading(true)
    
    if(json.success){
      showAlert("Registered successfully!", "success")
      navigate("/login")
  }
  else{
    
      
    showAlert(json.error, "danger")
  }

    setdetails({
      name : "",
    email : "",
    password : "",
    repassword : ""
    })

  }

  return (
   <>{loading && <div><Spinner/><h5 className='text-center'>Registering the user...</h5>
    </div>} {!loading && <div className="contain">
    <div className='container text-center'>
        <h2>Register</h2>
    </div>
    <form onSubmit={clickRegister}>
    <div className="mb-3">
<label htmlFor="name" className="form-label">Username</label>
<input type="text" className="form-control" id="name" name="name" aria-describedby="name" placeholder='name' onChange={onchange} value = {details.name} />

</div>
<div className="mb-3">
<label htmlFor="email" className="form-label">Usermail</label>
<input type="email" className="form-control" id="email" name="email" aria-describedby="email" placeholder='e-mail' onChange={onchange} value ={details.email} />

</div>
<div className="mb-3">
<label htmlFor="password" className="form-label">Password</label>
<input type="password" className="form-control" id="password" name="password" placeholder='password' onChange={onchange} value ={details.password} />
</div>
<div className="mb-3">
<label htmlFor="repassword" className="form-label">Retype-Password</label>
<input type="password" className="form-control" id="repassword" name="repassword" placeholder='password' onChange={onchange} value={details.repassword} />
</div>

<div className="text-center">
<button type="submit" className="btn btn-dark">Register</button>
</div>
</form>
</div>}</> 
  )
}

export default Register
