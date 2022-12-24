"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsController = void 0;
const enums_1 = require("../enums");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const error_1 = require("../error");
const constants_1 = require("../constants");
class CommentsController {
    async getAll(req, res, next) {
        try {
            const { pagination } = req;
            if (pagination?.page) {
                const allComments = await services_1.commentService.getAllPagination(pagination?.page);
                if (!allComments?.length) {
                    next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                    return;
                }
                return res.status(enums_1.HttpStatusEnum.OK).json({
                    status: enums_1.HttpStatusEnum.OK,
                    message: enums_1.HttpMessageEnum.OK,
                    data: allComments,
                });
            }
            const allComments = await services_1.commentService.getAllPagination();
            if (!allComments.length) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.notFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: allComments,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async createOne(req, res, next) {
        try {
            const { id } = req.userData;
            const { text, bookId } = req.comment;
            const commentCreated = await repositories_1.commentRepository.createOne({ bookId, text, userId: id });
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                data: commentCreated,
                message: enums_1.HttpMessageEnum.CREATED,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getOneActions(req, res, next) {
        try {
            const { id } = req.params;
            const actions = await services_1.likeAndDisLikeService.getAllByCommentId(id);
            if (!actions.length) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.NOT_FOUND, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            const likes = actions.map(async (action) => new Promise((resolve) => {
                services_1.clientService.get(action).then((data) => resolve(JSON.parse(data)));
            }));
            const allLikes = await Promise.all(likes);
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: allLikes,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async addAction(req, res, next) {
        try {
            const { like, userId, disLike, } = req.commentLikes;
            const generateKey = req.generateKey;
            const newLikes = await services_1.clientService.set(generateKey, JSON.stringify({ userId, like, disLike }));
            if (!newLikes) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                message: enums_1.HttpMessageEnum.CREATED,
                data: newLikes,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async removeAction(req, res, next) {
        try {
            const generateKey = req.generateKey;
            const removed = await services_1.clientService.delete(generateKey);
            return res.status(enums_1.HttpStatusEnum.NO_CONTENT).json({
                status: enums_1.HttpStatusEnum.NO_CONTENT,
                message: enums_1.HttpMessageEnum.NO_CONTENT,
                data: removed,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async updateAction(req, res, next) {
        try {
            const generateKey = req.generateKey;
            const { like, disLike, userId, } = req.commentLikes;
            const updated = await services_1.clientService.set(generateKey, JSON.stringify({ userId, like, disLike }));
            if (!updated) {
                next(new error_1.ErrorHandler(enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                message: enums_1.HttpMessageEnum.OK,
                data: updated,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.commentsController = new CommentsController();
//# sourceMappingURL=comments.controller.js.map