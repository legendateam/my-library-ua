import { Response } from 'express';
import { MessageEnum, StatusEnum } from '../enums';

type Send<ResBody = any, T = MessageEnum> = (body?: ResBody) => T;

export interface IErrorResponse extends Response{
    json: Send<
        {
            error: MessageEnum,
            status: StatusEnum,
            message: string,
        }, this
    >
}
