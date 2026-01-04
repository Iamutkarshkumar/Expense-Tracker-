// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import authSlice from './authSlice';
// import expenseSlice from './expenseSlice';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { PersistGate } from 'redux-persist/integration/react';



// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage
// }
// const rootReducer = combineReducers({
//     auth: authSlice,
//     expense: expenseSlice
// })
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });
// export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

/* Persist ONLY auth */
const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  expense: expenseReducer, // ❌ NOT persisted
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
