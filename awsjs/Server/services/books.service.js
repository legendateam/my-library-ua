"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
const genresRelations_service_1 = require("./genresRelations.service");
class BooksService {
    async isBooksExists(description) {
        if (description) {
            return repositories_1.bookRepository.getOneByDescription(description);
        }
        return undefined;
    }
    async createWithRelationsByGenres({ book, genresId }) {
        const newBook = new entities_1.Books();
        newBook.description = book.description;
        newBook.name = book.name;
        newBook.authorId = book.authorId;
        if (book?.yearOfRelease)
            newBook.yearOfRelease = book.yearOfRelease;
        if (book?.cover)
            newBook.cover = book.cover;
        const genres = (0, genresRelations_service_1.genresRelationsService)(genresId);
        if (genres)
            newBook.genres = genres;
        return repositories_1.bookRepository.createOne(newBook);
    }
    async patchingFields({ id, newFields }) {
        const bookForPatching = new entities_1.Books();
        if (newFields?.fileText)
            bookForPatching.fileText = newFields.fileText;
        if (newFields?.fileAudio)
            bookForPatching.fileAudio = newFields.fileAudio;
        if (newFields?.cover)
            bookForPatching.cover = newFields.cover;
        if (newFields?.yearOfRelease)
            bookForPatching.yearOfRelease = newFields.yearOfRelease;
        if (newFields.genres) {
            const genres = (0, genresRelations_service_1.genresRelationsService)(newFields.genres);
            if (genres) {
                bookForPatching.genres = genres;
                return repositories_1.bookRepository.updateOne(id, { ...bookForPatching });
            }
        }
        return repositories_1.bookRepository.updateOne(id, { ...bookForPatching });
    }
}
exports.bookService = new BooksService();
//# sourceMappingURL=books.service.js.map