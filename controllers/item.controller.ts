import express from "express";
import ModelRouter from "../common/model-router";
import { Item } from "../models/item.model";
import mongoose = require("mongoose");

class ItemController extends ModelRouter<Item>{
    public path: string = "/items";
    public router = express.Router();

    constructor() {
        super(Item);
        this.initializeRoutes();
    }

    protected prepareOne(query: mongoose.DocumentQuery<Item, Item>): mongoose.DocumentQuery<Item, Item> {
        return query.populate("product").populate("users");
    }


    public initializeRoutes() {
        this.router.get(this.path, this.findAll);
        this.router.get(`${this.path}/:id`, [this.validateId, this.findById]);
        this.router.post(this.path, this.save);
        this.router.put(`${this.path}/:id`, [this.validateId, this.update]);
        this.router.delete(`${this.path}/:id`, [this.validateId, this.remove]);
    }

}

export const itemController = new ItemController();
