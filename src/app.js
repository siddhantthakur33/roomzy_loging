const express = require('express')
const app = express()
const path = require('path')
const collection = require('./Connection/conn')
const port = 3000
const views_ptah = path.join(__dirname,'../views')
require("./Connection/conn")
app.use(express.urlencoded({extended:false}));
// app.use(express.static('public'))
 app.use(express.static(path.join(__dirname, '../public')));

app.set("view engine", "hbs")
app.set("views", views_ptah)

app.get('/',(req,res)=>{
    res.render("login");
})

// app.get('/home',(req,res)=>{
//     res.render("home");
// })
app.get('/signup',(req,res)=>{
    res.render("signup");
})
app.post('/signup',async(req,res)=>{
    const data = {
        name:req.body.name,
        password:req.body.password
    }
    await collection.insertMany([data]);
    res.render("home");
   
})

app.post("/login", async(req,res)=>{
    try{
        const check = await collection.findOne({name:req.body.name});
        if(check.password===req.body.password){
            res.render("home");
        }else if (check.name ===req.body.name){
            res.send("username already present");

        }
        else{
            res.send("wrong password")
        }
    }catch{
        res.send("Wrong Details")
    }
})



app.listen(port, () => {
  console.log("port connected")
})