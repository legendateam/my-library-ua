"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
exports.viewsRouter = (0, express_1.Router)();
exports.viewsRouter.get('/', controllers_1.viewsController.getAll);
exports.viewsRouter.get('/:date', controllers_1.viewsController.getOneDate);
exports.viewsRouter.post('/', middlewares_1.viewsMiddleware.validateBodyUserId, middlewares_1.viewsMiddleware.checkOnFirst, middlewares_1.viewsMiddleware.checkUserExists, middlewares_1.viewsMiddleware.ipAddressIsUnique, controllers_1.viewsController.createOne);
exports.viewsRouter.patch('/', middlewares_1.viewsMiddleware.validateBodyUserId, middlewares_1.viewsMiddleware.isExists, middlewares_1.viewsMiddleware.checkUserExists, middlewares_1.viewsMiddleware.ipAddressIsUnique, controllers_1.viewsController.updateOne);
//# sourceMappingURL=views.router.js.map