const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
        minlength:2
    },
    year : {
        type:Number,String,
        required:true,
        minlength:4
    },
    genres : {
        type : String,
        required : true
    },
    rating : {
        type: Number
    },
    imdbRating : {
        type : Number
    },
    posterurl:{
        type: String
    }

})


// create a collection
const user = new mongoose.model('User',userSchema)
module.exports=user;