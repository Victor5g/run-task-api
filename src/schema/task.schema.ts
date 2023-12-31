import { object, string, nativeEnum } from 'zod';

import { ModelTaskStatus } from '../models/task';

export const createTaskSchema = object({
    body: object({
        projectId: string({
            required_error: 'Project Id is required',
        }),
        title: string({
            required_error: 'title is required',
        }),
        description: string({
            required_error: 'description is required',
        }),
        tag: string({
            required_error: 'tag is required',
        }),
    }),
});

export const listTaskSchema = object({
    params: object({
        taskId: string({
            required_error: 'taskId id is required',
        }),
    }),
});

export const changeTaskSchema = object({
    params: object({
        taskId: string({
            required_error: 'required id',
        }),
    }),
    body: object({
        title: string({
            required_error: 'title is required',
        }),
        description: string({
            required_error: 'description is required',
        }),
        status: nativeEnum(ModelTaskStatus)
    }),
});

export const deleteTaskSchema = object({
    body: object({
        taskId: string({
            required_error: 'task id is required',
        })
    }),
});
