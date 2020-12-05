// if we are making model we should remember that 
// collections name will be plural of model's name
const mongoose=require('mongoose');
// we save only class or constructor functin if we start naming with uppercase later i js(convension in js)
const Schema=mongoose.Schema;

const orderSchema = new Schema({
    customerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
    },
    items:{type:Object,required:true},
    phone: {type:String,required:true},
    address: {type:String,required:true},
    paymentType:{type:String,default:'COD'},
    status:{type:String,default:'order_placed'}
},{timestamps:true})
// mongoose.model('model-name',)than db me model-name ka pluaral name ka collection ban jayega

// then export this model
module.exports=mongoose.model('order',orderSchema);
















