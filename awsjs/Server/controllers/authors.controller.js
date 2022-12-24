"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorsController = void 0;
const enums_1 = require("../enums");
const repositories_1 = require("../repositories");
const error_1 = require("../error");
const constants_1 = require("../constants");
const services_1 = require("../services");
const configs_1 = require("../configs");
class AuthorsController {
    async getAllWithPagination(req, res, next) {
        try {
            let page = 1;
            let perPage = 30;
            if (req.pagination?.page)
                page = req.pagination.page;
            if (req.pagination?.perPage)
                perPage = req.pagination.perPage;
            const authorsWithCount = await services_1.authorService.getAllWithPagination(page, perPage);
            if (!authorsWithCount[0]) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: authorsWithCount,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async createOne(req, res, next) {
        try {
            const author = req.author;
            const genresId = author.genres;
            if (req.file) {
                const authorCreated = await services_1.authorService.createWithRelationsByGenres({ author, genresId });
                const photoSaved = await services_1.s3Service.uploadFile(req.file, authorCreated.id, enums_1.FileEnum.PHOTOS, enums_1.ItemTypeFileEnum.AUTHORS);
                if (!photoSaved.Location) {
                    const authorResponse = await repositories_1.authorRepository.getOneById(authorCreated.id);
                    return res.status(enums_1.HttpStatusEnum.PARTIAL_CONTENT).json({
                        status: enums_1.HttpStatusEnum.PARTIAL_CONTENT,
                        data: authorResponse,
                        message: enums_1.HttpMessageEnum.PARTIAL_CONTENT,
                    });
                }
                const pathToFile = photoSaved.Location.split(configs_1.mainConfig.CLOUD_DOMAIN_NAME)[1];
                await services_1.authorService.patchingFields({ id: authorCreated.id, newFields: { photo: pathToFile } });
                const authorResponse = await repositories_1.authorRepository.getOneById(authorCreated.id);
                return res.status(enums_1.HttpStatusEnum.CREATED).json({
                    status: enums_1.HttpStatusEnum.CREATED,
                    data: authorResponse,
                    message: enums_1.HttpMessageEnum.CREATED,
                });
            }
            const authorCreated = await services_1.authorService.createWithRelationsByGenres({ author, genresId });
            const authorResponse = await repositories_1.authorRepository.getOneById(authorCreated.id);
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                data: authorResponse,
                message: enums_1.HttpMessageEnum.CREATED,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async patchOne(req, res, next) {
        try {
            const author = req.author;
            const newFields = req.authorPatch;
            if (req.file) {
                const photoSaved = await services_1.s3Service.uploadFile(req.file, author.id, enums_1.FileEnum.PHOTOS, enums_1.ItemTypeFileEnum.AUTHORS);
                if (!photoSaved.Location) {
                    const authorResponse = await repositories_1.authorRepository.getOneById(author.id);
                    return res.status(enums_1.HttpStatusEnum.PARTIAL_CONTENT).json({
                        status: enums_1.HttpStatusEnum.PARTIAL_CONTENT,
                        data: authorResponse,
                        message: enums_1.HttpMessageEnum.PARTIAL_CONTENT,
                    });
                }
                const pathToFile = photoSaved.Location.split(configs_1.mainConfig.CLOUD_DOMAIN_NAME)[1];
                await services_1.authorService.patchingFields({
                    id: author.id,
                    newFields: { ...newFields, photo: pathToFile },
                });
                const authorResponse = await repositories_1.authorRepository.getOneById(author.id);
                return res.status(enums_1.HttpStatusEnum.OK).json({
                    status: enums_1.HttpStatusEnum.OK,
                    data: authorResponse,
                    message: enums_1.HttpMessageEnum.OK,
                });
            }
            await services_1.authorService.patchingFields({ id: author.id, newFields });
            const authorResponse = await repositories_1.authorRepository.getOneById(author.id);
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: authorResponse,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getOneById(req, res, next) {
        try {
            const { params } = req;
            const authorFromDB = await repositories_1.authorRepository.getOneById(Number(params.id));
            if (!authorFromDB) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.authorNotFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: authorFromDB,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getAllByLikeFullName(req, res, next) {
        try {
            const fullname = req.params.fullname;
            const authorFromDB = await repositories_1.authorRepository.getAllByLikeFullName(fullname);
            if (!authorFromDB[0].length) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.authorNotFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: authorFromDB,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteOne(req, res, next) {
        try {
            const author = req.author;
            if (author.photo)
                await services_1.s3Service.deleteFile(author.photo);
            const authorDeleted = await repositories_1.authorRepository.removeById(author.id);
            if (!authorDeleted) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.NO_CONTENT).json({
                status: enums_1.HttpStatusEnum.NO_CONTENT,
                data: enums_1.HttpMessageEnum.NO_CONTENT,
                message: enums_1.HttpMessageEnum.NO_CONTENT,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getAll(_, res, next) {
        try {
            const authors = await repositories_1.authorRepository.getAll();
            if (!authors) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.unknown, enums_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, enums_1.HttpMessageEnum.INTERNAL_SERVER_ERROR));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: authors,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authorsController = new AuthorsController();
//# sourceMappingURL=authors.controller.js.map