import prismaClient from '../database/client';

export const existingUser = async(userId:string): Promise<boolean> =>{
    const userExists = await prismaClient.user.findUnique({
        where: { id: userId },
    });

    return userExists ? true : false;
};
