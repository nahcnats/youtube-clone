import { object, string, TypeOf } from 'zod';

export const loginSchema = {
    body: object({
        email: string({
            required_error: 'email is required',
        }).email('not a valid email'),
        password: string({
            required_error: 'password is required'
        }).min(6, 'min 6 characters').max(25, 'max 25 characters'),
    }),
}

export type LoginBody = TypeOf<typeof loginSchema.body>;