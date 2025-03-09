const express = require("express")
const app = express()
const router = express.Router();
const User = require("../models/User")

// const storage = multer.memoryStorage()
// const upload = multer({dest: "uploads/"})

  
//   const upload = multer({ storage: storage })

const Blog = require("../models/Blog")
const fetchuser = require("../middleware/Fetchuser");
const {body, validationResult} = require('express-validator')

//Adding a post

router.post("/add", [
    body('title', "Title should be minimum of 5 characters").isLength({ min: 5 }),
    body('summary', "Summary should be of minimum 10 characters").isLength({min : 10})
] , fetchuser, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).send({ error: errors.array()[0].msg });
    }

    try {
        const post = await Blog.create({
            user : req.user.id,
            title : req.body.title,
            summary : req.body.summary,
            image : req.body.image,
            content : req.body.content
        })

     

        res.send(post)


    } catch (error) {
       return res.status(500).send({error: error.message})
    }
})


//Fetching the posts

router.get("/fetch", fetchuser, async(req,res) => {
    
    try {
        
        let posts = await Blog.find({user : req.user.id}).populate("user", ["name"]).sort({createdAt : -1});

        const details = await User.findById(req.user.id).select(["-password", "-repassword"]);
        const allposts = posts

        const len = posts.length

        let value = req.header("value")
        let page = req.header("page")
        const st = (page-1)*value

        const end = page*value 
        posts = posts.slice(st, end)

        let success = false

        if(end>= len) success = true

        return res.send({blog : posts,  success : success, name : details.name , allposts : allposts, id : details._id})

    } catch (error) {
        return res.status(500).send({error: error.message})
    }

})

//Fetching all posts

router.get("/fetchall", async(req, res)=> {

    try {

        let posts = await Blog.find().populate("user", ["name"]).sort({createdAt : -1});
        const len = posts.length

        let value = req.header("value")
        let page = req.header("page")
        const st = (page-1)*value

        const end = page*value 
        posts = posts.slice(st, end)

        let success = false

        if(end>= len) success = true

        return res.send({blog : posts, success : success})
        
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
})


//Finding a post

router.get("/:id", async(req, res) => {
    try {
        
        // const details = await User.findById(req.user.id).select(["-password", "-repassword"])
        const post = await Blog.findById(req.params.id).populate("user", ["name"])

        return res.send({post : post})
        
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
})

//Updating a post

router.post("/edit/:id", fetchuser, async(req, res)=>{
    try {
        const newBlog = {
            title: req.body.title,
            summary : req.body.summary,
            content : req.body.content,
            image : req.body.image
        }
    
        let blog = await Blog.findById(req.params.id)
        if(!blog) return res.status(400).send({error : "No post to edit"})
        if(blog.user.toString() !== req.user.id) return res.status(400).send({error: "User mismatched"})
        
        if(newBlog.image==="") newBlog.image = blog.image
    
        blog = await Blog.findByIdAndUpdate(blog, {$set : newBlog}, {new : true})
        res.send(blog);
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
})

module.exports = router