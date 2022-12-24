import { DeleteResult } from 'typeorm';

import { AppDataSource } from '../configs';
import { AlreadyRead } from '../entities';

class AlreadyReadRepository {
    alreadyReadRepository;

    constructor() {
        this.alreadyReadRepository = AppDataSource.getRepository(AlreadyRead);
    }

    public async createOne(AlreadyRead: AlreadyRead): Promise<AlreadyRead> {
        return this.alreadyReadRepository.save(AlreadyRead);
    }

    public async deleteOne(userId: number): Promise<DeleteResult> {
        return this.alreadyReadRepository.delete({ userId });
    }

    public async getAll(): Promise<AlreadyRead[] | null> {
        return this.alreadyReadRepository.find();
    }

    public async getOneByUserId(userId: number): Promise<AlreadyRead | null> {
        return this.alreadyReadRepository.createQueryBuilder('alreadyRead')
            .leftJoinAndSelect('alreadyRead.books', 'books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .where('alreadyRead.userId = :userId', { userId })
            .getOne();
    }
}

export const alreadyReadRepository = new AlreadyReadRepository();
