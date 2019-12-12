import mongoose = require("mongoose");
import { Product } from "./product.model";
import { User } from "./user.model";

export interface DividedItem extends mongoose.Document {
    product:Product| mongoose.Types.ObjectId,
    amount: number,
    users: Array<User>|Array<mongoose.Types.ObjectId>
}


const dividedSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    amount: {
        type: Number,
        default: 2,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});


export const DividedItem = mongoose.model<DividedItem>("DividedItem", dividedSchema);
