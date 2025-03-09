 const express = require("express")

 const User = require("../models/User")

 const {body, validationResult} = require('express-validator')

 const router = express.Router();
 const bcrypt = require('bcryptjs');
 var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/Fetchuser");

//User creation
router.post('/register', [
    body('name', "Reenter your name").isLength({ min: 3 }),
    body('email', "not a mail").isEmail(),
    body('password', "Min length is 3").isLength({ min: 3 })
],
async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(401).send({ error: errors.array()[0].msg });
    }

    try {

        let user = await User.findOne({email : req.body.email});

        if(user){
            return res.status(400).send({error : "A user already exists!"})
        }

        if(req.body.password !== req.body.repassword){
            return res.status(400).send({error : "Passwords mismatch"});
        }

        const salt = await bcrypt.genSalt(13);
        const secPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPassword,
            repassword : secPassword
        })

        const JWT_SECRET = "thisisforblog"
        const data = {
            user : {
                id : user._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

        success = true

        return res.send({success, authToken})


        
    } catch (error) {
        return res.status(500).send({error : error.message} )
    }
}
 )


 //User login

 router.post("/login", [
    body('email').isEmail(),
    body('password', "Min length is 3").isLength({ min: 3 })
 ], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        const errrorList = errors.array()
        return res.status(401).send({ error: errors.array()[0].msg });
    }

    try {

        let user = await User.findOne({email : req.body.email});

        if(!user){
            return res.status(400).send({error : "User does not exist! Please do register."})
        }

        const compare = await bcrypt.compare(req.body.password, user.password);

         if(!compare){
    return res.status(400).send({error : "Please enter valid credentials"});
  }

    const JWT_SECRET = "thisisforblog"
        const data = {
            user : {
                id : user._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

        success = true

        return res.send({success, authToken})
        
    } catch (error) {
        return res.status(500).send({error : error.message} )
    }
 })

//Usrer details
router.get("/user", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id ;
    const user = await User.findById(userId).select(["-password", "-repassword"]);
    console.log(userId)
    res.send(user);
    } catch (error) {
        return res.status(500).send({error : error.message} )
    }
 })
 module.exports = router