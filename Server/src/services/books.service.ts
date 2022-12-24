import { UpdateResult } from 'typeorm';

import { Books } from '../entities';
import { bookRepository } from '../repositories';
import { IBookCreate, IBookPatch } from '../interfaces';
import { genresRelationsService } from './genresRelations.service';

class BooksService {
    public async isBooksExists(description: string | undefined): Promise<Books | null | undefined> {
        if (description) {
            return bookRepository.getOneByDescription(description);
        }
        return undefined;
    }

    public async createWithRelationsByGenres({ book, genresId }: IBookCreate): Promise<Books> {
        const newBook = new Books();

        newBook.description = book.description;
        newBook.name = book.name;
        newBook.authorId = book.authorId;

        if (book?.yearOfRelease) newBook.yearOfRelease = book.yearOfRelease;
        if (book?.cover) newBook.cover = book.cover;

        const genres = genresRelationsService(genresId);

        if (genres) newBook.genres = genres;

        return bookRepository.createOne(newBook);
    }

    public async patchingFields({ id, newFields }: IBookPatch): Promise<Books | UpdateResult | undefined> {
        const bookForPatching = new Books();

        if (newFields?.fileText) bookForPatching.fileText = newFields.fileText;
        if (newFields?.fileAudio) bookForPatching.fileAudio = newFields.fileAudio;
        if (newFields?.cover) bookForPatching.cover = newFields.cover;
        if (newFields?.yearOfRelease) bookForPatching.yearOfRelease = newFields.yearOfRelease;

        if (newFields.genres) {
            const genres = genresRelationsService(newFields.genres);

            if (genres) {
                bookForPatching.genres = genres;

                return bookRepository.updateOne(id, { ...bookForPatching });
            }
        }

        return bookRepository.updateOne(id, { ...bookForPatching });
    }
}
export const bookService = new BooksService();
