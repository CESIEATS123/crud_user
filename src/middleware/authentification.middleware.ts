import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Error from '../interfaces/error.interface';
import config from '../config';

const handleUnauthorizedError = (next: NextFunction) => {
    const error: Error = new Error('Login Error: Veuillez réessayer');
    error.status = 401;
    next(error);
};

const validateTokenMiddleware = (req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // get authHeader  
        const authHeader = req.get('Authorization');
        //console.log(authHeader);
        if (authHeader) {
            // check authHeader validate
            const bearer = authHeader.split(' ')[0].toLowerCase();
            // get value of token
            const token = authHeader.split(' ')[1];
            // check if it bearer token or not
            if (token && bearer === 'bearer') {
                const decode = jwt.verify(token, config.tokenSecret as unknown as string);
                // verify token -- decode based on tokenSecret
                if (decode) {
                    next();
                } else {
                    // failed to authenticate user
                    handleUnauthorizedError(next);
                }
            } else {
                // token type not bearer
                handleUnauthorizedError(next);
            }
        } else {
            handleUnauthorizedError(next);
        }
        // check authHeader validate
            // get value of token
            // check if it bearer token or not
                // verify token -- decode based on tokenSecret
                    // next()
                // failed to authenticate user
        // token type not bearer
        // no token provider
    } catch (error) {
        handleUnauthorizedError(next)
    }
};

export default validateTokenMiddleware;