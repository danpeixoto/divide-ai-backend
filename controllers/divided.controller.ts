import express from "express";
import mongoose = require("mongoose");
import { DividedItem } from "../models/divided.model";
import ModelRouter from "../common/model-router"

class DividedController extends ModelRouter<DividedItem>{
    public path: string = "/divided";
    public router = express.Router();

    constructor() {
        super(DividedItem);
        this.initializeRoutes();
    }

    protected prepareOne(query: mongoose.DocumentQuery<DividedItem, DividedItem>): mongoose.DocumentQuery<DividedItem, DividedItem> {
        return query.populate("product").populate("users");
    }


    public initializeRoutes() {
        this.router.get(this.path, this.findAll);
        this.router.get(`${this.path}/:id`, [this.validateId,this.findById]);
        this.router.post(this.path, this.save);
        this.router.put(`${this.path}/:id`, [this.validateId,this.update]);
        this.router.delete(`${this.path}/:id`,[this.validateId,this.remove]);
    }

}

export const dividedController = new DividedController();
