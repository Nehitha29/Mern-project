const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    
    title : {
        type : String,
        required : true
    },

    summary : {
        type : String,
        
    },

    content : {
        type : String
    },

    image : {
        type : String, 
        required : true
    },
},

{
    timestamps: true,
});

module.exports = mongoose.model("blog", BlogSchema)