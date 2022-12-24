"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingsController = void 0;
const repositories_1 = require("../repositories");
const enums_1 = require("../enums");
class RatingsController {
    async createOne(req, res, next) {
        try {
            const rating = req.rating;
            const ratingCreated = await repositories_1.ratingRepository.createOne(rating);
            return res.status(enums_1.HttpStatusEnum.CREATED).json({
                status: enums_1.HttpStatusEnum.CREATED,
                data: ratingCreated,
                message: enums_1.HttpMessageEnum.CREATED,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async updateOne(req, res, next) {
        try {
            const rating = req.rating;
            const { id } = req.params;
            const ratingUpdated = await repositories_1.ratingRepository.updateOne(rating, Number(id));
            return res.status(enums_1.HttpStatusEnum.OK).json({
                status: enums_1.HttpStatusEnum.OK,
                data: ratingUpdated,
                message: enums_1.HttpMessageEnum.OK,
            });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const ratingUpdated = await repositories_1.ratingRepository.deleteOne(Number(id));
            return res.status(enums_1.HttpStatusEnum.NO_CONTENT).json({
                status: enums_1.HttpStatusEnum.NO_CONTENT,
                data: ratingUpdated,
                message: enums_1.HttpMessageEnum.NO_CONTENT,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.ratingsController = new RatingsController();
//# sourceMappingURL=ratings.conrtoller.js.map