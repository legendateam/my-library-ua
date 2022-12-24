import { IActionsUpdateQuery, IFavoriteExtended } from '../interfaces';
import { Books, Favorites } from '../entities';
import { favoritesRepository } from '../repositories';

class FavoritesService {
    public async create({ userId, bookId }: IFavoriteExtended): Promise<Favorites> {
        const favorites = new Favorites();
        favorites.userId = userId;

        const books = new Books();
        books.id = bookId;

        favorites.books = [books];

        return favoritesRepository.createOne(favorites);
    }

    public async updateOne(query: IActionsUpdateQuery, userId: number, books: Books[], newBookId: number): Promise<Favorites> {
        if (query?.updateSet) {
            return this._updateSetBook(userId, books, newBookId);
        }
        return this._updateRemoveBook(userId, books, newBookId);
    }

    private async _updateSetBook(userId: number, books: Books[], newBookId: number): Promise<Favorites> {
        const favorites = new Favorites();
        favorites.userId = userId;

        const newBooks = new Books();
        newBooks.id = newBookId;

        favorites.books = [newBooks];

        books.forEach((book) => {
            const bookOld = new Books();
            bookOld.id = book.id;
            favorites.books.push(bookOld);
        });

        await favoritesRepository.deleteOne(userId);
        return favoritesRepository.createOne(favorites);
    }

    private async _updateRemoveBook(userId: number, books: Books[], removeBookId: number): Promise<Favorites> {
        const favorites = new Favorites();
        favorites.books = [];
        favorites.userId = userId;

        const findBook = books.find((book) => book.id === removeBookId);

        if (findBook) {
            books.forEach((book) => {
                if (book.id !== findBook.id) {
                    const bookOld = new Books();
                    bookOld.id = book.id;
                    favorites.books.push(bookOld);
                }
            });
        }

        await favoritesRepository.deleteOne(userId);
        return favoritesRepository.createOne(favorites);
    }
}

export const favoritesService = new FavoritesService();
