const connectToMongo = require('./data.js');
const express = require('express')
connectToMongo();

const cors = require("cors")



const app = express()
const port = 3003
app.use(cors())

app.use(express.json())

app.use('/auth', require("./routes/auth.js"))
app.use('/post', require("./routes/blog.js"))
app.get("/hari", (req,res) => {
    res.json({"Hari": "This is for testing."})
})
app.listen(port, () => {
    console.log(`Blog backend listening at http://localhost:${port}`)
})