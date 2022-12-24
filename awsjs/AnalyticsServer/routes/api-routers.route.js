"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouters = void 0;
const express_1 = require("express");
const swagger_ui_express_1 = require("swagger-ui-express");
const swagger_json_1 = __importDefault(require("../docs/swagger.json"));
const enums_1 = require("../enums");
const views_router_1 = require("./views.router");
const files_router_1 = require("./files.router");
const users_router_1 = require("./users.router");
exports.apiRouters = (0, express_1.Router)();
exports.apiRouters.use('/docs', swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swagger_json_1.default));
exports.apiRouters.use('/views', views_router_1.viewsRouter);
exports.apiRouters.use('/files', files_router_1.filesRouter);
exports.apiRouters.use('/users', users_router_1.usersRouter);
// @ts-ignore
exports.apiRouters.use('*', (err, _, res, next) => {
    res.status(err.status || enums_1.StatusEnum.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        error: err.error || enums_1.MessageEnum.INTERNAL_SERVER_ERROR,
        status: err.status || enums_1.StatusEnum.INTERNAL_SERVER_ERROR,
    });
});
//# sourceMappingURL=api-routers.route.js.map