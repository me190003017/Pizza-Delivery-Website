// if we are making model we should remember that 
// collections name will be plural of model's name
const mongoose=require('mongoose');
// we save only class or constructor functin if we start naming with uppercase later i js(convension in js)
const Schema=mongoose.Schema;

const menuSchema = new Schema({
    name: {type:String,required:true},
    image: {type:String,required:true},
    price: {type:Number,required:true},
    size: {type:String,required:true}
})
// mongoose.model('model-name',)than db me model-name ka pluaral name ka collection ban jayega

// then export this model
module.exports=mongoose.model('Menu',menuSchema);
















