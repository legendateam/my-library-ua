"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = void 0;
const express_1 = require("express");
const files_middleware_1 = require("../middlewares/files.middleware");
const controllers_1 = require("../controllers");
exports.filesRouter = (0, express_1.Router)();
exports.filesRouter.get('/', controllers_1.filesController.getAll);
exports.filesRouter.get('/:date', controllers_1.filesController.getOne);
exports.filesRouter.post('/', files_middleware_1.filesMiddleware.validateBody, files_middleware_1.filesMiddleware.isUnique, controllers_1.filesController.createOne);
exports.filesRouter.patch('/', files_middleware_1.filesMiddleware.validateBody, files_middleware_1.filesMiddleware.isExists, controllers_1.filesController.updateOne);
//# sourceMappingURL=files.router.js.map