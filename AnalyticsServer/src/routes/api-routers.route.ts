import { NextFunction, Request, Router } from 'express';
import { setup, serve } from 'swagger-ui-express';

import DocsFile from '../docs/swagger.json';
import { ErrorHandler } from '../error';
import { MessageEnum, StatusEnum } from '../enums';
import { IErrorResponse } from '../interfaces';
import { viewsRouter } from './views.router';
import { filesRouter } from './files.router';
import { usersRouter } from './users.router';

export const apiRouters = Router();

apiRouters.use('/docs', serve, setup(DocsFile));
apiRouters.use('/views', viewsRouter);
apiRouters.use('/files', filesRouter);
apiRouters.use('/users', usersRouter);

// @ts-ignore
apiRouters.use('*', (err: ErrorHandler, _: Request, res: IErrorResponse, next: NextFunction) => {
    res.status(err.status || StatusEnum.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        error: err.error || MessageEnum.INTERNAL_SERVER_ERROR,
        status: err.status || StatusEnum.INTERNAL_SERVER_ERROR,
    });
});
