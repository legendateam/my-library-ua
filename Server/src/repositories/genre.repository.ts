import { DeleteResult } from 'typeorm';

import { AppDataSource } from '../configs';
import { Genres } from '../entities';
import { IGenre } from '../interfaces';

class GenreRepository {
    genreRepository;

    constructor() {
        this.genreRepository = AppDataSource.getRepository(Genres);
    }

    public async createOne(genre: IGenre): Promise<Genres> {
        return this.genreRepository.save(genre);
    }

    public async getAll(): Promise<Genres[]> {
        return this.genreRepository.createQueryBuilder('genres')
            .getMany();
    }

    public async getOneById(id: number): Promise<Genres | null> {
        return this.genreRepository.createQueryBuilder('genres')
            .where('genres.id = :id', { id })
            .getOne();
    }

    public async getOneByName(name: string): Promise<Genres | null> {
        return this.genreRepository.createQueryBuilder('genres')
            .where('genres.name = :name', { name })
            .getOne();
    }

    public async removeByName(name: string): Promise<DeleteResult> {
        return this.genreRepository.delete({ name });
    }
}

export const genreRepository = new GenreRepository();
