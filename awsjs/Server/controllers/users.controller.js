"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const repositories_1 = require("../repositories");
const enums_1 = require("../enums");
const services_1 = require("../services");
const email_service_1 = require("../services/email.service");
const configs_1 = require("../configs");
class UsersController {
    async getAll(_, res, next) {
        try {
            const users = await repositories_1.userRepository.getAll();
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: users,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async updateOne(req, res, next) {
        try {
            const userDB = req.userData;
            const userDataForUpdate = req.body;
            let passwordHashed = '';
            if (userDataForUpdate?.password) {
                passwordHashed = await services_1.bcryptService.hash(userDataForUpdate.password);
            }
            const dataNormalizer = { ...userDataForUpdate, password: passwordHashed };
            const userUpdate = Object.assign(passwordHashed ? dataNormalizer : userDataForUpdate);
            delete userUpdate.currentPassword;
            delete userUpdate.clientKey;
            if (req.file) {
                const avatarSaved = await services_1.s3Service.uploadFile(req.file, userDB.id, enums_1.FileEnum.PHOTOS, enums_1.ItemTypeFileEnum.USERS);
                if (userDB.avatar) {
                    await services_1.s3Service.deleteFile(userDB.avatar);
                }
                const pathFile = avatarSaved.Location.split(configs_1.mainConfig.CLOUD_DOMAIN_NAME)[1];
                await repositories_1.userRepository.updateData(userDB.id, { ...userUpdate, avatar: pathFile });
                await email_service_1.emailService.sendEmail(userUpdate?.email ?? userDB.email, enums_1.EmailEnum.UPDATE_USER_DATA, {
                    nickName: userUpdate?.nickName ?? userDB.nickName,
                });
                const user = await services_1.userService.getOneById(userDB.id);
                const tokenPair = await services_1.authService.login({
                    id: user?.id,
                    email: user?.email,
                    avatar: user?.avatar,
                    role: user?.role,
                    nickName: user?.nickName,
                });
                if (tokenPair) {
                    return res.status(enums_1.HttpStatusEnum.OK).json({
                        status: enums_1.HttpStatusEnum.OK,
                        data: tokenPair,
                        message: enums_1.HttpMessageEnum.OK,
                    });
                }
            }
            await repositories_1.userRepository.updateData(userDB.id, userUpdate);
            await email_service_1.emailService.sendEmail(userUpdate?.email ?? userDB.email, enums_1.EmailEnum.UPDATE_USER_DATA, {
                nickName: userUpdate?.nickName ?? userDB.nickName,
            });
            const user = await services_1.userService.getOneById(userDB.id);
            const tokenPair = await services_1.authService.login({
                id: user?.id,
                email: user?.email,
                avatar: user?.avatar,
                role: user?.role,
                nickName: user?.nickName,
            });
            if (tokenPair) {
                return res.status(enums_1.HttpStatusEnum.OK).json({
                    status: enums_1.HttpStatusEnum.OK,
                    data: tokenPair,
                    message: enums_1.HttpMessageEnum.OK,
                });
            }
        }
        catch (e) {
            next(e);
        }
    }
}
exports.usersController = new UsersController();
//# sourceMappingURL=users.controller.js.map