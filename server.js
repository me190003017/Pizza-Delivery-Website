const express=require('express')
const app=express();
const PORT=process.env.PORT || 3300 
const ejs=require('ejs')
const expresslayout=require('express-ejs-layouts');
const path=require('path');

// Assets
app.use(express.static('public'));

// set Template engine
app.use(expresslayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');

// Home page is rendering 
app.get("/",(req,res)=>{
    res.render('home.ejs');
})
// cart page is randering
app.get("/cart",(req,res)=>{
    res.render('customers/cart.ejs');
})
app.get("/register",(req,res)=>{
    res.render('auth/register.ejs');
})
app.get("/login",(req,res)=>{
    res.render('auth/login.ejs');
})


app.listen(PORT,()=>{
    console.log(`listening on port xyz ${PORT}`);
})
