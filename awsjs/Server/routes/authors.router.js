"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
exports.authorsRouter = (0, express_1.Router)();
const upload = (0, middlewares_1.authorPhoto)();
exports.authorsRouter.get('/', middlewares_1.paginationMiddleware.checkQuery, controllers_1.authorsController.getAllWithPagination);
exports.authorsRouter.get('/admin/:clientKey', middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.authMiddleware.isClientKeyParams, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.authMiddleware.isAdmin, controllers_1.authorsController.getAll);
exports.authorsRouter.get('/:id', middlewares_1.authorMiddleware.checkParamsId, controllers_1.authorsController.getOneById);
exports.authorsRouter.get('/search/:fullname', middlewares_1.authorMiddleware.checkParamsName, controllers_1.authorsController.getAllByLikeFullName);
exports.authorsRouter.post('/', upload.single('photo'), middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.authorMiddleware.validateBody, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.authMiddleware.isAdmin, middlewares_1.authorMiddleware.checkPseudonymExists, controllers_1.authorsController.createOne);
exports.authorsRouter.patch('/:id', upload.single('photo'), middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.authorMiddleware.validatePatchBody, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.authMiddleware.isAdmin, middlewares_1.authorMiddleware.checkExists, middlewares_1.authorMiddleware.checkPseudonymExists, controllers_1.authorsController.patchOne);
exports.authorsRouter.delete('/:id', middlewares_1.authorMiddleware.checkParamsId, middlewares_1.authMiddleware.isAuthorization, middlewares_1.authMiddleware.checkAuthorizationOnBearer, middlewares_1.authMiddleware.validateAuthorizationToken, middlewares_1.bookMiddleware.checkQueryClientKey, middlewares_1.authMiddleware.verifyAccessToken, middlewares_1.authMiddleware.wasItIssuedToken, middlewares_1.authMiddleware.checkUserAuthByPayload, middlewares_1.authMiddleware.isAdmin, middlewares_1.authorMiddleware.checkExists, controllers_1.authorsController.deleteOne);
//# sourceMappingURL=authors.router.js.map