import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayLoad {
  id: string;
  iat: number;
  exp: number;
}

export const auth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.sendStatus(401);
    }
    const token = authorization.replace('Bearer', ' ').trim();
    try {
        const data = jwt.verify(token, process.env.APP_SECRET!);
        const { id } = data as TokenPayLoad;
        req.body.UserId = id;

        return next();
    } catch {
        return res.sendStatus(401);
    }
};
