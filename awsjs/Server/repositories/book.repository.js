"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class BookRepository {
    constructor() {
        this.bookRepository = configs_1.AppDataSource.getRepository(entities_1.Books);
    }
    async createOne(book) {
        return this.bookRepository.save(book);
    }
    async updateOne(id, updateFields) {
        return this.bookRepository.update({ id }, { ...updateFields });
    }
    async getAll() {
        return this.bookRepository.createQueryBuilder('books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .getMany();
    }
    async getAllWithPagination(skip, take) {
        return this.bookRepository.createQueryBuilder('books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getAllRatingsWithPagination(rate, skip, take) {
        return this.bookRepository.createQueryBuilder('books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .where('ratings.rate > :rate', { rate })
            .orderBy('ratings.rate', 'DESC')
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getTopRatings(rate, perPage) {
        return this.bookRepository.createQueryBuilder('books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .loadRelationCountAndMap('books.countRatings', 'books.ratings', 'countRatings')
            .where('ratings.rate > :rate', { rate })
            .orderBy('ratings.rate', 'DESC')
            .take(perPage)
            .getManyAndCount();
    }
    async getLatest(take) {
        return this.bookRepository.createQueryBuilder('books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .orderBy('books.createdAt', 'DESC')
            .take(take)
            .getMany();
    }
    async getAllNoveltyWithPagination(startDate, skip, take) {
        return this.bookRepository.createQueryBuilder('books')
            .where('books.createdAt > :startDate', { startDate })
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getAllGenreWithPagination(genre, skip, take) {
        return this.bookRepository.createQueryBuilder('books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .where('genres.name = :genre', { genre })
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getOneById(id) {
        return this.bookRepository.createQueryBuilder('book')
            .where('book.id = :id', { id })
            .leftJoinAndSelect('book.genres', 'genres')
            .leftJoinAndSelect('book.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('book.ratings', 'ratings')
            .leftJoinAndSelect('book.author', 'author')
            .getOne();
    }
    async getOneByDescription(description) {
        return this.bookRepository.findOneBy({ description });
    }
    async getAllLikeByNameOrDescription(data) {
        return this.bookRepository.createQueryBuilder('book')
            .where("book.name ilike '%' || :name || '%'", { name: data })
            .orWhere("book.description ilike '%' || :description || '%'", { description: data })
            .leftJoinAndSelect('book.genres', 'genres')
            .leftJoinAndSelect('book.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('book.ratings', 'ratings')
            .leftJoinAndSelect('book.author', 'author')
            .getManyAndCount();
    }
    async deleteOne(id) {
        return this.bookRepository.delete({ id });
    }
}
exports.bookRepository = new BookRepository();
//# sourceMappingURL=book.repository.js.map