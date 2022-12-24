import { DeleteResult, UpdateResult } from 'typeorm';

import { AppDataSource } from '../configs';
import { Authors } from '../entities';

class AuthorRepository {
    authorRepository;

    constructor() {
        this.authorRepository = AppDataSource.getRepository(Authors);
    }

    public async createOne(author: Authors): Promise<Authors> {
        return this.authorRepository.save(author);
    }

    public async updateOne(id: number, newDataInFields: Partial<Authors>): Promise<Authors | UpdateResult> {
        return this.authorRepository.update({ id }, { ...newDataInFields });
    }

    public async getOneById(id: number): Promise<Authors | null> {
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

    public async getAll(): Promise<Authors[]> {
        return this.authorRepository.createQueryBuilder('authors')
            .getMany();
    }

    public async getOneByPseudonym(pseudonym: string): Promise<Authors | null> {
        return this.authorRepository.findOneBy({ pseudonym });
    }

    public async getAllWithPagination(skip: number, take: number): Promise<[Authors[], number]> {
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

    public async getAllByLikeFullName(fullname: string): Promise<[Authors[], number]> {
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

    public async removeById(id: number): Promise<DeleteResult> {
        return this.authorRepository.delete({ id });
    }
}

export const authorRepository = new AuthorRepository();
