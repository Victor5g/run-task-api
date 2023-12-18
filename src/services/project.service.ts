import prismaClient from '../database/client';

import { ModelProject, ModelProjects } from '../models/project';

export const createNewProject = async(name: string, description:string, userId:string): Promise<ModelProject> => {
    const project = await prismaClient.project.create({
        data: {
            name,
            description,
            creatorId: userId,
        },
    });
    await prismaClient.projectUser.create({
        data: {
            userId: userId,
            projectId: project.id,
        },
    });

    return project;
};

export const getProjects = async():Promise<Array<ModelProjects>> => {
    const projects = await prismaClient.project.findMany({
        include: { members: true, tasks: true, },
    });
    return projects;
};

export const getProjectById = async(projectId:string):Promise<ModelProjects | null> => {
    const project = await prismaClient.project.findUnique({
        where: { id: projectId },
        include: { members: true, tasks: true },
    });
    return project;
};

export const deleteProjectById = async(projectId:string):Promise<void> => {
    await prismaClient.projectUser.deleteMany({
        where: {
            projectId: projectId,
        },
    });
    await prismaClient.task.deleteMany({
        where: {
            projectId: projectId,
        },
    });
    await prismaClient.project.delete({
        where: {
            id: projectId,
        },
    });
};

export const updateProjectInformation = async(projectId:string, name:string, description:string):Promise<ModelProject> => {
    const project = await prismaClient.project.update({
        where: { id: projectId },
        data: { name, description, },
    });
    return project;
};

export const addMemberInProject = async(projectId:string, memberId:string):Promise<boolean> => {
    const added = await prismaClient.projectUser.create({
        data: {
            userId: memberId,
            projectId,
        },
    });
    return added ? true : false;
};

export const removeMember = async(projectId:string, memberId:string):Promise<boolean> => {
    const removed = await prismaClient.projectUser.delete({
        where: {
            userId_projectId: {
                userId: memberId,
                projectId,
            },
        },
    });
    return removed ? true : false;
};

export const existingProject = async(projectId:string): Promise<boolean> =>{
    const project = await prismaClient.project.findUnique({
        where: { id: projectId },
        include: { members: true },
    });
    return project ? true : false;
};


export const isProjectCreator = async(projectId:string, userId:string): Promise<boolean> =>{
    const project = await prismaClient.project.findUnique({
        where: { id: projectId },
        include: { members: true },
    });

    return project?.creatorId === userId;
};

prismaClient.$disconnect();
