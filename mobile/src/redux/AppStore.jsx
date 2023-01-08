import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/UserReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
