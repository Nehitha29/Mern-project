import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { blogContext } from '../contexts/blogs/BlogState'
import { alertContext } from '../contexts/alerts/AlertState'

const Navbar = () => {

  const {Filter} = useContext(blogContext)
  const {showAlert} = useContext(alertContext)
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("usertoken")
  showAlert("Logout successfully!", "success")
    navigate("/login")
}


  return (
    <>
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">MyBlog</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/all">Allposts</Link>
        </li>
        {localStorage.getItem("usertoken") ? <li className="nav-item">
          <Link className="nav-link" to="/create">Create a post</Link>
        </li> : ""}
      </ul>
      {localStorage.getItem("usertoken") ? <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={Filter}/>
        <button className="shadow-lg btn btn-light mx-2 bg-transparent text-light" onClick={logout}>Logout</button> </form>:
        
        <form className="d-flex" role="search">
      <Link className="shadow-lg btn btn-light mx-2 bg-transparent text-light" to="/login" role="button">Login</Link>
        <Link className="btn btn-light mx-2 bg-transparent text-light" to="/register" role="button">Register</Link>
        </form>}
      
    </div>
  </div>
</nav>
</>
    </>
  )
}

export default Navbar
