"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientService = void 0;
const redis_1 = require("redis");
const uuid_1 = require("uuid");
const enums_1 = require("../enums");
const configs_1 = require("../configs");
class ClientService {
    constructor() {
        this.client = (0, redis_1.createClient)({ socket: { connectTimeout: 40000 }, url: configs_1.mainConfig.REDIS_URL });
        (async () => {
            await this.client.connect().catch((e) => console.error(e));
        })();
    }
    async get(key) {
        return this.client.get(key);
    }
    async set(key, data) {
        return this.client.set(key, data);
    }
    async setExpire(key, expireTime, value) {
        return this.client.setEx(key, expireTime, value);
    }
    async delete(key) {
        return this.client.del(key);
    }
    async getAnyKeysByNickName(nickName, type) {
        return this.client.keys(`*${type}:${nickName}*`);
    }
    async getKey(key) {
        return this.client.keys(key);
    }
    generateKey(nickName, type, additionalKey) {
        let clientKey = '';
        if (type === enums_1.ClientKeyEnum.ACTIONS_LIKES) {
            clientKey = `${enums_1.ClientKeyEnum.ACTIONS_LIKES}:${additionalKey}:${nickName}`;
        }
        if (type === enums_1.ClientKeyEnum.FORGOT) {
            clientKey = `${enums_1.ClientKeyEnum.FORGOT}:${nickName}:${(0, uuid_1.v4)()}`;
        }
        if (type === enums_1.ClientKeyEnum.AUTH_TOKENS) {
            clientKey = `${enums_1.ClientKeyEnum.AUTH_TOKENS}:${nickName}:${(0, uuid_1.v4)()}`;
        }
        if (type === enums_1.ClientKeyEnum.VIEWS_COUNT_BOOK) {
            const bookId = nickName;
            clientKey = `${enums_1.ClientKeyEnum.VIEWS_COUNT_BOOK}:${bookId}`;
        }
        return clientKey;
    }
}
exports.clientService = new ClientService();
//# sourceMappingURL=client.service.js.map