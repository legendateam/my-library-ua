"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksController = void 0;
const repositories_1 = require("../repositories");
const enums_1 = require("../enums");
const services_1 = require("../services");
const configs_1 = require("../configs");
const error_1 = require("../error");
const constants_1 = require("../constants");
class BooksController {
    async getOneById(req, res, next) {
        try {
            const { params } = req;
            const book = await repositories_1.bookRepository.getOneById(Number(params.id));
            if (!book) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.authorNotFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: book,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async createOne(req, res, next) {
        try {
            const book = req.body;
            const bookCreated = await services_1.bookService.createWithRelationsByGenres({ book, genresId: book.genres });
            if (req.file && !req.files) {
                if (book?.fileText && !book?.fileAudio && !book?.cover) {
                    const textFileSave = await services_1.googleCloudService.upload(req.file, bookCreated.name);
                    if (!textFileSave) {
                        const bookResponse = await repositories_1.bookRepository.getOneById(bookCreated.id);
                        return res.status(enums_1.HttpStatusEnum.PARTIAL_CONTENT).json({
                            status: enums_1.HttpStatusEnum.PARTIAL_CONTENT,
                            data: bookResponse,
                            message: enums_1.HttpMessageEnum.PARTIAL_CONTENT,
                        });
                    }
                    const fileText = textFileSave;
                    await services_1.bookService.patchingFields({ id: bookCreated.id, newFields: { fileText } });
                }
                if (book?.cover && !book?.fileText && !book?.fileAudio) {
                    const coverSave = await services_1.s3Service.uploadFile(req.file, bookCreated.id, enums_1.FileEnum.PHOTOS, enums_1.ItemTypeFileEnum.BOOKS);
                    if (!coverSave.Location) {
                        const bookResponse = await repositories_1.bookRepository.getOneById(bookCreated.id);
                        return res.status(enums_1.HttpStatusEnum.PARTIAL_CONTENT).json({
                            status: enums_1.HttpStatusEnum.PARTIAL_CONTENT,
                            data: bookResponse,
                            message: enums_1.HttpMessageEnum.PARTIAL_CONTENT,
                        });
                    }
                    const cover = coverSave.Location.split(configs_1.mainConfig.CLOUD_DOMAIN_NAME)[1];
                    await services_1.bookService.patchingFields({ id: bookCreated.id, newFields: { cover } });
                }
                if (req.book?.fileAudio && !book?.cover && !book?.fileText) {
                    const audioFileSave = await services_1.googleCloudService.upload(req.file, bookCreated.name);
                    if (!audioFileSave) {
                        const bookResponse = await repositories_1.bookRepository.getOneById(bookCreated.id);
                        return res.status(enums_1.HttpStatusEnum.PARTIAL_CONTENT).json({
                            status: enums_1.HttpStatusEnum.PARTIAL_CONTENT,
                            data: bookResponse,
                            message: enums_1.HttpMessageEnum.PARTIAL_CONTENT,
                        });
                    }
                    const fileAudio = audioFileSave;
                    await services_1.bookService.patchingFields({ id: bookCreated.id, newFields: { fileAudio } });
                }
                const bookResponse = await repositories_1.bookRepository.getOneById(bookCreated.id);
                return res.status(enums_1.HttpStatusEnum.CREATED).json({
                    status: enums_1.HttpStatusEnum.CREATED,
                    data: bookResponse,
                    message: enums_1.HttpMessageEnum.CREATED,
                });
            }
            if (req.files && !req.file) {
                const files = req.files;
                if (files.fileText) {
                    const fileTextElement = files.fileText[0];
                    const fileText = await services_1.googleCloudService.upload(fileTextElement, bookCreated.name);
                    await services_1.bookService.patchingFields({ id: bookCreated.id, newFields: { fileText } });
                }
                if (files.cover) {
                    const fileCoverElement = files.cover[0];
                    const coverSave = await services_1.s3Service.uploadFile(fileCoverElement, bookCreated.id, enums_1.FileEnum.PHOTOS, enums_1.ItemTypeFileEnum.BOOKS);
                    if (!coverSave.Location) {
                        const bookResponse = await repositories_1.bookRepository.getOneById(bookCreated.id);
                        return res.status(enums_1.HttpStatusEnum.PARTIAL_CONTENT).json({
                            status: enums_1.HttpStatusEnum.PARTIAL_CONTENT,
                            data: bookResponse,
                            message: enums_1.HttpMessageEnum.PARTIAL_CONTENT,
                        });
                    }
                    const cover = coverSave.Location.split(configs_1.mainConfig.CLOUD_DOMAIN_NAME)[1];
                    await services_1.bookService.patchingFields({ id: bookCreated.id, newFields: { cover } });
                }
                if (files.fileAudio) {
                    const fileAudioElement = files.fileAudio[0];
                    const fileAudio = await services_1.googleCloudService.upload(fileAudioElement, bookCreated.name);
                    await services_1.bookService.patchingFields({ id: bookCreated.id, newFields: { fileAudio } });
                }
            }
            const bookResponse = await repositories_1.bookRepository.getOneById(bookCreated.id);
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                data: bookResponse,
                message: enums_1.HttpMessageEnum.CREATED,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getAll(_, res, next) {
        try {
            const books = await repositories_1.bookRepository.getAll();
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: books,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getAllRatings(req, res, next) {
        try {
            let page = req.pagination?.page;
            let perPage = req.pagination?.perPage;
            if (!page)
                page = 1;
            if (!perPage)
                perPage = 30;
            const { rate } = req.params;
            const skip = services_1.paginationService.createSkip(page, perPage);
            const books = await repositories_1.bookRepository.getAllRatingsWithPagination(Number(rate), skip, perPage);
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: books,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getTopRatings(req, res, next) {
        try {
            let perPage = req.pagination?.perPage;
            if (!perPage)
                perPage = 30;
            const { rate } = req.params;
            const books = await repositories_1.bookRepository.getTopRatings(Number(rate), perPage);
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: books,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async lastAddedBooks(req, res, next) {
        try {
            let perPage = req.pagination?.perPage;
            if (!perPage)
                perPage = 10;
            const books = await repositories_1.bookRepository.getLatest(Number(perPage));
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: books,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getAllNovelty(req, res, next) {
        try {
            const { startDay } = req.params;
            let page = req.pagination?.page;
            let perPage = req.pagination?.perPage;
            if (!page)
                page = 1;
            if (!perPage)
                perPage = 30;
            const skip = services_1.paginationService.createSkip(page, perPage);
            const books = await repositories_1.bookRepository.getAllNoveltyWithPagination(startDay, skip, perPage);
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: books,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getAllByGenre(req, res, next) {
        try {
            const { genre } = req.params;
            let page = req.pagination?.page;
            let perPage = req.pagination?.perPage;
            if (!page)
                page = 1;
            if (!perPage)
                perPage = 30;
            const skip = services_1.paginationService.createSkip(page, perPage);
            const books = await repositories_1.bookRepository.getAllGenreWithPagination(genre, skip, perPage);
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: books,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteOne(req, res, next) {
        try {
            const book = req.book;
            await repositories_1.bookRepository.deleteOne(book.id);
            if (book.fileText) {
                await services_1.googleCloudService.deleteOne(book.fileText.split('/')[2]);
            }
            if (book.fileAudio) {
                await services_1.googleCloudService.deleteOne(book.fileAudio.split('/')[2]);
            }
            if (book.cover) {
                await services_1.s3Service.deleteFile(book.cover);
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
    async getAllBySearchData(req, res, next) {
        try {
            const { search } = req.search;
            const books = await repositories_1.bookRepository.getAllLikeByNameOrDescription(search);
            if (!books[0].length) {
                next(new error_1.ErrorHandler(constants_1.errorMessageConstant.authorNotFound, enums_1.HttpStatusEnum.NOT_FOUND, enums_1.HttpMessageEnum.NOT_FOUND));
                return;
            }
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: books,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async updateOne(req, res, next) {
        try {
            const id = req.params.id;
            const book = req.book;
            if (req.file && !req.files) {
                if (book?.fileText && !book?.fileAudio && !book?.cover) {
                    const textFileSave = await services_1.googleCloudService.upload(req.file, book.name);
                    const fileText = textFileSave;
                    await services_1.bookService.patchingFields({ id: Number(id), newFields: { fileText } });
                }
                if (book?.cover && !book?.fileText && !book?.fileAudio) {
                    const coverSave = await services_1.s3Service.uploadFile(req.file, Number(id), enums_1.FileEnum.PHOTOS, enums_1.ItemTypeFileEnum.BOOKS);
                    const cover = coverSave.Location.split(configs_1.mainConfig.CLOUD_DOMAIN_NAME)[1];
                    await services_1.bookService.patchingFields({ id: Number(id), newFields: { cover } });
                }
                if (req.book?.fileAudio && !book?.cover && !book?.fileText) {
                    const audioFileSave = await services_1.googleCloudService.upload(req.file, book.name);
                    const fileAudio = audioFileSave;
                    await services_1.bookService.patchingFields({ id: Number(id), newFields: { fileAudio } });
                }
            }
            if (req.files && !req.file) {
                const files = req.files;
                if (files.fileText) {
                    const fileTextElement = files.fileText[0];
                    const fileText = await services_1.googleCloudService.upload(fileTextElement, book.name);
                    await services_1.bookService.patchingFields({ id: Number(id), newFields: { fileText } });
                }
                if (files.cover) {
                    const fileCoverElement = files.cover[0];
                    const coverSave = await services_1.s3Service.uploadFile(fileCoverElement, Number(id), enums_1.FileEnum.PHOTOS, enums_1.ItemTypeFileEnum.BOOKS);
                    const cover = coverSave.Location.split(configs_1.mainConfig.CLOUD_DOMAIN_NAME)[1];
                    await services_1.bookService.patchingFields({ id: Number(id), newFields: { cover } });
                }
                if (files.fileAudio) {
                    const fileAudioElement = files.fileAudio[0];
                    const fileAudio = await services_1.googleCloudService.upload(fileAudioElement, book.name);
                    await services_1.bookService.patchingFields({ id: Number(id), newFields: { fileAudio } });
                }
            }
            await repositories_1.bookRepository.updateOne(Number(id), book);
            const bookResponse = await repositories_1.bookRepository.getOneById(Number(id));
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: bookResponse,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.booksController = new BooksController();
//# sourceMappingURL=books.controller.js.map