import { Request, Response } from 'express';
import prismaClient from '../database/client';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { projectId, userId, title, description, tag } = req.body;

        const project = await prismaClient.project.findUnique({
            where: { id: projectId },
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const projectUser = await prismaClient.projectUser.findUnique({
            where: {
                userId_projectId: {
                    userId,
                    projectId,
                },
            },
        });

        if (!projectUser) {
            return res.status(403).json({
                error: `user ${userId} is not part of the project ${projectId}`,
            });
        }

        const task = await prismaClient.task.create({
            data: {
                title,
                description,
                status: 'PENDING',
                project: { connect: { id: projectId } },
                tags: {
                    create: { title: tag },
                },
            },
        });

        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const listTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await prismaClient.task.findMany({
            include: {
                tags: true,
            },
        });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ error: 'taks not found' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const listTaskById = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;

        const tasks = await prismaClient.task.findMany({
            where: {
                id: taskId,
            },
            include: {
                tags: true,
            },
        });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ error: 'tak not found' });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const changeTask = async (req: Request, res: Response) => {
    try {
        const { taskId } = req.params;
        const { title, description, status, userId } = req.body;

        const task = await prismaClient.task.findUnique({
            where: { id: taskId },
            include: { project: { include: { members: true } } },
        });

        if (!task) {
            return res.status(404).json({ error: 'task not fount' });
        }

        const isMember = task.project.members.some((member) => member.userId === userId);

        if (!isMember) {
            return res.status(403).json({
                error: `user ${userId} is not part of the taks ${task.id}`,
            });
        }

        if (task.status === 'DONE') {
            return res
                .status(403)
                .json({ message: 'Completed tasks cannot be edited' });
        }

        const change = await prismaClient.task.update({
            where: { id: taskId },
            data: {
                title,
                description,
                status,
            },
        });

        res.status(200).json(change);
    } catch (error) {
        res.sendStatus(500);
    }
};


export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { taskId, userId } = req.body;

        const task = await prismaClient.task.findUnique({
            where: { id: taskId },
            include: { project: { include: { members: true } } },
        });

        if (!task) {
            return res.status(404).json({ error: 'task not fount' });
        }

        const isMember = task.project.members.some((member) => member.userId === userId);

        if (!isMember) {
            return res.status(403).json({
                error: `user ${userId} is not part of the taks ${task.id}`,
            });
        }

        if (task.status === 'DONE') {
            return res.status(403).json({ message: 'Completed tasks cannot be deleted' });
        }

        await prismaClient.tag.deleteMany({
            where: { taskId },
        });

        await prismaClient.task.delete({
            where: { id: taskId },
        });

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
