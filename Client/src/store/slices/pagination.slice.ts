import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPaginationInitialSlice, IPaginationPagePayload } from '../../interfaces';

const initialState: IPaginationInitialSlice = {
    pageAuthors: 1,
    perPageAuthors: 30,
    pageComments: 1,
    skipComments: 0,
    perPageComments: 10,
    perPageBooksNovelty: 30,
    pageBooksNovelty: 1,
    pageBooksRatings: 1,
    perPageBooksRatings: 30,
    pageGenres: 1,
    perPageGenres: 30,
};

const paginationSlice = createSlice({
    name: 'paginationSlice',
    initialState,
    reducers: {
        setPageAuthors: (state: IPaginationInitialSlice, action: PayloadAction<IPaginationPagePayload>) => {
            state.pageAuthors = action.payload.page;
        },
        setPageComments: (state: IPaginationInitialSlice, action: PayloadAction<IPaginationPagePayload>) => {
            state.pageComments = action.payload.page;
        },
        changeCommentsSkip: (state: IPaginationInitialSlice) => {
            const skip = state.perPageComments * (state.pageComments - 1);

            if (skip > 0) state.skipComments = skip - 1;
            if (skip === 0) state.skipComments = skip;
        },
        setPageBooksNovelty: (state: IPaginationInitialSlice, action: PayloadAction<IPaginationPagePayload>) => {
            state.pageBooksNovelty = action.payload.page;
        },
        setPageRatings: (state: IPaginationInitialSlice, action: PayloadAction<IPaginationPagePayload>) => {
            state.pageBooksRatings = action.payload.page;
        },

        setPageGenres: (state: IPaginationInitialSlice, action: PayloadAction<IPaginationPagePayload>) => {
            state.pageGenres = action.payload.page;
        },
    },
});

export const {
    setPageComments, setPageRatings, setPageAuthors, changeCommentsSkip, setPageBooksNovelty, setPageGenres,
} = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
