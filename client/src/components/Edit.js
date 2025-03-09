import React, { useContext, useEffect, useState } from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./Form.css"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import app from "../Firebase"

import { blogContext } from '../contexts/blogs/BlogState';
import { useNavigate, useParams } from 'react-router-dom'
import { alertContext } from '../contexts/alerts/AlertState'
import Spinner from './Spinner'

const modules = {
    toolbar: [
        ['bold', 'italic'], ['link', 'image'],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],

    ],
  };

const Edit = () => {

    const [data, setdata] = useState({
        title :"",
        summary : ""
    
     })

     const {showAlert} = useContext(alertContext)
    
     const {edit, host, loading, setloading} = useContext(blogContext)
     const {id} = useParams()
    
     const [image, setimage] = useState("")
    
     const [content, setcontent] = useState("")
     const navigate = useNavigate()

     const onchange = (e) => {
        setdata({...data,  [e.target.name] : e.target.value})
    
   }

   const [url, seturl] = useState("")


     useEffect(() => {
        fetch(`${host}/post/${id}`, {
          method : "GET",
        headers : {
            "Content-Type": "application/json"
        }
        }).then(response => {
            
            response.json().then(post => {
                setdata({
                    title : post.post.title,
                    summary : post.post.summary
                })
    
                setcontent(post.post.content)
                seturl(post.post.image)

                // console.log(post)
            })
            
        })
        // eslint-disable-next-line 
           
     }, [])

     

     const clickEdit = async (e)=> {
        e.preventDefault();

        let imageUrl = url;
  
  if(image !== ""){
    const storage = getStorage(app)
  const storageRef = ref(storage, "images/" + image.name)
  setloading(true)
  await uploadBytes(storageRef, image)
  const downloadUrl = await getDownloadURL(storageRef)
  imageUrl = downloadUrl
  }

  let {title, summary} = data

  const {ok, error} = await edit(title, summary, content,  imageUrl, id)
  setloading(false)

  if(ok){
    
    const url = "/post/"+id
    showAlert("Edited Successfully!", "success")
    navigate(url)
}
else{
  showAlert(error, "danger")
}

     }

     
  return (
    <>{loading && <div><Spinner/><h5 className='text-center'>Editing a post...</h5>
    </div>}
    
    {!loading && <form className='containe' onSubmit={clickEdit}>
  <div className="mb-3">

    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder='title' onChange={onchange} value={data.title}/>
    
  </div>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="summary" name="summary" placeholder='summary' onChange={onchange} value={data.summary} />
  </div>

  <div className="mb-3">
    
    <input type="file" className="form-control" id="file" name="file" onChange={e => setimage(e.target.files[0])}  />
    <span className="form-text">Only choose .jpg files</span>
  </div>

  <div className="mb-3">
    
  <ReactQuill modules = {modules} theme='snow' value={content} onChange={setcontent}/>
  </div>
  
  <div className="text-center">
  <button type="submit" className="btn btn-dark">Edit Post</button>
  </div>
</form>}
    </>
    
    
  )
}

export default Edit
