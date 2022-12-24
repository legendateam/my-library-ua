"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class RatingRepository {
    constructor() {
        this.ratingRepository = configs_1.AppDataSource.getRepository(entities_1.Ratings);
    }
    async createOne(rating) {
        return this.ratingRepository.save(rating);
    }
    async getOneByUserIdAndBookId({ bookId, userId }) {
        return this.ratingRepository.findOne({
            where: {
                bookId,
                userId,
            },
        });
    }
    async getOneById(id) {
        return this.ratingRepository.findOneBy({ id });
    }
    async updateOne({ rate }, id) {
        return this.ratingRepository.update({ id }, { rate });
    }
    async deleteOne(id) {
        return this.ratingRepository.delete({ id });
    }
}
exports.ratingRepository = new RatingRepository();
//# sourceMappingURL=rating.repository.js.map