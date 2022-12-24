import { Router } from 'express';

import { alreadyReadController } from '../controllers';
import { alreadyReadMiddleware, authMiddleware } from '../middlewares';

export const alreadyReadRouter = Router();

alreadyReadRouter.get(
    '/:clientKey',
    authMiddleware.isAuthorization,
    alreadyReadMiddleware.checkParamsOnClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    alreadyReadController.getOneByUserId,
);

alreadyReadRouter.post(
    '/',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    alreadyReadMiddleware.validateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    alreadyReadMiddleware.checkBooksById,
    alreadyReadMiddleware.checkUniqueByUserId,
    alreadyReadController.createOne,
);

alreadyReadRouter.patch(
    '/',
    alreadyReadMiddleware.checkQuery,
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    alreadyReadMiddleware.validateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    alreadyReadMiddleware.checkBooksById,
    alreadyReadMiddleware.checkExistsByUserId,
    alreadyReadController.updateOne,
);

alreadyReadRouter.delete(
    '/',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    alreadyReadMiddleware.checkExistsByUserId,
    alreadyReadController.deleteOne,
);
