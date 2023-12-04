import { Request, Response } from 'express';

import prismaClient from '../database/client';

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, description, userId } = req.body;

        const userExists = await prismaClient.user.findUnique({
            where: { id: userId },
        });
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

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

        res.status(201).json({ message: 'created project', project });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { projectId, userId } = req.body;

        const project = await prismaClient.project.findUnique({
            where: { id: projectId },
            include: { members: true },
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const user = await prismaClient.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (project.creatorId !== userId) {
            return res
                .status(403)
                .json({ error: 'Only the project creator performs this action' });
        }

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
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const listProjects = async (_: Request, res: Response) => {
    try {
        const projects = await prismaClient.project.findMany({
            include: { members: true, tasks: true, },
        });
        res.status(200).json(projects);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const listProjectById = async (req: Request, res: Response) => {
    try {
        const project = await prismaClient.project.findUnique({
            where: { id: req.params.projectId },
            include: { members: true, tasks: true },
        });
        res.status(project ? 200 : 404).json(project || {});
    } catch (error) {
        res.sendStatus(500);
    }
};

export const changeProjectById = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const project = await prismaClient.project.update({
            where: { id: req.params.projectId },
            data: {
                name,
                description,
            },
        });
        res.status(200).json(project);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const addMemberProject = async (req: Request, res: Response) => {
    try {
        const { projectId, memberId, userId } = req.body;

        const project = await prismaClient.project.findUnique({
            where: { id: projectId },
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const member = await prismaClient.user.findUnique({
            where: { id: memberId },
        });

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        const user = await prismaClient.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (project.creatorId !== userId) {
            return res
                .status(403)
                .json({ error: 'Only the project creator can perform this action' });
        }

        await prismaClient.projectUser.create({
            data: {
                userId: memberId,
                projectId,
            },
        });

        res
            .status(200)
            .json({ message: `Member ${memberId} added to project ${projectId}` });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const removeMemberProject = async (req: Request, res: Response) => {
    const { projectId, memberId, userId } = req.body;
    try {
        const project = await prismaClient.project.findUnique({
            where: { id: projectId },
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const member = await prismaClient.user.findUnique({
            where: { id: memberId },
        });

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        if (project.creatorId !== userId) {
            return res
                .status(403)
                .json({ error: 'Only the project creator can perform this action' });
        }

        await prismaClient.projectUser.delete({
            where: {
                userId_projectId: {
                    userId: memberId,
                    projectId,
                },
            },
        });

        res.status(200)
            .json({
                message: `Member ${memberId} remodev from project ${projectId}`,
            });
    } catch (error) {
        res.sendStatus(500);
    }
};

prismaClient.$disconnect();
