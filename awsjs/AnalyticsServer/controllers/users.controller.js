"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const repositories_1 = require("../repositories");
const enums_1 = require("../enums");
class UsersController {
    async getNewUsersByDate(req, res, next) {
        try {
            const { date } = req.params;
            const countUsers = await repositories_1.userRepository.getCountNewUsers(date);
            return res.status(enums_1.StatusEnum.OK).json({
                message: enums_1.MessageEnum.OK,
                data: countUsers,
                status: enums_1.StatusEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async getAllCount(_, res, next) {
        try {
            const countUsers = await repositories_1.userRepository.getAllCount();
            return res.status(enums_1.StatusEnum.OK).json({
                message: enums_1.MessageEnum.OK,
                data: countUsers,
                status: enums_1.StatusEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.usersController = new UsersController();
//# sourceMappingURL=users.controller.js.map