"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.willReadService = void 0;
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
class WillReadService {
    async create({ userId, bookId }) {
        const willRead = new entities_1.WillRead();
        willRead.userId = userId;
        const books = new entities_1.Books();
        books.id = bookId;
        willRead.books = [books];
        return repositories_1.willReadRepository.createOne(willRead);
    }
    async updateOne(query, userId, books, newBookId) {
        if (query?.updateSet) {
            return this._updateSetBook(userId, books, newBookId);
        }
        return this._updateRemoveBook(userId, books, newBookId);
    }
    async _updateSetBook(userId, books, newBookId) {
        const willRead = new entities_1.WillRead();
        willRead.userId = userId;
        const newBooks = new entities_1.Books();
        newBooks.id = newBookId;
        willRead.books = [newBooks];
        books.forEach((book) => {
            const bookOld = new entities_1.Books();
            bookOld.id = book.id;
            willRead.books.push(bookOld);
        });
        await repositories_1.willReadRepository.deleteOne(userId);
        return repositories_1.willReadRepository.createOne(willRead);
    }
    async _updateRemoveBook(userId, books, removeBookId) {
        const willRead = new entities_1.WillRead();
        willRead.books = [];
        willRead.userId = userId;
        const findBook = books.find((book) => book.id === removeBookId);
        if (findBook) {
            books.forEach((book) => {
                if (book.id !== findBook.id) {
                    const bookOld = new entities_1.Books();
                    bookOld.id = book.id;
                    willRead.books.push(bookOld);
                }
            });
        }
        await repositories_1.willReadRepository.deleteOne(userId);
        return repositories_1.willReadRepository.createOne(willRead);
    }
}
exports.willReadService = new WillReadService();
//# sourceMappingURL=will-read.service.js.map