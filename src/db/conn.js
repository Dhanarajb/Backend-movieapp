const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/users-api").then(()=>{
    console.log("Connection is successfull")
}).catch((e)=>{
    console.log('no connection')
})