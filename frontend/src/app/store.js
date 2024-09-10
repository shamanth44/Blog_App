import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import authReducer from '../features/user/userSlice';
import blogReducer from '../features/blogs/blogSlice'


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    blogs: blogReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            ignoredPaths: ['_persist'],
          },
        }),
  });

export const persistor = persistStore(store);
export default store;




// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         blogs: blogReducer
//     }
// })