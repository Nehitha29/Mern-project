import React, { useContext, useState } from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./Form.css"
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import app from "../Firebase"


import { blogContext } from '../contexts/blogs/BlogState';
import { useNavigate } from 'react-router-dom'
import { alertContext } from '../contexts/alerts/AlertState'
import Spinner from './Spinner'

const modules = {
    toolbar: [
        ['bold', 'italic'], ['link', 'image'],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],

    ],
  };


const Create = () => {

 const [data, setdata] = useState({
    title :"",
    summary : ""

 })

 const {create, loading, setloading} = useContext(blogContext)
 const {showAlert} = useContext(alertContext)
 const navigate = useNavigate()

 const [image, setimage] = useState("")

 const [content, setcontent] = useState("")

 const onchange = (e) => {
      setdata({...data,  [e.target.name] : e.target.value})
  
 }

 const clickCreate = async (e) => {

  

  e.preventDefault();

  const storage = getStorage(app)
  const storageRef = ref(storage, "images/" + image.name)
  setloading(true)
  await uploadBytes(storageRef, image)

  const downloadUrl = await getDownloadURL(storageRef)

  let {title, summary} = data

  const {ok, error} = await create(title, summary, content,  downloadUrl)
  setloading(false)

  if(ok){
    showAlert("created successfully!", "success")
    navigate("/")
  }
  else{
    showAlert(error, "danger")
}

  setdata({
    title : "",
    summary : ""
  })

  setcontent("")
  setimage("")
  
  
 }


 
  return (
    <>{loading && <div><Spinner/><h5 className='text-center'>Creating a post...</h5></div>}
    {!loading && <form className='containe' onSubmit={clickCreate}>
  <div className="mb-3">

    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder='title (Minimum 5 charcaters)' onChange={onchange} value={data.title}/>
    
  </div>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="summary" name="summary" placeholder='summary (Minimum 10 characters)' onChange={onchange} value={data.summary} />
  </div>

  <div className="mb-3">
    
    <input type="file" className="form-control" id="file" name="file" onChange={e => setimage(e.target.files[0])}  />
    <span className="form-text">Only choose .jpg files</span>
  </div>

  <div className="mb-3">
    
  <ReactQuill modules = {modules} theme='snow' value={content} onChange={setcontent}/>
  </div>
  
  <div className="text-center">
  <button type="submit" className="btn btn-dark">Create Post</button>
  </div>
</form>}
</>
  )
}

export default Create
