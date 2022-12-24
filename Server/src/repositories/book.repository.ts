import { DeleteResult, UpdateResult } from 'typeorm';

import { AppDataSource } from '../configs';
import { Books } from '../entities';

class BookRepository {
    bookRepository;

    constructor() {
        this.bookRepository = AppDataSource.getRepository(Books);
    }

    public async createOne(book: Books): Promise<Books> {
        return this.bookRepository.save(book);
    }

    public async updateOne(id: number, updateFields: Partial<Books>): Promise<Books | UpdateResult> {
        return this.bookRepository.update({ id }, { ...updateFields });
    }

    public async getAll(): Promise<Books[]> {
        return this.bookRepository.createQueryBuilder('books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .getMany();
    }

    public async getAllWithPagination(skip: number, take: number): Promise<[Books[], number]> {
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

    public async getAllRatingsWithPagination(rate: number, skip: number, take: number): Promise<[Books[], number]> {
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

    public async getTopRatings(rate: number, perPage: number): Promise<[Books[], number]> {
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

    public async getLatest(take: number): Promise<Books[]> {
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

    public async getAllNoveltyWithPagination(startDate: string, skip: number, take: number): Promise<[Books[], number]> {
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

    public async getAllGenreWithPagination(genre: string, skip: number, take: number): Promise<[Books[], number]> {
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

    public async getOneById(id: number): Promise<Books | null> {
        return this.bookRepository.createQueryBuilder('book')
            .where('book.id = :id', { id })
            .leftJoinAndSelect('book.genres', 'genres')
            .leftJoinAndSelect('book.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('book.ratings', 'ratings')
            .leftJoinAndSelect('book.author', 'author')
            .getOne();
    }

    public async getOneByDescription(description: string): Promise<Books | null> {
        return this.bookRepository.findOneBy({ description });
    }

    public async getAllLikeByNameOrDescription(data: string): Promise<[Books[], number]> {
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

    public async deleteOne(id: number): Promise<DeleteResult> {
        return this.bookRepository.delete({ id });
    }
}

export const bookRepository = new BookRepository();
