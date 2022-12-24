import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAuthorState } from '../../interfaces/slice/initialState/author.initial.state.slice.interface';
import {
    IAuthorPayload,
    IAuthorResponse, IDelete, IPagination, IResponseError, IResponseOK, ISearch,
} from '../../interfaces';
import { authorService } from '../../services';
import { StatusEnum } from '../../enums';

const initialState: IAuthorState = {
    error: null,
    status: null,
    authors: null,
    count: 0,
    authorsHome: null,
    searchAuthors: null,
    delete: false,
};

export const getAllAuthorAsyncThunk = createAsyncThunk<IResponseOK<[IAuthorResponse[], number]>, IPagination>(
    'authorSlice/getAllAuthorAsyncThunk',
    async ({ page }, { rejectWithValue }) => {
        try {
            const authorsResponse = await authorService.getAll({ page });
            return authorsResponse;
        } catch (e) {
            return rejectWithValue((e as IResponseError).message);
        }
    },
);

export const getHomeAuthorsAsyncThunk = createAsyncThunk<IResponseOK<[IAuthorResponse[], number]>, { perPage: number }>(
    'authorSlice/getHomeAuthorsAsyncThunk',
    async ({ perPage }, { rejectWithValue }) => {
        try {
            const authorsResponse = await authorService.getForHome({ perPage });
            return authorsResponse;
        } catch (e) {
            return rejectWithValue((e as IResponseError).message);
        }
    },
);

export const getAuthorsBySearchDataAsyncThunk = createAsyncThunk<IResponseOK<[IAuthorResponse[], number]>, ISearch>(
    'authorSlice/getAuthorsBySearchDataAsyncThunk',
    async ({ search }, { rejectWithValue }) => {
        try {
            const authorsResponse = await authorService.getAllByLikeFullName(search);
            return authorsResponse;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

export const deleteAuthorThunk = createAsyncThunk<number, IDelete>(
    'authorSlice/deleteAuthorThunk',
    async ({ id, clientKey, accessToken }, { rejectWithValue }) => {
        try {
            await authorService.deleteOne({ accessToken, clientKey }, id);
            return id;
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            return rejectWithValue(error.message);
        }
    },
);

const authorSlice = createSlice({
    name: 'authorSlice',
    initialState,
    reducers: {
        setAuthorsOfBooks: (state, action: PayloadAction<IAuthorPayload>): void => {
            const { author } = action.payload;

            state.searchAuthors = [];
            state.searchAuthors.push(author);

            state.status = StatusEnum.fulfilled;
        },
        alertMessageAfterDeleteAuthor: (state) => {
            state.delete = !state.delete;
        },
        setAuthorAfterCreate: (state, action: PayloadAction<IAuthorResponse>) => {
            if (state.authors) state.authors.unshift(action.payload);
        },
        replaceAuthorAfterUpdated: (state, action: PayloadAction<IAuthorResponse>) => {
            if (state.authors) {
                const findIndex = state.authors.findIndex((author) => author.id === action.payload.id);
                if (findIndex !== -1) state.authors.splice(findIndex, 1, action.payload);
            }
        },
        replaceAuthorHomeAfterUpdated: (state, action: PayloadAction<IAuthorResponse>) => {
            if (state.authorsHome) {
                const findIndex = state.authorsHome.findIndex((author) => author.id === action.payload.id);
                if (findIndex !== -1) state.authorsHome.splice(findIndex, 1, action.payload);
            }
        },
        replaceSearchAuthorAfterUpdated: (state, action: PayloadAction<IAuthorResponse>) => {
            if (state.searchAuthors) {
                const findIndex = state.searchAuthors.findIndex((author) => author.id === action.payload.id);
                if (findIndex !== -1) state.searchAuthors.splice(findIndex, 1, action.payload);
            }
        },
    },
    extraReducers: (build) => {
        build.addCase(getAllAuthorAsyncThunk.pending, (state) => {
            state.status = StatusEnum.pending;
            state.error = null;
        });
        build.addCase(getAllAuthorAsyncThunk.fulfilled, (state, action: any) => {
            state.status = StatusEnum.fulfilled;
            state.authors = action.payload.data[0] as IAuthorResponse[];
            state.count = action.payload.data[1] as number;
            state.error = null;
        });
        build.addCase(getAllAuthorAsyncThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.error = action.payload as string;
        });

        build.addCase(getHomeAuthorsAsyncThunk.pending, (state) => {
            state.status = StatusEnum.pending;
            state.error = null;
        });
        build.addCase(getHomeAuthorsAsyncThunk.fulfilled, (state, action: any) => {
            state.status = StatusEnum.fulfilled;
            state.authorsHome = action.payload.data[0] as IAuthorResponse[];
        });
        build.addCase(getHomeAuthorsAsyncThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.error = action.payload as string;
        });

        build.addCase(getAuthorsBySearchDataAsyncThunk.pending, (state) => {
            state.status = StatusEnum.pending;
            state.error = null;
        });
        build.addCase(getAuthorsBySearchDataAsyncThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;
            state.searchAuthors = action.payload.data[0] as IAuthorResponse[];
        });
        build.addCase(getAuthorsBySearchDataAsyncThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.error = action.payload as string;
        });

        build.addCase(deleteAuthorThunk.pending, (state) => {
            state.status = StatusEnum.pending;
            state.error = null;
        });
        build.addCase(deleteAuthorThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.fulfilled;

            const id = action.payload;

            if (state.authors) {
                const findIndex = state.authors.findIndex((author) => author.id === id);

                if (findIndex) state.authors.splice(findIndex, 1);
                if (findIndex === 0) state.authors.shift();
            }

            setTimeout(() => {
                if (state.authorsHome) {
                    const findIndex = state.authorsHome.findIndex((author) => author.id === id);
                    if (findIndex) state.authorsHome.splice(findIndex, 1);
                }
            }, 500);

            setTimeout(() => {
                if (state.searchAuthors) {
                    const findIndex = state.searchAuthors.findIndex((author) => author.id === id);
                    if (findIndex) state.searchAuthors.splice(findIndex, 1);
                }
            }, 1000);
        });
        build.addCase(deleteAuthorThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.error = action.payload as string;
        });
    },
});

export const {
    setAuthorsOfBooks, alertMessageAfterDeleteAuthor, setAuthorAfterCreate,
    replaceAuthorAfterUpdated, replaceAuthorHomeAfterUpdated, replaceSearchAuthorAfterUpdated,
} = authorSlice.actions;
export const authorReducer = authorSlice.reducer;
