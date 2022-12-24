import { Request } from 'express';

import { Users } from '../entities';
import { IpAddressModel } from './ipAddress-model.interface';
import { IViewsModel } from './views-model.interface';
import { IPayload } from './payload.interface';
import { IFilesModel } from './files.model.interface';

export interface IRequest extends Request{
    userId?: number,
    user?: Users,
    ipAddress?: IpAddressModel,
    views?: IViewsModel,
    authorization?: string,
    payload?: IPayload;
    clientKey?: string,
    downloadNumbers?: boolean,
    readNumbers?: boolean,
    files?: IFilesModel,
}
