const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/Login_ROOM").then(()=>{
    console.log("connection successfully build")
}).catch((error)=>{
    console.log(error)
})
const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true,
        unique: true
    }
})
const collection = new mongoose.model("LOGIN_DETAILS", logInSchema);

module.exports = collection;