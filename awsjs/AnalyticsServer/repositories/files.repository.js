"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRepository = void 0;
const files_model_1 = require("../models/files.model");
class FilesRepository {
    async getOneByDate(date) {
        return files_model_1.filesModel.findOne({ createdAt: { $gte: date } });
    }
    async createOne(data) {
        return files_model_1.filesModel.create(data);
    }
    async updateOne(_id, files) {
        return files_model_1.filesModel.findOneAndUpdate(_id, files);
    }
    async getAll() {
        return files_model_1.filesModel.find();
    }
    async getAllByDate(date) {
        return files_model_1.filesModel.find({ createdAt: { $gte: date } });
    }
}
exports.filesRepository = new FilesRepository();
//# sourceMappingURL=files.repository.js.map