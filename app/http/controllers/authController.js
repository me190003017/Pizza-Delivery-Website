const User = require("../../models/user");
// const Menu = require("../../models/user");
const bcrypt=require('bcrypt');
const passport = require("passport");
function authController(){
    return{
        login(req,res){
            res.render('auth/login.ejs');
        },

        postlogin(req,res,next){
            
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(arr)
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/login')
                }
                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(arr)
                    }
                    return res.redirect('/')
                })
            })(req,res,next)
        },

        register(req,res){
            res.render('auth/register.ejs');
        },
        async postregister(req,res){
            const { name,email,password } = req.body
            // Validate request
            if(!name || !email || !password){
                req.flash('error','All field required')
                req.flash('name',name);
                req.flash('email',email);
                
                return res.redirect('/register')
            }
            // Check if email already used
            User.exists({email:email},(err,result)=>{
                if(result){
                    req.flash('error','Email already has been used')
                    req.flash('name',name);
                    req.flash('email',email);
                    return res.redirect('/register')
                }
            })

            //  Hash passward
            const hashedPassward=await bcrypt.hash(password,10)

            // Create a user
            let user=new User({
                name:name,
                email:email,
                password:hashedPassward
            })

            user.save().then((user)=>{
                // Login
                return res.redirect('/')
            }).catch(err=>{
                req.flash('error','Something went wrong')
                return res.redirect('/register')
            })
            console.log(req.body);
        },
        logout(req,res){
            req.logout()
            return res.redirect('/login')
        }
    }
}

module.exports=authController;
