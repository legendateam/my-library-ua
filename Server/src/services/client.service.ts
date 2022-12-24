import { createClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

import { ClientKeyEnum } from '../enums';

class ClientService {
    client;

    constructor() {
        this.client = createClient({ socket: { connectTimeout: 20000 } });
        (async () => {
            await this.client.connect().catch((e) => console.error(e));
        })();
    }

    public async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    public async set(key: string, data: string): Promise<string | null> {
        return this.client.set(key, data);
    }

    public async setExpire(key: string, expireTime: number, value: string): Promise<string | null> {
        return this.client.setEx(key, expireTime, value);
    }

    public async delete(key: string): Promise<number> {
        return this.client.del(key);
    }

    public async getAnyKeysByNickName(nickName: string, type: ClientKeyEnum): Promise<string[]> {
        return this.client.keys(`*${type}:${nickName}*`);
    }

    public async getKey(key: string): Promise<string[]> {
        return this.client.keys(key);
    }

    public generateKey(nickName: string, type: ClientKeyEnum, additionalKey?: string): string {
        let clientKey = '';

        if (type === ClientKeyEnum.ACTIONS_LIKES) {
            clientKey = `${ClientKeyEnum.ACTIONS_LIKES}:${additionalKey}:${nickName}`;
        }

        if (type === ClientKeyEnum.FORGOT) {
            clientKey = `${ClientKeyEnum.FORGOT}:${nickName}:${uuidv4()}`;
        }

        if (type === ClientKeyEnum.AUTH_TOKENS) {
            clientKey = `${ClientKeyEnum.AUTH_TOKENS}:${nickName}:${uuidv4()}`;
        }

        if (type === ClientKeyEnum.VIEWS_COUNT_BOOK) {
            const bookId = nickName;
            clientKey = `${ClientKeyEnum.VIEWS_COUNT_BOOK}:${bookId}`;
        }

        return clientKey;
    }
}
export const clientService = new ClientService();
