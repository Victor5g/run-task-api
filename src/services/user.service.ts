import prismaClient from '../database/client';

import { ModelUser } from '../models/user';

export const createNewUser = async (
    name: string,
    email: string,
    password: string
): Promise<ModelUser> => {
    const user = await prismaClient.user.create({
        data: {
            name,
            email,
            password,
        },
    });
    return user;
};

export const getUsers = async (): Promise<Array<ModelUser>> => {
    const users = await prismaClient.user.findMany();
    return users;
};

export const getUser = async (email?: string): Promise<ModelUser | null> => {
    const user = await prismaClient.user.findUnique({
        where: { email },
    });
    return user;
};

export const getUserById = async (
    userId: string
): Promise<ModelUser | null> => {
    const user = await prismaClient.user.findUnique({
        where: { id: userId },
    });
    return user;
};

export const deleteUserById = async (userId: string): Promise<void> => {
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
};

export const updateUserInformation = async (
    userId: string,
    name: string,
    email: string,
    password: string
): Promise<ModelUser> => {
    const user = await prismaClient.user.update({
        where: { id: userId },
        data: { name, email, password },
    });
    return user;
};

export const existingUser = async (userId: string): Promise<boolean> => {
    const userExists = await prismaClient.user.findUnique({
        where: { id: userId },
    });

    return userExists ? true : false;
};

export const existingUserInProject = async (
    projectId: string,
    userId: string
): Promise<boolean> => {
    const inProject = await prismaClient.projectUser.findUnique({
        where: {
            userId_projectId: {
                userId,
                projectId,
            },
        },
    });
    return inProject ? true : false;
};

prismaClient.$disconnect();
