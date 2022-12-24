import { Router } from 'express';

import { ratingsController } from '../controllers';
import { authMiddleware, ratingMiddleware } from '../middlewares';

export const ratingsRouter = Router();

ratingsRouter.post(
    '/',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    ratingMiddleware.checkBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    ratingMiddleware.isBookExistsById,
    ratingMiddleware.isUnique,
    ratingsController.createOne,
);
ratingsRouter.patch(
    '/:id',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    ratingMiddleware.checkBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    ratingMiddleware.isBookExistsById,
    ratingMiddleware.isExists,
    ratingsController.updateOne,
);

ratingsRouter.delete(
    '/:id',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.isClientKey,
    authMiddleware.wasItIssuedToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.checkUserAuthByPayload,
    ratingMiddleware.isExists,
    ratingsController.deleteOne,
);
