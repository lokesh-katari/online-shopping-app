const mongoose=require('mongoose');
const {Schema}= mongoose;


const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,

    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        maxLength:4,
        default:1   
     },
     ReviewNum:{
        type:Number,
        default:0
     },
     reviews:[
       {
        name:{
            type:String,
            // required:true
        },
        rating:{
            type:Number,
            // required:true
        },
        comment:{
            type:String,
            // required:true
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User" ,
            required:true
        }
       }
     ],
     user:{
        type:mongoose.Schema.ObjectId,
        ref:"User" ,
        required:true
      },
     createdAt:{
        type:Date,
        default:Date.now
     }

}) 
const Product= mongoose.model('Product',ProductSchema);
module.exports = Product