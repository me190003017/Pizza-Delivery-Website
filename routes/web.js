// folder for handeling routes
const homeController = require('../app/http/controllers/homeController.js')
const authController = require('../app/http/controllers/authController.js')
const cartController = require('../app/http/controllers/customers/cartController.js')

const orderController = require('../app/http/controllers/customers/orderController')



const AdminOrderController=require('../app/http/controllers/admin/AdminOrderController.js')

const statusController=require('../app/http/controllers/admin/statusController.js')

// middlewares
const admin = require('../app/http/middleware/admin.js')
const auth = require('../app/http/middleware/auth')
const guest = require('../app/http/middleware/guest')

function initRoutes(app) {
    // Home page is rendering 

    app.get("/", homeController().index)
    // (req,res)=>{
    //     res.render('home.ejs');
    // })

    // register page
    app.get("/register", guest, authController().register)
    app.post("/register", authController().postregister)
    // login page
    app.get("/login", guest, authController().login)
    app.post("/login", authController().postlogin)
    app.post("/logout", authController().logout)
    // cart page is randering
    app.get("/cart", cartController().cart)
    app.post('/update-cart', cartController().update)

    
    // customer routes
    app.post("/orders", auth, orderController().store)
    app.get('/customer/orders/', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)
    
    // Admin routes
    app.get('/admin/orders',admin,AdminOrderController().index)
    app.post('/admin/order/status',admin,statusController().update)

}


module.exports = initRoutes;