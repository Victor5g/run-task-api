import { Router, Request, Response } from 'express';
import { auth } from './middleware/auth';
import { validate } from './middleware/validate';

import {
    authUserSchema,
    listUserSchema,
    createUserSchema,
    deleteUserSchema,
    changeUserSchema,
} from './schema/user.schema';
import { authenticate } from './controllers/auth.controller';
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
    removeMemberSchema,
} from './schema/project.schema';
import {
    createProject,
    listProjects,
    listProjectById,
    changeProjectById,
    deleteProject,
    addMemberProject,
    removeMemberProject,
} from './controllers/project.controller';

import {
    createTaskSchema,
    listTaskSchema,
    changeTaskSchema,
    deleteTaskSchema,
} from './schema/task.schema';
import {
    listTasks,
    listTaskById,
    createTask,
    changeTask,
    deleteTask,
} from './controllers/task.controller';

const router = Router();

router.post('/auth', validate(authUserSchema), authenticate);
router.post('/user', validate(createUserSchema), createUser);

router.get('/users', auth, listUsers);
router.get('/user/:userId', auth, validate(listUserSchema), listUserById);
router.delete('/user/:userId', auth, validate(deleteUserSchema), deleteUser);
router.put('/user/:userId', auth, validate(changeUserSchema), changeUserById);

router.get('/projects', auth, listProjects);
router.get('/project/:projectId', auth, validate(listProjectSchema), listProjectById);
router.post('/project', auth, validate(createProjectSchema), createProject);
router.delete('/project', auth, validate(deleteProjectSchema), deleteProject);
router.put(
    '/project/:projectId',
    auth,
    validate(updateProjectSchema),
    changeProjectById
);

router.post('/project/add-member', auth, validate(addMemberSchema), addMemberProject);
router.delete(
    '/project/remove-member',
    auth,
    validate(removeMemberSchema),
    removeMemberProject
);

router.get('/tasks', auth, listTasks);
router.get('/task/:taskId', auth, validate(listTaskSchema), listTaskById);
router.post('/task', auth, validate(createTaskSchema), createTask);
router.put('/task/:taskId', auth, validate(changeTaskSchema), changeTask);
router.delete('/task', auth, validate(deleteTaskSchema), deleteTask);

router.all('*', (req: Request, res: Response) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

export default router;
