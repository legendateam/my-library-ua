import { IActionsUpdateQuery, IAlreadyReadExtended } from '../interfaces';
import { AlreadyRead, Books } from '../entities';
import { alreadyReadRepository } from '../repositories';

class AlreadyReadService {
    public async create({ userId, bookId }: IAlreadyReadExtended): Promise<AlreadyRead> {
        const alreadyRead = new AlreadyRead();
        alreadyRead.userId = userId;

        const books = new Books();
        books.id = bookId;

        alreadyRead.books = [books];

        return alreadyReadRepository.createOne(alreadyRead);
    }

    public async updateOne(query: IActionsUpdateQuery, userId: number, books: Books[], newBookId: number): Promise<AlreadyRead> {
        if (query?.updateSet) {
            return this._updateSetBook(userId, books, newBookId);
        }
        return this._updateRemoveBook(userId, books, newBookId);
    }

    private async _updateSetBook(userId: number, books: Books[], newBookId: number): Promise<AlreadyRead> {
        const alreadyRead = new AlreadyRead();
        alreadyRead.userId = userId;

        const newBooks = new Books();
        newBooks.id = newBookId;

        alreadyRead.books = [newBooks];

        books.forEach((book) => {
            const bookOld = new Books();
            bookOld.id = book.id;
            alreadyRead.books.push(bookOld);
        });

        await alreadyReadRepository.deleteOne(userId);
        return alreadyReadRepository.createOne(alreadyRead);
    }

    private async _updateRemoveBook(userId: number, books: Books[], removeBookId: number): Promise<AlreadyRead> {
        const alreadyRead = new AlreadyRead();
        alreadyRead.books = [];
        alreadyRead.userId = userId;

        const findBook = books.find((book) => book.id === removeBookId);

        if (findBook) {
            books.forEach((book) => {
                if (book.id !== findBook.id) {
                    const bookOld = new Books();
                    bookOld.id = book.id;
                    alreadyRead.books.push(bookOld);
                }
            });
        }

        await alreadyReadRepository.deleteOne(userId);
        return alreadyReadRepository.createOne(alreadyRead);
    }
}

export const alreadyReadService = new AlreadyReadService();
