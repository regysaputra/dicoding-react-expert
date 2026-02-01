import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './threadDetail/reducer.js';
import threadsReducer from './threads/reducer.js';
import usersReducer from './users/reducer';

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        isPreload: isPreloadReducer,
        users: usersReducer,
        threads: threadsReducer,
        threadDetail: threadDetailReducer,
    },
});

export default store;