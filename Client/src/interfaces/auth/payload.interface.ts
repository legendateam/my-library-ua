import { RoleEnum } from '../../enums';

export interface IPayload {
    nickName?: string,
    role?: RoleEnum | string,
    id?: number,
    avatar?: string
    email?: string
}
