import express from "express";
import mongoose = require("mongoose");
import { Table } from "../models/table.model";
import ModelRouter from "../common/model-router"

class TableController extends ModelRouter<Table>{
    public path: string = "/tables";
    public router = express.Router();

    constructor() {
        super(Table);
        this.initializeRoutes();
    }

    protected prepareOne(query: mongoose.DocumentQuery<Table, Table>): mongoose.DocumentQuery<Table, Table> {
        return query.populate("owner")
            .populate("users");
    }

    private addUser = (req, res, next) => {
        const { user_id } = req.body;
        Table.findById({ _id: req.params.id })
            .then(table => {
                if (!table.users.includes(user_id)) {
                    table.users.push(user_id);
                    table.save();
                    res.json(table);
                    return next();
                } else {
                    res.status(400).send("User already in the table.");
                }
            }).catch(next);
    };

    private authenticate = (req, res, next) => {
        Table.findById({ _id: req.params.id })
            .then(table => {
                if (table.matches(req.body.password)) {
                    return next();
                } else {
                    res.status(400).send("Wrong password.");
                }
            }).catch(next)
    }


    findAll = (req, res, next) => {
        this.model.find()
            .populate("owner")
            .populate("users")
            .then(this.renderAll(res, next))
            .catch(next);
    }


    public initializeRoutes() {
        this.router.get(this.path, this.findAll);
        this.router.get(`${this.path}/:id`, [this.validateId, this.findById]);
        this.router.post(this.path, this.save);
        this.router.put(`${this.path}/:id`, [this.validateId, this.update]);
        this.router.put(`${this.path}/authenticate/:id`, [this.validateId, this.authenticate, this.addUser]);
        this.router.delete(`${this.path}/:id`, [this.validateId, this.remove]);
    }

}

export const tableController = new TableController();
