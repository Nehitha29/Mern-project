
const mongoose = require('mongoose')
const dot  = require("dotenv").config()

const mongUrl = process.env.MONGO_URI

const connectToMo = () => {
    mongoose.connect(mongUrl).then(console.log("mongoose is connected"))
}

module.exports = connectToMo ;
