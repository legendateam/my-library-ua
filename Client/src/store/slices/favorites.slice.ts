import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import {
    IAuth,
    IFavoriteInitialStateSlice, IFavorites, IFavoritesResponse,
    IResponseError,
    IResponseOK,
} from '../../interfaces';
import { favoritesService } from '../../services';
import { StatusEnum } from '../../enums';
import { typeRejectFavoritesSliceConstant } from '../../constants';

const initialState: IFavoriteInitialStateSlice = {
    err: null,
    favorites: null,
    status: null,
    typeAction: null,
};

export const createFavoritesThunk = createAsyncThunk<IResponseOK<IFavoritesResponse> | IResponseError, IFavorites>(
    'favoritesSlice/createFavoritesThunk',
    async ({ accessToken, clientKey, bookId }, { rejectWithValue }) => {
        try {
            await favoritesService.addBook({ bookId, clientKey, accessToken });
            return favoritesService.getOneByUserId({ clientKey, accessToken });
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const getOneFavoritesThunk = createAsyncThunk<IResponseOK<IFavoritesResponse> | IResponseError, IAuth>(
    'favoritesSlice/getOneFavoritesThunk',
    async ({ accessToken, clientKey }, { rejectWithValue }) => {
        try {
            const alreadyRead = await favoritesService.getOneByUserId({ clientKey, accessToken });
            return alreadyRead;
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const updateSetFavoriteThunk = createAsyncThunk<IResponseOK<IFavoritesResponse> | IResponseError, IFavorites>(
    'favoritesSlice/updateSetFavoriteThunk',
    async ({ accessToken, clientKey, bookId }, { rejectWithValue }) => {
        try {
            await favoritesService.setBook({ bookId, clientKey, accessToken });
            return favoritesService.getOneByUserId({ clientKey, accessToken });
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const updateRemoveFavoriteThunk = createAsyncThunk<IResponseOK<IFavoritesResponse> | IResponseError, IFavorites>(
    'favoritesSlice/updateRemoveFavoriteThunk',
    async ({ accessToken, clientKey, bookId }, { rejectWithValue }) => {
        try {
            await favoritesService.removeBook({ bookId, clientKey, accessToken });
            return favoritesService.getOneByUserId({ clientKey, accessToken });
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const deleteFavoriteThunk = createAsyncThunk<void, IAuth>(
    'favoritesSlice/deleteFavoriteThunk',
    async ({ accessToken, clientKey }, { dispatch, rejectWithValue }) => {
        try {
            const deleted = await favoritesService.deleteBook({ clientKey, accessToken });

            if (deleted.data.affected) {
                dispatch(deleteAllFavorites());
            }
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

const favoritesSlice = createSlice({
    name: 'favoritesSlice',
    initialState,
    reducers: {
        deleteAllFavorites: (state): void => {
            state.favorites = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createFavoritesThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(createFavoritesThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IFavoritesResponse>;

            state.status = StatusEnum.fulfilled;
            state.favorites = responseData.data;
        });
        builder.addCase(createFavoritesThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectFavoritesSliceConstant.createFavoritesThunk;
            state.err = action.payload as IResponseError;
        });

        builder.addCase(getOneFavoritesThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(getOneFavoritesThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IFavoritesResponse>;

            state.status = StatusEnum.fulfilled;
            state.favorites = responseData.data;
        });
        builder.addCase(getOneFavoritesThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectFavoritesSliceConstant.getOneFavoritesThunk;

            state.err = action.payload as IResponseError;
        });

        builder.addCase(deleteFavoriteThunk.pending, (state, action) => {
            state.status = StatusEnum.pending;
            state.typeAction = null;

            state.err = null;
        });
        builder.addCase(deleteFavoriteThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectFavoritesSliceConstant.deleteFavoriteThunk;

            state.err = action.payload as IResponseError;
        });

        builder.addCase(updateRemoveFavoriteThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(updateRemoveFavoriteThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IFavoritesResponse>;

            state.status = StatusEnum.fulfilled;
            state.favorites = responseData.data;
        });
        builder.addCase(updateRemoveFavoriteThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectFavoritesSliceConstant.updateRemoveFavoriteThunk;
            state.err = action.payload as IResponseError;
        });

        builder.addCase(updateSetFavoriteThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(updateSetFavoriteThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IFavoritesResponse>;

            state.status = StatusEnum.fulfilled;
            state.favorites = responseData.data;
        });
        builder.addCase(updateSetFavoriteThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectFavoritesSliceConstant.updateSetFavoriteThunk;
            state.err = action.payload as IResponseError;
        });
    },
});

export const { deleteAllFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
