import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import UserModel from '../models/user.model';


const userModel = new UserModel();

export const authenticate = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const { email, password } = req.body;

        const user = await userModel.authenticate(email, password);
        //const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'le user_name et le password ne correspondent pas, essayez encore',
            });
        }
        const token = await userModel.generateAuthTokenAndSaveUSer(user);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        return res.json({
            status: 'success',
            data: { ...user, token},
            message: 'utilisateur authentifié',
        });
       
    } catch(error) {
        return next(error);
    }
    
};


export const create = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const user = await userModel.create(req.body);
        res.json({
            status: "success",
            data: { ...user },
            message: 'User created Succesfully',
        });
    } catch(error) {
        next(error);
    }
    
};

export const all = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userModel.getMany();
        res.json({
            status: "success",
            data: users,
            message: 'User retrieved Succesfully',
        });
    } catch (err) {
        next(err);
    }
};

export const findOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.getOne(req.params.id as unknown as string);
        res.json({
            status: "success",
            data: user,
            message: 'User retrieved Succesfully',
        });
    } catch (err) {
        next(err);
    }
};

export const updateOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.UpdateOne(req.body);
        res.json({
            status: "success",
            data: user,
            message: 'User updated Succesfully',
        });
    } catch (err) {
        next(err);
    }
};

export const deleteOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel.deleteOne(req.params.id as unknown as string);
        res.json({
            status: "success",
            data: user,
            message: 'User deleted Succesfully',
        });
    } catch (err) {
        next(err);
    }
};