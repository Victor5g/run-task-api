import prismaClient from '../database/client';

import { ModelTaskStatus, ModelTasks, ModelDetailedTask } from '../models/task';

export const createNewTask = async (
    projectId: string,
    title: string,
    description: string,
    status: ModelTaskStatus,
    tag: string
): Promise<ModelTasks> => {
    const newTask = await prismaClient.task.create({
        data: {
            title,
            description,
            status,
            project: { connect: { id: projectId } },
            tags: {
                create: { title: tag },
            },
        },
    });

    return newTask;
};

export const getTasks = async (): Promise<Array<ModelTasks>> => {
    const tasks = await prismaClient.task.findMany({
        include: {
            tags: true,
        },
    });
    return tasks;
};

export const getTaskById = async (
    taskId: string
): Promise<Array<ModelDetailedTask> | null> => {
    const task = await prismaClient.task.findMany({
        where: {
            id: taskId,
        },
        include: {
            tags: true,
        },
    });
    return task;
};

export const updateTaskInformation = async (
    taskId: string,
    title: string,
    description: string,
    status: ModelTaskStatus
) => {
    const change = await prismaClient.task.update({
        where: { id: taskId },
        data: {
            title,
            description,
            status,
        },
    });
    return change;
};

export const existingTask = async (taskId: string): Promise<boolean> => {
    const task = await prismaClient.task.findUnique({
        where: { id: taskId },
        include: { project: { include: { members: true } } },
    });
    return task ? true : false;
};

export const memberRelatingProject = async (
    taskId: string,
    userId: string
): Promise<boolean> => {
    const task = await prismaClient.task.findUnique({
        where: { id: taskId },
        include: { project: { include: { members: true } } },
    });
    if (!task) return false;
    const isTrue = task.project.members.some(
        (member: { userId: string }) => member.userId === userId
    );
    return isTrue ? true : false;
};

export const isAllowedChange = async (taskId: string): Promise<boolean> => {
    const task = await prismaClient.task.findUnique({
        where: { id: taskId },
    });
    if (!task) return false;
    return task.status === 'DONE' ? false : true;
};

export const deleteTaskById = async (taskId: string): Promise<void> => {
    await prismaClient.tag.deleteMany({
        where: { taskId },
    });
    await prismaClient.task.delete({
        where: { id: taskId },
    });
};
