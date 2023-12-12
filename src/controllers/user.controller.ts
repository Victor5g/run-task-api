import { Request, Response } from 'express';

import prismaClient from '../database/client';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await prismaClient.user.create({
            data: req.body,
        });
        res.status(201).json(user);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        await prismaClient.projectUser.deleteMany({
            where: {
                userId,
            },
        });
        await prismaClient.user.delete({
            where: {
                id: userId,
            },
        });
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const listUsers = async (_: Request, res: Response) => {
    try {
        const users = await prismaClient.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const listUserById = async (req: Request, res: Response) => {
    try {
        const user = await prismaClient.user.findUnique({
            where: { id: req.params.userId },
        });
        res.status(user ? 200 : 404).json(user || {});
    } catch (error) {
        res.sendStatus(500);
    }
};

export const changeUserById = async (req: Request, res: Response) => {
    try {
        const user = await prismaClient.user.update({
            where: { id: req.params.userId },
            data: req.body,
        });
        res.status(200).json(user);
    } catch (error) {
        res.sendStatus(500);
    }
};

prismaClient.$disconnect();
