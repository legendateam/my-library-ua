import { RoleEnum } from '../../enums';
import { ICommonResponseFields } from '../commonResponseFields.interface';

export interface IUserResponse extends ICommonResponseFields{
    nickName: string,
    password: string,
    email: string,
    avatar?: string,
    role?: RoleEnum
}
