import React, { useContext, useEffect, useState } from 'react'
import Blogitem from './Blogitem'
import { blogContext } from '../contexts/blogs/BlogState'
import { useNavigate } from 'react-router-dom'

import Spinner from './Spinner'

const Blog = () => {

  const {posts, fetchposts, name, success, loading} = useContext(blogContext)

  const [page, setpage] = useState(1)

  const navigate = useNavigate() 

  const handleNextClick = (e) => {
    e.preventDefault()
    setpage(page+1)
    fetchposts(page+1)
    // console.log(page)
  }

  const handlePrevClick = (e) => {
    e.preventDefault()
    setpage(page-1)
    fetchposts(page-1)
  }

  useEffect(() => {
    if(!localStorage.getItem('usertoken')){
      navigate("/login")
      return ;
  }
    fetchposts(1)
    document.title = "Home-Myblog"

    setTimeout(() => {
      document.title = "Blog"
    }, 3000);
    // eslint-disable-next-line 
  }, [])

  // console.log(page)

  return (
    <>
    <div className="container mt-3">
    <h2 className='mb-30'>Welcome {name} !!</h2>
    {loading && <Spinner/>}
      {!loading && posts.length <= 0 && <div><h5>You have no Posts.</h5></div>}
        <div className="row">
          {!loading && posts.length >0 && posts.map((val) => {
            return <Blogitem key ={val._id} {...val} name={name}/>
          })}
           
        </div>
        {posts.length >0 && <div className=" container d-flex justify-content-between" style={{marginTop : "15px"}}>
                <button disabled={page<=1} type="button" className="btn btn-dark mt-10" onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled = {success} type="button" className="btn btn-dark mt-10" onClick={handleNextClick}>Next &rarr;</button>
                </div>
}
    </div>
    </>
  )
}

export default Blog
