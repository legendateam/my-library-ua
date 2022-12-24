import { QueryWithHelpers, Types, UpdateWriteOpResult } from 'mongoose';

import { ViewsModel } from '../models';
import { IViews, IViewsModel } from '../interfaces';

class ViewsRepository {
    public async createFirstView(views: IViews): Promise<IViewsModel> {
        return ViewsModel.create(views);
    }

    public async getAll(): Promise<IViewsModel[]> {
        return ViewsModel.find();
    }

    public async getAllByDay(date: string): Promise<IViewsModel[] | null> {
        return ViewsModel.find({ createdAt: { $gte: date } });
    }

    public async getOneByDay(date: string): Promise<IViewsModel | null> {
        return ViewsModel.findOne({ createdAt: { $gte: date } });
    }

    public async updateOne(_id: Types.ObjectId, data: IViews): Promise<QueryWithHelpers<UpdateWriteOpResult, any, any, any>> {
        return ViewsModel.findOneAndUpdate(_id, data);
    }
}

export const viewsRepository = new ViewsRepository();
