"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alreadyReadService = void 0;
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
class AlreadyReadService {
    async create({ userId, bookId }) {
        const alreadyRead = new entities_1.AlreadyRead();
        alreadyRead.userId = userId;
        const books = new entities_1.Books();
        books.id = bookId;
        alreadyRead.books = [books];
        return repositories_1.alreadyReadRepository.createOne(alreadyRead);
    }
    async updateOne(query, userId, books, newBookId) {
        if (query?.updateSet) {
            return this._updateSetBook(userId, books, newBookId);
        }
        return this._updateRemoveBook(userId, books, newBookId);
    }
    async _updateSetBook(userId, books, newBookId) {
        const alreadyRead = new entities_1.AlreadyRead();
        alreadyRead.userId = userId;
        const newBooks = new entities_1.Books();
        newBooks.id = newBookId;
        alreadyRead.books = [newBooks];
        books.forEach((book) => {
            const bookOld = new entities_1.Books();
            bookOld.id = book.id;
            alreadyRead.books.push(bookOld);
        });
        await repositories_1.alreadyReadRepository.deleteOne(userId);
        return repositories_1.alreadyReadRepository.createOne(alreadyRead);
    }
    async _updateRemoveBook(userId, books, removeBookId) {
        const alreadyRead = new entities_1.AlreadyRead();
        alreadyRead.books = [];
        alreadyRead.userId = userId;
        const findBook = books.find((book) => book.id === removeBookId);
        if (findBook) {
            books.forEach((book) => {
                if (book.id !== findBook.id) {
                    const bookOld = new entities_1.Books();
                    bookOld.id = book.id;
                    alreadyRead.books.push(bookOld);
                }
            });
        }
        await repositories_1.alreadyReadRepository.deleteOne(userId);
        return repositories_1.alreadyReadRepository.createOne(alreadyRead);
    }
}
exports.alreadyReadService = new AlreadyReadService();
//# sourceMappingURL=already-read.service.js.map