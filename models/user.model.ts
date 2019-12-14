import mongoose = require("mongoose");
import bcrypt = require("bcrypt");
import { enviroment } from "../common/enviroment";


export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    imagePath: string,
    number: string,
    items: Array<mongoose.Types.ObjectId>,
    dividedItems: Array<mongoose.Types.ObjectId>,
    location:{name:string,longitude:number,latitude:number},
    matches(password:string):boolean
}

export interface UserModel extends mongoose.Model<User>{
    findByEmail(email:string,projection?:string):Promise<User>; 
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    items: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Item"
        }
    ],
    dividedItems: [
        {
            type: mongoose.Types.ObjectId,
            ref: "DividedItem"
        }
    ],
    number: {
        type:String,
        required:true
    },
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
    imagePath:{
        type: String,
        default: "",
    }
});

//metodo de schema
userSchema.statics.findByEmail = function(email:string ,projection:string){
    return this.findOne({email}, projection);
}


//metodo de instancia
userSchema.methods.matches = function(password:string):boolean{
    return bcrypt.compareSync(password,this.password);
}

const hashPassword = (obj: any, next: any) => {
    bcrypt.hash(obj.password, enviroment.security.saltRounds)
        .then(hash => {
            obj.password = hash;
            next();
        }).catch(next);
}

const saveMiddleware = function (next: any) {
    const user: any = this
    if (!user.isModified('password')) {
        return next();
    } else {
        hashPassword(user, next);
    }
};

userSchema.pre('save', saveMiddleware);

const updateMiddleware = function (next: any) {
    if (!this.getUpdate().password) {
        return next();
    }
    hashPassword(this.getUpdate(), next);
};

userSchema.pre('findOneAndUpdate', updateMiddleware);

userSchema.pre('update', updateMiddleware);

export const User = mongoose.model<User,UserModel>("User", userSchema);
