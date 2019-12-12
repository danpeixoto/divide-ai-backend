import express from "express";
import { Router } from "./common/router";

class MainRouter extends Router {

    public path: string = "/";
    public router = express.Router();

    constructor() {
        super();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.path, (req, res, next) => {
            res.json({
                users: "/users",
                tables: "/tables",
                products: "/products",
                items: "/items",
                dividedItem: "/divided"
            });
        });
    }
}
export const mainRouter = new MainRouter();
