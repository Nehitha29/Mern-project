import React, { useContext, useEffect, useState } from 'react'
import { blogContext } from '../contexts/blogs/BlogState'
import { Link, useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'

const Post = () => {

    const {getpost, userid} = useContext(blogContext)

   

    const {id} = useParams()

    const [post, setpost] = useState(null)
    async function fetchData(){
        const json = await getpost(id)
        setpost(json.post)

       }
      
      //  if(post)   console.log(userid, post.user._id)

    useEffect(() => {
       
       fetchData()
       // eslint-disable-next-line 
    }, [])

  return (
    <>
    {post && <div className="post-page">
        <h1>{post.title}</h1>
        <time>{formatISO9075(new Date(post.updatedAt))}</time>
        <div className="author">By @{post.user.name}</div>
        { localStorage.getItem("usertoken") && (userid === post.user._id) && <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${post._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div> }
        <div className="image" >
            <img src={post.image} alt="Empty" />
        </div>

        
        <div dangerouslySetInnerHTML={{__html : post.content}}></div>
    </div>}
    </>
  )
}

export default Post
