import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import {
    IAuth,
    IWillReadInitialStateSlice,
    IResponseError,
    IResponseOK,
    IWillReadResponse,
    IWillRead,
} from '../../interfaces';
import { willReadService } from '../../services';
import { StatusEnum } from '../../enums';
import { typeRejectWillReadSliceConstant } from '../../constants';

const initialState: IWillReadInitialStateSlice = {
    err: null,
    willRead: null,
    status: null,
    typeAction: null,
};

export const createWillReadThunk = createAsyncThunk<IResponseOK<IWillReadResponse> | IResponseError, IWillRead>(
    'willReadSlice/createWillReadThunk',
    async ({ accessToken, clientKey, bookId }, { rejectWithValue }) => {
        try {
            await willReadService.addBook({ bookId, clientKey, accessToken });
            return willReadService.getOneByUserId({ clientKey, accessToken });
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const getOneWillReadThunk = createAsyncThunk<IResponseOK<IWillReadResponse> | IResponseError, IAuth>(
    'willReadSlice/getOneWillReadThunk',
    async ({ accessToken, clientKey }, { rejectWithValue }) => {
        try {
            const willRead = await willReadService.getOneByUserId({ clientKey, accessToken });
            return willRead;
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const updateSetWillReadThunk = createAsyncThunk<IResponseOK<IWillReadResponse> | IResponseError, IWillRead>(
    'willReadSlice/updateSetWillReadThunk',
    async ({ accessToken, clientKey, bookId }, { rejectWithValue }) => {
        try {
            await willReadService.setBook({ bookId, clientKey, accessToken });
            return willReadService.getOneByUserId({ clientKey, accessToken });
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

export const updateRemoveWillReadThunk = createAsyncThunk<IResponseOK<IWillReadResponse> | IResponseError, IWillRead>(
    'willReadSlice/updateRemoveWillReadThunk',
    async ({ accessToken, clientKey, bookId }, { rejectWithValue }) => {
        try {
            await willReadService.removeBook({ bookId, clientKey, accessToken });
            return willReadService.getOneByUserId({ clientKey, accessToken });
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;
            const messageError = responseError.message;

            return rejectWithValue(messageError);
        }
    },
);

export const deleteWillReadThunk = createAsyncThunk<void, IAuth>(
    'willReadSlice/deleteWillReadThunk',
    async ({ accessToken, clientKey }, { dispatch, rejectWithValue }) => {
        try {
            const deleted = await willReadService.deleteBook({ clientKey, accessToken });

            if (deleted.data.affected) {
                dispatch(deleteAllWillRead());
            }
        } catch (e) {
            const err = (e as AxiosError).response.data;
            const responseError = err as IResponseError;

            return rejectWithValue(responseError);
        }
    },
);

const willReadSlice = createSlice({
    name: 'willReadSlice',
    initialState,
    reducers: {
        deleteAllWillRead: (state): void => {
            state.willRead = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createWillReadThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(createWillReadThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IWillReadResponse>;

            state.status = StatusEnum.fulfilled;
            state.willRead = responseData.data;
        });
        builder.addCase(createWillReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectWillReadSliceConstant.createWillThunk;
            state.err = action.payload as IResponseError;
        });

        builder.addCase(getOneWillReadThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(getOneWillReadThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IWillReadResponse>;

            state.status = StatusEnum.fulfilled;
            state.willRead = responseData.data;
        });
        builder.addCase(getOneWillReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectWillReadSliceConstant.getOneWillThunk;

            state.err = action.payload as IResponseError;
        });

        builder.addCase(deleteWillReadThunk.pending, (state, action) => {
            state.status = StatusEnum.pending;
            state.typeAction = null;

            state.err = null;
        });
        builder.addCase(deleteWillReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectWillReadSliceConstant.deleteWillThunk;

            state.err = action.payload as IResponseError;
        });

        builder.addCase(updateRemoveWillReadThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(updateRemoveWillReadThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IWillReadResponse>;

            state.status = StatusEnum.fulfilled;
            state.willRead = responseData.data;
        });
        builder.addCase(updateRemoveWillReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectWillReadSliceConstant.updateRemoveWillThunk;
            state.err = action.payload as IResponseError;
        });

        builder.addCase(updateSetWillReadThunk.pending, (state) => {
            state.err = null;
            state.typeAction = null;
            state.status = StatusEnum.pending;
        });
        builder.addCase(updateSetWillReadThunk.fulfilled, (state, action) => {
            const responseData = action.payload as IResponseOK<IWillReadResponse>;

            state.status = StatusEnum.fulfilled;
            state.willRead = responseData.data;
        });
        builder.addCase(updateSetWillReadThunk.rejected, (state, action) => {
            state.status = StatusEnum.rejected;
            state.typeAction = typeRejectWillReadSliceConstant.updateSetWillThunk;
            state.err = action.payload as IResponseError;
        });
    },
});

export const { deleteAllWillRead } = willReadSlice.actions;
export const willReadReducer = willReadSlice.reducer;
