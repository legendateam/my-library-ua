import { Router } from 'express';

import { usersController } from '../controllers';
import { authMiddleware, userAvatar, userMiddleware } from '../middlewares';

export const usersRouter = Router();
const upload = userAvatar();

usersRouter.get('/', usersController.getAll);
usersRouter.patch(
    '/update',
    upload.single('avatar'),
    authMiddleware.isAuthorization,
    userMiddleware.validateData,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    userMiddleware.compareNewPassword,
    userMiddleware.uniqueNickNameOrEmail,
    usersController.updateOne,
);
