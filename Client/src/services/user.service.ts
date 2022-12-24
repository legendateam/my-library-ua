import { mainConfig } from '../configs';
import {
    IResponseOK, ITokenPair, IUpdateUser,
} from '../interfaces';
import { axiosInstance } from './axiosInstance.service';
import { urls } from '../constants';

class UserService {
    public avatarNormalize(avatar: string): string {
        if (avatar) {
            if (avatar.includes('google')) {
                return avatar;
            }

            if (!avatar.includes('google')) {
                return `${mainConfig.CLOUD_DOMAIN_NAME}${avatar}`;
            }
        }
        return null;
    }

    public async updateData(data: IUpdateUser | FormData, accessToken: string)
        : Promise<IResponseOK<ITokenPair>> {
        return axiosInstance.patch(`${urls.users}${urls.update}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then(({ data }) => data);
    }
}

export const userService = new UserService();
