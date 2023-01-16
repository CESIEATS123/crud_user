import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import RoleModel from '../models/role.model';

const roleModel = new RoleModel();

export const create = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const role = await roleModel.create(req.body);
        res.json({
            status: "success",
            data: { ...role },
            message: 'Role created Succesfully',
        });
    } catch(error) {
        next(error);
    }
    
};

export const getMany = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const roles = await roleModel.getMany();
        res.json({
            status: "success",
            data: roles,
            message: 'Role retrieved Succesfully',
        });
    } catch (err) {
        next(err);
    }
};

export const getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const role = await roleModel.getOne(req.params.id as unknown as string);
        res.json({
            status: "success",
            data: role,
            message: 'Role retrieved Succesfully',
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
        const role = await roleModel.UpdateOne(req.body);
        res.json({
            status: "success",
            data: role,
            message: 'Role updated Succesfully',
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
        const role = await roleModel.deleteOne(req.params.id as unknown as string);
        res.json({
            status: "success",
            data: role,
            message: 'Role deleted Succesfully',
        });
    } catch (err) {
        next(err);
    }
};