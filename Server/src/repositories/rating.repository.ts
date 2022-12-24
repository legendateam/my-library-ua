import { DeleteResult, UpdateResult } from 'typeorm';

import { AppDataSource } from '../configs';
import { Ratings } from '../entities';
import { IRating, IRatingFind } from '../interfaces';

class RatingRepository {
    ratingRepository;

    constructor() {
        this.ratingRepository = AppDataSource.getRepository(Ratings);
    }

    public async createOne(rating: IRating): Promise<Ratings> {
        return this.ratingRepository.save(rating);
    }

    public async getOneByUserIdAndBookId({ bookId, userId }: IRatingFind): Promise<Ratings | null> {
        return this.ratingRepository.findOne({
            where: {
                bookId,
                userId,
            },
        });
    }

    public async getOneById(id: number): Promise<Ratings | null> {
        return this.ratingRepository.findOneBy({ id });
    }

    public async updateOne({ rate }: IRating, id: number): Promise<UpdateResult | null> {
        return this.ratingRepository.update({ id }, { rate });
    }

    public async deleteOne(id: number): Promise<DeleteResult> {
        return this.ratingRepository.delete({ id });
    }
}

export const ratingRepository = new RatingRepository();
