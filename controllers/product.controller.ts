import express from "express";
import { Product } from "../models/product.model";
import ModelRouter from "../common/model-router"

class ProductController extends ModelRouter<Product>{
    public path: string = "/products";
    public router = express.Router();

    constructor() {
        super(Product);
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.findAll);
        this.router.get(`${this.path}/:id`, [this.validateId,this.findById]);
        this.router.post(this.path, this.save);
        this.router.put(`${this.path}/:id`, [this.validateId,this.update]);
        this.router.delete(`${this.path}/:id`,[this.validateId,this.remove]);
    }

}

export const productController = new ProductController();
