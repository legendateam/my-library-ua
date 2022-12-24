"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class FavoritesRepository {
    constructor() {
        this.favoritesRepository = configs_1.AppDataSource.getRepository(entities_1.Favorites);
    }
    async createOne(favorite) {
        return this.favoritesRepository.save(favorite);
    }
    async deleteOne(userId) {
        return this.favoritesRepository.delete({ userId });
    }
    async getAll() {
        return this.favoritesRepository.find();
    }
    async getOneByUserId(userId) {
        return this.favoritesRepository.createQueryBuilder('favorites')
            .leftJoinAndSelect('favorites.books', 'books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .where('favorites.userId = :userId', { userId })
            .getOne();
    }
}
exports.favoritesRepository = new FavoritesRepository();
//# sourceMappingURL=favorites.repository.js.map