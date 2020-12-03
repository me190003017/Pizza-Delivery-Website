// folder for handeling routes
const homeController= require('../app/http/controllers/homeController.js')
const authController=require('../app/http/controllers/authController.js')
const cartController=require('../app/http/controllers/customers/cartController.js')
function initRoutes(app){
    // Home page is rendering 
    
    app.get("/",homeController().index)
    // (req,res)=>{
    //     res.render('home.ejs');
    // })

    // register page
    app.get("/register",authController().register)
    // login page
    app.get("/login",authController().login)
        // cart page is randering
    app.get("/cart",cartController().cart)
    app.post('/update-cart',cartController().update)
}


module.exports=initRoutes;