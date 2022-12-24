import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
    IBookInitialStateSlice,
    IBookResponse,
    IBooksNovelty,
    IBooksRatings,
    IBookTopResponseInterface, IDelete,
    IResponseError,
    IResponseOK, ISearch, ISortPayload, IViews,
} from '../../interfaces';
import { bookService, viewService } from '../../services';
import { StatusEnum } from '../../enums';

const initialState: IBookInitialStateSlice = {
    countNovelty: null,
    status: null,
    books: [],
    err: null,
    booksNovelty: null,
    countBooks: null,
    booksRatings: null,
    countBooksRatings: null,
    homeBooks: {
        lastAddedBooks: null,
        popular: null,
        novelty: null,
    },
    searchBooks: null,
    deleteOne: false,
};

export const getAllNoveltyThunk = createAsyncThunk<IResponseOK<[IBookResponse[], number]>, IBooksNovelty>(
    'bookSlice/getAllNoveltyThunk',
    async ({ startDay, page }, { rejectWithValue, dispatch }) => {
        try {
            const novelty = await bookService.getAllNovelty(startDay, page);

            novelty.data[0].map(async (book) => {
                const viewsJSON = await viewService.getView({ bookId: book.id }) as IResponseOK<string>;

                const { views } = JSON.parse(viewsJSON.data) as IViews;

                dispatch(setViewsNovelty({ views, bookId: book.id }));
            });

            return novelty;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

export const getAllRatingsThunk = createAsyncThunk<IResponseOK<[IBookResponse[], number]>, IBooksRatings>(
    'bookSlice/getAllRatingsThunk',
    async ({ rate, page }, { rejectWithValue, dispatch }) => {
        try {
            const ratings = await bookService.getAllRatings(rate, page);

            ratings.data[0].map(async (book) => {
                const viewsResponse = await viewService.getView({ bookId: book.id }) as IResponseOK<string>;

                const { views } = JSON.parse(viewsResponse.data) as IViews;

                dispatch(setViewsRatings({ views, bookId: book.id }));
            });

            return ratings;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

export const getHomeNoveltyThunk = createAsyncThunk<IResponseOK<[IBookResponse[], number]>, { perPage: number, date: string }>(
    'bookSlice/getHomeNoveltyThunk',
    async ({ date, perPage }, { rejectWithValue }) => {
        try {
            const booksResponse = await bookService.getHomeNovelty(date, perPage);
            return booksResponse;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

export const getHomeRatingThunk = createAsyncThunk<IResponseOK<[IBookTopResponseInterface[], number]>, { rate: number, perPage: number }>(
    'bookSlice/getHomeRatingThunk',
    async ({ rate, perPage }, { rejectWithValue }) => {
        try {
            const ratings = await bookService.getHomeRatings(rate, perPage);
            return ratings;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

export const getHomeLastAddedBooksThunk = createAsyncThunk<IResponseOK<IBookResponse[]>, { perPage: number }>(
    'bookSlice/getHomeLastAddedBooksThunk',
    async ({ perPage }, { rejectWithValue }) => {
        try {
            const lastAddedBooks = await bookService.lastAddedBooks(perPage);
            return lastAddedBooks;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

export const getGenresBooksThunk = createAsyncThunk<IResponseOK<[IBookResponse[], number]>, { genre: string }>(
    'bookSlice/getGenresBooksThunk',
    async ({ genre }, { rejectWithValue, dispatch }) => {
        try {
            const books = await bookService.getByGenre(genre);

            books.data[0].map(async (book) => {
                const getView = await viewService.getView({ bookId: book.id }) as IResponseOK<string>;

                const { views } = JSON.parse(getView.data) as IViews;

                dispatch(setViews({ views, bookId: book.id }));
            });

            return books;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

export const getBooksBySearchDataThunk = createAsyncThunk<IResponseOK<[IBookResponse[], number]>, ISearch>(
    'bookSlice/getBooksBySearchDataThunk',
    async ({ search }, { rejectWithValue }) => {
        try {
            const books = await bookService.getAllByLikeNameOrDescription(search);
            return books;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

export const deleteBooksByIdThunk = createAsyncThunk<number, IDelete>(
    'bookSlice/deleteBooksByIdThunk',
    async ({ id, clientKey, accessToken }, { rejectWithValue }) => {
        try {
            await bookService.deleteOne(id, { clientKey, accessToken });
            return id;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

const bookSlice = createSlice({
    name: 'bookSlice',
    initialState,
    reducers: {
        sortBooksByYear: (state) => {
            state.books.sort((a, b) => Number(b.yearOfRelease) - Number(a.yearOfRelease));
        },

        sortBooksByRating: (state) => {
            state.books.sort((a, b) => {
                const reduceA = a.ratings.reduce((acc, value) => acc + Math.ceil(value.rate / a.ratings.length), 0);

                const reduceB = b.ratings.reduce((acc, value) => acc + Math.ceil(value.rate / b.ratings.length), 0);

                return reduceB - reduceA;
            });
        },

        sortBooksByViews: (state) => {
            state.books.sort((a, b) => b.views - a.views);
        },
        setViews: (state, action: PayloadAction<ISortPayload>) => {
            state.books.forEach((book) => {
                if (book.id === action.payload.bookId) {
                    const findIndex = state.books.findIndex((bookIndex) => bookIndex.id === action.payload.bookId);
                    state.books.splice(findIndex, 1, { ...book, views: action.payload.views });
                }
            });
        },

        setViewsRatings: (state, action: PayloadAction<ISortPayload>) => {
            state.booksRatings.forEach((book) => {
                if (book.id === action.payload.bookId) {
                    const findIndex = state.booksRatings.findIndex((bookIndex) => bookIndex.id === action.payload.bookId);
                    state.booksRatings.splice(findIndex, 1, { ...book, views: action.payload.views });
                }
            });
        },
        sortRatingsByYear: (state) => {
            state.booksRatings.sort((a, b) => Number(b.yearOfRelease) - Number(a.yearOfRelease));
        },
        sortRatingsByRating: (state) => {
            state.booksRatings.sort((a, b) => {
                const reduceA = a.ratings.reduce((acc, value) => acc + Math.ceil(value.rate / a.ratings.length), 0);

                const reduceB = b.ratings.reduce((acc, value) => acc + Math.ceil(value.rate / b.ratings.length), 0);

                return reduceB - reduceA;
            });
        },
        sortRatingsByViews: (state) => {
            state.booksRatings.sort((a, b) => b.views - a.views);
        },

        setViewsNovelty: (state, action: PayloadAction<ISortPayload>) => {
            state.booksNovelty.forEach((book) => {
                if (book.id === action.payload.bookId) {
                    const findIndex = state.booksNovelty.findIndex((bookIndex) => bookIndex.id === action.payload.bookId);
                    state.booksNovelty.splice(findIndex, 1, { ...book, views: action.payload.views });
                }
            });
        },
        sortNoveltyByYear: (state) => {
            state.booksNovelty.sort((a, b) => Number(b.yearOfRelease) - Number(a.yearOfRelease));
        },
        sortNoveltyByRating: (state) => {
            state.booksNovelty.sort((a, b) => {
                const reduceA = a.ratings.reduce((acc, value) => acc + Math.ceil(value.rate / a.ratings.length), 0);

                const reduceB = b.ratings.reduce((acc, value) => acc + Math.ceil(value.rate / b.ratings.length), 0);

                return reduceB - reduceA;
            });
        },
        sortNoveltyByViews: (state) => {
            state.booksNovelty.sort((a, b) => b.views - a.views);
        },
        alertMessageAfterDeleteBook: (state) => {
            state.deleteOne = !state.deleteOne;
        },
        setNewBookAfterCreated: (state, action: PayloadAction<IBookResponse>) => {
            if (state.booksNovelty) state.booksNovelty.unshift(action.payload);
            if (state.homeBooks.lastAddedBooks) state.homeBooks.lastAddedBooks.unshift(action.payload);
        },
        replaceBookAfterUpdated: (state, action: PayloadAction<IBookResponse>) => {
            if (state.books) {
                const findIndex = state.books.findIndex((book) => book.id === action.payload.id);

                if (findIndex !== -1) state.books.splice(findIndex, 1, action.payload);
            }
        },
        replaceBookNoveltyAfterUpdated: (state, action: PayloadAction<IBookResponse>) => {
            if (state.booksNovelty) {
                const findIndex = state.booksNovelty.findIndex((book) => book.id === action.payload.id);

                if (findIndex !== -1) state.booksNovelty.splice(findIndex, 1, action.payload);
            }
        },
        replaceBookRatingsAfterUpdated: (state, action: PayloadAction<IBookResponse>) => {
            if (state.booksRatings) {
                const findIndex = state.booksRatings.findIndex((book) => book.id === action.payload.id);

                if (findIndex !== -1) state.booksRatings.splice(findIndex, 1, action.payload);
            }
        },
        replaceBookSearchAfterUpdate: (state, action: PayloadAction<IBookResponse>) => {
            if (state.searchBooks) {
                const findIndex = state.searchBooks.findIndex((book) => book.id === action.payload.id);

                if (findIndex !== -1) state.searchBooks.splice(findIndex, 1, action.payload);
            }
        },
        replaceHomeBookNoveltyAfterUpdate: (state, action: PayloadAction<IBookResponse>) => {
            if (state.homeBooks.novelty) {
                const findIndex = state.homeBooks.novelty.findIndex((book) => book.id === action.payload.id);

                if (findIndex !== -1) state.homeBooks.novelty.splice(findIndex, 1, action.payload);
            }
        },
        replaceHomeBookPopularAfterUpdate: (state, action: PayloadAction<IBookResponse>) => {
            if (state.homeBooks.popular) {
                const findIndex = state.homeBooks.popular.findIndex((book) => book.id === action.payload.id);
                const find = state.homeBooks.popular.find((book) => book.id === action.payload.id);

                const updateBook = { ...action.payload, countRatings: find.countRatings };
                if (findIndex !== -1) state.homeBooks.popular.splice(findIndex, 1, updateBook);
            }
        },
        replaceHomeBookLastAddedBooksAfterUpdate: (state, action: PayloadAction<IBookResponse>) => {
            if (state.homeBooks.lastAddedBooks) {
                const findIndex = state.homeBooks.lastAddedBooks.findIndex((book) => book.id === action.payload.id);

                if (findIndex !== -1) state.homeBooks.lastAddedBooks.splice(findIndex, 1, action.payload);
            }
        },
    },
    extraReducers: (build) => {
        build.addCase(getAllNoveltyThunk.pending, (state) => {
            state.err = null;
            state.status = StatusEnum.pending;
        });
        build.addCase(getAllNoveltyThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;

            const response = action.payload as IResponseOK<[IBookResponse[], number]>;
            const booksNovelty = response.data[0] as IBookResponse[];
            const countNovelty = response.data[1] as number;

            state.booksNovelty = booksNovelty;
            state.countNovelty = countNovelty;
        });
        build.addCase(getAllNoveltyThunk.rejected, (state, action) => {
            state.err = action.payload as string;
            state.status = StatusEnum.rejected;
        });

        build.addCase(getAllRatingsThunk.pending, (state) => {
            state.err = null;
            state.status = StatusEnum.pending;
        });
        build.addCase(getAllRatingsThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;

            const response = action.payload as IResponseOK<[IBookResponse[], number]>;
            const booksRatings = response.data[0] as IBookResponse[];
            const countRatings = response.data[1] as number;

            state.booksRatings = booksRatings;
            state.countBooksRatings = countRatings;
        });
        build.addCase(getAllRatingsThunk.rejected, (state, action) => {
            state.err = action.payload as string;
            state.status = StatusEnum.rejected;
        });

        build.addCase(getHomeNoveltyThunk.pending, (state) => {
            state.err = null;
            state.status = StatusEnum.pending;
        });
        build.addCase(getHomeNoveltyThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;
            state.homeBooks.novelty = action.payload.data[0] as IBookResponse[];
        });
        build.addCase(getHomeNoveltyThunk.rejected, (state, action) => {
            state.err = action.payload as string;
            state.status = StatusEnum.rejected;
        });

        build.addCase(getHomeRatingThunk.pending, (state) => {
            state.err = null;
            state.status = StatusEnum.pending;
        });
        build.addCase(getHomeRatingThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;
            const booksResponse = action.payload.data[0] as IBookTopResponseInterface[];
            const booksSortResponse = booksResponse.sort((a, b) => b.countRatings - a.countRatings);

            state.homeBooks.popular = booksSortResponse;
        });
        build.addCase(getHomeRatingThunk.rejected, (state, action) => {
            state.err = action.payload as string;
            state.status = StatusEnum.rejected;
        });

        build.addCase(getHomeLastAddedBooksThunk.pending, (state) => {
            state.err = null;
            state.status = StatusEnum.pending;
        });
        build.addCase(getHomeLastAddedBooksThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;
            state.homeBooks.lastAddedBooks = action.payload.data as IBookResponse[];
        });
        build.addCase(getHomeLastAddedBooksThunk.rejected, (state, action) => {
            state.err = action.payload as string;
            state.status = StatusEnum.rejected;
        });

        build.addCase(getGenresBooksThunk.pending, (state) => {
            state.err = null;
            state.status = StatusEnum.pending;
        });
        build.addCase(getGenresBooksThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;

            const booksResponse = action.payload.data[0] as IBookResponse[];
            state.books = booksResponse;
            state.countBooks = action.payload.data[1] as number;
        });
        build.addCase(getGenresBooksThunk.rejected, (state, action) => {
            state.err = action.payload as string;
            state.status = StatusEnum.rejected;
        });

        build.addCase(getBooksBySearchDataThunk.pending, (state) => {
            state.status = StatusEnum.pending;
            state.err = null;
        });
        build.addCase(getBooksBySearchDataThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;

            const booksResponse = action.payload.data[0] as IBookResponse[];
            state.searchBooks = booksResponse;
        });
        build.addCase(getBooksBySearchDataThunk.rejected, (state, action) => {
            state.err = action.payload as string;
            state.status = StatusEnum.rejected;
        });

        build.addCase(deleteBooksByIdThunk.pending, (state) => {
            state.status = StatusEnum.pending;
            state.err = null;
        });
        build.addCase(deleteBooksByIdThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;

            if (state.books) {
                const findIndex = state.books.findIndex((book) => book.id === action.payload);
                if (findIndex) state.books.splice(findIndex, 1);
                if (findIndex === 0) state.books.shift();
            }

            if (state.booksNovelty) {
                const findIndex = state.booksNovelty.findIndex((book) => book.id === action.payload);
                if (findIndex) state.booksNovelty.splice(findIndex, 1);
                if (findIndex === 0) state.booksNovelty.shift();
            }

            if (state.booksRatings) {
                const findIndex = state.booksRatings.findIndex((book) => book.id === action.payload);
                if (findIndex) state.booksRatings.splice(findIndex, 1);
                if (findIndex === 0) state.booksRatings.shift();
            }

            if (state.homeBooks.popular) {
                const findIndex = state.homeBooks.popular.findIndex((book) => book.id === action.payload);
                if (findIndex) state.homeBooks.popular.splice(findIndex, 1);
                if (findIndex === 0) state.homeBooks.popular.shift();
            }

            if (state.homeBooks.novelty) {
                const findIndex = state.homeBooks.novelty.findIndex((book) => book.id === action.payload);
                if (findIndex) state.homeBooks.novelty.splice(findIndex, 1);
                if (findIndex === 0) state.homeBooks.novelty.shift();
            }

            if (state.homeBooks.lastAddedBooks) {
                const findIndex = state.homeBooks.lastAddedBooks.findIndex((book) => book.id === action.payload);
                if (findIndex) state.homeBooks.lastAddedBooks.splice(findIndex, 1);
                if (findIndex === 0) state.homeBooks.lastAddedBooks.shift();
            }

            if (state.searchBooks) {
                const findIndex = state.searchBooks.findIndex((book) => book.id === action.payload);
                if (findIndex) state.searchBooks.splice(findIndex, 1);
                if (findIndex === 0) state.searchBooks.shift();
            }
        });
        build.addCase(deleteBooksByIdThunk.rejected, (state, action) => {
            state.err = action.payload as string;
            state.status = StatusEnum.rejected;
        });
    },
});

export const {
    sortBooksByYear, sortBooksByRating, sortBooksByViews, setViews, setViewsRatings,
    sortRatingsByYear, sortRatingsByRating, sortRatingsByViews, setViewsNovelty,
    sortNoveltyByYear, sortNoveltyByRating, sortNoveltyByViews, alertMessageAfterDeleteBook, setNewBookAfterCreated,
    replaceBookAfterUpdated, replaceBookNoveltyAfterUpdated, replaceBookRatingsAfterUpdated, replaceBookSearchAfterUpdate,
    replaceHomeBookNoveltyAfterUpdate, replaceHomeBookPopularAfterUpdate, replaceHomeBookLastAddedBooksAfterUpdate,
} = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
