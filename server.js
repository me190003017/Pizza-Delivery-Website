const express=require('express')
const app=express();
const PORT=process.env.PORT || 3300 
const ejs=require('ejs')
const expresslayout=require('express-ejs-layouts');
const path=require('path');

app.get("/",(req,res)=>{
    res.render('home.ejs');
})
// set Template engine
app.use(expresslayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');

app.listen(PORT,()=>{
    console.log(`listening on port xyz ${PORT}`);
})
