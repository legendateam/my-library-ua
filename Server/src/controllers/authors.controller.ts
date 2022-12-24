import { NextFunction } from 'express';
import { UpdateResult } from 'typeorm';

import { IAuthor, IRequest, IResponse } from '../interfaces';
import { Authors } from '../entities';
import {
    FileEnum, HttpMessageEnum, HttpStatusEnum, ItemTypeFileEnum,
} from '../enums';
import { authorRepository } from '../repositories';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';
import { authorService, s3Service } from '../services';
import { mainConfig } from '../configs';

class AuthorsController {
    public async getAllWithPagination(req: IRequest, res: IResponse<[Authors[], number]>, next: NextFunction)
        : Promise<IResponse<[Authors[], number]> | undefined> {
        try {
            let page = 1;
            let perPage = 30;

            if (req.pagination?.page) page = req.pagination.page;
            if (req.pagination?.perPage) perPage = req.pagination.perPage;

            const authorsWithCount = await authorService.getAllWithPagination(page, perPage);

            if (!authorsWithCount[0]) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: authorsWithCount,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequest, res: IResponse<Authors | null>, next: NextFunction)
        : Promise<IResponse<Authors | null> | undefined> {
        try {
            const author = req.author as IAuthor;
            const genresId = author.genres as number[];

            if (req.file) {
                const authorCreated = await authorService.createWithRelationsByGenres({ author, genresId });
                const photoSaved = await s3Service.uploadFile(req.file, authorCreated.id, FileEnum.PHOTOS, ItemTypeFileEnum.AUTHORS);

                if (!photoSaved.Location) {
                    const authorResponse = await authorRepository.getOneById(authorCreated.id);

                    return res.status(HttpStatusEnum.PARTIAL_CONTENT).json({
                        status: HttpStatusEnum.PARTIAL_CONTENT,
                        data: authorResponse,
                        message: HttpMessageEnum.PARTIAL_CONTENT,
                    });
                }
                const pathToFile = photoSaved.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];
                await authorService.patchingFields({ id: authorCreated.id, newFields: { photo: pathToFile } });

                const authorResponse = await authorRepository.getOneById(authorCreated.id);

                return res.status(HttpStatusEnum.CREATED).json({
                    status: HttpStatusEnum.CREATED,
                    data: authorResponse,
                    message: HttpMessageEnum.CREATED,
                });
            }

            const authorCreated = await authorService.createWithRelationsByGenres({ author, genresId });
            const authorResponse = await authorRepository.getOneById(authorCreated.id);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: authorResponse,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async patchOne(req: IRequest, res: IResponse<UpdateResult | Authors | null>, next: NextFunction)
        : Promise<IResponse<UpdateResult> | undefined | null | Authors> {
        try {
            const author = req.author as Authors;
            const newFields = req.authorPatch!;

            if (req.file) {
                const photoSaved = await s3Service.uploadFile(req.file, author.id, FileEnum.PHOTOS, ItemTypeFileEnum.AUTHORS);

                if (!photoSaved.Location) {
                    const authorResponse = await authorRepository.getOneById(author.id);

                    return res.status(HttpStatusEnum.PARTIAL_CONTENT).json({
                        status: HttpStatusEnum.PARTIAL_CONTENT,
                        data: authorResponse,
                        message: HttpMessageEnum.PARTIAL_CONTENT,
                    });
                }

                const pathToFile = photoSaved.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];
                await authorService.patchingFields({
                    id: author.id,
                    newFields: { ...newFields, photo: pathToFile },
                });

                const authorResponse = await authorRepository.getOneById(author.id);

                return res.status(HttpStatusEnum.OK).json({
                    status: HttpStatusEnum.OK,
                    data: authorResponse,
                    message: HttpMessageEnum.OK,
                });
            }

            await authorService.patchingFields({ id: author.id, newFields });

            const authorResponse = await authorRepository.getOneById(author.id);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: authorResponse,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getOneById(req: IRequest, res: IResponse<Authors | null>, next:NextFunction): Promise<IResponse<Authors> | undefined> {
        try {
            const { params } = req;

            const authorFromDB = await authorRepository.getOneById(Number(params.id));

            if (!authorFromDB) {
                next(new ErrorHandler(errorMessageConstant.authorNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: authorFromDB,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getAllByLikeFullName(req: IRequest, res: IResponse<[Authors[], number]>, next:NextFunction)
        : Promise<IResponse<[Authors[], number]> | undefined> {
        try {
            const fullname = req.params.fullname!;

            const authorFromDB = await authorRepository.getAllByLikeFullName(fullname);

            if (!authorFromDB[0].length) {
                next(new ErrorHandler(errorMessageConstant.authorNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: authorFromDB,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async deleteOne(req: IRequest, res: IResponse<HttpMessageEnum.NO_CONTENT>, next: NextFunction)
        : Promise<IResponse<HttpMessageEnum.NO_CONTENT> | undefined> {
        try {
            const author = req.author as Authors;

            if (author.photo) await s3Service.deleteFile(author.photo);

            const authorDeleted = await authorRepository.removeById(author.id);

            if (!authorDeleted) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
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

    public async getAll(_: IRequest, res: IResponse<Authors[]>, next: NextFunction): Promise<IResponse<Authors[]> | undefined> {
        try {
            const authors = await authorRepository.getAll();

            if (!authors) {
                next(new ErrorHandler(
                    errorMessageConstant.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: authors,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const authorsController = new AuthorsController();
