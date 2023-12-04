import { object, string } from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        email: string({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'invalid password, at least 8 characters'),
    }),
});


export const deleteUserSchema = object({
    params: object({
        userId: string({
            required_error: 'user id is required',
        }),
    }),
});


export const listUserSchema = object({
    params: object({
        userId: string({
            required_error: 'required id',
        }),
    }),
});

export const changeUserSchema = object({
    params: object({
        userId: string({
            required_error: 'required id',
        }),
    }),
    body: object({
        name: string({
            required_error: 'Name is required',
        }),
        email: string({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'invalid password, at least 8 characters'),
    }),
});
