import { NextFunction } from 'express';

import { IRequest, IResponse } from '../interfaces';
import { clientService } from '../services';
import { ClientKeyEnum, HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../error';
import { errorMessageConstant } from '../constants';

class ViewsController {
    public async getByBookId(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const bookId = req.bookId!;

            const generateKey = clientService.generateKey(bookId, ClientKeyEnum.VIEWS_COUNT_BOOK);
            const viewsKey = await clientService.get(generateKey);

            if (!viewsKey) {
                next(new ErrorHandler(errorMessageConstant.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: viewsKey,
            });
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const generateKey = req.generateKey!;
            const { views } = req.views!;

            const createdView = await clientService.set(generateKey, JSON.stringify({ views }));

            if (!createdView) {
                next(new ErrorHandler(
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                message: HttpMessageEnum.CREATED,
                data: createdView,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateView(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const generateKey = req.generateKey!;
            const { views } = req.views!;

            const updatedView = await clientService.set(generateKey, JSON.stringify({ views: views + 1 }));

            if (!updatedView) {
                next(new ErrorHandler(
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: updatedView,
            });
        } catch (e) {
            next(e);
        }
    }

    public async removeViews(req: IRequest, res: IResponse<number>, next: NextFunction): Promise<IResponse<number> | undefined> {
        try {
            const generateKey = req.generateKey!;

            const removedViews = await clientService.delete(generateKey);

            if (!removedViews) {
                next(new ErrorHandler(
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: removedViews,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const viewsController = new ViewsController();
