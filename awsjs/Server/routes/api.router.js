"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const swagger_ui_express_1 = require("swagger-ui-express");
const swagger_json_1 = __importDefault(require("../docs/swagger.json"));
const users_router_1 = require("./users.router");
const enums_1 = require("../enums");
const will_read_router_1 = require("./will-read.router");
const authors_router_1 = require("./authors.router");
const books_router_1 = require("./books.router");
const comments_router_1 = require("./comments.router");
const favorites_router_1 = require("./favorites.router");
const genres_router_1 = require("./genres.router");
const ratings_router_1 = require("./ratings.router");
const already_read_router_1 = require("./already-read.router");
const auth_router_1 = require("./auth.router");
const views_router_1 = require("./views.router");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use('/docs', swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swagger_json_1.default));
exports.apiRouter.use('/users', users_router_1.usersRouter);
exports.apiRouter.use('/auth', auth_router_1.authRouter);
exports.apiRouter.use('/willRead', will_read_router_1.willReadRouter);
exports.apiRouter.use('/authors', authors_router_1.authorsRouter);
exports.apiRouter.use('/books', books_router_1.booksRouter);
exports.apiRouter.use('/comments', comments_router_1.commentsRouter);
exports.apiRouter.use('/favorites', favorites_router_1.favoritesRouter);
exports.apiRouter.use('/genres', genres_router_1.genresRouter);
exports.apiRouter.use('/ratings', ratings_router_1.ratingsRouter);
exports.apiRouter.use('/alreadyread', already_read_router_1.alreadyReadRouter);
exports.apiRouter.use('/views', views_router_1.viewsRouter);
// @ts-ignore
exports.apiRouter.use('*', (err, req, res, next) => {
    res.status(err.status || enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        error: err?.error || enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR,
        status: err?.status || enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR,
    });
});
//# sourceMappingURL=api.router.js.map