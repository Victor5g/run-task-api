import { Request, Response } from 'express';

import { existingUserInProject } from '../services/user.service';
import { existingProject } from '../services/project.service';
import {
    createNewTask,
    getTasks,
    getTaskById,
    existingTask,
    memberRelatingProject,
    isAllowedChange,
    updateTaskInformation,
    deleteTaskById,
} from '../services/task.service';

import { ModelTaskStatus } from '../models/task';

export const createTask = async (req: Request, res: Response) => {
    try {
        const { projectId, UserId, title, description, tag } = req.body;

        if (!(await existingProject(projectId))) {
            return res.status(404).json({ error: 'Project not found' });
        }
        if (!(await existingUserInProject(projectId, UserId))) {
            return res.status(403).json({
                error: `user ${UserId} is not part of the project ${projectId}`,
            });
        }
        const task = await createNewTask(
            projectId,
            title,
            description,
            ModelTaskStatus.PENDING,
            tag
        );
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

export const listTasks = async (_: Request, res: Response) => {
    try {
        const tasks = await getTasks();
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
        const tasks = await getTaskById(taskId);
        if (!tasks) {
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
        const { title, description, status, UserId } = req.body;
        if (!(await existingTask(taskId))) {
            return res.status(404).json({ error: 'task not fount' });
        }
        if (!(await memberRelatingProject(taskId, UserId))) {
            return res.status(403).json({
                error: `user ${UserId} is not part of the taks ${taskId}`,
            });
        }
        if (!(await isAllowedChange(taskId))) {
            return res
                .status(403)
                .json({ message: 'Completed tasks cannot be edited' });
        }
        const change = await updateTaskInformation(
            taskId,
            title,
            description,
            status
        );
        res.status(200).json(change);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { taskId, UserId } = req.body;
        if (!await existingTask(taskId)) {
            return res.status(404).json({ error: 'task not fount' });
        }
        if (!(await memberRelatingProject(taskId, UserId))) {
            return res.status(403).json({
                error: `user ${UserId} is not part of the taks ${taskId}`,
            });
        }
        if (!(await isAllowedChange(taskId))) {
            return res
                .status(403)
                .json({ message: 'Completed tasks cannot be deleted' });
        }
        await deleteTaskById(taskId);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
