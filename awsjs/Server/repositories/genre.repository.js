"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class GenreRepository {
    constructor() {
        this.genreRepository = configs_1.AppDataSource.getRepository(entities_1.Genres);
    }
    async createOne(genre) {
        return this.genreRepository.save(genre);
    }
    async getAll() {
        return this.genreRepository.createQueryBuilder('genres')
            .getMany();
    }
    async getOneById(id) {
        return this.genreRepository.createQueryBuilder('genres')
            .where('genres.id = :id', { id })
            .getOne();
    }
    async getOneByName(name) {
        return this.genreRepository.createQueryBuilder('genres')
            .where('genres.name = :name', { name })
            .getOne();
    }
    async removeByName(name) {
        return this.genreRepository.delete({ name });
    }
}
exports.genreRepository = new GenreRepository();
//# sourceMappingURL=genre.repository.js.map