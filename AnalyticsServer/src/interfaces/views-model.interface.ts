import { ICommonFields } from './common-fields.interface';

export interface IViewsModel extends ICommonFields {
    auth_views: number,
    unique_views:number,
    views: number
}
