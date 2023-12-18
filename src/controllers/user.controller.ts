import { createHmac } from 'crypto';
import { Request, Response } from 'express';

import {
    createNewUser,
    getUsers,
    getUserById,
    deleteUserById,
    updateUserInformation,
} from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const newPassword = createHmac('md5', password.split('').reverse().join(''))
            .update(password)
            .digest('hex');
        const user = await createNewUser(name, email, newPassword);
        res.status(201).json(user);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        await deleteUserById(userId);
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const listUsers = async (_: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const listUserById = async (req: Request, res: Response) => {
    try {
        const user = await getUserById(req.params.userId);
        res.status(user ? 200 : 404).json(user || {});
    } catch (error) {
        res.sendStatus(500);
    }
};

export const changeUserById = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await updateUserInformation(
            req.params.userId,
            name,
            email,
            password
        );
        res.status(200).json(user);
    } catch (error) {
        res.sendStatus(500);
    }
};
