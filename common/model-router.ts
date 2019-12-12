import  {Router}  from "./router";
import mongoose from "mongoose";


export default abstract class ModelRouter<D extends mongoose.Document> extends Router {
    constructor(protected model: mongoose.Model<D>) {
        super();
    }

    protected prepareOne(query:mongoose.DocumentQuery<D,D>):mongoose.DocumentQuery<D,D>{
        return query;
    }

    validateId = (req, res, next)=>{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            next(new Error("Not valid ID"));
        }else{
            next();
        }

    }

    findAll = (req, res, next) => {
        this.model.find()
            .then(this.renderAll(res, next))
            .catch(next);
    }

    findById = (req, res, next) => {
        const { id } = req.params
        this.prepareOne(this.model.findById(id))
            .then(this.render(res, next))
            .catch(next);
    }


    save = (req, res, next) => {
        const document = new this.model(req.body);

        document.save()
            .then(this.render(res, next))
            .catch(next);

    }

    update = (req, res, next) => {
        const options = { overwrite: false, runValidators: true };
        this.model.update({ _id: req.params.id }, req.body, options).exec()
            .then(result => {
                // se o update atualizou algo
                if (result.n) {
                    return this.model.findById(req.params.id);
                } else {
                    throw new Error("Document not found.");
                }
            }).then(this.render(res, next))
            .catch(next);
    }


    remove = (req, res, next) => {
        this.model.deleteOne({ _id: req.params.id }).exec()
            .then(rowsAffected => {
                if (rowsAffected.n>0) {
                    res.sendStatus(204);
                } else {
                    throw new Error("Document not found.");
                }
                return next();
            }).catch(next);
    }

}
