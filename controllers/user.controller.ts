import express from "express";
import mongoose = require("mongoose");
import { User } from "../models/user.model";
import ModelRouter from "../common/model-router"
import { authenticate } from "../security/auth.handler";
import multer from "multer";


class UserController extends ModelRouter<User>{
    public path: string = "/users";
    public router: express.Router = express.Router();
    private imageName: string;    
    private imagePath:string;
    constructor() {
        super(User);
        this.imagePath = "images/";
        this.on('beforeRender', document => {
            document.password = undefined;
        });
        this.initializeRoutes();
    }

    private storage: multer.StorageEngine = multer.diskStorage({
        
        destination:(req, file , callback) =>{
            callback(null , this.imagePath);
        },
        filename :(req, file , cb) => {
            this.imageName = Date.now()+file.originalname;
            cb(null ,this.imageName);
        },
        
    });

    private fileFilter = function(req, file , callback){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
            callback(null,true);
        }else{
            callback(null,false);
        }
    }

    private upload:multer.Instance = multer({storage:this.storage , fileFilter:this.fileFilter});

    protected prepareOne(query: mongoose.DocumentQuery<User, User>): mongoose.DocumentQuery<User, User> {
        return query.populate("items");
    }


    private addItem = (req, res, next) => {
        User.findById({ _id: req.params.id }).then(user => {

            user.items.push(req.params.item_id);
            user.save()
                .then(this.render(res, next))
                .catch(next);

        });
    }

    private addImagePath = (req, res, next) => {
        req.body.imagePath = `${this.imagePath}${this.imageName}`;
        return next();
    }
    public initializeRoutes() {
        this.router.get(this.path, this.findAll);
        this.router.get(`${this.path}/:id`, [this.validateId, this.findById]);
        this.router.get(`${this.path}/:id/image`, [this.validateId, this.findById]);
        this.router.post(this.path, [this.upload.single('userImage'),this.addImagePath,this.save]);
        this.router.post(`${this.path}/authenticate`, authenticate);
        this.router.put(`${this.path}/:id`, [this.upload.single('userImage'),this.addImagePath,this.validateId, this.update]);
        this.router.put(`${this.path}/:id/:item_id`, [this.validateId, this.addItem]);
        this.router.delete(`${this.path}/:id`, [this.validateId, this.remove]);
    }

}

export const userController = new UserController();

