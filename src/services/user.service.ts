import prismaClient from '../database/client';

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
