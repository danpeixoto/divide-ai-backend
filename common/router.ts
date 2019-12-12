import express from "express";
import { EventEmitter } from 'events';//emite eventos como : beforeRender(serve para executar algo antes da resposta)

export abstract class Router  extends EventEmitter{

    render(response: express.Response, next: express.NextFunction) {
        return (document: any) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(document);
            } else {
                response.sendStatus(404).json({ error: "Document not found" })
            }
            return next();
        }
    }

    renderAll(response: express.Response, next: express.NextFunction) {
        return (documents: any[]) => {
            if (documents) {
                documents.forEach((document) => {
                    this.emit('beforeRender', document);
                });
                response.json(documents);
            } else {
                response.json([]);
            }
            return next();
        }
    }
}
