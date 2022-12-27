import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAutenticated(
    request: Request,
    Response: Response,
    next: NextFunction,
) {
    // Bearer jkgjdkslj3491284912j1
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token Missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(
            token,
            '9f9f811d8ec680e9da0f9ffec9b8f16a',
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exists!', 401);
        }

        request.user = {
            id: user_id,
        };
        next();
    } catch (e) {
        throw new AppError('Invalid Token!', 401);
    }
}
