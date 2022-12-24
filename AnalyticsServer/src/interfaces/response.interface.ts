import { Response } from 'express';

import { MessageEnum, StatusEnum } from '../enums';

type Send<ResBody = any, T = MessageEnum> = (body?: ResBody) => T;

export interface IResponse<T> extends Response{
    json: Send<{
            data: T,
            status: StatusEnum,
            message: string,
        }, this>
}
