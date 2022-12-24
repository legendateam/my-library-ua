import { DeleteResult } from 'typeorm';

import { AppDataSource } from '../configs';
import { Favorites } from '../entities';

class FavoritesRepository {
    favoritesRepository;

    constructor() {
        this.favoritesRepository = AppDataSource.getRepository(Favorites);
    }

    public async createOne(favorite: Favorites): Promise<Favorites> {
        return this.favoritesRepository.save(favorite);
    }

    public async deleteOne(userId: number): Promise<DeleteResult> {
        return this.favoritesRepository.delete({ userId });
    }

    public async getAll(): Promise<Favorites[] | null> {
        return this.favoritesRepository.find();
    }

    public async getOneByUserId(userId: number): Promise<Favorites | null> {
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

export const favoritesRepository = new FavoritesRepository();
