import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth.slice';
import { userReducer } from './slices/user.slice';
import { authorReducer } from './slices/author.slice';
import { paginationReducer } from './slices/pagination.slice';
import { alreadyReadReducer } from './slices/alreadyRead.slice';
import { favoritesReducer } from './slices/favorites.slice';
import { willReadReducer } from './slices/willRead.slice';
import { bookReducer } from './slices/book.slice';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    authorReducer,
    paginationReducer,
    alreadyReadReducer,
    favoritesReducer,
    willReadReducer,
    bookReducer,
});

const setupStore = () => configureStore({
    reducer: rootReducer,
});

export default setupStore;

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
