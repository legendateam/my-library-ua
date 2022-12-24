import { NextFunction } from 'express';

import dayjs from 'dayjs';
import {
    IFiles, IFilesModel, IRequest, IResponse,
} from '../interfaces';
import { filesRepository } from '../repositories';
import { MessageEnum, StatusEnum } from '../enums';
import { ErrorHandler } from '../error';

class FilesController {
    public async createOne(req: IRequest, res: IResponse<IFilesModel>, next: NextFunction)
        : Promise<IResponse<IFilesModel> | undefined> {
        try {
            const files = { downloadNumbers: 0, readNumbers: 1 } as IFiles;

            if (req.downloadNumbers) {
                files.downloadNumbers = 1;
                files.readNumbers = 0;
            }

            const filesModelCreated = await filesRepository.createOne(files);

            return res.status(StatusEnum.CREATED).json({
                status: StatusEnum.CREATED,
                data: filesModelCreated,
                message: MessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequest, res: IResponse<IFilesModel | null>, next: NextFunction)
        : Promise<IResponse<IFilesModel | null> | undefined> {
        try {
            const { _id, downloadNumbers, readNumbers } = req.files!;

            const files = { downloadNumbers: 0, readNumbers: 1 } as IFiles;

            if (req.downloadNumbers) {
                files.downloadNumbers = downloadNumbers + 1;
                files.readNumbers = readNumbers;
            }

            if (req.readNumbers) {
                files.readNumbers = readNumbers + 1;
                files.downloadNumbers = downloadNumbers;
            }

            const filesModelUpdated = await filesRepository.updateOne(_id, files);

            return res.status(StatusEnum.OK).json({
                status: StatusEnum.OK,
                data: filesModelUpdated,
                message: MessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getOne(_: IRequest, res: IResponse<IFilesModel | null>, next: NextFunction)
        : Promise<IResponse<IFilesModel | null> | undefined> {
        try {
            const date = dayjs().utc().startOf('day').format();

            const filesModel = await filesRepository.getOneByDate(date);

            if (!filesModel) {
                next(new ErrorHandler(MessageEnum.NOT_FOUND, StatusEnum.NOT_FOUND, MessageEnum.NOT_FOUND));
                return;
            }

            return res.status(StatusEnum.OK).json({
                status: StatusEnum.OK,
                data: filesModel,
                message: MessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getAll(req: IRequest, res: IResponse<IFilesModel[] | null>, next: NextFunction)
        : Promise<IResponse<IFilesModel[] | null> | undefined> {
        try {
            const { query } = req;

            if (query.date) {
                const date = query.date as string;
                const filesModel = await filesRepository.getAllByDate(date);

                if (!filesModel.length) {
                    next(new ErrorHandler(MessageEnum.NOT_FOUND, StatusEnum.NOT_FOUND, MessageEnum.NOT_FOUND));
                    return;
                }

                return res.status(StatusEnum.OK).json({
                    status: StatusEnum.OK,
                    data: filesModel,
                    message: MessageEnum.OK,
                });
            }

            const filesModel = await filesRepository.getAll();

            if (!filesModel.length) {
                next(new ErrorHandler(MessageEnum.NOT_FOUND, StatusEnum.NOT_FOUND, MessageEnum.NOT_FOUND));
                return;
            }

            return res.status(StatusEnum.OK).json({
                status: StatusEnum.OK,
                data: filesModel,
                message: MessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const filesController = new FilesController();
