import mongoose = require("mongoose");
import { Product } from "./product.model";
import { User } from "./user.model";

export interface Item extends mongoose.Document {
    product: mongoose.Types.ObjectId | Product,
    amount: number,
    users: Array<User> | Array<mongoose.Types.ObjectId>,
    locationName: string,
}

const itemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    amount: {
        type: Number,
        default: 1
    },
    locationName: {
        type: String,
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

export const Item = mongoose.model<Item>("Item", itemSchema);
