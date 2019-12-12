import cors from "cors";
import express from "express";
import mongoose from "mongoose";

export default class App {

    public app: express.Application;
    public portNumber: number;

    constructor(controllers, port, url) {
        this.app = express();
        this.portNumber = port;
        this.initializeMiddleWares();
        this.initializeControllers(controllers);
        this.initializeDataBase(url)
    }

    private initializeMiddleWares() {
        this.app.use(express.json());
        this.app.use("/images", express.static("./images"));
        this.app.use(cors());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(controller.router);
        });
    }

    private initializeDataBase(url) {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    public listen() {
        this.app.listen(this.portNumber, () => {
            console.log(`App listening on port ${this.portNumber}`);
        })
    }
}
