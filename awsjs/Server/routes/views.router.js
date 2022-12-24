"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
exports.viewsRouter = (0, express_1.Router)();
exports.viewsRouter.get('/:bookId', middlewares_1.viewMiddleware.checkParamsOnBookId, controllers_1.viewsController.getByBookId);
exports.viewsRouter.post('/', middlewares_1.viewMiddleware.validateBodyOnBookId, middlewares_1.viewMiddleware.isUnique, middlewares_1.viewMiddleware.checkBookExists, controllers_1.viewsController.createOne);
exports.viewsRouter.patch('/:bookId', middlewares_1.viewMiddleware.checkParamsOnBookId, middlewares_1.viewMiddleware.isExists, controllers_1.viewsController.updateView);
exports.viewsRouter.delete('/:bookId', middlewares_1.viewMiddleware.checkParamsOnBookId, middlewares_1.viewMiddleware.isExists, controllers_1.viewsController.removeViews);
//# sourceMappingURL=views.router.js.map