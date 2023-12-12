import { Request, Response } from 'express';

import prismaClient from '../database/client';

import { existingUser } from '../services/user.service';
import {
    existingProject,
    isProjectCreator,
    addMemberInProject,
    getProjects,
    removeMember,
    createNewProject,
    deleteProjectById,
    getProjectById,
    updateProjectInformation,
} from '../services/project.service';

export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, description, userId } = req.body;
        if (!(await existingUser(userId))) {
            return res.status(404).json({ error: 'User not found' });
        }
        const project = await createNewProject(name, description, userId);
        res.status(201).json({ message: 'created project', project });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { projectId, userId } = req.body;
        if (!(await existingProject(projectId))) {
            return res.status(404).json({ error: 'Project not found' });
        }
        if (!(await existingUser(userId))) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!(await isProjectCreator(projectId, userId))) {
            return res
                .status(403)
                .json({ error: 'Only the project creator performs this action' });
        }
        await deleteProjectById(projectId);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const listProjects = async (_: Request, res: Response) => {
    try {
        const projects = await getProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const listProjectById = async (req: Request, res: Response) => {
    try {
        const project = await getProjectById(req.params.projectId);
        res.status(project ? 200 : 404).json(project || {});
    } catch (error) {
        res.sendStatus(500);
    }
};

export const changeProjectById = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const { projectId } = req.params;

        if (!(await existingProject(projectId))) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const project = await updateProjectInformation(projectId, name, description);
        res.status(200).json(project);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const addMemberProject = async (req: Request, res: Response) => {
    try {
        const { projectId, memberId, userId } = req.body;
        if (!(await existingProject(projectId))) {
            return res.status(404).json({ error: 'Project not found' });
        }
        if (!(await existingUser(memberId))) {
            return res.status(404).json({ error: 'Member not found' });
        }
        if (!(await existingUser(userId))) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!(await isProjectCreator(projectId, userId))) {
            return res
                .status(403)
                .json({ error: 'Only the project creator can perform this action' });
        }
        const sucess = await addMemberInProject(projectId, memberId);
        res
            .status(sucess ? 200 : 503)
            .json(
                sucess
                    ? { message: `Member ${memberId} added to project ${projectId}` }
                    : {}
            );
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const removeMemberProject = async (req: Request, res: Response) => {
    const { projectId, memberId, userId } = req.body;
    try {
        if (!(await existingProject(projectId))) {
            return res.status(404).json({ error: 'Project not found' });
        }
        if (!(await existingUser(memberId))) {
            return res.status(404).json({ error: 'Member not found' });
        }
        if (!(await isProjectCreator(projectId, userId))) {
            return res
                .status(403)
                .json({ error: 'Only the project creator can perform this action' });
        }
        const removed = await removeMember(projectId, memberId);
        res.status(removed ? 200 : 503).json(
            removed
                ? {
                    message: `Member ${memberId} remodev from project ${projectId}`,
                }
                : {}
        );
    } catch (error) {
        res.sendStatus(500);
    }
};

prismaClient.$disconnect();
