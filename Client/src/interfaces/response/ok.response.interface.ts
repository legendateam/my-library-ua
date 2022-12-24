import { HttpMessageEnum, HttpStatusEnum } from '../../enums';

export interface IResponseOK<T>{
    status: HttpStatusEnum
    data: T,
    message: HttpMessageEnum
}
