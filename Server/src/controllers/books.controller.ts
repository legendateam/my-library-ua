import { NextFunction } from 'express';

import { Books } from '../entities';
import {
    IBook, IFileExtended, IRequest, IResponse,
} from '../interfaces';
import { bookRepository } from '../repositories';
import {
    FileEnum, HttpMessageEnum, HttpStatusEnum, ItemTypeFileEnum,
} from '../enums';
import {
    bookService, googleCloudService, paginationService, s3Service,
} from '../services';
import { mainConfig } from '../configs';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';

class BooksController {
    public async getOneById(req: IRequest, res: IResponse<Books>, next: NextFunction): Promise<IResponse<Books> | undefined> {
        try {
            const { params } = req;

            const book = await bookRepository.getOneById(Number(params.id));

            if (!book) {
                next(new ErrorHandler(errorMessageConstant.authorNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: book,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequest, res: IResponse<Books | null>, next: NextFunction): Promise<IResponse<Books | null> | undefined> {
        try {
            const book = req.body as IBook;

            const bookCreated = await bookService.createWithRelationsByGenres({ book, genresId: book.genres });

            if (req.file && !req.files) {
                if (book?.fileText && !book?.fileAudio && !book?.cover) {
                    const textFileSave = await googleCloudService.upload(
                        req.file,
                        bookCreated.name,
                    );

                    if (!textFileSave) {
                        const bookResponse = await bookRepository.getOneById(bookCreated.id);

                        return res.status(HttpStatusEnum.PARTIAL_CONTENT).json({
                            status: HttpStatusEnum.PARTIAL_CONTENT,
                            data: bookResponse,
                            message: HttpMessageEnum.PARTIAL_CONTENT,
                        });
                    }

                    const fileText = textFileSave!;

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { fileText } });
                }

                if (book?.cover && !book?.fileText && !book?.fileAudio) {
                    const coverSave = await s3Service.uploadFile(req.file, bookCreated.id, FileEnum.PHOTOS, ItemTypeFileEnum.BOOKS);

                    if (!coverSave.Location) {
                        const bookResponse = await bookRepository.getOneById(bookCreated.id);

                        return res.status(HttpStatusEnum.PARTIAL_CONTENT).json({
                            status: HttpStatusEnum.PARTIAL_CONTENT,
                            data: bookResponse,
                            message: HttpMessageEnum.PARTIAL_CONTENT,
                        });
                    }

                    const cover = coverSave.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { cover } });
                }

                if (req.book?.fileAudio && !book?.cover && !book?.fileText) {
                    const audioFileSave = await googleCloudService.upload(
                        req.file,
                        bookCreated.name,
                    );

                    if (!audioFileSave) {
                        const bookResponse = await bookRepository.getOneById(bookCreated.id);

                        return res.status(HttpStatusEnum.PARTIAL_CONTENT).json({
                            status: HttpStatusEnum.PARTIAL_CONTENT,
                            data: bookResponse,
                            message: HttpMessageEnum.PARTIAL_CONTENT,
                        });
                    }

                    const fileAudio = audioFileSave!;

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { fileAudio } });
                }

                const bookResponse = await bookRepository.getOneById(bookCreated.id);

                return res.status(HttpStatusEnum.CREATED).json({
                    status: HttpStatusEnum.CREATED,
                    data: bookResponse,
                    message: HttpMessageEnum.CREATED,
                });
            }

            if (req.files && !req.file) {
                const files = req.files as IFileExtended;

                if (files.fileText) {
                    const fileTextElement = files.fileText[0];
                    const fileText = await googleCloudService.upload(
                        fileTextElement,
                        bookCreated.name,
                    );

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { fileText } });
                }

                if (files.cover) {
                    const fileCoverElement = files.cover[0];
                    const coverSave = await s3Service.uploadFile(fileCoverElement, bookCreated.id, FileEnum.PHOTOS, ItemTypeFileEnum.BOOKS);

                    if (!coverSave.Location) {
                        const bookResponse = await bookRepository.getOneById(bookCreated.id);

                        return res.status(HttpStatusEnum.PARTIAL_CONTENT).json({
                            status: HttpStatusEnum.PARTIAL_CONTENT,
                            data: bookResponse,
                            message: HttpMessageEnum.PARTIAL_CONTENT,
                        });
                    }

                    const cover = coverSave.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { cover } });
                }

                if (files.fileAudio) {
                    const fileAudioElement = files.fileAudio[0];
                    const fileAudio = await googleCloudService.upload(
                        fileAudioElement,
                        bookCreated.name,
                    );

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { fileAudio } });
                }
            }

            const bookResponse = await bookRepository.getOneById(bookCreated.id);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: bookResponse,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getAll(_: IRequest, res: IResponse<Books[]>, next: NextFunction): Promise<IResponse<Books[]> | undefined> {
        try {
            const books = await bookRepository.getAll();
            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: books,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getAllRatings(req: IRequest, res: IResponse<[Books[], number]>, next: NextFunction)
        : Promise<IResponse<[Books[], number]> | undefined> {
        try {
            let page = req.pagination?.page;
            let perPage = req.pagination?.perPage;

            if (!page) page = 1;
            if (!perPage) perPage = 30;

            const { rate } = req.params!;

            const skip = paginationService.createSkip(page, perPage);

            const books = await bookRepository.getAllRatingsWithPagination(Number(rate), skip, perPage);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: books,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getTopRatings(req: IRequest, res: IResponse<[Books[], number]>, next: NextFunction)
        : Promise<IResponse<[Books[], number]> | undefined> {
        try {
            let perPage = req.pagination?.perPage;

            if (!perPage) perPage = 30;

            const { rate } = req.params!;

            const books = await bookRepository.getTopRatings(Number(rate), perPage);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: books,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async lastAddedBooks(req: IRequest, res: IResponse<Books[]>, next: NextFunction)
        : Promise<IResponse<Books[]> | undefined> {
        try {
            let perPage = req.pagination?.perPage;

            if (!perPage) perPage = 10;

            const books = await bookRepository.getLatest(Number(perPage));

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: books,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getAllNovelty(req: IRequest, res: IResponse<[Books[], number]>, next: NextFunction)
        : Promise<IResponse<[Books[], number]> | undefined> {
        try {
            const { startDay } = req.params!;

            let page = req.pagination?.page;
            let perPage = req.pagination?.perPage;

            if (!page) page = 1;
            if (!perPage) perPage = 30;

            const skip = paginationService.createSkip(page, perPage);

            const books = await bookRepository.getAllNoveltyWithPagination(startDay, skip, perPage);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: books,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getAllByGenre(req: IRequest, res: IResponse<[Books[], number]>, next: NextFunction)
        : Promise<IResponse<[Books[], number]> | undefined> {
        try {
            const { genre } = req.params!;

            let page = req.pagination?.page;
            let perPage = req.pagination?.perPage;

            if (!page) page = 1;
            if (!perPage) perPage = 30;

            const skip = paginationService.createSkip(page, perPage);

            const books = await bookRepository.getAllGenreWithPagination(genre, skip, perPage);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: books,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async deleteOne(req:IRequest, res: IResponse<HttpMessageEnum.NO_CONTENT>, next: NextFunction)
        : Promise<IResponse<HttpMessageEnum.NO_CONTENT> | undefined> {
        try {
            const book = req.book as Books;
            await bookRepository.deleteOne(book.id);

            if (book.fileText) {
                await googleCloudService.deleteOne(book.fileText.split('/')[2]);
            }

            if (book.fileAudio) {
                await googleCloudService.deleteOne(book.fileAudio.split('/')[2]);
            }

            if (book.cover) {
                await s3Service.deleteFile(book.cover);
            }

            return res.status(HttpStatusEnum.NO_CONTENT).json({
                status: HttpStatusEnum.NO_CONTENT,
                data: HttpMessageEnum.NO_CONTENT,
                message: HttpMessageEnum.NO_CONTENT,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getAllBySearchData(req: IRequest, res: IResponse<[Books[], number]>, next: NextFunction)
        : Promise<IResponse<[Books[], number]> | undefined> {
        try {
            const { search } = req.search!;

            const books = await bookRepository.getAllLikeByNameOrDescription(search);

            if (!books[0].length) {
                next(new ErrorHandler(errorMessageConstant.authorNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: books,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequest, res: IResponse<Books | null>, next: NextFunction)
        : Promise<IResponse<Books | null> | undefined> {
        try {
            const id = req.params.id!;
            const book = req.book! as Partial<Books>;

            if (req.file && !req.files) {
                if (book?.fileText && !book?.fileAudio && !book?.cover) {
                    const textFileSave = await googleCloudService.upload(
                        req.file,
                        book.name!,
                    );

                    const fileText = textFileSave!;

                    await bookService.patchingFields({ id: Number(id), newFields: { fileText } });
                }

                if (book?.cover && !book?.fileText && !book?.fileAudio) {
                    const coverSave = await s3Service.uploadFile(req.file, Number(id), FileEnum.PHOTOS, ItemTypeFileEnum.BOOKS);
                    const cover = coverSave.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];

                    await bookService.patchingFields({ id: Number(id), newFields: { cover } });
                }

                if (req.book?.fileAudio && !book?.cover && !book?.fileText) {
                    const audioFileSave = await googleCloudService.upload(
                        req.file,
                        book.name!,
                    );

                    const fileAudio = audioFileSave!;

                    await bookService.patchingFields({ id: Number(id), newFields: { fileAudio } });
                }
            }

            if (req.files && !req.file) {
                const files = req.files as IFileExtended;

                if (files.fileText) {
                    const fileTextElement = files.fileText[0];
                    const fileText = await googleCloudService.upload(
                        fileTextElement,
                        book.name!,
                    );

                    await bookService.patchingFields({ id: Number(id), newFields: { fileText } });
                }

                if (files.cover) {
                    const fileCoverElement = files.cover[0];
                    const coverSave = await s3Service.uploadFile(fileCoverElement, Number(id), FileEnum.PHOTOS, ItemTypeFileEnum.BOOKS);

                    const cover = coverSave.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];

                    await bookService.patchingFields({ id: Number(id), newFields: { cover } });
                }

                if (files.fileAudio) {
                    const fileAudioElement = files.fileAudio[0];
                    const fileAudio = await googleCloudService.upload(
                        fileAudioElement,
                        book.name!,
                    );

                    await bookService.patchingFields({ id: Number(id), newFields: { fileAudio } });
                }
            }

            await bookRepository.updateOne(Number(id), book);

            const bookResponse = await bookRepository.getOneById(Number(id));

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: bookResponse,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const booksController = new BooksController();
