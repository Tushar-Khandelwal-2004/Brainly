import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if (header !== undefined && process.env.JWT_SECRET!==undefined) {
        const decodedInfo = jwt.verify(header, process.env.JWT_SECRET)
        if(decodedInfo){
            //@ts-ignore
            req.userId=decodedInfo.id;
            next();
        }
        else{
            res.status(403).send({
                success:false,
                message:"Token is Invalid!"
            })
        }
    }
}       