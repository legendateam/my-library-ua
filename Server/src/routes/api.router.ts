import {
    Request, Response, NextFunction, Router,
} from 'express';
import { setup, serve } from 'swagger-ui-express';

import docsFile from '../docs/swagger.json';
import { usersRouter } from './users.router';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../error';
import { willReadRouter } from './will-read.router';
import { authorsRouter } from './authors.router';
import { booksRouter } from './books.router';
import { commentsRouter } from './comments.router';
import { favoritesRouter } from './favorites.router';
import { genresRouter } from './genres.router';
import { ratingsRouter } from './ratings.router';
import { alreadyReadRouter } from './already-read.router';
import { authRouter } from './auth.router';
import { viewsRouter } from './views.router';

export const apiRouter = Router();

apiRouter.use('/docs', serve, setup(docsFile));
apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/willRead', willReadRouter);
apiRouter.use('/authors', authorsRouter);
apiRouter.use('/books', booksRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/favorites', favoritesRouter);
apiRouter.use('/genres', genresRouter);
apiRouter.use('/ratings', ratingsRouter);
apiRouter.use('/alreadyread', alreadyReadRouter);
apiRouter.use('/views', viewsRouter);

// @ts-ignore
apiRouter.use('*', (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        error: err?.error || HttpMessageEnum.INTERNAL_SERVER_ERROR,
        status: err?.status || HttpStatusEnum.INTERNAL_SERVER_ERROR,
    });
});
