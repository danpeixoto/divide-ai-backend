import mongoose = require("mongoose");

export interface Table extends mongoose.Document{
    name:string,
    password:string,
    owner:mongoose.Types.ObjectId,
    users:Array<mongoose.Types.ObjectId>,
    isActive: boolean,
    location:{name:string,longitude:number,latitude:number},
    matches(password:string):boolean,
}

const tableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    location:{
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
    isActive:{
        type: Boolean,
        default: true,
    }
});

tableSchema.methods.matches = function(password:string){
    return password === this.password;
}


export const Table = mongoose.model<Table>("Table",tableSchema);
