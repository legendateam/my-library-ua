import { Router } from 'express';

import { willReadController } from '../controllers';
import { willReadMiddleware, authMiddleware } from '../middlewares';

export const willReadRouter = Router();

willReadRouter.get(
    '/:clientKey',
    authMiddleware.isAuthorization,
    willReadMiddleware.checkParamsOnClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    willReadController.getOneByUserId,
);

willReadRouter.post(
    '/',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    willReadMiddleware.validateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    willReadMiddleware.checkBooksById,
    willReadMiddleware.checkUniqueByUserId,
    willReadController.createOne,
);

willReadRouter.patch(
    '/',
    willReadMiddleware.checkQuery,
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    willReadMiddleware.validateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    willReadMiddleware.checkBooksById,
    willReadMiddleware.checkExistsByUserId,
    willReadController.updateOne,
);

willReadRouter.delete(
    '/',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    willReadMiddleware.checkExistsByUserId,
    willReadController.deleteOne,
);
