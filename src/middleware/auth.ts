import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const SECRETKEY: Secret = 'jkjdad'

export interface CustomRequest extends Request {
    token?: string | JwtPayload
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.replace('Bearer', '')

        if (!token) {
            throw new Error()
        }

        const decoded = jwt.verify(token, SECRETKEY);
        (req as CustomRequest).token = decoded

        next()
    } catch {
        res.status(401).send('Porfavor autenticar')
    }
}