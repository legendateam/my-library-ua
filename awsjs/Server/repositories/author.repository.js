"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorRepository = void 0;
const configs_1 = require("../configs");
const entities_1 = require("../entities");
class AuthorRepository {
    constructor() {
        this.authorRepository = configs_1.AppDataSource.getRepository(entities_1.Authors);
    }
    async createOne(author) {
        return this.authorRepository.save(author);
    }
    async updateOne(id, newDataInFields) {
        return this.authorRepository.update({ id }, { ...newDataInFields });
    }
    async getOneById(id) {
        return this.authorRepository.createQueryBuilder('author')
            .where('author.id = :id', { id })
            .leftJoinAndSelect('author.books', 'books')
            .leftJoinAndSelect('books.genres', 'booksGenres')
            .leftJoinAndSelect('books.comments', 'booksComments')
            .leftJoinAndSelect('booksComments.user', 'user')
            .leftJoinAndSelect('books.ratings', 'booksRatings')
            .leftJoinAndSelect('author.genres', 'genres')
            .getOne();
    }
    async getAll() {
        return this.authorRepository.createQueryBuilder('authors')
            .getMany();
    }
    async getOneByPseudonym(pseudonym) {
        return this.authorRepository.findOneBy({ pseudonym });
    }
    async getAllWithPagination(skip, take) {
        return this.authorRepository.createQueryBuilder('authors')
            .leftJoinAndSelect('authors.books', 'books')
            .leftJoinAndSelect('books.genres', 'booksGenres')
            .leftJoinAndSelect('books.comments', 'booksComments')
            .leftJoinAndSelect('booksComments.user', 'user')
            .leftJoinAndSelect('books.ratings', 'booksRatings')
            .leftJoinAndSelect('authors.genres', 'genres')
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
    async getAllByLikeFullName(fullname) {
        return this.authorRepository.createQueryBuilder('authors')
            .where("authors.firstName ilike '%' || :firstName || '%' ", { firstName: fullname })
            .orWhere("authors.lastName ilike '%' || :lastName || '%' ", { lastName: fullname })
            .leftJoinAndSelect('authors.books', 'books')
            .leftJoinAndSelect('books.genres', 'booksGenres')
            .leftJoinAndSelect('books.comments', 'booksComments')
            .leftJoinAndSelect('booksComments.user', 'user')
            .leftJoinAndSelect('books.ratings', 'booksRatings')
            .leftJoinAndSelect('authors.genres', 'genres')
            .getManyAndCount();
    }
    async removeById(id) {
        return this.authorRepository.delete({ id });
    }
}
exports.authorRepository = new AuthorRepository();
//# sourceMappingURL=author.repository.js.map