require('dotenv').config();
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3300
const ejs = require('ejs')
const expresslayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const { MongoStore } = require('connect-mongo');
const MongodbStore = require('connect-mongo')(session)
const passport=require('passport')
// Database connection
mongoose.connect('mongodb://localhost/pizza', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connected...");
}).catch(err => {
    console.log("Connection failed...");
});


// session store
let mongoStore = new MongodbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})
// session config
app.use(session({
    // session donot work without coockies
    secret: process.env.COOKIES_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
}))


// passport config
const passportInit=require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


// as a middleware use
app.use(flash());

// Assets
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// Global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})

// set Template engine
app.use(expresslayout);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');

require("./routes/web.js")(app);



app.listen(PORT, () => {
    console.log(`listening on port xyz ${PORT}`);
})
