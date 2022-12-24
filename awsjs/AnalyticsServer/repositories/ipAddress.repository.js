"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipAddressRepository = void 0;
const models_1 = require("../models");
class IpAddressRepository {
    async getOne({ ipAddress }) {
        return models_1.ipAddressModel.findOne({ ipAddress });
    }
    async createOne({ ipAddress }) {
        return models_1.ipAddressModel.create({ ipAddress });
    }
}
exports.ipAddressRepository = new IpAddressRepository();
//# sourceMappingURL=ipAddress.repository.js.map