import express from "express";
import { User } from "../models/user.model";

export const authenticate: express.RequestHandler = (req, res, next) => {
    const { email, password } = req.body;
    User.findByEmail(email, "+password")
        .then(user => {
            if (user && user.matches(password)) {
                user.password = undefined;
                res.json(user);
                return next(false);
            } else {
                res.status(403).json({error:"Invalid Credentials"});
                return next(false);
            }
        })
        .catch(next);
}
