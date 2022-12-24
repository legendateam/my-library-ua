import { Router } from 'express';
import passport from 'passport';

import { authController } from '../controllers';
import { authMiddleware, userAvatar } from '../middlewares';
import { mainConfig } from '../configs';

export const authRouter = Router();
const upload = userAvatar();

authRouter.post(
    '/registration',
    upload.single('avatar'),
    authMiddleware.validateBodyRegistration,
    authMiddleware.checkUserOnUnique,
    authController.registration,
);

authRouter.post(
    '/login',
    authMiddleware.validateBodyLogin,
    authMiddleware.checkUserAuthByEmail,
    authMiddleware.checkPassword,
    authController.login,
);

authRouter.post(
    '/logout',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authController.logout,
);

authRouter.post(
    '/refresh',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyRefreshToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authController.refresh,
);

authRouter.post(
    '/forgotPassword',
    authMiddleware.validateEmail,
    authMiddleware.checkUserAuthByEmail,
    authMiddleware.alreadyExistsForgotToken,
    authController.forgotPassword,
);

authRouter.patch(
    '/forgotPassword',
    authMiddleware.isAuthorization,
    authMiddleware.validateForgotBody,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyForgotToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAuthClientKey,
    authMiddleware.checkOnDuplicatePassword,
    authMiddleware.checkOldTokens,
    authController.changePassword,
);

authRouter.get(
    '/refresh/verify/:clientKey',
    authMiddleware.isAuthorization,
    authMiddleware.isClientKeyOfParams,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.wasItIssuedToken,
    authController.refreshVerify,
);

authRouter.get('/login/success', authController.loginSuccess);
authRouter.get('/login/failed', authController.loginFailed);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));
authRouter.get('/google/callback', passport.authenticate('google', {
    successRedirect: `${mainConfig.CLIENT_URL}`,
    failureRedirect: '/auth/login/failed',
}));
