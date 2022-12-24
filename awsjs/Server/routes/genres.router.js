"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genresRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.genresRouter = (0, express_1.Router)();
exports.genresRouter.get('/', controllers_1.genresController.getAll);
exports.genresRouter.post('/', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.genreMiddleware.validateBody, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.authMiddleware.isAdmin, middlewares_1.genreMiddleware.isUnique, controllers_1.genresController.createOne);
exports.genresRouter.get('/:id', controllers_1.genresController.getOne);
exports.genresRouter.delete('/:name', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.genreMiddleware.checkParamsNameAndQueryClientKey, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.authMiddleware.isAdmin, middlewares_1.genreMiddleware.checkExists, controllers_1.genresController.removeOne);
//# sourceMappingURL=genres.router.js.map