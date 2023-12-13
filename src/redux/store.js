import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import {persistReducer} from 'redux-persist';
import globalSlice from '@/redux/slices/globalSlice';
import homeSlice from '@/redux/slices/homeSlice';
import movieSlice from '@/redux/slices/movieSlice';
import persistSlice from '@/redux/slices/persistSlice';
import genreSlice from '@/redux/slices/genreSlice';

const persistConfig = {
    key: 'top-movies',
    storage: storageSession,
    whitelist: ['persist']
};

const combinedReducers = combineReducers({
    global: globalSlice,
    home: homeSlice,
    movie: movieSlice,
    persist: persistSlice,
    genre: genreSlice,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
});
