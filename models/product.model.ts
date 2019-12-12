import mongoose = require("mongoose");

export interface Product  extends mongoose.Document{
    name:string,
    description:string,
    category:string,
    price:number,
    location:{name:string,longitude:number,latitude:number},
}

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },location:{
        name:{
            type: String,
        },
        latitude:{
            type: Number,
        },
        longitude:{
            type: Number,
        },
        default: {},
    },
});


export const Product = mongoose.model<Product>("Product",productSchema);
