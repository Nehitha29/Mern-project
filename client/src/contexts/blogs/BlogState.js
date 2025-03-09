
import {createContext, useState} from "react";


const blogContext = createContext();

const value = 3



const BlogState = (props) => {
    
    
const [posts, setposts] = useState([])
const [loading, setloading] = useState(false) 

const [userid, setuserid] = useState("")

const [progress, setProgress] = useState(0)


const [blogs, setblogs] = useState([])

const [allposts, setallposts] = useState([])
const [allblogs, setallblogs] = useState([])

const [success, setsuccess] = useState(false)

const [allsuccess, setallsuccess] = useState(false)


const [name, setname] = useState("")
    
    const host = "https://blog-backend-5yx2.onrender.com"

   //User creation

 async function register(name, email, password, repassword) {
    const url = host + "/auth/register"
    const repsone = await fetch(url, {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({name, email, password, repassword})
    });

    const json = await repsone.json();

    return {
        success : json.success,
        error : json.error
    } 
   }

 //login user

 const login = async (email, password) => {
    const url = host + "/auth/login"
    const response = await fetch(url, {
        method : "POST",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({email, password})
    });

    const json = response.json()
    return json;
 }


 //Blogs

 //add

 const create = async(title, summary, content, image) => {
    const url = host + "/post/add"
    const response = await fetch(url, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "authtoken" : localStorage.getItem("usertoken")
        },
        body : JSON.stringify({title, summary, content, image})
    });

    const json = await response.json()

    
    return { ok : response.ok, error : json.error} ;

    
    
 }

// Fetch posts

const fetchposts = async(page) => {
    const url = host + "/post/fetch"
    setloading(true)
    setProgress(20)
    const response = await fetch(url, {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "authtoken" : localStorage.getItem("usertoken"),
            "page": page,
            "value" : value
        }
    });

    setProgress(75)

    const json = await response.json()
    setProgress(100)

    setloading(false)
    // console.log(json.blog)
    setposts(json.blog)
    setblogs(json.blog)
    setname(json.name)
    setsuccess(json.success)
    setuserid(json.id)
     
 }

//fetch all posts

const fetchallposts = async(page) => {
    const url = host + "/post/fetchall"
    setloading(true)
    setProgress(20)
    const response = await fetch(url, {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "page": page,
            "value" : value
        }
    });

    setProgress(80)

    const json = await response.json()
    setProgress(100)
    setloading(false)
    // console.log(json.blog)
    setallposts(json.blog)
    setallblogs(json.blog)
    setallsuccess(json.success)
     
 }


 //Get post

 const getpost = async(id) => {
    const url = host + `/post/${id}`
    const response = await fetch(url, {
        method : "GET",
        headers : {
            "Content-Type": "application/json"
        }
    });

    const json = await response.json()

    return json ;
 }

 //Updating data

 const edit = async(title, summary, content, image, id) => {
    const url = host + "/post/edit/" +id
    const response = await fetch(url, {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "authtoken" : localStorage.getItem("usertoken")
        },
        body : JSON.stringify({title, summary, content, image})
    });

    const json = await response.json()
    return { ok : response.ok, errror : json.error} ;
    
 }


 const Filter = (e) => {
    let value = e.target.value.toLowerCase()
  setposts(blogs.filter((val) => 
      { 
        
        return val.title.toLowerCase().includes(value) || val.summary.toLowerCase().includes(value) || val.updatedAt.toLowerCase().includes(value) || val.user.name.toLowerCase().includes(value)
      }
))

setallposts(allblogs.filter((val) => 
    { 
      
      return val.title.toLowerCase().includes(value) || val.summary.toLowerCase().includes(value) || val.updatedAt.toLowerCase().includes(value) || val.user.name.toLowerCase().includes(value)
    }
))
}


    return(
        
        <blogContext.Provider value={{ register, host,progress, setloading, setProgress,  login,loading, create, posts, allsuccess, fetchposts, name, getpost, edit, fetchallposts, userid, allposts, Filter, success}}>

            {props.children}
        </blogContext.Provider>
    )
}


//Blog



export {blogContext, BlogState}
