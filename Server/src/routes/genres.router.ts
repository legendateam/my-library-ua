import { Router } from 'express';

import { genresController } from '../controllers';
import { authMiddleware, genreMiddleware } from '../middlewares';

export const genresRouter = Router();

genresRouter.get('/', genresController.getAll);
genresRouter.post(
    '/',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    genreMiddleware.validateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAdmin,
    genreMiddleware.isUnique,
    genresController.createOne,
);
genresRouter.get('/:id', genresController.getOne);
genresRouter.delete(
    '/:name',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    genreMiddleware.checkParamsNameAndQueryClientKey,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAdmin,
    genreMiddleware.checkExists,
    genresController.removeOne,
);
