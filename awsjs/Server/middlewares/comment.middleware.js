"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentMiddleware = void 0;
const error_1 = require("../error");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
class CommentMiddleware {
    validateBody(req, _, next) {
        try {
            const { body } = req;
            const { error, value } = utils_1.commentSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            const { clientKey, bookId, text } = value;
            req.comment = { bookId, text };
            req.clientKey = clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validateBodyActions(req, _, next) {
        try {
            const { body } = req;
            const { error, value } = utils_1.commentActionsSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.commentLikes = { ...value };
            req.clientKey = value.clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    validateUpdateBodyActions(req, _, next) {
        try {
            const { body } = req;
            const { error, value } = utils_1.commentUpdateActionsSchema.validate(body);
            if (error) {
                next(new error_1.ErrorHandler(error.message, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.commentLikes = { ...value };
            req.clientKey = value.clientKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkAlreadyExists(req, _, next) {
        try {
            const { id } = req.userData;
            const { bookId, text } = req.comment;
            const comments = await repositories_1.commentRepository.getAllByUserIdAndBookId(bookId, id);
            if (comments?.length) {
                comments.forEach((comment) => {
                    if (comment.text.toLowerCase() === text.toLowerCase()) {
                        return next(new error_1.ErrorHandler(constants_1.errorMessageConstant.flood, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                    }
                });
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkParamsById(req, _, next) {
        try {
            const { params } = req;
            if (!params.id) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.BAD_REQUEST, enums_1.HttpStatusEnum.BAD_REQUEST, enums_1.HttpMessageEnum.BAD_REQUEST));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkActionsExists(req, _, next) {
        try {
            const { id } = req.params;
            const { nickName, id: userId } = req.userData;
            const generateKey = services_1.clientService.generateKey(nickName, enums_1.ClientKeyEnum.ACTIONS_LIKES, id);
            const likes = await services_1.likeAndDisLikeService.getOneByCommentId(generateKey);
            if (!likes) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.NOT_FOUND, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            const commentLikes = req.commentLikes;
            req.commentLikes = { ...commentLikes, userId };
            req.generateKey = generateKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isActionsUnique(req, _, next) {
        try {
            const { commentId } = req.commentLikes;
            const { nickName } = req.userData;
            const generateKey = services_1.clientService.generateKey(nickName, enums_1.ClientKeyEnum.ACTIONS_LIKES, commentId.toString());
            const likes = await services_1.likeAndDisLikeService.getOneByCommentId(generateKey);
            if (likes) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.CONFLICT, enums_1.HttpStatusEnum.CONFLICT, enums_1.HttpMessageEnum.CONFLICT));
                return;
            }
            req.generateKey = generateKey;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isCommentExists(req, _, next) {
        try {
            const { commentId } = req.commentLikes;
            const comment = await repositories_1.commentRepository.getOneById(commentId);
            if (!comment) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.NOT_FOUND, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            const { id } = req.userData;
            const commentLikes = req.commentLikes;
            req.commentLikes = { ...commentLikes, userId: id };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkBookExistsById(req, _, next) {
        try {
            const { bookId } = req.comment;
            const book = await repositories_1.bookRepository.getOneById(bookId);
            if (!book) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.commentMiddleware = new CommentMiddleware();
//# sourceMappingURL=comment.middleware.js.map