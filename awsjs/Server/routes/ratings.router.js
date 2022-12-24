"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingsRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.ratingsRouter = (0, express_1.Router)();
exports.ratingsRouter.post('/', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.ratingMiddleware.checkBody, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.ratingMiddleware.isBookExistsById, middlewares_1.ratingMiddleware.isUnique, controllers_1.ratingsController.createOne);
exports.ratingsRouter.patch('/:id', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.ratingMiddleware.checkBody, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.ratingMiddleware.isBookExistsById, middlewares_1.ratingMiddleware.isExists, controllers_1.ratingsController.updateOne);
exports.ratingsRouter.delete('/:id', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.isClientKey, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.ratingMiddleware.isExists, controllers_1.ratingsController.deleteOne);
//# sourceMappingURL=ratings.router.js.map