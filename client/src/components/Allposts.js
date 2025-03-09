import React, { useContext, useEffect, useState } from 'react'
import Blogitem from './Blogitem'
import { blogContext } from '../contexts/blogs/BlogState'
import Spinner from './Spinner'

const Allposts = () => {

  const {allposts, fetchallposts, allsuccess, loading} = useContext(blogContext)

  const [page, setpage] = useState(1)

  const handleNextClick = (e) => {
    e.preventDefault()
    setpage(page+1)
    fetchallposts(page+1)
    // console.log(page)
  }

  const handlePrevClick = (e) => {
    e.preventDefault()
    setpage(page-1)
    fetchallposts(page-1)
  }

  useEffect(() => {
    fetchallposts(1)
    document.title = "Home-allposts"

    setTimeout(() => {
      document.title = "Blog"
    }, 3000);
    // eslint-disable-next-line 
  }, [])

  return (
    <>
    <div className="container mt-3">
      {loading && <Spinner/>}
      {!loading && allposts.length <= 0 && <h5> No posts to show.</h5>}
        {!loading && <>
          <div className="row">
          {allposts.length >0 && allposts.map((val) => {
            return <Blogitem key ={val._id} {...val} name = {val.user.name}/>
          })}
           
        </div>
        {allposts.length >0 && <div className=" container d-flex justify-content-between" style={{marginTop : "15px"}}>
                <button disabled={page<=1} type="button" className="btn btn-dark mt-10" onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled = {allsuccess} type="button" className="btn btn-dark mt-10" onClick={handleNextClick}>Next &rarr;</button>
                </div>
}
        </>}
    </div>
    </>
  )
}

export default Allposts
