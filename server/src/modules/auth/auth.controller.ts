import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import omit from '../../helpers/omit';
import { findUserByEmail } from '../user/user.service';
import { LoginBody } from './auth.schema';
import { signJwt } from './auth.utils';

const COOKIE_SECURE = () => {
    if (process.env.COOKIE_SECURE === 'false') {
        return false;
    }

    return true;
}

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user || !user.comparePassword(password)) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Invalid credentials');
    }

    const payload = omit(user.toJSON(), ['password']);

    const jwt = signJwt(payload);

    res.cookie('accessToken', jwt, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: process.env.DOMAIN || 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: COOKIE_SECURE(),
    });

    return res.status(StatusCodes.OK).send(jwt);
}