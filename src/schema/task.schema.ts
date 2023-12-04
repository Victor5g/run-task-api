import { object, string, nativeEnum } from 'zod';

enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export const createTaskSchema = object({
    body: object({
        projectId: string({
            required_error: 'Project Id is required',
        }),
        userId: string({
            required_error: 'user Id is required',
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
        status: nativeEnum(TaskStatus),
        userId: string({
            required_error: 'user Id is required',
        }),
    }),
});

export const deleteTaskSchema = object({
    body: object({
        taskId: string({
            required_error: 'task id is required',
        }),
        userId: string({
            required_error: 'user id is required',
        }),
    }),
});
