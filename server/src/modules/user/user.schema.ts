import { object, string, TypeOf } from 'zod';

export const registerUserSchema = {
    body: object({
        username: string({
            required_error: 'username is required'
        }),
        email: string({
            required_error: 'email is required'
        }).email('not a valid email'),
        password: string({
            required_error: 'password is required'
        }).min(6, 'min 6 characters').max(25, 'max 25 characters'),
        confirmPassword: string({
            required_error: 'confirm password is required'
        }).min(6, 'min 6 characters').max(25, 'max 25 characters'),
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'passwords do not match',
        path: ['confirmPassword'],
    }),
}

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;