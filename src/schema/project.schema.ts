import { object, string } from 'zod';

export const createProjectSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required.',
        }),
        description: string({
            required_error: 'Description is required',
        }),
        userId: string({
            required_error: 'Project userId is required',
        }),
    }),
});

export const listProjectSchema = object({
    params: object({
        projectId: string({
            required_error: 'required id',
        }),
    }),
});

export const updateProjectSchema = object({
    params: object({
        projectId: string({
            required_error: 'required id',
        }),
    }),
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        description: string({
            required_error: 'Description is required',
        }),
    }),
});

export const deleteProjectSchema = object({
    body: object({
        projectId: string({
            required_error: 'project id is required',
        }),
        userId: string({
            required_error: 'user id is required',
        }),
    }),
});

export const addMemberSchema = object({
    body: object({
        projectId: string({
            required_error: 'project id is required',
        }),
        memberId: string({
            required_error: 'member id is required',
        }),
        userId: string({
            required_error: 'user id is required',
        }),
    }),
});

export const removeMemberSchema = object({
    body: object({
        projectId: string({
            required_error: 'project id is required',
        }),
        memberId: string({
            required_error: 'member id is required',
        }),
        userId: string({
            required_error: 'user id is required',
        }),
    }),
});
