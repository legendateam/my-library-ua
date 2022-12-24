import { IActionsUpdateQuery, IWillReadExtended } from '../interfaces';
import { Books, WillRead } from '../entities';
import { willReadRepository } from '../repositories';

class WillReadService {
    public async create({ userId, bookId }: IWillReadExtended): Promise<WillRead> {
        const willRead = new WillRead();
        willRead.userId = userId;

        const books = new Books();
        books.id = bookId;

        willRead.books = [books];

        return willReadRepository.createOne(willRead);
    }

    public async updateOne(query: IActionsUpdateQuery, userId: number, books: Books[], newBookId: number): Promise<WillRead> {
        if (query?.updateSet) {
            return this._updateSetBook(userId, books, newBookId);
        }
        return this._updateRemoveBook(userId, books, newBookId);
    }

    private async _updateSetBook(userId: number, books: Books[], newBookId: number): Promise<WillRead> {
        const willRead = new WillRead();
        willRead.userId = userId;

        const newBooks = new Books();
        newBooks.id = newBookId;

        willRead.books = [newBooks];

        books.forEach((book) => {
            const bookOld = new Books();
            bookOld.id = book.id;
            willRead.books.push(bookOld);
        });

        await willReadRepository.deleteOne(userId);
        return willReadRepository.createOne(willRead);
    }

    private async _updateRemoveBook(userId: number, books: Books[], removeBookId: number): Promise<WillRead> {
        const willRead = new WillRead();
        willRead.books = [];
        willRead.userId = userId;

        const findBook = books.find((book) => book.id === removeBookId);

        if (findBook) {
            books.forEach((book) => {
                if (book.id !== findBook.id) {
                    const bookOld = new Books();
                    bookOld.id = book.id;
                    willRead.books.push(bookOld);
                }
            });
        }

        await willReadRepository.deleteOne(userId);
        return willReadRepository.createOne(willRead);
    }
}

export const willReadService = new WillReadService();
