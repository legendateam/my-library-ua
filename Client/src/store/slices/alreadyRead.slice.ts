import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
    IAlreadyRead, IAlreadyReadResponse, IAlreadyReadStateSlice, IAuth, IResponseError, IResponseOK,
} from '../../interfaces';
import { alreadyReadService } from '../../services';
import { StatusEnum } from '../../enums';
import { typeRejectAlreadyReadSliceConstant } from '../../constants';

const initialState: IAlreadyReadStateSlice = {
    err: null,
    alreadyRead: null,
    status: null,
    typeAction: null,
};

export const createAlreadyReadThunk = createAsyncThunk<IResponseOK<IAlreadyReadResponse> | IResponseError, IAlreadyRead>(
    'alreadyReadSlice/createAlreadyRead',
    async ({ accessToken, clientKey, bookId }, { rejectWithValue }) => {
        try {
            await alreadyReadService.addBook({ bookId, clientKey, accessToken });
            return alreadyReadService.getOneByUserId({ clientKey, accessToken });
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const getOneAlreadyReadThunk = createAsyncThunk<IResponseOK<IAlreadyReadResponse> | IResponseError, IAuth>(
    'alreadyReadSlice/getOneAlreadyReadThunk',
    async ({ accessToken, clientKey }, { rejectWithValue }) => {
        try {
            const alreadyRead = await alreadyReadService.getOneByUserId({ clientKey, accessToken });
            return alreadyRead;
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const updateSetBookAlreadyReadThunk = createAsyncThunk<IResponseOK<IAlreadyReadResponse> | IResponseError, IAlreadyRead>(
    'alreadyReadSlice/updateSetBookAlreadyReadThunk',
    async ({ accessToken, clientKey, bookId }, { rejectWithValue }) => {
        try {
            await alreadyReadService.setBook({ bookId, clientKey, accessToken });
            return alreadyReadService.getOneByUserId({ clientKey, accessToken });
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const updateRemoveBookAlreadyReadThunk = createAsyncThunk<IResponseOK<IAlreadyReadResponse> | IResponseError, IAlreadyRead>(
    'alreadyReadSlice/updateRemoveBookAlreadyReadThunk',
    async ({ accessToken, clientKey, bookId }, { rejectWithValue }) => {
        try {
            await alreadyReadService.removeBook({ bookId, clientKey, accessToken });
            return alreadyReadService.getOneByUserId({ clientKey, accessToken });
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const deleteAlreadyReadThunk = createAsyncThunk<void, IAuth>(
    'alreadyReadSlice/deleteAlreadyRead',
    async ({ accessToken, clientKey }, { dispatch, rejectWithValue }) => {
        try {
            const deleted = await alreadyReadService.deleteBook({ clientKey, accessToken });

            if (deleted.data.affected) {
                dispatch(deleteAll());
            }
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

const alreadyReadSlice = createSlice({
    name: 'alreadyReadSlice',
    initialState,
    reducers: {
        deleteAll: (state): void => {
            state.alreadyRead = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createAlreadyReadThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(createAlreadyReadThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IAlreadyReadResponse>;

            state.status = StatusEnum.fulfilled;
            state.alreadyRead = responseData.data;
        });
        builder.addCase(createAlreadyReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectAlreadyReadSliceConstant.createAlreadyReadThunk;
            state.err = action.payload as IResponseError;
        });

        builder.addCase(getOneAlreadyReadThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(getOneAlreadyReadThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IAlreadyReadResponse>;

            state.status = StatusEnum.fulfilled;
            state.alreadyRead = responseData.data;
        });
        builder.addCase(getOneAlreadyReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectAlreadyReadSliceConstant.getOneAlreadyReadThunk;

            state.err = action.payload as IResponseError;
        });

        builder.addCase(deleteAlreadyReadThunk.pending, (state, action) => {
            state.status = StatusEnum.pending;
            state.typeAction = null;

            state.err = null;
        });
        builder.addCase(deleteAlreadyReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectAlreadyReadSliceConstant.deleteAlreadyReadThunk;

            state.err = action.payload as IResponseError;
        });

        builder.addCase(updateRemoveBookAlreadyReadThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(updateRemoveBookAlreadyReadThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IAlreadyReadResponse>;

            state.status = StatusEnum.fulfilled;
            state.alreadyRead = responseData.data;
        });
        builder.addCase(updateRemoveBookAlreadyReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectAlreadyReadSliceConstant.updateRemoveBookAlreadyReadThunk;
            state.err = action.payload as IResponseError;
        });

        builder.addCase(updateSetBookAlreadyReadThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(updateSetBookAlreadyReadThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IAlreadyReadResponse>;

            state.status = StatusEnum.fulfilled;
            state.alreadyRead = responseData.data;
        });
        builder.addCase(updateSetBookAlreadyReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectAlreadyReadSliceConstant.updateSetBookAlreadyReadThunk;
            state.err = action.payload as IResponseError;
        });
    },
});

export const { deleteAll } = alreadyReadSlice.actions;
export const alreadyReadReducer = alreadyReadSlice.reducer;
