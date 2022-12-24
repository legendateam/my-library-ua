import { NextFunction, Response } from 'express';

import {
    IRequest, IResponse, IViews, IViewsModel,
} from '../interfaces';
import { MessageEnum, StatusEnum } from '../enums';
import { viewsRepository } from '../repositories';
import { ErrorHandler } from '../error';

class ViewsController {
    public async getAll(req: IRequest, res: IResponse<IViewsModel[] | null>, next: NextFunction)
        : Promise<IResponse<IViewsModel[] | null> | undefined> {
        try {
            const { query } = req;
            const date = query.date as string;

            if (date) {
                const viewsModel = await viewsRepository.getAllByDay(date);

                if (!viewsModel?.length) {
                    next(new ErrorHandler(MessageEnum.NOT_FOUND, StatusEnum.NOT_FOUND, MessageEnum.NOT_FOUND));
                    return;
                }

                return res.status(StatusEnum.OK).json({
                    status: StatusEnum.OK,
                    message: MessageEnum.OK,
                    data: viewsModel,
                });
            }

            const viewsModel = await viewsRepository.getAll();

            if (!viewsModel.length) {
                next(new ErrorHandler(MessageEnum.NOT_FOUND, StatusEnum.NOT_FOUND, MessageEnum.NOT_FOUND));
                return;
            }

            return res.status(StatusEnum.OK).json({
                status: StatusEnum.OK,
                message: MessageEnum.OK,
                data: viewsModel,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getOneDate(req: IRequest, res: IResponse<IViewsModel | null>, next: NextFunction)
        : Promise<IResponse<IViewsModel | null> | undefined> {
        try {
            const { date } = req.params;

            const viewsModel = await viewsRepository.getOneByDay(date);

            if (!viewsModel) {
                next(new ErrorHandler(MessageEnum.NOT_FOUND, StatusEnum.NOT_FOUND, MessageEnum.NOT_FOUND));
                return;
            }

            return res.status(StatusEnum.OK).json({
                status: StatusEnum.OK,
                message: MessageEnum.OK,
                data: viewsModel,
            });
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequest, res: IResponse<IViewsModel>, next: NextFunction): Promise<IResponse<IViewsModel> | undefined> {
        try {
            const { user } = req;
            const { ipAddress } = req;

            let data = { views: 1, auth_views: 0, unique_views: 0 } as IViews;

            if (user) {
                data = { ...data, auth_views: 1 };
            }

            if (ipAddress) {
                data = { ...data, unique_views: 1 };
            }

            const viewsModel = await viewsRepository.createFirstView(data);

            return res.status(StatusEnum.CREATED).json({
                status: StatusEnum.CREATED,
                message: MessageEnum.CREATED,
                data: viewsModel,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user } = req;
            const { ipAddress } = req;
            const views = req.views!;

            let data = { views: views.views + 1, auth_views: views.auth_views, unique_views: views.unique_views } as IViews;

            if (user) {
                data = { ...data, auth_views: views.auth_views + 1 };
            }

            if (ipAddress) {
                data = { ...data, unique_views: views.unique_views + 1 };
            }

            await viewsRepository.updateOne(views._id, data);

            res.status(StatusEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const viewsController = new ViewsController();
