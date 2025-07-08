import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';


interface UserRequest extends Request {
    user?: UserPayload
}


interface UserPayload {
    id: string;
    role: string;
    email?: string;
}

export const roleAuthentication = (...allowedRoles: string[]) => {
    return (req: UserRequest, res: Response, next: NextFunction) => {

        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(new AppError(403, 'Access denied'));
        }

        next();
    };
};
