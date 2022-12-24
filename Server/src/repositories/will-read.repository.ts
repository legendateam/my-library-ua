import { DeleteResult } from 'typeorm';

import { AppDataSource } from '../configs';
import { WillRead } from '../entities';

class WillReadRepository {
    willReadRepository;

    constructor() {
        this.willReadRepository = AppDataSource.getRepository(WillRead);
    }

    public async createOne(willRead: WillRead): Promise<WillRead> {
        return this.willReadRepository.save(willRead);
    }

    public async deleteOne(userId: number): Promise<DeleteResult> {
        return this.willReadRepository.delete({ userId });
    }

    public async getAll(): Promise<WillRead[] | null> {
        return this.willReadRepository.find();
    }

    public async getOneByUserId(userId: number): Promise<WillRead | null> {
        return this.willReadRepository.createQueryBuilder('WillRead')
            .leftJoinAndSelect('WillRead.books', 'books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('comments.user', 'user')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .where('WillRead.userId = :userId', { userId })
            .getOne();
    }
}

export const willReadRepository = new WillReadRepository();
