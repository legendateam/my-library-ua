import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    IUserInitialStateSlice,
    IUserPayload,
} from '../../interfaces';

const initialState: IUserInitialStateSlice = {
    user: null,
    status: null,
    errorResponse: null,
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUserPayload>): void => {
            state.user = action.payload.user;
        },
        removeUser: (state): void => {
            state.user = null;
        },
    },
});

export const userReducer = userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
