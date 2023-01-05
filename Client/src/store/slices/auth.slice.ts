import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
    IAuthPayload,
    IAuthState,
    IErrorPayload,
    ILogin,
    IAuth,
    IRefreshTokenPair,
    IResponseError,
} from '../../interfaces';
import { authService } from '../../services';
import { HttpMessageEnum, HttpStatusEnum, StatusEnum } from '../../enums';
import { JwtErrorConstant, localStorageConstant } from '../../constants';
import { removeUser } from './user.slice';

const initialState: IAuthState = {
    responseError: null,
    tokenPair: null,
    status: null,
};

export const addTokenPairThunk = createAsyncThunk<void, ILogin>(
    'authSlice/addTokenPairThunk',
    async (login, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await authService.login(login);
            dispatch(addTokenPair({ tokenPair: data }));
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;
            return rejectWithValue(dispatch(addTokenPairError({ error })));
        }
    },
);

export const removeTokenPairThunk = createAsyncThunk<void, IAuth>(
    'authSlice/removeTokenPairThunk',
    async ({ accessToken, clientKey }, { dispatch, rejectWithValue }) => {
        try {
            const logoutSuccessfully = await authService.logOut({ clientKey, accessToken });

            if (logoutSuccessfully.status !== HttpStatusEnum.OK) {
                let error = HttpMessageEnum.INTERNAL_SERVER_ERROR;
                let status = HttpStatusEnum.INTERNAL_SERVER_ERROR;
                let message = HttpMessageEnum.INTERNAL_SERVER_ERROR;

                if (JwtErrorConstant.jwtExpired === logoutSuccessfully.message) {
                    error = HttpMessageEnum.UNAUTHORIZED;
                    status = HttpStatusEnum.UNAUTHORIZED;
                    message = JwtErrorConstant.jwtExpired;
                }
                return rejectWithValue(dispatch(addTokenPairError({
                    error: {
                        error,
                        status,
                        message,
                    },
                })));
            }

            dispatch(removeTokenPair());
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            if (error.message === JwtErrorConstant.jwtExpired) {
                dispatch(removeUser());
                dispatch(removeTokenPair());
                localStorage.removeItem(localStorageConstant.auth);
            }
            return rejectWithValue(dispatch(addTokenPairError({ error })));
        }
    },
);

export const refreshTokenPairThunk = createAsyncThunk<void, IRefreshTokenPair>(
    'authSlice/refreshTokenPairThunk',
    async ({ refreshToken, clientKey }, { dispatch, rejectWithValue }) => {
        try {
            const newTokens = await authService.refreshTokenPair({ clientKey, refreshToken });

            dispatch(addTokenPair({ tokenPair: newTokens.data }));
        } catch (e) {
            const errAxiosData = (e as AxiosError).response.data;
            const error = errAxiosData as IResponseError;

            if (error.message === JwtErrorConstant.jwtExpired) {
                dispatch(removeUser());
                dispatch(removeTokenPair());
            }

            return rejectWithValue(dispatch(addTokenPairError({ error })));
        }
    },
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        addTokenPair: (state, action: PayloadAction<IAuthPayload>): void => {
            state.tokenPair = action.payload.tokenPair;

            localStorage.setItem(localStorageConstant.auth, JSON.stringify(action.payload.tokenPair));
        },
        addTokenPairError: (state, action: PayloadAction<IErrorPayload>): void => {
            state.responseError = action.payload.error;
        },
        removeTokenPair: (state): void => {
            state.tokenPair = null;

            localStorage.removeItem(localStorageConstant.auth);
        },
        removeAuthError: (state): void => {
            state.responseError = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTokenPairThunk.pending, (state) => {
            state.status = StatusEnum.pending;
            state.responseError = null;
        });
        builder.addCase(addTokenPairThunk.fulfilled, (state) => {
            state.status = StatusEnum.fulfilled;
        });
        builder.addCase(addTokenPairThunk.rejected, (state) => {
            state.status = StatusEnum.rejected;
        });

        builder.addCase(removeTokenPairThunk.pending, (state) => {
            state.status = StatusEnum.pending;
            state.responseError = null;
        });
        builder.addCase(removeTokenPairThunk.fulfilled, (state) => {
            state.status = StatusEnum.fulfilled;
            state.responseError = null;
        });
        builder.addCase(removeTokenPairThunk.rejected, (state) => {
            state.status = StatusEnum.rejected;
        });
    },
});

export const authReducer = authSlice.reducer;
export const {
    addTokenPair, removeAuthError, addTokenPairError, removeTokenPair,
} = authSlice.actions;
