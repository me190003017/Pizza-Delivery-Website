const Menu = require("../../models/menu");


function homeController() {
    // facotory function pattern
    // factory function return object
    return {
        //we are creating methods /*async*/
        /* index:function() is equal to*/
        async index(req, res) {
            const pizzas = await Menu.find()
            console.log(pizzas);
            return res.render('home', { pizzas: pizzas })
            // Menu.find().then(function(pizzas){
            //     console.log(pizzas);
            //     return res.render('home',{pizzas:pizzas});
            // })
        }
    }
    // home page rendering ka logic controller ke ander 
    // rakhana h
}
module.exports = homeController;