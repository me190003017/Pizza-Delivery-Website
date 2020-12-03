// folder for handeling routes
const homeController= require('../app/http/controllers/homeController.js')
const authController=require('../app/http/controllers/authController.js')
const cartController=require('../app/http/controllers/customers/cartController.js')
const guest=require('../app/http/middleware/guest')
function initRoutes(app){
    // Home page is rendering 
    
    app.get("/",homeController().index)
    // (req,res)=>{
    //     res.render('home.ejs');
    // })

    // register page
    app.get("/register",guest,authController().register)
    app.post("/register",authController().postregister)
    // login page
    app.get("/login",guest,authController().login)
    app.post("/login",authController().postlogin)
    app.post("/logout",authController().logout)
        // cart page is randering
    app.get("/cart",cartController().cart)
    app.post('/update-cart',cartController().update)
}


module.exports=initRoutes;