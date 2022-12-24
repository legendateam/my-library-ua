import { Genres } from '../entities';

export const genresRelationsService = (genresId: number[] | number): Genres[] | undefined => {
    const genres = [] as Genres[];

    if (typeof genresId === 'object') {
        genresId.forEach((genreId) => {
            const genre = new Genres();
            genre.id = genreId;

            genres.push(genre);
        });
        return genres;
    }

    const genre = new Genres();
    genre.id = genresId;

    genres.push(genre);
    return genres;
};
