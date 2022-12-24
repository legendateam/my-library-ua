import { IAnalyticViews } from '../analyticViews.interface';
import { IFilesModel } from '../filesModel.interface';

export interface IAnalyticsProps {
    views: IAnalyticViews,
    files: IFilesModel,
    countUsers: number,
}
