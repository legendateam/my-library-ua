import bcrypt from 'bcrypt';

import { mainConfig } from '../configs';

class BcryptService {
    public async hash(data: string): Promise<string> {
        return bcrypt.hash(data, Number(mainConfig.PASSWORD_SALT_ROUNDS));
    }

    public async compare(password: string, passwordFromDB: string): Promise<boolean> {
        return bcrypt.compare(password, passwordFromDB);
    }
}

export const bcryptService = new BcryptService();
