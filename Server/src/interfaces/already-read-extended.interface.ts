import { IAlreadyRead } from './already-read.interface';

export interface IAlreadyReadExtended extends IAlreadyRead{
    userId: number,
}
