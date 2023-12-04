import { Router, Request, Response } from 'express';
import { validate } from './middleware/validate';

import {
    listUserSchema,
    createUserSchema,
    deleteUserSchema,
    changeUserSchema,
} from './schema/user.schema';
import {
    listUsers,
    listUserById,
    createUser,
    changeUserById,
    deleteUser,
} from './controllers/user.controller';

import {
    createProjectSchema,
    listProjectSchema,
    updateProjectSchema,
    deleteProjectSchema,
    addMemberSchema,
    removeMemberSchema
} from './schema/project.schema';
import {
    createProject,
    listProjects,
    listProjectById,
    changeProjectById,
    deleteProject,
    addMemberProject,
    removeMemberProject
} from './controllers/project.controller';

import {
    createTaskSchema,
    listTaskSchema,
    changeTaskSchema,
    deleteTaskSchema
} from './schema/task.schema';
import {
    listTasks,
    listTaskById,
    createTask,
    changeTask,
    deleteTask
} from './controllers/task.controller';

const router = Router();

router.get('/users', listUsers);
router.get('/user/:userId', validate(listUserSchema), listUserById);
router.post('/user', validate(createUserSchema), createUser);
router.delete('/user/:userId', validate(deleteUserSchema), deleteUser);
router.put('/user/:userId', validate(changeUserSchema), changeUserById);

router.get('/projects', listProjects);
router.get('/project/:projectId', validate(listProjectSchema), listProjectById);
router.post('/project', validate(createProjectSchema), createProject);
router.delete('/project', validate(deleteProjectSchema), deleteProject);
router.put('/project/:projectId', validate(updateProjectSchema), changeProjectById);

router.post('/project/add-member', validate(addMemberSchema), addMemberProject);
router.delete('/project/remove-member', validate(removeMemberSchema), removeMemberProject);

router.get('/tasks', listTasks);
router.get('/task/:taskId', validate(listTaskSchema), listTaskById);
router.post('/task', validate(createTaskSchema), createTask);
router.put('/task/:taskId', validate(changeTaskSchema), changeTask);
router.delete('/task', validate(deleteTaskSchema), deleteTask);


router.all('*', (req: Request, res: Response) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

export default router;
