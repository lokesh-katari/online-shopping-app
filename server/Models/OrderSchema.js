const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    doorno: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    }
  },
  phonenumber:{
    type:Number,
    required:true
  },
  orderItems:[
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product",
            required:true
        },
        qty:{
          type:Number,
          default:1
        },
        countInStock:{
          type:Number,
          required:true
        }

    }
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User" ,
    required:true
 },
paymentInfo:{
    id:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
},

itemsPrice:{
    type:Number,
    default:0
},
shippingPrice:{
    type:Number,
    default:0
},
totalPrice:{
    type:Number,
    default:0  
},
orderStatus:{
    type:String,
    required:true,
    default:"processing"
},
orderedAt:{
    type:Date,
    default:Date.now()
},
deliveryDate:Date

});

const Order = mongoose.model("Order",orderSchema);
module.exports =Order; 
