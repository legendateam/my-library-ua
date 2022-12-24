import { RoleEnum } from '../enums';

export interface IUser {
    nickName: string,
    password: string,
    email: string,
    role?: RoleEnum
}
