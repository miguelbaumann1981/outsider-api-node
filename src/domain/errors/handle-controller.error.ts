import { Response } from 'express';
import { CustomError } from './custom.error';

export const handleControllerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(error ? 400 : 500).json({ error: error ?? 'INTERNAL_SERVER_ERROR' });
}