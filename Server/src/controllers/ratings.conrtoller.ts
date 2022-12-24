import { NextFunction } from 'express';

import { DeleteResult, UpdateResult } from 'typeorm';
import { IRequest, IResponse } from '../interfaces';
import { Ratings } from '../entities';
import { ratingRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class RatingsController {
    public async createOne(req: IRequest, res: IResponse<Ratings>, next: NextFunction)
        : Promise<IResponse<Ratings> | undefined> {
        try {
            const rating = req.rating!;
            const ratingCreated = await ratingRepository.createOne(rating);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: ratingCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async updateOne(req: IRequest, res: IResponse<UpdateResult>, next: NextFunction)
        : Promise<IResponse<UpdateResult> | undefined> {
        try {
            const rating = req.rating!;
            const { id } = req.params!;

            const ratingUpdated = await ratingRepository.updateOne(rating, Number(id));

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: ratingUpdated!,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async deleteOne(req: IRequest, res: IResponse<DeleteResult>, next: NextFunction)
        : Promise<IResponse<DeleteResult> | undefined> {
        try {
            const { id } = req.params!;

            const ratingUpdated = await ratingRepository.deleteOne(Number(id));

            return res.status(HttpStatusEnum.NO_CONTENT).json({
                status: HttpStatusEnum.NO_CONTENT,
                data: ratingUpdated!,
                message: HttpMessageEnum.NO_CONTENT,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const ratingsController = new RatingsController();
