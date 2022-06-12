import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

const errorHandler = (
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction,
) => {
    if (err instanceof AppError) {
        return response.status(200).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
};

export default errorHandler;