"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRepository = void 0;
const models_1 = require("../models");
class ViewsRepository {
    async createFirstView(views) {
        return models_1.ViewsModel.create(views);
    }
    async getAll() {
        return models_1.ViewsModel.find();
    }
    async getAllByDay(date) {
        return models_1.ViewsModel.find({ createdAt: { $gte: date } });
    }
    async getOneByDay(date) {
        return models_1.ViewsModel.findOne({ createdAt: { $gte: date } });
    }
    async updateOne(_id, data) {
        return models_1.ViewsModel.findOneAndUpdate(_id, data);
    }
}
exports.viewsRepository = new ViewsRepository();
//# sourceMappingURL=views.repository.js.map