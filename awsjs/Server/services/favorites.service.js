"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesService = void 0;
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
class FavoritesService {
    async create({ userId, bookId }) {
        const favorites = new entities_1.Favorites();
        favorites.userId = userId;
        const books = new entities_1.Books();
        books.id = bookId;
        favorites.books = [books];
        return repositories_1.favoritesRepository.createOne(favorites);
    }
    async updateOne(query, userId, books, newBookId) {
        if (query?.updateSet) {
            return this._updateSetBook(userId, books, newBookId);
        }
        return this._updateRemoveBook(userId, books, newBookId);
    }
    async _updateSetBook(userId, books, newBookId) {
        const favorites = new entities_1.Favorites();
        favorites.userId = userId;
        const newBooks = new entities_1.Books();
        newBooks.id = newBookId;
        favorites.books = [newBooks];
        books.forEach((book) => {
            const bookOld = new entities_1.Books();
            bookOld.id = book.id;
            favorites.books.push(bookOld);
        });
        await repositories_1.favoritesRepository.deleteOne(userId);
        return repositories_1.favoritesRepository.createOne(favorites);
    }
    async _updateRemoveBook(userId, books, removeBookId) {
        const favorites = new entities_1.Favorites();
        favorites.books = [];
        favorites.userId = userId;
        const findBook = books.find((book) => book.id === removeBookId);
        if (findBook) {
            books.forEach((book) => {
                if (book.id !== findBook.id) {
                    const bookOld = new entities_1.Books();
                    bookOld.id = book.id;
                    favorites.books.push(bookOld);
                }
            });
        }
        await repositories_1.favoritesRepository.deleteOne(userId);
        return repositories_1.favoritesRepository.createOne(favorites);
    }
}
exports.favoritesService = new FavoritesService();
//# sourceMappingURL=favorites.service.js.map