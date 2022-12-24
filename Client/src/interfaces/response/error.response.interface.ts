import { HttpMessageEnum, HttpStatusEnum } from '../../enums';

export interface IResponseError {
    status: HttpStatusEnum,
    error: HttpMessageEnum,
    message: string
}
