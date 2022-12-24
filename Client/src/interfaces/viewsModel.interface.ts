import { IAnalyticViews } from './analyticViews.interface';

export interface IViewsModel extends IAnalyticViews {
    _id: string,
    createdAt: string,
}
