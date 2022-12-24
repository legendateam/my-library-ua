import { ipAddressModel } from '../models';

import { IpAddress, IpAddressModel } from '../interfaces';

class IpAddressRepository {
    public async getOne({ ipAddress }: IpAddress): Promise<IpAddressModel | null> {
        return ipAddressModel.findOne({ ipAddress });
    }

    public async createOne({ ipAddress }: IpAddress): Promise<IpAddressModel> {
        return ipAddressModel.create({ ipAddress });
    }
}

export const ipAddressRepository = new IpAddressRepository();
