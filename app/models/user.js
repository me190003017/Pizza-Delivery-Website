// if we are making model we should remember that 
// collections name will be plural of model's name
const mongoose=require('mongoose');
// we save only class or constructor functin if we start naming with uppercase later i js(convension in js)
const Schema=mongoose.Schema;

const userSchema = new Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    role: {type:String,default:'customer'}
}, {timestamps:true})
// mongoose.model('model-name',)than db me model-name ka pluaral name ka collection ban jayega

// then export this model
module.exports=mongoose.model('User',userSchema);
















