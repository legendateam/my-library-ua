import { Router } from 'express';

import { favoritesController } from '../controllers';
import { authMiddleware, favoritesMiddleware } from '../middlewares';

export const favoritesRouter = Router();

favoritesRouter.get(
    '/:clientKey',
    authMiddleware.isAuthorization,
    favoritesMiddleware.checkParamsOnClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    favoritesController.getOneByUserId,
);

favoritesRouter.post(
    '/',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    favoritesMiddleware.validateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    favoritesMiddleware.checkBooksById,
    favoritesMiddleware.checkUniqueByUserId,
    favoritesController.createOne,
);

favoritesRouter.patch(
    '/',
    favoritesMiddleware.checkQuery,
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    favoritesMiddleware.validateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    favoritesMiddleware.checkBooksById,
    favoritesMiddleware.checkExistsByUserId,
    favoritesController.updateOne,
);

favoritesRouter.delete(
    '/',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    favoritesMiddleware.checkExistsByUserId,
    favoritesController.deleteOne,
);
