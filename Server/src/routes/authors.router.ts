import { Router } from 'express';

import { authorsController } from '../controllers';
import {
    authMiddleware, authorMiddleware, authorPhoto, bookMiddleware, paginationMiddleware,
} from '../middlewares';

export const authorsRouter = Router();
const upload = authorPhoto();

authorsRouter.get(
    '/',
    paginationMiddleware.checkQuery,
    authorsController.getAllWithPagination,
);

authorsRouter.get(
    '/admin/:clientKey',
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.isClientKeyParams,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAdmin,
    authorsController.getAll,
);

authorsRouter.get(
    '/:id',
    authorMiddleware.checkParamsId,
    authorsController.getOneById,
);

authorsRouter.get(
    '/search/:fullname',
    authorMiddleware.checkParamsName,
    authorsController.getAllByLikeFullName,
);

authorsRouter.post(
    '/',
    upload.single('photo'),
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    authorMiddleware.validateBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAdmin,
    authorMiddleware.checkPseudonymExists,
    authorsController.createOne,
);

authorsRouter.patch(
    '/:id',
    upload.single('photo'),
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    authorMiddleware.validatePatchBody,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAdmin,
    authorMiddleware.checkExists,
    authorMiddleware.checkPseudonymExists,
    authorsController.patchOne,
);

authorsRouter.delete(
    '/:id',
    authorMiddleware.checkParamsId,
    authMiddleware.isAuthorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    bookMiddleware.checkQueryClientKey,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAdmin,
    authorMiddleware.checkExists,
    authorsController.deleteOne,
);
